"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CLIPS = [
  {
    id: 1,
    label: "Voice Clip #1",
    emoji: "🎤",
    description: "A warm, friendly voice reads a bedtime story. There are tiny pauses between sentences, and the voice gets softer at the end of each paragraph. Occasionally you hear a small breath between phrases.",
    isAI: false,
    reveal: "Real Human! Those natural breaths and soft pauses are hard for AI to get just right.",
    funFact: "Human voices have micro-variations in pitch called \"jitter\" — AI voices are often too smooth!",
  },
  {
    id: 2,
    label: "Voice Clip #2",
    emoji: "🎙️",
    description: "A cheerful voice reads the news headlines. Every sentence has perfectly even pacing. The tone goes up at exactly the same angle for each question. Words are crystal clear with zero background noise.",
    isAI: true,
    reveal: "AI Generated! That perfectly even pacing and zero noise are classic AI tells.",
    funFact: "AI text-to-speech models like ElevenLabs can now clone a voice from just 30 seconds of audio!",
  },
  {
    id: 3,
    label: "Voice Clip #3",
    emoji: "🎧",
    description: "Someone is telling a joke and laughing. Mid-sentence, they stumble on a word, say \"um\", then restart. The laugh sounds genuinely surprised, with a small snort at the end.",
    isAI: false,
    reveal: "Real Human! That stumble, \"um\", and surprise snort-laugh are very hard for AI to fake naturally.",
    funFact: "AI can generate laughter, but it usually sounds \"planned\" — real laughter is unpredictable and messy!",
  },
  {
    id: 4,
    label: "Voice Clip #4",
    emoji: "🔊",
    description: "A voice with a British accent reads a Wikipedia article about dolphins. The pronunciation is flawless. Every word is crisp and clear. The emotional tone stays exactly the same the entire time — calm and informative.",
    isAI: true,
    reveal: "AI Generated! That flat emotional tone and flawless pronunciation across a long passage is an AI giveaway.",
    funFact: "Modern AI voices can mimic accents, but they struggle with the subtle emotional shifts humans make unconsciously.",
  },
  {
    id: 5,
    label: "Voice Clip #5",
    emoji: "🎵",
    description: "A person sings Happy Birthday. The pitch wobbles slightly on the high notes. They speed up a bit during \"dear [name]\" and slow down dramatically for the last line, adding a playful growl on \"to you!\"",
    isAI: false,
    reveal: "Real Human! Those pitch wobbles and the playful growl show real personality — AI singing is getting better but still struggles with these quirks.",
    funFact: "AI singing voices exist but they usually sound too \"perfect\" — humans connect with imperfection in music!",
  },
];

