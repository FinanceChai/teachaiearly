"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEQUENCES = [
  {
    title: "Number Pattern",
    shown: ["2", "4", "6", "8"],
    options: ["9", "10", "11", "12"],
    correct: "10",
    explanation: "Pattern: add 2 each time. AI spots this by looking at differences between numbers.",
  },
  {
    title: "Shape Sequence",
    shown: ["●", "●●", "●●●", "●●●●"],
    options: ["●●●●", "●●●●●", "●●●●●●", "●●●"],
    correct: "●●●●●",
    explanation: "Pattern: add one more each step. This is exactly how AI predicts sequences — one item at a time.",
  },
  {
    title: "Word Rhymes",
    shown: ["cat", "bat", "hat", "mat"],
    options: ["dog", "map", "rat", "cup"],
    correct: "rat",
    explanation: "Pattern: all words end in -at. AI recognizes rhyme patterns from millions of texts.",
  },
  {
    title: "Temperature Rise",
    shown: ["18", "20", "22", "24"],
    options: ["24", "25", "26", "28"],
    correct: "26",
    explanation: "Pattern: temperature rises by 2 each step. Weather AI uses much more complex patterns but the same idea.",
  },
  {
    title: "Color Cycle",
    shown: ["🔴", "🟡", "🔵", "🔴", "🟡"],
    options: ["🟢", "🔵", "🔴", "🟡"],
    correct: "🔵",
    explanation: "Pattern: red, yellow, blue repeating. AI finds repeating cycles like this instantly.",
  },
];

export function GuessTheNext({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [slotFilled, setSlotFilled] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const [streak, setStreak] = useState(0);

  const seq = SEQUENCES[current];

  function pick(opt: string) {
    if (slotFilled !== null) return;
    const correct = opt === seq.correct;
    setSlotFilled(opt);
    setIsCorrect(correct);
    setAnswers((prev) => [...prev, correct]);
    setStreak(correct ? streak + 1 : 0);
  }

  function next() {
    setSlotFilled(null);
    setIsCorrect(null);
    if (current >= SEQUENCES.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setCurrent((c) => c + 1);
    }
  }

  if (done) {
    const finalScore = answers.filter(Boolean).length;
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          🔮
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{finalScore}/5</div>
          <div className="text-slate-300 mt-2">{finalScore >= 4 ? "Excellent pattern spotter! You think like an AI." : finalScore >= 3 ? "Good job — patterns can be tricky!" : "Patterns are AI's superpower. Keep practicing!"}</div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {answers.map((correct, i) => (
            <div key={i} className={`py-3 rounded-xl font-black text-lg ${correct ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
              {correct ? "✓" : "✗"}
            </div>
          ))}
        </div>
        <div className="bg-green-500/20 border border-green-500/40 rounded-2xl p-4">
          <div className="font-black text-green-300">Activity Complete! 🎉</div>
          <p className="text-sm text-slate-400 mt-1">AI predicts the next word, number, or item the same way — by finding patterns in what came before.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Progress + streak */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {SEQUENCES.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < current ? (answers[i] ? "bg-green-500" : "bg-red-500") : i === current ? "bg-green-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <AnimatePresence>
          {streak >= 3 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="bg-orange-500/20 border border-orange-500/40 rounded-xl px-2 py-1 text-xs font-black text-orange-300 whitespace-nowrap">
              🔥 {streak}x
            </motion.div>
          )}
        </AnimatePresence>
        <span className="text-xs text-slate-400 font-bold">{current + 1}/5</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-green-400 mb-1">{seq.title.toUpperCase()}</div>
        <div className="text-sm text-slate-400 font-bold mb-4">Tap the answer that comes next in the sequence</div>

        {/* Sequence row */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {seq.shown.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-space-900 border border-slate-600 rounded-xl px-3 py-3 font-black text-white text-lg min-w-[48px] text-center"
            >
              {item}
            </motion.div>
          ))}

          {/* Blank slot */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {slotFilled === null ? (
                <motion.div
                  key="empty"
                  animate={{ borderColor: ["#4ade8060", "#4ade80cc", "#4ade8060"] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  className="w-14 h-14 border-2 border-dashed border-green-500/50 rounded-xl flex items-center justify-center"
                  style={{ minWidth: "56px" }}
                >
                  <span className="text-green-500/60 font-black text-2xl">?</span>
                </motion.div>
              ) : (
                <motion.div
                  key="filled"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 font-black text-lg ${
                    isCorrect
                      ? "bg-green-500/25 border-green-500 text-green-300"
                      : "bg-red-500/25 border-red-500 text-red-300"
                  }`}
                  style={{ minWidth: "56px" }}
                >
                  {slotFilled}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Options */}
        {slotFilled === null ? (
          <div className="grid grid-cols-2 gap-3">
            {seq.options.map((opt, i) => (
              <motion.button
                key={i}
                onClick={() => pick(opt)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.25 }}
                className="py-4 rounded-xl border border-slate-700 bg-space-900 font-black text-white text-lg hover:border-green-500/50 hover:bg-green-500/10 transition-colors"
              >
                {opt}
              </motion.button>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${isCorrect ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                {isCorrect ? "✓ Correct! " : `✗ The answer is ${seq.correct}. `}
                <span className="font-normal text-slate-300">{seq.explanation}</span>
              </div>
              <button onClick={next} className="w-full py-4 rounded-xl font-black text-white bg-green-500 hover:bg-green-400 btn-press transition-colors">
                {current < SEQUENCES.length - 1 ? "Next Sequence →" : "See Results →"}
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
