"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Genre {
  name: string;
  icon: string;
  description: string;
}

interface AIFeature {
  name: string;
  icon: string;
  description: string;
  parameters: { name: string; low: string; high: string }[];
}

const GENRES: Genre[] = [
  { name: "Platformer", icon: "🏃", description: "Jump, run, and dodge through levels" },
  { name: "Puzzle", icon: "🧩", description: "Solve brain-teasing challenges" },
  { name: "RPG", icon: "⚔️", description: "Level up, explore, and battle" },
  { name: "Racing", icon: "🏎️", description: "Speed, drifts, and competition" },
];

const AI_FEATURES: AIFeature[] = [
  {
    name: "Adaptive NPCs",
    icon: "🧠",
    description: "NPCs that learn from player behavior and adapt their strategies",
    parameters: [
      { name: "Learning Speed", low: "Slow learner", high: "Instant adapter" },
      { name: "Aggression", low: "Peaceful", high: "Relentless" },
      { name: "Memory", low: "Forgetful", high: "Never forgets" },
    ],
  },
  {
    name: "Procedural Levels",
    icon: "🗺️",
    description: "AI generates unique levels every time you play",
    parameters: [
      { name: "Randomness", low: "Predictable", high: "Chaotic" },
      { name: "Complexity", low: "Simple paths", high: "Maze-like" },
      { name: "Theme Variety", low: "Consistent", high: "Wild mixing" },
    ],
  },
  {
    name: "Dynamic Difficulty",
    icon: "📈",
    description: "The game adjusts its difficulty to match your skill in real-time",
    parameters: [
      { name: "Sensitivity", low: "Gradual shifts", high: "Instant response" },
      { name: "Range", low: "Slight tweaks", high: "Huge swings" },
      { name: "Transparency", low: "Hidden", high: "Shows adjustments" },
    ],
  },
  {
    name: "AI Teammate",
    icon: "🤝",
    description: "An AI companion that helps you and reacts to your playstyle",
    parameters: [
      { name: "Independence", low: "Follows orders", high: "Acts on its own" },
      { name: "Skill Level", low: "Beginner helper", high: "Expert partner" },
      { name: "Personality", low: "Quiet and serious", high: "Chatty and fun" },
    ],
  },
];

const IMPROVEMENT_OPTIONS = [
  "Makes every playthrough feel unique and fresh",
  "Keeps players challenged without being frustrating",
  "Creates emotional connection with game characters",
  "Saves development time by generating content automatically",
  "Personalizes the experience for each player",
  "Makes the game more accessible to different skill levels",
];

type Step = 1 | 2 | 3 | 4 | 5;

