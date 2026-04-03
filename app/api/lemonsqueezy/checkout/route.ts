import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { initLemonSqueezy } from "@/lib/lemonsqueezy";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { variantId } = await request.json();

    const monthlyVariant = process.env.LEMONSQUEEZY_MONTHLY_VARIANT_ID;
    const yearlyVariant = process.env.LEMONSQUEEZY_YEARLY_VARIANT_ID;

    if (variantId !== monthlyVariant && variantId !== yearlyVariant) {
      return NextResponse.json({ error: "Invalid variant" }, { status: 400 });
    }

    initLemonSqueezy();

    const storeId = process.env.LEMONSQUEEZY_STORE_ID!;

    const { data, error } = await createCheckout(storeId, variantId, {
      checkoutData: {
        email: user.email ?? undefined,
        custom: {
          supabase_user_id: user.id,
        },
      },
      checkoutOptions: {
        embed: false,
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/home?checkout=success`,
        receiptButtonText: "Return to Teach AI Early",
        receiptThankYouNote:
          "Welcome to Explorer Pro! All 12 worlds are now unlocked.",
      },
    });

    if (error) {
      console.error("Lemon Squeezy checkout error:", error);
      return NextResponse.json(
        { error: "Failed to create checkout" },
        { status: 500 }
      );
    }

    const checkoutUrl = data?.data?.attributes?.url;

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "No checkout URL returned" },
        { status: 500 }
      );
    }

    // Store a placeholder in subscriptions if not exists
    const admin = createAdminClient();
    const { data: existingSub } = await admin
      .from("subscriptions")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!existingSub) {
      await admin.from("subscriptions").insert({ id: user.id });
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    console.error("Checkout error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
