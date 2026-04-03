"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Problem {
  id: number;
  name: string;
  description: string;
  fixes: { text: string; correct: boolean }[];
}

interface Tester {
  name: string;
  emoji: string;
  feedback: string;
  problemId: number;
}

const PROBLEMS: Problem[] = [
  {
    id: 1,
    name: "Confusing Navigation",
    description: "Users can't figure out how to go back to the home screen",
    fixes: [
      { text: "Add a clear 'Home' button on every screen", correct: true },
      { text: "Remove the home screen entirely", correct: false },
      { text: "Add more screens to explore", correct: false },
    ],
  },
  {
    id: 2,
    name: "Slow AI Response",
    description: "The AI feature takes too long and users think it's broken",
    fixes: [
      { text: "Delete the AI feature", correct: false },
      { text: "Add a loading animation so users know it's working", correct: true },
      { text: "Tell users to be more patient", correct: false },
    ],
  },
  {
    id: 3,
    name: "Unclear Instructions",
    description: "Users don't understand what they're supposed to do",
    fixes: [
      { text: "Make the text smaller so it looks cleaner", correct: false },
      { text: "Add a step-by-step tutorial for first-time users", correct: true },
      { text: "Remove all text and use only icons", correct: false },
    ],
  },
];

const TESTERS: Tester[] = [
  {
    name: "Maya, age 10",
    emoji: "👧",
    feedback: "I kept tapping everywhere trying to get back to the start. Where's the home button? I got lost after the second screen!",
    problemId: 1,
  },
  {
    name: "Jake, age 11",
    emoji: "👦",
    feedback: "I pressed the AI button and nothing happened for like 10 seconds. I thought the app crashed so I closed it and opened it again!",
    problemId: 2,
  },
  {
    name: "Aisha, age 9",
    emoji: "👧🏽",
    feedback: "I opened the app and had no idea what to do first. There were buttons everywhere but nothing told me which one to press!",
    problemId: 3,
  },
];

