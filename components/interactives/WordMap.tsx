"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WordCluster {
  label: string;
  color: string;
  words: string[];
  numbers: string[];
}

const CLUSTERS: WordCluster[] = [
  {
    label: "Animals",
    color: "#a855f7",
    words: ["dog", "cat", "puppy", "kitten"],
    numbers: ["[0.9, 0.2]", "[0.8, 0.3]", "[0.85, 0.15]", "[0.75, 0.25]"],
  },
  {
    label: "Food",
    color: "#f59e0b",
    words: ["pizza", "burger", "fries", "taco"],
    numbers: ["[0.1, 0.8]", "[0.15, 0.85]", "[0.2, 0.9]", "[0.12, 0.78]"],
  },
  {
    label: "Feelings",
    color: "#ec4899",
    words: ["happy", "joyful", "glad", "cheerful"],
    numbers: ["[0.5, 0.5]", "[0.52, 0.48]", "[0.48, 0.52]", "[0.51, 0.49]"],
  },
];

const ALL_WORDS = CLUSTERS.flatMap((c) =>
  c.words.map((w, i) => ({ word: w, cluster: c.label, color: c.color, number: c.numbers[i] }))
);

// Shuffle deterministically
const SHUFFLED = [...ALL_WORDS].sort(() => 0.3 - Math.random());

const ROUNDS = [
  {
    title: "Words become numbers",
    instruction: "AI doesn't read words — it turns them into numbers. Tap each word to see its secret number code.",
    mode: "reveal" as const,
  },
  {
    title: "Similar words, similar numbers",
    instruction: "Drag each word to the group it belongs to. Notice: similar words have similar numbers!",
    mode: "sort" as const,
  },
  {
    title: "The odd one out",
    instruction: "Which word doesn't belong? AI spots the outlier because its numbers are far from the rest.",
    mode: "oddOneOut" as const,
  },
];

const ODD_ONE_OUT_QUESTIONS = [
  {
    words: ["dog", "cat", "pizza", "puppy"],
    odd: "pizza",
    explanation: "Pizza's numbers are far from the animal cluster — AI spots this instantly by measuring the distance between number codes.",
  },
  {
    words: ["happy", "joyful", "burger", "glad"],
    odd: "burger",
    explanation: "Burger's number code sits in the food region, far from the feelings cluster. To AI, it's obviously different.",
  },
  {
    words: ["fries", "taco", "cheerful", "pizza"],
    odd: "cheerful",
    explanation: "Cheerful lives in the feelings region of number-space. AI can measure the exact distance to know it doesn't belong with food words.",
  },
];

