"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getWorld, getLesson } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";
import { RuleRobotVsAI } from "@/components/interactives/RuleRobotVsAI";
import { SpotTheAI } from "@/components/interactives/SpotTheAI";
import { WhoDoesItBetter } from "@/components/interactives/WhoDoesItBetter";
import { TimelineBuilder } from "@/components/interactives/TimelineBuilder";
import { AISpotterChallenge } from "@/components/interactives/AISpotterChallenge";
import { TeachTheSorter } from "@/components/interactives/TeachTheSorter";
import { DataChef } from "@/components/interactives/DataChef";
import { GuessTheNext } from "@/components/interactives/GuessTheNext";
import { StumpTheAI } from "@/components/interactives/StumpTheAI";
import { TrainingTracker } from "@/components/interactives/TrainingTracker";
import { TrainClassifierChallenge } from "@/components/interactives/TrainClassifierChallenge";
import { LockedInteractive } from "@/components/interactives/LockedInteractive";
import { AIGameShow } from "@/components/interactives/AIGameShow";

type Phase = "concept" | "interactive" | "takeaway" | "complete";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const worldId = Number(params.worldId);
  const lessonIdParam = params.lessonId as string;
  const isChallenge = lessonIdParam === "challenge";

  const world = getWorld(worldId);
  const lesson = isChallenge ? null : getLesson(worldId, lessonIdParam);
  const { markLessonComplete, markChallengeComplete, progress } = useProgress();

  const [phase, setPhase] = useState<Phase>("concept");
  const [interactiveDone, setInteractiveDone] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const [showXpPop, setShowXpPop] = useState(false);

  if (!world) return null;

  const isAlreadyDone = isChallenge
    ? progress.completedChallenges.includes(worldId)
    : progress.completedLessons.includes(lessonIdParam);

  const title = isChallenge ? world.challenge.title : lesson?.title ?? "";
  const concept = isChallenge ? world.challenge.description : lesson?.concept ?? "";
  const interactiveTitle = isChallenge
    ? world.challenge.title
    : lesson?.interactiveTitle ?? "";
  const takeaway = isChallenge
    ? `You earned the ${world.challenge.badgeName} badge!`
    : lesson?.dinnerTakeaway ?? "";
  const xpReward = isChallenge ? world.challenge.xpReward : lesson?.xpReward ?? 0;
  const interactiveType = isChallenge
    ? world.challenge.interactiveType
    : lesson?.interactiveType ?? "locked";

  function handleInteractiveDone() {
    setInteractiveDone(true);
  }

  function handleContinue() {
    if (phase === "concept") {
      setPhase("interactive");
    } else if (phase === "interactive") {
      setPhase("takeaway");
      // Award XP
      if (!xpAwarded && !isAlreadyDone) {
        if (isChallenge) {
          markChallengeComplete(worldId, world!.challenge.badgeName, xpReward);
        } else {
          markLessonComplete(lessonIdParam, xpReward);
        }
        setXpAwarded(true);
        setShowXpPop(true);
        setTimeout(() => setShowXpPop(false), 2500);
      }
    } else if (phase === "takeaway") {
      setPhase("complete");
    } else {
      router.push(`/world/${worldId}`);
    }
  }

  function renderInteractive() {
    switch (interactiveType) {
      case "rule-robot-vs-ai":
        return <RuleRobotVsAI onComplete={handleInteractiveDone} />;
      case "spot-the-ai":
        return <SpotTheAI onComplete={handleInteractiveDone} />;
      case "who-does-it-better":
        return <WhoDoesItBetter onComplete={handleInteractiveDone} />;
      case "timeline-builder":
        return <TimelineBuilder onComplete={handleInteractiveDone} />;
      case "ai-spotter-challenge":
        return (
          <AISpotterChallenge
            onComplete={(passed) => {
              handleInteractiveDone();
              if (passed) handleContinue();
            }}
          />
        );
      case "teach-the-sorter":
        return <TeachTheSorter onComplete={handleInteractiveDone} />;
      case "data-chef":
        return <DataChef onComplete={handleInteractiveDone} />;
      case "guess-the-next":
        return <GuessTheNext onComplete={handleInteractiveDone} />;
      case "stump-the-ai":
        return <StumpTheAI onComplete={handleInteractiveDone} />;
      case "training-tracker":
        return <TrainingTracker onComplete={handleInteractiveDone} />;
      case "train-classifier-challenge":
        return (
          <TrainClassifierChallenge
            onComplete={(passed) => {
              handleInteractiveDone();
              if (passed) handleContinue();
            }}
          />
        );
      case "ai-game-show":
        return (
          <AIGameShow
            onComplete={(passed) => {
              handleInteractiveDone();
              if (passed) handleContinue();
            }}
          />
        );
      default:
        return <LockedInteractive title={interactiveTitle} onComplete={handleInteractiveDone} />;
    }
  }

  const progressSteps = ["concept", "interactive", "takeaway", "complete"];
  const currentStep = progressSteps.indexOf(phase);

  return (
    <div className="min-h-screen bg-space-900">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-space-900/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => router.push(`/world/${worldId}`)}
            className="text-slate-400 hover:text-white font-bold text-sm transition-colors"
          >
            ✕
          </button>
          <div className="flex-1">
            <div className="flex gap-1.5">
              {progressSteps.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-2 rounded-full transition-all duration-500"
                  style={{
                    background: i <= currentStep ? world.hex : "#334155",
                  }}
                />
              ))}
            </div>
          </div>
          <span className="text-xs font-bold text-yellow-400">+{xpReward} XP</span>
        </div>
      </div>

      {/* XP Pop */}
      {showXpPop && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-yellow-400 text-yellow-900 font-black text-xl px-6 py-3 rounded-2xl animate-bounce shadow-lg">
          +{xpReward} XP ⭐
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Phase: Concept */}
        {phase === "concept" && (
          <div className="space-y-6">
            <div>
              <div className="text-xs font-black mb-2" style={{ color: world.hex }}>
                {isChallenge ? "CHALLENGE" : `WORLD ${world.id} · LESSON`}
              </div>
              <h1 className="text-3xl font-black text-white leading-tight">{title}</h1>
            </div>

            <div
              className="p-6 rounded-2xl border"
              style={{ background: world.hex + "15", borderColor: world.hex + "40" }}
            >
              <div className="text-xs font-black text-slate-400 mb-3">THE BIG IDEA</div>
              <p className="text-white text-lg leading-relaxed font-semibold">{concept}</p>
            </div>

            <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
              <div className="text-xs font-black text-slate-400 mb-2">COMING UP</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <div className="font-black text-white">{interactiveTitle}</div>
                  <div className="text-xs text-slate-400">Interactive activity</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-5 rounded-2xl font-black text-xl text-white btn-press transition-all"
              style={{ background: `linear-gradient(135deg, ${world.hex}, ${world.hex}bb)` }}
            >
              Let's Go! →
            </button>
          </div>
        )}

        {/* Phase: Interactive */}
        {phase === "interactive" && (
          <div className="space-y-6">
            <div>
              <div className="text-xs font-black mb-2" style={{ color: world.hex }}>
                INTERACTIVE
              </div>
              <h2 className="text-2xl font-black text-white">{interactiveTitle}</h2>
            </div>

            {renderInteractive()}

            {interactiveDone && (
              <button
                onClick={handleContinue}
                className="w-full py-5 rounded-2xl font-black text-xl text-white btn-press transition-all mt-4"
                style={{ background: `linear-gradient(135deg, ${world.hex}, ${world.hex}bb)` }}
              >
                Continue →
              </button>
            )}
          </div>
        )}

        {/* Phase: Takeaway */}
        {phase === "takeaway" && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <div className="text-7xl mb-4 animate-float inline-block">🍽️</div>
              <h2 className="text-2xl font-black text-white">Dinner Table Takeaway</h2>
              <p className="text-slate-400 mt-2">Tell someone in your family tonight:</p>
            </div>

            <div
              className="p-7 rounded-3xl text-center border"
              style={{ background: world.hex + "15", borderColor: world.hex + "40" }}
            >
              <p className="text-xl font-black text-white leading-relaxed">
                "{takeaway}"
              </p>
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-5 rounded-2xl font-black text-xl text-white btn-press transition-all"
              style={{ background: `linear-gradient(135deg, ${world.hex}, ${world.hex}bb)` }}
            >
              I'll share it! →
            </button>
          </div>
        )}

        {/* Phase: Complete */}
        {phase === "complete" && (
          <div className="text-center space-y-6 py-8">
            <div className="text-8xl animate-float inline-block">
              {isChallenge ? world.challenge.badgeEmoji : "⭐"}
            </div>
            <div>
              <h2 className="text-3xl font-black text-white">
                {isChallenge ? "Badge Earned!" : "Lesson Complete!"}
              </h2>
              {isChallenge && (
                <p className="text-slate-300 mt-2 text-lg">
                  You earned the <strong style={{ color: world.hex }}>{world.challenge.badgeName}</strong> badge!
                </p>
              )}
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="text-yellow-400 font-black text-xl">+{xpReward} XP</span>
                <span className="text-yellow-400">⭐</span>
              </div>
            </div>

            <button
              onClick={() => router.push(`/world/${worldId}`)}
              className="w-full py-5 rounded-2xl font-black text-xl text-white btn-press transition-all"
              style={{ background: `linear-gradient(135deg, ${world.hex}, ${world.hex}bb)` }}
            >
              Back to World {worldId} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
