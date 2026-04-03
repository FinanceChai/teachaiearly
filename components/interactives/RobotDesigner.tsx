"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROBLEMS = [
  { id: "ocean", label: "Ocean Cleanup", emoji: "🌊", desc: "Remove plastic and pollution from the ocean" },
  { id: "elderly", label: "Elderly Care", emoji: "👴", desc: "Help elderly people live independently at home" },
  { id: "mars", label: "Mars Exploration", emoji: "🔴", desc: "Explore and build on the surface of Mars" },
  { id: "rescue", label: "Disaster Rescue", emoji: "🆘", desc: "Find and rescue people after earthquakes or floods" },
];

const BODY_TYPES = [
  { id: "wheeled", label: "Wheeled", emoji: "🛞", desc: "Fast on flat ground, energy efficient" },
  { id: "legged", label: "Legged", emoji: "🦿", desc: "Can climb stairs and rough terrain" },
  { id: "flying", label: "Flying", emoji: "🚁", desc: "Can reach anywhere from above" },
  { id: "underwater", label: "Underwater", emoji: "🤿", desc: "Can dive deep and swim through water" },
];

const AI_CAPABILITIES = [
  { id: "vision", label: "Computer Vision", emoji: "👁️", desc: "See and recognize objects, people, and obstacles" },
  { id: "speech", label: "Speech & Language", emoji: "🗣️", desc: "Talk to humans and understand commands" },
  { id: "learning", label: "Self-Learning", emoji: "📚", desc: "Improve from experience without reprogramming" },
  { id: "navigation", label: "Smart Navigation", emoji: "🗺️", desc: "Find the best path and avoid obstacles" },
  { id: "manipulation", label: "Object Handling", emoji: "🤲", desc: "Pick up, move, and carefully handle objects" },
  { id: "communication", label: "Team Communication", emoji: "📡", desc: "Coordinate with other robots as a team" },
];

