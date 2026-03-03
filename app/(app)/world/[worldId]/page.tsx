"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getWorld } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";
import { isLessonUnlocked, isChallengeCompleted } from "@/lib/progress";
import PaywallModal from "@/components/PaywallModal";

export default function WorldPage() {
  const params = useParams();
  const router = useRouter();
  const worldId = Number(params.worldId);
  const world = getWorld(worldId);
  const { progress, isSubscribed, mounted } = useProgress();
  const [showPaywall, setShowPaywall] = useState(false);

  if (!world) return null;
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-float">{world.emoji}</div>
      </div>
    );
  }

  const challengeDone = isChallengeCompleted(world.id);
  const lessonsCompleted = world.lessons.filter((l) =>
    progress.completedLessons.includes(l.id)
  ).length;
  const allLessonsDone = lessonsCompleted === world.lessons.length;

  return (
    <div className="min-h-screen bg-space-900">
      {/* World Header */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${world.hex}30, transparent)` }}
      >
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-10">
          <button
            onClick={() => router.back()}
            className="text-slate-400 hover:text-white flex items-center gap-2 mb-6 font-bold text-sm transition-colors"
          >
            ← Back to Map
          </button>

          <div className="flex items-start gap-5">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{ background: world.hex + "30", border: `2px solid ${world.hex}60` }}
            >
              {world.emoji}
            </div>
            <div>
              <div className="text-xs font-black text-slate-400 mb-1">WORLD {world.id}</div>
              <h1 className="text-3xl font-black text-white leading-tight">{world.title}</h1>
              <p className="text-slate-400 mt-1 text-sm">{world.theme}</p>
              <div className="flex items-center gap-3 mt-3">
                <span
                  className="text-xs font-black px-3 py-1 rounded-full"
                  style={{ background: world.hex + "30", color: world.hex }}
                >
                  {world.lessons.length} lessons
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  {lessonsCompleted}/{world.lessons.length} complete
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(lessonsCompleted / world.lessons.length) * 100}%`,
                background: world.hex,
              }}
            />
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <h2 className="text-xl font-black text-white mb-4">Lessons</h2>
        <div className="space-y-3">
          {world.lessons.map((lesson, idx) => {
            const completed = progress.completedLessons.includes(lesson.id);
            const unlocked = isLessonUnlocked(world.id, lesson.lessonNumber, isSubscribed, world.tier);
            const isNext = !completed && unlocked;

            return (
              <div key={lesson.id}>
                {unlocked ? (
                  <Link href={`/lesson/${world.id}/${lesson.id}`}>
                    <LessonRow
                      number={idx + 1}
                      title={lesson.title}
                      interactive={lesson.interactiveTitle}
                      xp={lesson.xpReward}
                      completed={completed}
                      isNext={isNext}
                      color={world.hex}
                    />
                  </Link>
                ) : (
                  <button
                    onClick={() => world.tier === "paid" && !isSubscribed && setShowPaywall(true)}
                    className="w-full text-left"
                  >
                    <LessonRow
                      number={idx + 1}
                      title={lesson.title}
                      interactive={lesson.interactiveTitle}
                      xp={lesson.xpReward}
                      completed={completed}
                      isNext={false}
                      locked
                      color={world.hex}
                    />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Challenge */}
        <div className="mt-8">
          <h2 className="text-xl font-black text-white mb-4">World Challenge</h2>
          <Link href={`/lesson/${world.id}/challenge`}>
            <ChallengeCard world={world} unlocked challengeDone={challengeDone} />
          </Link>
        </div>
      </div>

      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
    </div>
  );
}

function LessonRow({
  number,
  title,
  interactive,
  xp,
  completed,
  isNext,
  locked,
  color,
}: {
  number: number;
  title: string;
  interactive: string;
  xp: number;
  completed: boolean;
  isNext: boolean;
  locked?: boolean;
  color: string;
}) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
        locked
          ? "border-slate-700 bg-space-800 opacity-50"
          : isNext
          ? "border-slate-500 bg-space-800 hover:border-slate-400"
          : completed
          ? "border-slate-700 bg-space-800"
          : "border-slate-700 bg-space-800 hover:border-slate-600"
      }`}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0"
        style={
          completed
            ? { background: color + "30", color: color }
            : locked
            ? { background: "#1e293b", color: "#475569" }
            : isNext
            ? { background: color + "20", color: color, border: `2px solid ${color}` }
            : { background: "#1e293b", color: "#64748b" }
        }
      >
        {locked ? "🔒" : completed ? "✓" : number}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`font-black text-sm leading-tight ${locked ? "text-slate-500" : "text-white"}`}>
          {title}
        </div>
        <div className="text-xs text-slate-500 mt-0.5 truncate">{interactive}</div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {isNext && (
          <span
            className="text-xs font-black px-2 py-1 rounded-lg"
            style={{ background: color + "30", color: color }}
          >
            NEXT
          </span>
        )}
        <span className="text-xs text-yellow-400 font-bold">+{xp} XP</span>
        {!locked && !completed && <span className="text-slate-400">›</span>}
      </div>
    </div>
  );
}

function ChallengeCard({
  world,
  unlocked,
  challengeDone,
}: {
  world: ReturnType<typeof getWorld>;
  unlocked: boolean;
  challengeDone: boolean;
}) {
  if (!world) return null;
  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        challengeDone
          ? "border-yellow-500/30 bg-yellow-500/10"
          : unlocked
          ? "border-slate-500 bg-space-800 hover:border-slate-400 cursor-pointer"
          : "border-slate-700 bg-space-800 opacity-50"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
          style={
            challengeDone
              ? { background: "#eab30830", border: "2px solid #eab30860" }
              : unlocked
              ? { background: world.hex + "20", border: `2px solid ${world.hex}` }
              : { background: "#1e293b" }
          }
        >
          {challengeDone ? world.challenge.badgeEmoji : unlocked ? "🎯" : "🔒"}
        </div>
        <div className="flex-1">
          <div className="font-black text-white">{world.challenge.title}</div>
          <div className="text-sm text-slate-400 mt-0.5">{world.challenge.description}</div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-yellow-400 font-bold">
              +{world.challenge.xpReward} XP
            </span>
            <span className="text-xs text-slate-500">
              Badge: {world.challenge.badgeEmoji} {world.challenge.badgeName}
            </span>
          </div>
        </div>
        {unlocked && !challengeDone && <span className="text-slate-400 text-xl">›</span>}
        {challengeDone && (
          <span className="text-green-400 text-xl font-black">✓</span>
        )}
      </div>
      {!unlocked && (
        <div className="mt-3 text-xs text-slate-500">
          Complete all lessons to unlock the challenge
        </div>
      )}
    </div>
  );
}
