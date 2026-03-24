"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BiasScenario {
  title: string;
  setup: string;
  trainingData: string;
  outcome: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const SCENARIOS: BiasScenario[] = [
  {
    title: "The Hiring Bot",
    setup: "A company trains AI to screen job applications by learning from their past 10 years of hiring decisions.",
    trainingData: "90% of past hires were men (because the industry was male-dominated).",
    outcome: "The AI starts rejecting women's applications at a much higher rate.",
    question: "Why did this happen?",
    options: ["The AI is sexist on purpose", "The AI learned the bias in the historical data", "Women are less qualified", "The AI was programmed to prefer men"],
    correct: 1,
    explanation: "The AI wasn't programmed to be biased — it learned bias from biased data. If past hiring favored men, the AI repeats that pattern. This actually happened at a major tech company.",
  },
  {
    title: "The Photo App",
    setup: "A photo app uses AI to automatically tag people in photos. It was trained mostly on photos of light-skinned people.",
    trainingData: "Training set: 80% light skin, 15% medium skin, 5% dark skin.",
    outcome: "The app works great on light-skinned faces but frequently misidentifies or fails to detect dark-skinned faces.",
    question: "What's the root cause?",
    options: ["Dark skin is harder for cameras", "The training data wasn't representative", "AI can't see color", "The algorithm is broken"],
    correct: 1,
    explanation: "When training data doesn't equally represent all groups, AI performs worse on underrepresented groups. This is a well-documented problem in facial recognition systems.",
  },
  {
    title: "The News Feed",
    setup: "A social media AI learns what content to show you based on what gets the most clicks and engagement.",
    trainingData: "Shocking, angry, and extreme content gets more clicks than balanced reporting.",
    outcome: "The AI shows increasingly extreme content because it drives more engagement.",
    question: "What type of bias is this?",
    options: ["No bias — it's just showing popular content", "Engagement bias — optimizing for clicks over truth", "The users are biased, not the AI", "Technical error"],
    correct: 1,
    explanation: "When AI optimizes for engagement, it can create a bias toward extreme content. The AI isn't 'trying' to spread misinformation — it's just maximizing the metric it was given.",
  },
  {
    title: "The Loan Checker",
    setup: "A bank uses AI to decide who gets approved for loans. It's trained on historical loan data.",
    trainingData: "Historical data includes decades where certain neighborhoods were denied loans based on race (redlining).",
    outcome: "The AI denies loans to people from those same neighborhoods at higher rates, even though it never sees race directly.",
    question: "How can AI be biased without seeing race?",
    options: ["It can't — this is a coincidence", "Zip codes and other data correlate with race", "The AI is guessing randomly", "Banks told the AI to discriminate"],
    correct: 1,
    explanation: "AI can find proxy variables — zip code, school, name — that correlate with race. Even without directly seeing race, it recreates racial bias through these proxies. This is called proxy discrimination.",
  },
  {
    title: "The Medical AI",
    setup: "An AI is trained to detect skin cancer from photos. Most training photos came from dermatology textbooks.",
    trainingData: "Textbooks predominantly showed skin conditions on light skin.",
    outcome: "The AI is much less accurate at detecting skin cancer on dark skin.",
    question: "Who is most harmed by this bias?",
    options: ["Nobody — doctors double-check anyway", "People with dark skin who rely on AI screening", "The AI developers", "Light-skinned patients"],
    correct: 1,
    explanation: "People with dark skin get less accurate results, potentially missing early cancer detection. Medical AI bias can literally be life-threatening — making representative training data a matter of health equity.",
  },
];

export function BiasedBots({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showData, setShowData] = useState(false);
  const [done, setDone] = useState(false);

  function pickAnswer(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === SCENARIOS[idx].correct) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    setShowData(false);
    if (idx >= SCENARIOS.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setIdx((i) => i + 1);
    }
  }

  if (done) {
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          {score >= SCENARIOS.length - 1 ? "🔍" : "🤖"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{SCENARIOS.length}</div>
          <div className="text-slate-300 mt-2">
            {score >= SCENARIOS.length - 1 ? "Excellent! You can spot AI bias like a pro." : score >= SCENARIOS.length / 2 ? "Good bias detection skills!" : "AI bias is tricky — now you know what to look for!"}
          </div>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/40 rounded-2xl p-4">
          <div className="font-black text-orange-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">AI bias isn&apos;t about evil programmers — it&apos;s about biased data creating biased outcomes. Spotting bias is the first step to fixing it.</p>
        </div>
      </div>
    );
  }

  const s = SCENARIOS[idx];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {SCENARIOS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < idx ? "bg-orange-500" : i === idx ? "bg-orange-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs font-bold text-yellow-400">Score: {score}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-orange-400 mb-3">BIASED BOTS</div>

        <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-3">
            <div className="text-white font-black mb-2">{s.title}</div>
            <div className="text-sm text-slate-400 mb-3">{s.setup}</div>
            {!showData ? (
              <button onClick={() => setShowData(true)} className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors">
                Reveal the training data &rarr;
              </button>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                  <div className="text-xs font-black text-orange-400 mb-1">TRAINING DATA</div>
                  <div className="text-sm text-slate-300">{s.trainingData}</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <div className="text-xs font-black text-red-400 mb-1">RESULT</div>
                  <div className="text-sm text-slate-300">{s.outcome}</div>
                </div>
              </motion.div>
            )}
          </div>

          {showData && (
            <>
              <div className="text-white font-black text-sm mb-3">{s.question}</div>
              {picked === null ? (
                <div className="space-y-2">
                  {s.options.map((opt, i) => (
                    <motion.button key={i} onClick={() => pickAnswer(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-xl border border-slate-700 bg-space-900 font-bold text-white text-sm hover:border-orange-500/50 transition-colors">
                      {opt}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <div className={`p-4 rounded-xl text-sm font-bold ${picked === s.correct ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                    {picked === s.correct ? "Correct! " : `Answer: "${s.options[s.correct]}." `}
                    <span className="font-normal text-slate-300">{s.explanation}</span>
                  </div>
                  <button onClick={next} className="w-full py-4 rounded-xl font-black text-white bg-orange-500 hover:bg-orange-400 btn-press transition-colors">
                    {idx < SCENARIOS.length - 1 ? "Next Scenario" : "See Results"} &rarr;
                  </button>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
