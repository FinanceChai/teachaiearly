"use client";

import { useState } from "react";

const EVENTS = [
  { id: "turing", year: 1950, label: "The Turing Test", emoji: "🧪", fact: "Alan Turing asked 'Can machines think?' — a question we're still answering!" },
  { id: "deepblue", year: 1997, label: "Deep Blue beats Kasparov", emoji: "♟️", fact: "Evaluated 200 million chess positions per second!" },
  { id: "siri", year: 2011, label: "Siri launches on iPhone", emoji: "🎤", fact: "Siri was originally a standalone app before Apple bought it!" },
  { id: "alphago", year: 2016, label: "AlphaGo beats world's best Go player", emoji: "⚫", fact: "Go has more possible positions than atoms in the universe!" },
  { id: "chatgpt", year: 2022, label: "ChatGPT launches", emoji: "💬", fact: "Reached 100 million users in just 2 months — fastest ever!" },
];

const SHUFFLED = [...EVENTS].sort(() => Math.random() - 0.5);

export function TimelineBuilder({ onComplete }: { onComplete: () => void }) {
  const [cards] = useState(SHUFFLED);
  const [slots, setSlots] = useState<(string | null)[]>(Array(EVENTS.length).fill(null));
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<boolean[]>(Array(EVENTS.length).fill(false));
  const [done, setDone] = useState(false);

  const placed = slots.filter(Boolean);
  const allPlaced = placed.length === EVENTS.length;
  const allCorrect = allPlaced && slots.every((s, i) => s === EVENTS[i].id);

  function selectCard(id: string) {
    if (placed.includes(id)) return;
    setSelected(id === selected ? null : id);
  }

  function placeInSlot(slotIdx: number) {
    if (!selected) return;
    const event = EVENTS.find((e) => e.id === selected)!;
    const correct = EVENTS[slotIdx].id === selected;

    setSlots((prev) => {
      const next = [...prev];
      // remove from any existing slot
      const existingIdx = next.indexOf(selected);
      if (existingIdx !== -1) next[existingIdx] = null;
      next[slotIdx] = selected;
      return next;
    });

    if (correct) {
      setRevealed((prev) => { const n = [...prev]; n[slotIdx] = true; return n; });
    }
    setSelected(null);
  }

  function handleDone() {
    setDone(true);
    onComplete();
  }

  return (
    <div className="space-y-5">
      <p className="text-slate-300 text-sm font-semibold">
        Select a card, then tap a year slot to place it. Arrange in order from oldest to newest!
      </p>

      {/* Cards to place */}
      <div className="flex flex-wrap gap-2">
        {cards.map((event) => {
          const isPlaced = slots.includes(event.id);
          return (
            <button
              key={event.id}
              onClick={() => !isPlaced && selectCard(event.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border font-bold text-sm transition-all btn-press ${
                isPlaced
                  ? "opacity-30 cursor-not-allowed border-slate-700 bg-space-800"
                  : selected === event.id
                  ? "border-teal-400 bg-teal-500/20 text-teal-200"
                  : "border-slate-600 bg-space-800 text-white hover:border-slate-400"
              }`}
            >
              <span>{event.emoji}</span>
              <span>{event.label}</span>
            </button>
          );
        })}
      </div>

      {/* Timeline slots */}
      <div className="space-y-3">
        {EVENTS.map((event, i) => {
          const slotContent = slots[i] ? EVENTS.find((e) => e.id === slots[i]) : null;
          const isCorrect = slots[i] === event.id;

          return (
            <div key={event.id} className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-14 text-center">
                <div className="text-xs font-black text-slate-400">{event.year}</div>
                <div className="w-0.5 h-full bg-slate-700 mx-auto mt-1" />
              </div>
              <button
                onClick={() => placeInSlot(i)}
                className={`flex-1 min-h-[3.5rem] p-3 rounded-xl border-2 border-dashed text-left transition-all ${
                  slotContent
                    ? isCorrect
                      ? "border-green-500 bg-green-500/10"
                      : "border-red-500/60 bg-red-500/10 cursor-pointer hover:border-red-400"
                    : selected
                    ? "border-teal-400/60 bg-teal-500/5 cursor-pointer hover:border-teal-400"
                    : "border-slate-700 bg-space-800 cursor-default"
                }`}
              >
                {slotContent ? (
                  <div>
                    <div className="flex items-center gap-2">
                      <span>{slotContent.emoji}</span>
                      <span className={`font-bold text-sm ${isCorrect ? "text-green-300" : "text-red-300"}`}>
                        {slotContent.label}
                      </span>
                      {isCorrect && <span className="text-green-400 ml-auto">✓</span>}
                      {!isCorrect && <span className="text-red-400 ml-auto">✗</span>}
                    </div>
                    {isCorrect && revealed[i] && (
                      <div className="text-xs text-slate-300 mt-1.5 bg-green-500/10 rounded-lg p-2">
                        💡 {event.fact}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-slate-600 text-sm">
                    {selected ? "Tap to place here →" : "Select a card above"}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {allPlaced && !done && (
        <div className={`p-4 rounded-2xl border text-center ${allCorrect ? "bg-green-500/20 border-green-500/40" : "bg-orange-500/20 border-orange-500/40"}`}>
          <div className={`font-black text-lg mb-2 ${allCorrect ? "text-green-300" : "text-orange-300"}`}>
            {allCorrect ? "🎉 Perfect! All in order!" : "Almost! Check the red ones"}
          </div>
          {allCorrect && (
            <button onClick={handleDone}
              className="bg-green-500 hover:bg-green-400 text-white font-black py-3 px-8 rounded-xl btn-press transition-colors">
              Awesome! →
            </button>
          )}
        </div>
      )}

      {done && (
        <div className="bg-green-500/20 border border-green-500/40 rounded-2xl p-4 text-center">
          <div className="font-black text-green-300">Activity Complete! 🎉</div>
        </div>
      )}
    </div>
  );
}
