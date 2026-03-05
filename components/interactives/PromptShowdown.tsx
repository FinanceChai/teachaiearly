"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PromptPair {
  task: string;
  weak: { prompt: string; output: string };
  strong: { prompt: string; output: string };
  tip: string;
}

const ROUNDS: PromptPair[] = [
  {
    task: "You want AI to help you write a story about a dragon.",
    weak: {
      prompt: "Write a story",
      output:
        "Once upon a time, there was a person who went on an adventure. They walked through a forest and found something interesting. The end.",
    },
    strong: {
      prompt: "Write a 3-paragraph story about a friendly dragon named Ember who helps a lost kitten find its way home through a magical forest",
      output:
        "Ember the dragon spotted a tiny orange kitten shivering under a mushroom in the Whispering Woods. 'Don't worry,' Ember said, lowering her warm snout. 'I know every path in this forest.' She gently placed the kitten on her back, between her soft wings...",
    },
    tip: "Be specific! Tell AI exactly what you want — character names, setting, length, and tone.",
  },
  {
    task: "You need help with a science question about planets.",
    weak: {
      prompt: "Tell me about space",
      output:
        "Space is very large and contains many things like stars, planets, galaxies, and other celestial objects. It has been studied for centuries by scientists around the world.",
    },
    strong: {
      prompt: "Explain why Mars looks red, in 2 sentences, for a 10-year-old",
      output:
        "Mars looks red because its surface is covered in iron oxide — basically rust! It's the same stuff that makes your bike chain turn reddish-brown when it gets wet.",
    },
    tip: "Tell AI your audience and how long the answer should be. 'For a 10-year-old' changes everything!",
  },
  {
    task: "You want AI to help you practice math.",
    weak: {
      prompt: "Help me with math",
      output:
        "Sure! Math is a broad subject. Are you interested in arithmetic, algebra, geometry, calculus, or something else? Please let me know what you need help with.",
    },
    strong: {
      prompt: "Give me 3 multiplication problems using 2-digit numbers, then show the step-by-step solution for each one",
      output:
        "Problem 1: 23 × 14\nStep 1: 23 × 4 = 92\nStep 2: 23 × 10 = 230\nStep 3: 92 + 230 = 322\n\nProblem 2: 35 × 12...",
    },
    tip: "Give AI a clear structure: how many, what type, and what format you want the answer in.",
  },
  {
    task: "You want to learn about an animal for a school report.",
    weak: {
      prompt: "Tell me about animals",
      output:
        "Animals are living organisms that belong to the kingdom Animalia. They are multicellular, eukaryotic, and heterotrophic. There are millions of species...",
    },
    strong: {
      prompt: "List 5 surprising facts about octopuses that would impress my classmates, with a fun emoji for each fact",
      output:
        "🧠 They have 9 brains — one central brain and one in each arm!\n🩸 Their blood is blue because it uses copper instead of iron\n💪 They can open jars from the inside\n🎨 They change color in less than a second\n❤️ They have 3 hearts!",
    },
    tip: "Ask for a specific number of items and a fun format. AI loves clear structure!",
  },
];

