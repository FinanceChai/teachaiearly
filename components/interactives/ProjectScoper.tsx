"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Category {
  name: string;
  icon: string;
  useCases: { name: string; description: string }[];
}

const CATEGORIES: Category[] = [
  {
    name: "Image Recognition",
    icon: "👁️",
    useCases: [
      { name: "Plant Identifier", description: "Take a photo of any plant and AI tells you what it is" },
      { name: "Emotion Detector", description: "AI reads facial expressions to guess how someone feels" },
      { name: "Art Style Sorter", description: "AI identifies the style of a painting (abstract, realistic, etc.)" },
      { name: "Recycling Helper", description: "Take a photo of trash and AI tells you which bin it goes in" },
    ],
  },
  {
    name: "Language AI",
    icon: "💬",
    useCases: [
      { name: "Story Writer", description: "AI helps you co-write creative stories with plot twists" },
      { name: "Homework Helper", description: "AI explains tricky concepts in simple words" },
      { name: "Language Buddy", description: "AI chats with you in another language to help you practice" },
      { name: "Joke Generator", description: "AI creates custom jokes based on topics you like" },
    ],
  },
  {
    name: "Sound AI",
    icon: "🔊",
    useCases: [
      { name: "Bird Song ID", description: "Record bird sounds and AI identifies the species" },
      { name: "Music Mixer", description: "AI creates background music matching your mood" },
      { name: "Voice Changer", description: "AI transforms your voice into different characters" },
      { name: "Sound Effects Maker", description: "Describe a sound and AI generates it for you" },
    ],
  },
  {
    name: "Game AI",
    icon: "🎮",
    useCases: [
      { name: "Smart NPC Creator", description: "Build game characters that learn and adapt to the player" },
      { name: "Level Generator", description: "AI creates new game levels that match your skill" },
      { name: "Gesture Game", description: "Control a game using hand gestures through the camera" },
      { name: "AI Opponent", description: "An AI that learns your playing style and gets better" },
    ],
  },
];

const AUDIENCES = [
  { name: "Kids (5-8)", icon: "🧒", description: "Simple, colorful, fun and safe" },
  { name: "Students (9-12)", icon: "📚", description: "Educational, engaging, age-appropriate" },
  { name: "Teachers", icon: "👩‍🏫", description: "Classroom tools, progress tracking" },
  { name: "Everyone", icon: "🌍", description: "All ages, universal appeal" },
];

const MVP_FEATURES = [
  { name: "Simple main screen", icon: "📱" },
  { name: "AI powered core feature", icon: "🧠" },
  { name: "Save/share results", icon: "💾" },
  { name: "Tutorial walkthrough", icon: "📖" },
  { name: "Fun animations", icon: "✨" },
  { name: "Score/progress tracker", icon: "📊" },
  { name: "Multiple difficulty levels", icon: "📈" },
  { name: "Dark/light mode", icon: "🌙" },
];

