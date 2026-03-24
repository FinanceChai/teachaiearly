"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { WORLDS } from "@/lib/course-data";
import { resetProgress } from "@/lib/progress";

export default function ParentPage() {
  const router = useRouter();
  const { progress, profile, isSubscribed, mounted, xpInfo } = useProgress();
  const { user, signOut } = useAuth();
  const [portalLoading, setPortalLoading] = useState(false);

  function handleReset() {
    if (confirm("Reset all progress? This cannot be undone.")) {
      resetProgress();
      router.push("/");
    }
  }

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  async function handleManageSubscription() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Portal error:", err);
    }
    setPortalLoading(false);
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-float">👨‍👩‍👧</div>
      </div>
    );
  }

  const lessonsCompleted = progress.completedLessons.length;
  const badgesEarned = progress.earnedBadges.length;

  return (
    <div className="min-h-screen bg-space-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">Parent Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Track {profile?.name ?? "your child"}&apos;s progress
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-space-800 rounded-2xl p-4 border border-slate-700 text-center">
            <div className="text-3xl font-black text-yellow-400">{progress.xp}</div>
            <div className="text-xs text-slate-400 mt-1 font-bold">XP Earned</div>
          </div>
          <div className="bg-space-800 rounded-2xl p-4 border border-slate-700 text-center">
            <div className="text-3xl font-black text-teal-400">{lessonsCompleted}</div>
            <div className="text-xs text-slate-400 mt-1 font-bold">Lessons Done</div>
          </div>
          <div className="bg-space-800 rounded-2xl p-4 border border-slate-700 text-center">
            <div className="text-3xl font-black text-purple-400">{badgesEarned}</div>
            <div className="text-xs text-slate-400 mt-1 font-bold">Badges</div>
          </div>
        </div>

        {/* Level */}
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700 mb-4">
          <div className="font-black text-white mb-2">Level {xpInfo.level} — {xpInfo.title}</div>
          <div className="bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all"
              style={{ width: `${Math.min((progress.xp / xpInfo.nextLevelXp) * 100, 100)}%` }}
            />
          </div>
          <div className="text-xs text-slate-400 mt-1">{progress.xp} / {xpInfo.nextLevelXp} XP to next level</div>
        </div>

        {/* World progress */}
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="font-black text-white mb-4">World Progress</div>
          <div className="space-y-3">
            {WORLDS.map((world) => {
              const done = world.lessons.filter((l) =>
                progress.completedLessons.includes(l.id)
              ).length;
              const pct = (done / world.lessons.length) * 100;
              const challengeDone = progress.earnedBadges.includes(world.challenge.badgeName);
              return (
                <div key={world.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold text-white">{world.emoji} {world.title}</span>
                    <span className="text-slate-400 font-bold">
                      {done}/{world.lessons.length}
                      {challengeDone && " + badge"}
                    </span>
                  </div>
                  <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: world.hex }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscription management */}
        {user && isSubscribed && (
          <button
            onClick={handleManageSubscription}
            disabled={portalLoading}
            className="w-full mt-4 py-3 rounded-2xl font-black text-teal-400 border border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/20 transition-colors disabled:opacity-60"
          >
            {portalLoading ? "Loading..." : "Manage Subscription"}
          </button>
        )}

        {/* Sign out */}
        {user && (
          <button
            onClick={handleSignOut}
            className="w-full mt-4 py-3 rounded-2xl font-black text-slate-400 border border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
          >
            Sign Out
          </button>
        )}

        <button
          onClick={handleReset}
          className="w-full mt-4 py-3 rounded-2xl font-black text-red-400 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-colors"
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
}
