"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WEEK_DATA = {
  steps: [4200, 3800, 5100, 4000, 6200, 9800, 8500],
  sleep: [7.5, 6.8, 7.0, 6.5, 5.5, 9.2, 9.0],
  heartRate: [72, 75, 78, 74, 88, 95, 82],
};

const MAX_STEPS = 10000;
const MAX_SLEEP = 10;
const MAX_HR = 100;

interface Insight {
  emoji: string;
  title: string;
  text: string;
  dataUsed: string;
}

const INSIGHTS: Insight[] = [
  {
    emoji: "😴",
    title: "School Night Sleep Drop",
    text: "You sleep about 2 hours LESS on school nights (especially Thursday and Friday) compared to weekends. Your body needs consistent sleep to perform well!",
    dataUsed: "Sleep data: weekday average 6.6 hrs vs weekend average 9.1 hrs",
  },
  {
    emoji: "💓",
    title: "Heart Rate Spike Alert",
    text: "Your heart rate jumps to 88-95 bpm on Friday and Saturday. This matches with more physical activity — you probably play sports or do something active on those days!",
    dataUsed: "Heart rate data: resting 72-75 bpm, active days 88-95 bpm",
  },
  {
    emoji: "🚶",
    title: "Weekend Warrior Pattern",
    text: "You take almost DOUBLE the steps on weekends (9,150 avg) compared to school days (4,660 avg). You're way more active when you have free time!",
    dataUsed: "Step data: weekday avg 4,660 vs weekend avg 9,150",
  },
  {
    emoji: "⚠️",
    title: "Friday Burnout Warning",
    text: "Every Friday your sleep is lowest (5.5 hrs) but your heart rate is highest (88 bpm). The AI predicts you might be stressed or overtired by the end of the school week.",
    dataUsed: "Combined sleep + heart rate pattern analysis on Fridays",
  },
  {
    emoji: "🧠",
    title: "Hidden Pattern Detected",
    text: "On days when you sleep less than 7 hours, your step count drops the next day. Your body is telling you: less sleep = less energy to move around!",
    dataUsed: "Cross-correlation between sleep duration and next-day step count",
  },
];

type Rating = "helpful" | "creepy" | "both";

