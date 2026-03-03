"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from "framer-motion";

const SCENARIOS = [
  { emoji: "📺", label: "Netflix recommends shows you might like", isAI: true, explanation: "It learns your taste from what you watch and skip." },
  { emoji: "🧮", label: "Calculator does 847 × 23", isAI: false, explanation: "Just follows exact math rules — same every time, no learning." },
  { emoji: "✏️", label: "Autocorrect fixes your spelling", isAI: true, explanation: "Trained on millions of texts to predict what word you meant." },
  { emoji: "🚦", label: "Traffic light changes every 60 seconds", isAI: false, explanation: "Simple timer — does not react to traffic, just counts down." },
  { emoji: "🎮", label: "Game enemies dodge your attacks", isAI: true, explanation: "Adapts to your play style — learns your moves." },
  { emoji: "📧", label: "Spam filter catches junk email", isAI: true, explanation: "Learns to spot new patterns in spam — gets better over time." },
  { emoji: "💡", label: "Light switch turns on the light", isAI: false, explanation: "Pure electronics — press = on, release = off. No learning." },
  { emoji: "🎤", label: "Siri understands your voice", isAI: true, explanation: "Trained on millions of speech samples to understand accents and words." },
];

function SwipableCard({
  scenario,
  onSwipe,
}: {
  scenario: (typeof SCENARIOS)[0];
  onSwipe: (isAI: boolean) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-160, 0, 160], [-14, 0, 14]);
  const aiOpacity = useTransform(x, [25, 90], [0, 1]);
  const notAiOpacity = useTransform(x, [-90, -25], [1, 0]);
  const bgGreen = useTransform(x, [0, 110], [0, 0.18]);
  const bgRed = useTransform(x, [-110, 0], [0.18, 0]);

  async function handleDragEnd(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) > 80) {
      const toRight = info.offset.x > 0;
      await animate(x, toRight ? 700 : -700, { duration: 0.28, ease: "easeOut" });
      onSwipe(toRight);
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 35 });
    }
  }

  return (
    <motion.div
      drag="x"
      dragMomentum={false}
      dragElastic={0.12}
      style={{ x, rotate, touchAction: "none" }}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
    >
      <div className="relative h-full bg-space-800 rounded-3xl border border-slate-700 overflow-hidden flex flex-col items-center justify-center p-8">
        <motion.div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ backgroundColor: "rgb(20,184,166)", opacity: bgGreen }} />
        <motion.div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ backgroundColor: "rgb(239,68,68)", opacity: bgRed }} />
        <motion.div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" style={{ opacity: aiOpacity }}>
          <span className="font-black text-xl text-teal-300 border-4 border-teal-400 rounded-xl px-3 py-1.5 rotate-[15deg] inline-block">AI!</span>
        </motion.div>
        <motion.div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none" style={{ opacity: notAiOpacity }}>
          <span className="font-black text-xl text-red-300 border-4 border-red-400 rounded-xl px-3 py-1.5 -rotate-[15deg] inline-block">NOT AI</span>
        </motion.div>
        <div className="text-6xl mb-5 relative z-10">{scenario.emoji}</div>
        <p className="text-white font-black text-lg leading-tight text-center relative z-10">{scenario.label}</p>
      </div>
    </motion.div>
  );
}

export function SpotTheAI({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [done, setDone] = useState(false);

  const score = answers.filter((a, i) => a === SCENARIOS[i].isAI).length;
  const streak = (() => {
    let s = 0;
    for (let i = answers.length - 1; i >= 0; i--) {
      if (answers[i] === SCENARIOS[i].isAI) s++;
      else break;
    }
    return s;
  })();

  function handleSwipe(isAI: boolean) {
    const correct = isAI === SCENARIOS[current].isAI;
    setAnswers((prev) => [...prev, correct]);
    setLastCorrect(correct);
    setExplanation(SCENARIOS[current].explanation);
  }

  function handleNext() {
    setExplanation(null);
    if (current >= SCENARIOS.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setCurrent((c) => c + 1);
    }
  }

  if (done) {
    return (
      <div className="text-center space-y-5 py-4">
        <div className="text-6xl">🎯</div>
        <div>
          <div className="text-3xl font-black text-white">{score}/8</div>
          <div className="text-slate-300 mt-1">
            {score >= 7 ? "Amazing! You are an AI Spotter!" : score >= 5 ? "Great job! AI is tricky to spot." : "Keep practicing — AI hides everywhere!"}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {SCENARIOS.map((s, i) => (
            <div key={i} className={`p-3 rounded-xl text-center text-xs font-bold ${answers[i] === s.isAI ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
              <div className="text-xl mb-1">{s.emoji}</div>
              {answers[i] === s.isAI ? "✓" : "✗"}
            </div>
          ))}
        </div>
        <div className="bg-green-500/20 border border-green-500/40 rounded-2xl p-4">
          <div className="font-black text-green-300">Activity Complete! 🎉</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress + streak */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {SCENARIOS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < current ? (answers[i] === SCENARIOS[i].isAI ? "bg-green-500" : "bg-red-500") : i === current ? "bg-teal-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <AnimatePresence>
          {streak >= 3 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
              className="bg-orange-500/20 border border-orange-500/40 rounded-xl px-3 py-1 text-xs font-black text-orange-300 whitespace-nowrap"
            >
              🔥 {streak} streak!
            </motion.div>
          )}
        </AnimatePresence>
        <span className="text-xs font-black text-slate-400">{answers.length}/{SCENARIOS.length}</span>
      </div>

      {!explanation && (
        <div className="flex justify-between px-2 text-xs font-black text-slate-500">
          <span>← Swipe NOT AI</span>
          <span>{current + 1} of {SCENARIOS.length}</span>
          <span>AI! Swipe →</span>
        </div>
      )}

      {/* Card area */}
      {!explanation && (
        <div className="relative" style={{ height: "220px" }}>
          {current + 1 < SCENARIOS.length && (
            <div className="absolute inset-0 bg-space-800 rounded-3xl border border-slate-700 opacity-50" style={{ transform: "scale(0.94) translateY(10px)" }} />
          )}
          <SwipableCard key={current} scenario={SCENARIOS[current]} onSwipe={handleSwipe} />
        </div>
      )}

      {/* Explanation reveal */}
      <AnimatePresence>
        {explanation && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="bg-space-800 rounded-2xl p-5 border border-slate-700 text-center">
              <div className="text-4xl mb-2">{SCENARIOS[current].emoji}</div>
              <div className="font-black text-white text-sm mb-1">{SCENARIOS[current].isAI ? "🤖 This IS AI" : "❌ This is NOT AI"}</div>
              <div className={`text-xl font-black mb-3 ${lastCorrect ? "text-green-300" : "text-red-300"}`}>{lastCorrect ? "✓ Correct!" : "✗ Not quite!"}</div>
              <p className="text-slate-300 text-sm">{explanation}</p>
            </div>
            <button onClick={handleNext} className="w-full py-4 rounded-2xl font-black text-white bg-teal-500 hover:bg-teal-400 btn-press transition-colors">
              {current < SCENARIOS.length - 1 ? "Next Card →" : "See Results →"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap fallback */}
      {!explanation && (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => handleSwipe(false)} className="py-3 rounded-2xl font-black text-slate-300 bg-slate-700/60 hover:bg-slate-700 border border-slate-600 btn-press transition-all text-sm">← Not AI</button>
          <button onClick={() => handleSwipe(true)} className="py-3 rounded-2xl font-black text-teal-300 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 btn-press transition-all text-sm">AI! →</button>
        </div>
      )}
    </div>
  );
}
