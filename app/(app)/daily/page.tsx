"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/hooks/useProgress";
import { getTodaysChallenge, DailyChallenge } from "@/lib/daily-challenges";
import Link from "next/link";
import { getProgress, saveProgress } from "@/lib/progress";

const DAILY_LAST_COMPLETED_KEY = "ai_daily_last_completed";
const DAILY_LAST_ANSWER_KEY = "ai_daily_last_answer";
const JOURNAL_KEY = "ai_wild_journal";

interface JournalEntry {
  id: string;
  text: string;
  date: string;
  xpAwarded: boolean;
}

const JOURNAL_PROMPTS = [
  "Did an app recommend something to you today?",
  "Did your phone autocorrect a word?",
  "Did you see a chatbot on a website?",
  "Did a streaming app suggest what to watch next?",
  "Did you notice a smart speaker respond to someone?",
  "Did you see an ad that felt like it was reading your mind?",
  "Did you use a filter on a photo?",
  "Did a navigation app reroute you?",
  "Did you see AI-generated content online?",
  "Did a game change difficulty based on how you played?",
];

function getJournalEntries(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(JOURNAL_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveJournalEntries(entries: JournalEntry[]) {
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
}

const CATEGORY_COLORS: Record<string, string> = {
  "AI Basics": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Machine Learning": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Ethics": "bg-rose-500/20 text-rose-300 border-rose-500/30",
  "AI in Life": "bg-mint-400/20 text-sky-400 border-sky-200",
  "Future AI": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Creative AI": "bg-pink-500/20 text-pink-300 border-pink-500/30",
};

const TYPE_LABELS: Record<string, { label: string; emoji: string }> = {
  quiz: { label: "Quiz", emoji: "🧠" },
  poll: { label: "What do you think?", emoji: "💭" },
  spot: { label: "Spot the AI", emoji: "🔍" },
  think: { label: "Think about it", emoji: "💡" },
  estimate: { label: "Estimate", emoji: "📊" },
};

// Generate mock poll results that always include the user's pick
function generateMockResults(optionCount: number, userPick: number): number[] {
  const results: number[] = [];
  let remaining = 100;
  for (let i = 0; i < optionCount; i++) {
    if (i === optionCount - 1) {
      results.push(remaining);
    } else {
      const share = Math.floor(Math.random() * (remaining / (optionCount - i) * 1.5)) + 5;
      results.push(Math.min(share, remaining - (optionCount - i - 1) * 5));
      remaining -= results[i];
    }
  }
  // Boost user's pick slightly
  const boost = Math.floor(Math.random() * 10) + 5;
  const stealFrom = (userPick + 1) % optionCount;
  if (results[stealFrom] > boost + 5) {
    results[userPick] += boost;
    results[stealFrom] -= boost;
  }
  return results;
}

function getTimeUntilMidnight(): string {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

export default function DailyChallengePage() {
  const { progress, mounted } = useProgress();
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [mockResults, setMockResults] = useState<number[]>([]);
  const [countdown, setCountdown] = useState("");
  const [xpAnimating, setXpAnimating] = useState(false);

  // Load challenge and check completion state
  useEffect(() => {
    const todaysChallenge = getTodaysChallenge();
    setChallenge(todaysChallenge);

    const lastCompleted = localStorage.getItem(DAILY_LAST_COMPLETED_KEY);
    const today = new Date().toISOString().split("T")[0];

    if (lastCompleted === today) {
      setAlreadyCompleted(true);
      setRevealed(true);
      const savedAnswer = localStorage.getItem(DAILY_LAST_ANSWER_KEY);
      if (savedAnswer !== null) {
        const answerIdx = parseInt(savedAnswer, 10);
        setSelectedAnswer(answerIdx);
        // Regenerate mock results for poll/think types
        if (todaysChallenge.type === "poll" || todaysChallenge.type === "think") {
          setMockResults(generateMockResults(todaysChallenge.options.length, answerIdx));
        }
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!alreadyCompleted) return;
    const update = () => setCountdown(getTimeUntilMidnight());
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [alreadyCompleted]);

  function handleAnswer(index: number) {
    if (revealed || !challenge) return;

    setSelectedAnswer(index);
    setRevealed(true);

    // Generate mock results for opinion-based types
    if (challenge.type === "poll" || challenge.type === "think") {
      setMockResults(generateMockResults(challenge.options.length, index));
    }

    // Save completion
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(DAILY_LAST_COMPLETED_KEY, today);
    localStorage.setItem(DAILY_LAST_ANSWER_KEY, String(index));

    // Award 10 XP directly
    const currentProgress = getProgress();
    currentProgress.xp += 10;
    // Update streak
    const todayStr = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (currentProgress.lastActiveDate !== todayStr) {
      if (currentProgress.lastActiveDate === yesterday) {
        currentProgress.streak += 1;
      } else if (currentProgress.lastActiveDate !== todayStr) {
        currentProgress.streak = 1;
      }
      currentProgress.lastActiveDate = todayStr;
    }
    saveProgress(currentProgress);

    // Trigger XP animation
    setTimeout(() => setXpAnimating(true), 600);

    setAlreadyCompleted(true);
  }

  function getOptionStyle(index: number): string {
    if (!revealed) {
      return "bg-space-800 border-slate-200 hover:border-sky-300 hover:bg-space-700 cursor-pointer";
    }

    const isSelected = selectedAnswer === index;
    const hasCorrect = challenge?.correctIndex !== undefined;

    if (hasCorrect) {
      // Quiz, spot, estimate — show correct/wrong
      if (index === challenge?.correctIndex) {
        return "bg-emerald-500/20 border-emerald-400 text-emerald-500";
      }
      if (isSelected && index !== challenge?.correctIndex) {
        return "bg-red-500/20 border-red-400 text-red-300";
      }
      return "bg-space-800 border-slate-200 opacity-50";
    }

    // Poll/think — highlight user's pick
    if (isSelected) {
      return "bg-mint-400/20 border-teal-400";
    }
    return "bg-space-800 border-slate-200 opacity-70";
  }

  if (!mounted || !challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-float">⚡</div>
      </div>
    );
  }

  const typeInfo = TYPE_LABELS[challenge.type];
  const catColor = CATEGORY_COLORS[challenge.category] || "bg-slate-500/20 text-slate-600 border-slate-500/30";
  const hasCorrect = challenge.correctIndex !== undefined;
  const isCorrect = hasCorrect && selectedAnswer === challenge.correctIndex;

  return (
    <div className="min-h-screen bg-space-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-black text-slate-900">Daily Challenge</h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="text-sm text-slate-400">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="text-sm font-bold text-orange-400">
              🔥 {progress.streak} day streak
            </span>
            <span className="text-sm font-bold text-sky-500">⚡ +{challenge.xpReward} XP</span>
          </div>
        </motion.div>

        {/* Already completed banner */}
        {alreadyCompleted && revealed && selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 bg-space-800 rounded-2xl p-4 border border-sky-200 text-center"
          >
            <p className="text-sky-500 font-bold text-lg">
              {countdown ? "Come Back Tomorrow!" : "Challenge Complete!"}
            </p>
            {countdown && (
              <p className="text-slate-400 text-sm mt-1">
                Next challenge in <span className="text-slate-900 font-bold">{countdown}</span>
              </p>
            )}
          </motion.div>
        )}

        {/* Challenge card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="relative rounded-2xl p-[2px] mb-6"
          style={{
            background: "linear-gradient(135deg, rgba(20,184,166,0.4), rgba(99,102,241,0.4), rgba(236,72,153,0.3))",
          }}
        >
          <div className="bg-space-800 rounded-2xl p-6">
            {/* Category + type tags */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${catColor}`}>
                {challenge.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {typeInfo.emoji} {typeInfo.label}
              </span>
            </div>

            {/* Emoji */}
            <div className="text-center mb-4">
              <motion.span
                className="text-6xl inline-block"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                {challenge.emoji}
              </motion.span>
            </div>

            {/* Question */}
            <h2 className="text-xl font-black text-slate-900 text-center leading-snug">
              {challenge.question}
            </h2>
          </div>
        </motion.div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {challenge.options.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.08 }}
              onClick={() => handleAnswer(index)}
              disabled={revealed}
              className={`w-full text-left rounded-xl p-4 border-2 transition-all ${getOptionStyle(index)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-400 w-6">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-slate-900 font-medium text-sm">{option}</span>
                </div>

                {/* Result indicators */}
                {revealed && hasCorrect && index === challenge.correctIndex && (
                  <span className="text-emerald-500 text-lg">✓</span>
                )}
                {revealed && hasCorrect && selectedAnswer === index && index !== challenge.correctIndex && (
                  <span className="text-red-400 text-lg">✗</span>
                )}
                {revealed && !hasCorrect && selectedAnswer === index && (
                  <span className="text-sky-500 text-sm font-bold">Your pick</span>
                )}
              </div>

              {/* Mock percentage bar for poll/think */}
              {revealed && !hasCorrect && mockResults.length > 0 && (
                <div className="mt-2 ml-9">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-space-900 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${mockResults[index]}%` }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className={`h-full rounded-full ${
                          selectedAnswer === index ? "bg-teal-400" : "bg-slate-600"
                        }`}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-10 text-right">
                      {mockResults[index]}%
                    </span>
                  </div>
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Reveal section */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 30, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Correct/wrong feedback */}
              {hasCorrect && selectedAnswer !== null && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-center py-3 rounded-xl font-black text-lg ${
                    isCorrect
                      ? "bg-emerald-500/20 text-emerald-500"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {isCorrect ? "🎉 Correct!" : "😅 Not quite!"}
                </motion.div>
              )}

              {/* Explanation */}
              <div className="bg-space-800 rounded-2xl p-5 border border-slate-200">
                <h3 className="text-sky-500 font-bold text-sm mb-2">💡 Did you know?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{challenge.explanation}</p>

                {challenge.funFact && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-amber-300 text-sm">
                      <span className="font-bold">🌟 Fun Fact:</span> {challenge.funFact}
                    </p>
                  </div>
                )}
              </div>

              {/* XP animation */}
              <AnimatePresence>
                {xpAnimating && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="text-center"
                  >
                    <span className="inline-block bg-mint-400/20 border border-sky-200 text-sky-400 font-black text-lg px-6 py-2 rounded-full">
                      ⚡ +10 XP earned!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Share prompt */}
              <div className="text-center">
                <p className="text-slate-400 text-sm">
                  🗣️ Challenge your friends — ask them the same question!
                </p>
              </div>

              {/* Come back message */}
              <div className="text-center pt-4 pb-8">
                <p className="text-slate-400 text-sm font-medium">
                  Come back tomorrow for a new challenge! ⚡
                </p>
                <Link
                  href="/home"
                  className="inline-block mt-4 bg-sky-500 hover:bg-mint-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                >
                  Back to Worlds
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========== AI in the Wild Journal ========== */}
        <WildJournal />
      </div>
    </div>
  );
}

function WildJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [todayPrompt, setTodayPrompt] = useState("");
  const [justAdded, setJustAdded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const loadEntries = useCallback(() => {
    setEntries(getJournalEntries());
  }, []);

  useEffect(() => {
    loadEntries();
    // Pick a daily prompt based on date
    const dayIndex = Math.floor(Date.now() / 86400000) % JOURNAL_PROMPTS.length;
    setTodayPrompt(JOURNAL_PROMPTS[dayIndex]);
  }, [loadEntries]);

  function handleAddEntry() {
    if (!newEntry.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      text: newEntry.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      xpAwarded: true,
    };

    const updated = [entry, ...entries];
    saveJournalEntries(updated);
    setEntries(updated);
    setNewEntry("");

    // Award 5 XP
    const currentProgress = getProgress();
    currentProgress.xp += 5;
    saveProgress(currentProgress);

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const todayEntries = entries.filter((e) => e.date === today);
  const canAddMore = todayEntries.length < 3;
  const visibleEntries = showAll ? entries : entries.slice(0, 5);

  return (
    <div className="mt-10 pt-8 border-t border-slate-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-slate-900">AI in the Wild</h2>
        <p className="text-slate-400 text-sm mt-1">
          Spot AI in your daily life and earn 5 XP per entry (up to 3/day)
        </p>
      </div>

      {/* Daily prompt */}
      <div className="bg-space-800 rounded-2xl p-4 border border-slate-200 mb-4">
        <p className="text-xs font-bold text-sky-500 mb-1">Today&apos;s prompt</p>
        <p className="text-slate-600 text-sm">{todayPrompt}</p>
      </div>

      {/* Input */}
      {canAddMore ? (
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddEntry()}
            placeholder="I noticed AI when..."
            maxLength={200}
            className="flex-1 bg-space-800 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
          />
          <button
            onClick={handleAddEntry}
            disabled={!newEntry.trim()}
            className="bg-mint-400 hover:bg-mint-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-bold px-5 py-3 rounded-xl btn-press transition-colors text-sm"
          >
            Log
          </button>
        </div>
      ) : (
        <div className="text-center mb-6 bg-mint-400/10 border border-teal-500/20 rounded-xl py-3 px-4">
          <p className="text-sky-500 text-sm font-bold">
            Great spotting! You&apos;ve logged 3 entries today. Come back tomorrow!
          </p>
        </div>
      )}

      {/* XP animation */}
      <AnimatePresence>
        {justAdded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center mb-4"
          >
            <span className="inline-block bg-mint-400/20 border border-sky-200 text-sky-400 font-black text-sm px-4 py-1.5 rounded-full">
              +5 XP earned!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries */}
      {entries.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">
            Your sightings ({entries.length} total)
          </p>
          {visibleEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-space-800 rounded-xl px-4 py-3 border border-slate-200/50 flex items-start gap-3"
            >
              <span className="text-lg mt-0.5">👁️</span>
              <div className="flex-1 min-w-0">
                <p className="text-slate-600 text-sm">{entry.text}</p>
                <p className="text-slate-600 text-xs mt-1">{entry.date}</p>
              </div>
              <span className="text-xs text-teal-500 font-bold whitespace-nowrap">+5 XP</span>
            </motion.div>
          ))}
          {entries.length > 5 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full text-center text-sky-500 hover:text-sky-400 text-sm font-bold py-2 transition-colors"
            >
              Show all {entries.length} entries &rarr;
            </button>
          )}
        </div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-6">
          <div className="text-4xl mb-3">👁️</div>
          <p className="text-slate-400 text-sm">
            No sightings yet. Start noticing AI around you!
          </p>
        </div>
      )}
    </div>
  );
}
