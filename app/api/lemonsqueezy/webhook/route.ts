import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  // Verify webhook signature
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const eventName = event.meta?.event_name;
  const customData = event.meta?.custom_data;
  const userId = customData?.supabase_user_id;

  if (!userId) {
    console.warn("Webhook received without supabase_user_id:", eventName);
    return NextResponse.json({ received: true });
  }

  const admin = createAdminClient();
  const attrs = event.data?.attributes;

  try {
    switch (eventName) {
      case "subscription_created": {
        const planType = determinePlanType(attrs);
        await admin
          .from("subscriptions")
          .upsert({
            id: userId,
            ls_subscription_id: String(event.data.id),
            ls_customer_id: String(attrs.customer_id),
            status: mapStatus(attrs.status),
            plan_type: planType,
            current_period_end: attrs.renews_at,
            cancel_at_period_end: attrs.cancelled ?? false,
          });
        break;
      }

      case "subscription_updated": {
        const updateData: Record<string, unknown> = {
          status: mapStatus(attrs.status),
          plan_type: determinePlanType(attrs),
          current_period_end: attrs.renews_at,
          cancel_at_period_end: attrs.cancelled ?? false,
        };

        if (attrs.customer_id) {
          updateData.ls_customer_id = String(attrs.customer_id);
        }

        await admin
          .from("subscriptions")
          .update(updateData)
          .eq("id", userId);
        break;
      }

      case "subscription_cancelled":
      case "subscription_expired": {
        await admin
          .from("subscriptions")
          .update({
            status: "canceled",
            cancel_at_period_end: true,
          })
          .eq("id", userId);
        break;
      }

      case "subscription_resumed": {
        await admin
          .from("subscriptions")
          .update({
            status: "active",
            cancel_at_period_end: false,
          })
          .eq("id", userId);
        break;
      }

      case "subscription_payment_failed": {
        await admin
          .from("subscriptions")
          .update({ status: "past_due" })
          .eq("id", userId);
        break;
      }

      default:
        // Unhandled event — acknowledge
        break;
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

function determinePlanType(attrs: Record<string, unknown>): string {
  const variantId = String(attrs.variant_id ?? "");
  if (variantId === process.env.LEMONSQUEEZY_YEARLY_VARIANT_ID) return "yearly";
  return "monthly";
}

function mapStatus(status: string): string {
  switch (status) {
    case "active":
      return "active";
    case "on_trial":
      return "trialing";
    case "past_due":
      return "past_due";
    case "paused":
      return "paused";
    case "cancelled":
    case "expired":
    case "unpaid":
      return "canceled";
    default:
      return "inactive";
  }
}
