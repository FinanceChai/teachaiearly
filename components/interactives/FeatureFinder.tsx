"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Layer {
  name: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

const LAYERS: Layer[] = [
  { name: "Layer 1: Edges", description: "AI first detects simple edges — lines where colors change sharply.", icon: "📐", features: ["Vertical lines", "Horizontal lines", "Diagonal lines", "Curves"], color: "#ec4899" },
  { name: "Layer 2: Shapes", description: "Edges combine into basic shapes — circles, rectangles, triangles.", icon: "🔷", features: ["Circles", "Rectangles", "Triangles", "Ovals"], color: "#f472b6" },
  { name: "Layer 3: Parts", description: "Shapes combine into recognizable parts — eyes, wheels, petals.", icon: "👁️", features: ["Eyes", "Wheels", "Petals", "Windows"], color: "#f9a8d4" },
  { name: "Layer 4: Objects", description: "Parts combine into full objects — faces, cars, flowers.", icon: "🚗", features: ["Faces", "Cars", "Flowers", "Houses"], color: "#fda4af" },
];

interface DetectiveRound {
  object: string;
  emoji: string;
  layers: { label: string; options: string[]; correct: number }[];
}

const DETECTIVE_ROUNDS: DetectiveRound[] = [
  {
    object: "Cat",
    emoji: "🐱",
    layers: [
      { label: "Edges", options: ["Curved lines + sharp angles", "Only straight lines", "No edges at all", "Just dots"], correct: 0 },
      { label: "Shapes", options: ["Only squares", "Triangles (ears) + circles (face)", "Just rectangles", "Hexagons"], correct: 1 },
      { label: "Parts", options: ["Wheels + doors", "Eyes + ears + whiskers", "Petals + stem", "Windows + roof"], correct: 1 },
      { label: "Object", options: ["A car", "A flower", "A cat", "A house"], correct: 2 },
    ],
  },
  {
    object: "House",
    emoji: "🏠",
    layers: [
      { label: "Edges", options: ["Mostly curved lines", "Straight horizontal + vertical + diagonal", "No clear edges", "Only circles"], correct: 1 },
      { label: "Shapes", options: ["Rectangle (walls) + triangle (roof)", "Only circles", "Only wavy shapes", "No shapes found"], correct: 0 },
      { label: "Parts", options: ["Eyes + nose + mouth", "Wheels + axles", "Door + windows + chimney", "Petals + leaves"], correct: 2 },
      { label: "Object", options: ["A face", "A house", "A tree", "A boat"], correct: 1 },
    ],
  },
  {
    object: "Flower",
    emoji: "🌸",
    layers: [
      { label: "Edges", options: ["Only straight lines", "Mostly curved + organic lines", "Sharp zigzag only", "No edges"], correct: 1 },
      { label: "Shapes", options: ["Circles (center) + ovals (petals)", "Only triangles", "Only rectangles", "Only squares"], correct: 0 },
      { label: "Parts", options: ["Wheels + engine", "Petals + stem + center", "Windows + doors", "Eyes + ears"], correct: 1 },
      { label: "Object", options: ["A car", "A cat", "A person", "A flower"], correct: 3 },
    ],
  },
];

