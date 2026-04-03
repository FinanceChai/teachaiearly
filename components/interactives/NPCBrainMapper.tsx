"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Pos = { r: number; c: number };

interface Round {
  name: string;
  npcBehavior: "chase" | "patrol" | "flee";
  description: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const ROUNDS: Round[] = [
  {
    name: "Round 1",
    npcBehavior: "chase",
    description: "Watch how the enemy NPC moves when you move. What rule is it following?",
    options: ["Chase the player", "Patrol back and forth", "Run away from player", "Move randomly"],
    correctIndex: 0,
    explanation: "The NPC was chasing you! It always moved closer to your position each turn.",
  },
  {
    name: "Round 2",
    npcBehavior: "patrol",
    description: "This NPC has a different behavior. Observe carefully!",
    options: ["Chase the player", "Patrol back and forth", "Run away from player", "Stand still"],
    correctIndex: 1,
    explanation: "The NPC was patrolling! It moved back and forth along a set path regardless of where you went.",
  },
  {
    name: "Round 3",
    npcBehavior: "flee",
    description: "One more NPC to figure out. What is this one doing?",
    options: ["Chase the player", "Patrol back and forth", "Run away from player", "Copy the player"],
    correctIndex: 2,
    explanation: "The NPC was fleeing! It always tried to move away from your position.",
  },
];

const GRID = 5;

function clamp(v: number) {
  return Math.max(0, Math.min(GRID - 1, v));
}

function moveNPC(npc: Pos, player: Pos, behavior: Round["npcBehavior"], moveCount: number): Pos {
  if (behavior === "chase") {
    let nr = npc.r;
    let nc = npc.c;
    if (Math.abs(player.r - npc.r) >= Math.abs(player.c - npc.c)) {
      nr = clamp(npc.r + (player.r > npc.r ? 1 : player.r < npc.r ? -1 : 0));
    } else {
      nc = clamp(npc.c + (player.c > npc.c ? 1 : player.c < npc.c ? -1 : 0));
    }
    return { r: nr, c: nc };
  }
  if (behavior === "patrol") {
    const patrolCols = [1, 2, 3];
    const idx = moveCount % (patrolCols.length * 2 - 2);
    const forward = idx < patrolCols.length;
    const colIdx = forward ? idx : patrolCols.length * 2 - 2 - idx;
    return { r: npc.r, c: patrolCols[colIdx] ?? npc.c };
  }
  // flee
  let nr = npc.r;
  let nc = npc.c;
  if (Math.abs(player.r - npc.r) >= Math.abs(player.c - npc.c)) {
    nr = clamp(npc.r + (player.r > npc.r ? -1 : player.r < npc.r ? 1 : 0));
  } else {
    nc = clamp(npc.c + (player.c > npc.c ? -1 : player.c < npc.c ? 1 : 0));
  }
  return { r: nr, c: nc };
}

export function NPCBrainMapper({ onComplete }: { onComplete: () => void }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [player, setPlayer] = useState<Pos>({ r: 4, c: 0 });
  const [npc, setNpc] = useState<Pos>({ r: 0, c: 4 });
  const [moveCount, setMoveCount] = useState(0);
  const [phase, setPhase] = useState<"observe" | "guess" | "result">("observe");
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const round = ROUNDS[roundIdx];

  function handleCellClick(r: number, c: number) {
    if (phase !== "observe") return;
    const dr = r - player.r;
    const dc = c - player.c;
    if (Math.abs(dr) + Math.abs(dc) !== 1) return;
    const newPlayer = { r, c };
    const newNpc = moveNPC(npc, newPlayer, round.npcBehavior, moveCount);
    setPlayer(newPlayer);
    setNpc(newNpc);
    setMoveCount((m) => m + 1);
    if (moveCount + 1 >= 5) {
      setPhase("guess");
    }
  }

  function handleGuess(idx: number) {
    setSelected(idx);
    if (idx === round.correctIndex) setScore((s) => s + 1);
    setPhase("result");
  }

  function handleNext() {
    if (roundIdx + 1 >= ROUNDS.length) {
      setFinished(true);
      return;
    }
    setRoundIdx((i) => i + 1);
    setPlayer({ r: 4, c: 0 });
    setNpc({ r: 0, c: 4 });
    setMoveCount(0);
    setPhase("observe");
    setSelected(null);
  }

  if (finished) {
    return (
      <div className="bg-space-800 rounded-xl border border-slate-200 p-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">NPC Brain Mapper Complete!</h3>
          <p className="text-slate-600 mb-4">
            You scored {score}/{ROUNDS.length} — you figured out how the NPCs think!
          </p>
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-red-500 hover:bg-red-400 text-slate-900 rounded-lg font-bold transition-colors"
          >
            Complete Activity
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-space-800 rounded-xl border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-900">🧠 NPC Brain Mapper</h3>
        <span className="text-sm text-slate-600">
          Round {roundIdx + 1}/{ROUNDS.length} | Score: {score}
        </span>
      </div>

      <p className="text-slate-600 text-sm mb-4">{round.description}</p>

      {phase === "observe" && (
        <p className="text-red-400 text-xs mb-2">
          Click adjacent cells to move (🟢 = you). Moves left: {5 - moveCount}
        </p>
      )}

      <div className="flex justify-center mb-6">
        <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}>
          {Array.from({ length: GRID * GRID }, (_, i) => {
            const r = Math.floor(i / GRID);
            const c = i % GRID;
            const isPlayer = player.r === r && player.c === c;
            const isNpc = npc.r === r && npc.c === c;
            return (
              <motion.button
                key={i}
                whileHover={phase === "observe" ? { scale: 1.1 } : {}}
                onClick={() => handleCellClick(r, c)}
                className={`w-12 h-12 rounded border text-xl flex items-center justify-center transition-colors ${
                  isPlayer
                    ? "bg-green-700 border-green-500"
                    : isNpc
                    ? "bg-red-700 border-red-500"
                    : "bg-space-900 border-slate-200 hover:border-slate-500"
                }`}
              >
                {isPlayer && isNpc ? "💥" : isPlayer ? "🟢" : isNpc ? "👾" : ""}
              </motion.button>
            );
          })}
        </div>
      </div>

      {phase === "guess" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-slate-900 font-semibold mb-3">What rule was the NPC following?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {round.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleGuess(i)}
                className="px-4 py-3 bg-space-900 border border-slate-200 hover:border-red-500 text-slate-900 rounded-lg text-sm transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {phase === "result" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-lg font-bold mb-2 ${selected === round.correctIndex ? "text-green-400" : "text-red-400"}`}>
            {selected === round.correctIndex ? "✅ Correct!" : "❌ Not quite!"}
          </p>
          <p className="text-slate-600 text-sm mb-4">{round.explanation}</p>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-red-500 hover:bg-red-400 text-slate-900 rounded-lg font-bold transition-colors"
          >
            {roundIdx + 1 >= ROUNDS.length ? "See Results" : "Next Round"}
          </button>
        </motion.div>
      )}
    </div>
  );
}
