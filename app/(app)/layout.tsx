"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getProfile } from "@/lib/progress";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (loading) return;
    // If not authenticated AND no localStorage profile, redirect
    if (!user && !getProfile()) {
      router.push("/");
    }
  }, [user, loading, router]);

  async function handleLogout() {
    await signOut();
    const appKeys = [
      "ai_explorer_profile",
      "ai_explorer_progress",
      "ai_explorer_subscribed",
      "ai_explorer_saved_cards",
      "ai_daily_last_completed",
      "ai_daily_last_answer",
    ];
    appKeys.forEach((key) => localStorage.removeItem(key));
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-space-900 pb-20">
      {children}
      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-space-800/95 backdrop-blur border-t border-slate-700 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-3 px-4">
          <NavItem href="/home" label="Worlds" icon="🗺️" active={pathname === "/home"} />
          <NavItem href="/flashcards" label="Cards" icon="🃏" active={pathname?.startsWith("/flashcards")} />
          <NavItem href="/daily" label="Daily" icon="⚡" active={pathname === "/daily"} />
          <NavItem href="/badges" label="Badges" icon="🏆" active={pathname === "/badges"} />
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors text-slate-500 hover:text-red-400"
          >
            <span className="text-2xl">🚪</span>
            <span className="text-xs font-bold">Log Out</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors ${
        active ? "text-teal-400" : "text-slate-500 hover:text-slate-300"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-bold">{label}</span>
    </Link>
  );
}
