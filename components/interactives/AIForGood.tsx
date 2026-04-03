"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Project {
  name: string;
  description: string;
  impact: string;
  icon: string;
}

interface GlobalProblem {
  name: string;
  icon: string;
  description: string;
  projects: Project[];
}

const PROBLEMS: GlobalProblem[] = [
  {
    name: "Climate Change",
    icon: "🌍",
    description: "Our planet is getting warmer, causing extreme weather, melting ice, and rising seas.",
    projects: [
      {
        name: "Carbon Tracker AI",
        icon: "🏭",
        description: "AI satellites monitor every factory and power plant on Earth, measuring carbon emissions from space. It catches polluters who lie about their emissions!",
        impact: "Can track 72,000+ emission sources worldwide in real time",
      },
      {
        name: "Smart Grid Optimizer",
        icon: "⚡",
        description: "AI manages electricity grids to use maximum renewable energy. When the sun shines or wind blows, AI redirects power instantly to reduce fossil fuel use.",
        impact: "Could reduce energy waste by 30% and boost renewable use by 50%",
      },
      {
        name: "Forest Guardian Drones",
        icon: "🌳",
        description: "AI-powered drones fly over forests, detecting illegal logging and wildfires within minutes. They can plant seeds too — some have planted 400,000 trees per day!",
        impact: "Detects deforestation 10x faster than human patrols",
      },
    ],
  },
  {
    name: "Healthcare",
    icon: "🏥",
    description: "Millions of people worldwide don't have access to good doctors or medical care.",
    projects: [
      {
        name: "AI Disease Detector",
        icon: "🔬",
        description: "AI analyzes medical images (X-rays, skin photos) to detect diseases like cancer earlier than human doctors. It works even in remote areas with just a phone!",
        impact: "Can detect some cancers 5 years earlier than traditional methods",
      },
      {
        name: "Drug Discovery AI",
        icon: "💊",
        description: "AI tests millions of possible medicine combinations virtually, finding new drugs in months instead of decades. During COVID, AI helped design vaccines in record time!",
        impact: "Reduced drug development time from 10 years to under 2",
      },
      {
        name: "Mental Health Chatbot",
        icon: "💚",
        description: "AI chatbots provide 24/7 mental health support, teaching coping strategies and identifying when someone needs urgent help. Available in places with no therapists.",
        impact: "Provides support in 50+ languages, 24 hours a day",
      },
    ],
  },
  {
    name: "Food Security",
    icon: "🌾",
    description: "Nearly 800 million people don't have enough food to eat, and farming is getting harder with climate change.",
    projects: [
      {
        name: "Crop Doctor AI",
        icon: "🌱",
        description: "Farmers take a photo of a sick plant, and AI instantly identifies the disease and recommends treatment. Used by millions of small farmers in Africa and Asia!",
        impact: "Helps 33 million farmers identify 500+ crop diseases",
      },
      {
        name: "Precision Farming AI",
        icon: "🚜",
        description: "AI analyzes weather, soil, and satellite data to tell farmers exactly when to plant, water, and harvest. Uses up to 30% less water and fewer chemicals!",
        impact: "Increases crop yields by 20-30% while using less water",
      },
      {
        name: "Food Waste Predictor",
        icon: "🍎",
        description: "AI predicts how much food stores and restaurants will need, reducing the 1.3 billion tons of food wasted every year. It connects excess food to food banks!",
        impact: "Could prevent 40% of food waste in stores that use it",
      },
    ],
  },
  {
    name: "Education",
    icon: "📚",
    description: "260 million children worldwide don't go to school, and many who do lack good resources.",
    projects: [
      {
        name: "AI Tutor for All",
        icon: "🎓",
        description: "AI tutors adapt to each student's learning speed and style. If you learn better with pictures, it shows more visuals. If you're stuck, it tries a different explanation!",
        impact: "Students using AI tutors improve test scores by 30% on average",
      },
      {
        name: "Language Learning AI",
        icon: "🌐",
        description: "AI creates personalized language lessons and can have conversations in any language. It listens to your pronunciation and gives instant feedback!",
        impact: "Makes 100+ languages learnable for free, anytime",
      },
      {
        name: "Accessibility AI",
        icon: "♿",
        description: "AI describes images for blind students, creates sign language translations, and turns speech to text for deaf students. It makes education possible for everyone!",
        impact: "Helps 240 million people with disabilities access education",
      },
    ],
  },
];

