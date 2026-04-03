"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Scenario {
  title: string;
  description: string;
  icon: string;
  classAverage: number; // 0-3 scale
  discussionPrompt: string;
}

const RISK_LEVELS = [
  { label: "Not worried", color: "bg-green-500", emoji: "😊" },
  { label: "A little worried", color: "bg-yellow-500", emoji: "🤔" },
  { label: "Pretty worried", color: "bg-orange-500", emoji: "😟" },
  { label: "Very worried", color: "bg-red-500", emoji: "😰" },
];

const SCENARIOS: Scenario[] = [
  {
    title: "AI decides who gets a job interview",
    description: "Companies use AI to scan resumes and decide which people get interviewed. The AI looks at keywords, school names, and past experience.",
    icon: "💼",
    classAverage: 2,
    discussionPrompt: "What if the AI learned biases from old hiring data? For example, if a company mostly hired one type of person before, the AI might keep picking that type.",
  },
  {
    title: "AI monitors students in school",
    description: "AI cameras and software track student behavior, attention levels, and facial expressions during class. Teachers see reports on who was 'engaged' or 'distracted.'",
    icon: "🏫",
    classAverage: 2,
    discussionPrompt: "Is it fair to judge students by their facial expressions? Some people concentrate while looking distracted, and some cultures express attention differently.",
  },
  {
    title: "AI writes news articles",
    description: "AI generates news stories automatically based on data, sometimes without human editors checking the facts first. Many news sites already use this.",
    icon: "📰",
    classAverage: 2,
    discussionPrompt: "If AI writes fake-sounding news perfectly, how do we know what's real? Who is responsible when an AI article gets facts wrong?",
  },
  {
    title: "AI controls military drones",
    description: "AI-powered drones can identify targets and make decisions about military actions, sometimes faster than humans can review the decision.",
    icon: "🎯",
    classAverage: 3,
    discussionPrompt: "Should a machine ever make life-or-death decisions without a human in the loop? What happens when the AI makes a mistake?",
  },
  {
    title: "AI picks what you see on social media",
    description: "AI algorithms decide every post, video, and ad you see. It's designed to keep you scrolling as long as possible by showing content that triggers strong emotions.",
    icon: "📱",
    classAverage: 2,
    discussionPrompt: "If the AI shows you angry or scary content because it keeps you watching longer, is that okay? Who's responsible for how it affects your mood?",
  },
  {
    title: "AI diagnoses diseases",
    description: "AI analyzes medical scans and symptoms to diagnose diseases, sometimes more accurately than doctors. But it can also make mistakes that affect treatment.",
    icon: "🏥",
    classAverage: 1,
    discussionPrompt: "AI can save lives by catching diseases early, but what if it misdiagnoses someone? Should a doctor always double-check, even if the AI is usually right?",
  },
];

