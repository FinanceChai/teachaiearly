"use client";

import { useState } from "react";

type Ingredient = {
  id: string;
  emoji: string;
  label: string;
  good: boolean;
  reason: string;
};

const ALL_INGREDIENTS: Ingredient[] = [
  { id: "a", emoji: "📸", label: "Diverse photos", good: true, reason: "Diverse data makes AI fairer and more accurate." },
  { id: "b", emoji: "📷", label: "Only one angle", good: false, reason: "AI trained on one angle will fail when it sees others." },
  { id: "c", emoji: "✅", label: "Accurate labels", good: true, reason: "Correct labels teach AI the right patterns." },
  { id: "d", emoji: "❌", label: "Wrong labels", good: false, reason: "Garbage labels = garbage AI. It learns your mistakes!" },
  { id: "e", emoji: "🌍", label: "Lots of examples", good: true, reason: "More examples = better pattern recognition." },
  { id: "f", emoji: "📁", label: "Tiny dataset", good: false, reason: "Too few examples and AI will just memorize, not generalize." },
  { id: "g", emoji: "⚖️", label: "Balanced classes", good: true, reason: "If one category dominates, AI ignores the rest." },
  { id: "h", emoji: "📉", label: "Mostly one type", good: false, reason: "Imbalanced data creates biased AI that favors the majority." },
];

export function DataChef({ onComplete }: { onComplete: () => void }) {
  const [bowl, setBowl] = useState<string[]>([]);
  const [cooked, setCooked] = useState(false);
  const [completed, setCompleted] = useState(false);

  function toggle(id: string) {
    if (cooked) return;
    setBowl((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  function cook() {
    setCooked(true);
  }

  function handleDone() {
    setCompleted(true);
    onComplete();
  }

  const selected = ALL_INGREDIENTS.filter((i) => bowl.includes(i.id));
  const goodCount = selected.filter((i) => i.good).length;
  const badCount = selected.filter((i) => !i.good).length;
  const quality = bowl.length === 0 ? 0 : Math.round((goodCount / selected.length) * 100);

  let result = { emoji: "🤖", label: "Decent AI", color: "text-teal-300", bg: "bg-teal-500/20 border-teal-500/30" };
  if (bowl.length === 0) {
    result = { emoji: "❓", label: "No data, no AI!", color: "text-slate-400", bg: "bg-slate-700/50 border-slate-600" };
  } else if (quality === 100) {
    result = { emoji: "🏆", label: "Perfect AI Model!", color: "text-yellow-300", bg: "bg-yellow-500/20 border-yellow-500/30" };
  } else if (quality >= 75) {
    result = { emoji: "🤖", label: "Pretty Good AI", color: "text-green-300", bg: "bg-green-500/20 border-green-500/30" };
  } else if (quality >= 50) {
    result = { emoji: "😕", label: "Mediocre AI", color: "text-amber-300", bg: "bg-amber-500/20 border-amber-500/30" };
  } else {
    result = { emoji: "💩", label: "Garbage AI", color: "text-red-300", bg: "bg-red-500/20 border-red-500/30" };
  }

  return (
    <div className="space-y-5">
      <div className="bg-space-800 rounded-2xl p-5 border border-green-500/30">
        <div className="text-center mb-4">
          <div className="text-3xl mb-2">👨‍🍳</div>
          <div className="font-black text-white">Data Chef</div>
          <div className="text-sm text-slate-400 mt-1">
            Pick your training data ingredients and cook the AI!
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {ALL_INGREDIENTS.map((ing) => {
            const inBowl = bowl.includes(ing.id);
            return (
              <button
                key={ing.id}
                onClick={() => toggle(ing.id)}
                disabled={cooked}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-left text-sm font-bold transition-all btn-press ${
                  inBowl
                    ? ing.good
                      ? "bg-green-500/20 border-green-500/50 text-green-300"
                      : "bg-red-500/20 border-red-500/50 text-red-300"
                    : "bg-space-900 border-slate-700 text-slate-400 hover:border-slate-500"
                } ${cooked ? "opacity-70 cursor-default" : ""}`}
              >
                <span className="text-xl flex-shrink-0">{ing.emoji}</span>
                <span>{ing.label}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-space-900 rounded-xl p-3 mb-4 text-center">
          <div className="text-xs text-slate-400 font-bold mb-1">YOUR MIXING BOWL</div>
          {bowl.length === 0 ? (
            <div className="text-slate-600 text-sm">Tap ingredients to add them</div>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">
              {selected.map((ing) => (
                <span key={ing.id} className="text-xl">{ing.emoji}</span>
              ))}
            </div>
          )}
        </div>

        {!cooked ? (
          <button
            onClick={cook}
            disabled={bowl.length === 0}
            className="w-full py-4 rounded-2xl font-black text-white bg-green-500 hover:bg-green-400 btn-press transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            🍳 Cook the AI!
          </button>
        ) : (
          <div className="space-y-3">
            <div className={`rounded-2xl p-5 border text-center ${result.bg}`}>
              <div className="text-5xl mb-2">{result.emoji}</div>
              <div className={`text-xl font-black ${result.color}`}>{result.label}</div>
              <div className="text-slate-400 text-sm mt-1">
                {goodCount} good ingredients, {badCount} bad
              </div>
            </div>

            {selected.map((ing) => (
              <div
                key={ing.id}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm ${
                  ing.good
                    ? "bg-green-500/10 text-green-300"
                    : "bg-red-500/10 text-red-300"
                }`}
              >
                <span className="text-xl flex-shrink-0">{ing.emoji}</span>
                <div>
                  <div className="font-bold">{ing.label}</div>
                  <div className="text-slate-400 font-normal">{ing.reason}</div>
                </div>
              </div>
            ))}

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
