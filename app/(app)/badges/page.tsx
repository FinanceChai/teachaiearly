"use client";

import { useProgress } from "@/hooks/useProgress";
import { WORLDS } from "@/lib/course-data";

export default function BadgesPage() {
  const { progress, mounted } = useProgress();

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-float">🏆</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">Badges</h1>
          <p className="text-slate-400 mt-1">
            {progress.earnedBadges.length} of {WORLDS.length} earned
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {WORLDS.map((world) => {
            const earned = progress.earnedBadges.includes(world.challenge.badgeName);
            return (
              <div
                key={world.id}
                className={`bg-space-800 rounded-2xl p-5 border text-center transition-all ${
                  earned
                    ? "border-yellow-500/40"
                    : "border-slate-700 opacity-50"
                }`}
              >
                <div className="text-5xl mb-3">
                  {earned ? world.challenge.badgeEmoji : "🔒"}
                </div>
                <div className="font-black text-white text-sm">
                  {world.challenge.badgeName}
                </div>
                <div className="text-xs text-slate-400 mt-1">{world.title}</div>
                {earned && (
                  <div className="mt-2 text-xs font-black text-yellow-400">
                    Earned!
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
