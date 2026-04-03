"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Scenario {
  title: string;
  icon: string;
  description: string;
  reasonsFair: string[];
  reasonsUnfair: string[];
  mockFairPercent: number;
  discussion: string;
}

const SCENARIOS: Scenario[] = [
  {
    title: "AI Aim Assist",
    icon: "🎯",
    description:
      "A shooter game uses AI to slightly adjust your aim toward enemies, making it easier to hit targets. All players have the same assist level.",
    reasonsFair: [
      "Makes the game accessible to new players",
      "Everyone gets the same assist — it is equal",
      "It reduces frustration and keeps players engaged",
    ],
    reasonsUnfair: [
      "It removes the need for real skill",
      "Skilled players lose their advantage",
      "Victories feel less earned",
    ],
    mockFairPercent: 62,
    discussion:
      "Aim assist is one of the most debated features in gaming. Console players often need it since controllers are less precise than mice, but competitive players argue it undermines skill-based gameplay.",
  },
  {
    title: "Dynamic Difficulty Adjustment",
    icon: "📊",
    description:
      "A game secretly makes itself easier when you are losing and harder when you are winning, without telling you. The goal is to keep the game feeling challenging but not frustrating.",
    reasonsFair: [
      "Keeps the game fun for everyone",
      "Prevents players from getting stuck",
      "Adapts to each player naturally",
    ],
    reasonsUnfair: [
      "Players should know the rules are changing",
      "It is manipulative — you did not consent to it",
      "It makes achievements feel fake",
    ],
    mockFairPercent: 45,
    discussion:
      "Many games (like Resident Evil 4 and Left 4 Dead) use hidden difficulty adjustment. The debate centers on transparency — should the game tell you it is helping you?",
  },
  {
    title: "AI That Learns Your Patterns",
    icon: "🧠",
    description:
      "In a fighting game, the AI opponent studies your moves and adapts its strategy to counter your favorite combos and habits.",
    reasonsFair: [
      "It creates a more realistic and challenging opponent",
      "It pushes players to improve and vary their strategy",
      "It simulates playing against a real human",
    ],
    reasonsUnfair: [
      "It punishes players for having a style",
      "It feels like the game is cheating",
      "Casual players will get frustrated",
    ],
    mockFairPercent: 71,
    discussion:
      "Games like Forza and some fighting games use adaptive AI. The key question: when does a smart AI opponent become an unfair one?",
  },
  {
    title: "AI Bot Teammates",
    icon: "🤖",
    description:
      "When a teammate disconnects in an online multiplayer match, an AI bot takes over their character for the rest of the game.",
    reasonsFair: [
      "Better than playing 4v5",
      "The bot follows team strategy",
      "It does not ruin the game for innocent teammates",
    ],
    reasonsUnfair: [
      "Bots might be better or worse than the player who left",
      "It changes the competitive balance",
      "Opponents did not sign up to play against AI",
    ],
    mockFairPercent: 83,
    discussion:
      "CS2 and other games have added AI bots for disconnected players. Most players prefer bots over empty slots, but competitive integrity remains a concern.",
  },
  {
    title: "AI-Generated Loot",
    icon: "🎁",
    description:
      "A game uses AI to generate personalized loot drops — giving you items that match your playstyle and keep you playing longer.",
    reasonsFair: [
      "Players get items they actually want",
      "It makes the game more enjoyable",
      "Every player gets a personalized experience",
    ],
    reasonsUnfair: [
      "It is designed to be addictive and manipulative",
      "It exploits psychology to keep you playing",
      "It could lead to unfair pay-to-win if combined with purchases",
    ],
    mockFairPercent: 38,
    discussion:
      "Personalized loot is becoming common, but critics compare it to slot machine design — using AI to maximize engagement (and spending) rather than fun.",
  },
];