export function ProjectScoper({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<number | null>(null);
  const [useCase, setUseCase] = useState<number | null>(null);
  const [audience, setAudience] = useState<number | null>(null);
  const [features, setFeatures] = useState<boolean[]>(MVP_FEATURES.map(() => false));
  const [done, setDone] = useState(false);

  const selectedFeatureCount = features.filter(Boolean).length;

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  // Project Brief
  if (step === 4) {
    const cat = CATEGORIES[category!];
    const uc = cat.useCases[useCase!];
    const aud = AUDIENCES[audience!];
    const selectedFeatures = MVP_FEATURES.filter((_, i) => features[i]);

    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-700 max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            📋 Your Project Brief
          </h2>

          <div className="bg-gradient-to-br from-lime-500/10 to-green-500/10 rounded-xl p-5 border border-lime-500/30">
            <div className="text-center mb-4">
              <span className="text-4xl">{cat.icon}</span>
              <h3 className="text-xl font-bold text-lime-400 mt-1">{uc.name}</h3>
              <p className="text-slate-300 text-sm">{uc.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-space-900/60 rounded-lg p-3">
                <p className="text-lime-400 text-xs font-semibold">Category</p>
                <p className="text-white text-sm">{cat.icon} {cat.name}</p>
              </div>
              <div className="bg-space-900/60 rounded-lg p-3">
                <p className="text-lime-400 text-xs font-semibold">Audience</p>
                <p className="text-white text-sm">{aud.icon} {aud.name}</p>
              </div>
            </div>

            <div className="bg-space-900/60 rounded-lg p-3">
              <p className="text-lime-400 text-xs font-semibold mb-2">MVP Features</p>
              <div className="flex flex-wrap gap-1">
                {selectedFeatures.map((f) => (
                  <span
                    key={f.name}
                    className="bg-lime-500/20 text-lime-300 px-2 py-0.5 rounded text-xs"
                  >
                    {f.icon} {f.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-space-800 rounded-lg p-4 mt-4">
            <p className="text-lime-400 font-semibold mb-1">💡 What you learned:</p>
            <p className="text-slate-300 text-sm">
              You just turned a vague idea (&quot;I want to build an AI app&quot;) into a specific,
              buildable project! Real developers do this exact process — it&apos;s called &quot;scoping.&quot;
              Starting small with an MVP is the secret to actually finishing projects!
            </p>
          </div>

          {!done ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              className="w-full mt-4 px-6 py-3 bg-lime-500 text-white rounded-lg font-bold"
            >
              Complete Scoping ✓
            </motion.button>
          ) : (
            <p className="text-center mt-4 text-lime-400 font-semibold">✓ Activity Complete!</p>
          )}
        </motion.div>
      </div>
    );
  }

  const stepTitles = [
    { title: "Start with a Big Idea", subtitle: "\"I want to build an AI app!\" — Great! But that's too vague. Let's narrow it down." },
    { title: "Pick a Category", subtitle: "What kind of AI will your app use?" },
    { title: "Who Is It For?", subtitle: "Every great app has a specific audience in mind." },
    { title: "Pick MVP Features", subtitle: "MVP = Minimum Viable Product. Pick only 2-3 features to start!" },
  ];

  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-700 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-1">🎯 Project Scoper</h2>

      <div className="flex gap-1 mb-4">
        {[0, 1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded-full ${s <= step ? "bg-lime-500" : "bg-space-800"}`}
          />
        ))}
      </div>

      <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
        <h3 className="text-lg font-bold text-lime-400 mb-1">{stepTitles[step].title}</h3>
        <p className="text-slate-300 text-sm mb-4">{stepTitles[step].subtitle}</p>

        {step === 0 && (
          <div className="space-y-3">
            <div className="bg-space-800 rounded-lg p-4 border border-slate-700 text-center">
              <span className="text-4xl">💡</span>
              <p className="text-white font-bold mt-2">&quot;I want to build an AI app!&quot;</p>
              <p className="text-slate-400 text-sm mt-1">
                Cool idea! But which kind? Let&apos;s figure it out step by step.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(1)}
              className="w-full px-5 py-2 bg-lime-500 text-white rounded-lg font-bold"
            >
              Let&apos;s Narrow It Down →
            </motion.button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-2">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  setCategory(i);
                  setUseCase(null);
                }}
                className={`w-full p-3 rounded-lg border text-left ${
                  category === i
                    ? "bg-lime-500/20 border-lime-500"
                    : "bg-space-800 border-slate-700 hover:border-slate-500"
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="text-white font-semibold ml-2">{cat.name}</span>
              </motion.button>
            ))}

            {category !== null && (
              <div className="mt-3">
                <p className="text-slate-300 text-sm mb-2">Now pick a specific project:</p>
                {CATEGORIES[category].useCases.map((uc, i) => (
                  <motion.button
                    key={uc.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setUseCase(i)}
                    className={`w-full p-2 rounded-lg border text-left mb-1 ${
                      useCase === i
                        ? "bg-lime-500/20 border-lime-500"
                        : "bg-space-800 border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    <p className="text-white text-sm font-semibold">{uc.name}</p>
                    <p className="text-slate-400 text-xs">{uc.description}</p>
                  </motion.button>
                ))}
              </div>
            )}

            {useCase !== null && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(2)}
                className="w-full mt-2 px-5 py-2 bg-lime-500 text-white rounded-lg font-bold"
              >
                Next: Pick Audience →
              </motion.button>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            {AUDIENCES.map((aud, i) => (
              <motion.button
                key={aud.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setAudience(i)}
                className={`w-full p-3 rounded-lg border text-left ${
                  audience === i
                    ? "bg-lime-500/20 border-lime-500"
                    : "bg-space-800 border-slate-700 hover:border-slate-500"
                }`}
              >
                <span className="text-xl">{aud.icon}</span>
                <span className="text-white font-semibold ml-2">{aud.name}</span>
                <span className="text-slate-400 text-sm ml-2">— {aud.description}</span>
              </motion.button>
            ))}

            {audience !== null && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(3)}
                className="w-full mt-2 px-5 py-2 bg-lime-500 text-white rounded-lg font-bold"
              >
                Next: Pick Features →
              </motion.button>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-sm text-slate-400 mb-2">
              Selected: {selectedFeatureCount}/8 (pick 2-3 to keep it simple!)
            </p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {MVP_FEATURES.map((f, i) => (
                <motion.button
                  key={f.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    const next = [...features];
                    next[i] = !next[i];
                    setFeatures(next);
                  }}
                  className={`p-2 rounded-lg border text-left ${
                    features[i]
                      ? "bg-lime-500/20 border-lime-500"
                      : "bg-space-800 border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <span className="text-lg">{f.icon}</span>
                  <p className="text-white text-xs font-semibold">{f.name}</p>
                </motion.button>
              ))}
            </div>

            {selectedFeatureCount >= 2 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(4)}
                className="w-full px-5 py-2 bg-lime-500 text-white rounded-lg font-bold"
              >
                Generate Project Brief →
              </motion.button>
            )}
            {selectedFeatureCount > 3 && (
              <p className="text-yellow-400 text-xs mt-2 text-center">
                ⚠️ That&apos;s a lot of features! Real developers start small. Consider picking just 2-3.
              </p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
