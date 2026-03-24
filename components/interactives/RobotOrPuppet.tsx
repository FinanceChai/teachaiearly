"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Scenario {
  name: string;
  emoji: string;
  description: string;
  isAI: boolean;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    name: "Industrial Arm on Assembly Line",
    emoji: "🏭",
    description: "A mechanical arm that welds the same spot on every car, over and over, exactly the same way.",
    isAI: false,
    explanation: "This arm follows a fixed program — it repeats the exact same motion every time. It doesn't learn or adapt. If a car is slightly different, it still welds the same spot!",
  },
  {
    name: "Robot Vacuum That Maps Your House",
    emoji: "🤖",
    description: "A vacuum that learns the layout of your rooms, remembers where furniture is, and finds the fastest cleaning path.",
    isAI: true,
    explanation: "This vacuum uses AI to build a map of your home, learn where obstacles are, and improve its cleaning route over time. It adapts to changes in your furniture layout!",
  },
  {
    name: "Automatic Sliding Doors",
    emoji: "🚪",
    description: "Doors at a grocery store that open when anyone walks near them.",
    isAI: false,
    explanation: "These doors use a simple motion sensor — if something moves nearby, they open. No learning, no adapting, no intelligence. Just a sensor and a motor!",
  },
  {
    name: "Self-Driving Car",
    emoji: "🚗",
    description: "A car that recognizes pedestrians, reads traffic signs, and decides when to brake or turn — all by itself.",
    isAI: true,
    explanation: "Self-driving cars use multiple AI systems: computer vision to see, machine learning to make decisions, and they improve from millions of miles of driving data!",
  },
  {
    name: "Vending Machine",
    emoji: "🥤",
    description: "Put in money, press a button, get a snack. Same thing every time.",
    isAI: false,
    explanation: "A vending machine is pure mechanics — it doesn't learn what you like, doesn't adapt to anything. It just follows simple if-then rules: money in → snack out!",
  },
  {
    name: "Drone That Avoids Obstacles",
    emoji: "🛸",
    description: "A delivery drone that detects trees, buildings, and birds in its path and figures out new routes around them in real-time.",
    isAI: true,
    explanation: "This drone uses AI-powered computer vision to identify obstacles and machine learning to plan new paths on the fly. It adapts to unexpected situations!",
  },
  {
    name: "Dishwasher",
    emoji: "🍽️",
    description: "Load dishes, press start, it runs the same wash cycle every time.",
    isAI: false,
    explanation: "A dishwasher runs a pre-programmed cycle — heat water, spray, rinse, dry. It doesn't know if the dishes are clean or dirty. No learning involved!",
  },
  {
    name: "Robot Dog",
    emoji: "🐕",
    description: "A robot pet that recognizes your face, responds to your voice commands, and learns new tricks over time.",
    isAI: true,
    explanation: "Robot dogs like Aibo use AI for face recognition, voice understanding, and they genuinely learn — they develop different personalities based on how you interact with them!",
  },
];

export function RobotOrPuppet({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const scenario = SCENARIOS[current];

  const handleAnswer = (isAI: boolean) => {
    if (revealed) return;
    setAnswer(isAI);
    setRevealed(true);
    if (isAI === scenario.isAI) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current < SCENARIOS.length - 1) {
      setCurrent((c) => c + 1);
      setAnswer(null);
      setRevealed(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const pct = Math.round((score / SCENARIOS.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-space-800 rounded-2xl p-6 border border-slate-700 text-center"
      >
        <div className="text-5xl mb-4">🏆</div>
        <h2 className="text-2xl font-bold text-white mb-2">Challenge Complete!</h2>
        <p className="text-slate-300 mb-4">
          You scored <span className="text-zinc-400 font-bold">{score}/{SCENARIOS.length}</span> ({pct}%)
        </p>
        <p className="text-slate-300 mb-6">
          {pct >= 75
            ? "Amazing! You really know the difference between AI and simple machines!"
            : pct >= 50
            ? "Good effort! The line between AI and machines can be tricky."
            : "Keep learning! AI is all about machines that can learn and adapt."}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="px-6 py-3 bg-zinc-400 text-space-900 font-bold rounded-xl"
        >
          Continue
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="bg-space-800 rounded-2xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Robot or Just a Machine?</h2>
        <span className="text-zinc-400 text-sm font-mono">{current + 1}/{SCENARIOS.length}</span>
      </div>

      <div className="w-full bg-space-900 rounded-full h-2 mb-6">
        <motion.div
          className="bg-zinc-400 h-2 rounded-full"
          animate={{ width: `${((current + 1) / SCENARIOS.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-space-900 rounded-xl p-5 mb-5 text-center">
            <div className="text-5xl mb-3">{scenario.emoji}</div>
            <h3 className="text-xl font-bold text-white mb-2">{scenario.name}</h3>
            <p className="text-slate-300">{scenario.description}</p>
          </div>

          {!revealed ? (
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(true)}
                className="p-4 bg-space-900 border-2 border-zinc-400/30 rounded-xl text-white font-bold hover:border-zinc-400 transition-colors"
              >
                <span className="text-2xl block mb-1">🧠</span>
                Robot with AI
                <span className="block text-xs text-slate-300 mt-1">Adapts &amp; learns</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(false)}
                className="p-4 bg-space-900 border-2 border-slate-500/30 rounded-xl text-white font-bold hover:border-slate-500 transition-colors"
              >
                <span className="text-2xl block mb-1">⚙️</span>
                Just a Machine
                <span className="block text-xs text-slate-300 mt-1">Fixed rules only</span>
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className={`p-4 rounded-xl mb-4 border-2 ${
                  answer === scenario.isAI
                    ? "bg-emerald-500/10 border-emerald-500/40"
                    : "bg-red-500/10 border-red-500/40"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{answer === scenario.isAI ? "✅" : "❌"}</span>
                  <span className="text-white font-bold">
                    {answer === scenario.isAI ? "Correct!" : "Not quite!"}
                  </span>
                  <span className="ml-auto text-sm text-slate-300">
                    Answer: {scenario.isAI ? "🧠 Robot with AI" : "⚙️ Just a Machine"}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">{scenario.explanation}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleNext}
                className="w-full py-3 bg-zinc-400 text-space-900 font-bold rounded-xl"
              >
                {current < SCENARIOS.length - 1 ? "Next Scenario →" : "See Results"}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 text-center text-slate-500 text-sm">
        Score: {score}/{current + (revealed ? 1 : 0)}
      </div>
    </div>
  );
}