export function PromptShowdown({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState<"none" | "weak" | "both">("none");
  const [scores, setScores] = useState<boolean[]>([]);
  const [userPick, setUserPick] = useState<"A" | "B" | null>(null);
  const [done, setDone] = useState(false);

  const round = ROUNDS[current];

  // The strong prompt is randomly placed as A or B (seeded by index)
  const strongIsA = current % 2 === 0;
  const promptA = strongIsA ? round.strong : round.weak;
  const promptB = strongIsA ? round.weak : round.strong;

  function revealOutputs() {
    setRevealed("weak");
    setTimeout(() => setRevealed("both"), 300);
  }

  function pickBetter(choice: "A" | "B") {
    if (userPick !== null) return;
    setUserPick(choice);
    const pickedStrong =
      (choice === "A" && strongIsA) || (choice === "B" && !strongIsA);
    setScores((prev) => [...prev, pickedStrong]);
  }

  function next() {
    setRevealed("none");
    setUserPick(null);
    if (current >= ROUNDS.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setCurrent((c) => c + 1);
    }
  }

  if (done) {
    const correct = scores.filter(Boolean).length;
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="text-7xl"
        >
          🎯
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">
            {correct}/{ROUNDS.length}
          </div>
          <div className="text-slate-300 mt-2">
            {correct === ROUNDS.length
              ? "Perfect! You know exactly what makes a great prompt!"
              : correct >= ROUNDS.length - 1
              ? "Almost perfect — you've got great prompt instincts!"
              : "Good effort! The key: be specific, set a format, know your audience."}
          </div>
        </div>
        <div className="bg-purple-500/20 border border-purple-500/40 rounded-2xl p-4">
          <div className="font-black text-purple-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">
            The secret to getting great AI output? Great input. Be specific about
            what, how much, for whom, and in what format.
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
          {ROUNDS.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-all ${
                i < current
                  ? scores[i]
                    ? "bg-purple-500"
                    : "bg-red-500"
                  : i === current
                  ? "bg-purple-400"
                  : "bg-slate-700"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-400 font-bold">
          {current + 1}/{ROUNDS.length}
        </span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-purple-400 mb-1">PROMPT SHOWDOWN</div>

        {/* Task */}
        <div className="bg-space-900 rounded-xl p-3 mb-4 border border-slate-600">
          <div className="text-xs font-bold text-slate-500 mb-1">YOUR GOAL:</div>
          <div className="text-white font-bold">{round.task}</div>
        </div>

        {revealed === "none" ? (
          <div className="space-y-4">
            <div className="text-sm text-slate-400 font-bold mb-3">
              Two people wrote different prompts. Read them and see what AI gives back:
            </div>

            {/* Prompt A */}
            <div className="bg-space-900 rounded-xl p-4 border border-slate-600">
              <div className="text-xs font-black text-blue-400 mb-2">PROMPT A</div>
              <div className="text-white font-bold text-sm italic">
                &quot;{promptA.prompt}&quot;
              </div>
            </div>

            {/* Prompt B */}
            <div className="bg-space-900 rounded-xl p-4 border border-slate-600">
              <div className="text-xs font-black text-amber-400 mb-2">PROMPT B</div>
              <div className="text-white font-bold text-sm italic">
                &quot;{promptB.prompt}&quot;
              </div>
            </div>

            <button
              onClick={revealOutputs}
              className="w-full py-4 rounded-xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors"
            >
              See AI&apos;s Outputs →
            </button>
          </div>
        ) : userPick === null ? (
          <div className="space-y-4">
            <div className="text-sm text-slate-400 font-bold mb-3">
              Which prompt got the better result? Tap to choose:
            </div>

            {/* Output A */}
            <motion.button
              onClick={() => pickBetter("A")}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full text-left bg-space-900 rounded-xl p-4 border-2 border-blue-500/30 hover:border-blue-500 transition-colors"
            >
              <div className="text-xs font-black text-blue-400 mb-2">OUTPUT A</div>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {promptA.output}
              </div>
            </motion.button>

            {/* Output B */}
            <motion.button
              onClick={() => pickBetter("B")}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="w-full text-left bg-space-900 rounded-xl p-4 border-2 border-amber-500/30 hover:border-amber-500 transition-colors"
            >
              <div className="text-xs font-black text-amber-400 mb-2">OUTPUT B</div>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {promptB.output}
              </div>
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Result */}
            <div
              className={`p-4 rounded-xl text-sm font-bold ${
                scores[scores.length - 1]
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {scores[scores.length - 1]
                ? "Correct! The specific prompt won."
                : "Not quite — the more specific prompt gave the better result."}
            </div>

            {/* Tip */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="text-xs font-black text-purple-400 mb-1">PROMPT TIP</div>
              <div className="text-sm text-slate-300">{round.tip}</div>
            </div>

            <button
              onClick={next}
              className="w-full py-4 rounded-xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors"
            >
              {current < ROUNDS.length - 1 ? "Next Round →" : "See Results →"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
