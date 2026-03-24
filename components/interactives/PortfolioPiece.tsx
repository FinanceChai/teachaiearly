"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CATEGORIES = [
  { name: "Image AI", icon: "👁️", color: "from-purple-500/20 to-pink-500/20" },
  { name: "Language AI", icon: "💬", color: "from-blue-500/20 to-cyan-500/20" },
  { name: "Sound AI", icon: "🔊", color: "from-green-500/20 to-lime-500/20" },
  { name: "Game AI", icon: "🎮", color: "from-orange-500/20 to-yellow-500/20" },
  { name: "Other", icon: "✨", color: "from-slate-500/20 to-slate-400/20" },
];

const TOOLS = [
  "Teachable Machine", "Scratch + ML", "ChatGPT", "Image Generator",
  "Music AI", "Python", "Blockly", "Voice Recognition",
];

const DESCRIPTIONS = [
  "An app that recognizes different objects using your camera",
  "A chatbot that helps with homework questions",
  "A game that adapts to how you play",
  "A music creator that matches your mood",
  "A tool that identifies plants from photos",
  "A voice-controlled adventure game",
  "An AI art generator with style mixing",
  "A recycling sorter that uses image recognition",
];

const LEARNINGS = [
  "AI needs lots of good training data to work well",
  "Testing with real users always reveals surprises",
  "Starting small (MVP) is better than trying to do everything",
  "The hardest part was figuring out what to build",
  "AI isn't magic — it's patterns and math under the hood",
  "Debugging is frustrating but teaches you the most",
  "Getting feedback early saves time later",
  "Design matters as much as the technology",
];