export function GameDesignerChallenge({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [aiFeature, setAIFeature] = useState<AIFeature | null>(null);
  const [params, setParams] = useState<number[]>([3, 3, 3]);
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);
  const [freeText, setFreeText] = useState("");
  const [published, setPublished] = useState(false);

  function handleParam(idx: number, val: number) {
    setParams((p) => {
      const np = [...p];
      np[idx] = val;
      return np;
    });
  }

  function toggleImprovement(imp: string) {
    setSelectedImprovements((si) =>
      si.includes(imp) ? si.filter((s) => s !== imp) : [...si, imp]
    );
  }

  if (published) {
    return (
      <div className="bg-space-800 rounded-xl border border-slate-700 p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🎮</div>
            <h3 className="text-2xl font-bold text-white mb-1">Game Published!</h3>
            <p className="text-slate-300 text-sm">Here is your AI-powered game concept:</p>
          </div>

          <div className="bg-space-900 rounded-lg p-5 border border-red-500/30 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{genre!.icon}</span>
              <div>
                <h4 className="text-white font-bold text-lg">{genre!.name} Game</h4>
                <p className="text-red-400 text-sm">featuring {aiFeature!.name} {aiFeature!.icon}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {aiFeature!.parameters.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs w-28">{p.name}:</span>
                  <div className="flex-1 bg-space-800 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(params[i] / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-slate-400 text-xs w-24 text-right">
                    {params[i] <= 2 ? p.low : params[i] >= 4 ? p.high : "Balanced"}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-700 pt-3">
              <p className="text-slate-300 text-xs font-semibold mb-1">How AI improves this game:</p>
              <ul className="text-slate-400 text-xs space-y-1">
                {selectedImprovements.map((imp, i) => (
                  <li key={i}>• {imp}</li>
                ))}
              </ul>
              {freeText && (
                <p className="text-slate-400 text-xs mt-2 italic">&quot;{freeText}&quot;</p>
              )}
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold transition-colors"
          >
            Complete Challenge
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-space-800 rounded-xl border border-slate-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">🎮 Game Designer Challenge</h3>
        <span className="text-sm text-red-400 font-semibold">Step {step}/5</span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 mb-6">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition-colors ${
              s <= step ? "bg-red-500" : "bg-slate-700"
            }`}
          />
        ))}
      </div>

      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        {/* Step 1: Pick Genre */}
        {step === 1 && (
          <div>
            <p className="text-white font-semibold mb-3">Step 1: Pick a game genre</p>
            <div className="grid grid-cols-2 gap-3">
              {GENRES.map((g) => (
                <motion.button
                  key={g.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setGenre(g);
                    setStep(2);
                  }}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    genre?.name === g.name
                      ? "bg-red-500/20 border-red-500"
                      : "bg-space-900 border-slate-700 hover:border-red-500"
                  }`}
                >
                  <span className="text-2xl">{g.icon}</span>
                  <p className="text-white font-semibold text-sm mt-1">{g.name}</p>
                  <p className="text-slate-400 text-xs">{g.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose AI Feature */}
        {step === 2 && (
          <div>
            <p className="text-white font-semibold mb-1">Step 2: Choose an AI feature for your {genre!.name}</p>
            <p className="text-slate-400 text-xs mb-3">What kind of AI will power your game?</p>
            <div className="space-y-2">
              {AI_FEATURES.map((f) => (
                <motion.button
                  key={f.name}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => {
                    setAIFeature(f);
                    setStep(3);
                  }}
                  className="w-full text-left p-4 rounded-lg border bg-space-900 border-slate-700 hover:border-red-500 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{f.icon}</span>
                    <span className="text-white font-semibold text-sm">{f.name}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 ml-8">{f.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Set Parameters */}
        {step === 3 && (
          <div>
            <p className="text-white font-semibold mb-1">
              Step 3: Configure {aiFeature!.name} for your {genre!.name}
            </p>
            <p className="text-slate-400 text-xs mb-4">Adjust the AI parameters:</p>
            <div className="space-y-5 mb-6">
              {aiFeature!.parameters.map((p, i) => (
                <div key={i}>
                  <label className="text-white text-sm font-semibold flex justify-between mb-1">
                    <span>{p.name}</span>
                    <span className="text-red-400 text-xs">
                      {params[i] <= 2 ? p.low : params[i] >= 4 ? p.high : "Balanced"}
                    </span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs w-20 text-right">{p.low}</span>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={params[i]}
                      onChange={(e) => handleParam(i, Number(e.target.value))}
                      className="flex-1 accent-red-500"
                    />
                    <span className="text-slate-500 text-xs w-20">{p.high}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(4)}
              className="w-full px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 4: Describe Improvement */}
        {step === 4 && (
          <div>
            <p className="text-white font-semibold mb-1">Step 4: How does the AI make your game better?</p>
            <p className="text-slate-400 text-xs mb-3">Select all that apply, and add your own thoughts:</p>
            <div className="space-y-2 mb-4">
              {IMPROVEMENT_OPTIONS.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => toggleImprovement(opt)}
                  className={`w-full text-left px-4 py-2 rounded-lg border text-sm transition-colors ${
                    selectedImprovements.includes(opt)
                      ? "bg-red-500/20 border-red-500 text-white"
                      : "bg-space-900 border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {selectedImprovements.includes(opt) ? "✓ " : "  "}
                  {opt}
                </button>
              ))}
            </div>
            <textarea
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              placeholder="Add your own thoughts (optional)..."
              className="w-full px-4 py-3 bg-space-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-red-500 mb-4 resize-none"
              rows={3}
            />
            <button
              onClick={() => setStep(5)}
              disabled={selectedImprovements.length === 0}
              className={`w-full px-6 py-3 rounded-lg font-bold transition-colors ${
                selectedImprovements.length > 0
                  ? "bg-red-500 hover:bg-red-400 text-white"
                  : "bg-slate-700 text-slate-500 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 5: Publish */}
        {step === 5 && (
          <div className="text-center">
            <div className="text-5xl mb-4">{genre!.icon}</div>
            <h4 className="text-white font-bold text-xl mb-2">
              {genre!.name} + {aiFeature!.name}
            </h4>
            <p className="text-slate-300 text-sm mb-6">
              Your AI-powered {genre!.name.toLowerCase()} is ready to ship! Hit publish to see the final concept.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPublished(true)}
              className="px-8 py-4 bg-red-500 hover:bg-red-400 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-red-500/20"
            >
              🚀 Publish Game Concept
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
