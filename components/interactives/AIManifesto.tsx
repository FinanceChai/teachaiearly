"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PRINCIPLES = [
  { name: "Transparency", icon: "🔍", description: "AI should always be honest about what it is and how it works" },
  { name: "Fairness", icon: "⚖️", description: "AI should treat all people equally, regardless of who they are" },
  { name: "Privacy", icon: "🔒", description: "People should control their own data and know how it's used" },
  { name: "Safety", icon: "🛡️", description: "AI should be tested thoroughly before being used on real people" },
  { name: "Accessibility", icon: "🌍", description: "Everyone should be able to benefit from AI, not just the wealthy" },
  { name: "Accountability", icon: "📋", description: "Someone should always be responsible when AI causes harm" },
  { name: "Human Control", icon: "🙋", description: "Humans should always have the final say in important decisions" },
  { name: "Creativity", icon: "🎨", description: "AI should enhance human creativity, not replace it" },
];

const BUILD_OPTIONS = [
  "An AI tool that helps kids learn to code",
  "An app that detects bias in news articles",
  "A game that teaches AI concepts through play",
  "A tool that makes the internet accessible for everyone",
  "An AI that helps protect the environment",
  "A privacy checker that shows what apps do with your data",
  "An AI art tool that credits original artists",
  "A chatbot that helps kids with mental health",
];

const PROMISES = [
  "I'll always think critically before trusting AI output",
  "I'll speak up when I see AI being used unfairly",
  "I'll protect my privacy and help others protect theirs",
  "I'll use AI as a tool, not a replacement for my own thinking",
  "I'll consider how AI affects people who are different from me",
  "I'll keep learning about AI so I can make informed choices",
  "I'll create things with AI that help, not harm",
  "I'll share what I know about AI with friends and family",
];

const TITLES = [
  "My AI Promise",
  "The Future Builder's Code",
  "My Digital Citizen Pledge",
  "AI for Everyone Manifesto",
  "The Responsible AI Creed",
  "Young Builder's AI Oath",
  "My Tech Ethics Charter",
  "The Human-First AI Pledge",
];