export function WordMap({ onComplete }: { onComplete: () => void }) {
  const [round, setRound] = useState(0);
  const [revealedWords, setRevealedWords] = useState<Set<string>>(new Set());
  const [sorted, setSorted] = useState<Record<string, string[]>>({
    Animals: [],
    Food: [],
    Feelings: [],
  });
  const [sortScore, setSortScore] = useState(0);
  const [remainingWords, setRemainingWords] = useState(
    SHUFFLED.slice(0, 6).map((w) => w.word)
  );
  const [selectedOdd, setSelectedOdd] = useState<string | null>(null);
  const [oddIdx, setOddIdx] = useState(0);
  const [oddScore, setOddScore] = useState(0);
  const [done, setDone] = useState(false);

  // Round 1: Reveal numbers
  function revealWord(word: string) {
    setRevealedWords((prev) => { const next = new Set(prev); next.add(word); return next; });
  }

  // Round 2: Sort words into clusters
  function sortWord(word: string, cluster: string) {
    const wordData = ALL_WORDS.find((w) => w.word === word);
    const correct = wordData?.cluster === cluster;
    if (correct) setSortScore((s) => s + 1);
    setSorted((prev) => ({ ...prev, [cluster]: [...prev[cluster], word] }));
    setRemainingWords((prev) => prev.filter((w) => w !== word));
  }

  // Round 3: Odd one out
  function pickOdd(word: string) {
    if (selectedOdd !== null) return;
    setSelectedOdd(word);
    if (word === ODD_ONE_OUT_QUESTIONS[oddIdx].odd) {
      setOddScore((s) => s + 1);
    }
  }

  function nextRound() {
    if (round === 0) {
      setRound(1);
    } else if (round === 1) {
      setRound(2);
    } else if (round === 2 && oddIdx < ODD_ONE_OUT_QUESTIONS.length - 1) {
      setOddIdx((i) => i + 1);
      setSelectedOdd(null);
    } else {
      setDone(true);
      onComplete();
    }
  }

  if (done) {
    const total = 6 + ODD_ONE_OUT_QUESTIONS.length;
    const score = sortScore + oddScore;
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="text-7xl"
        >
          🗺️
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">
            {score}/{total}
          </div>
          <div className="text-slate-300 mt-2">
            {score >= total - 1
              ? "Amazing! You think in number-space like an AI!"
              : score >= total / 2
              ? "Nice work — you're getting how word embeddings work!"
              : "Keep exploring — word maps are tricky!"}
          </div>
        </div>
        <div className="bg-purple-500/20 border border-purple-500/40 rounded-2xl p-4">
          <div className="font-black text-purple-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">
            AI turns every word into numbers called &quot;embeddings.&quot; Similar words get similar numbers,
            which is how AI understands that &quot;dog&quot; and &quot;puppy&quot; are related!
          </p>
        </div>
      </div>
    );
  }

  const currentRound = ROUNDS[round];

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="flex gap-1.5">
        {ROUNDS.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full transition-all ${
              i < round
                ? "bg-purple-500"
                : i === round
                ? "bg-purple-400"
                : "bg-slate-700"
            }`}
          />
        ))}
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-purple-400 mb-1">
          {currentRound.title.toUpperCase()}
        </div>
        <div className="text-sm text-slate-400 font-bold mb-5">
          {currentRound.instruction}
        </div>

        {/* Round 1: Reveal */}
        {round === 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {SHUFFLED.slice(0, 8).map((item) => (
                <motion.button
                  key={item.word}
                  onClick={() => revealWord(item.word)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                    revealedWords.has(item.word)
                      ? "border-purple-500/50 bg-purple-500/10"
                      : "border-slate-700 bg-space-900 hover:border-purple-500/30"
                  }`}
                >
                  <div className="font-black text-white text-lg">{item.word}</div>
                  <AnimatePresence>
                    {revealedWords.has(item.word) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2"
                      >
                        <div className="text-xs font-mono" style={{ color: item.color }}>
                          {item.number}
                        </div>
                        <div
                          className="text-xs font-bold mt-1"
                          style={{ color: item.color }}
                        >
                          {item.cluster}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
            {revealedWords.size >= 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-purple-500/20 border border-purple-500/40 rounded-xl p-3 text-sm text-purple-300 font-bold text-center"
              >
                Notice how similar words (like dog & puppy) have similar numbers!
              </motion.div>
            )}
            {revealedWords.size >= 4 && (
              <button
                onClick={nextRound}
                className="w-full py-4 rounded-xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors"
              >
                Next: Sort the Words →
              </button>
            )}
          </div>
        )}

        {/* Round 2: Sort */}
        {round === 1 && (
          <div className="space-y-4">
            {/* Words to sort */}
            {remainingWords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {remainingWords.map((word) => (
                  <div
                    key={word}
                    className="bg-space-900 border border-slate-600 rounded-lg px-3 py-2 font-bold text-white text-sm"
                  >
                    {word}
                  </div>
                ))}
              </div>
            )}

            {/* Cluster buckets */}
            <div className="grid gap-3">
              {CLUSTERS.map((cluster) => (
                <div
                  key={cluster.label}
                  className="rounded-xl border-2 p-3"
                  style={{
                    borderColor: cluster.color + "60",
                    background: cluster.color + "10",
                  }}
                >
                  <div
                    className="text-xs font-black mb-2"
                    style={{ color: cluster.color }}
                  >
                    {cluster.label.toUpperCase()}
                  </div>
                  <div className="flex flex-wrap gap-2 min-h-[36px]">
                    {sorted[cluster.label].map((word) => (
                      <span
                        key={word}
                        className="rounded-lg px-2 py-1 text-sm font-bold text-white"
                        style={{ background: cluster.color + "40" }}
                      >
                        {word}
                      </span>
                    ))}
                    {remainingWords.length > 0 && (
                      <div className="flex gap-1">
                        {remainingWords.map((word) => (
                          <button
                            key={word}
                            onClick={() => sortWord(word, cluster.label)}
                            className="rounded-lg px-2 py-1 text-xs font-bold border border-dashed transition-colors hover:bg-white/10"
                            style={{ borderColor: cluster.color + "60", color: cluster.color }}
                          >
                            + {word}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {remainingWords.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div className="bg-purple-500/20 border border-purple-500/40 rounded-xl p-3 text-sm font-bold text-center">
                  <span className="text-purple-300">
                    {sortScore >= 5
                      ? "Excellent sorting! You grouped words just like AI does."
                      : sortScore >= 3
                      ? "Good job! AI uses number distances to group words automatically."
                      : "Tricky! AI measures number distances to sort words into clusters."}
                  </span>
                </div>
                <button
                  onClick={nextRound}
                  className="w-full py-4 rounded-xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors"
                >
                  Next: Spot the Odd One Out →
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Round 3: Odd one out */}
        {round === 2 && (
          <div className="space-y-4">
            <div className="text-xs text-slate-500 font-bold text-right">
              {oddIdx + 1}/{ODD_ONE_OUT_QUESTIONS.length}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ODD_ONE_OUT_QUESTIONS[oddIdx].words.map((word) => {
                const isOdd = word === ODD_ONE_OUT_QUESTIONS[oddIdx].odd;
                const picked = selectedOdd !== null;
                return (
                  <motion.button
                    key={word}
                    onClick={() => pickOdd(word)}
                    whileTap={{ scale: 0.95 }}
                    disabled={picked}
                    className={`py-4 rounded-xl border-2 font-black text-lg transition-all ${
                      picked
                        ? isOdd
                          ? "border-green-500 bg-green-500/20 text-green-300"
                          : word === selectedOdd
                          ? "border-red-500 bg-red-500/20 text-red-300"
                          : "border-slate-700 bg-space-900 text-slate-500"
                        : "border-slate-700 bg-space-900 text-white hover:border-purple-500/50"
                    }`}
                  >
                    {word}
                  </motion.button>
                );
              })}
            </div>

            {selectedOdd !== null && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <div
                  className={`p-4 rounded-xl text-sm font-bold ${
                    selectedOdd === ODD_ONE_OUT_QUESTIONS[oddIdx].odd
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {selectedOdd === ODD_ONE_OUT_QUESTIONS[oddIdx].odd ? "Correct! " : `The odd one is "${ODD_ONE_OUT_QUESTIONS[oddIdx].odd}." `}
                  <span className="font-normal text-slate-300">
                    {ODD_ONE_OUT_QUESTIONS[oddIdx].explanation}
                  </span>
                </div>
                <button
                  onClick={nextRound}
                  className="w-full py-4 rounded-xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors"
                >
                  {oddIdx < ODD_ONE_OUT_QUESTIONS.length - 1
                    ? "Next Question →"
                    : "See Results →"}
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
