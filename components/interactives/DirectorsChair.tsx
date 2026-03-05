"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  humanRole: string;
  aiRole: string;
  humanContributions: string[];
  aiContributions: string[];
}

const PROJECTS: Project[] = [
  {
    title: "Animated Short Film",
    description: "A 3-minute animated film about a robot learning to paint.",
    humanRole: "Creative Director",
    aiRole: "Production Assistant",
    humanContributions: ["Story concept and emotional arc", "Character personality and motivation", "Choosing which scenes matter most", "Deciding the message and theme"],
    aiContributions: ["Generating background art options", "Suggesting color palettes", "Creating multiple character designs to choose from", "Producing in-between animation frames"],
  },
  {
    title: "Children's Book",
    description: "An illustrated storybook about a girl who befriends a cloud.",
    humanRole: "Author & Art Director",
    aiRole: "Illustration Assistant",
    humanContributions: ["Original story idea and plot", "Character voice and dialogue", "Page layout and pacing decisions", "Choosing which illustrations fit the mood"],
    aiContributions: ["Generating illustration options for each page", "Suggesting visual styles", "Creating rough drafts quickly", "Producing variations to compare"],
  },
  {
    title: "Video Game World",
    description: "A fantasy exploration game set on floating islands.",
    humanRole: "Game Designer",
    aiRole: "Asset Generator",
    humanContributions: ["Gameplay mechanics and rules", "World lore and story", "Player experience and emotional journey", "Deciding what makes the game fun"],
    aiContributions: ["Generating terrain textures", "Creating NPC dialogue options", "Producing sound effects", "Building environmental assets quickly"],
  },
];

const SORTING_TASKS = [
  {
    task: "Deciding that the story should make people feel hopeful",
    answer: "human" as const,
    explanation: "Emotional intent requires human understanding of feelings and purpose.",
  },
  {
    task: "Generating 50 background options in 10 minutes",
    answer: "ai" as const,
    explanation: "Speed and volume are AI's strength — producing many options fast.",
  },
  {
    task: "Choosing which of the 50 backgrounds fits the story's mood",
    answer: "human" as const,
    explanation: "Judging what 'fits the mood' requires emotional and artistic judgment.",
  },
  {
    task: "Writing code to animate a character walking",
    answer: "ai" as const,
    explanation: "AI can handle technical execution of well-defined animation tasks.",
  },
  {
    task: "Deciding the character should limp to show they're injured",
    answer: "human" as const,
    explanation: "Character decisions that serve the story require human storytelling instinct.",
  },
  {
    task: "Producing 20 color palette variations",
    answer: "ai" as const,
    explanation: "Generating variations from rules is a perfect AI task.",
  },
  {
    task: "Deciding the villain should be sympathetic, not evil",
    answer: "human" as const,
    explanation: "Complex character decisions require understanding of human nature.",
  },
  {
    task: "Auto-correcting grammar and spelling in the script",
    answer: "ai" as const,
    explanation: "Pattern-based correction is a straightforward AI task.",
  },
];

