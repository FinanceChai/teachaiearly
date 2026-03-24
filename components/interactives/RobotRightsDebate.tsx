"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Statement {
  text: string;
  emoji: string;
  mockAgree: number;
  discussionPoints: string[];
}

const STATEMENTS: Statement[] = [
  {
    text: "A robot that can feel pain should be protected from harm.",
    emoji: "🤕",
    mockAgree: 72,
    discussionPoints: [
      "Can robots really \"feel\" pain, or do they just detect damage?",
      "If a robot says \"ouch,\" does that mean it's actually hurting?",
      "We protect animals from pain — should we protect very advanced robots too?",
    ],
  },
  {
    text: "Robots should be allowed to own property.",
    emoji: "🏠",
    mockAgree: 18,
    discussionPoints: [
      "What would a robot even do with a house or money?",
      "If a robot creates art and sells it, who gets the money?",
      "Ownership requires responsibility — can robots be responsible?",
    ],
  },
  {
    text: "It's okay to be mean to a robot.",
    emoji: "😡",
    mockAgree: 35,
    discussionPoints: [
      "Being mean to robots might make us more mean to people too.",
      "If the robot doesn't \"feel\" it, does it matter?",
      "Kids sometimes treat robot toys roughly — is that different from being mean to a smart AI robot?",
    ],
  },
  {
    text: "A robot that helps raise children should have some say in family decisions.",
    emoji: "👶",
    mockAgree: 24,
    discussionPoints: [
      "A nanny robot would know a lot about the children — should that matter?",
      "Robots don't understand love or family bonds the way humans do.",
      "What if the robot's data-based suggestion is actually better than the parents' idea?",
    ],
  },
  {
    text: "Super intelligent robots should have the right to refuse dangerous work.",
    emoji: "⚠️",
    mockAgree: 45,
    discussionPoints: [
      "We send robots into danger BECAUSE it saves human lives.",
      "If a robot is truly intelligent, forcing it to work might be like slavery.",
      "Maybe the answer depends on HOW intelligent the robot actually is?",
    ],
  },
];

export function RobotRightsDebate({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [vote, setVote] = useState<"agree" | "disagree" | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [votes, setVotes] = useState<("agree" | "disagree")[]>([]);

  const statement = STATEMENTS[current];

  const handleVote = (v: "agree" | "disagree") => {
    if (revealed) return;
    setVote(v);
    setRevealed(true);
    setVotes((prev) => [...prev, v]);
  };

  const handleNext = () => {
    if (current < STATEMENTS.length - 1) {
      setCurrent((c) => c + 1);
      setVote(null);
      setRevealed(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const agreeCount = votes.filter((v) => v === "agree").length;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-space-800 rounded-2xl p-6 border border-slate-700 text-center"
      >
        <div className="text-5xl mb-4">🤔</div>
        <h2 className="text-2xl font-bold text-white mb-3">Debate Complete!</h2>
        <p className="text-slate-300 mb-2">
          You agreed with <span className="text-zinc-400 font-bold">{agreeCount}</span> out of{" "}
          <span className="text-zinc-400 font-bold">{STATEMENTS.length}</span> statements about robot rights.
        </p>

        <div className="bg-space-900 rounded-xl p-4 my-5 text-left">
          <h3 className="text-white font-bold mb-2">💡 Big Takeaway:</h3>
          <p className="text-slate-300 text-sm mb-2">
            There are no easy answers here! As robots get smarter, these questions will become more and more important.
          </p>
          <p className="text-slate-300 text-sm mb-2">
            The fact that you thought carefully about each statement means you&apos;re already ahead of most people in thinking about the future of AI.
          </p>
          <p className="text-slate-300 text-sm">
            Remember: the people who grow up today (that&apos;s you!) will be the ones making these big decisions. Your opinion matters!
          </p>
        </div>

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
        <h2 className="text-lg font-bold text-white">⚖️ Robot Rights Debate</h2>
        <span className="text-zinc-400 text-sm font-mono">{current + 1}/{STATEMENTS.length}</span>
      </div>

      <div className="w-full bg-space-900 rounded-full h-2 mb-5">
        <motion.div
          className="bg-zinc-400 h-2 rounded-full"
          animate={{ width: `${((current + 1) / STATEMENTS.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
        >
          <div className="bg-space-900 rounded-xl p-6 mb-5 text-center">
            <div className="text-5xl mb-4">{statement.emoji}</div>
            <p className="text-white text-xl font-bold leading-relaxed">
              &ldquo;{statement.text}&rdquo;
            </p>
          </div>

          {!revealed ? (
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleVote("agree")}
                className="p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl text-white font-bold hover:border-emerald-500 transition-colors"
              >
                <span className="text-2xl block mb-1">👍</span>
                I Agree
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleVote("disagree")}
                className="p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-white font-bold hover:border-red-500 transition-colors"
              >
                <span className="text-2xl block mb-1">👎</span>
                I Disagree
              </motion.button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-space-900 rounded-xl p-4 mb-3">
                <div className="text-xs text-slate-500 mb-2">MOCK POLL RESULTS (from other students)</div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-white w-16">Agree</span>
                  <div className="flex-1 bg-space-800 rounded-full h-5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${statement.mockAgree}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-emerald-500/60 rounded-full flex items-center justify-end pr-2"
                    >
                      <span className="text-xs text-white font-bold">{statement.mockAgree}%</span>
                    </motion.div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-white w-16">Disagree</span>
                  <div className="flex-1 bg-space-800 rounded-full h-5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${100 - statement.mockAgree}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-red-500/60 rounded-full flex items-center justify-end pr-2"
                    >
                      <span className="text-xs text-white font-bold">{100 - statement.mockAgree}%</span>
                    </motion.div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  You voted: <span className={vote === "agree" ? "text-emerald-400" : "text-red-400"}>{vote === "agree" ? "👍 Agree" : "👎 Disagree"}</span>
                </p>
              </div>

              <div className="bg-space-900 rounded-xl p-4 mb-4">
                <div className="text-xs text-slate-500 mb-2">💭 THINGS TO THINK ABOUT:</div>
                <ul className="space-y-2">
                  {statement.discussionPoints.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="text-slate-300 text-sm flex items-start gap-2"
                    >
                      <span className="text-zinc-400 mt-0.5">•</span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleNext}
                className="w-full py-3 bg-zinc-400 text-space-900 font-bold rounded-xl"
              >
                {current < STATEMENTS.length - 1 ? "Next Statement →" : "See Wrap-Up"}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
