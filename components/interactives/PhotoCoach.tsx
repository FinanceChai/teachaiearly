"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TrainingImage {
  emoji: string;
  description: string;
  correctLabel: string;
  isEdgeCase: boolean;
  edgeCaseNote?: string;
}

interface TrainingSet {
  category: string;
  icon: string;
  labels: string[];
  images: TrainingImage[];
}

const TRAINING_SETS: TrainingSet[] = [
  {
    category: "Fruit Classifier",
    icon: "🍎",
    labels: ["Apple", "Orange", "Banana", "Not fruit"],
    images: [
      { emoji: "🍎", description: "A shiny red apple", correctLabel: "Apple", isEdgeCase: false },
      { emoji: "🍊", description: "A round orange", correctLabel: "Orange", isEdgeCase: false },
      { emoji: "🍌", description: "A yellow banana", correctLabel: "Banana", isEdgeCase: false },
      { emoji: "🍏", description: "A green apple", correctLabel: "Apple", isEdgeCase: true, edgeCaseNote: "Tricky! It's green, but still an apple. AI needs to learn that apples come in different colors." },
      { emoji: "🏀", description: "A basketball", correctLabel: "Not fruit", isEdgeCase: true, edgeCaseNote: "It's round and orange like an orange — AI could be fooled by color and shape alone!" },
      { emoji: "🍅", description: "A tomato", correctLabel: "Not fruit", isEdgeCase: true, edgeCaseNote: "Even humans debate this one! For our classifier, it's not a standard fruit — showing why edge cases are hard." },
    ],
  },
  {
    category: "Weather Classifier",
    icon: "🌤️",
    labels: ["Sunny", "Rainy", "Snowy", "Cloudy"],
    images: [
      { emoji: "☀️", description: "Bright sunshine, clear sky", correctLabel: "Sunny", isEdgeCase: false },
      { emoji: "🌧️", description: "Dark clouds with heavy rain", correctLabel: "Rainy", isEdgeCase: false },
      { emoji: "❄️", description: "White snow covering everything", correctLabel: "Snowy", isEdgeCase: false },
      { emoji: "⛅", description: "Sun peeking through clouds", correctLabel: "Cloudy", isEdgeCase: true, edgeCaseNote: "Sun AND clouds — is it sunny or cloudy? AI has to make a judgment call, just like you!" },
      { emoji: "🌨️", description: "Light snow with gray sky", correctLabel: "Snowy", isEdgeCase: true, edgeCaseNote: "It could look like rain from a distance. AI needs lots of examples to tell snow from rain." },
      { emoji: "🌅", description: "Orange sunset sky", correctLabel: "Sunny", isEdgeCase: true, edgeCaseNote: "The orange color could confuse AI — sunsets look very different from midday sun." },
    ],
  },
];

export function PhotoCoach({ onComplete }: { onComplete: () => void }) {
  const [setIdx, setSetIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [results, setResults] = useState<{ correct: boolean; edgeCase: boolean }[]>([]);
  const [done, setDone] = useState(false);

  const set = TRAINING_SETS[setIdx];
  const img = set.images[imgIdx];
  const totalImages = TRAINING_SETS.reduce((sum, s) => sum + s.images.length, 0);

  function pickLabel(label: string) {
    if (picked !== null) return;
    setPicked(label);
    setResults((prev) => [...prev, { correct: label === img.correctLabel, edgeCase: img.isEdgeCase }]);
  }

  function next() {
    setPicked(null);
    if (imgIdx >= set.images.length - 1) {
      if (setIdx >= TRAINING_SETS.length - 1) {
        setDone(true);
        onComplete();
      } else {
        setSetIdx((s) => s + 1);
        setImgIdx(0);
      }
    } else {
      setImgIdx((i) => i + 1);
    }
  }

  if (done) {
    const correct = results.filter((r) => r.correct).length;
    const edgeCaseCorrect = results.filter((r) => r.edgeCase && r.correct).length;
    const edgeCaseTotal = results.filter((r) => r.edgeCase).length;
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">📸</motion.div>
        <div>
          <div className="text-4xl font-black text-white">{correct}/{totalImages}</div>
          <div className="text-slate-400 text-sm mt-1">images labeled correctly</div>
          <div className="mt-3 bg-space-800 rounded-xl p-3 border border-slate-700 inline-block">
            <span className="text-pink-300 font-black">{edgeCaseCorrect}/{edgeCaseTotal}</span>
            <span className="text-slate-400 text-sm ml-2">edge cases nailed</span>
          </div>
          <div className="text-slate-300 mt-3">
            {correct >= totalImages - 1 ? "Amazing coach! Your training data would build a great classifier." : correct >= totalImages / 2 ? "Good labeling! Edge cases are the real challenge for AI." : "Labeling is harder than it looks — now you see why AI needs thousands of examples!"}
          </div>
        </div>
        <div className="bg-pink-500/20 border border-pink-500/40 rounded-2xl p-4">
          <div className="font-black text-pink-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">Training AI requires carefully labeled data. Edge cases — the weird in-between examples — are what make AI hard to build.</p>
        </div>
      </div>
    );
  }

  const globalImg = TRAINING_SETS.slice(0, setIdx).reduce((sum, s) => sum + s.images.length, 0) + imgIdx;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {Array.from({ length: totalImages }).map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < globalImg ? "bg-pink-500" : i === globalImg ? "bg-pink-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs text-slate-400 font-bold">{globalImg + 1}/{totalImages}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs font-black text-pink-400">PHOTO COACH — {set.category.toUpperCase()}</div>
          {img.isEdgeCase && <div className="text-xs font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">EDGE CASE</div>}
        </div>
        <div className="text-sm text-slate-400 font-bold mb-4">Label this training image for AI:</div>

        {/* Image card */}
        <div className="bg-space-900 rounded-xl p-6 border border-slate-600 text-center mb-4">
          <div className="text-6xl mb-3">{img.emoji}</div>
          <div className="text-white font-bold">{img.description}</div>
        </div>

        {/* Label buttons */}
        {picked === null ? (
          <div className="grid grid-cols-2 gap-2">
            {set.labels.map((label) => (
              <motion.button key={label} onClick={() => pickLabel(label)} whileTap={{ scale: 0.95 }} className="py-4 rounded-xl border border-slate-700 bg-space-900 font-black text-white hover:border-pink-500/50 hover:bg-pink-500/10 transition-colors">
                {label}
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className={`p-4 rounded-xl text-sm font-bold ${picked === img.correctLabel ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
              {picked === img.correctLabel ? "Correct label!" : `The right label is "${img.correctLabel}."`}
              {img.edgeCaseNote && <div className="font-normal text-slate-300 mt-2">{img.edgeCaseNote}</div>}
            </div>
            <button onClick={next} className="w-full py-4 rounded-xl font-black text-white bg-pink-500 hover:bg-pink-400 btn-press transition-colors">
              {imgIdx >= set.images.length - 1 && setIdx >= TRAINING_SETS.length - 1 ? "See Results →" : "Next Image →"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