export function HealthTrackerSim({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"charts" | "insights" | "done">("charts");
  const [insightIdx, setInsightIdx] = useState(0);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [rated, setRated] = useState(false);
  const [chartView, setChartView] = useState<"steps" | "sleep" | "heartRate">("steps");

  const insight = INSIGHTS[insightIdx];

  const handleRate = (r: Rating) => {
    setRatings((prev) => [...prev, r]);
    setRated(true);
  };

  const handleNextInsight = () => {
    if (insightIdx < INSIGHTS.length - 1) {
      setInsightIdx((i) => i + 1);
      setRated(false);
    } else {
      setPhase("done");
    }
  };

  const getBarData = () => {
    switch (chartView) {
      case "steps":
        return { values: WEEK_DATA.steps, max: MAX_STEPS, label: "steps", color: "bg-cyan-500" };
      case "sleep":
        return { values: WEEK_DATA.sleep, max: MAX_SLEEP, label: "hrs", color: "bg-indigo-500" };
      case "heartRate":
        return { values: WEEK_DATA.heartRate, max: MAX_HR, label: "bpm", color: "bg-red-500" };
    }
  };

  const barData = getBarData();

  if (phase === "done") {
    const helpfulCount = ratings.filter((r) => r === "helpful").length;
    const creepyCount = ratings.filter((r) => r === "creepy").length;
    const bothCount = ratings.filter((r) => r === "both").length;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-space-800 rounded-2xl p-6 border border-slate-200 text-center"
      >
        <div className="text-5xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Analysis Complete!</h2>

        <div className="bg-space-900 rounded-xl p-4 mb-4">
          <div className="text-sm text-slate-600 mb-3">Your ratings:</div>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-500">{helpfulCount}</div>
              <div className="text-xs text-slate-600">Helpful</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{creepyCount}</div>
              <div className="text-xs text-slate-600">Creepy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{bothCount}</div>
              <div className="text-xs text-slate-600">Both</div>
            </div>
          </div>
        </div>

        <div className="bg-space-900 rounded-xl p-4 mb-5 text-left">
          <h3 className="text-slate-900 font-bold mb-2">💡 The Big Question:</h3>
          <p className="text-slate-600 text-sm mb-2">
            Health AI can genuinely help people stay healthy and catch problems early. But it also knows incredibly personal things about your body and habits.
          </p>
          <p className="text-slate-600 text-sm mb-2">
            {bothCount >= 2
              ? "You rated many insights as \"both\" — and that's the perfect answer! Most AI health tools ARE both helpful AND a little creepy."
              : helpfulCount > creepyCount
              ? "You found most insights helpful! Just remember — helpful data is still personal data that someone is storing."
              : "You found many insights creepy! Trust your instincts — it IS a lot of personal information."}
          </p>
          <p className="text-slate-600 text-sm">
            The key is deciding: <span className="text-cyan-400 font-bold">who gets to see this data, and what can they do with it?</span>
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="px-6 py-3 bg-cyan-500 text-space-900 font-bold rounded-xl"
        >
          Continue
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="bg-space-800 rounded-2xl p-6 border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-900">📊 Health Tracker Sim</h2>
        <span className="text-cyan-400 text-sm font-mono">
          {phase === "charts" ? "Your Week" : `Insight ${insightIdx + 1}/${INSIGHTS.length}`}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {phase === "charts" && (
          <motion.div key="charts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-slate-600 text-sm mb-3">
              Here&apos;s a simulated week of health data from a smartwatch. Explore the charts!
            </p>

            {/* Chart tabs */}
            <div className="flex gap-2 mb-4">
              {[
                { key: "steps" as const, label: "🚶 Steps", color: "cyan" },
                { key: "sleep" as const, label: "😴 Sleep", color: "indigo" },
                { key: "heartRate" as const, label: "💓 Heart Rate", color: "red" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setChartView(tab.key)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
                    chartView === tab.key
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                      : "bg-space-900 text-slate-600 border border-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Bar chart */}
            <div className="bg-space-900 rounded-xl p-4 mb-4">
              <div className="flex items-end gap-2 h-40">
                {DAYS.map((day, i) => {
                  const pct = (barData.values[i] / barData.max) * 100;
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center justify-end h-full">
                      <motion.div
                        className="text-xs text-slate-600 mb-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {chartView === "sleep"
                          ? barData.values[i].toFixed(1)
                          : chartView === "steps"
                          ? (barData.values[i] / 1000).toFixed(1) + "k"
                          : barData.values[i]}
                      </motion.div>
                      <motion.div
                        className={`w-full rounded-t-md ${barData.color}`}
                        initial={{ height: 0 }}
                        animate={{ height: `${pct}%` }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                      />
                      <div className="text-xs text-slate-400 mt-1">{day}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-4">
              Can you spot any patterns? The AI can — let&apos;s see what it found!
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPhase("insights")}
              className="w-full py-3 bg-cyan-500 text-space-900 font-bold rounded-xl"
            >
              See AI Insights →
            </motion.button>
          </motion.div>
        )}

        {phase === "insights" && (
          <motion.div
            key={`insight-${insightIdx}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
          >
            <div className="w-full bg-space-900 rounded-full h-2 mb-4">
              <motion.div
                className="bg-cyan-500 h-2 rounded-full"
                animate={{ width: `${((insightIdx + 1) / INSIGHTS.length) * 100}%` }}
              />
            </div>

            <div className="bg-space-900 rounded-xl p-5 mb-4">
              <div className="text-4xl text-center mb-3">{insight.emoji}</div>
              <h3 className="text-slate-900 font-bold text-lg mb-2 text-center">{insight.title}</h3>
              <p className="text-slate-600 text-sm mb-3">{insight.text}</p>
              <div className="bg-space-800 rounded-lg p-2">
                <div className="text-xs text-cyan-400">📊 Data used:</div>
                <div className="text-xs text-slate-400">{insight.dataUsed}</div>
              </div>
            </div>

            {!rated ? (
              <div>
                <p className="text-slate-900 font-bold text-sm mb-3 text-center">
                  How does this insight make you feel?
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRate("helpful")}
                    className="p-3 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl text-slate-900 text-sm font-bold hover:border-emerald-500"
                  >
                    <span className="text-2xl block mb-1">👍</span>
                    Helpful!
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRate("creepy")}
                    className="p-3 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-slate-900 text-sm font-bold hover:border-red-500"
                  >
                    <span className="text-2xl block mb-1">😬</span>
                    Creepy!
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRate("both")}
                    className="p-3 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl text-slate-900 text-sm font-bold hover:border-yellow-500"
                  >
                    <span className="text-2xl block mb-1">🤔</span>
                    Both!
                  </motion.button>
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-space-900 rounded-xl p-3 mb-3 text-center">
                  <span className="text-slate-600 text-sm">
                    You rated this insight as{" "}
                    <span className={
                      ratings[ratings.length - 1] === "helpful"
                        ? "text-emerald-500 font-bold"
                        : ratings[ratings.length - 1] === "creepy"
                        ? "text-red-400 font-bold"
                        : "text-yellow-400 font-bold"
                    }>
                      {ratings[ratings.length - 1] === "helpful" ? "👍 Helpful" : ratings[ratings.length - 1] === "creepy" ? "😬 Creepy" : "🤔 Both"}
                    </span>
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNextInsight}
                  className="w-full py-3 bg-cyan-500 text-space-900 font-bold rounded-xl"
                >
                  {insightIdx < INSIGHTS.length - 1 ? "Next Insight →" : "See Summary"}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
