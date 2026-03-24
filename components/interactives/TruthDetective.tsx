"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContentItem {
  type: string;
  content: string;
  details: string;
  isReal: boolean;
  clues: string[];
  explanation: string;
}

const ITEMS: ContentItem[] = [
  {
    type: "News Headline",
    content: "Scientists Discover New Species of Glowing Frog in Amazon Rainforest",
    details: "Published by 'Global Science Daily' — a site you've never heard of. No author name. No sources cited.",
    isReal: false,
    clues: ["Unknown publication", "No author", "No sources"],
    explanation: "Red flags: unknown publication, no author, no sources. Real science news links to peer-reviewed studies and names researchers. AI can generate convincing headlines for fake publications.",
  },
  {
    type: "Product Review",
    content: "This is absolutely the best product I have ever purchased. It changed my life completely. Five stars!",
    details: "Reviewer joined yesterday. This is their only review. The language is generic — could apply to any product.",
    isReal: false,
    clues: ["New account", "Only review", "Generic language"],
    explanation: "Fake reviews use vague, extreme language. Real reviews mention specific features and both pros and cons. AI can generate thousands of fake reviews in seconds.",
  },
  {
    type: "Social Media Post",
    content: "Just got back from hiking Mount Tamalpais. The fog rolling over the hills at sunset was incredible. My legs are destroyed but worth it!",
    details: "Posted by an account active for 3 years. Has photos from the trail. Friends commented with hiking tips.",
    isReal: true,
    clues: ["Established account", "Specific location details", "Natural social interaction"],
    explanation: "Specific details (Mount Tamalpais, fog, sunset), established account history, and natural friend interactions all suggest authentic content. AI-generated posts tend to be more generic.",
  },
  {
    type: "Email",
    content: "URGENT: Your account has been compromised! Click here immediately to verify your identity or your account will be deleted in 24 hours.",
    details: "From: security@bankk-alerts.com (note the double 'k'). Asks you to click a link urgently.",
    isReal: false,
    clues: ["Misspelled domain", "Urgency pressure", "Suspicious link"],
    explanation: "Classic phishing tactics: fake urgency, misspelled domains, and pressure to click. AI makes these scams more convincing by writing better English and personalizing messages.",
  },
  {
    type: "Celebrity Quote",
    content: "I believe that education is the most powerful weapon which you can use to change the world.",
    details: "Attributed to Nelson Mandela. Appears on multiple reputable websites and in his published speeches.",
    isReal: true,
    clues: ["Verified across sources", "In published speeches", "Consistent attribution"],
    explanation: "This is a real Mandela quote, verifiable across multiple reputable sources. Always cross-reference quotes — AI can generate convincing fake quotes attributed to real people.",
  },
  {
    type: "Image Description",
    content: "Photo of a politician shaking hands with a controversial figure at a private dinner.",
    details: "Posted by an anonymous account. No news outlet has covered this meeting. The shadows in the photo go in different directions.",
    isReal: false,
    clues: ["Anonymous source", "No corroboration", "Inconsistent shadows"],
    explanation: "AI-generated images often have subtle flaws: inconsistent lighting, weird shadows, extra fingers. But they're getting harder to spot — always check if real news outlets report the same event.",
  },
];

const STRATEGIES = [
  { name: "Check the Source", icon: "🔍", tip: "Who published this? Are they reputable? Do they have a track record?" },
  { name: "Look for Evidence", icon: "📋", tip: "Are there sources, data, or named experts? Or just claims?" },
  { name: "Cross-Reference", icon: "🔄", tip: "Do other reliable sources report the same thing?" },
  { name: "Check Your Emotions", icon: "💭", tip: "Content designed to make you angry or scared is often manipulative." },
  { name: "Reverse Image Search", icon: "🖼️", tip: "Upload suspicious images to see if they appear elsewhere or are AI-generated." },
];

