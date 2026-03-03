"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    question: "What is the key difference between a calculator and an AI?",
    options: ["Calculators are faster", "AI learns from examples; calculators follow fixed rules", "AI only works with numbers", "Calculators cannot do multiplication"],
    correct: 1,
    explanation: "AI adapts from training data. A calculator always does exactly what it was programmed to do — no learning involved.",
  },
  {
    question: "Which of these is most likely using AI?",
    options: ["A microwave timer counting down", "A thermostat set to 72F", "A music app that learns what you like", "A digital alarm clock"],
    correct: 2,
    explanation: "A music recommender learns your taste from what you play, skip, and like — classic AI behavior.",
  },
  {
    question: "What is AI really good at?",
    options: ["Understanding jokes and sarcasm", "Feeling emotions", "Recognizing patterns in huge amounts of data", "Knowing when to break rules"],
    correct: 2,
    explanation: "Pattern recognition at massive scale is AI's superpower. Emotions, humor, and judgment — not so much.",
  },
  {
    question: "When did scientists start working on AI?",
    options: ["2010s, when smartphones arrived", "1980s, when home computers appeared", "1950s, decades before most people expected", "2000s, with the internet boom"],
    correct: 2,
    explanation: "Alan Turing and others were already asking 'Can machines think?' in the 1950s. AI is older than most people realize!",
  },
  {
    question: "A robot vacuum avoids furniture by sensing walls. Is this AI?",
    options: ["Yes — it moves around, so it must be AI", "Probably not — it follows sensor rules, not learned patterns", "Yes — all robots use AI", "No — only phones can have AI"],
    correct: 1,
    explanation: "Many robots use simple sensor-if-then rules, not learning. True AI would improve its path over time by learning your home's layout.",
  },
];

const MULTIPLIERS = [
  { streak: 0, label: "1x", color: "text-slate-400" },
  { streak: 3, label: "2x COMBO!", color: "text-orange-400" },
  { streak: 5, label: "3x ON FIRE!", color: "text-red-400" },
];

function getMultiplier(streak: number) {
  if (streak >= 5) return 3;
  if (streak >= 3) return 2;
  return 1;
}

