"use client";

import { useState } from "react";

type Category = {
  id: string;
  label: string;
  emoji: string;
  examples: string[];
  testItems: { emoji: string; label: string; correct: boolean }[];
};

const CATEGORIES: Category[] = [
  {
    id: "animals",
    label: "Animals vs. Objects",
    emoji: "🐾",
    examples: ["🐶 Dog", "🐱 Cat", "🐦 Bird", "🐟 Fish", "🐰 Rabbit"],
    testItems: [
      { emoji: "🐸", label: "Frog", correct: true },
      { emoji: "🚗", label: "Car", correct: false },
      { emoji: "🦊", label: "Fox", correct: true },
      { emoji: "📱", label: "Phone", correct: false },
    ],
  },
  {
    id: "weather",
    label: "Sunny vs. Rainy Days",
    emoji: "🌤️",
    examples: ["☀️ Sunny", "🌞 Bright", "🌈 After rain", "⛅ Partly cloudy", "🌤️ Mostly sunny"],
    testItems: [
      { emoji: "🌧️", label: "Rainy", correct: false },
      { emoji: "☀️", label: "Clear sky", correct: true },
      { emoji: "⛈️", label: "Thunderstorm", correct: false },
      { emoji: "🌟", label: "Starry night", correct: true },
    ],
  },
  {
    id: "food",
    label: "Healthy vs. Junk Food",
    emoji: "🥗",
    examples: ["🥦 Broccoli", "🍎 Apple", "🥕 Carrot", "🫐 Blueberries", "🥗 Salad"],
    testItems: [
      { emoji: "🍕", label: "Pizza", correct: false },
      { emoji: "🍇", label: "Grapes", correct: true },
      { emoji: "🍔", label: "Burger", correct: false },
      { emoji: "🥑", label: "Avocado", correct: true },
    ],
  },
];

type Phase = "pick" | "train" | "test" | "result";

