import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: sub } = await admin
    .from("subscriptions")
    .select("ls_customer_id")
    .eq("id", user.id)
    .single();

  if (!sub?.ls_customer_id) {
    return NextResponse.json({ error: "No subscription" }, { status: 400 });
  }

  // Lemon Squeezy customer portal URL
  const portalUrl = `https://app.lemonsqueezy.com/my-orders`;

  return NextResponse.json({ url: portalUrl });
}
