"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AITool {
  name: string;
  icon: string;
  color: string;
  description: string;
  whatItDoes: string;
  projectIdea: string;
  difficulty: number;
  demoScenario: string;
  demoResult: string;
}

const TOOLS: AITool[] = [
  {
    name: "Teachable Machine",
    icon: "🧠",
    color: "from-lime-500/20 to-green-500/20",
    description: "Train AI to recognize images, sounds, or poses — no coding needed!",
    whatItDoes: "You show it examples of different things (like pictures of cats vs dogs) and it learns to tell them apart. You're literally teaching the AI!",
    projectIdea: "Build a 'Rock Paper Scissors' game where AI recognizes your hand gesture through the camera!",
    difficulty: 1,
    demoScenario: "Imagine you showed it 20 photos of happy faces and 20 photos of sad faces...",
    demoResult: "It learned! Now when you show a new face, it says: 😊 Happy (94% confident) — It works by finding patterns in the photos you gave it, like smile curves and eye shapes.",
  },
  {
    name: "Scratch + ML",
    icon: "🐱",
    color: "from-orange-500/20 to-yellow-500/20",
    description: "Add machine learning to Scratch projects with simple blocks!",
    whatItDoes: "You use special Scratch blocks that let your sprites understand text, images, or numbers using AI. Code with drag-and-drop, but now with AI powers!",
    projectIdea: "Make a game where the sprite understands voice commands — say 'jump' and it jumps, say 'duck' and it ducks!",
    difficulty: 2,
    demoScenario: "You teach your Scratch sprite to recognize the words 'up', 'down', 'left', 'right'...",
    demoResult: "Your sprite now follows voice commands! Say 'up' and it flies, 'down' and it dives. You just made a voice-controlled game — that's AI + coding together!",
  },
  {
    name: "ChatGPT",
    icon: "💬",
    color: "from-teal-500/20 to-cyan-500/20",
    description: "An AI that can write, explain, brainstorm, and answer questions!",
    whatItDoes: "You type questions or instructions and it responds with human-like text. It was trained on billions of words from the internet. Great for brainstorming and learning!",
    projectIdea: "Create an AI-powered story generator where you pick characters and settings, and AI helps write the adventure!",
    difficulty: 1,
    demoScenario: "You ask: 'Help me write a story about a robot who wants to be an artist'...",
    demoResult: "AI writes: 'Unit-7 had always been different. While other robots calculated and computed, Unit-7 noticed how sunset light painted the factory walls in gold...' — It generates creative text by predicting what words come next!",
  },
  {
    name: "Image Generator",
    icon: "🎨",
    color: "from-purple-500/20 to-pink-500/20",
    description: "Describe any image in words and AI creates it!",
    whatItDoes: "You type a description like 'a dragon reading a book in a library' and the AI creates a brand new image that has never existed before. It learned from millions of images and descriptions.",
    projectIdea: "Design a card game where AI generates unique monster illustrations based on your descriptions!",
    difficulty: 2,
    demoScenario: "You type: 'A friendly robot chef cooking spaghetti in a treehouse kitchen'...",
    demoResult: "The AI creates a colorful image of exactly that! A smiling robot with a chef hat, stirring a pot among tree branches. Every image it makes is unique — it's not copying, it's creating from patterns it learned!",
  },
  {
    name: "Music AI",
    icon: "🎵",
    color: "from-blue-500/20 to-indigo-500/20",
    description: "Generate original music by picking a style, mood, and instruments!",
    whatItDoes: "You choose a genre (rock, jazz, electronic), a mood (happy, epic, chill), and instruments, and the AI composes original music. It learned patterns from thousands of songs.",
    projectIdea: "Build a 'mood soundtrack' app — take a selfie, AI detects your mood, then generates matching music!",
    difficulty: 3,
    demoScenario: "You pick: Genre = Electronic, Mood = Epic, Tempo = Fast...",
    demoResult: "AI generates 30 seconds of pumping electronic music with dramatic builds and drops! It creates note patterns, rhythms, and instrument layers — all original music that never existed before!",
  },
];

