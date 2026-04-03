"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SOUNDS = [
  {
    name: "Clap",
    emoji: "👏",
    description: "A short, sharp burst of sound",
    waveform: [2, 8, 10, 9, 6, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    color: "bg-violet-400",
    fact: "A clap is a transient sound — it spikes fast and fades quickly!",
  },
  {
    name: "Whistle",
    emoji: "🎵",
    description: "A smooth, steady tone",
    waveform: [4, 7, 9, 7, 4, 7, 9, 7, 4, 7, 9, 7, 4, 7, 9, 7],
    color: "bg-purple-400",
    fact: "A whistle makes a simple sine wave — one of the purest sounds in nature!",
  },
  {
    name: "Guitar",
    emoji: "🎸",
    description: "A rich, vibrating string sound",
    waveform: [3, 7, 10, 8, 5, 9, 7, 4, 8, 6, 3, 7, 5, 2, 4, 1],
    color: "bg-fuchsia-400",
    fact: "Guitar waves are complex — multiple harmonics vibrate at once creating a rich timbre!",
  },
  {
    name: "Voice",
    emoji: "🗣️",
    description: "Human speech with varied patterns",
    waveform: [2, 5, 8, 10, 8, 3, 1, 4, 9, 7, 2, 6, 10, 5, 3, 1],
    color: "bg-violet-500",
    fact: "Your voice is incredibly complex — AI needs huge models to understand and copy it!",
  },
  {
    name: "Drum",
    emoji: "🥁",
    description: "A deep, booming hit",
    waveform: [1, 5, 10, 10, 8, 6, 5, 4, 3, 3, 2, 2, 1, 1, 1, 0],
    color: "bg-purple-500",
    fact: "Drums have low-frequency waves — you can sometimes feel them in your chest!",
  },
];

const QUIZ_QUESTIONS = [
  {
    question: "Which sound has the simplest, most repeating pattern?",
    correctIdx: 1, // Whistle
    options: ["Clap", "Whistle", "Guitar", "Drum"],
    explanation: "A whistle creates a simple repeating wave — that's why it sounds so pure and clean!",
  },
  {
    question: "Which sound spikes up fast and then goes silent quickly?",
    correctIdx: 0, // Clap
    options: ["Clap", "Voice", "Whistle", "Guitar"],
    explanation: "A clap is a transient — a quick burst of energy that fades almost instantly!",
  },
  {
    question: "Which sound has the most unpredictable, complex waveform?",
    correctIdx: 2, // Voice
    options: ["Drum", "Whistle", "Voice", "Clap"],
    explanation: "Human voice is incredibly complex — it changes pitch, volume, and shape constantly as we talk!",
  },
  {
    question: "Why is it hard for AI to clone a human voice perfectly?",
    correctIdx: 3,
    options: [
      "Voices are too quiet",
      "Voices only use simple waves",
      "All voices sound the same",
      "Voices have complex, unique patterns",
    ],
    explanation: "Every person's voice has unique patterns of harmonics, timing, and rhythm — like a sonic fingerprint!",
  },
];

