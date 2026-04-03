"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchQuery {
  query: string;
  emoji: string;
  alexResults: { title: string; emoji: string }[];
  samResults: { title: string; emoji: string }[];
  whyDifferent: string;
}

const SEARCHES: SearchQuery[] = [
  {
    query: "Best things to do this weekend",
    emoji: "📅",
    alexResults: [
      { title: "Local soccer league: weekend games schedule", emoji: "⚽" },
      { title: "NBA highlights you missed this week", emoji: "🏀" },
      { title: "Best sports bars in your area", emoji: "🏟️" },
    ],
    samResults: [
      { title: "Free art workshops this Saturday", emoji: "🎨" },
      { title: "New exhibition at the Modern Art Museum", emoji: "🖼️" },
      { title: "DIY pottery class for beginners", emoji: "🏺" },
    ],
    whyDifferent: "The algorithm knows Alex searches for sports and Sam searches for art, so it shows each person what it thinks they want — even for a general question!",
  },
  {
    query: "How to be healthy",
    emoji: "💪",
    alexResults: [
      { title: "Best workout routines for athletes", emoji: "🏋️" },
      { title: "Sports nutrition: what pro players eat", emoji: "🥩" },
      { title: "Recovery tips after intense training", emoji: "⏱️" },
    ],
    samResults: [
      { title: "Mindfulness and meditation for beginners", emoji: "🧘" },
      { title: "Creative hobbies that reduce stress", emoji: "🎭" },
      { title: "Healthy eating: colorful meals guide", emoji: "🥗" },
    ],
    whyDifferent: "Same question about health, completely different answers! Alex gets sports-focused advice while Sam gets creative/mindful approaches. Neither sees the other's perspective.",
  },
  {
    query: "Cool gift ideas",
    emoji: "🎁",
    alexResults: [
      { title: "Top 10 sports jerseys to gift", emoji: "👕" },
      { title: "Tickets to upcoming games near you", emoji: "🎟️" },
      { title: "Sports equipment under $50", emoji: "🏈" },
    ],
    samResults: [
      { title: "Handmade craft kits for creative people", emoji: "✂️" },
      { title: "Art supply sets rated by artists", emoji: "🖌️" },
      { title: "Museum membership: the gift that keeps giving", emoji: "🏛️" },
    ],
    whyDifferent: "Gift ideas should be about the person receiving the gift, but the algorithm assumes everyone is like YOU. Alex and Sam would give very different gifts!",
  },
  {
    query: "What happened today",
    emoji: "📰",
    alexResults: [
      { title: "Championship results: who won big today", emoji: "🏆" },
      { title: "Transfer rumors: which players are moving?", emoji: "📋" },
      { title: "Injury update on star quarterback", emoji: "🤕" },
    ],
    samResults: [
      { title: "New Banksy mural discovered in London", emoji: "🎨" },
      { title: "Art auction breaks records with AI painting", emoji: "💰" },
      { title: "Student wins national design competition", emoji: "🏅" },
    ],
    whyDifferent: "For NEWS — the same question about what happened today — they get completely different views of the world. Imagine this happening for years: Alex and Sam would think they live in different realities!",
  },
];

const QUIZ_OPTIONS = [
  "Because the internet is broken",
  "Because algorithms personalize results based on past behavior",
  "Because Alex and Sam have different computers",
  "Because the results are random each time",
];
const CORRECT_ANSWER = 1;

const TIPS = [
  { emoji: "🔍", tip: "Search in private/incognito mode sometimes to see unfiltered results" },
  { emoji: "📰", tip: "Read news from different sources — not just what your feed shows you" },
  { emoji: "🤝", tip: "Talk to people who have different interests than you" },
  { emoji: "🧹", tip: "Clear your search history and cookies occasionally" },
  { emoji: "🌍", tip: "Follow accounts and topics outside your usual interests" },
];