export function ToolkitTour({ onComplete }: { onComplete: () => void }) {
  const [explored, setExplored] = useState<boolean[]>(TOOLS.map(() => false));
  const [activeTool, setActiveTool] = useState<number | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [favorite, setFavorite] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const allExplored = explored.every(Boolean);

  const handleExploreTool = (index: number) => {
    setActiveTool(index);
    setShowDemo(false);
    const next = [...explored];
    next[index] = true;
    setExplored(next);
  };

  const handlePickFavorite = (index: number) => {
    setFavorite(index);
  };

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  // Favorite picking phase
  if (allExplored && activeTool === null && favorite === null) {
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-700 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">⭐ Pick Your Favorite!</h2>
        <p className="text-slate-300 text-sm mb-4">
          You&apos;ve explored all 5 tools. Which one would you most want to build with?
        </p>
        <div className="space-y-2">
          {TOOLS.map((tool, i) => (
            <motion.button
              key={tool.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePickFavorite(i)}
              className="w-full p-3 bg-space-800 rounded-lg border border-slate-700 hover:border-lime-500 flex items-center gap-3 text-left"
            >
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <p className="text-white font-semibold">{tool.name}</p>
                <p className="text-slate-300 text-xs">{tool.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Favorite chosen
  if (favorite !== null) {
    const fav = TOOLS[favorite];
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-700 max-w-2xl mx-auto">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="text-center">
            <span className="text-5xl">{fav.icon}</span>
            <h2 className="text-2xl font-bold text-white mt-2">Great Choice!</h2>
            <p className="text-lime-400 font-semibold mt-1">You picked: {fav.name}</p>
            <div className="bg-space-800 rounded-lg p-4 mt-4 text-left">
              <p className="text-lime-400 font-semibold mb-1">🚀 Project Idea:</p>
              <p className="text-slate-300 text-sm">{fav.projectIdea}</p>
            </div>
            <div className="bg-space-800 rounded-lg p-4 mt-3 text-left">
              <p className="text-lime-400 font-semibold mb-1">💡 Toolkit Summary:</p>
              <p className="text-slate-300 text-sm">
                You explored {TOOLS.length} different AI tools today! Remember — each tool is good at
                different things. The best builders know which tool fits which job.
              </p>
            </div>
            {!done ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                className="mt-4 px-6 py-3 bg-lime-500 text-white rounded-lg font-bold"
              >
                Complete Tour ✓
              </motion.button>
            ) : (
              <p className="mt-4 text-lime-400 font-semibold">✓ Activity Complete!</p>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Tool detail view
  if (activeTool !== null) {
    const tool = TOOLS[activeTool];
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-700 max-w-2xl mx-auto">
        <button
          onClick={() => setActiveTool(null)}
          className="text-slate-400 text-sm hover:text-white mb-3"
        >
          ← Back to all tools
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${tool.color} rounded-xl p-5 border border-slate-700`}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{tool.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-white">{tool.name}</h3>
              <div className="flex gap-0.5">
                {[1, 2, 3].map((star) => (
                  <span key={star} className={star <= tool.difficulty ? "text-lime-400" : "text-slate-600"}>
                    ⭐
                  </span>
                ))}
                <span className="text-slate-400 text-xs ml-1">difficulty</span>
              </div>
            </div>
          </div>

          <div className="bg-space-900/60 rounded-lg p-3 mb-3">
            <p className="text-lime-400 font-semibold text-sm mb-1">What it does:</p>
            <p className="text-slate-300 text-sm">{tool.whatItDoes}</p>
          </div>

          <div className="bg-space-900/60 rounded-lg p-3 mb-3">
            <p className="text-lime-400 font-semibold text-sm mb-1">🚀 Project idea:</p>
            <p className="text-slate-300 text-sm">{tool.projectIdea}</p>
          </div>

          {!showDemo ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDemo(true)}
              className="w-full px-4 py-2 bg-lime-500 text-white rounded-lg font-bold"
            >
              ▶️ Try Mini Demo
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-space-900/80 rounded-lg p-3 border border-lime-500/30"
            >
              <p className="text-white text-sm mb-2 font-semibold">{tool.demoScenario}</p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-lime-300 text-sm">{tool.demoResult}</p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {showDemo && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTool(null)}
            className="w-full mt-3 px-4 py-2 bg-space-800 border border-lime-500/50 text-lime-400 rounded-lg font-semibold"
          >
            Back to All Tools ({explored.filter(Boolean).length}/5 explored)
          </motion.button>
        )}
      </div>
    );
  }

  // Tool grid
  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-700 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-1">🧰 AI Toolkit Tour</h2>
      <p className="text-slate-300 text-sm mb-4">
        Explore 5 AI tools! Click each to learn what it does and try a mini demo.
        ({explored.filter(Boolean).length}/5 explored)
      </p>

      <div className="space-y-2">
        {TOOLS.map((tool, i) => (
          <motion.button
            key={tool.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleExploreTool(i)}
            className={`w-full p-3 rounded-lg border flex items-center gap-3 text-left transition-colors ${
              explored[i]
                ? "bg-lime-500/10 border-lime-500/40"
                : "bg-space-800 border-slate-700 hover:border-slate-500"
            }`}
          >
            <span className="text-2xl">{tool.icon}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold">{tool.name}</p>
                {explored[i] && <span className="text-lime-400 text-xs">✓ Explored</span>}
              </div>
              <p className="text-slate-300 text-xs">{tool.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {allExplored && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTool(null)}
          className="w-full mt-4 px-5 py-2 bg-lime-500 text-white rounded-lg font-bold"
        >
          Pick Your Favorite! →
        </motion.button>
      )}
    </div>
  );
}