export function RobotDesigner({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState<string | null>(null);
  const [bodyType, setBodyType] = useState<string | null>(null);
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [robotName, setRobotName] = useState("");
  const [finished, setFinished] = useState(false);

  const toggleCapability = (id: string) => {
    setCapabilities((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const selectedProblem = PROBLEMS.find((p) => p.id === problem);
  const selectedBody = BODY_TYPES.find((b) => b.id === bodyType);
  const selectedCaps = AI_CAPABILITIES.filter((c) => capabilities.includes(c.id));

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-space-800 rounded-2xl p-6 border border-slate-200"
      >
        <div className="text-center mb-4">
          <div className="text-5xl mb-2">🤖</div>
          <h2 className="text-2xl font-bold text-slate-900">Robot Blueprint</h2>
        </div>

        <div className="bg-space-900 rounded-xl p-5 mb-5 border border-zinc-400/30">
          <h3 className="text-2xl font-bold text-zinc-400 text-center mb-4">{robotName || "Unnamed Robot"}</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-space-800 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">MISSION</div>
              <div className="text-lg">{selectedProblem?.emoji} {selectedProblem?.label}</div>
              <div className="text-xs text-slate-600 mt-1">{selectedProblem?.desc}</div>
            </div>
            <div className="bg-space-800 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">BODY TYPE</div>
              <div className="text-lg">{selectedBody?.emoji} {selectedBody?.label}</div>
              <div className="text-xs text-slate-600 mt-1">{selectedBody?.desc}</div>
            </div>
          </div>

          <div className="bg-space-800 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-2">AI CAPABILITIES</div>
            <div className="flex flex-wrap gap-2">
              {selectedCaps.map((cap) => (
                <span key={cap.id} className="px-3 py-1 bg-zinc-400/20 text-zinc-400 rounded-full text-sm font-medium">
                  {cap.emoji} {cap.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-center text-sm mb-5">
          Your robot is ready to tackle {selectedProblem?.label.toLowerCase()}! With its {selectedBody?.label.toLowerCase()} body
          and {selectedCaps.length} AI powers, it&apos;s a {selectedProblem?.label.toLowerCase()} machine!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="w-full py-3 bg-zinc-400 text-space-900 font-bold rounded-xl"
        >
          Continue
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="bg-space-800 rounded-2xl p-6 border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-900">🤖 Robot Designer</h2>
        <span className="text-zinc-400 text-sm font-mono">Step {step + 1}/4</span>
      </div>

      <div className="w-full bg-space-900 rounded-full h-2 mb-5">
        <motion.div
          className="bg-zinc-400 h-2 rounded-full"
          animate={{ width: `${((step + 1) / 4) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <h3 className="text-slate-900 font-bold mb-3">Pick a Problem to Solve</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {PROBLEMS.map((p) => (
                <motion.button
                  key={p.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setProblem(p.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-colors ${
                    problem === p.id ? "border-zinc-400 bg-zinc-400/10" : "border-slate-200 bg-space-900 hover:border-slate-500"
                  }`}
                >
                  <div className="text-3xl mb-1">{p.emoji}</div>
                  <div className="text-slate-900 font-bold text-sm">{p.label}</div>
                  <div className="text-slate-600 text-xs mt-1">{p.desc}</div>
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => problem && setStep(1)}
              disabled={!problem}
              className={`w-full py-3 font-bold rounded-xl ${problem ? "bg-zinc-400 text-space-900" : "bg-slate-700 text-slate-400 cursor-not-allowed"}`}
            >
              Next: Choose Body Type →
            </motion.button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <h3 className="text-slate-900 font-bold mb-3">Choose Robot Body Type</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {BODY_TYPES.map((b) => (
                <motion.button
                  key={b.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setBodyType(b.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-colors ${
                    bodyType === b.id ? "border-zinc-400 bg-zinc-400/10" : "border-slate-200 bg-space-900 hover:border-slate-500"
                  }`}
                >
                  <div className="text-3xl mb-1">{b.emoji}</div>
                  <div className="text-slate-900 font-bold text-sm">{b.label}</div>
                  <div className="text-slate-600 text-xs mt-1">{b.desc}</div>
                </motion.button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="py-3 px-4 text-slate-600 hover:text-sky-600">← Back</button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => bodyType && setStep(2)}
                disabled={!bodyType}
                className={`flex-1 py-3 font-bold rounded-xl ${bodyType ? "bg-zinc-400 text-space-900" : "bg-slate-700 text-slate-400 cursor-not-allowed"}`}
              >
                Next: AI Capabilities →
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <h3 className="text-slate-900 font-bold mb-1">Pick 3 AI Capabilities</h3>
            <p className="text-slate-600 text-sm mb-3">Selected: {capabilities.length}/3</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {AI_CAPABILITIES.map((c) => (
                <motion.button
                  key={c.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleCapability(c.id)}
                  className={`p-3 rounded-xl border-2 text-left transition-colors ${
                    capabilities.includes(c.id)
                      ? "border-zinc-400 bg-zinc-400/10"
                      : capabilities.length >= 3
                      ? "border-slate-200 bg-space-900 opacity-50 cursor-not-allowed"
                      : "border-slate-200 bg-space-900 hover:border-slate-500"
                  }`}
                >
                  <div className="text-xl mb-1">{c.emoji}</div>
                  <div className="text-slate-900 font-bold text-xs">{c.label}</div>
                  <div className="text-slate-600 text-xs mt-1">{c.desc}</div>
                </motion.button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="py-3 px-4 text-slate-600 hover:text-sky-600">← Back</button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => capabilities.length === 3 && setStep(3)}
                disabled={capabilities.length !== 3}
                className={`flex-1 py-3 font-bold rounded-xl ${capabilities.length === 3 ? "bg-zinc-400 text-space-900" : "bg-slate-700 text-slate-400 cursor-not-allowed"}`}
              >
                Next: Name Your Robot →
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <h3 className="text-slate-900 font-bold mb-3">Name Your Robot!</h3>
            <div className="bg-space-900 rounded-xl p-5 mb-4 text-center">
              <div className="text-6xl mb-4">🤖</div>
              <input
                type="text"
                value={robotName}
                onChange={(e) => setRobotName(e.target.value)}
                placeholder="Enter a cool robot name..."
                maxLength={30}
                className="w-full bg-space-800 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-center text-xl font-bold placeholder:text-slate-400 focus:border-zinc-400 focus:outline-none"
              />
              <p className="text-slate-400 text-xs mt-2">Make it memorable!</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="py-3 px-4 text-slate-600 hover:text-sky-600">← Back</button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => robotName.trim() && setFinished(true)}
                disabled={!robotName.trim()}
                className={`flex-1 py-3 font-bold rounded-xl ${robotName.trim() ? "bg-zinc-400 text-space-900" : "bg-slate-700 text-slate-400 cursor-not-allowed"}`}
              >
                Build My Robot! 🚀
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