export function TruthDetective({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"detect" | "strategies">("detect");
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [stratIdx, setStratIdx] = useState(0);
  const [done, setDone] = useState(false);

  function pickAnswer(isReal: boolean) {
    if (picked !== null) return;
    setPicked(isReal);
    if (isReal === ITEMS[idx].isReal) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    if (idx >= ITEMS.length - 1) {
      setPhase("strategies");
    } else {
      setIdx((i) => i + 1);
    }
  }

  if (done) {
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          {score >= ITEMS.length - 1 ? "🕵️" : "🔎"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{ITEMS.length}</div>
          <div className="text-slate-300 mt-2">
            {score >= ITEMS.length - 1 ? "Master detective! You can spot fakes with ease." : score >= ITEMS.length / 2 ? "Good instincts for spotting fakes!" : "Fakes are getting harder to spot — stay vigilant!"}
          </div>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/40 rounded-2xl p-4">
          <div className="font-black text-orange-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">AI makes fake content easier to create than ever. Your best defense: check sources, cross-reference, and think critically before you share.</p>
        </div>
      </div>
    );
  }

  if (phase === "strategies") {
    const strat = STRATEGIES[stratIdx];
    return (
      <div className="space-y-5">
        <div className="flex gap-1.5">
          {STRATEGIES.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < stratIdx ? "bg-orange-500" : i === stratIdx ? "bg-orange-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-orange-400 mb-1">YOUR DETECTION TOOLKIT</div>
          <div className="text-sm text-slate-400 font-bold mb-4">5 strategies to spot AI-generated fakes:</div>

          <motion.div key={stratIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-space-900 rounded-xl p-5 border border-slate-600 text-center mb-4">
            <div className="text-5xl mb-3">{strat.icon}</div>
            <div className="text-xl font-black text-white mb-2">{strat.name}</div>
            <div className="text-slate-300 text-sm">{strat.tip}</div>
          </motion.div>

          <button
            onClick={() => {
              if (stratIdx < STRATEGIES.length - 1) setStratIdx((s) => s + 1);
              else { setDone(true); onComplete(); }
            }}
            className="w-full py-4 rounded-xl font-black text-white bg-orange-500 hover:bg-orange-400 btn-press transition-colors"
          >
            {stratIdx < STRATEGIES.length - 1 ? "Next Strategy" : "See Results"} &rarr;
          </button>
        </div>
      </div>
    );
  }

  const item = ITEMS[idx];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {ITEMS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < idx ? "bg-orange-500" : i === idx ? "bg-orange-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs font-bold text-yellow-400">Score: {score}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-orange-400 mb-3">TRUTH DETECTIVE</div>

        <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-3">
            <div className="text-xs font-black text-slate-500 mb-2">{item.type.toUpperCase()}</div>
            <div className="text-white font-bold mb-3 italic">&quot;{item.content}&quot;</div>
            <div className="text-sm text-slate-400">{item.details}</div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {item.clues.map((clue, i) => (
                <span key={i} className="bg-space-800 rounded-lg px-2 py-1 text-xs text-slate-400 font-bold border border-slate-700">{clue}</span>
              ))}
            </div>
          </div>

          {picked === null ? (
            <div className="grid grid-cols-2 gap-3">
              <motion.button onClick={() => pickAnswer(true)} whileTap={{ scale: 0.95 }} className="py-5 rounded-xl border border-slate-700 bg-space-900 font-black text-white text-lg hover:border-green-500/50 transition-colors">
                Real
              </motion.button>
              <motion.button onClick={() => pickAnswer(false)} whileTap={{ scale: 0.95 }} className="py-5 rounded-xl border border-slate-700 bg-space-900 font-black text-white text-lg hover:border-red-500/50 transition-colors">
                Fake
              </motion.button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${picked === item.isReal ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                {picked === item.isReal ? "Correct! " : `It was ${item.isReal ? "real" : "fake"}. `}
                <span className="font-normal text-slate-300">{item.explanation}</span>
              </div>
              <button onClick={next} className="w-full py-4 rounded-xl font-black text-white bg-orange-500 hover:bg-orange-400 btn-press transition-colors">
                {idx < ITEMS.length - 1 ? "Next Content" : "Detection Strategies"} &rarr;
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
