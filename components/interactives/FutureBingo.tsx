"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BingoItem {
  prediction: string;
  icon: string;
  expertVerdict: "likely" | "unlikely" | "already";
  explanation: string;
}

const BINGO_ITEMS: BingoItem[] = [
  {
    prediction: "AI personal tutors for every student",
    icon: "🎓",
    expertVerdict: "likely",
    explanation: "AI tutors already exist and are getting better fast! By 2030, most students will probably have AI study helpers.",
  },
  {
    prediction: "Self-driving taxis everywhere",
    icon: "🚕",
    expertVerdict: "likely",
    explanation: "Self-driving taxis are already in some cities! They'll spread to more places, but 'everywhere' might take longer.",
  },
  {
    prediction: "AI-written Hollywood movies",
    icon: "🎬",
    expertVerdict: "unlikely",
    explanation: "AI can help write scripts, but human creativity and emotion are still hard to replace. AI might assist, but probably won't write full hit movies alone.",
  },
  {
    prediction: "Robot nurses in hospitals",
    icon: "🏥",
    expertVerdict: "unlikely",
    explanation: "Robots can deliver medicine and supplies, but caring for sick people requires human empathy. Robot helpers yes, robot nurses replacing humans — not yet!",
  },
  {
    prediction: "Real-time translation earbuds",
    icon: "🎧",
    expertVerdict: "already",
    explanation: "These already exist! Products like Google Pixel Buds can translate conversations in real time. They'll just keep getting better.",
  },
  {
    prediction: "AI perfectly predicts weather",
    icon: "⛈️",
    expertVerdict: "likely",
    explanation: "AI weather prediction is already better than traditional methods! By 2030, forecasts will be much more accurate, though 'perfect' is tough.",
  },
  {
    prediction: "AI creates hit pop songs",
    icon: "🎵",
    expertVerdict: "likely",
    explanation: "AI music is improving rapidly. By 2030, AI-assisted songs will likely top the charts, though they'll probably have human artists involved.",
  },
  {
    prediction: "AI replaces all teachers",
    icon: "👩‍🏫",
    expertVerdict: "unlikely",
    explanation: "AI will help teachers, not replace them! Kids need human connection, mentorship, and emotional support that AI can't truly provide.",
  },
  {
    prediction: "AI detects diseases from a photo",
    icon: "📸",
    expertVerdict: "already",
    explanation: "This is already happening! AI can detect skin cancer, eye diseases, and more from photos. It's one of AI's greatest achievements.",
  },
  {
    prediction: "Fully AI-generated video games",
    icon: "🎮",
    expertVerdict: "likely",
    explanation: "AI already generates game levels and characters. Full games created by AI are coming, though the best games will still need human creativity.",
  },
  {
    prediction: "AI reads your mind",
    icon: "🧠",
    expertVerdict: "unlikely",
    explanation: "Brain-computer interfaces exist but they're very basic — like detecting 'yes or no' thoughts. Real mind reading is still science fiction!",
  },
  {
    prediction: "AI-powered robots clean oceans",
    icon: "🌊",
    expertVerdict: "likely",
    explanation: "AI-guided drones and robots are already being used to clean up ocean plastic! This will definitely grow by 2030.",
  },
  {
    prediction: "AI homework that grades itself",
    icon: "📝",
    expertVerdict: "already",
    explanation: "Auto-grading already exists for many types of assignments! AI can grade essays, math, and more. Teachers use it now.",
  },
  {
    prediction: "AI invents a new sport",
    icon: "⚽",
    expertVerdict: "unlikely",
    explanation: "AI could design rules for a new game, but sports need human culture and community to become popular. AI might help design games, but humans make sports matter.",
  },
  {
    prediction: "Deepfakes are undetectable",
    icon: "🎭",
    expertVerdict: "unlikely",
    explanation: "Deepfakes keep getting better, but so does AI detection! It's an arms race. Experts are working hard to keep detection ahead.",
  },
  {
    prediction: "AI companions for lonely people",
    icon: "🤖",
    expertVerdict: "already",
    explanation: "AI companions and chatbots already exist and millions of people use them. The question is whether this is helpful or concerning — probably both!",
  },
];

