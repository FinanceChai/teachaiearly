"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const COOLEST_AI = [
  "ChatGPT and AI chatbots that can have real conversations",
  "Self-driving cars that navigate city streets",
  "AI art generators that create images from words",
  "AI that can beat the best humans at video games",
  "Voice assistants that understand what I say",
  "AI that detects diseases from medical scans",
  "Deepfakes that look completely real",
  "AI music generators that compose original songs",
];

const HOPES = [
  "help cure diseases that we can't treat today",
  "be a personal tutor that helps every kid learn",
  "translate any language perfectly in real time",
  "help clean up the oceans and fight climate change",
  "create amazing video games that are different every time",
  "help people who can't see or hear experience the world",
  "make sure no one goes hungry by optimizing food",
  "be my creative partner for art, music, and writing",
];

const CONTRIBUTIONS = [
  "Learn to code so I can build AI tools that help people",
  "Always think critically about AI and question what I see",
  "Teach others (friends, family) about how AI works",
  "Speak up when I see AI being used unfairly",
  "Stay curious and keep learning about new technology",
  "Build projects that use AI to solve real problems",
  "Make sure AI includes everyone, not just some people",
  "Be responsible about my own data and privacy",
];

const RULES = [
  "AI must always tell you when it's AI, not a human",
  "AI should never make important decisions without humans checking",
  "Everyone should have equal access to AI tools, not just rich people",
  "AI companies must explain how their AI makes decisions",
  "Kids' data should never be used to train AI without permission",
  "AI should be tested for bias before it's used on real people",
  "There should be an 'off switch' for any AI system",
  "AI creators should be responsible when their AI causes harm",
];

