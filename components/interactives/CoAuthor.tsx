"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface WritingRound {
  starter: string;
  genre: string;
  aiContinuation: string;
  humanContinuation: string;
  aiLabel: string;
  humanLabel: string;
  insight: string;
}

const ROUNDS: WritingRound[] = [
  {
    starter: "The old lighthouse keeper heard a knock at the door. Nobody ever visited the island.",
    genre: "Mystery",
    aiContinuation:
      "He slowly approached the door, his heart pounding in his chest. The wind howled outside as he reached for the rusty handle. When he opened it, he found a small wooden box sitting on the doorstep, with no one in sight.",
    humanContinuation:
      "He froze. The last time someone knocked was the day his daughter disappeared — exactly seven years ago. His hand trembled as he reached for the door, not from fear, but from hope.",
    aiLabel: "Technically correct",
    humanLabel: "Emotionally rich",
    insight:
      "AI writes competent prose but often misses emotional depth. The human version connects to personal history and emotion — things only a person with life experience can bring to writing.",
  },
  {
    starter: "The robot looked at the sunset for the first time.",
    genre: "Sci-Fi",
    aiContinuation:
      "Its optical sensors processed the wavelengths of light — oranges, reds, and purples spreading across the horizon. It recorded the data and stored it in memory bank 7B. The sunset lasted 4 minutes and 23 seconds.",
    humanContinuation:
      "It didn't understand why it couldn't stop looking. Nothing in its programming said sunsets mattered. But for 4 minutes and 23 seconds, it forgot to run its scheduled tasks. Was that... wonder?",
    aiLabel: "Descriptive but flat",
    humanLabel: "Asks deeper questions",
    insight:
      "AI describes what happens. Humans ask what it means. The best writing isn't just about events — it's about the questions those events raise.",
  },
  {
    starter: "Maya's lemonade stand was losing to the one across the street.",
    genre: "Realistic fiction",
    aiContinuation:
      "She decided to improve her recipe by adding fresh strawberries and mint leaves. She also created colorful signs and offered a loyalty card. Soon, customers started coming back to her stand.",
    humanContinuation:
      "She watched Tommy's perfect stand with his perfect sign and his perfect dad helping him. She looked at her own crooked table. Then she did something Tommy never would — she walked over and said, 'Want to team up?'",
    aiLabel: "Problem-solving approach",
    humanLabel: "Character-driven surprise",
    insight:
      "AI went straight to logical solutions. The human version revealed character — Maya's vulnerability and unexpected courage. YOUR voice and choices are what make stories memorable.",
  },
  {
    starter: "The magician's final trick went wrong.",
    genre: "Fantasy",
    aiContinuation:
      "Instead of pulling a rabbit from his hat, a burst of real magic exploded from his fingertips. The audience gasped as colorful sparks flew in every direction. The magician looked at his hands in shock — the magic was real.",
    humanContinuation:
      "The audience clapped, thinking the floating chairs were part of the act. Only his assistant saw his face — pale, shaking. 'That wasn't me,' he whispered. 'Something else did that.' She looked at the hat. It was breathing.",
    aiLabel: "Predictable twist",
    humanLabel: "Builds real tension",
    insight:
      "AI often reaches for the obvious twist. Human writers build suspense through specific, creepy details — a breathing hat is far more unsettling than generic 'real magic.'",
  },
];

