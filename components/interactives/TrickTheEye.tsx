"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AdversarialExample {
  original: { emoji: string; label: string; confidence: number };
  tweaked: { emoji: string; label: string; confidence: number };
  change: string;
  explanation: string;
}

const EXAMPLES: AdversarialExample[] = [
  {
    original: { emoji: "🐼", label: "Panda", confidence: 99 },
    tweaked: { emoji: "🐼", label: "Gibbon", confidence: 89 },
    change: "Added tiny invisible noise to every pixel",
    explanation: "By adding carefully calculated noise (invisible to humans), researchers made AI think a panda was a gibbon with 89% confidence. The image looks identical to us!",
  },
  {
    original: { emoji: "🛑", label: "Stop Sign", confidence: 97 },
    tweaked: { emoji: "🛑", label: "Speed Limit 45", confidence: 91 },
    change: "Added small stickers to the sign",
    explanation: "Researchers placed a few small stickers on a stop sign and fooled self-driving car AI into reading it as a speed limit sign. This is a real safety concern!",
  },
  {
    original: { emoji: "🐢", label: "Turtle", confidence: 95 },
    tweaked: { emoji: "🐢", label: "Rifle", confidence: 86 },
    change: "Applied a special textured pattern on the shell",
    explanation: "By 3D-printing a special pattern onto a turtle shell, AI identified it as a rifle. The pattern exploits specific weaknesses in how AI processes textures.",
  },
  {
    original: { emoji: "🍌", label: "Banana", confidence: 98 },
    tweaked: { emoji: "🍌", label: "Toaster", confidence: 82 },
    change: "Rotated the image and added pixel noise",
    explanation: "Rotating an image and adding a tiny amount of noise can completely change AI's classification. Humans see the same banana — AI sees a toaster.",
  },
];

interface TrickQuiz {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZ: TrickQuiz[] = [
  {
    question: "Why can tiny pixel changes fool AI but not humans?",
    options: [
      "AI looks at individual pixels, humans see the whole picture",
      "Humans have better screens",
      "AI is always wrong about images",
      "The images are actually different to humans too",
    ],
    correct: 0,
    explanation: "AI processes images mathematically, pixel by pixel. Humans understand context and meaning. A few changed pixels shifts AI's math dramatically but is invisible to our eyes.",
  },
  {
    question: "What's an adversarial attack?",
    options: [
      "When AI attacks a computer",
      "When someone deliberately tricks AI with modified input",
      "When two AIs fight each other",
      "When AI runs out of memory",
    ],
    correct: 1,
    explanation: "An adversarial attack is when someone deliberately crafts input (like a modified image) to fool AI into making mistakes. It's a major area of AI security research.",
  },
  {
    question: "Why are adversarial attacks a real-world problem?",
    options: [
      "They could trick self-driving cars or security systems",
      "They make computers slower",
      "They only work in labs, never in real life",
      "They only affect old AI systems",
    ],
    correct: 0,
    explanation: "If you can trick a self-driving car's AI into misreading a stop sign, that's a life-or-death safety issue. Adversarial robustness is one of the biggest challenges in AI safety.",
  },
  {
    question: "How can AI defend against adversarial attacks?",
    options: [
      "Delete all images from the internet",
      "Training on adversarial examples to become more robust",
      "Stop using AI for vision entirely",
      "Make cameras more expensive",
    ],
    correct: 1,
    explanation: "By including adversarial examples in training data, AI can learn to be more robust. It's an arms race — attackers find new tricks, defenders train against them.",
  },
];

export function TrickTheEye({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"examples" | "quiz">("examples");
  const [exIdx, setExIdx] = useState(0);
  const [showTweak, setShowTweak] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function pickAnswer(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === QUIZ[quizIdx].correct) setScore((s) => s + 1);
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
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">🎭</motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{QUIZ.length}</div>
          <div className="text-slate-300 mt-2">
            {score >= QUIZ.length - 1 ? "Excellent! You understand AI's hidden vulnerability." : score >= QUIZ.length / 2 ? "Good grasp of adversarial AI!" : "Adversarial attacks are tricky — but now you know they exist!"}
          </div>
        </div>
        <div className="bg-pink-500/20 border border-pink-500/40 rounded-2xl p-4">
          <div className="font-black text-pink-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">Tiny, invisible changes to images can completely fool AI. This is why AI safety research is so important — especially for things like self-driving cars.</p>
        </div>
      </div>
    );
  }