export function DirectorsChair({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"explore" | "sort" | "done">("explore");
  const [projectIdx, setProjectIdx] = useState(0);
  const [sortIdx, setSortIdx] = useState(0);
  const [sortPicked, setSortPicked] = useState<string | null>(null);
  const [sortScore, setSortScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function pickSort(answer: "human" | "ai") {
    if (sortPicked !== null) return;
    setSortPicked(answer);
    if (answer === SORTING_TASKS[sortIdx].answer) setSortScore((s) => s + 1);
  }

  function nextSort() {
    setSortPicked(null);
    if (sortIdx >= SORTING_TASKS.length - 1) {
      setFinished(true);
      onComplete();
    } else {
      setSortIdx((i) => i + 1);
    }
  }

  if (finished) {
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          {sortScore >= SORTING_TASKS.length - 2 ? "🎬" : "🎥"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{sortScore}/{SORTING_TASKS.length}</div>
          <div className="text-slate-300 mt-2">
            {sortScore >= SORTING_TASKS.length - 1 ? "Perfect! You know exactly how to direct AI." : sortScore >= SORTING_TASKS.length / 2 ? "Great sense of human vs. AI strengths!" : "The line between human and AI roles is becoming clearer!"}
          </div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/40 rounded-2xl p-4">
          <div className="font-black text-blue-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">The best creative work combines human vision (the WHY) with AI execution (the HOW). You&apos;re the director — AI is a powerful tool in your creative toolkit.</p>
        </div>
      </div>
    );
  }

  if (phase === "sort") {
    const task = SORTING_TASKS[sortIdx];
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 flex-1">
            {SORTING_TASKS.map((_, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < sortIdx ? "bg-blue-500" : i === sortIdx ? "bg-blue-400" : "bg-slate-700"}`} />
            ))}
          </div>
          <span className="text-xs font-bold text-yellow-400">Score: {sortScore}</span>
        </div>

        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-blue-400 mb-3">WHO DOES THIS BEST?</div>

          <motion.div key={sortIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-space-900 rounded-xl p-5 border border-slate-600 text-center mb-4">
            <div className="text-white font-black text-lg">&quot;{task.task}&quot;</div>
          </motion.div>

          {sortPicked === null ? (
            <div className="grid grid-cols-2 gap-3">
              <motion.button onClick={() => pickSort("human")} whileTap={{ scale: 0.95 }} className="py-5 rounded-xl border border-slate-700 bg-space-900 font-black text-white text-lg hover:border-blue-500/50 transition-colors">
                🧑 Human
              </motion.button>
              <motion.button onClick={() => pickSort("ai")} whileTap={{ scale: 0.95 }} className="py-5 rounded-xl border border-slate-700 bg-space-900 font-black text-white text-lg hover:border-blue-500/50 transition-colors">
                🤖 AI
              </motion.button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${sortPicked === task.answer ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                {sortPicked === task.answer ? "Correct! " : `Best done by ${task.answer === "human" ? "a human" : "AI"}. `}
                <span className="font-normal text-slate-300">{task.explanation}</span>
              </div>
              <button onClick={nextSort} className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors">
                {sortIdx < SORTING_TASKS.length - 1 ? "Next Task" : "See Results"} &rarr;
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Explore phase
  const project = PROJECTS[projectIdx];
  return (
    <div className="space-y-5">
      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-blue-400 mb-1">DIRECTOR&apos;S CHAIR</div>
        <div className="text-sm text-slate-400 font-bold mb-4">See how humans and AI collaborate on creative projects:</div>

        {/* Project selector */}
        <div className="flex gap-2 mb-4">
          {PROJECTS.map((p, i) => (
            <button key={i} onClick={() => setProjectIdx(i)} className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${i === projectIdx ? "bg-blue-500/20 text-blue-300 border border-blue-500/40" : "bg-space-900 text-slate-400 border border-slate-700"}`}>
              {p.title}
            </button>
          ))}
        </div>

        <motion.div key={projectIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-4">
            <div className="text-white font-black mb-1">{project.title}</div>
            <div className="text-sm text-slate-400">{project.description}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-space-900 rounded-xl p-4 border border-slate-600">
              <div className="text-xs font-black text-blue-400 mb-1">🧑 {project.humanRole}</div>
              <ul className="space-y-1.5">
                {project.humanContributions.map((c, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-blue-400 mt-0.5">&#x2022;</span> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-space-900 rounded-xl p-4 border border-slate-600">
              <div className="text-xs font-black text-slate-400 mb-1">🤖 {project.aiRole}</div>
              <ul className="space-y-1.5">
                {project.aiContributions.map((c, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-slate-500 mt-0.5">&#x2022;</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-sm text-slate-300 mb-4">
            <strong className="text-blue-300">Pattern: </strong>Human = the WHY (vision, meaning, emotion). AI = the HOW (speed, options, execution).
          </div>
        </motion.div>

        <button onClick={() => setPhase("sort")} className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors">
          Test: Who Does It Best? &rarr;
        </button>
      </div>
    </div>
  );
}
