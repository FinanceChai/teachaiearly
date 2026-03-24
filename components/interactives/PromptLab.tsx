"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PromptChallenge {
  goal: string;
  targetOutput: string;
  hints: string[];
  prompts: { text: string; output: string; score: number }[];
}

const CHALLENGES: PromptChallenge[] = [
  {
    goal: "Get AI to write a haiku about the ocean",
    targetOutput: "A 3-line poem (5-7-5 syllables) about the ocean",
    hints: ["Mention 'haiku' specifically", "Say it should be about the ocean", "Ask for the 5-7-5 format"],
    prompts: [
      {
        text: "Write something about water",
        output:
          "Water is essential for life. It covers about 71% of Earth's surface and is found in oceans, rivers, lakes, and underground reserves...",
        score: 1,
      },
      {
        text: "Write a poem about the ocean",
        output:
          "The ocean vast and wide,\nWaves crashing on the shore with might,\nEndless blue horizon stretches far,\nBeneath the twinkling stars at night...",
        score: 2,
      },
      {
        text: "Write a haiku about the ocean",
        output:
          "Waves kiss the warm sand\nSalt air carries seabird songs\nDeep blue stretches far",
        score: 3,
      },
      {
        text: "Write a haiku (5-7-5 syllables) about the ocean at sunset, with vivid imagery",
        output:
          "Gold melts into waves\nThe horizon holds its breath\nNight swallows the sea",
        score: 4,
      },
    ],
  },
  {
    goal: "Get AI to explain gravity to a 5-year-old",
    targetOutput: "A simple, fun explanation of gravity for a very young child",
    hints: ["Specify the audience age", "Ask for simple words", "Suggest using an example"],
    prompts: [
      {
        text: "Explain gravity",
        output:
          "Gravity is a fundamental force of nature that attracts objects with mass toward each other. It is described by Newton's law of universal gravitation, F = G(m1m2)/r²...",
        score: 1,
      },
      {
        text: "Explain gravity simply",
        output:
          "Gravity is the force that pulls everything toward the ground. It's why things fall when you drop them and why we stay on Earth instead of floating away.",
        score: 2,
      },
      {
        text: "Explain gravity to a 5-year-old",
        output:
          "You know when you throw a ball up in the air? Gravity is the invisible force that pulls it back down! It's like Earth is giving everything a big hug and keeping it close.",
        score: 3,
      },
      {
        text: "Explain gravity to a 5-year-old using a fun example with a teddy bear, in 3 short sentences",
        output:
          "When you drop your teddy bear, it falls down — not up! That's because Earth has a superpower called gravity that pulls everything toward it. It's like an invisible magnet that keeps you, your teddy, and everything else on the ground!",
        score: 4,
      },
    ],
  },
  {
    goal: "Get AI to create a recipe for a peanut butter sandwich",
    targetOutput: "A clear, step-by-step recipe with specific instructions",
    hints: ["Ask for numbered steps", "Specify ingredients list", "Mention portion or serving details"],
    prompts: [
      {
        text: "Peanut butter sandwich",
        output:
          "A peanut butter sandwich is a popular American food made by spreading peanut butter on bread. It is commonly eaten for lunch and is a good source of protein...",
        score: 1,
      },
      {
        text: "How to make a peanut butter sandwich",
        output:
          "To make a PB sandwich, take some bread, add peanut butter, and put the slices together. You can also add jelly if you like.",
        score: 2,
      },
      {
        text: "Write a recipe for a peanut butter sandwich with ingredients and steps",
        output:
          "Ingredients:\n- 2 slices of bread\n- 2 tablespoons peanut butter\n\nSteps:\n1. Lay out two slices of bread\n2. Spread peanut butter on one slice\n3. Place the other slice on top\n4. Cut diagonally and serve",
        score: 3,
      },
      {
        text: "Write a kid-friendly recipe for the ultimate peanut butter sandwich. Include an ingredients list with exact amounts, numbered steps a 10-year-old can follow alone, and a fun tip at the end",
        output:
          "🥜 THE ULTIMATE PB SANDWICH\n\nIngredients:\n- 2 slices of soft white bread\n- 2 tbsp creamy peanut butter\n- 1 tbsp honey\n- 4 banana slices\n\nSteps:\n1. Toast the bread until golden\n2. Spread PB evenly on both slices\n3. Drizzle honey on one slice\n4. Add banana slices in a single layer\n5. Press together gently — don't squish!\n\n💡 Pro tip: Put it in the fridge for 5 min for the perfect crunch-to-soft ratio!",
        score: 4,
      },
    ],
  },
];

