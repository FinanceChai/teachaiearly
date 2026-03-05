"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PATTERNS = [
  {
    name: "Simple Beat",
    emoji: "🥁",
    grid: [
      { instrument: "Kick",  hits: [1, 0, 0, 0, 1, 0, 0, 0] },
      { instrument: "Snare", hits: [0, 0, 1, 0, 0, 0, 1, 0] },
      { instrument: "Hat",   hits: [1, 1, 1, 1, 1, 1, 1, 1] },
    ],
    description: "This is a basic rock beat. AI learns these patterns from thousands of songs.",
  },
  {
    name: "Syncopated",
    emoji: "🎵",
    grid: [
      { instrument: "Kick",  hits: [1, 0, 0, 1, 0, 0, 1, 0] },
      { instrument: "Snare", hits: [0, 0, 1, 0, 0, 1, 0, 0] },
      { instrument: "Hat",   hits: [1, 0, 1, 1, 0, 1, 1, 0] },
    ],
    description: "Syncopation puts beats in unexpected places. AI can learn these patterns but doesn't feel the groove.",
  },
  {
    name: "Complex",
    emoji: "🎶",
    grid: [
      { instrument: "Kick",  hits: [1, 0, 1, 0, 0, 1, 0, 1] },
      { instrument: "Snare", hits: [0, 1, 0, 0, 1, 0, 1, 0] },
      { instrument: "Hat",   hits: [1, 1, 0, 1, 1, 0, 1, 1] },
    ],
    description: "Complex rhythms emerge from combining simple patterns. AI can generate these but a human decides what feels right.",
  },
];

const FACTS = [
  { title: "Pattern Recognition", icon: "🔍", text: "AI analyzes thousands of songs to find common patterns: which notes follow which, how rhythms flow, what chords go together." },
  { title: "Generation", icon: "🎹", text: "Like text AI predicts the next word, music AI predicts the next note. It builds melodies one note at a time based on learned patterns." },
  { title: "No Feeling", icon: "💭", text: "AI doesn't feel the emotion in music. It doesn't know why a minor key sounds sad or why a beat makes you want to dance." },
  { title: "Human + AI", icon: "🤝", text: "The best AI music happens when humans guide the creative vision and AI handles execution. You're the composer, AI is the instrument." },
];

const QUIZ = [
  {
    question: "How does AI compose music?",
    options: ["It feels emotions and expresses them", "It predicts the next note based on patterns", "It records real musicians secretly", "It randomly generates sounds"],
    correct: 1,
    explanation: "Just like language AI predicts the next word, music AI predicts the next note based on patterns it learned from thousands of songs.",
  },
  {
    question: "What can a human musician do that AI cannot?",
    options: ["Play notes in sequence", "Follow a time signature", "Decide what emotion to express and why", "Generate melodies quickly"],
    correct: 2,
    explanation: "Humans choose what to express based on their emotions, experiences, and artistic vision. AI has no emotions or intentions — it only has patterns.",
  },
  {
    question: "Why might two AI-generated songs from the same prompt sound different?",
    options: ["The AI made a mistake", "Randomness in the generation process", "Different instruments were available", "The AI got tired"],
    correct: 1,
    explanation: "Like image generation, music AI uses randomness. Each generation takes a slightly different path through the possibilities, creating unique results.",
  },
];

