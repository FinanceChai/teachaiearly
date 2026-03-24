"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Scenario {
  title: string;
  description: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  perspective: string;
}

const SCENARIOS: Scenario[] = [
  {
    title: "The Portrait Artist",
    description: "An AI company trains its image generator on 10,000 portraits by living artists, without asking permission. Users can now type 'paint a portrait in the style of [artist name]' and get results that look remarkably like that artist's work.",
    question: "Is this fair to the artists?",
    options: ["Yes — AI is just learning, like a student", "No — artists didn't consent and aren't paid", "It depends on whether the AI copies exactly", "It doesn't matter — art is for everyone"],
    correct: 1,
    explanation: "Most people agree artists should have a say in how their work is used. Unlike a student who develops their own style, AI can mass-produce imitations without credit or compensation.",
    perspective: "Many artists have sued AI companies over this exact issue. The legal and ethical debate is ongoing worldwide.",
  },
  {
    title: "The Music Mashup",
    description: "An AI creates a hit song by learning from thousands of songs across genres. The melody sounds similar to an existing song, but not identical. It becomes hugely popular.",
    question: "Who deserves credit?",
    options: ["The AI — it created the song", "The person who typed the prompt", "The original artists whose work trained the AI", "Nobody — it's just math"],
    correct: 2,
    explanation: "The AI couldn't create without learning from human artists' work. Many argue the original creators deserve credit and compensation, even if the output isn't an exact copy.",
    perspective: "This mirrors real music copyright cases. Even human musicians get sued for songs that sound 'too similar' to existing ones.",
  },
  {
    title: "The Student's Shortcut",
    description: "A student uses AI to generate artwork for a school project. They type a detailed prompt, pick the best result, and submit it as their own work.",
    question: "Is this the student's creative work?",
    options: ["Yes — they wrote the prompt", "No — AI did the actual creating", "Partially — the idea was theirs, execution was AI's", "It depends on the school's rules"],
    correct: 2,
    explanation: "The student contributed creative direction (the idea, the prompt), but the AI did the execution. It's a collaboration — and being transparent about that matters.",
    perspective: "Schools are still figuring out policies. The key question: did the student learn anything? Transparency about AI use is becoming essential.",
  },
  {
    title: "Free vs. Paid Training Data",
    description: "Company A trains AI on freely available internet images. Company B pays artists for permission to use their work as training data. Company A's product is cheaper.",
    question: "Which approach is more ethical?",
    options: ["Company A — public images are free to use", "Company B — artists deserve to be asked and paid", "Neither — AI shouldn't use any human art", "Both are fine — it's just business"],
    correct: 1,
    explanation: "Paying artists for their work respects their rights and contributions. 'Free on the internet' doesn't mean 'free to use for commercial AI training.'",
    perspective: "Some companies now offer opt-out or opt-in programs for artists. The industry is slowly moving toward more ethical data practices.",
  },
  {
    title: "Cultural Heritage",
    description: "An AI is trained on sacred art and cultural symbols from indigenous communities. People can now generate images using these sacred patterns for any purpose — including joke t-shirts.",
    question: "What's the biggest concern here?",
    options: ["The images won't be high quality", "Sacred cultural elements are being used without respect", "AI can't understand art anyway", "T-shirts are fine"],
    correct: 1,
    explanation: "Using sacred cultural elements without understanding or respect can be deeply harmful to communities. AI doesn't understand cultural significance — it just sees patterns.",
    perspective: "This raises questions about whose culture gets used, who profits, and who gets to decide. Cultural sensitivity matters even in the age of AI.",
  },
];

export function StyleMixer({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function pickAnswer(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === SCENARIOS[idx].correct) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    if (idx >= SCENARIOS.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setIdx((i) => i + 1);
    }
  }

  if (done) {
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          {score >= SCENARIOS.length - 1 ? "⚖️" : "🎨"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{SCENARIOS.length}</div>
          <div className="text-slate-300 mt-2">
            {score >= SCENARIOS.length - 1 ? "Excellent ethical reasoning! You think deeply about AI and art." : score >= SCENARIOS.length / 2 ? "Good thinking about AI art ethics!" : "These are hard questions — there are no easy answers!"}
          </div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/40 rounded-2xl p-4">
          <div className="font-black text-blue-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">AI art raises real questions about consent, credit, compensation, and cultural respect. These conversations shape how AI creativity develops.</p>
        </div>
      </div>
    );
  }

  const s = SCENARIOS[idx];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {SCENARIOS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < idx ? "bg-blue-500" : i === idx ? "bg-blue-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs font-bold text-yellow-400">Score: {score}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-blue-400 mb-3">THE REMIX QUESTION</div>

        <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-4">
            <div className="text-white font-black mb-2">{s.title}</div>
            <div className="text-sm text-slate-400 mb-3">{s.description}</div>
            <div className="text-white font-black text-sm">{s.question}</div>
          </div>

          {picked === null ? (
            <div className="space-y-2">
              {s.options.map((opt, i) => (
                <motion.button key={i} onClick={() => pickAnswer(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-xl border border-slate-700 bg-space-900 font-bold text-white text-sm hover:border-blue-500/50 transition-colors">
                  {opt}
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${picked === s.correct ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                {picked === s.correct ? "Well reasoned! " : `Best answer: "${s.options[s.correct]}." `}
                <span className="font-normal text-slate-300">{s.explanation}</span>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-sm text-slate-300">
                <strong className="text-blue-300">Real World: </strong>{s.perspective}
              </div>
              <button onClick={next} className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors">
                {idx < SCENARIOS.length - 1 ? "Next Scenario" : "See Results"} &rarr;
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
