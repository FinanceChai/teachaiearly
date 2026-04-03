"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PROJECT_NAMES = [
  "EcoBot", "StudyBuddy AI", "PetPal", "ArtSpark", "SafeWalk",
  "MoodTunes", "PlantDoctor", "GameGenius"
];

const PROBLEMS = [
  "Students struggle to stay focused while studying",
  "People don't know which plants are in their garden",
  "Kids feel bored with traditional learning methods",
  "People want to create art but don't know where to start",
  "It's hard to identify recycling vs trash items",
  "Pet owners can't tell if their pet is sick",
];

const AI_TOOLS = [
  { name: "Teachable Machine", icon: "🧠" },
  { name: "ChatGPT / Language AI", icon: "💬" },
  { name: "Image Recognition", icon: "👁️" },
  { name: "Sound AI", icon: "🔊" },
  { name: "Scratch + ML", icon: "🐱" },
];

const WORKED_WELL = [
  "The AI was really accurate at recognizing things",
  "My users found it easy and fun to use",
  "The design looked clean and professional",
  "I learned a ton about how AI works",
  "Testing with friends helped me find bugs",
  "The idea solves a real problem people have",
];

const IMPROVEMENTS = [
  "Make it work faster — the AI was a bit slow",
  "Add more features like sharing results",
  "Make the instructions clearer for new users",
  "Test with more people to find more bugs",
  "Make it work offline without internet",
  "Add support for more languages",
];

