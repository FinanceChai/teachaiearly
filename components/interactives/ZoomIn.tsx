"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Simple pixel art grids (8x8) - each cell is a hex color
const IMAGES = [
  {
    name: "Smiley Face",
    emoji: "😊",
    grid: [
      ["#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24"],
      ["#fbbf24","#fbbf24","#1e293b","#fbbf24","#fbbf24","#1e293b","#fbbf24","#fbbf24"],
      ["#fbbf24","#fbbf24","#1e293b","#fbbf24","#fbbf24","#1e293b","#fbbf24","#fbbf24"],
      ["#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24"],
      ["#fbbf24","#1e293b","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#1e293b","#fbbf24"],
      ["#fbbf24","#fbbf24","#1e293b","#fbbf24","#fbbf24","#1e293b","#fbbf24","#fbbf24"],
      ["#fbbf24","#fbbf24","#fbbf24","#1e293b","#1e293b","#fbbf24","#fbbf24","#fbbf24"],
      ["#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24"],
    ],
  },
  {
    name: "Heart",
    emoji: "❤️",
    grid: [
      ["#0f172a","#0f172a","#0f172a","#0f172a","#0f172a","#0f172a","#0f172a","#0f172a"],
      ["#0f172a","#ef4444","#ef4444","#0f172a","#0f172a","#ef4444","#ef4444","#0f172a"],
      ["#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444"],
      ["#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444"],
      ["#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444"],
      ["#0f172a","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#0f172a"],
      ["#0f172a","#0f172a","#ef4444","#ef4444","#ef4444","#ef4444","#0f172a","#0f172a"],
      ["#0f172a","#0f172a","#0f172a","#ef4444","#ef4444","#0f172a","#0f172a","#0f172a"],
    ],
  },
  {
    name: "Tree",
    emoji: "🌲",
    grid: [
      ["#0ea5e9","#0ea5e9","#0ea5e9","#22c55e","#22c55e","#0ea5e9","#0ea5e9","#0ea5e9"],
      ["#0ea5e9","#0ea5e9","#22c55e","#22c55e","#22c55e","#22c55e","#0ea5e9","#0ea5e9"],
      ["#0ea5e9","#22c55e","#22c55e","#16a34a","#22c55e","#22c55e","#22c55e","#0ea5e9"],
      ["#22c55e","#22c55e","#16a34a","#22c55e","#16a34a","#22c55e","#22c55e","#22c55e"],
      ["#0ea5e9","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#0ea5e9"],
      ["#0ea5e9","#0ea5e9","#0ea5e9","#92400e","#92400e","#0ea5e9","#0ea5e9","#0ea5e9"],
      ["#0ea5e9","#0ea5e9","#0ea5e9","#92400e","#92400e","#0ea5e9","#0ea5e9","#0ea5e9"],
      ["#78716c","#78716c","#78716c","#78716c","#78716c","#78716c","#78716c","#78716c"],
    ],
  },
];

const QUIZ = [
  {
    question: "How does AI 'see' a photo?",
    options: ["It looks at the picture like we do", "It reads numbers for each pixel", "It guesses based on the file name", "It uses a camera"],
    correct: 1,
    explanation: "AI sees images as a grid of numbers — each pixel has red, green, and blue values between 0-255.",
  },
  {
    question: "A 1080p photo has how many pixels?",
    options: ["About 1,000", "About 100,000", "About 2 million", "About 2 billion"],
    correct: 2,
    explanation: "1920 × 1080 = about 2 million pixels. That's 2 million tiny colored squares the AI has to process!",
  },
  {
    question: "Why is a zoomed-in photo blurry?",
    options: ["The camera broke", "Pixels are too big to show detail", "AI is confused", "The screen is dirty"],
    correct: 1,
    explanation: "When you zoom in, each pixel gets stretched bigger. There's no extra detail hiding inside a pixel — it's just one color.",
  },
];

