"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROBLEMS = [
  { id: "food-waste", label: "Food Waste in Schools", emoji: "🍎" },
  { id: "loneliness", label: "Loneliness in Hospitals", emoji: "🏥" },
  { id: "wildfire", label: "Wildfire Detection", emoji: "🔥" },
  { id: "ocean-trash", label: "Ocean Plastic Cleanup", emoji: "🌊" },
  { id: "homework", label: "Homework Help for Kids", emoji: "📚" },
  { id: "lost-pets", label: "Finding Lost Pets", emoji: "🐾" },
];

const ROBOT_TYPES = [
  { id: "wheeled", label: "Wheeled", emoji: "🛞" },
  { id: "legged", label: "Legged", emoji: "🦿" },
  { id: "flying", label: "Flying Drone", emoji: "🚁" },
  { id: "underwater", label: "Underwater", emoji: "🤿" },
  { id: "humanoid", label: "Humanoid", emoji: "🧑‍🤖" },
  { id: "stationary", label: "Stationary / Kiosk", emoji: "🖥️" },
];

const SIZES = [
  { id: "tiny", label: "Tiny (fits in your hand)", emoji: "🤏" },
  { id: "small", label: "Small (like a cat)", emoji: "🐱" },
  { id: "medium", label: "Medium (like a dog)", emoji: "🐕" },
  { id: "large", label: "Large (like a person)", emoji: "🧍" },
  { id: "huge", label: "Huge (like a car)", emoji: "🚗" },
];

const AI_FEATURES = [
  { id: "vision", label: "Computer Vision", emoji: "👁️", desc: "Sees and recognizes things" },
  { id: "speech", label: "Voice & Speech", emoji: "🗣️", desc: "Talks and listens" },
  { id: "learning", label: "Self-Learning", emoji: "🧠", desc: "Gets smarter over time" },
  { id: "navigation", label: "Smart Navigation", emoji: "🗺️", desc: "Finds its way around" },
  { id: "emotion", label: "Emotion Detection", emoji: "😊", desc: "Reads human feelings" },
  { id: "prediction", label: "Prediction", emoji: "🔮", desc: "Forecasts what will happen" },
  { id: "manipulation", label: "Precision Hands", emoji: "🤲", desc: "Handles objects carefully" },
  { id: "communication", label: "Team Comms", emoji: "📡", desc: "Works with other robots" },
];

const PRICE_POINTS = [
  { id: "cheap", label: "$99 — Affordable for everyone", emoji: "💵" },
  { id: "mid", label: "$999 — Mid-range for families", emoji: "💰" },
  { id: "premium", label: "$9,999 — Premium for businesses", emoji: "💎" },
  { id: "enterprise", label: "$99,999 — Enterprise for governments", emoji: "🏛️" },
];

const BUYERS = [
  { id: "families", label: "Families", emoji: "👨‍👩‍👧‍👦" },
  { id: "schools", label: "Schools", emoji: "🏫" },
  { id: "hospitals", label: "Hospitals", emoji: "🏥" },
  { id: "governments", label: "Governments", emoji: "🏛️" },
  { id: "businesses", label: "Businesses", emoji: "🏢" },
  { id: "nonprofits", label: "Nonprofits / NGOs", emoji: "🌍" },
];

