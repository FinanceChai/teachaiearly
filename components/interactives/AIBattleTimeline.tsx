"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Milestone {
  id: number;
  event: string;
  year: number;
  game: string;
  icon: string;
  funFact: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 1,
    event: "Deep Blue beats Kasparov",
    year: 1997,
    game: "Chess",
    icon: "♟️",
    funFact: "Deep Blue could evaluate 200 million positions per second. Kasparov accused IBM of cheating!",
  },
  {
    id: 2,
    event: "Watson wins Jeopardy!",
    year: 2011,
    game: "Jeopardy!",
    icon: "❓",
    funFact: "Watson had access to 200 million pages of content but was NOT connected to the internet during the game.",
  },
  {
    id: 3,
    event: "AlphaGo defeats Lee Sedol",
    year: 2016,
    game: "Go",
    icon: "⚫",
    funFact: "Go has more possible board positions than atoms in the universe. AlphaGo made a move in Game 2 that no human would ever play — and it won.",
  },
  {
    id: 4,
    event: "OpenAI Five beats Dota 2 pros",
    year: 2019,
    game: "Dota 2",
    icon: "⚔️",
    funFact: "OpenAI Five played the equivalent of 45,000 years of Dota 2 during training. It learned teamwork on its own!",
  },
  {
    id: 5,
    event: "AlphaFold solves protein folding",
    year: 2020,
    game: "Proteins",
    icon: "🧬",
    funFact: "AlphaFold solved a 50-year biology grand challenge. It predicted the structure of nearly every known protein!",
  },
  {
    id: 6,
    event: "ChatGPT launches",
    year: 2022,
    game: "Language",
    icon: "💬",
    funFact: "ChatGPT reached 100 million users in 2 months — the fastest-growing app in history at the time.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function AIBattleTimeline({ onComplete }: { onComplete: () => void }) {
  const [scrambled] = useState(() => shuffle(MILESTONES));
  const [placed, setPlaced] = useState<Milestone[]>([]);
  const [remaining, setRemaining] = useState<Milestone[]>(scrambled);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [revealedIdx, setRevealedIdx] = useState(-1);

  function handlePlace(m: Milestone) {
    if (checked) return;
    setPlaced((p) => [...p, m]);
    setRemaining((r) => r.filter((x) => x.id !== m.id));
  }

  function handleRemove(idx: number) {
    if (checked) return;
    const item = placed[idx];
    setPlaced((p) => p.filter((_, i) => i !== idx));
    setRemaining((r) => [...r, item]);
  }

  function handleCheck() {
    const correct = MILESTONES.map((m) => m.id);
    const userOrder = placed.map((m) => m.id);
    let s = 0;
    for (let i = 0; i < correct.length; i++) {
      if (correct[i] === userOrder[i]) s++;
    }
    setScore(s);
    setChecked(true);
    setRevealedIdx(0);
  }

  function handleRevealNext() {
    if (revealedIdx + 1 >= MILESTONES.length) return;
    setRevealedIdx((i) => i + 1);
  }

  const allPlaced = placed.length === MILESTONES.length;
  const allRevealed = revealedIdx >= MILESTONES.length - 1;

  return (
    <div className="bg-space-800 rounded-xl border border-slate-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">⚔️ AI Battle Timeline</h3>
        {checked && (
          <span className="text-sm text-red-400 font-semibold">
            {score}/{MILESTONES.length} correct
          </span>
        )}
      </div>

      <p className="text-slate-300 text-sm mb-4">
        {checked
          ? "Here is the correct order with fun facts! Click each to reveal."
          : "Place these AI vs Human milestones in chronological order (earliest first). Click events to add them to the timeline."}
      </p>

      {!checked && (
        <>
          {/* Remaining to place */}
          <div className="flex flex-wrap gap-2 mb-4 min-h-[48px]">
            {remaining.map((m) => (
              <motion.button
                key={m.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlace(m)}
                className="px-3 py-2 bg-space-900 border border-slate-700 hover:border-red-500 text-white rounded-lg text-sm transition-colors"
              >
                {m.icon} {m.event}
              </motion.button>
            ))}
            {remaining.length === 0 && (
              <span className="text-slate-500 text-sm italic">All events placed!</span>
            )}
          </div>

          {/* Timeline slots */}
          <div className="space-y-2 mb-4">
            {placed.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 px-4 py-2 bg-space-900 border border-red-500/30 rounded-lg cursor-pointer hover:bg-red-500/10"
                onClick={() => handleRemove(i)}
              >
                <span className="text-red-400 font-mono text-sm w-6">{i + 1}.</span>
                <span className="text-xl">{m.icon}</span>
                <span className="text-white text-sm">{m.event}</span>
                <span className="ml-auto text-slate-500 text-xs">click to remove</span>
              </motion.div>
            ))}
            {Array.from({ length: MILESTONES.length - placed.length }, (_, i) => (
              <div
                key={`empty-${i}`}
                className="flex items-center gap-3 px-4 py-2 border border-dashed border-slate-700 rounded-lg"
              >
                <span className="text-slate-600 font-mono text-sm w-6">{placed.length + i + 1}.</span>
                <span className="text-slate-600 text-sm">—</span>
              </div>
            ))}
          </div>

          {allPlaced && (
            <button
              onClick={handleCheck}
              className="w-full px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold transition-colors"
            >
              Check My Order
            </button>
          )}
        </>
      )}

      {checked && (
        <div className="space-y-2">
          {MILESTONES.map((m, i) => {
            const userItem = placed[i];
            const isCorrect = userItem?.id === m.id;
            const isRevealed = i <= revealedIdx;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`px-4 py-3 rounded-lg border ${
                  isRevealed
                    ? isCorrect
                      ? "bg-green-900/20 border-green-500/40"
                      : "bg-red-900/20 border-red-500/40"
                    : "bg-space-900 border-slate-700 cursor-pointer hover:border-slate-500"
                }`}
                onClick={() => !isRevealed && i === revealedIdx + 1 && setRevealedIdx(i)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-red-400 font-mono text-sm font-bold">{m.year}</span>
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-white text-sm font-semibold">{m.event}</span>
                  <span className="text-slate-400 text-xs ml-auto">{m.game}</span>
                </div>
                {isRevealed && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-slate-300 text-xs mt-2 pl-16"
                  >
                    {m.funFact}
                  </motion.p>
                )}
              </motion.div>
            );
          })}

          <div className="flex gap-3 mt-4">
            {!allRevealed && (
              <button
                onClick={handleRevealNext}
                className="flex-1 px-4 py-2 bg-space-900 border border-slate-700 hover:border-red-500 text-white rounded-lg text-sm transition-colors"
              >
                Reveal Next Fact
              </button>
            )}
            {allRevealed && (
              <button
                onClick={onComplete}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold transition-colors"
              >
                Complete Activity
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
