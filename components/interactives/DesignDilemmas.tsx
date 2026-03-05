"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Dilemma {
  title: string;
  scenario: string;
  choices: { label: string; tradeoff: string }[];
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const DILEMMAS: Dilemma[] = [
  {
    title: "The Content Filter",
    scenario: "You're designing an AI content filter for a kids' platform. You have to choose how strict it is.",
    choices: [
      { label: "Very strict", tradeoff: "Blocks harmful content but also blocks lots of safe content (over-filtering)" },
      { label: "Very relaxed", tradeoff: "Lets everything through, including some harmful content (under-filtering)" },
    ],
    question: "What does this teach us about AI design?",
    options: ["There's always a perfect setting", "Every design choice involves tradeoffs", "AI should decide for itself", "Filters don't matter"],
    correct: 1,
    explanation: "Every AI system involves tradeoffs. Stricter = safer but more false positives. Relaxed = fewer false positives but more risk. The designer's VALUES determine where to set the dial.",
  },
  {
    title: "The Recommendation Engine",
    scenario: "You're building a video recommendation AI. You can optimize for different goals.",
    choices: [
      { label: "Maximize watch time", tradeoff: "Users watch more, but may see addictive or extreme content" },
      { label: "Maximize learning", tradeoff: "Users see educational content but might leave the platform" },
    ],
    question: "Who decides what the AI should optimize for?",
    options: ["The AI decides itself", "The company's engineers and leadership", "The government always decides", "Nobody — it happens randomly"],
    correct: 1,
    explanation: "Humans choose what AI optimizes for. That choice reflects the company's values: profit (watch time) vs. user wellbeing (learning). These are human decisions, not technical ones.",
  },
  {
    title: "The Self-Driving Car",
    scenario: "A self-driving car's AI must be programmed for emergency situations where harm is unavoidable.",
    choices: [
      { label: "Protect passengers first", tradeoff: "Car prioritizes people inside, even if it means more risk to pedestrians" },
      { label: "Minimize total harm", tradeoff: "Car calculates who's at less risk, which might mean endangering passengers" },
    ],
    question: "Why is this an ethics problem, not a tech problem?",
    options: ["Because the code is too complex", "Because it involves human values about whose safety matters", "Because self-driving cars don't work", "Because engineers aren't smart enough"],
    correct: 1,
    explanation: "No algorithm can tell us whose life matters more. This is a question about human values, not computation. Engineers can BUILD either option — but CHOOSING requires ethical reasoning.",
  },
  {
    title: "The Language Model",
    scenario: "You're setting the rules for a chatbot AI. Users want it to be helpful, but some requests are problematic.",
    choices: [
      { label: "Answer everything", tradeoff: "Maximally helpful but can assist with harmful activities" },
      { label: "Refuse anything risky", tradeoff: "Very safe but frustratingly unhelpful for legitimate questions" },
    ],
    question: "What's the key insight about 'neutral' AI?",
    options: ["AI can be perfectly neutral", "All AI reflects someone's choices about what's acceptable", "Only bad AI has values", "Rules make AI less intelligent"],
    correct: 1,
    explanation: "There's no 'neutral' position. Choosing to answer everything IS a value choice. Choosing to refuse IS a value choice. Every AI reflects the values of its designers.",
  },
];

export function DesignDilemmas({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function pickAnswer(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === DILEMMAS[idx].correct) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    if (idx >= DILEMMAS.length - 1) {
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
          {score >= DILEMMAS.length - 1 ? "⚖️" : "🤔"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{DILEMMAS.length}</div>
          <div className="text-slate-300 mt-2">
            {score >= DILEMMAS.length - 1 ? "Outstanding ethical reasoning!" : score >= DILEMMAS.length / 2 ? "Good understanding of AI design ethics!" : "These dilemmas are genuinely hard — even experts disagree!"}
          </div>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/40 rounded-2xl p-4">
          <div className="font-black text-orange-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">Every AI system embeds human values in its design. There&apos;s no such thing as a &quot;neutral&quot; AI — understanding whose values are built in is critical.</p>
        </div>
      </div>
    );
  }

  const d = DILEMMAS[idx];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {DILEMMAS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < idx ? "bg-orange-500" : i === idx ? "bg-orange-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs font-bold text-yellow-400">Score: {score}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-orange-400 mb-3">DESIGN DILEMMAS</div>

        <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-3">
            <div className="text-white font-black mb-2">{d.title}</div>
            <div className="text-sm text-slate-400 mb-3">{d.scenario}</div>
            <div className="grid grid-cols-2 gap-2">
              {d.choices.map((c, i) => (
                <div key={i} className="bg-space-800 rounded-lg p-3 border border-slate-700">
                  <div className="text-xs font-black text-orange-400 mb-1">Option {i + 1}: {c.label}</div>
                  <div className="text-xs text-slate-400">{c.tradeoff}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-white font-black text-sm mb-3">{d.question}</div>

          {picked === null ? (
            <div className="space-y-2">
              {d.options.map((opt, i) => (
                <motion.button key={i} onClick={() => pickAnswer(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-xl border border-slate-700 bg-space-900 font-bold text-white text-sm hover:border-orange-500/50 transition-colors">
                  {opt}
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${picked === d.correct ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                {picked === d.correct ? "Well reasoned! " : `Key insight: "${d.options[d.correct]}." `}
                <span className="font-normal text-slate-300">{d.explanation}</span>
              </div>
              <button onClick={next} className="w-full py-4 rounded-xl font-black text-white bg-orange-500 hover:bg-orange-400 btn-press transition-colors">
                {idx < DILEMMAS.length - 1 ? "Next Dilemma" : "See Results"} &rarr;
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