function FlipCard({
  option,
  idx,
  picked,
  correctIdx,
  allRevealed,
  onPick,
}: {
  option: string;
  idx: number;
  picked: number | null;
  correctIdx: number;
  allRevealed: boolean;
  onPick: (i: number) => void;
}) {
  const isFlipped = allRevealed;
  const isCorrect = idx === correctIdx;
  const isPicked = picked === idx;
  const delay = isPicked ? 0 : idx * 0.1 + 0.15;

  return (
    <div style={{ perspective: "700px" }}>
      <motion.div
        onClick={() => !allRevealed && onPick(idx)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.45, delay, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", position: "relative", minHeight: "56px" }}
        className={`w-full rounded-xl cursor-pointer ${!allRevealed ? "btn-press" : ""}`}
        whileHover={!allRevealed && picked === null ? { scale: 1.02 } : {}}
        whileTap={!allRevealed && picked === null ? { scale: 0.97 } : {}}
      >
        {/* Front face */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className={`w-full px-4 py-4 rounded-xl border font-bold text-sm text-left transition-colors ${
            isPicked && !allRevealed
              ? "bg-teal-500/30 border-teal-400 text-teal-200"
              : picked !== null && !allRevealed
              ? "bg-space-900 border-slate-700 text-slate-500"
              : "bg-space-900 border-slate-700 text-slate-300 hover:border-slate-500"
          }`}
        >
          {option}
        </div>

        {/* Back face */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", position: "absolute", inset: 0 }}
          className={`w-full px-4 py-4 rounded-xl border font-bold text-sm flex items-center gap-2 ${
            isCorrect
              ? "bg-green-500/25 border-green-500/60 text-green-300"
              : isPicked
              ? "bg-red-500/25 border-red-500/60 text-red-300"
              : "bg-space-900 border-slate-700 text-slate-500"
          }`}
        >
          <span>{isCorrect ? "✓" : isPicked ? "✗" : ""}</span>
          <span>{option}</span>
        </div>
      </motion.div>
    </div>
  );
}

export function AISpotterChallenge({ onComplete }: { onComplete: (passed: boolean) => void }) {
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [allRevealed, setAllRevealed] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [scoreAnim, setScoreAnim] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[current];
  const multiplier = getMultiplier(streak);
  const multiplierInfo = MULTIPLIERS.slice().reverse().find((m) => streak >= m.streak) ?? MULTIPLIERS[0];

  function handlePick(idx: number) {
    if (picked !== null || allRevealed) return;
    setPicked(idx);
    setTimeout(() => setAllRevealed(true), 120);

    const correct = idx === q.correct;
    const gained = correct ? 100 * multiplier : 0;
    const newStreak = correct ? streak + 1 : 0;
    const newAnswers = [...answers, correct];

    setAnswers(newAnswers);
    setStreak(newStreak);

    if (correct) {
      setScore((s) => s + gained);
      setScoreAnim(gained);
      setTimeout(() => setScoreAnim(null), 1400);
    }
  }

  function handleNext() {
    if (current >= QUESTIONS.length - 1) {
      const finalPassed = answers.filter(Boolean).length >= 4;
      setDone(true);
      onComplete(finalPassed);
    } else {
      setCurrent((c) => c + 1);
      setPicked(null);
      setAllRevealed(false);
    }
  }

  if (done) {
    const finalScore = answers.filter(Boolean).length;
    const passed = finalScore >= 4;
    return (
      <div className="space-y-6 text-center py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          {passed ? "🔍" : "📚"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{finalScore}/5</div>
          <div className="text-lg font-black mt-1" style={{ color: passed ? "#14b8a6" : "#f59e0b" }}>
            {passed ? "AI Spotter Badge Earned!" : "Almost — keep going!"}
          </div>
          <div className="text-slate-400 text-sm mt-1">Final score: <span className="text-yellow-400 font-black">{score} pts</span></div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {answers.map((correct, i) => (
            <div key={i} className={`py-3 rounded-xl font-black text-lg ${correct ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
              {correct ? "✓" : "✗"}
            </div>
          ))}
        </div>
        {passed && <div className="bg-teal-500/20 border border-teal-500/40 rounded-2xl p-4"><div className="font-black text-teal-300">Challenge Complete! 🎉</div></div>}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Score + streak header */}
      <div className="flex items-center justify-between bg-space-800 rounded-2xl px-4 py-3 border border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-lg">⭐</span>
          <span className="font-black text-white text-lg">{score}</span>
          <AnimatePresence>
            {scoreAnim !== null && (
              <motion.span
                key={scoreAnim + streak}
                initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -20 }} exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="text-sm font-black text-yellow-400 absolute"
              >
                +{scoreAnim}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={multiplierInfo.label}
              initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
              className={`text-xs font-black ${multiplierInfo.color}`}
            >
              {streak >= 3 ? `🔥 ${multiplierInfo.label}` : `${streak} streak`}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="text-xs text-slate-400 font-bold">{current + 1}/5</span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < current ? (answers[i] ? "bg-green-500" : "bg-red-500") : i === current ? "bg-teal-400" : "bg-slate-700"}`} />
        ))}
      </div>

      {/* Question */}
      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        {multiplier > 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className={`text-xs font-black mb-3 text-center ${multiplierInfo.color}`}
          >
            {multiplierInfo.label} — each correct answer worth {multiplier * 100} pts!
          </motion.div>
        )}
        <p className="text-white font-black text-base leading-snug mb-5">{q.question}</p>
        <div className="space-y-2.5">
          {q.options.map((opt, i) => (
            <FlipCard key={`${current}-${i}`} option={opt} idx={i} picked={picked} correctIdx={q.correct} allRevealed={allRevealed} onPick={handlePick} />
          ))}
        </div>

        <AnimatePresence>
          {allRevealed && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-4 space-y-3">
              <div className={`p-4 rounded-xl text-sm ${picked === q.correct ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                <span className="font-black">{picked === q.correct ? "✓ Correct! " : "✗ Not quite. "}</span>
                <span className="text-slate-300">{q.explanation}</span>
              </div>
              <button onClick={handleNext} className="w-full py-4 rounded-xl font-black text-white bg-teal-500 hover:bg-teal-400 btn-press transition-colors">
                {current < QUESTIONS.length - 1 ? "Next Question →" : "See Results →"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