export function VoiceLineup({ onComplete }: { onComplete: () => void }) {
  const [votes, setVotes] = useState<Record<number, "human" | "ai">>({});
  const [currentClip, setCurrentClip] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  function castVote(vote: "human" | "ai") {
    if (votes[currentClip] !== undefined) return;
    setVotes((prev) => ({ ...prev, [currentClip]: vote }));
  }

  function nextClip() {
    if (currentClip < CLIPS.length - 1) {
      setCurrentClip((i) => i + 1);
    } else {
      setRevealed(true);
    }
  }

  function finish() {
    setDone(true);
    onComplete();
  }

  const totalVoted = Object.keys(votes).length;
  const score = CLIPS.filter((clip, i) => {
    const v = votes[i];
    if (!v) return false;
    return (v === "ai" && clip.isAI) || (v === "human" && !clip.isAI);
  }).length;

  // --- FINAL RESULTS ---
  if (done) {
    return (
      <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-4 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <p className="text-4xl mb-2">🕵️</p>
          <h3 className="text-xl font-bold text-slate-900">Voice Detective Complete!</h3>
          <p className="text-violet-400 font-bold text-lg mt-1">
            Score: {score} / {CLIPS.length}
          </p>
          <p className="text-slate-600 text-sm mt-2">
            {score === CLIPS.length
              ? "Perfect! You have an incredible ear — you can tell real from AI every time!"
              : score >= 3
              ? "Great job! You've got a good sense for what makes a voice sound human."
              : "AI voices are getting really convincing! Don't worry — even experts get tricked sometimes."}
          </p>
          <div className="mt-4 p-3 bg-space-800 rounded-lg border border-slate-200 text-left">
            <p className="text-violet-400 text-sm font-bold mb-1">Key Takeaways:</p>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Human voices have natural imperfections — breaths, stumbles, pitch wobbles</li>
              <li>• AI voices tend to be too perfect and evenly paced</li>
              <li>• AI is getting better fast — in a few years, it may be impossible to tell!</li>
              <li>• This is why voice verification and digital trust matter</li>
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- REVEAL ALL ---
  if (revealed) {
    return (
      <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-4">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">Results Revealed!</h3>
          <p className="text-violet-400 font-bold">
            You got {score} out of {CLIPS.length} correct!
          </p>
        </div>

        <div className="space-y-3">
          {CLIPS.map((clip, i) => {
            const userVote = votes[i];
            const correct =
              userVote && ((userVote === "ai" && clip.isAI) || (userVote === "human" && !clip.isAI));
            return (
              <motion.div
                key={clip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-3 rounded-lg border-2 ${
                  correct ? "border-green-400/50 bg-green-500/10" : "border-red-400/50 bg-red-500/10"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg">{correct ? "✅" : "❌"}</span>
                  <div className="flex-1">
                    <p className="text-slate-900 text-sm font-semibold">{clip.label}</p>
                    <p className="text-xs text-slate-600 mt-1">{clip.reveal}</p>
                    <p className="text-xs text-violet-400 mt-1 italic">{clip.funFact}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={finish}
            className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-slate-900 font-bold rounded-lg text-sm"
          >
            Complete!
          </button>
        </div>
      </div>
    );
  }

  // --- VOTING PHASE ---
  const clip = CLIPS[currentClip];
  const hasVoted = votes[currentClip] !== undefined;

  return (
    <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-5">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold text-slate-900">Voice Lineup</h3>
        <p className="text-slate-600 text-sm">
          Read the voice description — is it a real human or AI generated?
        </p>
        <p className="text-xs text-slate-400">
          Clip {currentClip + 1} of {CLIPS.length}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {CLIPS.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentClip
                ? "bg-violet-400 scale-125"
                : votes[i] !== undefined
                ? "bg-violet-600"
                : "bg-slate-700"
            }`}
          />
        ))}
      </div>

      {/* Clip card */}
      <motion.div
        key={currentClip}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-space-800 rounded-xl border border-slate-200 p-4 space-y-3"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{clip.emoji}</span>
          <span className="text-slate-900 font-bold">{clip.label}</span>
        </div>

        <div className="bg-space-900 rounded-lg p-3 border border-slate-200">
          <p className="text-sm text-slate-600 leading-relaxed">{clip.description}</p>
        </div>

        {/* Vote buttons */}
        {!hasVoted ? (
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => castVote("human")}
              className="flex-1 py-3 bg-space-900 border-2 border-slate-200 hover:border-green-400 rounded-lg text-slate-900 font-bold text-sm transition-all"
            >
              🧑 Real Human
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => castVote("ai")}
              className="flex-1 py-3 bg-space-900 border-2 border-slate-200 hover:border-violet-400 rounded-lg text-slate-900 font-bold text-sm transition-all"
            >
              🤖 AI Generated
            </motion.button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-center font-semibold text-violet-400">
              You voted: {votes[currentClip] === "human" ? "🧑 Real Human" : "🤖 AI Generated"}
            </p>
            <p className="text-xs text-slate-400 text-center italic">
              Answer will be revealed at the end!
            </p>
            <div className="text-center">
              <button
                onClick={nextClip}
                className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-slate-900 font-bold rounded-lg text-sm"
              >
                {currentClip < CLIPS.length - 1 ? "Next Clip" : "Reveal Answers!"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