export function TrainClassifierChallenge({ onComplete }: { onComplete: (passed: boolean) => void }) {
  const [phase, setPhase] = useState<Phase>("pick");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [trainedCount, setTrainedCount] = useState(0);
  const [training, setTraining] = useState(false);
  const [testAnswers, setTestAnswers] = useState<boolean[]>([]);
  const [currentTest, setCurrentTest] = useState(0);
  const [testRevealed, setTestRevealed] = useState(false);

  function pickCategory(cat: Category) {
    setSelectedCategory(cat);
    setPhase("train");
  }

  function addExample() {
    if (training || !selectedCategory) return;
    setTraining(true);
    setTimeout(() => {
      setTrainedCount((c) => {
        const next = c + 1;
        if (next >= selectedCategory.examples.length) {
          setPhase("test");
        }
        return next;
      });
      setTraining(false);
    }, 600);
  }

  function pickTestAnswer(isPositive: boolean) {
    if (testRevealed || !selectedCategory) return;
    const item = selectedCategory.testItems[currentTest];
    const correct = isPositive === item.correct;
    setTestAnswers((prev) => [...prev, correct]);
    setTestRevealed(true);
  }

  function nextTest() {
    if (!selectedCategory) return;
    if (currentTest < selectedCategory.testItems.length - 1) {
      setCurrentTest((c) => c + 1);
      setTestRevealed(false);
    } else {
      setPhase("result");
      const score = [...testAnswers, testAnswers[testAnswers.length - 1]].filter(Boolean).length;
      onComplete(score >= 3);
    }
  }

  const categoryLabel = selectedCategory?.label.split(" vs. ")[0] ?? "";

  if (phase === "pick") {
    return (
      <div className="space-y-5">
        <div className="bg-space-800 rounded-2xl p-5 border border-green-500/30">
          <div className="text-center mb-5">
            <div className="text-3xl mb-2">🏗️</div>
            <div className="font-black text-white">Build Your Classifier!</div>
            <div className="text-sm text-slate-400 mt-1">
              Pick a category to classify. You'll train the AI, then test it.
            </div>
          </div>
          <div className="space-y-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => pickCategory(cat)}
                className="w-full flex items-center gap-4 bg-space-900 hover:bg-slate-700 border border-slate-700 hover:border-green-500/50 rounded-xl p-4 text-left transition-all btn-press"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <div>
                  <div className="font-black text-white">{cat.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {cat.examples.length} training examples · {cat.testItems.length} test items
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "train" && selectedCategory) {
    const done = trainedCount >= selectedCategory.examples.length;
    return (
      <div className="space-y-5">
        <div className="bg-space-800 rounded-2xl p-5 border border-green-500/30">
          <div className="text-center mb-4">
            <div className="text-xs font-black text-green-400 mb-1">TRAINING PHASE</div>
            <div className="font-black text-white">{selectedCategory.label}</div>
          </div>

          <div className="bg-space-900 rounded-xl p-4 mb-4">
            <div className="text-xs font-black text-slate-400 mb-3">TRAINING EXAMPLES ADDED</div>
            <div className="space-y-2">
              {selectedCategory.examples.slice(0, trainedCount).map((ex, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-lg">{ex.split(" ")[0]}</span>
                  <span className="text-green-300 font-bold">{ex.split(" ").slice(1).join(" ")}</span>
                  <span className="ml-auto text-xs text-green-500 font-bold">✓ Learned</span>
                </div>
              ))}
              {trainedCount < selectedCategory.examples.length && (
                <div className="flex items-center gap-3 text-sm opacity-40">
                  <span className="text-lg">{selectedCategory.examples[trainedCount].split(" ")[0]}</span>
                  <span className="text-slate-400 font-bold">{selectedCategory.examples[trainedCount].split(" ").slice(1).join(" ")}</span>
                  <span className="ml-auto text-xs text-slate-600 font-bold">Next...</span>
                </div>
              )}
            </div>
            {/* Progress bar */}
            <div className="mt-3 bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${(trainedCount / selectedCategory.examples.length) * 100}%` }}
              />
            </div>
            <div className="text-xs text-slate-400 mt-1 font-bold text-right">
              {trainedCount}/{selectedCategory.examples.length} examples
            </div>
          </div>

          {!done ? (
            <button
              onClick={addExample}
              disabled={training}
              className="w-full py-4 rounded-2xl font-black text-white bg-green-500 hover:bg-green-400 btn-press transition-all disabled:opacity-60"
            >
              {training ? "Learning... ⚙️" : "Add Training Example →"}
            </button>
          ) : (
            <button
              onClick={() => setPhase("test")}
              className="w-full py-4 rounded-2xl font-black text-white bg-teal-500 hover:bg-teal-400 btn-press transition-colors"
            >
              Training Complete — Test It! 🧪
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase === "test" && selectedCategory) {
    const item = selectedCategory.testItems[currentTest];
    const [posLabel, negLabel] = selectedCategory.label.split(" vs. ");
    const userAnswer = testAnswers[currentTest];
    const correct = userAnswer;

    return (
      <div className="space-y-5">
        <div className="bg-space-800 rounded-2xl p-5 border border-green-500/30">
          <div className="text-center mb-4">
            <div className="text-xs font-black text-green-400 mb-1">TESTING PHASE</div>
            <div className="text-sm text-slate-400">
              Question {currentTest + 1} of {selectedCategory.testItems.length}
            </div>
          </div>

          <div className="flex gap-1.5 mb-4">
            {selectedCategory.testItems.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  i < currentTest
                    ? testAnswers[i] ? "bg-green-500" : "bg-red-500"
                    : i === currentTest ? "bg-teal-400" : "bg-slate-700"
                }`}
              />
            ))}
          </div>

          <div className="bg-space-900 rounded-xl p-6 text-center mb-4">
            <div className="text-6xl mb-3">{item.emoji}</div>
            <div className="font-black text-white text-xl">{item.label}</div>
            <div className="text-sm text-slate-400 mt-1">Is this "{posLabel}" or "{negLabel}"?</div>
          </div>

          {!testRevealed ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => pickTestAnswer(true)}
                className="py-4 rounded-xl font-black text-green-300 bg-green-500/20 border border-green-500/40 hover:bg-green-500/30 btn-press transition-all"
              >
                {posLabel}
              </button>
              <button
                onClick={() => pickTestAnswer(false)}
                className="py-4 rounded-xl font-black text-red-300 bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 btn-press transition-all"
              >
                {negLabel}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div
                className={`p-4 rounded-xl text-center ${
                  correct
                    ? "bg-green-500/20 border border-green-500/30"
                    : "bg-red-500/20 border border-red-500/30"
                }`}
              >
                <div className={`font-black ${correct ? "text-green-300" : "text-red-300"}`}>
                  {correct ? "✓ Your classifier got it right!" : "✗ Your classifier missed this one."}
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  It's actually: {item.correct ? posLabel : negLabel}
                </div>
              </div>
              <button
                onClick={nextTest}
                className="w-full py-4 rounded-xl font-black text-white bg-teal-500 hover:bg-teal-400 btn-press transition-colors"
              >
                {currentTest < selectedCategory.testItems.length - 1 ? "Next Test →" : "See Results →"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const score = testAnswers.filter(Boolean).length;
    const total = selectedCategory?.testItems.length ?? 4;
    const passed = score >= 3;
    return (
      <div className="text-center space-y-5 py-4">
        <div className="text-7xl">{passed ? "📊" : "📉"}</div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{total}</div>
          <div className={`text-xl font-bold mt-2 ${passed ? "text-green-300" : "text-amber-300"}`}>
            {passed ? "Data Trainer Badge Earned!" : "Keep practicing!"}
          </div>
          <p className="text-slate-400 mt-2 text-sm">
            {passed
              ? "Your classifier worked! You understand how supervised learning creates AI models."
              : `You got ${score}/${total}. You need 3/4 to pass — try again!`}
          </p>
        </div>
        {passed && (
          <div className="bg-green-500/20 border border-green-500/40 rounded-2xl p-4">
            <div className="font-black text-green-300">Challenge Complete! 🎉</div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