export function ZoomIn({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"explore" | "quiz">("explore");
  const [imgIdx, setImgIdx] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showNumbers, setShowNumbers] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const img = IMAGES[imgIdx];

  function pickAnswer(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === QUIZ[quizIdx].correct) setScore((s) => s + 1);
  }

  function nextQuiz() {
    setPicked(null);
    if (quizIdx >= QUIZ.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setQuizIdx((q) => q + 1);
    }
  }

  if (done) {
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          👁️
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{QUIZ.length}</div>
          <div className="text-slate-300 mt-2">
            {score === QUIZ.length ? "Perfect! You see the world like AI does." : score >= 2 ? "Great job understanding how AI sees!" : "Pixels are tricky — now you know how AI starts!"}
          </div>
        </div>
        <div className="bg-pink-500/20 border border-pink-500/40 rounded-2xl p-4">
          <div className="font-black text-pink-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">Every image is just a grid of colored numbers to AI. It has to build understanding from millions of tiny squares — starting from zero.</p>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    const q = QUIZ[quizIdx];
    return (
      <div className="space-y-5">
        <div className="flex gap-1.5">
          {QUIZ.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < quizIdx ? "bg-pink-500" : i === quizIdx ? "bg-pink-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-pink-400 mb-1">PIXEL QUIZ</div>
          <div className="text-white font-black text-lg mb-4">{q.question}</div>
          {picked === null ? (
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <motion.button key={i} onClick={() => pickAnswer(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-4 rounded-xl border border-slate-700 bg-space-900 font-bold text-white hover:border-pink-500/50 transition-colors">
                  {opt}
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${picked === q.correct ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                {picked === q.correct ? "Correct! " : `The answer is: "${q.options[q.correct]}." `}
                <span className="font-normal text-slate-300">{q.explanation}</span>
              </div>
              <button onClick={nextQuiz} className="w-full py-4 rounded-xl font-black text-white bg-pink-500 hover:bg-pink-400 btn-press transition-colors">
                {quizIdx < QUIZ.length - 1 ? "Next Question →" : "See Results →"}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  const cellSize = zoomLevel === 1 ? 32 : zoomLevel === 2 ? 28 : 24;

  return (
    <div className="space-y-5">
      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-pink-400 mb-1">ZOOM INTO PIXELS</div>
        <div className="text-sm text-slate-400 font-bold mb-4">
          This is what AI sees — not a picture, but a grid of colored squares (pixels).
        </div>

        {/* Image selector */}
        <div className="flex gap-2 mb-4">
          {IMAGES.map((im, i) => (
            <button key={i} onClick={() => { setImgIdx(i); setZoomLevel(1); setShowNumbers(false); }} className={`px-3 py-2 rounded-xl text-sm font-bold transition-colors ${i === imgIdx ? "bg-pink-500/20 text-pink-300 border border-pink-500/40" : "bg-space-900 text-slate-400 border border-slate-700"}`}>
              {im.emoji} {im.name}
            </button>
          ))}
        </div>

        {/* Pixel grid */}
        <div className="flex justify-center mb-4 overflow-hidden rounded-xl border border-slate-600 bg-space-900 p-2">
          <div style={{ display: "grid", gridTemplateColumns: `repeat(8, ${cellSize}px)`, gap: zoomLevel >= 2 ? "2px" : "1px" }}>
            {img.grid.flat().map((color, i) => (
              <motion.div
                key={`${imgIdx}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.005 }}
                style={{ width: cellSize, height: cellSize, backgroundColor: color, borderRadius: zoomLevel >= 3 ? 4 : 2, fontSize: 7 }}
                className="flex items-center justify-center"
              >
                {showNumbers && <span className="text-white/80 font-mono leading-none" style={{ fontSize: zoomLevel >= 3 ? 7 : 6 }}>{color.slice(1, 4)}</span>}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-xs font-bold text-slate-500">ZOOM:</div>
          {[1, 2, 3].map((z) => (
            <button key={z} onClick={() => setZoomLevel(z)} className={`px-3 py-1.5 rounded-lg text-xs font-black transition-colors ${z === zoomLevel ? "bg-pink-500 text-white" : "bg-space-900 text-slate-400 border border-slate-700"}`}>
              {z}x
            </button>
          ))}
          <div className="flex-1" />
          <button onClick={() => setShowNumbers(!showNumbers)} className={`px-3 py-1.5 rounded-lg text-xs font-black transition-colors ${showNumbers ? "bg-pink-500 text-white" : "bg-space-900 text-slate-400 border border-slate-700"}`}>
            {showNumbers ? "Hide #" : "Show #"}
          </button>
        </div>

        {/* Info */}
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-3 text-sm text-slate-300 mb-4">
          <strong className="text-pink-300">This 8×8 grid = 64 pixels.</strong> A real photo has millions! AI processes every single one as a number.
        </div>

        <button onClick={() => setPhase("quiz")} className="w-full py-4 rounded-xl font-black text-white bg-pink-500 hover:bg-pink-400 btn-press transition-colors">
          Test Your Knowledge →
        </button>
      </div>
    </div>
  );
}
