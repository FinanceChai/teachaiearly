"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DrivingScenario {
  title: string;
  scene: string;
  emoji: string;
  options: { label: string; emoji: string }[];
  aiChoice: number;
  aiReasoning: string;
  humanNote: string;
}

const SCENARIOS: DrivingScenario[] = [
  {
    title: "Kid Chasing a Ball",
    scene: "🚗💨 ➡️ ⚽ 🧒\n🛣️🛣️🛣️🛣️🛣️🛣️",
    emoji: "⚽",
    options: [
      { label: "Brake hard", emoji: "🛑" },
      { label: "Swerve left", emoji: "⬅️" },
      { label: "Swerve right", emoji: "➡️" },
      { label: "Continue", emoji: "⬆️" },
    ],
    aiChoice: 0,
    aiReasoning: "The AI instantly hits the brakes! It detected the child 0.1 seconds after they appeared — faster than any human could react. It also checked: no cars behind, safe to brake hard.",
    humanNote: "Humans take about 1.5 seconds to react. The AI reacted in 0.1 seconds — that's 15x faster! But the AI made this decision using cameras, radar, AND lidar all at once.",
  },
  {
    title: "Fallen Tree on the Road",
    scene: "🚗💨 ➡️ 🌳🪵🌳\n🛣️🛣️🚧🚧🛣️🛣️",
    emoji: "🌳",
    options: [
      { label: "Brake hard", emoji: "🛑" },
      { label: "Swerve left", emoji: "⬅️" },
      { label: "Swerve right", emoji: "➡️" },
      { label: "Continue", emoji: "⬆️" },
    ],
    aiChoice: 1,
    aiReasoning: "The AI checks all lanes in milliseconds. Left lane is clear — it smoothly swerves left while slowing down. It also signals to warn cars behind it!",
    humanNote: "A human might panic and brake too late, or swerve without checking blind spots. The AI has 360° vision — no blind spots at all!",
  },
  {
    title: "Ambulance Approaching from Behind",
    scene: "🚑🔊 ➡️ 🚗\n🛣️🛣️🛣️🛣️🛣️🛣️",
    emoji: "🚑",
    options: [
      { label: "Brake hard", emoji: "🛑" },
      { label: "Swerve left", emoji: "⬅️" },
      { label: "Swerve right", emoji: "➡️" },
      { label: "Continue", emoji: "⬆️" },
    ],
    aiChoice: 2,
    aiReasoning: "The AI hears the siren using microphones AND sees the flashing lights using cameras. It smoothly pulls right to give the ambulance room to pass on the left.",
    humanNote: "Sometimes humans don't hear sirens because of loud music. The AI always listens for emergency sounds, even while playing your favorite songs!",
  },
  {
    title: "Icy Road Ahead",
    scene: "🚗💨 ➡️ ❄️🧊❄️\n🛣️🛣️🌨️🌨️🛣️🛣️",
    emoji: "🧊",
    options: [
      { label: "Brake hard", emoji: "🛑" },
      { label: "Swerve left", emoji: "⬅️" },
      { label: "Swerve right", emoji: "➡️" },
      { label: "Continue slowly", emoji: "🐌" },
    ],
    aiChoice: 3,
    aiReasoning: "Braking hard on ice = sliding! The AI gently slows down and continues carefully. It detected the ice using temperature sensors and camera analysis of the road surface.",
    humanNote: "Many human drivers slam the brakes on ice and skid. The AI knows from training on millions of icy-road scenarios that gentle is better!",
  },
  {
    title: "Dog Runs Into the Street",
    scene: "🚗💨 ➡️    🐕\n🛣️🛣️🛣️🛣️🛣️🛣️",
    emoji: "🐕",
    options: [
      { label: "Brake hard", emoji: "🛑" },
      { label: "Swerve left", emoji: "⬅️" },
      { label: "Swerve right", emoji: "➡️" },
      { label: "Honk and continue", emoji: "📯" },
    ],
    aiChoice: 0,
    aiReasoning: "The AI brakes immediately! It recognized the dog using its object detection AI (trained on millions of animal images). It also checked behind — safe to stop quickly.",
    humanNote: "Humans might hesitate — 'Is that a bag or a dog?' The AI classified it as a dog in 50 milliseconds and started braking before a human would even realize what it was!",
  },
];

