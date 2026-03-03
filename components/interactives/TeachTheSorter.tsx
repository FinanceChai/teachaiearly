"use client";

import { useState } from "react";

const TRAINING_DATA = [
  { id: "t1", emoji: "🍎", label: "Apple", correct: "fruit" },
  { id: "t2", emoji: "🥦", label: "Broccoli", correct: "veggie" },
  { id: "t3", emoji: "🍌", label: "Banana", correct: "fruit" },
  { id: "t4", emoji: "🥕", label: "Carrot", correct: "veggie" },
  { id: "t5", emoji: "🍇", label: "Grapes", correct: "fruit" },
  { id: "t6", emoji: "🥬", label: "Lettuce", correct: "veggie" },
];

const TEST_DATA = [
  { id: "test1", emoji: "🍓", label: "Strawberry", aiGuess: "fruit", correct: "fruit" },
  { id: "test2", emoji: "🥑", label: "Avocado", aiGuess: "veggie", correct: "fruit" },
  { id: "test3", emoji: "🌽", label: "Corn", aiGuess: "veggie", correct: "veggie" },
];

type Phase = "train" | "test" | "done";

export function TeachTheSorter({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("train");
  const [sorted, setSorted] = useState<Record<string, string>>({});
  const [testRevealed, setTestRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);

  const allSorted = TRAINING_DATA.every((t) => sorted[t.id]);
  const correctCount = TRAINING_DATA.filter((t) => sorted[t.id] === t.correct).length;
  const accuracy = Math.round((correctCount / TRAINING_DATA.length) * 100);

  function sort(id: string, category: string) {
    setSorted((prev) => ({ ...prev, [id]: category }));
  }

  function trainAI() {
    setPhase("test");
  }

  function handleDone() {
    setCompleted(true);
    onComplete();
  }

  if (phase === "train") {
    return (
      <div className="space-y-5">
        <div className="bg-space-800 rounded-2xl p-5 border border-green-500/30">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">🧠</div>
            <div className="font-black text-white">Train the Sorter!</div>
            <div className="text-sm text-slate-400 mt-1">
              Label each item so the AI can learn the difference between fruits and veggies.
            </div>
          </div>

          <div className="space-y-2">
            {TRAINING_DATA.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-space-900 rounded-xl px-4 py-3"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-white font-bold flex-1">{item.label}</span>
                <button
                  onClick={() => sort(item.id, "fruit")}
                  className={`px-4 py-2 rounded-xl text-sm font-black transition-all btn-press ${
                    sorted[item.id] === "fruit"
                      ? "bg-green-500 text-white"
                      : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                  }`}
                >
                  🍎 Fruit
                </button>
                <button
                  onClick={() => sort(item.id, "veggie")}
                  className={`px-4 py-2 rounded-xl text-sm font-black transition-all btn-press ${
                    sorted[item.id] === "veggie"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                  }`}
                >
                  🥦 Veggie
                </button>
              </div>
            ))}
          </div>

          {allSorted && (
            <div className="mt-4 space-y-3">
              <div className="bg-green-500/20 rounded-xl p-3 text-center">
                <div className="font-black text-green-300">
                  Your labels: {correctCount}/6 correct ({accuracy}% accuracy)
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {accuracy < 100
                    ? "Oops! A few are wrong — the AI will learn your mistakes too."
                    : "Perfect training data = better AI!"}
                </div>
              </div>
              <button
                onClick={trainAI}
                className="w-full py-4 rounded-2xl font-black text-white bg-green-500 hover:bg-green-400 btn-press transition-colors"
              >
                Train the AI! →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (phase === "test") {
    return (
      <div className="space-y-5">
        <div className="bg-space-800 rounded-2xl p-5 border border-green-500/30">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">🧪</div>
            <div className="font-black text-white">Test the AI!</div>
            <div className="text-sm text-slate-400 mt-1">
              Here are items the AI has never seen. What does it guess?
            </div>
          </div>

          {!testRevealed ? (
            <button
              onClick={() => setTestRevealed(true)}
              className="w-full py-4 rounded-2xl font-black text-white bg-green-500 hover:bg-green-400 btn-press transition-colors"
            >
              Show AI Predictions →
            </button>
          ) : (
            <div className="space-y-3">
              {TEST_DATA.map((item) => {
                const aiRight = item.aiGuess === item.correct;
                return (
                  <div
                    key={item.id}
                    className="bg-space-900 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{item.emoji}</span>
                      <div>
                        <div className="font-black text-white">{item.label}</div>
                        <div className="text-xs text-slate-400">New — never seen before!</div>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-bold px-3 py-2 rounded-lg ${
                        aiRight
                          ? "bg-green-500/20 text-green-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      AI guessed: {item.aiGuess === "fruit" ? "🍎 Fruit" : "🥦 Veggie"}{" "}
                      {aiRight ? "✓ Correct!" : `✗ (It's actually a ${item.correct})`}
                    </div>
                  </div>
                );
              })}

              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mt-2">
                <div className="font-black text-green-300 mb-1">Key takeaway 🎯</div>
                <p className="text-slate-300 text-sm">
                  The AI learned patterns from your labels — that's supervised learning. It can now
                  sort things it was never explicitly taught. But it's not perfect (avocado tricked it!).
                </p>
              </div>

              {!completed && (
                <button
                  onClick={handleDone}
                  className="w-full py-4 rounded-2xl font-black text-white bg-green-500 hover:bg-green-400 btn-press transition-colors"
                >
                  Got it! ✓
                </button>
              )}

              {completed && (
                <div className="bg-green-500/20 border border-green-500/40 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">🎉</div>
                  <div className="font-black text-green-300">Activity Complete!</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
