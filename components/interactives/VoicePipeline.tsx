"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const STAGES = [
  {
    id: "wake",
    label: "Wake Word Detection",
    emoji: "👂",
    short: "Wake Word",
    description: "The device listens for a special trigger word like \"Hey Siri\" or \"OK Google\".",
  },
  {
    id: "stt",
    label: "Speech-to-Text",
    emoji: "📝",
    short: "Speech→Text",
    description: "The AI converts your voice audio into written words it can process.",
  },
  {
    id: "intent",
    label: "Intent Recognition",
    emoji: "🧠",
    short: "Understand Intent",
    description: "The AI figures out what you actually want — are you asking a question, setting a timer, or playing music?",
  },
  {
    id: "response",
    label: "Response Generation",
    emoji: "💡",
    short: "Generate Answer",
    description: "The AI creates an answer — looking up info, doing calculations, or crafting a reply.",
  },
  {
    id: "tts",
    label: "Text-to-Speech",
    emoji: "🔊",
    short: "Text→Speech",
    description: "The written response is turned back into spoken audio so you can hear the answer.",
  },
];

const SCENARIOS = [
  {
    command: "Hey Siri, what's the weather today?",
    emoji: "☀️",
    stageDetails: [
      "Detected wake word: \"Hey Siri\" — the mic was listening for this exact phrase!",
      "Converted speech to text: \"what's the weather today\"",
      "Intent recognized: WEATHER_QUERY — location: current, time: today",
      "Generated response: \"It's 72°F and sunny in your area today with a high of 78°F.\"",
      "Speaking the response out loud in a natural-sounding voice!",
    ],
  },
  {
    command: "Alexa, set a timer for 10 minutes",
    emoji: "⏰",
    stageDetails: [
      "Detected wake word: \"Alexa\" — ignoring all other background noise!",
      "Converted speech to text: \"set a timer for 10 minutes\"",
      "Intent recognized: SET_TIMER — duration: 10 minutes",
      "Generated response: \"OK, 10 minutes starting now.\" Timer started!",
      "Speaking confirmation aloud so you know the timer is running!",
    ],
  },
  {
    command: "OK Google, play my favorite playlist",
    emoji: "🎵",
    stageDetails: [
      "Detected wake word: \"OK Google\" — even in a noisy room!",
      "Converted speech to text: \"play my favorite playlist\"",
      "Intent recognized: PLAY_MUSIC — target: user's favorite playlist",
      "Generated response: Looked up your most-played playlist and queued it up!",
      "Speaking: \"Playing your favorite playlist on Spotify!\" then music starts!",
    ],
  },
];

