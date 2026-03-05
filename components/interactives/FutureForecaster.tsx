"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Prediction {
  area: string;
  icon: string;
  nearFuture: string;
  farFuture: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const PREDICTIONS: Prediction[] = [
  {
    area: "AI in Education",
    icon: "📚",
    nearFuture: "AI tutors that adapt to each student's learning pace and style. Instant feedback on writing and problem-solving.",
    farFuture: "Fully personalized learning paths where AI understands not just what you know, but how you learn best and what motivates you.",
    question: "What's the most important skill for students in an AI-powered future?",
    options: ["Memorizing more facts", "Learning to think critically and ask good questions", "Typing faster", "Avoiding all AI tools"],
    correct: 1,
    explanation: "When AI can look up any fact instantly, the human advantage is critical thinking, creativity, and asking the right questions. These skills become MORE important, not less.",
  },
  {
    area: "AI in Healthcare",
    icon: "🏥",
    nearFuture: "AI that helps doctors spot diseases earlier from medical scans. Drug discovery sped up from years to months.",
    farFuture: "AI that predicts health problems before symptoms appear, based on genetic data and lifestyle patterns.",
    question: "What's a key challenge for AI in healthcare?",
    options: ["AI is too slow", "Ensuring AI works equally well for all populations", "Doctors don't like computers", "Medical data is boring"],
    correct: 1,
    explanation: "If AI is trained mostly on data from one population, it may miss diseases or misdiagnose people from other groups. Health equity in AI is a major ongoing challenge.",
  },
  {
    area: "AI and Jobs",
    icon: "💼",
    nearFuture: "AI automates repetitive tasks in many jobs. New jobs emerge around AI development, oversight, and ethics.",
    farFuture: "Most jobs involve some AI collaboration. The question shifts from 'Will AI take my job?' to 'How do I work effectively with AI?'",
    question: "What's the best way to prepare for an AI-influenced job market?",
    options: ["Learn only coding", "Develop uniquely human skills: creativity, empathy, leadership, and critical thinking", "Avoid technology entirely", "Only study AI"],
    correct: 1,
    explanation: "AI handles routine tasks well, but creativity, empathy, leadership, and complex judgment remain uniquely human. The future belongs to people who combine human strengths WITH AI tools.",
  },
  {
    area: "AI and the Environment",
    icon: "🌍",
    nearFuture: "AI optimizes energy grids, predicts weather patterns, and monitors deforestation from satellite imagery.",
    farFuture: "AI-designed materials and processes that could help address climate change — but AI itself uses enormous amounts of energy.",
    question: "What's the environmental paradox of AI?",
    options: ["AI is too green", "AI can help solve environmental problems but also contributes to them through energy use", "AI doesn't affect the environment", "Only solar-powered AI matters"],
    correct: 1,
    explanation: "Training large AI models uses massive amounts of electricity and water for cooling. AI can help fight climate change, but it also contributes to it. Sustainable AI development matters.",
  },
  {
    area: "AI and You",
    icon: "🌟",
    nearFuture: "AI tools become as common as search engines. Everyone needs basic AI literacy — knowing what AI can and can't do.",
    farFuture: "AI is woven into daily life. The people who shape AI's impact are those who understand both its capabilities and its limitations.",
    question: "Why does YOUR understanding of AI matter?",
    options: ["It doesn't — experts will handle everything", "You're the generation that will set the rules and norms for how AI is used", "Only programmers need to understand AI", "AI will figure itself out"],
    correct: 1,
    explanation: "Your generation will live with AI more than any before. The choices you make — as users, voters, workers, and creators — will shape how AI affects everyone. Understanding AI is empowerment.",
  },
];

export function FutureForecaster({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function pickAnswer(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === PREDICTIONS[idx].correct) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    if (idx >= PREDICTIONS.length - 1) {
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
          {score >= PREDICTIONS.length - 1 ? "🚀" : "🔮"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{PREDICTIONS.length}</div>
          <div className="text-slate-300 mt-2">
            {score >= PREDICTIONS.length - 1 ? "Future-ready! You're thinking about AI the right way." : score >= PREDICTIONS.length / 2 ? "Great forward thinking about AI!" : "The future is uncertain — but you're asking the right questions!"}
          </div>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/40 rounded-2xl p-4">
          <div className="font-black text-orange-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">You&apos;re growing up at the most important time in AI history. What you learn now will help you shape how AI is used in the future.</p>
        </div>
      </div>
    );
  }

  const pred = PREDICTIONS[idx];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {PREDICTIONS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < idx ? "bg-orange-500" : i === idx ? "bg-orange-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs font-bold text-yellow-400">Score: {score}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-orange-400 mb-3">FUTURE FORECASTER — {pred.area.toUpperCase()}</div>

        <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-3">
            <div className="text-3xl mb-2">{pred.icon}</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-space-800 rounded-lg p-3 border border-slate-700">
                <div className="text-xs font-black text-orange-400 mb-1">NEAR FUTURE</div>
                <div className="text-xs text-slate-300">{pred.nearFuture}</div>
              </div>
              <div className="bg-space-800 rounded-lg p-3 border border-slate-700">
                <div className="text-xs font-black text-amber-400 mb-1">FAR FUTURE</div>
                <div className="text-xs text-slate-300">{pred.farFuture}</div>
              </div>
            </div>
          </div>

          <div className="text-white font-black text-sm mb-3">{pred.question}</div>

          {picked === null ? (
            <div className="space-y-2">
              {pred.options.map((opt, i) => (
                <motion.button key={i} onClick={() => pickAnswer(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-xl border border-slate-700 bg-space-900 font-bold text-white text-sm hover:border-orange-500/50 transition-colors">
                  {opt}
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${picked === pred.correct ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                {picked === pred.correct ? "Great thinking! " : `Key insight: "${pred.options[pred.correct]}." `}
                <span className="font-normal text-slate-300">{pred.explanation}</span>
              </div>
              <button onClick={next} className="w-full py-4 rounded-xl font-black text-white bg-orange-500 hover:bg-orange-400 btn-press transition-colors">
                {idx < PREDICTIONS.length - 1 ? "Next Forecast" : "See Results"} &rarr;
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
