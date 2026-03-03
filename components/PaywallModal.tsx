"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";

export default function PaywallModal({ onClose }: { onClose: () => void }) {
  const { startCheckout } = useProgress();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  async function handleCheckout(plan: "monthly" | "yearly") {
    if (!user) {
      window.location.href = "/?signup=true";
      return;
    }

    setLoading(true);
    setError("");
    try {
      const priceId =
        plan === "monthly"
          ? process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!
          : process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID!;
      await startCheckout(priceId);
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-space-800 rounded-3xl p-8 max-w-sm w-full border border-slate-700 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🔒</div>
          <h2 className="text-2xl font-black text-white">Explorer Pro</h2>
          <p className="text-slate-400 text-sm mt-2">
            Unlock all 6 worlds, 30 lessons, and 6 challenge badges.
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {[
            "✅ All 6 Worlds (30 lessons)",
            "✅ All 6 challenge badges",
            "✅ Full AI Playground",
            "✅ Parent dashboard + reports",
            "✅ Monthly new content",
          ].map((item) => (
            <li key={item} className="text-slate-300 text-sm font-bold">
              {item}
            </li>
          ))}
        </ul>

        {/* Pricing */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleCheckout("monthly")}
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-white font-black text-lg py-4 rounded-2xl btn-press transition-all shadow-lg disabled:opacity-60"
          >
            {loading ? "Loading..." : "Start Free Trial — $6/mo"}
          </button>
          <button
            onClick={() => handleCheckout("yearly")}
            disabled={loading}
            className="w-full bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-black text-sm py-3 rounded-2xl btn-press transition-all border border-teal-500/30 disabled:opacity-60"
          >
            Save 33% — $48/year
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-xs text-center mb-3">{error}</p>
        )}

        <button
          onClick={onClose}
          className="w-full text-slate-500 hover:text-slate-300 font-bold text-sm py-2 transition-colors"
        >
          Maybe later
        </button>
        <p className="text-center text-xs text-slate-600 mt-2">
          7-day free trial. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
