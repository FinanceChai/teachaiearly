"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AuditItem {
  name: string;
  icon: string;
  aiReveal: string;
  trustLevel: "high" | "medium" | "low";
}

interface TimeOfDay {
  label: string;
  emoji: string;
  description: string;
  items: AuditItem[];
}

const TIMES_OF_DAY: TimeOfDay[] = [
  {
    label: "Morning Routine",
    emoji: "🌅",
    description: "What do you use when you wake up and get ready?",
    items: [
      {
        name: "Phone Alarm",
        icon: "⏰",
        aiReveal: "Your alarm app tracks your sleep schedule and sells patterns to health companies. It knows when you snooze!",
        trustLevel: "medium",
      },
      {
        name: "Smart Speaker",
        icon: "🔊",
        aiReveal: "It's always listening for its wake word, processing sound 24/7. It learns your voice, routine, and preferences.",
        trustLevel: "low",
      },
      {
        name: "Streaming Music",
        icon: "🎵",
        aiReveal: "AI picks your morning playlist based on time of day, mood patterns, and listening history. It's reading your emotions!",
        trustLevel: "medium",
      },
      {
        name: "Weather App",
        icon: "🌤️",
        aiReveal: "Uses AI to predict weather, but also tracks your location constantly to provide 'local' forecasts.",
        trustLevel: "medium",
      },
      {
        name: "Smart Thermostat",
        icon: "🌡️",
        aiReveal: "Learns when you're home, awake, and what temperature you like. It builds a complete schedule of your life!",
        trustLevel: "medium",
      },
      {
        name: "None of these",
        icon: "🚫",
        aiReveal: "Even without smart devices, your electricity meter might use AI to track your usage patterns!",
        trustLevel: "high",
      },
    ],
  },
  {
    label: "School & Day",
    emoji: "📚",
    description: "Which of these tools do you use during the day?",
    items: [
      {
        name: "Search Engine",
        icon: "🔍",
        aiReveal: "AI ranks every result based on your past searches, location, and what other people like you clicked. No two people see the same results!",
        trustLevel: "medium",
      },
      {
        name: "Spell Checker",
        icon: "📝",
        aiReveal: "AI reads everything you type to check spelling. It learns your writing style and common mistakes. It's training on your words!",
        trustLevel: "high",
      },
      {
        name: "Calculator App",
        icon: "🧮",
        aiReveal: "Basic calculators don't use AI much, but smart math apps track what problems you struggle with and adapt difficulty.",
        trustLevel: "high",
      },
      {
        name: "Video Calls",
        icon: "📹",
        aiReveal: "AI blurs backgrounds, enhances your voice, and some platforms analyze facial expressions and attention levels!",
        trustLevel: "medium",
      },
      {
        name: "Navigation/Maps",
        icon: "🗺️",
        aiReveal: "AI tracks every trip — where you go, how fast you travel, where you stop. It knows your daily route better than you do!",
        trustLevel: "low",
      },
      {
        name: "Translate Tool",
        icon: "🌐",
        aiReveal: "AI translation reads everything you translate. Some services store your translations to train their models.",
        trustLevel: "medium",
      },
    ],
  },
  {
    label: "Evening Entertainment",
    emoji: "🌙",
    description: "How do you spend your evening?",
    items: [
      {
        name: "Streaming Video",
        icon: "📺",
        aiReveal: "AI chooses your thumbnails, recommends shows, and even decides which shows get made based on viewing patterns. It picks what's popular!",
        trustLevel: "medium",
      },
      {
        name: "Video Games",
        icon: "🎮",
        aiReveal: "AI adjusts difficulty, matches you with players, and tracks every in-game decision. Some games use AI to figure out what makes you spend money!",
        trustLevel: "low",
      },
      {
        name: "Social Media",
        icon: "📱",
        aiReveal: "The AI decides everything you see. It tracks how long you look at each post, what makes you emotional, and keeps you scrolling. It's designed to be addictive!",
        trustLevel: "low",
      },
      {
        name: "Chat with Friends",
        icon: "💬",
        aiReveal: "AI suggests replies, autocompletes your sentences, and some apps scan messages for ad targeting. Your private chats aren't always private!",
        trustLevel: "medium",
      },
      {
        name: "Reading/News App",
        icon: "📰",
        aiReveal: "AI curates which articles you see based on what gets clicks. It creates a 'filter bubble' — you might only see one side of a story!",
        trustLevel: "medium",
      },
      {
        name: "Smart Home (lights, TV)",
        icon: "💡",
        aiReveal: "Smart home devices track when you're home, what rooms you're in, and your daily patterns. All sent to company servers!",
        trustLevel: "low",
      },
    ],
  },
];

const TRUST_COLORS = {
  high: { bg: "bg-green-500/20", text: "text-green-400", label: "Generally Trustworthy" },
  medium: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Use with Awareness" },
  low: { bg: "bg-red-500/20", text: "text-red-400", label: "Be Very Careful" },
};