const SOLUTION_COMPONENTS = [
  { name: "Image recognition", icon: "📷" },
  { name: "Language understanding", icon: "💬" },
  { name: "Data analysis", icon: "📊" },
  { name: "Prediction engine", icon: "🔮" },
  { name: "Mobile app", icon: "📱" },
  { name: "Chatbot interface", icon: "🤖" },
  { name: "Drone/robot hardware", icon: "🤖" },
  { name: "Real-time alerts", icon: "🔔" },
  { name: "Community sharing", icon: "🤝" },
  { name: "Game/reward system", icon: "🎮" },
];

export function AIForGood({ onComplete }: { onComplete: () => void }) {
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);
  const [phase, setPhase] = useState<"pick" | "explore" | "rate" | "brainstorm" | "done">("pick");
  const [exploredProjects, setExploredProjects] = useState<boolean[]>([false, false, false]);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [impactRating, setImpactRating] = useState<number | null>(null);
  const [components, setComponents] = useState<boolean[]>(SOLUTION_COMPONENTS.map(() => false));
  const [done, setDone] = useState(false);

  const problem = selectedProblem !== null ? PROBLEMS[selectedProblem] : null;
  const allExplored = exploredProjects.every(Boolean);
  const selectedComponentCount = components.filter(Boolean).length;

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  if (phase === "done") {
    const selectedComps = SOLUTION_COMPONENTS.filter((_, i) => components[i]);
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <span className="text-5xl">🌟</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Your AI For Good Plan!</h2>

          <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-xl p-5 border border-amber-500/30 mt-4 text-left">
            <div className="text-center mb-3">
              <span className="text-3xl">{problem?.icon}</span>
              <p className="text-amber-400 font-bold">Tackling: {problem?.name}</p>
            </div>

            <div className="bg-space-900/60 rounded-lg p-3 mb-3">
              <p className="text-amber-400 text-xs font-semibold">Most Impactful Project</p>
              <p className="text-slate-900 text-sm">{problem?.projects[impactRating!]?.icon} {problem?.projects[impactRating!]?.name}</p>
            </div>

            <div className="bg-space-900/60 rounded-lg p-3">
              <p className="text-amber-400 text-xs font-semibold mb-1">Your Solution Uses:</p>
              <div className="flex flex-wrap gap-1">
                {selectedComps.map((c) => (
                  <span key={c.name} className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-xs">
                    {c.icon} {c.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-space-800 rounded-lg p-4 mt-4 text-left">
            <p className="text-amber-400 font-semibold mb-1">💡 Remember:</p>
            <p className="text-slate-600 text-sm">
              AI is just a tool — it&apos;s the people who decide to use it for good that make the difference.
              You don&apos;t need to be an expert to start thinking about how AI can solve real problems.
              The best solutions come from people who care about the problem!
            </p>
          </div>

          {!done ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              className="mt-4 px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-bold"
            >
              Complete Activity ✓
            </motion.button>
          ) : (
            <p className="mt-4 text-amber-400 font-semibold">✓ Activity Complete!</p>
          )}
        </motion.div>
      </div>
    );
  }

  if (phase === "brainstorm") {
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-1">💡 Your Turn: Brainstorm!</h2>
        <p className="text-slate-600 text-sm mb-4">
          What AI solution would YOU create for {problem?.name}?
          Pick 2-4 components to build with:
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {SOLUTION_COMPONENTS.map((comp, i) => (
            <motion.button
              key={comp.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => {
                const next = [...components];
                next[i] = !next[i];
                setComponents(next);
              }}
              className={`p-2 rounded-lg border text-left ${
                components[i]
                  ? "bg-amber-500/20 border-amber-500"
                  : "bg-space-800 border-slate-200 hover:border-slate-500"
              }`}
            >
              <span className="text-lg">{comp.icon}</span>
              <p className="text-slate-900 text-xs">{comp.name}</p>
            </motion.button>
          ))}
        </div>

        <p className="text-slate-400 text-xs mb-3">Selected: {selectedComponentCount} components</p>

        {selectedComponentCount >= 2 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase("done")}
            className="w-full px-5 py-2 bg-amber-500 text-slate-900 rounded-lg font-bold"
          >
            See My Plan →
          </motion.button>
        )}
      </div>
    );
  }

  if (phase === "rate") {
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-1">⭐ Rate Impact</h2>
        <p className="text-slate-600 text-sm mb-4">
          Which project do you think will have the biggest impact on {problem?.name}?
        </p>

        <div className="space-y-2 mb-4">
          {problem?.projects.map((proj, i) => (
            <motion.button
              key={proj.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setImpactRating(i)}
              className={`w-full p-3 rounded-lg border text-left ${
                impactRating === i
                  ? "bg-amber-500/20 border-amber-500"
                  : "bg-space-800 border-slate-200 hover:border-slate-500"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{proj.icon}</span>
                <div>
                  <p className="text-slate-900 font-semibold text-sm">{proj.name}</p>
                  <p className="text-slate-400 text-xs">{proj.impact}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {impactRating !== null && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase("brainstorm")}
            className="w-full px-5 py-2 bg-amber-500 text-slate-900 rounded-lg font-bold"
          >
            Now Brainstorm Your Own! →
          </motion.button>
        )}
      </div>
    );
  }

  if (phase === "explore") {
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <button onClick={() => setPhase("pick")} className="text-slate-400 text-sm hover:text-sky-600 mb-2">
          ← Back
        </button>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{problem?.icon}</span>
          <h2 className="text-xl font-bold text-slate-900">{problem?.name}</h2>
        </div>
        <p className="text-slate-600 text-sm mb-4">{problem?.description}</p>

        <p className="text-amber-400 text-sm font-semibold mb-2">
          Real AI projects tackling this problem ({exploredProjects.filter(Boolean).length}/3 explored):
        </p>

        <div className="space-y-2 mb-4">
          {problem?.projects.map((proj, i) => (
            <motion.div
              key={proj.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-lg border transition-colors ${
                exploredProjects[i] ? "border-amber-500/40" : "border-slate-200"
              }`}
            >
              <button
                onClick={() => {
                  setExpandedProject(expandedProject === i ? null : i);
                  const next = [...exploredProjects];
                  next[i] = true;
                  setExploredProjects(next);
                }}
                className="w-full p-3 bg-space-800 rounded-lg text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{proj.icon}</span>
                  <p className="text-slate-900 font-semibold text-sm">{proj.name}</p>
                  {exploredProjects[i] && <span className="text-amber-400 text-xs ml-auto">✓</span>}
                </div>
              </button>
              {expandedProject === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-3 pb-3"
                >
                  <div className="bg-space-900 rounded-lg p-3">
                    <p className="text-slate-600 text-sm">{proj.description}</p>
                    <p className="text-amber-400 text-xs mt-2 font-semibold">
                      Impact: {proj.impact}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {allExplored && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase("rate")}
            className="w-full px-5 py-2 bg-amber-500 text-slate-900 rounded-lg font-bold"
          >
            Rate Which Has Most Impact →
          </motion.button>
        )}
      </div>
    );
  }

  // Pick problem
  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">🌟 AI For Good</h2>
      <p className="text-slate-600 text-sm mb-4">
        AI can help solve the world&apos;s biggest problems! Pick one to explore:
      </p>

      <div className="grid grid-cols-2 gap-3">
        {PROBLEMS.map((prob, i) => (
          <motion.button
            key={prob.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedProblem(i);
              setPhase("explore");
              setExploredProjects([false, false, false]);
              setExpandedProject(null);
            }}
            className="p-4 bg-space-800 rounded-xl border border-slate-200 hover:border-amber-500 text-center"
          >
            <span className="text-4xl">{prob.icon}</span>
            <p className="text-slate-900 font-bold mt-2">{prob.name}</p>
            <p className="text-slate-400 text-xs mt-1">{prob.description.slice(0, 60)}...</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
