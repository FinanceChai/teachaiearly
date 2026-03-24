"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getProfile } from "@/lib/progress";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    // If not authenticated AND no localStorage profile, redirect
    if (!user && !getProfile()) {
      router.push("/");
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-space-900 pb-20">
      {children}
      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-space-800/95 backdrop-blur border-t border-slate-700 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-3 px-4">
          <NavItem href="/home" label="Worlds" icon="🗺️" active={pathname === "/home"} />
          <NavItem href="/badges" label="Badges" icon="🏆" active={pathname === "/badges"} />
          <NavItem href="/parent" label="Parent" icon="👨‍👩‍👧" active={pathname === "/parent"} />
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
      className={`flex flex-col items-center gap-1 px-6 py-1 rounded-xl transition-colors ${
        active ? "text-teal-400" : "text-slate-500 hover:text-slate-300"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-bold">{label}</span>
    </Link>
  );
}