export function AILifeAudit({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); // 0,1,2 = time of day selection; 3 = reveal; 4 = summary
  const [selections, setSelections] = useState<boolean[][]>(
    TIMES_OF_DAY.map((t) => t.items.map(() => false))
  );
  const [revealPhase, setRevealPhase] = useState(0);
  const [revealItem, setRevealItem] = useState(0);
  const [done, setDone] = useState(false);

  const currentTime = TIMES_OF_DAY[phase];

  const toggleItem = (itemIndex: number) => {
    const next = [...selections];
    next[phase] = [...next[phase]];
    next[phase][itemIndex] = !next[phase][itemIndex];
    setSelections(next);
  };

  const hasSelection = phase < 3 && selections[phase]?.some(Boolean);

  const allSelected = selections.flatMap((timeSelections, tIdx) =>
    timeSelections
      .map((selected, iIdx) =>
        selected ? { ...TIMES_OF_DAY[tIdx].items[iIdx], time: TIMES_OF_DAY[tIdx].label } : null
      )
      .filter(Boolean)
  ) as (AuditItem & { time: string })[];

  const totalAISystems = allSelected.length;

  const handleNext = () => {
    if (phase < 2) {
      setPhase(phase + 1);
    } else {
      setPhase(3);
      setRevealPhase(0);
      setRevealItem(0);
    }
  };

  const handleNextReveal = () => {
    if (revealItem < allSelected.length - 1) {
      setRevealItem(revealItem + 1);
    } else {
      setPhase(4);
    }
  };

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  // Summary
  if (phase === 4) {
    const trustCounts = { high: 0, medium: 0, low: 0 };
    allSelected.forEach((item) => trustCounts[item.trustLevel]++);

    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
            📋 Your AI Life Audit
          </h2>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="text-center my-6"
          >
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-cyan-500 flex items-center justify-center bg-space-800">
              <div>
                <div className="text-4xl font-bold text-cyan-400">
                  {totalAISystems}
                </div>
                <div className="text-xs text-slate-600">AI systems</div>
              </div>
            </div>
            <p className="text-cyan-400 mt-3 font-semibold">
              {totalAISystems} AI systems touched your life today!
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-green-500/10 rounded-lg p-3 text-center border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">{trustCounts.high}</div>
              <div className="text-xs text-green-300">Trustworthy</div>
            </div>
            <div className="bg-yellow-500/10 rounded-lg p-3 text-center border border-yellow-500/30">
              <div className="text-2xl font-bold text-yellow-400">{trustCounts.medium}</div>
              <div className="text-xs text-yellow-300">Use with Care</div>
            </div>
            <div className="bg-red-500/10 rounded-lg p-3 text-center border border-red-500/30">
              <div className="text-2xl font-bold text-red-400">{trustCounts.low}</div>
              <div className="text-xs text-red-300">Be Careful</div>
            </div>
          </div>

          <div className="bg-space-800 rounded-lg p-4 mb-6">
            <p className="text-cyan-400 font-semibold mb-2">💡 Key Takeaway:</p>
            <p className="text-slate-600 text-sm">
              AI is woven into almost everything we do — from the moment we wake up to when we go to sleep.
              Most of it is helpful, but being aware of it puts YOU in control. The more you know,
              the better choices you can make about your digital life!
            </p>
          </div>

          {!done ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              className="w-full px-6 py-3 bg-cyan-500 text-slate-900 rounded-lg font-bold"
            >
              Complete Audit ✓
            </motion.button>
          ) : (
            <p className="text-center text-cyan-400 font-semibold">✓ Activity Complete!</p>
          )}
        </motion.div>
      </div>
    );
  }

  // Reveal phase
  if (phase === 3) {
    const current = allSelected[revealItem];
    if (!current) {
      setPhase(4);
      return null;
    }
    const trust = TRUST_COLORS[current.trustLevel];

    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-1">🔍 What AI is Really Doing</h2>
        <p className="text-slate-600 text-sm mb-4">
          Reveal {revealItem + 1} of {allSelected.length}
        </p>

        <motion.div
          key={revealItem}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-space-800 rounded-xl p-5 border border-slate-200 mb-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{current.icon}</span>
            <div>
              <p className="text-slate-900 font-bold">{current.name}</p>
              <p className="text-slate-400 text-xs">{current.time}</p>
            </div>
          </div>

          <div className="bg-space-900 rounded-lg p-3 mb-3">
            <p className="text-cyan-300 text-sm">{current.aiReveal}</p>
          </div>

          <div className={`${trust.bg} rounded-lg p-2 flex items-center gap-2`}>
            <span className={`${trust.text} text-sm font-semibold`}>
              Trust Rating: {trust.label}
            </span>
          </div>
        </motion.div>

        <div className="w-full bg-space-800 rounded-full h-2 mb-4">
          <div
            className="bg-cyan-500 h-2 rounded-full transition-all"
            style={{ width: `${((revealItem + 1) / allSelected.length) * 100}%` }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextReveal}
          className="w-full px-5 py-2 bg-cyan-500 text-slate-900 rounded-lg font-bold"
        >
          {revealItem < allSelected.length - 1 ? "Next Reveal →" : "See Full Summary →"}
        </motion.button>
      </div>
    );
  }

  // Selection phases
  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-3xl">{currentTime.emoji}</span>
        <h2 className="text-2xl font-bold text-slate-900">{currentTime.label}</h2>
      </div>
      <p className="text-slate-600 text-sm mb-4">{currentTime.description}</p>

      <div className="flex gap-1 mb-4">
        {TIMES_OF_DAY.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full ${i <= phase ? "bg-cyan-500" : "bg-space-800"}`}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {currentTime.items.map((item, i) => (
          <motion.button
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => toggleItem(i)}
            className={`p-3 rounded-lg border text-left transition-colors ${
              selections[phase][i]
                ? "bg-cyan-500/20 border-cyan-500"
                : "bg-space-800 border-slate-200 hover:border-slate-500"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <p className="text-slate-900 text-sm font-semibold mt-1">{item.name}</p>
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        disabled={!hasSelection}
        className={`w-full px-5 py-2 rounded-lg font-bold ${
          hasSelection
            ? "bg-cyan-500 text-slate-900"
            : "bg-slate-700 text-slate-400 cursor-not-allowed"
        }`}
      >
        {phase < 2 ? "Next Part of Day →" : "Reveal What AI Is Doing →"}
      </motion.button>
    </div>
  );
}
