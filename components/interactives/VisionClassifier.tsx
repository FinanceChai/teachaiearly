"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ClassifierItem {
  emoji: string;
  name: string;
  category: string;
  features: string[];
}

const THEMES = [
  {
    name: "Animals vs. Vehicles",
    icon: "🐕",
    categories: ["Animal", "Vehicle"],
    trainingItems: [
      { emoji: "🐕", name: "Dog", category: "Animal", features: ["fur", "four legs", "tail"] },
      { emoji: "🚗", name: "Car", category: "Vehicle", features: ["wheels", "metal", "windows"] },
      { emoji: "🐈", name: "Cat", category: "Animal", features: ["fur", "four legs", "whiskers"] },
      { emoji: "🚌", name: "Bus", category: "Vehicle", features: ["wheels", "metal", "large"] },
    ],
    testItems: [
      { emoji: "🐎", name: "Horse", category: "Animal", features: ["fur", "four legs", "mane"], tricky: false },
      { emoji: "🚲", name: "Bicycle", category: "Vehicle", features: ["wheels", "metal", "pedals"], tricky: false },
      { emoji: "🦀", name: "Crab", category: "Animal", features: ["shell", "legs", "claws"], tricky: true, trickyNote: "No fur and no four legs — AI might struggle since training had only furry four-legged animals!" },
      { emoji: "🛷", name: "Sled", category: "Vehicle", features: ["no wheels", "wood", "runners"], tricky: true, trickyNote: "No wheels! AI trained on wheeled vehicles might fail on a sled." },
    ],
  },
  {
    name: "Indoor vs. Outdoor",
    icon: "🏠",
    categories: ["Indoor", "Outdoor"],
    trainingItems: [
      { emoji: "🛋️", name: "Couch", category: "Indoor", features: ["cushions", "room", "ceiling"] },
      { emoji: "🌲", name: "Forest", category: "Outdoor", features: ["trees", "sky", "ground"] },
      { emoji: "🍳", name: "Kitchen", category: "Indoor", features: ["appliances", "counter", "tiles"] },
      { emoji: "🏖️", name: "Beach", category: "Outdoor", features: ["sand", "water", "sky"] },
    ],
    testItems: [
      { emoji: "🛏️", name: "Bedroom", category: "Indoor", features: ["bed", "walls", "ceiling"], tricky: false },
      { emoji: "⛰️", name: "Mountain", category: "Outdoor", features: ["rocks", "sky", "snow"], tricky: false },
      { emoji: "🏕️", name: "Tent (camping)", category: "Outdoor", features: ["fabric", "ground", "sky"], tricky: true, trickyNote: "Inside a tent looks like indoors but it's outdoors! Context matters more than surface features." },
      { emoji: "🌿", name: "Indoor Plant", category: "Indoor", features: ["plant", "pot", "wall"], tricky: true, trickyNote: "Plants usually mean outdoor — but this one's in a pot inside! AI needs context, not just 'green = outside'." },
    ],
  },
];

