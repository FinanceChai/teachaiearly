"use client";

import { useState } from "react";

const TRAINING_ROUNDS = [
  { examples: 10, accuracy: 42, note: "Just starting — lots of mistakes!" },
  { examples: 50, accuracy: 61, note: "Getting better, but still shaky." },
  { examples: 200, accuracy: 75, note: "Solid improvement — more data helps!" },
  { examples: 1000, accuracy: 85, note: "Good results — slowing down now." },
  { examples: 5000, accuracy: 91, note: "Strong accuracy, diminishing returns." },
  { examples: 20000, accuracy: 94, note: "Tiny gains — lots more data needed!" },
  { examples: 100000, accuracy: 96, note: "Near plateau — huge cost for 2% gain." },
];

export function TrainingTracker({ onComplete }: { onComplete: () => void }) {
  const [round, setRound] = useState(0);
  const [training, setTraining] = useState(false);
  const [completed, setCompleted] = useState(false);

  const current = TRAINING_ROUNDS[round];
  const isLast = round === TRAINING_ROUNDS.length - 1;

  function trainMore() {
    if (isLast) {
      setCompleted(true);
      onComplete();
      return;
    }
    setTraining(true);
    setTimeout(() => {
      setRound((r) => r + 1);
      setTraining(false);
    }, 800);
  }

  const gain = round > 0
    ? TRAINING_ROUNDS[round].accuracy - TRAINING_ROUNDS[round - 1].accuracy
    : 0;

  return (
    <div className="space-y-5">
      <div className="bg-space-800 rounded-2xl p-5 border border-green-500/30">
        <div className="text-center mb-5">
          <div className="text-3xl mb-2">📈</div>
          <div className="font-black text-white">Training Tracker</div>
          <div className="text-sm text-slate-400 mt-1">
            Watch an AI improve as you feed it more training examples.
          </div>
        </div>

        {/* Chart */}
        <div className="bg-space-900 rounded-xl p-4 mb-4">
          <div className="text-xs font-black text-slate-400 mb-3">ACCURACY vs TRAINING EXAMPLES</div>
          <div className="flex items-end gap-1.5 h-28">
            {TRAINING_ROUNDS.map((r, i) => {
              const active = i <= round;
              const isCurrent = i === round;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 relative ${
                      active
                        ? isCurrent
                          ? "bg-green-400"
                          : "bg-green-600"
                        : "bg-slate-700"
                    }`}
                    style={{ height: `${(r.accuracy / 100) * 112}px` }}
                  >
                    {isCurrent && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-black text-green-300 whitespace-nowrap">
                        {r.accuracy}%
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-600 font-bold">
            <span>10</span>
            <span>50</span>
            <span>200</span>
            <span>1K</span>
            <span>5K</span>
            <span>20K</span>
            <span>100K</span>
          </div>
          <div className="text-center text-xs text-slate-500 mt-1">examples</div>
        </div>

        {/* Current stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-space-900 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-400 font-bold mb-1">EXAMPLES SEEN</div>
            <div className="text-2xl font-black text-white">
              {current.examples.toLocaleString()}
            </div>
          </div>
          <div className="bg-space-900 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-400 font-bold mb-1">ACCURACY</div>
            <div className="text-2xl font-black text-green-400">{current.accuracy}%</div>
          </div>
        </div>

        {round > 0 && (
          <div className={`rounded-xl p-3 mb-4 text-sm text-center font-bold ${
            gain >= 15 ? "bg-green-500/20 text-green-300" :
            gain >= 8 ? "bg-teal-500/20 text-teal-300" :
            gain >= 4 ? "bg-amber-500/20 text-amber-300" :
            "bg-slate-700 text-slate-400"
          }`}>
            +{gain}% improvement · {current.note}
          </div>
        )}

        {round === 0 && (
          <div className="bg-slate-700/50 rounded-xl p-3 mb-4 text-sm text-center text-slate-400">
            {current.note}
          </div>
        )}

        {!completed ? (
          <button
            onClick={trainMore}
            disabled={training}
            className={`w-full py-4 rounded-2xl font-black text-white btn-press transition-all ${
              training
                ? "bg-green-600 cursor-wait"
                : isLast
                ? "bg-amber-500 hover:bg-amber-400"
                : "bg-green-500 hover:bg-green-400"
            }`}
          >
            {training
              ? "Training... ⚙️"
              : isLast
              ? "This is the plateau! Finish →"
              : `Train with ${TRAINING_ROUNDS[round + 1].examples.toLocaleString()} examples →`}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 text-center">
              <div className="font-black text-amber-300 mb-1">Diminishing Returns!</div>
              <p className="text-slate-300 text-sm">
                Notice how going from 10 to 200 examples gave huge gains — but going from 5,000 to 100,000
                barely moved the needle. More data helps, but less and less over time.
              </p>
            </div>
            <div className="bg-green-500/20 border border-green-500/40 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-1">🎉</div>
              <div className="font-black text-green-300">Activity Complete!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