export function BeatBuilder({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"beats" | "facts" | "quiz">("beats");
  const [beatIdx, setBeatIdx] = useState(0);
  const [userGrid, setUserGrid] = useState<number[][]>(
    PATTERNS[0].grid.map((row) => [...row.hits])
  );
  const [factIdx, setFactIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function toggleCell(row: number, col: number) {
    setUserGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = next[row][col] ? 0 : 1;
      return next;
    });
  }

  function loadPattern(idx: number) {
    setBeatIdx(idx);
    setUserGrid(PATTERNS[idx].grid.map((row) => [...row.hits]));
  }

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
          {score >= QUIZ.length - 1 ? "🎵" : "🎶"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{QUIZ.length}</div>
          <div className="text-slate-300 mt-2">
            {score === QUIZ.length ? "Perfect! You understand AI music generation." : score >= 2 ? "Great understanding of AI and music!" : "Music AI is fascinating — now you know the basics!"}
          </div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/40 rounded-2xl p-4">
          <div className="font-black text-blue-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">AI composes by predicting the next note based on patterns. But choosing WHAT to create and WHY — that&apos;s still a human superpower.</p>
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
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < quizIdx ? "bg-blue-500" : i === quizIdx ? "bg-blue-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-blue-400 mb-1">MUSIC AI QUIZ</div>
          <div className="text-white font-black text-lg mb-4">{q.question}</div>
          {picked === null ? (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <motion.button key={i} onClick={() => pickAnswer(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-xl border border-slate-700 bg-space-900 font-bold text-white text-sm hover:border-blue-500/50 transition-colors">
                  {opt}
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${picked === q.correct ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                {picked === q.correct ? "Correct! " : `Answer: "${q.options[q.correct]}." `}
                <span className="font-normal text-slate-300">{q.explanation}</span>
              </div>
              <button onClick={nextQuiz} className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors">
                {quizIdx < QUIZ.length - 1 ? "Next Question" : "See Results"} &rarr;
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (phase === "facts") {
    const fact = FACTS[factIdx];
    return (
      <div className="space-y-5">
        <div className="flex gap-1.5">
          {FACTS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < factIdx ? "bg-blue-500" : i === factIdx ? "bg-blue-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-blue-400 mb-1">HOW AI MAKES MUSIC</div>

          <motion.div key={factIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-space-900 rounded-xl p-5 border border-slate-600 text-center mb-4">
            <div className="text-5xl mb-3">{fact.icon}</div>
            <div className="text-xl font-black text-white mb-2">{fact.title}</div>
            <div className="text-slate-300 text-sm">{fact.text}</div>
          </motion.div>

          <button
            onClick={() => {
              if (factIdx < FACTS.length - 1) setFactIdx((f) => f + 1);
              else setPhase("quiz");
            }}
            className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors"
          >
            {factIdx < FACTS.length - 1 ? "Next" : "Test Your Knowledge"} &rarr;
          </button>
        </div>
      </div>
    );
  }

  // Beats phase
  const pattern = PATTERNS[beatIdx];
  return (
    <div className="space-y-5">
      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-blue-400 mb-1">BEAT BUILDER</div>
        <div className="text-sm text-slate-400 font-bold mb-4">
          Tap cells to toggle beats. AI learns patterns like these from thousands of songs.
        </div>

        {/* Pattern selector */}
        <div className="flex gap-2 mb-4">
          {PATTERNS.map((p, i) => (
            <button key={i} onClick={() => loadPattern(i)} className={`px-3 py-2 rounded-xl text-sm font-bold transition-colors ${i === beatIdx ? "bg-blue-500/20 text-blue-300 border border-blue-500/40" : "bg-space-900 text-slate-400 border border-slate-700"}`}>
              {p.emoji} {p.name}
            </button>
          ))}
        </div>

        {/* Beat grid */}
        <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-4">
          {pattern.grid.map((row, rIdx) => (
            <div key={rIdx} className="flex items-center gap-2 mb-2 last:mb-0">
              <div className="w-14 text-xs font-bold text-slate-400 text-right">{row.instrument}</div>
              <div className="flex gap-1.5 flex-1">
                {userGrid[rIdx].map((hit, cIdx) => (
                  <motion.button
                    key={cIdx}
                    onClick={() => toggleCell(rIdx, cIdx)}
                    whileTap={{ scale: 0.85 }}
                    className={`flex-1 h-10 rounded-lg font-black text-sm transition-all ${
                      hit ? "bg-blue-500 text-white border border-blue-400" : "bg-space-800 border border-slate-700 text-slate-600"
                    }`}
                  >
                    {hit ? "●" : "○"}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-sm text-slate-300 mb-4">
          <strong className="text-blue-300">{pattern.name}: </strong>{pattern.description}
        </div>

        <button onClick={() => setPhase("facts")} className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors">
          How AI Makes Music &rarr;
        </button>
      </div>
    </div>
  );
}