  if (phase === "examples") {
    const ex = EXAMPLES[exIdx];
    return (
      <div className="space-y-5">
        <div className="flex gap-1.5">
          {EXAMPLES.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < exIdx ? "bg-pink-500" : i === exIdx ? "bg-pink-400" : "bg-slate-700"}`} />
          ))}
        </div>

        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-pink-400 mb-1">ADVERSARIAL EXAMPLES</div>
          <div className="text-sm text-slate-400 font-bold mb-4">Same image to your eyes — totally different to AI.</div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Original */}
            <div className="bg-space-900 rounded-xl p-4 border border-slate-600 text-center">
              <div className="text-4xl mb-2">{ex.original.emoji}</div>
              <div className="text-xs font-black text-green-400">ORIGINAL</div>
              <div className="text-white font-black mt-1">{ex.original.label}</div>
              <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${ex.original.confidence}%` }} />
              </div>
              <div className="text-xs text-green-400 font-bold mt-1">{ex.original.confidence}% sure</div>
            </div>

            {/* Tweaked */}
            <div className={`bg-space-900 rounded-xl p-4 border text-center transition-all ${showTweak ? "border-red-500/50" : "border-slate-600"}`}>
              <div className="text-4xl mb-2">{ex.tweaked.emoji}</div>
              <div className="text-xs font-black text-red-400">AFTER ATTACK</div>
              {showTweak ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="text-white font-black mt-1">{ex.tweaked.label}</div>
                  <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${ex.tweaked.confidence}%` }} />
                  </div>
                  <div className="text-xs text-red-400 font-bold mt-1">{ex.tweaked.confidence}% sure</div>
                </motion.div>
              ) : (
                <div className="text-slate-500 font-black mt-1">???</div>
              )}
            </div>
          </div>

          {!showTweak ? (
            <button onClick={() => setShowTweak(true)} className="w-full py-4 rounded-xl font-black text-white bg-red-500 hover:bg-red-400 btn-press transition-colors">
              Apply Attack →
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <div className="text-xs font-black text-red-400 mb-1">WHAT CHANGED</div>
                <div className="text-sm text-slate-300">{ex.change}</div>
              </div>
              <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-3">
                <div className="text-xs font-black text-pink-400 mb-1">WHY IT WORKS</div>
                <div className="text-sm text-slate-300">{ex.explanation}</div>
              </div>
              <button
                onClick={() => {
                  setShowTweak(false);
                  if (exIdx < EXAMPLES.length - 1) setExIdx((e) => e + 1);
                  else setPhase("quiz");
                }}
                className="w-full py-4 rounded-xl font-black text-white bg-pink-500 hover:bg-pink-400 btn-press transition-colors"
              >
                {exIdx < EXAMPLES.length - 1 ? "Next Example →" : "Take the Quiz →"}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Quiz phase
  const q = QUIZ[quizIdx];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {QUIZ.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < quizIdx ? "bg-pink-500" : i === quizIdx ? "bg-pink-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs font-bold text-yellow-400">Score: {score}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-pink-400 mb-3">ADVERSARIAL QUIZ</div>
        <div className="text-white font-black text-lg mb-4">{q.question}</div>

        {picked === null ? (
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <motion.button key={i} onClick={() => pickAnswer(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-xl border border-slate-700 bg-space-900 font-bold text-white text-sm hover:border-pink-500/50 transition-colors">
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
            <button onClick={nextQuiz} className="w-full py-4 rounded-xl font-black text-white bg-pink-500 hover:bg-pink-400 btn-press transition-colors">
              {quizIdx < QUIZ.length - 1 ? "Next Question →" : "See Results →"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
