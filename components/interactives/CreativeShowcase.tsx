"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Challenge {
  category: string;
  icon: string;
  brief: string;
  options: { label: string; description: string; quality: "great" | "ok" | "weak"; feedback: string }[];
}

const CHALLENGES: Challenge[] = [
  {
    category: "Story Concept",
    icon: "📖",
    brief: "You're making a short animated film. Pick the strongest creative direction:",
    options: [
      {
        label: "Tell AI: 'Make a story'",
        description: "No direction, no theme, no constraints.",
        quality: "weak",
        feedback: "Too vague! Without human direction, AI produces generic, forgettable output. The creative director (you!) needs to provide vision.",
      },
      {
        label: "Tell AI: 'Write a 2-minute story about a lonely lighthouse keeper who discovers their light attracts star creatures'",
        description: "Specific concept, emotional hook, unique premise.",
        quality: "great",
        feedback: "Excellent creative direction! You provided the emotional core (loneliness), a unique concept (star creatures), and constraints (2 minutes). AI can now help execute YOUR vision.",
      },
      {
        label: "Tell AI: 'Make something about sadness'",
        description: "An emotion but no story, characters, or context.",
        quality: "ok",
        feedback: "An emotion is a start, but AI needs more: Who's sad? Why? What happens? Great creative directors give AI specific building blocks.",
      },
    ],
  },
  {
    category: "Visual Design",
    icon: "🎨",
    brief: "You're designing a poster for a school science fair. Pick the best approach:",
    options: [
      {
        label: "Ask AI to generate 10 poster designs, then pick the prettiest one",
        description: "Let AI decide everything, you just choose at the end.",
        quality: "ok",
        feedback: "Better than nothing, but you're not directing — just picking. A creative director shapes the process, not just the result.",
      },
      {
        label: "Define the mood (exciting, curious), colors (deep blue + bright yellow), and key elements (microscope, DNA, stars), then ask AI for options",
        description: "You set the vision, AI executes variations.",
        quality: "great",
        feedback: "Perfect creative direction! You defined the emotional goal, visual identity, and key symbols. Now AI generates options within YOUR vision — that's true collaboration.",
      },
      {
        label: "Copy a poster design from the internet and change the text",
        description: "Use existing work as-is.",
        quality: "weak",
        feedback: "This isn't creative direction — it's copying. Neither you nor AI contributed original creative thinking. Start with YOUR ideas, then use AI to bring them to life.",
      },
    ],
  },
  {
    category: "Music Direction",
    icon: "🎵",
    brief: "You're creating background music for a nature documentary scene. Pick the strongest approach:",
    options: [
      {
        label: "Tell AI: 'Make music'",
        description: "No genre, mood, instrumentation, or context.",
        quality: "weak",
        feedback: "Way too vague. AI has no idea what this music is FOR. Music serves a purpose — help AI understand the emotional goal.",
      },
      {
        label: "Tell AI: 'Make happy music with guitar'",
        description: "Basic direction with one instrument.",
        quality: "ok",
        feedback: "A start, but 'happy' is broad and doesn't match a nature documentary's tone. Consider: what emotion should viewers feel during this specific scene?",
      },
      {
        label: "Tell AI: 'Create a 90-second ambient piece: gentle piano and strings, building from quiet wonder to sweeping awe, inspired by sunrise over mountains'",
        description: "Specific mood arc, instrumentation, duration, and visual reference.",
        quality: "great",
        feedback: "Outstanding direction! You specified duration, instruments, emotional arc (wonder to awe), and a visual reference. This gives AI everything it needs to create something meaningful.",
      },
    ],
  },
  {
    category: "Game Design",
    icon: "🎮",
    brief: "You're designing a puzzle game for kids ages 8-12. Pick the best creative strategy:",
    options: [
      {
        label: "Have AI generate random puzzles and see what's fun",
        description: "Trial and error with no design intent.",
        quality: "ok",
        feedback: "You might stumble onto something good, but great games are designed with intention. Think about what makes puzzles satisfying for 8-12 year olds specifically.",
      },
      {
        label: "Design the core mechanic yourself (connecting colored pipes), then use AI to generate 100 level layouts with increasing difficulty",
        description: "Human designs the system, AI scales the content.",
        quality: "great",
        feedback: "This is how pro game developers work with AI! You designed the fun part (the core mechanic), then used AI's strength (generating lots of content quickly) to scale it up.",
      },
      {
        label: "Ask AI to design the entire game from scratch",
        description: "Let AI handle everything.",
        quality: "weak",
        feedback: "AI doesn't understand what makes games FUN for real kids. Game design requires understanding human psychology, frustration tolerance, and joy — things AI can't feel.",
      },
    ],
  },
];

