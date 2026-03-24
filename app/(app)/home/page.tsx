"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { WORLDS } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";
import { isWorldUnlocked, isChallengeCompleted } from "@/lib/progress";
import PaywallModal from "@/components/PaywallModal";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-4xl animate-float">🚀</div></div>}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const { progress, profile, isSubscribed, mounted, xpInfo } = useProgress();
  const [showPaywall, setShowPaywall] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("checkout") === "success") {
      setShowCheckoutSuccess(true);
      // Clear the query param from URL
      window.history.replaceState({}, "", "/home");
      setTimeout(() => setShowCheckoutSuccess(false), 5000);
    }
  }, [searchParams]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-float">🚀</div>
      </div>
    );
  }

  const xpToNextLevel = xpInfo.nextLevelXp - progress.xp;
  const xpInLevel = xpInfo.nextLevelXp - (xpInfo.level > 1 ? xpInfo.nextLevelXp / 2 : 0);
  const xpProgress = Math.min((progress.xp / xpInfo.nextLevelXp) * 100, 100);

  return (
    <div className="min-h-screen bg-space-900 stars-bg">
      {/* Checkout success banner */}
      {showCheckoutSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-teal-500 text-white font-black px-6 py-3 rounded-2xl shadow-lg shadow-teal-500/30 animate-float">
          🎉 Welcome to Explorer Pro! All worlds unlocked.
        </div>
      )}
      {/* Header */}
      <div className="sticky top-0 z-40 bg-space-900/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{profile?.avatar ?? "🚀"}</div>
              <div>
                <div className="font-black text-white text-lg leading-tight">
                  {profile?.name ?? "Explorer"}
                </div>
                <div className="text-xs text-slate-400 font-bold">
                  Level {xpInfo.level} · {xpInfo.title}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Streak */}
              <div className="flex flex-col items-center">
                <span className="text-xl">🔥</span>
                <span className="text-xs font-black text-orange-400">{progress.streak}</span>
              </div>
              {/* XP */}
              <div className="flex flex-col items-center">
                <span className="text-xl">⭐</span>
                <span className="text-xs font-black text-yellow-400">{progress.xp}</span>
              </div>
            </div>
          </div>
          {/* XP Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-700"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className="text-xs text-slate-400 font-bold whitespace-nowrap">
              {progress.xp} / {xpInfo.nextLevelXp} XP
            </div>
          </div>
        </div>
      </div>

      {/* World Map */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white">Your Journey</h1>
          <p className="text-slate-400 mt-1">
            {progress.completedLessons.length} lessons completed ·{" "}
            {progress.earnedBadges.length} badges earned
          </p>
        </div>

        {/* World path */}
        <div className="relative">
          {/* Connecting path */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-700 -translate-x-1/2 rounded-full" />

          <div className="space-y-6">
            {WORLDS.map((world, idx) => {
              const unlocked = isWorldUnlocked(world.id, isSubscribed, world.tier);
              const challengeDone = isChallengeCompleted(world.id);
              const lessonsCompleted = world.lessons.filter((l) =>
                progress.completedLessons.includes(l.id)
              ).length;
              const totalLessons = world.lessons.length;
              const progressPct = (lessonsCompleted / totalLessons) * 100;
              const isLocked = !unlocked;
              const worldHref = isLocked ? "#" : `/world/${world.id}`;

              return (
                <div key={world.id} className="relative flex items-center gap-4">
                  {/* Alternating layout */}
                  {idx % 2 === 0 ? (
                    <>
                      <WorldCard
                        world={world}
                        isLocked={isLocked}
                        lessonsCompleted={lessonsCompleted}
                        totalLessons={totalLessons}
                        progressPct={progressPct}
                        challengeDone={challengeDone}
                        isSubscribed={isSubscribed}
                        onLockedClick={() => setShowPaywall(true)}
                        href={worldHref}
                        className="flex-1"
                      />
                      <div
                        className="w-16 h-16 flex items-center justify-center rounded-full border-4 z-10 flex-shrink-0"
                        style={{
                          borderColor: isLocked ? "#334155" : world.hex,
                          background: isLocked ? "#1e293b" : world.hex + "30",
                          boxShadow: isLocked ? "none" : `0 0 20px ${world.hex}40`,
                        }}
                      >
                        <span className="text-2xl">{isLocked ? "🔒" : world.emoji}</span>
                      </div>
                      <div className="flex-1" />
                    </>
                  ) : (
                    <>
                      <div className="flex-1" />
                      <div
                        className="w-16 h-16 flex items-center justify-center rounded-full border-4 z-10 flex-shrink-0"
                        style={{
                          borderColor: isLocked ? "#334155" : world.hex,
                          background: isLocked ? "#1e293b" : world.hex + "30",
                          boxShadow: isLocked ? "none" : `0 0 20px ${world.hex}40`,
                        }}
                      >
                        <span className="text-2xl">{isLocked ? "🔒" : world.emoji}</span>
                      </div>
                      <WorldCard
                        world={world}
                        isLocked={isLocked}
                        lessonsCompleted={lessonsCompleted}
                        totalLessons={totalLessons}
                        progressPct={progressPct}
                        challengeDone={challengeDone}
                        isSubscribed={isSubscribed}
                        onLockedClick={() => setShowPaywall(true)}
                        href={worldHref}
                        className="flex-1"
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion message */}
        {progress.earnedBadges.length === 6 && (
          <div className="mt-12 bg-gradient-to-br from-teal-500/20 to-cyan-500/10 rounded-3xl p-8 border border-teal-500/30 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-black text-white mb-2">You're an AI Explorer!</h2>
            <p className="text-slate-300">
              You've completed all 6 worlds and earned every badge. You now know more about
              AI than most adults!
            </p>
          </div>
        )}
      </div>

      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
    </div>
  );
}

function WorldCard({
  world,
  isLocked,
  lessonsCompleted,
  totalLessons,
  progressPct,
  challengeDone,
  isSubscribed,
  onLockedClick,
  href,
  className,
}: {
  world: (typeof WORLDS)[0];
  isLocked: boolean;
  lessonsCompleted: number;
  totalLessons: number;
  progressPct: number;
  challengeDone: boolean;
  isSubscribed: boolean;
  onLockedClick: () => void;
  href: string;
  className?: string;
}) {
  const content = (
    <div
      className={`bg-space-800 rounded-2xl p-5 border transition-all ${
        isLocked
          ? "border-slate-700 opacity-60"
          : "border-slate-700 hover:border-slate-500 card-hover cursor-pointer"
      } ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs font-black text-slate-500 mb-1">WORLD {world.id}</div>
          <div className="font-black text-white text-base leading-tight">{world.title}</div>
          <div className="text-xs text-slate-400 mt-0.5">{world.subtitle}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          {world.tier === "free" ? (
            <span className="bg-teal-500/20 text-teal-300 text-xs font-black px-2 py-0.5 rounded-full border border-teal-500/30">
              FREE
            </span>
          ) : (
            <span className="bg-amber-500/20 text-amber-300 text-xs font-black px-2 py-0.5 rounded-full border border-amber-500/30">
              PRO
            </span>
          )}
          {challengeDone && (
            <span className="text-sm">{world.challenge.badgeEmoji}</span>
          )}
        </div>
      </div>

      {!isLocked && (
        <>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPct}%`,
                  background: world.hex,
                }}
              />
            </div>
            <span className="text-xs text-slate-400 font-bold">
              {lessonsCompleted}/{totalLessons}
            </span>
          </div>
          <div className="text-xs text-slate-500">
            {lessonsCompleted === 0
              ? "Not started"
              : lessonsCompleted === totalLessons
              ? challengeDone
                ? "✅ Complete!"
                : "Challenge ready!"
              : "In progress"}
          </div>
        </>
      )}

      {isLocked && (
        <div className="text-xs text-slate-500 flex items-center gap-1">
          🔒 Unlock with Explorer Pro
        </div>
      )}
    </div>
  );

  if (isLocked) {
    return (
      <button onClick={onLockedClick} className={`text-left ${className}`}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
