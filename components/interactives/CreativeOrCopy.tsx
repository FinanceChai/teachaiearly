"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Example {
  title: string;
  description: string;
  isAI: boolean;
  explanation: string;
}

const EXAMPLES: Example[] = [
  {
    title: "A painting that mixes Van Gogh's swirls with Monet's colors",
    description: "An image blending two famous art styles into something new.",
    isAI: true,
    explanation: "AI generated this by learning patterns from thousands of paintings. It recombines styles it learned — but it doesn't understand what 'beauty' or 'emotion' means.",
  },
  {
    title: "A poem about losing a childhood pet",
    description: "A heartfelt poem full of specific memories and personal details.",
    isAI: false,
    explanation: "This was written by a human from real personal experience. AI can write poems, but they come from pattern matching — not from actually losing a pet and feeling that grief.",
  },
  {
    title: "A logo with clean geometric shapes and modern fonts",
    description: "A professional-looking brand logo for a tech startup.",
    isAI: true,
    explanation: "AI can generate logos by recombining design patterns it learned. But it doesn't understand what makes a brand meaningful to its audience — a human designer considers business goals and audience.",
  },
  {
    title: "A jazz solo that responds to the crowd's energy",
    description: "A musician improvising differently each night based on the audience reaction.",
    isAI: false,
    explanation: "Human musicians read the room, feel the energy, and adapt in real-time based on emotion and social connection. AI can generate music, but can't truly feel the crowd.",
  },
  {
    title: "A short story in the style of a famous author",
    description: "A story that sounds exactly like a well-known writer's voice.",
    isAI: true,
    explanation: "AI can mimic writing styles very convincingly by learning patterns from an author's work. But it doesn't have its own experiences or worldview — it's sophisticated pattern matching.",
  },
  {
    title: "A stand-up comedy routine about current events",
    description: "A comedian riffing on today's news with sharp observations.",
    isAI: false,
    explanation: "Great comedy comes from a unique human perspective, timing, and understanding what's absurd about society. AI can generate jokes, but lacks the lived experience that makes comedy resonate.",
  },
];

const QUIZ = [
  {
    question: "What does AI actually do when it 'creates' something?",
    options: ["Imagines something totally new", "Recombines patterns from training data", "Copies one specific artwork", "Uses real emotions"],
    correct: 1,
    explanation: "AI creates by recombining patterns it learned from millions of examples. It's sophisticated remixing — not imagination from lived experience.",
  },
  {
    question: "Why can AI mimic an artist's style so well?",
    options: ["It understands the artist's emotions", "It studied with the artist", "It learned statistical patterns in their work", "It has the same life experiences"],
    correct: 2,
    explanation: "AI learns the statistical patterns — brush strokes, color choices, composition rules — without understanding WHY the artist made those choices.",
  },
  {
    question: "What can humans bring to creativity that AI cannot?",
    options: ["Perfect technique", "Faster output", "Personal meaning and lived experience", "More color options"],
    correct: 2,
    explanation: "Humans create from personal experience, emotions, cultural understanding, and intentional meaning. AI has none of these — it has patterns.",
  },
];

export function CreativeOrCopy({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"examples" | "quiz">("examples");
  const [exIdx, setExIdx] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizPicked, setQuizPicked] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [done, setDone] = useState(false);

  function pickAnswer(isAI: boolean) {
    if (picked !== null) return;
    setPicked(isAI);
    if (isAI === EXAMPLES[exIdx].isAI) setScore((s) => s + 1);
  }

  function nextExample() {
    setPicked(null);
    if (exIdx >= EXAMPLES.length - 1) {
      setPhase("quiz");
    } else {
      setExIdx((i) => i + 1);
    }
  }

  function pickQuiz(idx: number) {
    if (quizPicked !== null) return;
    setQuizPicked(idx);
    if (idx === QUIZ[quizIdx].correct) setQuizScore((s) => s + 1);
  }

  function nextQuiz() {
    setQuizPicked(null);
    if (quizIdx >= QUIZ.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setQuizIdx((q) => q + 1);
    }
  }

  if (done) {
    const total = EXAMPLES.length + QUIZ.length;
    const totalScore = score + quizScore;
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          {totalScore >= total - 2 ? "🎨" : "🖌️"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{totalScore}/{total}</div>
          <div className="text-slate-300 mt-2">
            {totalScore >= total - 1 ? "Amazing! You really understand AI creativity." : totalScore >= total / 2 ? "Good grasp of creative AI!" : "The line between AI and human creativity is blurry!"}
          </div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/40 rounded-2xl p-4">
          <div className="font-black text-blue-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">AI creates by remixing patterns, not from experience. Human creativity comes from lived experience, emotion, and intentional meaning — things AI doesn&apos;t have.</p>
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
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < exIdx ? "bg-blue-500" : i === exIdx ? "bg-blue-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-blue-400 mb-1">CREATIVE OR COPY?</div>
          <div className="text-sm text-slate-400 font-bold mb-4">Was this made by AI or a human?</div>

          <motion.div key={exIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-space-900 rounded-xl p-5 border border-slate-600 mb-4">
            <div className="text-white font-black text-lg mb-2">{ex.title}</div>
            <div className="text-slate-400 text-sm">{ex.description}</div>
          </motion.div>

          {picked === null ? (
            <div className="grid grid-cols-2 gap-3">
              <motion.button onClick={() => pickAnswer(true)} whileTap={{ scale: 0.95 }} className="py-5 rounded-xl border border-slate-700 bg-space-900 font-black text-white text-lg hover:border-blue-500/50 transition-colors">
                AI Made It
              </motion.button>
              <motion.button onClick={() => pickAnswer(false)} whileTap={{ scale: 0.95 }} className="py-5 rounded-xl border border-slate-700 bg-space-900 font-black text-white text-lg hover:border-blue-500/50 transition-colors">
                Human Made It
              </motion.button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${picked === ex.isAI ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                {picked === ex.isAI ? "Correct! " : `It was ${ex.isAI ? "AI" : "human"}-made. `}
                <span className="font-normal text-slate-300">{ex.explanation}</span>
              </div>
              <button onClick={nextExample} className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors">
                {exIdx < EXAMPLES.length - 1 ? "Next Example" : "Knowledge Check"}  &rarr;
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  const q = QUIZ[quizIdx];
  return (
    <div className="space-y-5">
      <div className="flex gap-1.5">
        {QUIZ.map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < quizIdx ? "bg-blue-500" : i === quizIdx ? "bg-blue-400" : "bg-slate-700"}`} />
        ))}
      </div>
      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-blue-400 mb-1">CREATIVITY QUIZ</div>
        <div className="text-white font-black text-lg mb-4">{q.question}</div>
        {quizPicked === null ? (
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <motion.button key={i} onClick={() => pickQuiz(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-xl border border-slate-700 bg-space-900 font-bold text-white text-sm hover:border-blue-500/50 transition-colors">
                {opt}
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className={`p-4 rounded-xl text-sm font-bold ${quizPicked === q.correct ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
              {quizPicked === q.correct ? "Correct! " : `Answer: "${q.options[q.correct]}." `}
              <span className="font-normal text-slate-300">{q.explanation}</span>
            </div>
            <button onClick={nextQuiz} className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors">
              {quizIdx < QUIZ.length - 1 ? "Next Question" : "See Results"} &rarr;
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