export function CoAuthor({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"read" | "compare" | "pick">("read");
  const [userPick, setUserPick] = useState<"A" | "B" | null>(null);
  const [scores, setScores] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const round = ROUNDS[current];
  // Alternate which is shown as A
  const humanIsA = current % 2 === 0;
  const contA = humanIsA ? round.humanContinuation : round.aiContinuation;
  const contB = humanIsA ? round.aiContinuation : round.humanContinuation;
  const labelA = humanIsA ? round.humanLabel : round.aiLabel;
  const labelB = humanIsA ? round.aiLabel : round.humanLabel;

  function pickHuman(choice: "A" | "B") {
    if (userPick !== null) return;
    setUserPick(choice);
    const pickedCorrectly =
      (choice === "A" && humanIsA) || (choice === "B" && !humanIsA);
    setScores((prev) => [...prev, pickedCorrectly]);
  }

  function next() {
    setPhase("read");
    setUserPick(null);
    if (current >= ROUNDS.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setCurrent((c) => c + 1);
    }
  }

  if (done) {
    const correct = scores.filter(Boolean).length;
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="text-7xl"
        >
          ✍️
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">
            {correct}/{ROUNDS.length}
          </div>
          <div className="text-slate-400 text-sm mt-1">human-written passages identified</div>
          <div className="text-slate-300 mt-3">
            {correct >= ROUNDS.length - 1
              ? "Sharp eye! You can tell when writing has real human soul."
              : correct >= ROUNDS.length / 2
              ? "Not bad! AI is getting better, but human voice still shines through."
              : "AI is getting convincing! But human writing still has a special quality."}
          </div>
        </div>
        <div className="bg-purple-500/20 border border-purple-500/40 rounded-2xl p-4">
          <div className="font-black text-purple-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">
            AI can help you write, but YOUR ideas, emotions, and unique perspective are what
            make writing truly special. AI is the tool — you&apos;re the artist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {ROUNDS.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-all ${
                i < current
                  ? scores[i]
                    ? "bg-purple-500"
                    : "bg-red-500"
                  : i === current
                  ? "bg-purple-400"
                  : "bg-slate-700"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-400 font-bold">
          {current + 1}/{ROUNDS.length}
        </span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs font-black text-purple-400">CO-AUTHOR</div>
          <div className="text-xs font-bold text-slate-500">{round.genre}</div>
        </div>

        {/* Story starter */}
        <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-4">
          <div className="text-xs font-bold text-slate-500 mb-2">STORY STARTER</div>
          <div className="text-white font-bold leading-relaxed">
            {round.starter}
          </div>
        </div>

        {phase === "read" && (
          <div className="space-y-3">
            <div className="text-sm text-slate-400 font-bold">
              Two writers continued this story — one is AI, one is human.
            </div>
            <button
              onClick={() => setPhase("compare")}
              className="w-full py-4 rounded-xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors"
            >
              Show Both Versions →
            </button>
          </div>
        )}

        {phase === "compare" && (
          <div className="space-y-4">
            <div className="text-sm text-slate-400 font-bold mb-2">
              Read both — which one was written by a human?
            </div>
            <button
              onClick={() => setPhase("pick")}
              className="w-full text-left space-y-4"
            >
              <div className="bg-space-900 rounded-xl p-4 border border-slate-600">
                <div className="text-xs font-black text-blue-400 mb-2">VERSION A</div>
                <div className="text-sm text-slate-300 leading-relaxed">{contA}</div>
              </div>
              <div className="bg-space-900 rounded-xl p-4 border border-slate-600">
                <div className="text-xs font-black text-amber-400 mb-2">VERSION B</div>
                <div className="text-sm text-slate-300 leading-relaxed">{contB}</div>
              </div>
            </button>
            <button
              onClick={() => setPhase("pick")}
              className="w-full py-4 rounded-xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors"
            >
              I&apos;ve Read Both — Let Me Pick →
            </button>
          </div>
        )}

        {phase === "pick" && userPick === null && (
          <div className="space-y-4">
            <div className="text-sm text-slate-400 font-bold text-center">
              Which was written by a human?
            </div>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={() => pickHuman("A")}
                whileTap={{ scale: 0.95 }}
                className="py-5 rounded-xl border-2 border-blue-500/30 bg-space-900 font-black text-white text-lg hover:border-blue-500 transition-colors"
              >
                Version A
              </motion.button>
              <motion.button
                onClick={() => pickHuman("B")}
                whileTap={{ scale: 0.95 }}
                className="py-5 rounded-xl border-2 border-amber-500/30 bg-space-900 font-black text-white text-lg hover:border-amber-500 transition-colors"
              >
                Version B
              </motion.button>
            </div>
          </div>
        )}

        {phase === "pick" && userPick !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div
              className={`p-4 rounded-xl text-sm font-bold ${
                scores[scores.length - 1]
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {scores[scores.length - 1]
                ? "Correct! You spotted the human touch."
                : `Not quite — Version ${humanIsA ? "A" : "B"} was the human-written one.`}
            </div>

            {/* Labels */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-space-900 rounded-xl p-3 border border-slate-600 text-center">
                <div className="text-xs font-black text-blue-400">VERSION A</div>
                <div className="text-sm font-bold text-slate-300 mt-1">{labelA}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {humanIsA ? "👤 Human" : "🤖 AI"}
                </div>
              </div>
              <div className="bg-space-900 rounded-xl p-3 border border-slate-600 text-center">
                <div className="text-xs font-black text-amber-400">VERSION B</div>
                <div className="text-sm font-bold text-slate-300 mt-1">{labelB}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {humanIsA ? "🤖 AI" : "👤 Human"}
                </div>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="text-xs font-black text-purple-400 mb-1">INSIGHT</div>
              <div className="text-sm text-slate-300">{round.insight}</div>
            </div>

            <button
              onClick={next}
              className="w-full py-4 rounded-xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors"
            >
              {current < ROUNDS.length - 1 ? "Next Story →" : "See Results →"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
