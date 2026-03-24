"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TelephoneRound {
  original: string;
  language: string;
  chain: { lang: string; text: string; flag: string }[];
  finalBack: string;
  whatChanged: string;
  whyItHappened: string;
}

const ROUNDS: TelephoneRound[] = [
  {
    original: "It's raining cats and dogs",
    language: "English",
    chain: [
      { lang: "Spanish", text: "Está lloviendo gatos y perros", flag: "🇪🇸" },
      { lang: "Japanese", text: "猫と犬が降っている", flag: "🇯🇵" },
      { lang: "French", text: "Des chats et des chiens tombent", flag: "🇫🇷" },
    ],
    finalBack: "Cats and dogs are falling",
    whatChanged: "The idiom was lost! AI translated word-by-word instead of understanding it means 'heavy rain.'",
    whyItHappened:
      "Idioms are culture-specific. AI doesn't truly understand meaning — it matches patterns, so figurative language often gets translated literally.",
  },
  {
    original: "Break a leg!",
    language: "English",
    chain: [
      { lang: "German", text: "Brich dir ein Bein!", flag: "🇩🇪" },
      { lang: "Korean", text: "다리를 부러뜨려!", flag: "🇰🇷" },
      { lang: "Portuguese", text: "Quebre uma perna!", flag: "🇧🇷" },
    ],
    finalBack: "Break a leg! (Literally)",
    whatChanged: "The encouraging meaning was lost. In the final version it sounds like a threat, not good wishes!",
    whyItHappened:
      "Different cultures have different ways to say 'good luck.' AI doesn't know that 'break a leg' is positive — it just translates the words.",
  },
  {
    original: "The early bird catches the worm",
    language: "English",
    chain: [
      { lang: "Chinese", text: "早起的鸟儿有虫吃", flag: "🇨🇳" },
      { lang: "Arabic", text: "الطائر المبكر يأكل الدودة", flag: "🇸🇦" },
      { lang: "Italian", text: "L'uccello mattiniero mangia il verme", flag: "🇮🇹" },
    ],
    finalBack: "The morning bird eats the worm",
    whatChanged: "'Catches' became 'eats' and 'early' became 'morning.' Close, but the proverb's punchy style was lost.",
    whyItHappened:
      "Proverbs have rhythm and cultural weight. Each language has its own version — AI picks the closest words but misses the poetry.",
  },
  {
    original: "I'm feeling blue today",
    language: "English",
    chain: [
      { lang: "Thai", text: "วันนี้ฉันรู้สึกเป็นสีฟ้า", flag: "🇹🇭" },
      { lang: "Russian", text: "Сегодня я чувствую себя голубым", flag: "🇷🇺" },
      { lang: "Hindi", text: "आज मैं नीला महसूस कर रहा हूँ", flag: "🇮🇳" },
    ],
    finalBack: "Today I am feeling the color blue",
    whatChanged: "The emotion was replaced by an actual color! AI missed that 'blue' means 'sad' in English.",
    whyItHappened:
      "Words can have multiple meanings. AI often picks the most common meaning (the color) instead of the figurative one (sadness).",
  },
];

