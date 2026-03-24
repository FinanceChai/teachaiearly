"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

type Scenario = {
  id: string;
  question: string;
  aiAnswer: string;
  aiConfidence: number;
  actuallyWrong: boolean;
  truth: string;
  why: string;
};

const SCENARIOS: Scenario[] = [
  { id: "s1", question: "What year was the Eiffel Tower built?", aiAnswer: "1889", aiConfidence: 99, actuallyWrong: false, truth: "1889 — correct!", why: "Well-documented historical fact — lots of accurate training data on this." },
  { id: "s2", question: "A doctor says: 'This patient has condition X.' The AI diagnoses the same patient. Who is right?", aiAnswer: "The AI is 94% confident it's condition Y", aiConfidence: 94, actuallyWrong: true, truth: "The AI is wrong! The doctor has context AI cannot see.", why: "AI cannot examine the patient, see their full history, or pick up on subtle cues. 94% confident still means wrong 1 in 17 times." },
  { id: "s3", question: "Translate 'I'm feeling under the weather' to French", aiAnswer: "Je me sens sous la météo", aiConfidence: 87, actuallyWrong: true, truth: "Wrong! It should be 'Je ne me sens pas bien' (the idiom does not translate literally)", why: "Idioms do not translate word-for-word. AI often misses cultural expressions even when confident." },
  { id: "s4", question: "Is 2 + 2 = 4?", aiAnswer: "Yes, 2 + 2 = 4", aiConfidence: 100, actuallyWrong: false, truth: "Correct — basic arithmetic is reliable.", why: "Basic math is well-represented in training data. AI handles this reliably." },
  { id: "s5", question: "What happened in the news today?", aiAnswer: "I can tell you about events up to my training cutoff...", aiConfidence: 45, actuallyWrong: true, truth: "AI cannot know current events! Its training data has a cutoff date.", why: "AI does not have internet access or real-time updates. It only knows what was in its training data." },
];

const TRACK_HALF = 130;

function VerdictSlider({
  onVerdict,
}: {
  onVerdict: (verdict: "right" | "wrong") => void;
}) {
  const x = useMotionValue(0);
  const thumbColor = useTransform(x, [-TRACK_HALF, 0, TRACK_HALF], ["#ef4444", "#94a3b8", "#22c55e"]);
  const wrongOpacity = useTransform(x, [-TRACK_HALF, -30], [1, 0.3]);
  const rightOpacity = useTransform(x, [30, TRACK_HALF], [0.3, 1]);
  const [hint, setHint] = useState(true);

  async function handleDragEnd() {
    const val = x.get();
    if (val > 30) {
      onVerdict("right");
    } else if (val < -30) {
      onVerdict("wrong");
    } else {
      await animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs font-black px-1">
        <motion.span style={{ opacity: wrongOpacity }} className="text-red-400">✗ Wrong</motion.span>
        <span className="text-slate-600">Drag to judge</span>
        <motion.span style={{ opacity: rightOpacity }} className="text-green-400">Right ✓</motion.span>
      </div>

      {/* Track */}
      <div className="relative h-14 rounded-full overflow-hidden bg-gradient-to-r from-red-500/20 via-slate-700/40 to-green-500/20 border border-slate-600">
        {/* Thumb */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -TRACK_HALF, right: TRACK_HALF }}
          dragElastic={0}
          dragMomentum={false}
          style={{ x, backgroundColor: thumbColor, touchAction: "none" }}
          onDrag={() => setHint(false)}
          onDragEnd={handleDragEnd}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg cursor-grab active:cursor-grabbing z-10 flex items-center justify-center"
        >
          <span className="text-white font-black text-lg pointer-events-none">⚖️</span>
        </motion.div>

        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-600 -translate-x-1/2" />
      </div>

      <AnimatePresence>
        {hint && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-slate-500 text-center font-bold">
            Drag left = I think AI is wrong · Drag right = I think AI is right
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function StumpTheAI({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [verdict, setVerdict] = useState<"right" | "wrong" | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const scenario = SCENARIOS[current];
  const userCorrect = verdict !== null && ((verdict === "wrong" && scenario.actuallyWrong) || (verdict === "right" && !scenario.actuallyWrong));
  const score = answers.filter(Boolean).length;

  function handleVerdict(v: "right" | "wrong") {
    setVerdict(v);
    const correct = (v === "wrong" && scenario.actuallyWrong) || (v === "right" && !scenario.actuallyWrong);
    setAnswers((prev) => [...prev, correct]);
  }

  function next() {
    setVerdict(null);
    if (current >= SCENARIOS.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setCurrent((c) => c + 1);
    }
  }

  if (done) {
    const finalScore = answers.filter(Boolean).length;
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          🧐
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{finalScore}/5</div>
          <div className="text-slate-300 mt-2">{finalScore >= 4 ? "Critical thinker! You cannot be fooled by confident AI." : finalScore >= 3 ? "Good instincts — AI overconfidence is hard to spot." : "Remember: AI confidence does not equal AI correctness!"}</div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {answers.map((correct, i) => (
            <div key={i} className={`py-3 rounded-xl font-black text-lg ${correct ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
              {correct ? "✓" : "✗"}
            </div>
          ))}
        </div>
        <div className="bg-green-500/20 border border-green-500/40 rounded-2xl p-4">
          <div className="font-black text-green-300">Activity Complete! 🎉</div>
          <p className="text-sm text-slate-400 mt-1">Always verify AI answers — especially for important decisions!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {SCENARIOS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < current ? (answers[i] ? "bg-green-500" : "bg-red-500") : i === current ? "bg-amber-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs font-black text-slate-400">{score}/{current} right</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700 space-y-4">
        {/* Question */}
        <div>
          <div className="text-xs font-black text-amber-400 mb-2">THE QUESTION</div>
          <p className="text-white font-bold text-sm leading-snug">{scenario.question}</p>
        </div>

        {/* AI answer card */}
        <div className="bg-space-900 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-black text-slate-400">🤖 AI SAYS</div>
            <div className="text-xs font-black text-amber-400">{scenario.aiConfidence}% confident</div>
          </div>
          <p className="text-white font-bold text-sm mb-3">{scenario.aiAnswer}</p>
          <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${scenario.aiConfidence}%` }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
            />
          </div>
        </div>

        {/* Slider or result */}
        <AnimatePresence mode="wait">
          {verdict === null ? (
            <motion.div key="slider" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <VerdictSlider key={current} onVerdict={handleVerdict} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="space-y-3"
            >
              <div className={`p-4 rounded-xl border ${userCorrect ? "bg-green-500/20 border-green-500/30" : "bg-red-500/20 border-red-500/30"}`}>
                <motion.div
                  initial={{ scale: 0.7 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className={`font-black text-lg mb-1 ${userCorrect ? "text-green-300" : "text-red-300"}`}
                >
                  {userCorrect ? "✓ Good judgment!" : "✗ Tricked by AI confidence!"}
                </motion.div>
                <div className="font-bold text-white text-sm mb-1">{scenario.truth}</div>
                <div className="text-slate-300 text-xs">{scenario.why}</div>
              </div>
              <button onClick={next} className="w-full py-4 rounded-xl font-black text-white bg-amber-500 hover:bg-amber-400 btn-press transition-colors">
                {current < SCENARIOS.length - 1 ? "Next Scenario →" : "See Results →"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