export function SelfDrivingSim({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [matches, setMatches] = useState(0);

  const scenario = SCENARIOS[current];

  const handleChoice = (idx: number) => {
    if (revealed) return;
    setUserChoice(idx);
    setRevealed(true);
    if (idx === scenario.aiChoice) {
      setMatches((m) => m + 1);
    }
  };

  const handleNext = () => {
    if (current < SCENARIOS.length - 1) {
      setCurrent((c) => c + 1);
      setUserChoice(null);
      setRevealed(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-space-800 rounded-2xl p-6 border border-slate-700 text-center"
      >
        <div className="text-5xl mb-4">🚗</div>
        <h2 className="text-2xl font-bold text-white mb-2">Simulation Complete!</h2>
        <p className="text-slate-300 mb-3">
          You matched the AI&apos;s decision in <span className="text-zinc-400 font-bold">{matches}/{SCENARIOS.length}</span> scenarios
        </p>
        <div className="bg-space-900 rounded-xl p-4 mb-6 text-left">
          <h3 className="text-white font-bold mb-2">🤔 Key Takeaways:</h3>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>• AI cars react <span className="text-zinc-400 font-bold">15x faster</span> than humans</li>
            <li>• They have <span className="text-zinc-400 font-bold">360° vision</span> — no blind spots</li>
            <li>• They learn from <span className="text-zinc-400 font-bold">millions</span> of driving scenarios</li>
            <li>• But they still can&apos;t handle every surprise the way humans can!</li>
          </ul>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="px-6 py-3 bg-zinc-400 text-space-900 font-bold rounded-xl"
        >
          Continue
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="bg-space-800 rounded-2xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">🚗 Self-Driving Simulator</h2>
        <span className="text-zinc-400 text-sm font-mono">Scenario {current + 1}/{SCENARIOS.length}</span>
      </div>

      <div className="w-full bg-space-900 rounded-full h-2 mb-5">
        <motion.div
          className="bg-zinc-400 h-2 rounded-full"
          animate={{ width: `${((current + 1) / SCENARIOS.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
        >
          <div className="bg-space-900 rounded-xl p-5 mb-4 text-center">
            <div className="text-4xl mb-2">{scenario.emoji}</div>
            <h3 className="text-xl font-bold text-white mb-3">{scenario.title}</h3>
            <pre className="text-2xl leading-relaxed mb-3 font-mono">{scenario.scene}</pre>
            <p className="text-slate-300 text-sm">⚡ Split-second decision — what do you do?</p>
          </div>

          {!revealed ? (
            <div className="grid grid-cols-2 gap-3">
              {scenario.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleChoice(idx)}
                  className="p-3 bg-space-900 border-2 border-slate-700 rounded-xl text-white font-bold hover:border-zinc-400 transition-colors"
                >
                  <span className="text-xl">{opt.emoji}</span>
                  <span className="block text-sm mt-1">{opt.label}</span>
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="space-y-3 mb-4">
                <div className="flex gap-3">
                  <div className={`flex-1 p-3 rounded-xl border-2 ${
                    userChoice === scenario.aiChoice
                      ? "bg-emerald-500/10 border-emerald-500/40"
                      : "bg-red-500/10 border-red-500/40"
                  }`}>
                    <div className="text-xs text-slate-300 mb-1">Your choice:</div>
                    <div className="text-white font-bold">
                      {scenario.options[userChoice!].emoji} {scenario.options[userChoice!].label}
                    </div>
                  </div>
                  <div className="flex-1 p-3 rounded-xl bg-zinc-400/10 border-2 border-zinc-400/40">
                    <div className="text-xs text-slate-300 mb-1">AI&apos;s choice:</div>
                    <div className="text-white font-bold">
                      {scenario.options[scenario.aiChoice].emoji} {scenario.options[scenario.aiChoice].label}
                    </div>
                  </div>
                </div>

                <div className="bg-space-900 rounded-xl p-4">
                  <h4 className="text-zinc-400 font-bold text-sm mb-1">🤖 Why the AI chose this:</h4>
                  <p className="text-slate-300 text-sm">{scenario.aiReasoning}</p>
                </div>

                <div className="bg-space-900 rounded-xl p-4">
                  <h4 className="text-slate-500 font-bold text-sm mb-1">🧠 Human vs AI:</h4>
                  <p className="text-slate-300 text-sm">{scenario.humanNote}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleNext}
                className="w-full py-3 bg-zinc-400 text-space-900 font-bold rounded-xl"
              >
                {current < SCENARIOS.length - 1 ? "Next Scenario →" : "See Summary"}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