export function FeedbackLoop({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"match" | "fix" | "done">("match");
  const [currentTester, setCurrentTester] = useState(0);
  const [matches, setMatches] = useState<(number | null)[]>([null, null, null]);
  const [matchFeedback, setMatchFeedback] = useState<string | null>(null);
  const [correctMatches, setCorrectMatches] = useState(0);
  const [currentFix, setCurrentFix] = useState(0);
  const [fixAnswers, setFixAnswers] = useState<(boolean | null)[]>([null, null, null]);
  const [done, setDone] = useState(false);

  const handleMatch = (problemId: number) => {
    const tester = TESTERS[currentTester];
    const isCorrect = tester.problemId === problemId;

    const next = [...matches];
    next[currentTester] = problemId;
    setMatches(next);

    if (isCorrect) {
      setMatchFeedback("Correct! You identified the problem perfectly!");
      setCorrectMatches((c) => c + 1);
    } else {
      setMatchFeedback(
        `Not quite — this feedback is about "${PROBLEMS.find((p) => p.id === tester.problemId)?.name}". The clue was about ${tester.problemId === 1 ? "getting lost and going back" : tester.problemId === 2 ? "waiting and thinking it crashed" : "not knowing what to do first"}.`
      );
    }
  };

  const handleNextTester = () => {
    setMatchFeedback(null);
    if (currentTester < TESTERS.length - 1) {
      setCurrentTester(currentTester + 1);
    } else {
      setPhase("fix");
    }
  };

  const handleFix = (fixIndex: number) => {
    const problem = PROBLEMS[currentFix];
    const isCorrect = problem.fixes[fixIndex].correct;
    const next = [...fixAnswers];
    next[currentFix] = isCorrect;
    setFixAnswers(next);
  };

  const handleNextFix = () => {
    if (currentFix < PROBLEMS.length - 1) {
      setCurrentFix(currentFix + 1);
    } else {
      setPhase("done");
    }
  };

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  if (phase === "done") {
    const fixCount = fixAnswers.filter((a) => a === true).length;
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <span className="text-5xl">🔄</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Feedback Loop Complete!</h2>

          <div className="grid grid-cols-2 gap-3 mt-4 mb-4">
            <div className="bg-space-800 rounded-lg p-3">
              <p className="text-3xl font-bold text-lime-400">{correctMatches}/3</p>
              <p className="text-slate-600 text-xs">Problems Identified</p>
            </div>
            <div className="bg-space-800 rounded-lg p-3">
              <p className="text-3xl font-bold text-lime-400">{fixCount}/3</p>
              <p className="text-slate-600 text-xs">Best Fixes Chosen</p>
            </div>
          </div>

          <div className="bg-space-800 rounded-lg p-4 text-left">
            <p className="text-lime-400 font-semibold mb-1">💡 What you learned:</p>
            <p className="text-slate-600 text-sm">
              User feedback is gold! Real testers will always find problems you missed.
              The key is: listen carefully, identify the real problem (not just the symptom),
              and pick fixes that are practical and helpful. This loop — build, test, get feedback,
              fix — is how every great product improves!
            </p>
          </div>

          {!done ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              className="mt-4 px-6 py-3 bg-lime-500 text-slate-900 rounded-lg font-bold"
            >
              Complete Activity ✓
            </motion.button>
          ) : (
            <p className="mt-4 text-lime-400 font-semibold">✓ Activity Complete!</p>
          )}
        </motion.div>
      </div>
    );
  }

  if (phase === "fix") {
    const problem = PROBLEMS[currentFix];
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-1">🔧 Fix the Problems</h2>
        <p className="text-slate-600 text-sm mb-4">
          Problem {currentFix + 1} of {PROBLEMS.length}: Pick the best fix!
        </p>

        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
          <p className="text-red-400 font-semibold text-sm">⚠️ {problem.name}</p>
          <p className="text-slate-600 text-sm">{problem.description}</p>
        </div>

        <div className="space-y-2 mb-4">
          {problem.fixes.map((fix, i) => (
            <motion.button
              key={fix.text}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleFix(i)}
              disabled={fixAnswers[currentFix] !== null}
              className={`w-full p-3 rounded-lg border text-left text-sm ${
                fixAnswers[currentFix] !== null
                  ? fix.correct
                    ? "bg-lime-500/20 border-lime-500"
                    : "bg-space-800 border-slate-200 opacity-50"
                  : "bg-space-800 border-slate-200 hover:border-lime-500"
              }`}
            >
              <p className="text-slate-900">{fix.text}</p>
            </motion.button>
          ))}
        </div>

        {fixAnswers[currentFix] !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={`rounded-lg p-3 mb-3 ${
              fixAnswers[currentFix] ? "bg-lime-500/10 border border-lime-500/30" : "bg-yellow-500/10 border border-yellow-500/30"
            }`}>
              <p className={fixAnswers[currentFix] ? "text-lime-400 text-sm" : "text-yellow-400 text-sm"}>
                {fixAnswers[currentFix]
                  ? "Perfect fix! This solves the problem without removing features."
                  : "The best fix adds something helpful rather than removing features or blaming users!"}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextFix}
              className="w-full px-5 py-2 bg-lime-500 text-slate-900 rounded-lg font-bold"
            >
              {currentFix < PROBLEMS.length - 1 ? "Next Problem →" : "See Results →"}
            </motion.button>
          </motion.div>
        )}
      </div>
    );
  }

  // Match phase
  const tester = TESTERS[currentTester];
  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-slate-900 mb-1">🔄 Feedback Loop</h2>
      <p className="text-slate-600 text-sm mb-4">
        Read each tester&apos;s feedback and match it to the right problem. Tester {currentTester + 1} of {TESTERS.length}
      </p>

      <motion.div
        key={currentTester}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-space-800 rounded-xl p-4 border border-slate-200 mb-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{tester.emoji}</span>
          <p className="text-slate-900 font-semibold">{tester.name}</p>
        </div>
        <div className="bg-space-900 rounded-lg p-3">
          <p className="text-slate-600 text-sm italic">&quot;{tester.feedback}&quot;</p>
        </div>
      </motion.div>

      <p className="text-lime-400 text-sm font-semibold mb-2">Which problem is this about?</p>
      <div className="space-y-2 mb-4">
        {PROBLEMS.map((problem) => (
          <motion.button
            key={problem.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleMatch(problem.id)}
            disabled={matches[currentTester] !== null}
            className={`w-full p-3 rounded-lg border text-left ${
              matches[currentTester] !== null
                ? problem.id === tester.problemId
                  ? "bg-lime-500/20 border-lime-500"
                  : "bg-space-800 border-slate-200 opacity-50"
                : "bg-space-800 border-slate-200 hover:border-lime-500"
            }`}
          >
            <p className="text-slate-900 text-sm font-semibold">{problem.name}</p>
            <p className="text-slate-400 text-xs">{problem.description}</p>
          </motion.button>
        ))}
      </div>

      {matchFeedback && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className={`rounded-lg p-3 mb-3 ${
            matches[currentTester] === tester.problemId
              ? "bg-lime-500/10 border border-lime-500/30"
              : "bg-yellow-500/10 border border-yellow-500/30"
          }`}>
            <p className={
              matches[currentTester] === tester.problemId
                ? "text-lime-400 text-sm"
                : "text-yellow-400 text-sm"
            }>
              {matchFeedback}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextTester}
            className="w-full px-5 py-2 bg-lime-500 text-slate-900 rounded-lg font-bold"
          >
            {currentTester < TESTERS.length - 1 ? "Next Tester →" : "Now Fix the Problems →"}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