export function PromptLab({
  onComplete,
}: {
  onComplete: (passed: boolean) => void;
}) {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [roundScores, setRoundScores] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const challenge = CHALLENGES[challengeIdx];

  function selectPrompt(idx: number) {
    if (selectedPrompt !== null) return;
    setSelectedPrompt(idx);
    const score = challenge.prompts[idx].score;
    setTotalScore((s) => s + score);
    setRoundScores((prev) => [...prev, score]);
  }

  function next() {
    setSelectedPrompt(null);
    setShowHints(false);
    if (challengeIdx >= CHALLENGES.length - 1) {
      setDone(true);
      const finalScore = totalScore;
      const maxScore = CHALLENGES.length * 4;
      onComplete(finalScore >= maxScore * 0.6);
    } else {
      setChallengeIdx((c) => c + 1);
    }
  }

  if (done) {
    const maxScore = CHALLENGES.length * 4;
    const pct = Math.round((totalScore / maxScore) * 100);
    const passed = totalScore >= maxScore * 0.6;
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="text-7xl"
        >
          {passed ? "✍️" : "📝"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">
            {totalScore}/{maxScore}
          </div>
          <div className="text-slate-400 text-sm mt-1">prompt quality score ({pct}%)</div>
          <div className="text-slate-300 mt-3">
            {pct >= 80
              ? "Prompt Master level! You know exactly how to talk to AI."
              : pct >= 60
              ? "Strong prompting skills! You understand what makes AI tick."
              : "Keep practicing — prompt craft is a real skill!"}
          </div>
        </div>
        <div className="flex justify-center gap-3">
          {roundScores.map((score, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border ${
                  score >= 3
                    ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                    : score >= 2
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    : "bg-red-500/20 text-red-300 border-red-500/30"
                }`}
              >
                {score}/4
              </div>
              <div className="text-xs text-slate-500">R{i + 1}</div>
            </div>
          ))}
        </div>
        <div className="bg-purple-500/20 border border-purple-500/40 rounded-2xl p-4">
          <div className="font-black text-purple-300">
            {passed ? "Badge Earned! ✍️" : "Challenge Complete!"}
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Great prompts are specific, structured, and audience-aware.
            The better your prompt, the better AI&apos;s output!
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
          {CHALLENGES.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-all ${
                i < challengeIdx
                  ? "bg-purple-500"
                  : i === challengeIdx
                  ? "bg-purple-400"
                  : "bg-slate-700"
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-bold text-yellow-400">
          Score: {totalScore}
        </span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-purple-400 mb-1">PROMPT LAB</div>

        {/* Goal */}
        <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-4">
          <div className="text-xs font-black text-purple-400 mb-1">YOUR GOAL</div>
          <div className="text-white font-black">{challenge.goal}</div>
          <div className="text-xs text-slate-400 mt-1">Target: {challenge.targetOutput}</div>
        </div>

        {/* Hints toggle */}
        <button
          onClick={() => setShowHints(!showHints)}
          className="text-sm text-purple-400 font-bold mb-4 hover:text-purple-300 transition-colors"
        >
          {showHints ? "Hide hints ▲" : "Need a hint? ▼"}
        </button>
        {showHints && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-space-900 rounded-xl p-3 border border-slate-600 mb-4"
          >
            <ul className="space-y-1">
              {challenge.hints.map((hint, i) => (
                <li key={i} className="text-sm text-slate-400">
                  💡 {hint}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <div className="text-sm text-slate-400 font-bold mb-3">
          Pick the prompt that will get the best result:
        </div>

        {/* Prompt options */}
        {selectedPrompt === null ? (
          <div className="space-y-3">
            {challenge.prompts.map((p, i) => (
              <motion.button
                key={i}
                onClick={() => selectPrompt(i)}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="w-full text-left p-4 rounded-xl border border-slate-700 bg-space-900 hover:border-purple-500/50 hover:bg-purple-500/5 transition-colors"
              >
                <div className="text-white font-bold text-sm italic">
                  &quot;{p.text}&quot;
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Selected prompt */}
            <div className="bg-space-900 rounded-xl p-4 border border-purple-500/40">
              <div className="text-xs font-black text-purple-400 mb-2">YOU PICKED</div>
              <div className="text-white font-bold text-sm italic mb-3">
                &quot;{challenge.prompts[selectedPrompt].text}&quot;
              </div>
              <div className="text-xs font-black text-slate-500 mb-1">AI OUTPUT:</div>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {challenge.prompts[selectedPrompt].output}
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-3">
              <div className="text-sm font-bold text-slate-400">Prompt Quality:</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <span
                    key={star}
                    className={`text-xl ${
                      star <= challenge.prompts[selectedPrompt].score
                        ? "text-yellow-400"
                        : "text-slate-700"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm font-black text-yellow-400">
                +{challenge.prompts[selectedPrompt].score}
              </span>
            </div>

            {/* Best prompt reveal */}
            {selectedPrompt !== challenge.prompts.length - 1 && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="text-xs font-black text-green-400 mb-1">
                  THE BEST PROMPT WAS:
                </div>
                <div className="text-sm text-white font-bold italic">
                  &quot;{challenge.prompts[challenge.prompts.length - 1].text}&quot;
                </div>
              </div>
            )}

            <button
              onClick={next}
              className="w-full py-4 rounded-xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors"
            >
              {challengeIdx < CHALLENGES.length - 1
                ? "Next Challenge →"
                : "See Final Score →"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