export function FeatureFinder({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"learn" | "detect">("learn");
  const [layerIdx, setLayerIdx] = useState(0);
  const [roundIdx, setRoundIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function pickAnswer(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    const correct = DETECTIVE_ROUNDS[roundIdx].layers[stepIdx].correct;
    if (idx === correct) setScore((s) => s + 1);
  }

  function nextStep() {
    setPicked(null);
    if (stepIdx >= 3) {
      if (roundIdx >= DETECTIVE_ROUNDS.length - 1) {
        setDone(true);
        onComplete();
      } else {
        setRoundIdx((r) => r + 1);
        setStepIdx(0);
      }
    } else {
      setStepIdx((s) => s + 1);
    }
  }

  if (done) {
    const total = DETECTIVE_ROUNDS.length * 4;
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">🔍</motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{total}</div>
          <div className="text-slate-300 mt-2">
            {score >= total - 2 ? "Amazing detective work! You think in layers like a neural network." : score >= total / 2 ? "Good job! AI builds up from edges to objects, layer by layer." : "Keep exploring — AI vision is all about building up from simple to complex!"}
          </div>
        </div>
        <div className="bg-pink-500/20 border border-pink-500/40 rounded-2xl p-4">
          <div className="font-black text-pink-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">AI vision works in layers: edges → shapes → parts → objects. Each layer builds on the one before, like a detective putting clues together.</p>
        </div>
      </div>
    );
  }

  if (phase === "learn") {
    const layer = LAYERS[layerIdx];
    return (
      <div className="space-y-5">
        <div className="flex gap-1.5">
          {LAYERS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < layerIdx ? "bg-pink-500" : i === layerIdx ? "bg-pink-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-pink-400 mb-1">HOW AI SEES — LAYER BY LAYER</div>
          <AnimatePresence mode="wait">
            <motion.div key={layerIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center py-4">
                <div className="text-5xl mb-3">{layer.icon}</div>
                <h3 className="text-xl font-black text-white">{layer.name}</h3>
                <p className="text-slate-400 text-sm mt-2">{layer.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {layer.features.map((f, i) => (
                  <motion.div key={f} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-space-900 rounded-xl p-3 border border-slate-600 text-center">
                    <div className="text-white font-bold text-sm">{f}</div>
                  </motion.div>
                ))}
              </div>
              {/* Visual layer stack */}
              <div className="flex items-center gap-2 mb-4">
                {LAYERS.map((l, i) => (
                  <div key={i} className={`flex-1 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all ${i <= layerIdx ? "text-white" : "text-slate-600 border border-slate-700"}`} style={{ background: i <= layerIdx ? l.color + "40" : "transparent", borderColor: i <= layerIdx ? l.color : undefined }}>
                    {l.icon}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={() => {
              if (layerIdx < LAYERS.length - 1) setLayerIdx((l) => l + 1);
              else setPhase("detect");
            }}
            className="w-full py-4 rounded-xl font-black text-white bg-pink-500 hover:bg-pink-400 btn-press transition-colors"
          >
            {layerIdx < LAYERS.length - 1 ? "Next Layer →" : "Play Detective →"}
          </button>
        </div>
      </div>
    );
  }

  // Detective phase
  const round = DETECTIVE_ROUNDS[roundIdx];
  const step = round.layers[stepIdx];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {DETECTIVE_ROUNDS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < roundIdx ? "bg-pink-500" : i === roundIdx ? "bg-pink-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs font-bold text-yellow-400">Score: {score}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs font-black text-pink-400">FEATURE DETECTIVE</div>
          <div className="text-xs font-bold text-slate-500">{round.emoji} Object {roundIdx + 1}/{DETECTIVE_ROUNDS.length}</div>
        </div>

        {/* Layer progress */}
        <div className="flex gap-1 mb-4">
          {round.layers.map((l, i) => (
            <div key={i} className={`flex-1 py-2 rounded-lg text-center text-xs font-black transition-all ${i < stepIdx ? "bg-pink-500/20 text-pink-300" : i === stepIdx ? "bg-pink-500/30 text-pink-300 border border-pink-500/40" : "bg-space-900 text-slate-600"}`}>
              {l.label}
            </div>
          ))}
        </div>

        <div className="text-sm text-slate-400 font-bold mb-3">
          At the <strong className="text-pink-300">{step.label}</strong> layer, what does AI detect for a {round.emoji}?
        </div>

        {picked === null ? (
          <div className="space-y-2">
            {step.options.map((opt, i) => (
              <motion.button key={i} onClick={() => pickAnswer(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-xl border border-slate-700 bg-space-900 font-bold text-white text-sm hover:border-pink-500/50 transition-colors">
                {opt}
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className={`p-3 rounded-xl text-sm font-bold ${picked === step.correct ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
              {picked === step.correct ? "Correct!" : `Answer: "${step.options[step.correct]}"`}
            </div>
            <button onClick={nextStep} className="w-full py-4 rounded-xl font-black text-white bg-pink-500 hover:bg-pink-400 btn-press transition-colors">
              {stepIdx >= 3 && roundIdx >= DETECTIVE_ROUNDS.length - 1 ? "See Results →" : "Continue →"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
