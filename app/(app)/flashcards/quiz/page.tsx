"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  FLASHCARDS,
  getFlashcardsByWorld,
  Flashcard,
} from "@/lib/flashcards-data";
import { WORLDS } from "@/lib/course-data";
import { motion } from "framer-motion";

const SAVED_KEY = "ai_explorer_saved_cards";

type Phase = "setup" | "quiz" | "results";

interface QuizQuestion {
  card: Flashcard;
  options: string[];
  correctIndex: number;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(cards: Flashcard[], count: number): QuizQuestion[] {
  const selected = shuffleArray(cards).slice(0, count);
  return selected.map((card) => {
    // Pick 3 distractors from other cards
    const others = FLASHCARDS.filter((fc) => fc.id !== card.id);
    const distractors = shuffleArray(others)
      .slice(0, 3)
      .map((fc) => fc.definition);

    const allOptions = shuffleArray([card.definition, ...distractors]);
    const correctIndex = allOptions.indexOf(card.definition);

    return { card, options: allOptions, correctIndex };
  });
}

export default function QuizPage() {
  const router = useRouter();

  // ── Phase state ──
  const [phase, setPhase] = useState<Phase>("setup");

  // ── Setup state ──
  const [selectedWorlds, setSelectedWorlds] = useState<number[]>([]);
  const [cardCount, setCardCount] = useState(10);

  // ── Quiz state ──
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<QuizQuestion[]>([]);

  // Available cards based on world selection
  const availableCards = useMemo(() => {
    if (selectedWorlds.length === 0) return FLASHCARDS;
    return selectedWorlds.flatMap((wid) => getFlashcardsByWorld(wid));
  }, [selectedWorlds]);

  function toggleWorld(wid: number) {
    setSelectedWorlds((prev) =>
      prev.includes(wid) ? prev.filter((w) => w !== wid) : [...prev, wid]
    );
  }

  function toggleAllWorlds() {
    if (selectedWorlds.length === 0) return; // already "all"
    setSelectedWorlds([]);
  }

  function startQuiz() {
    const q = buildQuestions(availableCards, cardCount);
    setQuestions(q);
    setCurrentQ(0);
    setPicked(null);
    setScore(0);
    setMissed([]);
    setPhase("quiz");
  }

  function pickAnswer(idx: number) {
    if (picked !== null) return; // already answered
    setPicked(idx);
    const q = questions[currentQ];
    if (idx === q.correctIndex) {
      setScore((s) => s + 1);
    } else {
      setMissed((m) => [...m, q]);
    }
  }

  function nextQuestion() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setPicked(null);
    } else {
      setPhase("results");
    }
  }

  function saveMissedCards() {
    try {
      const existing: string[] = JSON.parse(
        localStorage.getItem(SAVED_KEY) || "[]"
      );
      const missedIds = missed.map((q) => q.card.id);
      const merged = Array.from(new Set([...existing, ...missedIds]));
      localStorage.setItem(SAVED_KEY, JSON.stringify(merged));
    } catch {
      // ignore
    }
  }

  function getScoreEmoji() {
    const pct = score / questions.length;
    if (pct === 1) return "🏆";
    if (pct >= 0.8) return "🌟";
    if (pct >= 0.6) return "👍";
    if (pct >= 0.4) return "📚";
    return "💪";
  }

  // ══════════════════════════════════
  // Phase 1: Setup
  // ══════════════════════════════════
  if (phase === "setup") {
    return (
      <div className="min-h-screen bg-space-900">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Back link */}
          <button
            onClick={() => router.push("/flashcards")}
            className="text-slate-400 hover:text-white text-sm font-bold mb-6 inline-block"
          >
            ← Back to Cards
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white">🧠 Quiz Setup</h1>
            <p className="text-slate-400 mt-1">
              Choose your worlds and card count
            </p>
          </div>

          {/* World selection */}
          <div className="bg-space-800 rounded-2xl border border-slate-700 p-5 mb-6">
            <h2 className="text-sm font-black text-white mb-3">
              Select Worlds
            </h2>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedWorlds.length === 0}
                  onChange={toggleAllWorlds}
                  className="w-4 h-4 rounded accent-teal-500"
                />
                <span
                  className={`text-sm font-bold ${
                    selectedWorlds.length === 0
                      ? "text-teal-400"
                      : "text-slate-400"
                  }`}
                >
                  All Worlds ({FLASHCARDS.length} cards)
                </span>
              </label>
              {WORLDS.filter((w) => getFlashcardsByWorld(w.id).length > 0).map(
                (w) => (
                  <label
                    key={w.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedWorlds.includes(w.id)}
                      onChange={() => toggleWorld(w.id)}
                      className="w-4 h-4 rounded accent-teal-500"
                    />
                    <span
                      className={`text-sm font-bold ${
                        selectedWorlds.includes(w.id)
                          ? "text-white"
                          : "text-slate-400"
                      }`}
                    >
                      {w.emoji} {w.title} ({getFlashcardsByWorld(w.id).length})
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Card count */}
          <div className="bg-space-800 rounded-2xl border border-slate-700 p-5 mb-6">
            <h2 className="text-sm font-black text-white mb-3">
              Number of Questions
            </h2>
            <div className="flex gap-3">
              {[5, 10, 15, 20].map((n) => (
                <button
                  key={n}
                  onClick={() => setCardCount(n)}
                  className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${
                    cardCount === n
                      ? "bg-teal-500 text-white shadow-lg"
                      : "bg-space-900 text-slate-400 border border-slate-700 hover:text-white"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">
              {availableCards.length} cards available
            </p>
          </div>

          {/* Start button */}
          <button
            onClick={startQuiz}
            disabled={cardCount > availableCards.length}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-white font-black text-lg py-4 rounded-2xl btn-press transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {cardCount > availableCards.length
              ? `Not enough cards (need ${cardCount}, have ${availableCards.length})`
              : "Start Quiz"}
          </button>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════
  // Phase 2: Quiz
  // ══════════════════════════════════
  if (phase === "quiz") {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-space-900">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-slate-400 font-bold mb-2">
              <span>
                Question {currentQ + 1} of {questions.length}
              </span>
              <span>Score: {score}</span>
            </div>
            <div className="h-2 bg-space-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Term */}
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-space-800 rounded-3xl border border-slate-700 p-8 mb-6 text-center"
          >
            <p className="text-xs text-teal-400 font-bold uppercase tracking-wider mb-3">
              What is the definition of...
            </p>
            <h2 className="text-2xl font-black text-white">{q.card.term}</h2>
          </motion.div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {q.options.map((option, idx) => {
              let classes =
                "w-full text-left p-4 rounded-2xl border text-sm font-bold transition-all ";

              if (picked === null) {
                classes +=
                  "bg-space-800 border-slate-700 text-slate-200 hover:border-teal-500 hover:text-white cursor-pointer";
              } else if (idx === q.correctIndex) {
                classes +=
                  "bg-teal-500/20 border-teal-500 text-teal-300";
              } else if (idx === picked) {
                classes +=
                  "bg-red-500/20 border-red-500 text-red-300";
              } else {
                classes +=
                  "bg-space-800 border-slate-700 text-slate-500";
              }

              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => pickAnswer(idx)}
                  disabled={picked !== null}
                  className={classes}
                >
                  <span className="mr-2 text-slate-500">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {option}
                </motion.button>
              );
            })}
          </div>

          {/* Next button (visible after picking) */}
          {picked !== null && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-white font-black text-lg py-4 rounded-2xl btn-press transition-all shadow-lg"
            >
              {currentQ < questions.length - 1 ? "Next Question →" : "See Results"}
            </motion.button>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════
  // Phase 3: Results
  // ══════════════════════════════════
  return (
    <div className="min-h-screen bg-space-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Score display */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-3">{getScoreEmoji()}</div>
          <h1 className="text-4xl font-black text-white mb-1">
            {score}/{questions.length}
          </h1>
          <p className="text-slate-400 font-bold">
            {score === questions.length
              ? "Perfect score!"
              : score >= questions.length * 0.8
              ? "Great job!"
              : score >= questions.length * 0.6
              ? "Good effort!"
              : "Keep studying!"}
          </p>
        </motion.div>

        {/* Missed cards */}
        {missed.length > 0 && (
          <div className="bg-space-800 rounded-2xl border border-slate-700 p-5 mb-6">
            <h2 className="text-sm font-black text-white mb-3">
              Cards to Review ({missed.length})
            </h2>
            <div className="space-y-3">
              {missed.map((q, i) => (
                <div
                  key={i}
                  className="bg-space-900 rounded-xl p-4 border border-red-500/20"
                >
                  <p className="text-sm font-black text-white mb-1">
                    {q.card.term}
                  </p>
                  <p className="text-xs text-slate-400">
                    {q.card.definition}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                saveMissedCards();
                alert("Missed cards saved!");
              }}
              className="w-full mt-4 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-black text-sm py-3 rounded-xl transition-all border border-teal-500/30"
            >
              ★ Save Missed Cards
            </button>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              setPhase("setup");
              setPicked(null);
              setCurrentQ(0);
              setScore(0);
              setMissed([]);
            }}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-white font-black text-lg py-4 rounded-2xl btn-press transition-all shadow-lg"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/flashcards")}
            className="w-full bg-space-800 border border-slate-700 hover:border-teal-500 text-white font-black text-sm py-3 rounded-2xl transition-all"
          >
            Back to Cards
          </button>
        </div>
      </div>
    </div>
  );
}