export function PortfolioPiece({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState<string | null>(null);
  const [customDesc, setCustomDesc] = useState("");
  const [category, setCategory] = useState<number | null>(null);
  const [selectedTools, setSelectedTools] = useState<boolean[]>(TOOLS.map(() => false));
  const [difficulty, setDifficulty] = useState(0);
  const [learning, setLearning] = useState<string | null>(null);
  const [customLearning, setCustomLearning] = useState("");
  const [done, setDone] = useState(false);

  const finalDesc = description === "__custom" ? customDesc : description;
  const finalLearning = learning === "__custom" ? customLearning : learning;
  const toolCount = selectedTools.filter(Boolean).length;

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  // Final portfolio card
  if (step === 6) {
    const cat = category !== null ? CATEGORIES[category] : null;
    const usedTools = TOOLS.filter((_, i) => selectedTools[i]);

    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-700 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">📁 Portfolio Piece</h2>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
          className={`bg-gradient-to-br ${cat?.color || ""} rounded-xl border-2 border-lime-500/50 overflow-hidden`}
        >
          {/* Header */}
          <div className="bg-space-900/40 p-4 text-center border-b border-lime-500/20">
            <span className="text-4xl">{cat?.icon}</span>
            <h3 className="text-2xl font-bold text-lime-400 mt-1">{projectName}</h3>
            <p className="text-slate-300 text-sm mt-1">{finalDesc}</p>
          </div>

          {/* Details */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lime-400 text-xs font-semibold">Category</p>
                <p className="text-white text-sm">{cat?.icon} {cat?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-lime-400 text-xs font-semibold">Difficulty</p>
                <p className="text-white text-sm">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={s <= difficulty ? "text-lime-400" : "text-slate-600"}>
                      ⭐
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div>
              <p className="text-lime-400 text-xs font-semibold mb-1">Tools Used</p>
              <div className="flex flex-wrap gap-1">
                {usedTools.map((t) => (
                  <span key={t} className="bg-lime-500/20 text-lime-300 px-2 py-0.5 rounded text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-space-900/60 rounded-lg p-3">
              <p className="text-lime-400 text-xs font-semibold">💡 Biggest Learning</p>
              <p className="text-white text-sm mt-1">{finalLearning}</p>
            </div>
          </div>

          <div className="bg-space-900/40 p-2 text-center border-t border-lime-500/20">
            <p className="text-slate-400 text-xs">AI Builder Portfolio ⭐</p>
          </div>
        </motion.div>

        <div className="bg-space-800 rounded-lg p-4 mt-4">
          <p className="text-lime-400 font-semibold mb-1">🎓 Challenge Complete!</p>
          <p className="text-slate-300 text-sm">
            You just created a professional portfolio piece! Real developers and designers
            build portfolios to showcase their work. Each project tells a story about what
            you can do and what you&apos;ve learned. Keep building — every project makes your
            portfolio stronger!
          </p>
        </div>

        {!done ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComplete}
            className="w-full mt-4 px-6 py-3 bg-lime-500 text-white rounded-lg font-bold"
          >
            Complete Challenge ✓
          </motion.button>
        ) : (
          <p className="text-center mt-4 text-lime-400 font-semibold">✓ Activity Complete!</p>
        )}
      </div>
    );
  }

  const stepConfigs = [
    { title: "Project Name", subtitle: "Give your project a memorable name!" },
    { title: "One-Line Description", subtitle: "Describe your project in one sentence." },
    { title: "Pick a Category", subtitle: "What type of AI does your project use?" },
    { title: "Tools Used", subtitle: "Pick 2-3 tools you used to build it." },
    { title: "Rate Difficulty", subtitle: "How hard was this project?" },
    { title: "Biggest Learning", subtitle: "What's the most important thing you learned?" },
  ];

  const canContinue = () => {
    switch (step) {
      case 0: return projectName.trim().length > 0;
      case 1: return finalDesc && finalDesc.trim().length > 0;
      case 2: return category !== null;
      case 3: return toolCount >= 2 && toolCount <= 3;
      case 4: return difficulty > 0;
      case 5: return finalLearning && finalLearning.trim().length > 0;
      default: return false;
    }
  };

  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-700 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-xl font-bold text-white">📁 Portfolio Piece Builder</h2>
        <span className="bg-lime-500/20 text-lime-400 text-xs px-2 py-0.5 rounded font-semibold">CHALLENGE</span>
      </div>

      <div className="flex gap-1 mb-4">
        {stepConfigs.map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full ${i <= step ? "bg-lime-500" : "bg-space-800"}`} />
        ))}
      </div>

      <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
        <h3 className="text-lg font-bold text-lime-400 mb-1">{stepConfigs[step].title}</h3>
        <p className="text-slate-300 text-sm mb-4">{stepConfigs[step].subtitle}</p>

        {step === 0 && (
          <input
            type="text"
            placeholder="Type your project name..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full bg-space-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-lime-500 outline-none"
            maxLength={30}
          />
        )}

        {step === 1 && (
          <div className="space-y-2">
            {DESCRIPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => { setDescription(d); setCustomDesc(""); }}
                className={`w-full p-2 rounded-lg border text-sm text-left ${
                  description === d ? "bg-lime-500/20 border-lime-500 text-white" : "bg-space-800 border-slate-700 text-slate-300 hover:border-slate-500"
                }`}
              >
                {d}
              </button>
            ))}
            <input
              type="text"
              placeholder="Or write your own..."
              value={customDesc}
              onChange={(e) => { setCustomDesc(e.target.value); setDescription("__custom"); }}
              className="w-full bg-space-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-lime-500 outline-none"
              maxLength={80}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setCategory(i)}
                className={`w-full p-3 rounded-lg border text-left flex items-center gap-3 ${
                  category === i ? "bg-lime-500/20 border-lime-500" : "bg-space-800 border-slate-700 hover:border-slate-500"
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-white font-semibold">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-sm text-slate-400 mb-2">Selected: {toolCount}/8 (pick 2-3)</p>
            <div className="grid grid-cols-2 gap-2">
              {TOOLS.map((t, i) => (
                <button
                  key={t}
                  onClick={() => {
                    const next = [...selectedTools];
                    next[i] = !next[i];
                    setSelectedTools(next);
                  }}
                  className={`p-2 rounded-lg border text-sm text-left ${
                    selectedTools[i] ? "bg-lime-500/20 border-lime-500 text-white" : "bg-space-800 border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {toolCount > 3 && (
              <p className="text-yellow-400 text-xs mt-2">Pick at most 3 tools to keep it focused.</p>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDifficulty(level)}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-xl ${
                  difficulty >= level ? "bg-lime-500/20 border-lime-500" : "bg-space-800 border-slate-700"
                }`}
              >
                ⭐
              </motion.button>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-2">
            {LEARNINGS.map((l) => (
              <button
                key={l}
                onClick={() => { setLearning(l); setCustomLearning(""); }}
                className={`w-full p-2 rounded-lg border text-sm text-left ${
                  learning === l ? "bg-lime-500/20 border-lime-500 text-white" : "bg-space-800 border-slate-700 text-slate-300 hover:border-slate-500"
                }`}
              >
                {l}
              </button>
            ))}
            <input
              type="text"
              placeholder="Or write your own..."
              value={customLearning}
              onChange={(e) => { setCustomLearning(e.target.value); setLearning("__custom"); }}
              className="w-full bg-space-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-lime-500 outline-none"
              maxLength={100}
            />
          </div>
        )}

        {canContinue() && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep(step + 1)}
            className="w-full mt-4 px-5 py-2 bg-lime-500 text-white rounded-lg font-bold"
          >
            {step < 5 ? "Next Step →" : "Generate Portfolio Card →"}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
