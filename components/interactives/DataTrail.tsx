"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AppScenario {
  app: string;
  icon: string;
  action: string;
  dataCollected: string[];
  usedFor: string;
  surprise: string;
}

const APPS: AppScenario[] = [
  {
    app: "Social Media",
    icon: "📱",
    action: "You scroll through your feed for 20 minutes",
    dataCollected: ["Every post you paused on", "How long you looked at each post", "What you liked, shared, or skipped", "What time of day you're active", "Your location"],
    usedFor: "Building a profile of your interests, emotions, and habits to show you targeted ads and keep you scrolling longer.",
    surprise: "Even posts you DON'T interact with tell the AI something — pausing for 2 seconds on a photo is tracked as interest!",
  },
  {
    app: "Voice Assistant",
    icon: "🎙️",
    action: "You ask your smart speaker 'What's the weather?'",
    dataCollected: ["Your voice recording", "Your location", "The time you asked", "Your accent and speech patterns", "Previous questions you've asked"],
    usedFor: "Improving speech recognition, but also building a profile of your daily routine, interests, and habits.",
    surprise: "Some devices listen for their wake word constantly — meaning they're always processing audio, even if they're not supposed to record it.",
  },
  {
    app: "Fitness Tracker",
    icon: "⌚",
    action: "You wear your fitness tracker all day",
    dataCollected: ["Your heart rate 24/7", "Sleep patterns", "Steps and movement", "Location via GPS", "When you're stressed (heart rate spikes)"],
    usedFor: "Health insights for you, but also potentially shared with insurance companies, advertisers, or data brokers.",
    surprise: "Your resting heart rate patterns can reveal health conditions you haven't been diagnosed with yet — data that's valuable to insurance companies.",
  },
  {
    app: "Online Shopping",
    icon: "🛒",
    action: "You browse an online store without buying anything",
    dataCollected: ["Every product you viewed", "How long you looked at each item", "What you put in cart but didn't buy", "Your price sensitivity", "Your browsing device and location"],
    usedFor: "AI predicts what you'll buy and when, then shows you targeted ads across other websites. Prices may change based on your profile.",
    surprise: "Some stores show different prices to different people based on their data profile — your location, device, and browsing history can affect what you pay!",
  },
];

const QUIZ = [
  {
    question: "What's the most common way apps collect data about you?",
    options: ["They ask you directly each time", "They track your behavior silently in the background", "They only collect what you type", "They guess randomly"],
    correct: 1,
    explanation: "Most data collection happens silently — tracking scrolls, pauses, taps, and location without you actively doing anything. That's why privacy policies exist (even if few people read them).",
  },
  {
    question: "Why is your data valuable to companies?",
    options: ["They want to be your friend", "Data helps them show you targeted ads and predict your behavior", "They need it for security", "It's not actually valuable"],
    correct: 1,
    explanation: "Your data helps companies predict what you'll buy, what content keeps you engaged, and how to target ads. This data is worth billions of dollars industry-wide.",
  },
  {
    question: "What's the best way to protect your privacy?",
    options: ["Never use technology", "Understand what's collected and make informed choices", "Trust that companies will protect you", "Use a fake name for everything"],
    correct: 1,
    explanation: "You don't have to avoid tech — but understanding what data is collected helps you make informed choices about what to share, what to limit, and which apps to trust.",
  },
  {
    question: "Can you ever fully delete your data from the internet?",
    options: ["Yes — just press delete", "Practically no — copies exist everywhere", "Only if you ask nicely", "Yes — there's a universal delete button"],
    correct: 1,
    explanation: "Once data is shared, copies may exist on backups, third-party servers, and data brokers. Some laws (like GDPR) give you the right to request deletion, but full removal is nearly impossible.",
  },
];

export function DataTrail({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"explore" | "quiz">("explore");
  const [appIdx, setAppIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function pickAnswer(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === QUIZ[quizIdx].correct) setScore((s) => s + 1);
  }

  function nextQuiz() {
    setPicked(null);
    if (quizIdx >= QUIZ.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setQuizIdx((q) => q + 1);
    }
  }

  if (done) {
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          {score >= QUIZ.length - 1 ? "🛡️" : "👁️"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{QUIZ.length}</div>
          <div className="text-slate-300 mt-2">
            {score >= QUIZ.length - 1 ? "Privacy pro! You understand your data trail." : score >= QUIZ.length / 2 ? "Good privacy awareness!" : "Now you know — your data trail is longer than you thought!"}
          </div>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/40 rounded-2xl p-4">
          <div className="font-black text-orange-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">Every app collects data about you. Understanding your data trail is the first step to making informed choices about your privacy.</p>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    const q = QUIZ[quizIdx];
    return (
      <div className="space-y-5">
        <div className="flex gap-1.5">
          {QUIZ.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < quizIdx ? "bg-orange-500" : i === quizIdx ? "bg-orange-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-orange-400 mb-1">PRIVACY QUIZ</div>
          <div className="text-white font-black text-lg mb-4">{q.question}</div>
          {picked === null ? (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <motion.button key={i} onClick={() => pickAnswer(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-xl border border-slate-700 bg-space-900 font-bold text-white text-sm hover:border-orange-500/50 transition-colors">
                  {opt}
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${picked === q.correct ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                {picked === q.correct ? "Correct! " : `Answer: "${q.options[q.correct]}." `}
                <span className="font-normal text-slate-300">{q.explanation}</span>
              </div>
              <button onClick={nextQuiz} className="w-full py-4 rounded-xl font-black text-white bg-orange-500 hover:bg-orange-400 btn-press transition-colors">
                {quizIdx < QUIZ.length - 1 ? "Next Question" : "See Results"} &rarr;
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Explore phase
  const app = APPS[appIdx];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {APPS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < appIdx ? "bg-orange-500" : i === appIdx ? "bg-orange-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs text-slate-400 font-bold">{appIdx + 1}/{APPS.length}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-orange-400 mb-1">DATA TRAIL</div>
        <div className="text-sm text-slate-400 font-bold mb-4">See what data apps collect about you:</div>

        <motion.div key={appIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-3">
            <div className="text-3xl mb-2">{app.icon}</div>
            <div className="text-white font-black mb-1">{app.app}</div>
            <div className="text-sm text-slate-400 italic">{app.action}</div>
          </div>

          {!revealed ? (
            <button onClick={() => setRevealed(true)} className="w-full py-4 rounded-xl font-black text-white bg-orange-500 hover:bg-orange-400 btn-press transition-colors">
              Reveal What&apos;s Collected &rarr;
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                <div className="text-xs font-black text-orange-400 mb-2">DATA COLLECTED:</div>
                <ul className="space-y-1.5">
                  {app.dataCollected.map((d, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-orange-400">&#x2022;</span> {d}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="bg-space-900 rounded-xl p-3 border border-slate-600 text-sm text-slate-300">
                <strong className="text-white">Used for: </strong>{app.usedFor}
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-sm text-slate-300">
                <strong className="text-red-300">Surprise: </strong>{app.surprise}
              </div>
              <button
                onClick={() => {
                  setRevealed(false);
                  if (appIdx < APPS.length - 1) setAppIdx((a) => a + 1);
                  else setPhase("quiz");
                }}
                className="w-full py-4 rounded-xl font-black text-white bg-orange-500 hover:bg-orange-400 btn-press transition-colors"
              >
                {appIdx < APPS.length - 1 ? "Next App" : "Test Your Knowledge"} &rarr;
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
