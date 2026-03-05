"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PromptResult {
  prompt: string;
  results: { label: string; description: string; style: string }[];
  lesson: string;
}

const PROMPTS: PromptResult[] = [
  {
    prompt: "A cat sitting on a rainbow",
    results: [
      { label: "Result A", description: "A realistic tabby cat perched on a colorful arc in a blue sky", style: "Photorealistic" },
      { label: "Result B", description: "A cartoon kitten sliding down a neon rainbow with sparkles", style: "Cartoon" },
      { label: "Result C", description: "An oil painting of a majestic cat with a rainbow halo", style: "Oil painting" },
    ],
    lesson: "Same prompt, three totally different images! AI introduces randomness each time, so you never get the exact same result twice.",
  },
  {
    prompt: "A futuristic city at sunset",
    results: [
      { label: "Result A", description: "Gleaming skyscrapers with flying cars, warm orange sky", style: "Sci-fi concept art" },
      { label: "Result B", description: "Overgrown ruins with neon signs, pink and purple sunset", style: "Cyberpunk" },
      { label: "Result C", description: "Minimalist geometric buildings with a simple gradient sky", style: "Flat illustration" },
    ],
    lesson: "AI learned different visual styles from millions of images. 'Futuristic city' means something different in each style — the prompt is just a starting point.",
  },
  {
    prompt: "A friendly robot helping a child",
    results: [
      { label: "Result A", description: "A shiny metallic robot handing a book to a smiling kid", style: "3D render" },
      { label: "Result B", description: "A soft round robot with big eyes high-fiving a child", style: "Children's book" },
      { label: "Result C", description: "A humanoid android tutoring a student at a desk", style: "Realistic" },
    ],
    lesson: "Notice how 'friendly' looks different each time? AI doesn't truly understand friendliness — it associates visual patterns (round shapes, smiles, warm colors) with the concept.",
  },
];

const STEPS = [
  { name: "Text Encoding", icon: "📝", description: "Your words get converted into numbers (embeddings) that represent meaning." },
  { name: "Noise Generation", icon: "📡", description: "AI starts with pure random noise — like TV static." },
  { name: "Denoising", icon: "🔄", description: "Step by step, AI removes noise while being guided by your text. Like sculpting from marble." },
  { name: "Final Image", icon: "🖼️", description: "After many rounds of denoising, a clear image emerges from the noise." },
];

const QUIZ = [
  {
    question: "Why does the same prompt produce different images each time?",
    options: ["The AI is broken", "It starts with different random noise each time", "It uses a different model", "The prompt changes slightly"],
    correct: 1,
    explanation: "AI starts from random noise and removes it step by step. Different starting noise = different final image, even with the exact same prompt!",
  },
  {
    question: "How does AI know what a 'cat' looks like?",
    options: ["Someone drew every possible cat", "It learned patterns from millions of cat photos", "It has a built-in cat template", "It looks up cats on the internet each time"],
    correct: 1,
    explanation: "During training, AI saw millions of images paired with text descriptions. It learned the statistical patterns of what 'cat' looks like across all those examples.",
  },
  {
    question: "What is the AI actually doing when generating an image?",
    options: ["Downloading images from the internet", "Gradually removing noise guided by your text", "Taking a photo with a virtual camera", "Cutting and pasting from existing images"],
    correct: 1,
    explanation: "Text-to-image AI works by starting with noise and gradually denoising it, using your text prompt as a guide. It's like sculpting — removing what doesn't belong.",
  },
];

