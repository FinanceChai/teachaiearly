"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FACE_FACTS = [
  { part: "Eye Distance", icon: "👀", description: "AI measures the exact distance between your eyes. Even 1mm difference helps tell people apart.", measurement: "62mm average" },
  { part: "Nose Width", icon: "👃", description: "The width of your nose bridge and nostrils creates a unique signature.", measurement: "34mm average" },
  { part: "Jaw Shape", icon: "🫠", description: "AI traces your jawline from ear to chin — round, square, pointed — each is distinctive.", measurement: "120° average angle" },
  { part: "Forehead Height", icon: "🧠", description: "The distance from eyebrows to hairline varies widely between people.", measurement: "55mm average" },
  { part: "Mouth Width", icon: "👄", description: "Lip width and the distance from nose to upper lip are key markers.", measurement: "50mm average" },
];

interface MatchRound {
  scenario: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const MATCH_ROUNDS: MatchRound[] = [
  {
    scenario: "Two identical twins walk up to a face scanner.",
    question: "Can facial recognition tell them apart?",
    options: ["Always — they look different to AI", "Sometimes — tiny differences exist", "Never — they're identical", "AI refuses to scan twins"],
    correct: 1,
    explanation: "Identical twins are AI's hardest challenge! Tiny differences in scars, freckles, or slight asymmetry sometimes help — but twins often fool facial recognition systems.",
  },
  {
    scenario: "You're wearing sunglasses and a hat.",
    question: "Can AI still recognize your face?",
    options: ["Yes — it uses your jaw and mouth", "No — sunglasses block everything", "Only if you smile", "Only with special X-ray cameras"],
    correct: 0,
    explanation: "AI can often still identify you using your jaw shape, mouth, and the visible parts of your face. But accuracy drops significantly — sunglasses block some key measurements.",
  },
  {
    scenario: "A photo from 10 years ago vs. you today.",
    question: "Can AI match your old photo to you?",
    options: ["Yes — bone structure stays the same", "No — people change too much", "Only if you haven't grown", "Only with the same hairstyle"],
    correct: 0,
    explanation: "Your bone structure (eye distance, jaw shape, nose bridge) stays remarkably similar as you grow. AI focuses on these stable features, not hair or skin changes.",
  },
  {
    scenario: "A company uses face recognition to unlock phones.",
    question: "What's a real concern about this technology?",
    options: ["Phones get heavier", "It works less well on some skin tones", "It uses too much battery", "The camera lens might break"],
    correct: 1,
    explanation: "Studies have shown facial recognition works less accurately on darker skin tones and women's faces — because training data was biased toward lighter-skinned males. This is a real fairness problem.",
  },
  {
    scenario: "A store uses face recognition on every customer.",
    question: "What's the privacy concern?",
    options: ["The store knows your height", "Your face becomes a tracking ID without consent", "It makes shopping slower", "Cameras use too much electricity"],
    correct: 1,
    explanation: "Your face is unique and you can't change it like a password. Being tracked by face without your knowledge or consent is a major privacy issue being debated worldwide.",
  },
];

export function FaceParts({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"learn" | "match">("learn");
  const [factIdx, setFactIdx] = useState(0);
  const [roundIdx, setRoundIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function pickAnswer(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === MATCH_ROUNDS[roundIdx].correct) setScore((s) => s + 1);
  }

  function nextRound() {
    setPicked(null);
    if (roundIdx >= MATCH_ROUNDS.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setRoundIdx((r) => r + 1);
    }
  }

  if (done) {
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">🔬</motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{MATCH_ROUNDS.length}</div>
          <div className="text-slate-300 mt-2">
            {score >= MATCH_ROUNDS.length - 1 ? "Excellent! You understand both the power and problems of face AI." : score >= MATCH_ROUNDS.length / 2 ? "Good understanding of facial recognition!" : "Face AI is complex — power comes with responsibility."}
          </div>
        </div>
        <div className="bg-pink-500/20 border border-pink-500/40 rounded-2xl p-4">
          <div className="font-black text-pink-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">Facial recognition maps your face geometry into numbers. It&apos;s powerful but raises real questions about bias, consent, and privacy.</p>
        </div>
      </div>
    );
  }

  if (phase === "learn") {
    const fact = FACE_FACTS[factIdx];
    return (
      <div className="space-y-5">
        <div className="flex gap-1.5">
          {FACE_FACTS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < factIdx ? "bg-pink-500" : i === factIdx ? "bg-pink-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-pink-400 mb-1">FACE GEOMETRY</div>
          <div className="text-sm text-slate-400 font-bold mb-4">AI measures your face like a map — here&apos;s what it looks for:</div>

          <motion.div key={factIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-space-900 rounded-xl p-5 border border-slate-600 text-center mb-4">
            <div className="text-5xl mb-3">{fact.icon}</div>
            <div className="text-xl font-black text-white mb-2">{fact.part}</div>
            <div className="text-slate-300 text-sm mb-3">{fact.description}</div>
            <div className="inline-block bg-pink-500/20 border border-pink-500/30 rounded-lg px-3 py-1 text-xs font-bold text-pink-300">
              Typical: {fact.measurement}
            </div>
          </motion.div>

          {/* Face diagram */}
          <div className="flex justify-center gap-1 mb-4">
            {FACE_FACTS.map((f, i) => (
              <div key={i} className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${i <= factIdx ? "bg-pink-500/20 text-pink-300" : "bg-space-900 text-slate-600"}`}>
                {f.icon}
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              if (factIdx < FACE_FACTS.length - 1) setFactIdx((f) => f + 1);
              else setPhase("match");
            }}
            className="w-full py-4 rounded-xl font-black text-white bg-pink-500 hover:bg-pink-400 btn-press transition-colors"
          >
            {factIdx < FACE_FACTS.length - 1 ? "Next Measurement →" : "Test Your Knowledge →"}
          </button>
        </div>
      </div>
    );
  }

  const round = MATCH_ROUNDS[roundIdx];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {MATCH_ROUNDS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < roundIdx ? "bg-pink-500" : i === roundIdx ? "bg-pink-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs font-bold text-yellow-400">Score: {score}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-pink-400 mb-3">FACE RECOGNITION SCENARIOS</div>

        <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-4">
          <div className="text-sm text-slate-400 mb-2 italic">{round.scenario}</div>
          <div className="text-white font-black">{round.question}</div>
        </div>

        {picked === null ? (
          <div className="space-y-2">
            {round.options.map((opt, i) => (
              <motion.button key={i} onClick={() => pickAnswer(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-xl border border-slate-700 bg-space-900 font-bold text-white text-sm hover:border-pink-500/50 transition-colors">
                {opt}
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className={`p-4 rounded-xl text-sm font-bold ${picked === round.correct ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
              {picked === round.correct ? "Correct! " : `Answer: "${round.options[round.correct]}." `}
              <span className="font-normal text-slate-300">{round.explanation}</span>
            </div>
            <button onClick={nextRound} className="w-full py-4 rounded-xl font-black text-white bg-pink-500 hover:bg-pink-400 btn-press transition-colors">
              {roundIdx < MATCH_ROUNDS.length - 1 ? "Next Scenario →" : "See Results →"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