export function WaveformExplorer({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"explore" | "quiz" | "results">("explore");
  const [explored, setExplored] = useState<Set<number>>(new Set());
  const [activeSound, setActiveSound] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function selectSound(idx: number) {
    setActiveSound(idx);
    setAnimating(true);
    const next = new Set(explored);
    next.add(idx);
    setExplored(next);
    setTimeout(() => setAnimating(false), 1500);
  }

  function handleQuizAnswer(optIdx: number) {
    if (picked !== null) return;
    setPicked(optIdx);
    if (optIdx === QUIZ_QUESTIONS[quizIdx].correctIdx) {
      setScore((s) => s + 1);
    }
  }

  function nextQuiz() {
    if (quizIdx < QUIZ_QUESTIONS.length - 1) {
      setQuizIdx((i) => i + 1);
      setPicked(null);
    } else {
      setPhase("results");
      setDone(true);
      onComplete();
    }
  }

  // --- EXPLORE PHASE ---
  if (phase === "explore") {
    return (
      <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-5">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">Waveform Explorer</h3>
          <p className="text-slate-600 text-sm">
            Tap each sound to see what its waveform looks like! Explore all {SOUNDS.length} to unlock the quiz.
          </p>
        </div>

        {/* Sound buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {SOUNDS.map((s, i) => (
            <motion.button
              key={s.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => selectSound(i)}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border-2 transition-all ${
                activeSound === i
                  ? "border-violet-400 bg-violet-500/20"
                  : explored.has(i)
                  ? "border-violet-500/50 bg-space-800"
                  : "border-slate-200 bg-space-800"
              }`}
            >
              <span className="text-2xl">{s.emoji}</span>
              <span className="text-xs font-medium text-slate-900">{s.name}</span>
              {explored.has(i) && <span className="text-[10px] text-violet-400">✓</span>}
            </motion.button>
          ))}
        </div>

        {/* Waveform display */}
        {activeSound !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-space-800 rounded-xl p-4 border border-slate-200 space-y-3"
          >
            <p className="text-sm text-violet-300 font-semibold text-center">
              {SOUNDS[activeSound].emoji} {SOUNDS[activeSound].name} — {SOUNDS[activeSound].description}
            </p>

            {/* Waveform bars */}
            <div className="flex items-end justify-center gap-[3px] h-28 px-2">
              {SOUNDS[activeSound].waveform.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h * 10}%` }}
                  transition={{ delay: animating ? i * 0.06 : 0, duration: 0.3 }}
                  className={`w-3 sm:w-4 rounded-t-sm ${SOUNDS[activeSound].color} opacity-80`}
                />
              ))}
            </div>

            <p className="text-xs text-slate-400 text-center italic">
              {SOUNDS[activeSound].fact}
            </p>
          </motion.div>
        )}

        {/* Progress */}
        <div className="text-center">
          <p className="text-xs text-slate-400 mb-2">
            Explored: {explored.size} / {SOUNDS.length}
          </p>
          {explored.size === SOUNDS.length && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase("quiz")}
              className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-slate-900 font-bold rounded-lg"
            >
              Start the Quiz!
            </motion.button>
          )}
        </div>
      </div>
    );
  }

  // --- QUIZ PHASE ---
  if (phase === "quiz") {
    const q = QUIZ_QUESTIONS[quizIdx];
    return (
      <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-5">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">Waveform Quiz</h3>
          <p className="text-xs text-slate-400">
            Question {quizIdx + 1} of {QUIZ_QUESTIONS.length}
          </p>
        </div>

        <p className="text-slate-900 font-semibold text-center">{q.question}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {q.options.map((opt, i) => {
            let cls = "border-slate-200 bg-space-800 hover:border-violet-400";
            if (picked !== null) {
              if (i === q.correctIdx) cls = "border-green-400 bg-green-500/20";
              else if (i === picked) cls = "border-red-400 bg-red-500/20";
            }
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleQuizAnswer(i)}
                className={`p-3 rounded-lg border-2 text-slate-900 text-sm font-medium transition-all ${cls}`}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>

        {picked !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <p className={`text-sm font-semibold text-center ${picked === q.correctIdx ? "text-green-400" : "text-red-400"}`}>
              {picked === q.correctIdx ? "Correct!" : "Not quite!"}
            </p>
            <p className="text-xs text-slate-600 text-center">{q.explanation}</p>
            <div className="text-center">
              <button
                onClick={nextQuiz}
                className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-slate-900 font-bold rounded-lg text-sm"
              >
                {quizIdx < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "See Results"}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // --- RESULTS ---
  return (
    <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-5 text-center">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <p className="text-4xl mb-2">🎧</p>
        <h3 className="text-xl font-bold text-slate-900">Waveform Explorer Complete!</h3>
        <p className="text-violet-400 font-bold text-lg mt-2">
          Score: {score} / {QUIZ_QUESTIONS.length}
        </p>
        <p className="text-slate-600 text-sm mt-2">
          {score === QUIZ_QUESTIONS.length
            ? "Perfect score! You really understand how sound waves work!"
            : score >= 2
            ? "Great job! You're getting a feel for how AI sees sound."
            : "Good try! Sound is tricky — even AI has a hard time with it!"}
        </p>
        <p className="text-xs text-slate-400 mt-3">
          Fun fact: AI models like Whisper analyze waveforms as spectrograms —
          turning sound into images so they can &quot;see&quot; what they hear!
        </p>
      </motion.div>
    </div>
  );
}