export function VoicePipeline({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"order" | "explore" | "done">("order");
  // Order phase
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [shuffled] = useState(() => {
    const indices = [0, 1, 2, 3, 4];
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });
  const [orderCorrect, setOrderCorrect] = useState<boolean | null>(null);
  // Explore phase
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [visitedStages, setVisitedStages] = useState<Set<number>>(new Set());
  const [scenariosDone, setScenariosComplete] = useState(0);
  const [done, setDone] = useState(false);

  // --- ORDER PHASE: tap stages in the correct order ---
  function handleTapStage(originalIdx: number) {
    if (orderCorrect !== null) return;
    if (userOrder.includes(originalIdx)) return;
    const next = [...userOrder, originalIdx];
    setUserOrder(next);
    if (next.length === 5) {
      const correct = next.every((val, i) => val === i);
      setOrderCorrect(correct);
      if (!correct) {
        setTimeout(() => {
          setUserOrder([]);
          setOrderCorrect(null);
        }, 1500);
      }
    }
  }

  function goToExplore() {
    setPhase("explore");
    setActiveStage(null);
    setVisitedStages(new Set());
  }

  // --- EXPLORE PHASE ---
  function tapStageExplore(idx: number) {
    setActiveStage(idx);
    const next = new Set(visitedStages);
    next.add(idx);
    setVisitedStages(next);
  }

  function nextScenario() {
    const newCount = scenariosDone + 1;
    setScenariosComplete(newCount);
    if (newCount >= 2) {
      setPhase("done");
      setDone(true);
      onComplete();
    } else {
      setScenarioIdx((i) => (i + 1) % SCENARIOS.length);
      setActiveStage(null);
      setVisitedStages(new Set());
    }
  }

  // --- ORDER PHASE ---
  if (phase === "order") {
    const remaining = shuffled.filter((i) => !userOrder.includes(i));
    return (
      <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-5">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">Voice Pipeline Builder</h3>
          <p className="text-slate-600 text-sm">
            Tap the stages in the correct order — how does a voice assistant process your command?
          </p>
        </div>

        {/* Already placed */}
        <div className="space-y-2">
          {userOrder.map((stageIdx, pos) => (
            <motion.div
              key={stageIdx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 p-3 bg-violet-500/20 border border-violet-500/50 rounded-lg"
            >
              <span className="text-violet-400 font-bold text-sm w-6">{pos + 1}.</span>
              <span className="text-lg">{STAGES[stageIdx].emoji}</span>
              <span className="text-slate-900 text-sm font-medium">{STAGES[stageIdx].label}</span>
            </motion.div>
          ))}
          {userOrder.length < 5 && (
            <div className="flex items-center gap-3 p-3 border-2 border-dashed border-slate-200 rounded-lg">
              <span className="text-slate-400 font-bold text-sm w-6">{userOrder.length + 1}.</span>
              <span className="text-slate-400 text-sm">Tap the next stage below...</span>
            </div>
          )}
        </div>

        {/* Available stages */}
        {remaining.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {remaining.map((stageIdx) => (
              <motion.button
                key={stageIdx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTapStage(stageIdx)}
                className="flex items-center gap-2 px-4 py-2 bg-space-800 border border-slate-200 hover:border-violet-400 rounded-lg transition-all"
              >
                <span className="text-lg">{STAGES[stageIdx].emoji}</span>
                <span className="text-slate-900 text-xs font-medium">{STAGES[stageIdx].short}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Feedback */}
        {orderCorrect !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            {orderCorrect ? (
              <div className="space-y-3">
                <p className="text-green-400 font-bold">Perfect! That&apos;s exactly right!</p>
                <button
                  onClick={goToExplore}
                  className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-slate-900 font-bold rounded-lg text-sm"
                >
                  Now Explore How It Works!
                </button>
              </div>
            ) : (
              <p className="text-red-400 font-semibold text-sm">Not quite — try again! Think about what has to happen first.</p>
            )}
          </motion.div>
        )}
      </div>
    );
  }

  // --- EXPLORE PHASE ---
  if (phase === "explore") {
    const scenario = SCENARIOS[scenarioIdx];
    return (
      <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-5">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">Trace the Pipeline</h3>
          <p className="text-slate-600 text-sm">
            Tap each stage to see what happens when you say:
          </p>
          <p className="text-violet-400 font-bold text-lg">
            {scenario.emoji} &quot;{scenario.command}&quot;
          </p>
          <p className="text-xs text-slate-400">Scenario {scenariosDone + 1} of 2</p>
        </div>

        {/* Pipeline stages */}
        <div className="space-y-2">
          {STAGES.map((stage, i) => {
            const visited = visitedStages.has(i);
            const active = activeStage === i;
            return (
              <motion.button
                key={stage.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => tapStageExplore(i)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  active
                    ? "border-violet-400 bg-violet-500/20"
                    : visited
                    ? "border-violet-500/40 bg-space-800"
                    : "border-slate-200 bg-space-800 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{stage.emoji}</span>
                  <div className="flex-1">
                    <p className="text-slate-900 text-sm font-semibold">
                      {i + 1}. {stage.label}
                      {visited && <span className="ml-2 text-violet-400 text-xs">✓</span>}
                    </p>
                    {active && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-violet-300 text-xs mt-1"
                      >
                        {scenario.stageDetails[i]}
                      </motion.p>
                    )}
                  </div>
                </div>
                {i < 4 && (
                  <div className="flex justify-center mt-1">
                    <span className="text-slate-600 text-xs">↓</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {visitedStages.size === 5 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <button
              onClick={nextScenario}
              className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-slate-900 font-bold rounded-lg text-sm"
            >
              {scenariosDone < 1 ? "Try Another Scenario!" : "Finish!"}
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  // --- DONE ---
  return (
    <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-4 text-center">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <p className="text-4xl mb-2">🎙️</p>
        <h3 className="text-xl font-bold text-slate-900">Pipeline Master!</h3>
        <p className="text-slate-600 text-sm mt-2">
          You now know the 5 stages every voice assistant goes through — from hearing the wake word to speaking the answer back!
        </p>
        <p className="text-xs text-slate-400 mt-3">
          Fun fact: All 5 stages happen in under 2 seconds on modern devices.
          The AI processes your voice at incredible speed!
        </p>
      </motion.div>
    </div>
  );
}