export function VisionClassifier({ onComplete }: { onComplete: (passed: boolean) => void }) {
  const [themeIdx, setThemeIdx] = useState(0);
  const [phase, setPhase] = useState<"train" | "test" | "review">("train");
  const [trainIdx, setTrainIdx] = useState(0);
  const [testIdx, setTestIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{ correct: boolean; tricky: boolean }[]>([]);
  const [done, setDone] = useState(false);

  const theme = THEMES[themeIdx];

  function classify(category: string) {
    if (picked !== null) return;
    setPicked(category);
    const item = theme.testItems[testIdx];
    setTestResults((prev) => [...prev, { correct: category === item.category, tricky: !!item.tricky }]);
  }

  function nextTest() {
    setPicked(null);
    if (testIdx >= theme.testItems.length - 1) {
      setPhase("review");
    } else {
      setTestIdx((t) => t + 1);
    }
  }

  function nextTheme() {
    if (themeIdx >= THEMES.length - 1) {
      setDone(true);
      const totalCorrect = testResults.filter((r) => r.correct).length;
      const totalTests = THEMES.reduce((s, t) => s + t.testItems.length, 0);
      onComplete(totalCorrect >= totalTests * 0.6);
    } else {
      setThemeIdx((t) => t + 1);
      setPhase("train");
      setTrainIdx(0);
      setTestIdx(0);
      setPicked(null);
    }
  }

  if (done) {
    const totalCorrect = testResults.filter((r) => r.correct).length;
    const totalTests = THEMES.reduce((s, t) => s + t.testItems.length, 0);
    const trickyCorrect = testResults.filter((r) => r.tricky && r.correct).length;
    const trickyTotal = testResults.filter((r) => r.tricky).length;
    const pct = Math.round((totalCorrect / totalTests) * 100);

    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          {pct >= 60 ? "🔭" : "📷"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{totalCorrect}/{totalTests}</div>
          <div className="text-slate-400 text-sm mt-1">classified correctly ({pct}%)</div>
          <div className="mt-3 bg-space-800 rounded-xl p-3 border border-slate-700 inline-block">
            <span className="text-pink-300 font-black">{trickyCorrect}/{trickyTotal}</span>
            <span className="text-slate-400 text-sm ml-2">edge cases handled</span>
          </div>
          <div className="text-slate-300 mt-3">
            {pct >= 80 ? "Vision Builder level! Your classifier handles even tricky cases." : pct >= 60 ? "Solid classifier! Edge cases are always the hardest part." : "Building classifiers is hard — even the pros struggle with edge cases!"}
          </div>
        </div>
        <div className="bg-pink-500/20 border border-pink-500/40 rounded-2xl p-4">
          <div className="font-black text-pink-300">{pct >= 60 ? "Badge Earned! 🔭" : "Challenge Complete!"}</div>
          <p className="text-sm text-slate-400 mt-1">Building a vision classifier means choosing training data carefully. Edge cases expose the limits of any classifier — that&apos;s why real AI needs thousands of diverse examples.</p>
        </div>
      </div>
    );
  }

  // Training phase
  if (phase === "train") {
    const item = theme.trainingItems[trainIdx];
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 flex-1">
            {THEMES.map((_, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < themeIdx ? "bg-pink-500" : i === themeIdx ? "bg-pink-400" : "bg-slate-700"}`} />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-bold">Theme {themeIdx + 1}/{THEMES.length}</span>
        </div>

        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-pink-400 mb-1">TRAINING PHASE — {theme.name.toUpperCase()}</div>
          <div className="text-sm text-slate-400 font-bold mb-4">Study the training data your classifier will learn from:</div>

          <motion.div key={trainIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-space-900 rounded-xl p-5 border border-slate-600 text-center mb-4">
            <div className="text-5xl mb-2">{item.emoji}</div>
            <div className="text-white font-black text-lg">{item.name}</div>
            <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-black" style={{ background: item.category === theme.categories[0] ? "#ec489930" : "#3b82f630", color: item.category === theme.categories[0] ? "#f472b6" : "#60a5fa" }}>
              {item.category}
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {item.features.map((f) => (
                <span key={f} className="bg-space-800 rounded-lg px-2 py-1 text-xs text-slate-400 font-bold border border-slate-700">{f}</span>
              ))}
            </div>
          </motion.div>

          <div className="text-xs text-slate-500 text-center mb-3">Training image {trainIdx + 1}/{theme.trainingItems.length}</div>

          <button
            onClick={() => {
              if (trainIdx < theme.trainingItems.length - 1) setTrainIdx((t) => t + 1);
              else setPhase("test");
            }}
            className="w-full py-4 rounded-xl font-black text-white bg-pink-500 hover:bg-pink-400 btn-press transition-colors"
          >
            {trainIdx < theme.trainingItems.length - 1 ? "Next Training Image →" : "Start Testing →"}
          </button>
        </div>
      </div>
    );
  }

  // Test phase
  if (phase === "test") {
    const item = theme.testItems[testIdx];
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 flex-1">
            {theme.testItems.map((_, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < testIdx ? "bg-pink-500" : i === testIdx ? "bg-pink-400" : "bg-slate-700"}`} />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-bold">Test {testIdx + 1}/{theme.testItems.length}</span>
        </div>

        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs font-black text-pink-400">TESTING PHASE</div>
            {item.tricky && <div className="text-xs font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">EDGE CASE</div>}
          </div>
          <div className="text-sm text-slate-400 font-bold mb-4">Classify this new image:</div>

          <div className="bg-space-900 rounded-xl p-5 border border-slate-600 text-center mb-4">
            <div className="text-5xl mb-2">{item.emoji}</div>
            <div className="text-white font-black text-lg">{item.name}</div>
          </div>

          {picked === null ? (
            <div className="grid grid-cols-2 gap-3">
              {theme.categories.map((cat) => (
                <motion.button key={cat} onClick={() => classify(cat)} whileTap={{ scale: 0.95 }} className="py-5 rounded-xl border border-slate-700 bg-space-900 font-black text-white text-lg hover:border-pink-500/50 transition-colors">
                  {cat}
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${picked === item.category ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                {picked === item.category ? "Correct classification!" : `It's "${item.category}."`}
                {item.trickyNote && <div className="font-normal text-slate-300 mt-2">{item.trickyNote}</div>}
              </div>
              <button onClick={nextTest} className="w-full py-4 rounded-xl font-black text-white bg-pink-500 hover:bg-pink-400 btn-press transition-colors">
                {testIdx < theme.testItems.length - 1 ? "Next Test →" : "Review Results →"}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Review phase
  const themeResults = testResults.slice(-theme.testItems.length);
  const themeCorrect = themeResults.filter((r) => r.correct).length;
  return (
    <div className="space-y-5">
      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700 text-center">
        <div className="text-xs font-black text-pink-400 mb-3">{theme.name.toUpperCase()} — RESULTS</div>
        <div className="text-3xl font-black text-white mb-2">{themeCorrect}/{theme.testItems.length}</div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {themeResults.map((r, i) => (
            <div key={i} className={`py-3 rounded-xl font-black text-lg ${r.correct ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
              {r.correct ? "✓" : "✗"}
            </div>
          ))}
        </div>
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-3 text-sm text-slate-300 mb-4">
          {themeCorrect >= 3 ? "Your classifier works well! Edge cases are always the challenge." : "Edge cases exposed your classifier's weakness — real AI faces this same problem!"}
        </div>
        <button onClick={nextTheme} className="w-full py-4 rounded-xl font-black text-white bg-pink-500 hover:bg-pink-400 btn-press transition-colors">
          {themeIdx < THEMES.length - 1 ? "Next Theme →" : "See Final Score →"}
        </button>
      </div>
    </div>
  );
}