export function DreamMachine({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"explore" | "steps" | "quiz">("explore");
  const [promptIdx, setPromptIdx] = useState(0);
  const [showLesson, setShowLesson] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
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
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          {score >= QUIZ.length - 1 ? "🌈" : "🎨"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{QUIZ.length}</div>
          <div className="text-slate-300 mt-2">
            {score === QUIZ.length ? "Perfect! You understand how AI dreams up images." : score >= 2 ? "Great grasp of image generation!" : "Image generation is wild — now you know the basics!"}
          </div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/40 rounded-2xl p-4">
          <div className="font-black text-blue-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">AI turns text into images by starting from noise and sculpting it into a picture, guided by patterns learned from millions of image-text pairs.</p>
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
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < quizIdx ? "bg-blue-500" : i === quizIdx ? "bg-blue-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-blue-400 mb-1">IMAGE GENERATION QUIZ</div>
          <div className="text-white font-black text-lg mb-4">{q.question}</div>
          {picked === null ? (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <motion.button key={i} onClick={() => pickAnswer(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-xl border border-slate-700 bg-space-900 font-bold text-white text-sm hover:border-blue-500/50 transition-colors">
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
              <button onClick={nextQuiz} className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors">
                {quizIdx < QUIZ.length - 1 ? "Next Question" : "See Results"} &rarr;
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (phase === "steps") {
    const step = STEPS[stepIdx];
    return (
      <div className="space-y-5">
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < stepIdx ? "bg-blue-500" : i === stepIdx ? "bg-blue-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
          <div className="text-xs font-black text-blue-400 mb-1">HOW IT WORKS</div>
          <div className="text-sm text-slate-400 font-bold mb-4">The 4 steps of AI image generation:</div>

          <motion.div key={stepIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-space-900 rounded-xl p-5 border border-slate-600 text-center mb-4">
            <div className="text-5xl mb-3">{step.icon}</div>
            <div className="text-xs text-blue-400 font-black mb-1">STEP {stepIdx + 1}</div>
            <div className="text-xl font-black text-white mb-2">{step.name}</div>
            <div className="text-slate-300 text-sm">{step.description}</div>
          </motion.div>

          <div className="flex justify-center gap-2 mb-4">
            {STEPS.map((s, i) => (
              <div key={i} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${i <= stepIdx ? "bg-blue-500/20 text-blue-300" : "bg-space-900 text-slate-600"}`}>
                {s.icon}
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              if (stepIdx < STEPS.length - 1) setStepIdx((s) => s + 1);
              else setPhase("quiz");
            }}
            className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors"
          >
            {stepIdx < STEPS.length - 1 ? "Next Step" : "Test Your Knowledge"} &rarr;
          </button>
        </div>
      </div>
    );
  }

  // Explore phase
  const prompt = PROMPTS[promptIdx];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {PROMPTS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < promptIdx ? "bg-blue-500" : i === promptIdx ? "bg-blue-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs text-slate-400 font-bold">Prompt {promptIdx + 1}/{PROMPTS.length}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-blue-400 mb-1">DREAM MACHINE</div>
        <div className="text-sm text-slate-400 font-bold mb-3">Same prompt, different results every time:</div>

        <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-4">
          <div className="text-xs text-blue-400 font-black mb-1">PROMPT</div>
          <div className="text-white font-black text-lg">&quot;{prompt.prompt}&quot;</div>
        </div>

        <div className="space-y-3 mb-4">
          {prompt.results.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="bg-space-900 rounded-xl p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-black text-sm">{r.label}</span>
                <span className="text-xs font-bold text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full">{r.style}</span>
              </div>
              <div className="text-slate-400 text-sm">{r.description}</div>
            </motion.div>
          ))}
        </div>

        {!showLesson ? (
          <button onClick={() => setShowLesson(true)} className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors">
            Why Are They Different? &rarr;
          </button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-sm text-slate-300">
              <strong className="text-blue-300">Key Insight: </strong>{prompt.lesson}
            </div>
            <button
              onClick={() => {
                setShowLesson(false);
                if (promptIdx < PROMPTS.length - 1) setPromptIdx((p) => p + 1);
                else setPhase("steps");
              }}
              className="w-full py-4 rounded-xl font-black text-white bg-blue-500 hover:bg-blue-400 btn-press transition-colors"
            >
              {promptIdx < PROMPTS.length - 1 ? "Next Prompt" : "How It Works"} &rarr;
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