export function FairPlayJudge({ onComplete }: { onComplete: () => void }) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [phase, setPhase] = useState<"vote" | "reason" | "results">("vote");
  const [vote, setVote] = useState<"fair" | "unfair" | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ vote: string; reason: string }[]>([]);
  const [finished, setFinished] = useState(false);

  const scenario = SCENARIOS[scenarioIdx];

  function handleVote(v: "fair" | "unfair") {
    setVote(v);
    setPhase("reason");
  }

  function handleReason(reason: string) {
    setSelectedReason(reason);
    setAnswers((a) => [...a, { vote: vote!, reason }]);
    setPhase("results");
  }

  function handleNext() {
    if (scenarioIdx + 1 >= SCENARIOS.length) {
      setFinished(true);
      return;
    }
    setScenarioIdx((i) => i + 1);
    setPhase("vote");
    setVote(null);
    setSelectedReason(null);
  }

  if (finished) {
    const fairCount = answers.filter((a) => a.vote === "fair").length;
    return (
      <div className="bg-space-800 rounded-xl border border-slate-200 p-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="text-4xl mb-4">⚖️</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Fair Play Judge Complete!</h3>
          <p className="text-slate-600 mb-2">
            You judged {fairCount} scenarios as Fair and {SCENARIOS.length - fairCount} as Unfair.
          </p>
          <p className="text-slate-600 text-sm mb-4">
            There are no perfect answers — AI in games raises real ethical questions about fairness, transparency, and manipulation. The important thing is thinking critically about these issues!
          </p>
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-red-500 hover:bg-red-400 text-slate-900 rounded-lg font-bold transition-colors"
          >
            Complete Activity
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-space-800 rounded-xl border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-900">⚖️ Fair Play Judge</h3>
        <span className="text-sm text-slate-600">
          {scenarioIdx + 1}/{SCENARIOS.length}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-4">
        {SCENARIOS.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < scenarioIdx
                ? "bg-red-500"
                : i === scenarioIdx
                ? "bg-red-400"
                : "bg-slate-700"
            }`}
          />
        ))}
      </div>

      <motion.div key={scenarioIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <div className="bg-space-900 rounded-lg p-4 mb-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{scenario.icon}</span>
            <h4 className="text-slate-900 font-bold">{scenario.title}</h4>
          </div>
          <p className="text-slate-600 text-sm">{scenario.description}</p>
        </div>

        {phase === "vote" && (
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleVote("fair")}
              className="flex-1 px-4 py-4 bg-green-900/20 border border-green-600/40 hover:border-green-400 rounded-lg text-slate-900 font-bold transition-colors"
            >
              ✅ Fair
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleVote("unfair")}
              className="flex-1 px-4 py-4 bg-red-900/20 border border-red-600/40 hover:border-red-400 rounded-lg text-slate-900 font-bold transition-colors"
            >
              ❌ Unfair
            </motion.button>
          </div>
        )}

        {phase === "reason" && (
          <div>
            <p className="text-slate-900 text-sm font-semibold mb-3">
              You voted {vote === "fair" ? "✅ Fair" : "❌ Unfair"}. Why?
            </p>
            <div className="space-y-2">
              {(vote === "fair" ? scenario.reasonsFair : scenario.reasonsUnfair).map(
                (reason, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => handleReason(reason)}
                    className="w-full text-left px-4 py-3 bg-space-900 border border-slate-200 hover:border-red-500 text-slate-600 rounded-lg text-sm transition-colors"
                  >
                    {reason}
                  </motion.button>
                )
              )}
            </div>
          </div>
        )}

        {phase === "results" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-space-900 rounded-lg p-4 mb-4 border border-slate-200">
              <p className="text-slate-900 text-sm font-semibold mb-3">What others think:</p>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-green-400">Fair {scenario.mockFairPercent}%</span>
                    <span className="text-red-400">Unfair {100 - scenario.mockFairPercent}%</span>
                  </div>
                  <div className="w-full bg-red-900/30 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-green-600 h-4 rounded-l-full transition-all"
                      style={{ width: `${scenario.mockFairPercent}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-xs mt-2 italic">Your reason: &quot;{selectedReason}&quot;</p>
            </div>

            <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-3 mb-4">
              <p className="text-red-400 text-xs font-semibold mb-1">💡 Discussion Point</p>
              <p className="text-slate-600 text-sm">{scenario.discussion}</p>
            </div>

            <button
              onClick={handleNext}
              className="w-full px-6 py-3 bg-red-500 hover:bg-red-400 text-slate-900 rounded-lg font-bold transition-colors"
            >
              {scenarioIdx + 1 >= SCENARIOS.length ? "See Summary" : "Next Scenario"}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