export function BubbleBreaker({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"compare" | "quiz" | "tips" | "done">("compare");
  const [searchIdx, setSearchIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizRevealed, setQuizRevealed] = useState(false);

  const search = SEARCHES[searchIdx];

  const handleQuizAnswer = (idx: number) => {
    if (quizRevealed) return;
    setQuizAnswer(idx);
    setQuizRevealed(true);
  };

  if (phase === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-space-800 rounded-2xl p-6 border border-slate-200 text-center"
      >
        <div className="text-5xl mb-4">🫧</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Bubble Breaker Complete!</h2>
        <p className="text-slate-600 mb-5">
          Now you know how filter bubbles work — and more importantly, how to break free from them!
          Stay curious and keep exploring different perspectives.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="px-6 py-3 bg-cyan-500 text-space-900 font-bold rounded-xl"
        >
          Continue
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="bg-space-800 rounded-2xl p-6 border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-900">🫧 Bubble Breaker</h2>
        <span className="text-cyan-400 text-sm font-mono">
          {phase === "compare"
            ? `Search ${searchIdx + 1}/${SEARCHES.length}`
            : phase === "quiz"
            ? "Quiz"
            : "Tips"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {phase === "compare" && (
          <motion.div key={`search-${searchIdx}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            {/* Profiles */}
            <div className="flex gap-3 mb-3">
              <div className="flex-1 bg-space-900 rounded-lg p-2 text-center">
                <span className="text-lg">⚽</span>
                <div className="text-slate-900 text-xs font-bold">Alex</div>
                <div className="text-slate-400 text-xs">Sports Fan</div>
              </div>
              <div className="flex-1 bg-space-900 rounded-lg p-2 text-center">
                <span className="text-lg">🎨</span>
                <div className="text-slate-900 text-xs font-bold">Sam</div>
                <div className="text-slate-400 text-xs">Art Lover</div>
              </div>
            </div>

            {/* Search bar */}
            <div className="bg-space-900 rounded-xl p-3 mb-4 text-center">
              <div className="text-xs text-slate-400 mb-1">Both searched:</div>
              <div className="text-slate-900 font-bold">
                {search.emoji} &ldquo;{search.query}&rdquo;
              </div>
            </div>

            {/* Side by side results */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <div className="text-xs text-cyan-400 mb-2 font-bold">⚽ Alex sees:</div>
                <div className="space-y-2">
                  {search.alexResults.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="bg-space-900 rounded-lg p-2 text-xs text-slate-600"
                    >
                      <span className="text-base mr-1">{r.emoji}</span> {r.title}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-cyan-400 mb-2 font-bold">🎨 Sam sees:</div>
                <div className="space-y-2">
                  {search.samResults.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 + 0.1 }}
                      className="bg-space-900 rounded-lg p-2 text-xs text-slate-600"
                    >
                      <span className="text-base mr-1">{r.emoji}</span> {r.title}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 mb-4">
              <p className="text-slate-600 text-sm">💡 {search.whyDifferent}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (searchIdx < SEARCHES.length - 1) {
                  setSearchIdx((i) => i + 1);
                } else {
                  setPhase("quiz");
                }
              }}
              className="w-full py-3 bg-cyan-500 text-space-900 font-bold rounded-xl"
            >
              {searchIdx < SEARCHES.length - 1 ? "Next Search →" : "Take the Quiz →"}
            </motion.button>
          </motion.div>
        )}

        {phase === "quiz" && (
          <motion.div key="quiz" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <div className="bg-space-900 rounded-xl p-5 mb-4 text-center">
              <div className="text-4xl mb-3">❓</div>
              <h3 className="text-slate-900 font-bold text-lg">
                Why do Alex and Sam see completely different results?
              </h3>
            </div>

            <div className="space-y-2 mb-4">
              {QUIZ_OPTIONS.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={!quizRevealed ? { scale: 1.02 } : {}}
                  whileTap={!quizRevealed ? { scale: 0.98 } : {}}
                  onClick={() => handleQuizAnswer(i)}
                  className={`w-full p-3 rounded-xl border-2 text-left text-sm transition-colors ${
                    quizRevealed
                      ? i === CORRECT_ANSWER
                        ? "border-emerald-500 bg-emerald-500/10 text-slate-900"
                        : i === quizAnswer
                        ? "border-red-500 bg-red-500/10 text-slate-900"
                        : "border-slate-200 bg-space-900 text-slate-400"
                      : "border-slate-200 bg-space-900 text-slate-900 hover:border-cyan-500"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>

            {quizRevealed && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-space-900 rounded-xl p-4 mb-4">
                  <p className="text-slate-600 text-sm">
                    {quizAnswer === CORRECT_ANSWER ? "✅ Exactly right! " : "❌ Not quite — the answer is personalization. "}
                    Algorithms track what you search, click, and spend time on. Then they create a &ldquo;profile&rdquo; of you and filter everything through it. This is called a <span className="text-cyan-400 font-bold">filter bubble</span>.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setPhase("tips")}
                  className="w-full py-3 bg-cyan-500 text-space-900 font-bold rounded-xl"
                >
                  Learn How to Break the Bubble →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {phase === "tips" && (
          <motion.div key="tips" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <h3 className="text-slate-900 font-bold mb-4 text-center text-lg">
              🫧 5 Ways to Break Your Filter Bubble
            </h3>
            <div className="space-y-3 mb-5">
              {TIPS.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-space-900 rounded-xl p-4 flex items-start gap-3"
                >
                  <span className="text-2xl">{tip.emoji}</span>
                  <p className="text-slate-600 text-sm">{tip.tip}</p>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPhase("done")}
              className="w-full py-3 bg-cyan-500 text-space-900 font-bold rounded-xl"
            >
              Finish →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