export function CreativeShowcase({ onComplete }: { onComplete: (passed: boolean) => void }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function pickOption(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const quality = CHALLENGES[idx].options[i].quality;
    if (quality === "great") setScore((s) => s + 2);
    else if (quality === "ok") setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    if (idx >= CHALLENGES.length - 1) {
      setDone(true);
      const finalScore = score + (picked !== null ? (CHALLENGES[idx].options[picked].quality === "great" ? 2 : CHALLENGES[idx].options[picked].quality === "ok" ? 1 : 0) : 0);
      onComplete(finalScore >= CHALLENGES.length);
    } else {
      setIdx((i) => i + 1);
    }
  }

  if (done) {
    const maxScore = CHALLENGES.length * 2;
    const pct = Math.round((score / maxScore) * 100);
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          {pct >= 75 ? "🎬" : "🎥"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{maxScore}</div>
          <div className="text-slate-400 text-sm mt-1">creative direction score</div>
          <div className="text-slate-300 mt-3">
            {pct >= 90 ? "Creative Director level! You know how to lead AI to great results." : pct >= 60 ? "Strong creative vision! You understand the human-AI partnership." : "Keep practicing — great creative direction is a skill that grows!"}
          </div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/40 rounded-2xl p-4">
          <div className="font-black text-blue-300">{pct >= 50 ? "Badge Earned! 🎬" : "Challenge Complete!"}</div>
          <p className="text-sm text-slate-400 mt-1">The best AI creativity happens when you bring clear vision, specific direction, and intentional choices. You&apos;re the director — AI amplifies your creativity.</p>
        </div>
      </div>
    );
  }

  const challenge = CHALLENGES[idx];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {CHALLENGES.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < idx ? "bg-blue-500" : i === idx ? "bg-blue-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs text-slate-400 font-bold">{idx + 1}/{CHALLENGES.length}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-xs font-black text-blue-400">CREATIVE SHOWCASE</div>
          <div className="text-xs font-bold text-slate-500">— {challenge.category}</div>
        </div>

        <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-4">
          <div className="text-2xl mb-2">{challenge.icon}</div>
          <div className="text-white font-black">{challenge.brief}</div>
        </div>

        {picked === null ? (
          <div className="space-y-3">
            {challenge.options.map((opt, i) => (
              <motion.button key={i} onClick={() => pickOption(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-4 rounded-xl border border-slate-700 bg-space-900 hover:border-blue-500/50 transition-colors">
                <div className="font-black text-white text-sm mb-1">{opt.label}</div>
                <div className="text-xs text-slate-400">{opt.description}</div>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className={`p-4 rounded-xl text-sm font-bold ${
              challenge.options[picked].quality === "great" ? "bg-green-500/20 text-green-300" :
              challenge.options[picked].quality === "ok" ? "bg-yellow-500/20 text-yellow-300" :
              "bg-red-500/20 text-red-300"
            }`}>
              {challenge.options[picked].quality === "great" ? "Excellent choice! " :
               challenge.options[picked].quality === "ok" ? "Decent, but could be stronger. " :
               "This won't get great results. "}
              <span className="font-normal text-slate-300">{challenge.options[picked].feedback}</span>
            </div>
            <button onClick={next} className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors">
              {idx < CHALLENGES.length - 1 ? "Next Challenge" : "See Final Score"} &rarr;
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