export function AIManifesto({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [selectedPrinciples, setSelectedPrinciples] = useState<boolean[]>(PRINCIPLES.map(() => false));
  const [buildChoice, setBuildChoice] = useState<string | null>(null);
  const [customBuild, setCustomBuild] = useState("");
  const [promise, setPromise] = useState<string | null>(null);
  const [customPromise, setCustomPromise] = useState("");
  const [title, setTitle] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const principleCount = selectedPrinciples.filter(Boolean).length;
  const finalBuild = buildChoice === "__custom" ? customBuild : buildChoice;
  const finalPromise = promise === "__custom" ? customPromise : promise;
  const chosenPrinciples = PRINCIPLES.filter((_, i) => selectedPrinciples[i]);

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  const canContinue = () => {
    switch (step) {
      case 0: return principleCount === 3;
      case 1: return finalBuild && finalBuild.trim().length > 0;
      case 2: return finalPromise && finalPromise.trim().length > 0;
      case 3: return title !== null;
      default: return false;
    }
  };

  // Final manifesto
  if (step === 4) {
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">📜 Your AI Manifesto</h2>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
          className="bg-gradient-to-br from-amber-500/10 to-yellow-600/10 rounded-xl border-2 border-amber-500/50 overflow-hidden"
        >
          {/* Title banner */}
          <div className="bg-amber-500/20 p-4 text-center border-b border-amber-500/20">
            <p className="text-amber-400 text-xs font-semibold">📜 MANIFESTO</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{title}</h3>
          </div>

          <div className="p-5 space-y-4">
            {/* Principles */}
            <div>
              <p className="text-amber-400 text-xs font-semibold mb-2">
                I BELIEVE IN THESE PRINCIPLES:
              </p>
              <div className="space-y-2">
                {chosenPrinciples.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-center gap-2 bg-space-900/60 rounded-lg p-2"
                  >
                    <span className="text-lg">{p.icon}</span>
                    <div>
                      <p className="text-slate-900 text-sm font-semibold">{p.name}</p>
                      <p className="text-slate-400 text-xs">{p.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Build commitment */}
            <div className="bg-space-900/60 rounded-lg p-3">
              <p className="text-amber-400 text-xs font-semibold">I WILL BUILD OR CONTRIBUTE:</p>
              <p className="text-slate-900 text-sm mt-1">🚀 {finalBuild}</p>
            </div>

            {/* Promise */}
            <div className="bg-space-900/60 rounded-lg p-3">
              <p className="text-amber-400 text-xs font-semibold">MY PROMISE:</p>
              <p className="text-slate-900 text-sm mt-1">✋ {finalPromise}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-amber-500/10 p-3 text-center border-t border-amber-500/20">
            <p className="text-amber-400/80 text-xs">
              Signed by a future AI leader • {new Date().toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        <div className="bg-space-800 rounded-lg p-4 mt-4">
          <p className="text-amber-400 font-semibold mb-1">🎓 Challenge Complete!</p>
          <p className="text-slate-600 text-sm">
            You&apos;ve created your own AI Manifesto — a set of principles and promises that
            guide how you&apos;ll interact with AI. The world&apos;s biggest tech companies have
            manifestos like this too. The difference? Yours comes from a place of genuine
            care about the future. Keep these principles close!
          </p>
        </div>

        {!done ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComplete}
            className="w-full mt-4 px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-bold"
          >
            Complete Manifesto ✓
          </motion.button>
        ) : (
          <p className="text-center mt-4 text-amber-400 font-semibold">✓ Activity Complete!</p>
        )}
      </div>
    );
  }

  const stepConfigs = [
    { title: "Pick 3 AI Principles", subtitle: "Choose the 3 values you believe are most important for AI." },
    { title: "What Will You Build?", subtitle: "Pick or write one thing you'll build or contribute to the AI world." },
    { title: "Make a Promise", subtitle: "What's one promise you'll make about using AI responsibly?" },
    { title: "Name Your Manifesto", subtitle: "Every great manifesto needs a powerful title!" },
  ];

  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-xl font-bold text-slate-900">📜 AI Manifesto Builder</h2>
        <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded font-semibold">CHALLENGE</span>
      </div>

      <div className="flex gap-1 mb-4">
        {stepConfigs.map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full ${i <= step ? "bg-amber-500" : "bg-space-800"}`} />
        ))}
      </div>

      <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
        <h3 className="text-lg font-bold text-amber-400 mb-1">{stepConfigs[step].title}</h3>
        <p className="text-slate-600 text-sm mb-4">{stepConfigs[step].subtitle}</p>

        {step === 0 && (
          <div>
            <p className="text-sm text-slate-400 mb-2">Selected: {principleCount}/3</p>
            <div className="space-y-2">
              {PRINCIPLES.map((p, i) => (
                <motion.button
                  key={p.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    const next = [...selectedPrinciples];
                    if (next[i]) {
                      next[i] = false;
                    } else if (principleCount < 3) {
                      next[i] = true;
                    }
                    setSelectedPrinciples(next);
                  }}
                  className={`w-full p-3 rounded-lg border text-left flex items-center gap-3 ${
                    selectedPrinciples[i]
                      ? "bg-amber-500/20 border-amber-500"
                      : principleCount >= 3
                      ? "bg-space-800 border-slate-200 opacity-50"
                      : "bg-space-800 border-slate-200 hover:border-slate-500"
                  }`}
                >
                  <span className="text-xl">{p.icon}</span>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">{p.name}</p>
                    <p className="text-slate-400 text-xs">{p.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-1.5">
            {BUILD_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => { setBuildChoice(opt); setCustomBuild(""); }}
                className={`w-full p-2 rounded-lg border text-sm text-left ${
                  buildChoice === opt ? "bg-amber-500/20 border-amber-500 text-slate-900" : "bg-space-800 border-slate-200 text-slate-600 hover:border-slate-500"
                }`}
              >
                {opt}
              </button>
            ))}
            <input
              type="text"
              placeholder="Or write your own..."
              value={customBuild}
              onChange={(e) => { setCustomBuild(e.target.value); setBuildChoice("__custom"); }}
              className="w-full bg-space-800 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:border-amber-500 outline-none"
              maxLength={100}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-1.5">
            {PROMISES.map((p) => (
              <button
                key={p}
                onClick={() => { setPromise(p); setCustomPromise(""); }}
                className={`w-full p-2 rounded-lg border text-sm text-left ${
                  promise === p ? "bg-amber-500/20 border-amber-500 text-slate-900" : "bg-space-800 border-slate-200 text-slate-600 hover:border-slate-500"
                }`}
              >
                {p}
              </button>
            ))}
            <input
              type="text"
              placeholder="Or write your own..."
              value={customPromise}
              onChange={(e) => { setCustomPromise(e.target.value); setPromise("__custom"); }}
              className="w-full bg-space-800 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:border-amber-500 outline-none"
              maxLength={100}
            />
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-2 gap-2">
            {TITLES.map((t) => (
              <motion.button
                key={t}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setTitle(t)}
                className={`p-3 rounded-lg border text-center ${
                  title === t ? "bg-amber-500/20 border-amber-500" : "bg-space-800 border-slate-200 hover:border-slate-500"
                }`}
              >
                <p className="text-slate-900 text-sm font-semibold">{t}</p>
              </motion.button>
            ))}
          </div>
        )}

        {canContinue() && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep(step + 1)}
            className="w-full mt-4 px-5 py-2 bg-amber-500 text-slate-900 rounded-lg font-bold"
          >
            {step < 3 ? "Next Step →" : "Generate Manifesto →"}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