export function TranslationTelephone({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [chainStep, setChainStep] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [guesses, setGuesses] = useState<boolean[]>([]);
  const [userGuess, setUserGuess] = useState<"same" | "different" | null>(null);
  const [done, setDone] = useState(false);

  const round = ROUNDS[current];

  function advanceChain() {
    if (chainStep < round.chain.length) {
      setChainStep((s) => s + 1);
    } else {
      setShowFinal(true);
    }
  }

  function guess(pick: "same" | "different") {
    if (userGuess !== null) return;
    setUserGuess(pick);
    // The meaning always changes in our examples
    setGuesses((prev) => [...prev, pick === "different"]);
  }

  function next() {
    setChainStep(0);
    setShowFinal(false);
    setUserGuess(null);
    if (current >= ROUNDS.length - 1) {
      setDone(true);
      onComplete();
    } else {
      setCurrent((c) => c + 1);
    }
  }

  if (done) {
    const correct = guesses.filter(Boolean).length;
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="text-7xl"
        >
          🌍
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">
            {correct}/{ROUNDS.length}
          </div>
          <div className="text-slate-300 mt-2">
            {correct === ROUNDS.length
              ? "Perfect! You spotted every meaning shift."
              : correct >= ROUNDS.length - 1
              ? "Great eye for nuance! AI still struggles with these."
              : "Translation is tricky — even for AI!"}
          </div>
        </div>
        <div className="bg-purple-500/20 border border-purple-500/40 rounded-2xl p-4">
          <div className="font-black text-purple-300">Activity Complete!</div>
          <p className="text-sm text-slate-400 mt-1">
            AI translation is fast but imperfect. Idioms, humor, and cultural meaning
            often get lost because AI matches words, not understanding.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {ROUNDS.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-all ${
                i < current
                  ? guesses[i]
                    ? "bg-purple-500"
                    : "bg-red-500"
                  : i === current
                  ? "bg-purple-400"
                  : "bg-slate-700"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-400 font-bold">
          {current + 1}/{ROUNDS.length}
        </span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-purple-400 mb-1">TRANSLATION TELEPHONE</div>
        <div className="text-sm text-slate-400 font-bold mb-5">
          Watch a phrase travel through languages — does the meaning survive?
        </div>

        {/* Original */}
        <div className="bg-space-900 rounded-xl p-4 border-2 border-purple-500/40 mb-3">
          <div className="text-xs font-bold text-purple-400 mb-1">🇬🇧 ORIGINAL ({round.language})</div>
          <div className="text-white font-black text-lg">&quot;{round.original}&quot;</div>
        </div>

        {/* Chain */}
        <div className="space-y-2 mb-4">
          {round.chain.slice(0, chainStep).map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-space-900 rounded-xl p-3 border border-slate-600"
            >
              <div className="text-xs font-bold text-slate-500 mb-1">
                {step.flag} {step.lang}
              </div>
              <div className="text-white font-bold text-sm">&quot;{step.text}&quot;</div>
            </motion.div>
          ))}

          {chainStep <= round.chain.length && !showFinal && (
            <button
              onClick={advanceChain}
              className="w-full py-3 rounded-xl border-2 border-dashed border-purple-500/40 text-purple-400 font-black text-sm hover:bg-purple-500/10 transition-colors"
            >
              {chainStep < round.chain.length
                ? `Translate to ${round.chain[chainStep].flag} ${round.chain[chainStep].lang} →`
                : "Translate back to English →"}
            </button>
          )}
        </div>

        {/* Final translation back */}
        <AnimatePresence>
          {showFinal && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-amber-500/10 rounded-xl p-4 border-2 border-amber-500/40">
                <div className="text-xs font-bold text-amber-400 mb-1">
                  🇬🇧 BACK TO ENGLISH
                </div>
                <div className="text-white font-black text-lg">
                  &quot;{round.finalBack}&quot;
                </div>
              </div>

              {userGuess === null ? (
                <div className="space-y-3">
                  <div className="text-sm text-slate-400 font-bold text-center">
                    Did the meaning stay the same?
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => guess("same")}
                      className="py-4 rounded-xl border border-slate-700 bg-space-900 font-black text-white hover:border-green-500/50 hover:bg-green-500/10 transition-colors"
                    >
                      Same meaning
                    </button>
                    <button
                      onClick={() => guess("different")}
                      className="py-4 rounded-xl border border-slate-700 bg-space-900 font-black text-white hover:border-red-500/50 hover:bg-red-500/10 transition-colors"
                    >
                      Meaning changed
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div
                    className={`p-4 rounded-xl text-sm font-bold ${
                      guesses[guesses.length - 1]
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {guesses[guesses.length - 1]
                      ? "Correct! The meaning changed."
                      : "Actually, the meaning did change!"}
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 space-y-2">
                    <div className="text-xs font-black text-purple-400">WHAT CHANGED</div>
                    <div className="text-sm text-slate-300">{round.whatChanged}</div>
                    <div className="text-xs font-black text-purple-400 mt-2">WHY</div>
                    <div className="text-sm text-slate-300">{round.whyItHappened}</div>
                  </div>
                  <button
                    onClick={next}
                    className="w-full py-4 rounded-xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors"
                  >
                    {current < ROUNDS.length - 1
                      ? "Next Phrase →"
                      : "See Results →"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
