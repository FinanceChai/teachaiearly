"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sentence {
  start: string;
  options: string[];
  aiPick: string;
  aiConfidence: number;
  explanation: string;
}

const SENTENCES: Sentence[] = [
  {
    start: "The dog chased the",
    options: ["cat", "idea", "Wednesday", "ball"],
    aiPick: "cat",
    aiConfidence: 72,
    explanation:
      "AI picks 'cat' because in its training data, 'dog chased the cat' appears thousands of times. It's pure pattern matching — not understanding.",
  },
  {
    start: "I'm feeling really",
    options: ["happy", "purple", "keyboard", "tired"],
    aiPick: "happy",
    aiConfidence: 45,
    explanation:
      "AI gives both 'happy' and 'tired' high scores because both commonly follow 'feeling really.' It doesn't actually feel anything!",
  },
  {
    start: "The capital of France is",
    options: ["Paris", "London", "blue", "running"],
    aiPick: "Paris",
    aiConfidence: 97,
    explanation:
      "AI is extremely confident here because 'capital of France is Paris' appears so often in training text. But it doesn't 'know' geography — it just matches patterns.",
  },
  {
    start: "She opened the door and saw a",
    options: ["garden", "surprise", "math", "letter"],
    aiPick: "surprise",
    aiConfidence: 28,
    explanation:
      "This is harder — many words could follow. AI spreads probability across many options. Low confidence = many valid completions exist.",
  },
  {
    start: "Roses are red, violets are",
    options: ["blue", "fast", "angry", "coding"],
    aiPick: "blue",
    aiConfidence: 95,
    explanation:
      "This famous rhyme is everywhere in training data. AI completes it easily — but it doesn't understand rhyming or poetry, just that these words appear together.",
  },
];

export function FinishMySentence({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [matchedAI, setMatchedAI] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const sentence = SENTENCES[current];

  function pick(word: string) {
    if (picked !== null) return;
    setPicked(word);
    setMatchedAI((prev) => [...prev, word === sentence.aiPick]);
  }

  function next() {
    setPicked(null);
    if (current >= SENTENCES.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setCurrent((c) => c + 1);
    }
  }

  if (done) {
    const matches = matchedAI.filter(Boolean).length;
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="text-7xl"
        >
          💬
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">
            {matches}/{SENTENCES.length}
          </div>
          <div className="text-slate-400 text-sm mt-1">times you matched AI&apos;s prediction</div>
          <div className="text-slate-300 mt-3">
            {matches >= 4
              ? "You think like a language model! Same patterns, same predictions."
              : matches >= 2
              ? "Interesting! Sometimes you and AI agree, sometimes not."
              : "You're more creative than AI — you don't just follow the obvious pattern!"}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {matchedAI.map((matched, i) => (
            <div
              key={i}
              className={`py-3 rounded-xl font-black text-lg ${
                matched
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "bg-slate-700/50 text-slate-400 border border-slate-600"
              }`}
            >
              {matched ? "=" : "≠"}
            </div>
          ))}
        </div>
        <div className="bg-purple-500/20 border border-purple-500/40 rounded-2xl p-4">
          <div className="font-black text-purple-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">
            Language AI works by predicting the most likely next word — over and over.
            ChatGPT is basically super-powered autocomplete!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {SENTENCES.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-all ${
                i < current
                  ? matchedAI[i]
                    ? "bg-purple-500"
                    : "bg-slate-500"
                  : i === current
                  ? "bg-purple-400"
                  : "bg-slate-700"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-400 font-bold">
          {current + 1}/{SENTENCES.length}
        </span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-purple-400 mb-1">FINISH THE SENTENCE</div>
        <div className="text-sm text-slate-400 font-bold mb-5">
          Pick the word you think comes next — then see if AI agrees!
        </div>

        {/* Sentence with blank */}
        <div className="bg-space-900 rounded-xl p-4 mb-5 border border-slate-600">
          <span className="text-white text-lg font-bold">{sentence.start} </span>
          <AnimatePresence mode="wait">
            {picked === null ? (
              <motion.span
                key="blank"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block bg-purple-500/30 border-2 border-dashed border-purple-500/50 rounded-lg px-4 py-1 text-purple-400 font-black"
              >
                ???
              </motion.span>
            ) : (
              <motion.span
                key="filled"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block bg-purple-500/30 border-2 border-purple-500 rounded-lg px-4 py-1 text-purple-300 font-black"
              >
                {picked}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Options */}
        {picked === null ? (
          <div className="grid grid-cols-2 gap-3">
            {sentence.options.map((opt, i) => (
              <motion.button
                key={opt}
                onClick={() => pick(opt)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.2 }}
                className="py-4 rounded-xl border border-slate-700 bg-space-900 font-black text-white text-lg hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors"
              >
                {opt}
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* AI's pick */}
            <div className="bg-space-900 rounded-xl p-4 border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-black text-purple-400">AI&apos;S PREDICTION</div>
                <div className="text-xs font-bold text-slate-400">
                  {picked === sentence.aiPick ? "You matched!" : "Different picks"}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white font-black text-lg">
                  &quot;{sentence.aiPick}&quot;
                </span>
                <div className="flex-1">
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${sentence.aiConfidence}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-purple-500 rounded-full"
                    />
                  </div>
                </div>
                <span className="text-purple-300 text-sm font-black">
                  {sentence.aiConfidence}%
                </span>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-sm text-slate-300">
              {sentence.explanation}
            </div>

            <button
              onClick={next}
              className="w-full py-4 rounded-xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors"
            >
              {current < SENTENCES.length - 1 ? "Next Sentence →" : "See Results →"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
