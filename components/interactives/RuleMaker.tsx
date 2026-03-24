"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Rule {
  area: string;
  icon: string;
  currentApproach: string;
  proposals: { label: string; description: string }[];
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const RULES: Rule[] = [
  {
    area: "AI in Schools",
    icon: "🏫",
    currentApproach: "Most schools are still figuring out rules for AI use. Some ban it, some encourage it, most are somewhere in between.",
    proposals: [
      { label: "Ban all AI tools", description: "Students learn without AI assistance" },
      { label: "Allow with transparency", description: "Students can use AI but must say when and how" },
    ],
    question: "What's the strongest argument for requiring transparency about AI use in school?",
    options: ["It makes grading easier", "Students learn to use AI as a tool while building their own skills", "AI is always wrong", "Teachers don't understand AI"],
    correct: 1,
    explanation: "Transparency lets students benefit from AI while still developing critical thinking. The goal isn't to ban tools but to ensure learning happens alongside their use.",
  },
  {
    area: "Deepfakes",
    icon: "🎭",
    currentApproach: "AI can create realistic fake videos of real people. Some countries have laws against non-consensual deepfakes, but enforcement is difficult.",
    proposals: [
      { label: "Ban all deepfakes", description: "No AI-generated videos of real people, period" },
      { label: "Require labeling", description: "AI-generated content must be clearly marked as synthetic" },
    ],
    question: "Why is labeling AI content important?",
    options: ["So AI gets credit", "So people can distinguish real from synthetic and make informed judgments", "So companies can charge more", "It's not important"],
    correct: 1,
    explanation: "When people know content is AI-generated, they can evaluate it differently. Without labels, people might believe and share fake content as if it were real.",
  },
  {
    area: "AI Hiring",
    icon: "💼",
    currentApproach: "Many companies use AI to screen job applications. Studies show these systems can discriminate based on gender, race, and disability.",
    proposals: [
      { label: "Ban AI in hiring", description: "All applications reviewed by humans only" },
      { label: "Require bias audits", description: "AI hiring tools must be tested for fairness regularly" },
    ],
    question: "Why should AI hiring tools be audited for bias?",
    options: ["To make AI faster", "Because AI can perpetuate discrimination without anyone realizing it", "To save money", "Bias audits aren't needed"],
    correct: 1,
    explanation: "AI can silently discriminate at scale — rejecting thousands of qualified candidates based on biased patterns. Regular audits catch these problems before they harm people.",
  },
  {
    area: "AI and Privacy",
    icon: "🔒",
    currentApproach: "AI systems collect vast amounts of personal data. Laws like GDPR (Europe) give people some control, but many countries have no AI privacy laws.",
    proposals: [
      { label: "Opt-in only", description: "AI can only use your data if you explicitly agree" },
      { label: "Data minimization", description: "AI can only collect the minimum data needed for its purpose" },
    ],
    question: "What does 'data minimization' mean?",
    options: ["Collect as much data as possible", "Only collect data that's truly necessary for the service", "Delete all data immediately", "Make data smaller in file size"],
    correct: 1,
    explanation: "Data minimization means only collecting what you actually need. A weather app needs your location, but it doesn't need your contacts. Less data collected = less risk if breached.",
  },
  {
    area: "AI Weapons",
    icon: "🤖",
    currentApproach: "Several countries are developing autonomous weapons — AI that can select and attack targets without human approval.",
    proposals: [
      { label: "Human-in-the-loop", description: "A human must approve every lethal decision" },
      { label: "Full ban", description: "No AI should ever make life-or-death decisions autonomously" },
    ],
    question: "Why do many experts want a 'human-in-the-loop' for AI weapons?",
    options: ["Humans are faster", "Accountability — someone must be responsible for life-or-death decisions", "AI aims better", "It's cheaper"],
    correct: 1,
    explanation: "If an AI makes a lethal mistake, who's responsible? The programmer? The commander? The machine? Keeping humans in the loop ensures accountability for the most consequential decisions.",
  },
];

export function RuleMaker({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function pickAnswer(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === RULES[idx].correct) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    if (idx >= RULES.length - 1) {
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
          {score >= RULES.length - 1 ? "📜" : "⚖️"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{RULES.length}</div>
          <div className="text-slate-300 mt-2">
            {score >= RULES.length - 1 ? "Future policy maker! Excellent reasoning." : score >= RULES.length / 2 ? "Strong understanding of AI governance!" : "AI rules are complex — you're thinking about the right questions!"}
          </div>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/40 rounded-2xl p-4">
          <div className="font-black text-orange-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">AI rules are being written right now — by governments, companies, and communities. Your generation will shape these rules for decades to come.</p>
        </div>
      </div>
    );
  }

  const rule = RULES[idx];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {RULES.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < idx ? "bg-orange-500" : i === idx ? "bg-orange-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs font-bold text-yellow-400">Score: {score}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-orange-400 mb-3">RULE MAKER — {rule.area.toUpperCase()}</div>

        <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-3">
            <div className="text-3xl mb-2">{rule.icon}</div>
            <div className="text-sm text-slate-400 mb-3">{rule.currentApproach}</div>
            <div className="grid grid-cols-2 gap-2">
              {rule.proposals.map((p, i) => (
                <div key={i} className="bg-space-800 rounded-lg p-3 border border-slate-700">
                  <div className="text-xs font-black text-orange-400 mb-1">{p.label}</div>
                  <div className="text-xs text-slate-400">{p.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-white font-black text-sm mb-3">{rule.question}</div>

          {picked === null ? (
            <div className="space-y-2">
              {rule.options.map((opt, i) => (
                <motion.button key={i} onClick={() => pickAnswer(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-xl border border-slate-700 bg-space-900 font-bold text-white text-sm hover:border-orange-500/50 transition-colors">
                  {opt}
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${picked === rule.correct ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                {picked === rule.correct ? "Well reasoned! " : `Key point: "${rule.options[rule.correct]}." `}
                <span className="font-normal text-slate-300">{rule.explanation}</span>
              </div>
              <button onClick={next} className="w-full py-4 rounded-xl font-black text-white bg-orange-500 hover:bg-orange-400 btn-press transition-colors">
                {idx < RULES.length - 1 ? "Next Rule" : "See Results"} &rarr;
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