export function RobotPitch({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState<string | null>(null);
  const [robotName, setRobotName] = useState("");
  const [robotType, setRobotType] = useState<string | null>(null);
  const [robotSize, setRobotSize] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [learningText, setLearningText] = useState("");
  const [price, setPrice] = useState<string | null>(null);
  const [buyer, setBuyer] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const selProblem = PROBLEMS.find((p) => p.id === problem);
  const selType = ROBOT_TYPES.find((t) => t.id === robotType);
  const selSize = SIZES.find((s) => s.id === robotSize);
  const selFeatures = AI_FEATURES.filter((f) => features.includes(f.id));
  const selPrice = PRICE_POINTS.find((p) => p.id === price);
  const selBuyer = BUYERS.find((b) => b.id === buyer);

  const STEPS = [
    { label: "Problem", valid: !!problem },
    { label: "Design", valid: !!robotName.trim() && !!robotType && !!robotSize },
    { label: "AI Features", valid: features.length === 3 },
    { label: "Learning", valid: learningText.trim().length >= 10 },
    { label: "Business", valid: !!price && !!buyer },
  ];

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-space-800 rounded-2xl p-6 border border-slate-700"
      >
        <div className="text-center mb-3">
          <div className="text-4xl mb-2">🚀</div>
          <h2 className="text-xl font-bold text-white">Your Robot Pitch</h2>
        </div>

        <div className="bg-space-900 rounded-xl p-5 border border-zinc-400/30 mb-5">
          <h3 className="text-2xl font-bold text-zinc-400 text-center mb-1">{robotName}</h3>
          <p className="text-slate-500 text-center text-sm mb-4">
            {selType?.emoji} {selType?.label} &bull; {selSize?.emoji} {selSize?.label}
          </p>

          <div className="bg-space-800 rounded-lg p-3 mb-3">
            <div className="text-xs text-slate-500 mb-1">THE PROBLEM</div>
            <div className="text-white">{selProblem?.emoji} {selProblem?.label}</div>
          </div>

          <div className="bg-space-800 rounded-lg p-3 mb-3">
            <div className="text-xs text-slate-500 mb-2">AI POWERS</div>
            <div className="flex flex-wrap gap-2">
              {selFeatures.map((f) => (
                <span key={f.id} className="px-2 py-1 bg-zinc-400/20 text-zinc-400 rounded-full text-xs font-medium">
                  {f.emoji} {f.label}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-space-800 rounded-lg p-3 mb-3">
            <div className="text-xs text-slate-500 mb-1">HOW IT LEARNS</div>
            <p className="text-slate-300 text-sm">{learningText}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-space-800 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">PRICE</div>
              <div className="text-white text-sm">{selPrice?.emoji} {selPrice?.label.split("—")[0]}</div>
            </div>
            <div className="bg-space-800 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">TARGET BUYER</div>
              <div className="text-white text-sm">{selBuyer?.emoji} {selBuyer?.label}</div>
            </div>
          </div>
        </div>

        <p className="text-slate-300 text-sm text-center mb-4">
          Amazing pitch! You thought about the problem, the tech, and the business. That&apos;s how real tech companies work!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="w-full py-3 bg-zinc-400 text-space-900 font-bold rounded-xl"
        >
          Complete Challenge
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="bg-space-800 rounded-2xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">🚀 Robot Pitch Builder</h2>
        <span className="text-zinc-400 text-sm font-mono">Step {step + 1}/5</span>
      </div>

      {/* Step indicators */}
      <div className="flex gap-1 mb-5">
        {STEPS.map((s, i) => (
          <div key={i} className="flex-1 text-center">
            <div className={`h-2 rounded-full mb-1 ${i <= step ? "bg-zinc-400" : "bg-space-900"}`} />
            <span className={`text-xs ${i === step ? "text-zinc-400" : "text-slate-500"}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <h3 className="text-white font-bold mb-3">Choose a Real-World Problem</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {PROBLEMS.map((p) => (
                <motion.button
                  key={p.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setProblem(p.id)}
                  className={`p-3 rounded-xl border-2 text-left ${
                    problem === p.id ? "border-zinc-400 bg-zinc-400/10" : "border-slate-700 bg-space-900 hover:border-slate-500"
                  }`}
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <div className="text-white text-sm font-bold mt-1">{p.label}</div>
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => problem && setStep(1)}
              disabled={!problem}
              className={`w-full py-3 font-bold rounded-xl ${problem ? "bg-zinc-400 text-space-900" : "bg-slate-700 text-slate-500 cursor-not-allowed"}`}
            >
              Next →
            </motion.button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <h3 className="text-white font-bold mb-3">Design Your Robot</h3>
            <input
              type="text"
              value={robotName}
              onChange={(e) => setRobotName(e.target.value)}
              placeholder="Robot name..."
              maxLength={25}
              className="w-full bg-space-900 border-2 border-slate-700 rounded-xl px-4 py-3 text-white font-bold mb-3 placeholder:text-slate-500 focus:border-zinc-400 focus:outline-none"
            />
            <p className="text-slate-300 text-sm mb-2">Body type:</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {ROBOT_TYPES.map((t) => (
                <motion.button
                  key={t.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRobotType(t.id)}
                  className={`p-2 rounded-lg border text-center text-sm ${
                    robotType === t.id ? "border-zinc-400 bg-zinc-400/10 text-white" : "border-slate-700 bg-space-900 text-slate-300"
                  }`}
                >
                  <span className="text-lg block">{t.emoji}</span>{t.label}
                </motion.button>
              ))}
            </div>
            <p className="text-slate-300 text-sm mb-2">Size:</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {SIZES.map((s) => (
                <motion.button
                  key={s.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRobotSize(s.id)}
                  className={`p-2 rounded-lg border text-center text-xs ${
                    robotSize === s.id ? "border-zinc-400 bg-zinc-400/10 text-white" : "border-slate-700 bg-space-900 text-slate-300"
                  }`}
                >
                  <span className="text-lg block">{s.emoji}</span>{s.label}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="py-3 px-4 text-slate-300 hover:text-white">← Back</button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => STEPS[1].valid && setStep(2)}
                disabled={!STEPS[1].valid}
                className={`flex-1 py-3 font-bold rounded-xl ${STEPS[1].valid ? "bg-zinc-400 text-space-900" : "bg-slate-700 text-slate-500 cursor-not-allowed"}`}
              >
                Next →
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <h3 className="text-white font-bold mb-1">Pick 3 AI Features</h3>
            <p className="text-slate-300 text-sm mb-3">Selected: {features.length}/3</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {AI_FEATURES.map((f) => (
                <motion.button
                  key={f.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleFeature(f.id)}
                  className={`p-2 rounded-lg border text-left text-sm ${
                    features.includes(f.id)
                      ? "border-zinc-400 bg-zinc-400/10"
                      : features.length >= 3
                      ? "border-slate-700 bg-space-900 opacity-40"
                      : "border-slate-700 bg-space-900 hover:border-slate-500"
                  }`}
                >
                  <span className="text-lg">{f.emoji}</span>
                  <div className="text-white font-bold text-xs">{f.label}</div>
                  <div className="text-slate-300 text-xs">{f.desc}</div>
                </motion.button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="py-3 px-4 text-slate-300 hover:text-white">← Back</button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => features.length === 3 && setStep(3)}
                disabled={features.length !== 3}
                className={`flex-1 py-3 font-bold rounded-xl ${features.length === 3 ? "bg-zinc-400 text-space-900" : "bg-slate-700 text-slate-500 cursor-not-allowed"}`}
              >
                Next →
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <h3 className="text-white font-bold mb-3">How Does {robotName} Learn &amp; Improve?</h3>
            <p className="text-slate-300 text-sm mb-3">
              Describe how your robot gets smarter over time. Does it learn from mistakes? Watch humans? Collect data?
            </p>
            <textarea
              value={learningText}
              onChange={(e) => setLearningText(e.target.value)}
              placeholder="Example: My robot watches how nurses care for patients and learns which actions make people feel better. Over time, it gets better at knowing when someone needs help..."
              maxLength={300}
              rows={4}
              className="w-full bg-space-900 border-2 border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-zinc-400 focus:outline-none resize-none mb-1"
            />
            <p className="text-slate-500 text-xs mb-4">{learningText.length}/300 characters (min 10)</p>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="py-3 px-4 text-slate-300 hover:text-white">← Back</button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => STEPS[3].valid && setStep(4)}
                disabled={!STEPS[3].valid}
                className={`flex-1 py-3 font-bold rounded-xl ${STEPS[3].valid ? "bg-zinc-400 text-space-900" : "bg-slate-700 text-slate-500 cursor-not-allowed"}`}
              >
                Next →
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <h3 className="text-white font-bold mb-3">Business Plan</h3>
            <p className="text-slate-300 text-sm mb-2">Price point:</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {PRICE_POINTS.map((p) => (
                <motion.button
                  key={p.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setPrice(p.id)}
                  className={`p-2 rounded-lg border text-left text-sm ${
                    price === p.id ? "border-zinc-400 bg-zinc-400/10 text-white" : "border-slate-700 bg-space-900 text-slate-300"
                  }`}
                >
                  <span className="text-lg">{p.emoji}</span>
                  <div className="text-xs mt-1">{p.label}</div>
                </motion.button>
              ))}
            </div>
            <p className="text-slate-300 text-sm mb-2">Who would buy this?</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {BUYERS.map((b) => (
                <motion.button
                  key={b.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setBuyer(b.id)}
                  className={`p-2 rounded-lg border text-center text-xs ${
                    buyer === b.id ? "border-zinc-400 bg-zinc-400/10 text-white" : "border-slate-700 bg-space-900 text-slate-300"
                  }`}
                >
                  <span className="text-lg block">{b.emoji}</span>{b.label}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="py-3 px-4 text-slate-300 hover:text-white">← Back</button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => STEPS[4].valid && setFinished(true)}
                disabled={!STEPS[4].valid}
                className={`flex-1 py-3 font-bold rounded-xl ${STEPS[4].valid ? "bg-zinc-400 text-space-900" : "bg-slate-700 text-slate-500 cursor-not-allowed"}`}
              >
                See My Pitch! 🚀
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