export function ProjectShowcase({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState<string | null>(null);
  const [customName, setCustomName] = useState("");
  const [problem, setProblem] = useState<string | null>(null);
  const [tool, setTool] = useState<number | null>(null);
  const [workedWell, setWorkedWell] = useState<string | null>(null);
  const [customWorkedWell, setCustomWorkedWell] = useState("");
  const [improvement, setImprovement] = useState<string | null>(null);
  const [customImprovement, setCustomImprovement] = useState("");
  const [done, setDone] = useState(false);

  const finalName = projectName === "__custom" ? customName : projectName;
  const finalWorkedWell = workedWell === "__custom" ? customWorkedWell : workedWell;
  const finalImprovement = improvement === "__custom" ? customImprovement : improvement;

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  // Showcase card
  if (step === 5) {
    const selectedTool = tool !== null ? AI_TOOLS[tool] : null;
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">🏆 Your Showcase Card</h2>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="bg-gradient-to-br from-lime-500/15 to-green-500/15 rounded-xl p-6 border-2 border-lime-500/50"
        >
          <div className="text-center mb-4">
            <span className="text-4xl">{selectedTool?.icon}</span>
            <h3 className="text-2xl font-bold text-lime-400 mt-1">{finalName}</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-space-900/60 rounded-lg p-3">
              <p className="text-lime-400 text-xs font-semibold">Problem it solves</p>
              <p className="text-slate-900 text-sm">{problem}</p>
            </div>
            <div className="bg-space-900/60 rounded-lg p-3">
              <p className="text-lime-400 text-xs font-semibold">AI tool used</p>
              <p className="text-slate-900 text-sm">{selectedTool?.icon} {selectedTool?.name}</p>
            </div>
            <div className="bg-space-900/60 rounded-lg p-3">
              <p className="text-lime-400 text-xs font-semibold">What worked well</p>
              <p className="text-slate-900 text-sm">✅ {finalWorkedWell}</p>
            </div>
            <div className="bg-space-900/60 rounded-lg p-3">
              <p className="text-lime-400 text-xs font-semibold">What I&apos;d improve</p>
              <p className="text-slate-900 text-sm">🔧 {finalImprovement}</p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-slate-400 text-xs">Built by a future AI developer ⭐</p>
          </div>
        </motion.div>

        <div className="bg-space-800 rounded-lg p-4 mt-4">
          <p className="text-lime-400 font-semibold mb-1">💡 Great job!</p>
          <p className="text-slate-600 text-sm">
            Being able to present your work clearly is a superpower! Every great project
            needs a good showcase — it helps others understand what you built and why it matters.
          </p>
        </div>

        {!done ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComplete}
            className="w-full mt-4 px-6 py-3 bg-lime-500 text-slate-900 rounded-lg font-bold"
          >
            Complete Showcase ✓
          </motion.button>
        ) : (
          <p className="text-center mt-4 text-lime-400 font-semibold">✓ Activity Complete!</p>
        )}
      </div>
    );
  }

  const steps = [
    {
      title: "Name Your Project",
      subtitle: "Pick a name or create your own!",
    },
    {
      title: "What Problem Does It Solve?",
      subtitle: "Every good project solves a real problem.",
    },
    {
      title: "Which AI Tool Did You Use?",
      subtitle: "Pick the AI tool that powers your project.",
    },
    {
      title: "What Worked Well?",
      subtitle: "Reflecting on success helps you grow!",
    },
    {
      title: "What Would You Improve?",
      subtitle: "Even the best projects have room to grow.",
    },
  ];

  const canContinue = () => {
    switch (step) {
      case 0: return finalName && finalName.trim().length > 0;
      case 1: return problem !== null;
      case 2: return tool !== null;
      case 3: return finalWorkedWell && finalWorkedWell.trim().length > 0;
      case 4: return finalImprovement && finalImprovement.trim().length > 0;
      default: return false;
    }
  };

  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-slate-900 mb-1">🏆 Project Showcase</h2>

      <div className="flex gap-1 mb-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full ${i <= step ? "bg-lime-500" : "bg-space-800"}`}
          />
        ))}
      </div>

      <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
        <h3 className="text-lg font-bold text-lime-400 mb-1">{steps[step].title}</h3>
        <p className="text-slate-600 text-sm mb-4">{steps[step].subtitle}</p>

        {step === 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {PROJECT_NAMES.map((name) => (
                <button
                  key={name}
                  onClick={() => { setProjectName(name); setCustomName(""); }}
                  className={`p-2 rounded-lg border text-sm text-left ${
                    projectName === name
                      ? "bg-lime-500/20 border-lime-500 text-slate-900"
                      : "bg-space-800 border-slate-200 text-slate-600 hover:border-slate-500"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Or type your own name..."
                value={customName}
                onChange={(e) => { setCustomName(e.target.value); setProjectName("__custom"); }}
                className="flex-1 bg-space-800 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:border-lime-500 outline-none"
                maxLength={30}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-2">
            {PROBLEMS.map((p) => (
              <button
                key={p}
                onClick={() => setProblem(p)}
                className={`w-full p-2 rounded-lg border text-sm text-left ${
                  problem === p
                    ? "bg-lime-500/20 border-lime-500 text-slate-900"
                    : "bg-space-800 border-slate-200 text-slate-600 hover:border-slate-500"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            {AI_TOOLS.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setTool(i)}
                className={`w-full p-3 rounded-lg border text-left flex items-center gap-3 ${
                  tool === i
                    ? "bg-lime-500/20 border-lime-500"
                    : "bg-space-800 border-slate-200 hover:border-slate-500"
                }`}
              >
                <span className="text-2xl">{t.icon}</span>
                <span className="text-slate-900 font-semibold">{t.name}</span>
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            {WORKED_WELL.map((w) => (
              <button
                key={w}
                onClick={() => { setWorkedWell(w); setCustomWorkedWell(""); }}
                className={`w-full p-2 rounded-lg border text-sm text-left ${
                  workedWell === w
                    ? "bg-lime-500/20 border-lime-500 text-slate-900"
                    : "bg-space-800 border-slate-200 text-slate-600 hover:border-slate-500"
                }`}
              >
                {w}
              </button>
            ))}
            <input
              type="text"
              placeholder="Or type your own..."
              value={customWorkedWell}
              onChange={(e) => { setCustomWorkedWell(e.target.value); setWorkedWell("__custom"); }}
              className="w-full bg-space-800 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:border-lime-500 outline-none"
              maxLength={100}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-2">
            {IMPROVEMENTS.map((imp) => (
              <button
                key={imp}
                onClick={() => { setImprovement(imp); setCustomImprovement(""); }}
                className={`w-full p-2 rounded-lg border text-sm text-left ${
                  improvement === imp
                    ? "bg-lime-500/20 border-lime-500 text-slate-900"
                    : "bg-space-800 border-slate-200 text-slate-600 hover:border-slate-500"
                }`}
              >
                {imp}
              </button>
            ))}
            <input
              type="text"
              placeholder="Or type your own..."
              value={customImprovement}
              onChange={(e) => { setCustomImprovement(e.target.value); setImprovement("__custom"); }}
              className="w-full bg-space-800 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:border-lime-500 outline-none"
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
            className="w-full mt-4 px-5 py-2 bg-lime-500 text-slate-900 rounded-lg font-bold"
          >
            {step < 4 ? "Next Step →" : "Generate Showcase Card →"}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