export function RiskOMeter({ onComplete }: { onComplete: () => void }) {
  const [ratings, setRatings] = useState<number[]>(SCENARIOS.map(() => 0));
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [expandedScenario, setExpandedScenario] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const ratedCount = ratings.filter((r) => r > 0).length;
  const allRated = ratedCount === SCENARIOS.length;

  const handleRate = (level: number) => {
    const next = [...ratings];
    next[currentScenario] = level;
    setRatings(next);
  };

  const handleNext = () => {
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario(currentScenario + 1);
    } else {
      setShowComparison(true);
    }
  };

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  // Comparison view
  if (showComparison) {
    const avgWorry =
      ratings.reduce((sum, r) => sum + (r ?? 0), 0) / SCENARIOS.length;
    const worryLabel =
      avgWorry < 1 ? "Chill about AI" : avgWorry < 2 ? "Cautiously Optimistic" : avgWorry < 2.5 ? "Thoughtfully Concerned" : "AI Watchdog";

    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">📊 Your Risk Profile</h2>

        <div className="bg-space-800 rounded-xl p-4 mb-4 text-center">
          <p className="text-amber-400 font-bold text-lg">{worryLabel}</p>
          <p className="text-slate-600 text-sm">
            Your average worry level: {avgWorry.toFixed(1)} / 3
          </p>
        </div>

        <div className="space-y-2 mb-4">
          {SCENARIOS.map((scenario, i) => {
            const userRating = ratings[i] ?? 0;
            const diff = userRating - scenario.classAverage;

            return (
              <div key={scenario.title} className="bg-space-800 rounded-lg p-3">
                <button
                  onClick={() => setExpandedScenario(expandedScenario === i ? null : i)}
                  className="w-full text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{scenario.icon}</span>
                    <p className="text-slate-900 text-sm font-semibold flex-1">
                      {scenario.title}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-slate-400">You:</span>
                        <span className="text-amber-400">{RISK_LEVELS[userRating].emoji} {RISK_LEVELS[userRating].label}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs mt-0.5">
                        <span className="text-slate-400">Class avg:</span>
                        <span className="text-slate-600">{RISK_LEVELS[scenario.classAverage].emoji} {RISK_LEVELS[scenario.classAverage].label}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      Math.abs(diff) <= 0.5
                        ? "bg-green-500/20 text-green-400"
                        : diff > 0
                        ? "bg-red-500/20 text-red-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {Math.abs(diff) <= 0.5
                        ? "Similar!"
                        : diff > 0
                        ? "More worried"
                        : "Less worried"}
                    </div>
                  </div>
                </button>

                {expandedScenario === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-2 bg-amber-500/10 rounded-lg p-2 border border-amber-500/20"
                  >
                    <p className="text-amber-400 text-xs font-semibold">💬 Discussion:</p>
                    <p className="text-slate-600 text-xs mt-1">{scenario.discussionPrompt}</p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-space-800 rounded-lg p-4 mb-4">
          <p className="text-amber-400 font-semibold mb-1">💡 What this means:</p>
          <p className="text-slate-600 text-sm">
            There are no &quot;wrong&quot; answers here! Some people worry more about AI risks,
            and some are more optimistic. The important thing is thinking critically about
            each situation. Tap any scenario above to see a discussion question!
          </p>
        </div>

        {!done ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComplete}
            className="w-full px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-bold"
          >
            Complete Activity ✓
          </motion.button>
        ) : (
          <p className="text-center text-amber-400 font-semibold">✓ Activity Complete!</p>
        )}
      </div>
    );
  }

  // Rating phase
  const scenario = SCENARIOS[currentScenario];
  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-slate-900 mb-1">⚖️ Risk-O-Meter</h2>
      <p className="text-slate-600 text-sm mb-2">
        How worried are you about each AI scenario? ({ratedCount}/{SCENARIOS.length})
      </p>

      <div className="flex gap-1 mb-4">
        {SCENARIOS.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full ${
              ratings[i] !== null
                ? "bg-amber-500"
                : i === currentScenario
                ? "bg-amber-500/50"
                : "bg-space-800"
            }`}
          />
        ))}
      </div>

      <motion.div
        key={currentScenario}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="bg-space-800 rounded-xl p-5 border border-slate-200 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{scenario.icon}</span>
            <h3 className="text-lg font-bold text-slate-900">{scenario.title}</h3>
          </div>
          <p className="text-slate-600 text-sm">{scenario.description}</p>
        </div>

        <p className="text-amber-400 text-sm font-semibold mb-2">How worried does this make you?</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {RISK_LEVELS.map((level, i) => (
            <motion.button
              key={level.label}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleRate(i)}
              className={`p-3 rounded-lg border text-center ${
                ratings[currentScenario] === i
                  ? "bg-amber-500/20 border-amber-500"
                  : "bg-space-800 border-slate-200 hover:border-slate-500"
              }`}
            >
              <span className="text-2xl">{level.emoji}</span>
              <p className="text-slate-900 text-xs font-semibold mt-1">{level.label}</p>
            </motion.button>
          ))}
        </div>

        {ratings[currentScenario] !== null && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="w-full px-5 py-2 bg-amber-500 text-slate-900 rounded-lg font-bold"
          >
            {currentScenario < SCENARIOS.length - 1
              ? "Next Scenario →"
              : "See How You Compare →"}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
