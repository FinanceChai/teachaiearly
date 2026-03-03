"use client";

import { useState } from "react";

const RULE_ITEMS = [
  { id: "red", emoji: "🔴", label: "Red", result: "STOP ✓", correct: true },
  { id: "green", emoji: "🟢", label: "Green", result: "GO ✓", correct: true },
  { id: "yellow", emoji: "🟡", label: "Yellow", result: "ERROR! ⚠️", correct: false },
  { id: "blue", emoji: "🔵", label: "Blue", result: "ERROR! ⚠️", correct: false },
  { id: "orange", emoji: "🟠", label: "Orange", result: "ERROR! ⚠️", correct: false },
];

const TRAINING_ITEMS = [
  { id: "cat1", emoji: "🐱", label: "Cat", category: "A" },
  { id: "dog1", emoji: "🐶", label: "Dog", category: "B" },
  { id: "cat2", emoji: "😺", label: "Kitten", category: "A" },
  { id: "dog2", emoji: "🦮", label: "Puppy", category: "B" },
];

const TEST_ITEMS = [
  { id: "frog", emoji: "🐸", label: "Frog", aiCategory: "Unknown — never trained!" },
  { id: "cat3", emoji: "🐈", label: "Tabby", aiCategory: "Category A (Cats!)" },
];

type AIPhase = "train" | "test" | "done";

export function RuleRobotVsAI({ onComplete }: { onComplete: () => void }) {
  const [ruleResults, setRuleResults] = useState<Record<string, string>>({});
  const [aiPhase, setAIPhase] = useState<AIPhase>("train");
  const [sorted, setSorted] = useState<Record<string, string>>({});
  const [testResults, setTestResults] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  function clickRuleItem(item: (typeof RULE_ITEMS)[0]) {
    setRuleResults((prev) => ({ ...prev, [item.id]: item.result }));
  }

  function sortItem(itemId: string, category: "A" | "B") {
    setSorted((prev) => ({ ...prev, [itemId]: category }));
  }

  const allSorted = TRAINING_ITEMS.every((t) => sorted[t.id]);

  function runTest() {
    setAIPhase("test");
    setTestResults(TEST_ITEMS.map((t) => t.aiCategory));
  }

  function handleDone() {
    setCompleted(true);
    onComplete();
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Rule Robot */}
        <div className="bg-space-800 rounded-2xl p-5 border border-red-500/30">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">🤖</div>
            <div className="font-black text-white text-sm">Rule Robot</div>
            <div className="text-xs text-slate-400">Knows: 🔴=STOP, 🟢=GO</div>
          </div>
          <div className="space-y-2">
            {RULE_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => clickRuleItem(item)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-space-900 hover:bg-slate-700 transition-colors text-sm"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-slate-300 font-bold flex-1 text-left">{item.label}</span>
                {ruleResults[item.id] && (
                  <span
                    className={`text-xs font-black ${
                      item.correct ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {ruleResults[item.id]}
                  </span>
                )}
              </button>
            ))}
          </div>
          {Object.keys(ruleResults).length >= 3 && (
            <div className="mt-3 bg-red-500/20 rounded-xl p-3 text-xs text-red-300 font-bold text-center">
              ⚠️ Rule Robot can't handle things it wasn't programmed for!
            </div>
          )}
        </div>

        {/* AI Robot */}
        <div className="bg-space-800 rounded-2xl p-5 border border-teal-500/30">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">🧠</div>
            <div className="font-black text-white text-sm">AI Robot</div>
            <div className="text-xs text-slate-400">
              {aiPhase === "train" ? "Needs training!" : "Trained!"}
            </div>
          </div>

          {aiPhase === "train" && (
            <>
              <div className="text-xs text-slate-400 mb-2 font-bold">
                Sort into Category A or B:
              </div>
              <div className="space-y-2">
                {TRAINING_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center gap-1">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-xs text-slate-300 flex-1">{item.label}</span>
                    <button
                      onClick={() => sortItem(item.id, "A")}
                      className={`text-xs px-2 py-1 rounded-lg font-bold transition-all ${
                        sorted[item.id] === "A"
                          ? "bg-teal-500 text-white"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => sortItem(item.id, "B")}
                      className={`text-xs px-2 py-1 rounded-lg font-bold transition-all ${
                        sorted[item.id] === "B"
                          ? "bg-teal-500 text-white"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      B
                    </button>
                  </div>
                ))}
              </div>
              {allSorted && (
                <button
                  onClick={runTest}
                  className="w-full mt-3 bg-teal-500 hover:bg-teal-400 text-white font-black text-sm py-2 rounded-xl transition-colors"
                >
                  Test the AI →
                </button>
              )}
            </>
          )}

          {aiPhase === "test" && (
            <>
              <div className="text-xs text-slate-400 mb-2 font-bold">New items — AI guesses:</div>
              <div className="space-y-2">
                {TEST_ITEMS.map((item, i) => (
                  <div key={item.id} className="bg-space-900 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{item.emoji}</span>
                      <span className="text-sm text-white font-bold">{item.label}</span>
                    </div>
                    <div className="text-xs text-teal-400 font-bold">
                      AI says: {testResults[i]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-teal-500/20 rounded-xl p-3 text-xs text-teal-300 font-bold text-center">
                ✨ AI handles new things it wasn't explicitly taught!
              </div>
            </>
          )}
        </div>
      </div>

      {aiPhase === "test" && !completed && (
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="font-black text-white mb-2">What did you learn?</div>
          <p className="text-slate-300 text-sm">
            The Rule Robot breaks with anything outside its rules. The AI Robot learned from examples
            and could even handle a frog it had never seen before!
          </p>
          <button
            onClick={handleDone}
            className="w-full mt-4 bg-teal-500 hover:bg-teal-400 text-white font-black py-3 rounded-xl transition-colors"
          >
            Got it! ✓
          </button>
        </div>
      )}

      {completed && (
        <div className="bg-green-500/20 border border-green-500/40 rounded-2xl p-4 text-center">
          <div className="text-2xl mb-1">🎉</div>
          <div className="font-black text-green-300">Activity Complete!</div>
        </div>
      )}
    </div>
  );
}