export function FutureLetter({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [coolest, setCoolest] = useState<string | null>(null);
  const [hope, setHope] = useState<string | null>(null);
  const [customHope, setCustomHope] = useState("");
  const [contribution, setContribution] = useState<string | null>(null);
  const [customContribution, setCustomContribution] = useState("");
  const [rule, setRule] = useState<string | null>(null);
  const [customRule, setCustomRule] = useState("");
  const [sealed, setSealed] = useState(false);
  const [done, setDone] = useState(false);

  const finalHope = hope === "__custom" ? customHope : hope;
  const finalContribution = contribution === "__custom" ? customContribution : contribution;
  const finalRule = rule === "__custom" ? customRule : rule;

  const futureYear = new Date().getFullYear() + 5;

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  const canContinue = () => {
    switch (step) {
      case 0: return coolest !== null;
      case 1: return finalHope && finalHope.trim().length > 0;
      case 2: return finalContribution && finalContribution.trim().length > 0;
      case 3: return finalRule && finalRule.trim().length > 0;
      default: return false;
    }
  };

  // Sealed letter
  if (step === 4) {
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-700 max-w-2xl mx-auto">
        {!sealed ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">✉️ Your Letter is Ready!</h2>
            <p className="text-slate-300 mb-4">Click to seal it and send it to future you:</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSealed(true)}
              className="w-32 h-32 mx-auto bg-amber-500/20 border-2 border-amber-500 rounded-xl flex items-center justify-center"
            >
              <span className="text-5xl">📨</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-xl p-6 border-2 border-amber-500/50">
              {/* Envelope header */}
              <div className="text-center mb-4 pb-3 border-b border-amber-500/20">
                <p className="text-amber-400 text-xs">📬 TO BE OPENED IN</p>
                <p className="text-2xl font-bold text-white">{futureYear}</p>
                <p className="text-amber-400/60 text-xs">A letter from your younger self</p>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-amber-400 text-xs font-semibold">
                    Right now, the coolest AI thing I know about is...
                  </p>
                  <p className="text-white mt-1">{coolest}</p>
                </div>

                <div>
                  <p className="text-amber-400 text-xs font-semibold">
                    By the time I&apos;m older, I hope AI can...
                  </p>
                  <p className="text-white mt-1">{finalHope}</p>
                </div>

                <div>
                  <p className="text-amber-400 text-xs font-semibold">
                    One thing I&apos;ll do to help shape AI is...
                  </p>
                  <p className="text-white mt-1">{finalContribution}</p>
                </div>

                <div>
                  <p className="text-amber-400 text-xs font-semibold">
                    One AI rule I&apos;d make is...
                  </p>
                  <p className="text-white mt-1">{finalRule}</p>
                </div>
              </div>

              <div className="text-center mt-4 pt-3 border-t border-amber-500/20">
                <p className="text-amber-400/60 text-xs">Sealed with hope for the future ⭐</p>
                <p className="text-slate-400 text-xs mt-1">
                  Written on {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-space-800 rounded-lg p-4 mt-4">
              <p className="text-amber-400 font-semibold mb-1">💡 Your voice matters!</p>
              <p className="text-slate-300 text-sm">
                The future of AI isn&apos;t just decided by tech companies — it&apos;s shaped by
                everyone who uses it, talks about it, and stands up for what&apos;s right.
                Your generation will decide how AI is used. Remember what you wrote here!
              </p>
            </div>

            {!done ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                className="w-full mt-4 px-6 py-3 bg-amber-500 text-white rounded-lg font-bold"
              >
                Complete Letter ✓
              </motion.button>
            ) : (
              <p className="text-center mt-4 text-amber-400 font-semibold">✓ Activity Complete!</p>
            )}
          </motion.div>
        )}
      </div>
    );
  }

  const stepConfigs = [
    { title: "The Coolest AI Thing", prompt: "Right now, the coolest AI thing I know about is..." },
    { title: "My Hope for AI", prompt: "By the time I'm older, I hope AI can..." },
    { title: "My Contribution", prompt: "One thing I'll do to help shape AI is..." },
    { title: "My AI Rule", prompt: "One AI rule I'd make is..." },
  ];

  const currentOptions = step === 0 ? COOLEST_AI : step === 1 ? HOPES : step === 2 ? CONTRIBUTIONS : RULES;
  const currentValue = step === 0 ? coolest : step === 1 ? hope : step === 2 ? contribution : rule;
  const customValue = step === 1 ? customHope : step === 2 ? customContribution : customRule;
  const setCurrentValue = step === 0 ? setCoolest : step === 1 ? setHope : step === 2 ? setContribution : setRule;
  const setCustomValue = step === 1 ? setCustomHope : step === 2 ? setCustomContribution : setCustomRule;

  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-700 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-1">✉️ Letter to Future Me</h2>

      <div className="flex gap-1 mb-4">
        {stepConfigs.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full ${i <= step ? "bg-amber-500" : "bg-space-800"}`}
          />
        ))}
      </div>

      <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
        <h3 className="text-lg font-bold text-amber-400 mb-1">{stepConfigs[step].title}</h3>
        <p className="text-slate-300 text-sm mb-4 italic">&quot;{stepConfigs[step].prompt}&quot;</p>

        <div className="space-y-1.5 mb-3 max-h-52 overflow-y-auto pr-1">
          {currentOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setCurrentValue(option);
                if (step > 0) setCustomValue("");
              }}
              className={`w-full p-2 rounded-lg border text-sm text-left ${
                currentValue === option
                  ? "bg-amber-500/20 border-amber-500 text-white"
                  : "bg-space-800 border-slate-700 text-slate-300 hover:border-slate-500"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {step > 0 && (
          <input
            type="text"
            placeholder="Or write your own..."
            value={customValue}
            onChange={(e) => {
              setCustomValue(e.target.value);
              setCurrentValue("__custom");
            }}
            className="w-full bg-space-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-amber-500 outline-none mb-3"
            maxLength={100}
          />
        )}

        {canContinue() && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep(step + 1)}
            className="w-full px-5 py-2 bg-amber-500 text-white rounded-lg font-bold"
          >
            {step < 3 ? "Next →" : "Seal the Letter! 📨"}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