export function FutureBingo({ onComplete }: { onComplete: () => void }) {
  const [selections, setSelections] = useState<boolean[]>(BINGO_ITEMS.map(() => false));
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const toggleItem = (index: number) => {
    if (revealed) return;
    const next = [...selections];
    next[index] = !next[index];
    setSelections(next);
  };

  const selectedCount = selections.filter(Boolean).length;

  const score = selections.reduce((sum, selected, i) => {
    if (!selected) return sum;
    const item = BINGO_ITEMS[i];
    if (item.expertVerdict === "likely" || item.expertVerdict === "already") return sum + 1;
    return sum;
  }, 0);

  const correctPredictions = selections.filter(
    (selected, i) =>
      selected && (BINGO_ITEMS[i].expertVerdict === "likely" || BINGO_ITEMS[i].expertVerdict === "already")
  ).length;

  const handleReveal = () => setRevealed(true);

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  const verdictColors = {
    likely: { bg: "bg-amber-500/20", text: "text-amber-400", label: "Likely by 2030" },
    unlikely: { bg: "bg-red-500/20", text: "text-red-400", label: "Unlikely by 2030" },
    already: { bg: "bg-green-500/20", text: "text-green-400", label: "Already Happening!" },
  };

  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">🎯 Future Bingo</h2>
      <p className="text-slate-600 text-sm mb-4">
        {revealed
          ? "Here's what experts think! Green = already happening, Amber = likely, Red = unlikely."
          : `Click the AI predictions you think will happen by 2030! (${selectedCount} selected)`}
      </p>

      <div className="grid grid-cols-4 gap-1.5 mb-4">
        {BINGO_ITEMS.map((item, i) => {
          const verdict = verdictColors[item.expertVerdict];
          return (
            <motion.button
              key={item.prediction}
              whileHover={!revealed ? { scale: 1.05 } : {}}
              whileTap={!revealed ? { scale: 0.95 } : {}}
              onClick={() => toggleItem(i)}
              className={`p-2 rounded-lg border text-center min-h-[80px] flex flex-col items-center justify-center transition-colors ${
                revealed
                  ? selections[i]
                    ? item.expertVerdict === "unlikely"
                      ? "bg-red-500/15 border-red-500/50"
                      : "bg-green-500/15 border-green-500/50"
                    : "bg-space-800 border-slate-200 opacity-60"
                  : selections[i]
                  ? "bg-amber-500/20 border-amber-500"
                  : "bg-space-800 border-slate-200 hover:border-slate-500"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <p className="text-slate-900 text-[10px] leading-tight mt-0.5">{item.prediction}</p>
              {revealed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`${verdict.text} text-[9px] font-bold mt-0.5`}
                >
                  {verdict.label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {!revealed && selectedCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReveal}
          className="w-full px-5 py-2 bg-amber-500 text-slate-900 rounded-lg font-bold"
        >
          Reveal Expert Predictions! 🔮
        </motion.button>
      )}

      {revealed && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-space-800 rounded-lg p-4 mb-4 text-center">
            <p className="text-amber-400 font-bold text-lg">
              You got {correctPredictions} out of {selectedCount} right!
            </p>
            <p className="text-slate-600 text-sm mt-1">
              {correctPredictions === selectedCount
                ? "Amazing! You really understand where AI is headed!"
                : correctPredictions > selectedCount / 2
                ? "Great instincts! You've got a good sense of AI's future."
                : "Predicting the future is hard! Even experts disagree. The important thing is thinking critically about it."}
            </p>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2 mb-4 pr-1">
            {BINGO_ITEMS.filter((_, i) => selections[i]).map((item) => {
              const verdict = verdictColors[item.expertVerdict];
              return (
                <div key={item.prediction} className={`${verdict.bg} rounded-lg p-2 border border-slate-200`}>
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <p className="text-slate-900 text-xs font-semibold">{item.prediction}</p>
                    <span className={`${verdict.text} text-xs font-bold ml-auto whitespace-nowrap`}>
                      {verdict.label}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-1">{item.explanation}</p>
                </div>
              );
            })}
          </div>

          {!done ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              className="w-full px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-bold"
            >
              Complete Bingo ✓
            </motion.button>
          ) : (
            <p className="text-center text-amber-400 font-semibold">✓ Activity Complete!</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
