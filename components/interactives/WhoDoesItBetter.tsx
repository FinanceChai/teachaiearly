"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TASKS = [
  { task: "Spot a cat in 10,000 photos", winner: "ai", explanation: "AI can scan 10,000 images in seconds. A human would take hours!", emoji: "📷" },
  { task: "Understand why a friend is sad", winner: "human", explanation: "AI has no emotional intelligence. It cannot truly understand feelings from lived experience.", emoji: "❤️" },
  { task: "Translate a menu from Spanish", winner: "ai", explanation: "Fast pattern matching across millions of text examples. AI is lightning fast at translation.", emoji: "🌍" },
  { task: "Write a truly original joke", winner: "human", explanation: "Real humor comes from lived experience. AI remixes existing jokes — it does not truly get why things are funny.", emoji: "😂" },
  { task: "Beat a chess grandmaster", winner: "ai", explanation: "AI has beaten the best human chess players since 1997 — evaluating 200M positions per second!", emoji: "♟️" },
  { task: "Know when to break the rules", winner: "human", explanation: "Common sense and ethical judgment are uniquely human. AI follows patterns, not principles.", emoji: "⚖️" },
];

export function WhoDoesItBetter({ onComplete }: { onComplete: () => void }) {
  const [picks, setPicks] = useState<Record<number, "ai" | "human">>({});
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const allPicked = Object.keys(picks).length === TASKS.length;
  const score = TASKS.filter((t, i) => picks[i] === t.winner).length;

  function pick(idx: number, who: "ai" | "human") {
    if (revealed) return;
    setPicks((p) => ({ ...p, [idx]: who }));
  }

  function reveal() {
    setRevealed(true);
  }

  function handleDone() {
    setDone(true);
    onComplete();
  }

  if (done) {
    return (
      <div className="text-center space-y-5 py-4">
        <div className="text-6xl">🏆</div>
        <div className="text-3xl font-black text-white">{score}/{TASKS.length}</div>
        <p className="text-slate-300">{score >= 5 ? "You really understand AI strengths!" : "AI is surprising, right?"}</p>
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700 text-left">
          <div className="font-black text-white mb-3">The Pattern:</div>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2"><span>🤖</span><span className="text-teal-300 font-bold">AI wins at:</span><span className="text-slate-300">Speed, scale, patterns, data</span></div>
            <div className="flex gap-2"><span>👤</span><span className="text-purple-300 font-bold">Humans win at:</span><span className="text-slate-300">Emotions, creativity, ethics, common sense</span></div>
          </div>
        </div>
        <div className="bg-green-500/20 border border-green-500/40 rounded-2xl p-4">
          <div className="font-black text-green-300">Activity Complete! 🎉</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!revealed && (
        <p className="text-sm text-slate-400 font-bold text-center">
          Sort all 6 tasks first, then reveal the answers all at once!
        </p>
      )}

      {/* Task cards */}
      <div className="space-y-3">
        {TASKS.map((task, i) => {
          const userPick = picks[i];
          const isCorrect = userPick === task.winner;

          return (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`bg-space-800 rounded-2xl border overflow-hidden transition-colors ${
                revealed
                  ? isCorrect ? "border-green-500/50" : "border-red-500/50"
                  : userPick ? "border-teal-500/40" : "border-slate-700"
              }`}
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{task.emoji}</span>
                  <p className="text-white font-bold text-sm flex-1 leading-snug">{task.task}</p>
                  {revealed && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20, delay: i * 0.08 }}
                      className={`text-xl font-black ${isCorrect ? "text-green-300" : "text-red-300"}`}
                    >
                      {isCorrect ? "✓" : "✗"}
                    </motion.span>
                  )}
                </div>

                {!revealed ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => pick(i, "ai")}
                      className={`py-2.5 rounded-xl font-black text-sm transition-all btn-press ${
                        userPick === "ai"
                          ? "bg-teal-500 text-white"
                          : "bg-space-900 text-teal-400 border border-teal-500/30 hover:border-teal-500/60"
                      }`}
                    >
                      🤖 AI Wins
                    </button>
                    <button
                      onClick={() => pick(i, "human")}
                      className={`py-2.5 rounded-xl font-black text-sm transition-all btn-press ${
                        userPick === "human"
                          ? "bg-purple-500 text-white"
                          : "bg-space-900 text-purple-400 border border-purple-500/30 hover:border-purple-500/60"
                      }`}
                    >
                      👤 Human Wins
                    </button>
                  </div>
                ) : (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      transition={{ delay: i * 0.08 + 0.1 }}
                      className="overflow-hidden"
                    >
                      <div className={`text-xs font-bold px-3 py-2 rounded-xl mt-1 ${
                        isCorrect ? "bg-green-500/15 text-green-300" : "bg-red-500/15 text-red-300"
                      }`}>
                        {task.winner === "ai" ? "🤖 AI wins" : "👤 Human wins"} — {task.explanation}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action button */}
      {!revealed && (
        <motion.button
          onClick={reveal}
          disabled={!allPicked}
          animate={allPicked ? { scale: [1, 1.04, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full py-4 rounded-2xl font-black text-xl text-white btn-press transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-400 hover:to-purple-400 shadow-lg"
        >
          {allPicked ? "Reveal All Answers!" : `Sort all 6 to continue (${Object.keys(picks).length}/6)`}
        </motion.button>
      )}

      {revealed && !done && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-3">
          <div className={`p-4 rounded-2xl border text-center ${score >= 5 ? "bg-teal-500/20 border-teal-500/30" : "bg-purple-500/20 border-purple-500/30"}`}>
            <div className={`text-2xl font-black ${score >= 5 ? "text-teal-300" : "text-purple-300"}`}>
              {score}/6 Correct!
            </div>
          </div>
          <button onClick={handleDone} className="w-full py-4 rounded-2xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors">
            Got it! →
          </button>
        </motion.div>
      )}
    </div>
  );
}
