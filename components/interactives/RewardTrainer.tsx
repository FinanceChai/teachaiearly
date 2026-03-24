"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const GRID = 6;
type CellType = "empty" | "treat" | "wall" | "start" | "goal";
type Pos = { r: number; c: number };

function createGrid(): CellType[][] {
  const g: CellType[][] = Array.from({ length: GRID }, () =>
    Array.from({ length: GRID }, () => "empty")
  );
  g[0][0] = "start";
  g[GRID - 1][GRID - 1] = "goal";
  return g;
}

function neighbors(p: Pos): Pos[] {
  const dirs: Pos[] = [
    { r: -1, c: 0 },
    { r: 1, c: 0 },
    { r: 0, c: -1 },
    { r: 0, c: 1 },
  ];
  return dirs
    .map((d) => ({ r: p.r + d.r, c: p.c + d.c }))
    .filter((n) => n.r >= 0 && n.r < GRID && n.c >= 0 && n.c < GRID);
}

function simulatePath(grid: CellType[][], trainingRound: number): Pos[] {
  const start: Pos = { r: 0, c: 0 };
  const goal: Pos = { r: GRID - 1, c: GRID - 1 };
  const path: Pos[] = [start];
  const visited = new Set<string>();
  visited.add(`${start.r},${start.c}`);
  let current = start;
  const smartness = trainingRound / 5;

  for (let step = 0; step < 30; step++) {
    if (current.r === goal.r && current.c === goal.c) break;
    const nbrs = neighbors(current).filter((n) => !visited.has(`${n.r},${n.c}`));
    if (nbrs.length === 0) break;

    let best = nbrs[0];
    let bestScore = -Infinity;

    for (const n of nbrs) {
      let score = 0;
      const cell = grid[n.r][n.c];
      if (cell === "treat") score += 10;
      if (cell === "wall") score -= 10;
      if (cell === "goal") score += 20;
      // Distance heuristic
      const dist = Math.abs(goal.r - n.r) + Math.abs(goal.c - n.c);
      score += (GRID * 2 - dist) * smartness;
      // Randomness decreases with training
      score += (1 - smartness) * (Math.random() * 6 - 3);

      if (score > bestScore) {
        bestScore = score;
        best = n;
      }
    }

    visited.add(`${best.r},${best.c}`);
    path.push(best);
    current = best;
  }
  return path;
}

const CELL_ICONS: Record<CellType, string> = {
  empty: "",
  treat: "🍎",
  wall: "🧱",
  start: "🚀",
  goal: "⭐",
};

export function RewardTrainer({ onComplete }: { onComplete: () => void }) {
  const [grid, setGrid] = useState<CellType[][]>(createGrid);
  const [tool, setTool] = useState<"treat" | "wall">("treat");
  const [phase, setPhase] = useState<"setup" | "training" | "done">("setup");
  const [trainingRound, setTrainingRound] = useState(0);
  const [paths, setPaths] = useState<Pos[][]>([]);
  const [currentPath, setCurrentPath] = useState<Pos[]>([]);

  function handleCellClick(r: number, c: number) {
    if (phase !== "setup") return;
    if ((r === 0 && c === 0) || (r === GRID - 1 && c === GRID - 1)) return;
    setGrid((g) => {
      const ng = g.map((row) => [...row]);
      ng[r][c] = ng[r][c] === tool ? "empty" : tool;
      return ng;
    });
  }

  function handleTrain() {
    setPhase("training");
    setTrainingRound(0);
    setPaths([]);
    runTrainingRound(0, []);
  }

  function runTrainingRound(round: number, prevPaths: Pos[][]) {
    const path = simulatePath(grid, round);
    const newPaths = [...prevPaths, path];
    setCurrentPath(path);
    setPaths(newPaths);
    setTrainingRound(round);

    if (round < 4) {
      setTimeout(() => {
        runTrainingRound(round + 1, newPaths);
      }, 1500);
    } else {
      setTimeout(() => {
        setPhase("done");
      }, 1500);
    }
  }

  function isOnPath(r: number, c: number): boolean {
    return currentPath.some((p) => p.r === r && p.c === c);
  }

  const reachedGoal = currentPath.length > 0 &&
    currentPath[currentPath.length - 1].r === GRID - 1 &&
    currentPath[currentPath.length - 1].c === GRID - 1;

  return (
    <div className="bg-space-800 rounded-xl border border-slate-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">🎯 Reward Trainer</h3>
        {phase === "training" && (
          <span className="text-sm text-red-400 font-semibold">
            Training round {trainingRound + 1}/5
          </span>
        )}
      </div>

      {phase === "setup" && (
        <div className="mb-4">
          <p className="text-slate-300 text-sm mb-3">
            Place treats (rewards) and walls (penalties) on the grid, then train the AI to find the best path from 🚀 to ⭐!
          </p>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setTool("treat")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tool === "treat"
                  ? "bg-green-600 text-white"
                  : "bg-space-900 border border-slate-700 text-slate-300"
              }`}
            >
              🍎 Place Treat
            </button>
            <button
              onClick={() => setTool("wall")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tool === "wall"
                  ? "bg-red-600 text-white"
                  : "bg-space-900 border border-slate-700 text-slate-300"
              }`}
            >
              🧱 Place Wall
            </button>
          </div>
        </div>
      )}

      {phase === "training" && (
        <div className="mb-4">
          <p className="text-slate-300 text-sm">
            Watch the AI learn! It gets smarter each round...
            {reachedGoal ? " ✅ Reached the goal!" : " 🔄 Still exploring..."}
          </p>
          <div className="w-full bg-space-900 rounded-full h-2 mt-2">
            <motion.div
              className="bg-red-500 h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((trainingRound + 1) / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-center mb-4">
        <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}>
          {Array.from({ length: GRID * GRID }, (_, i) => {
            const r = Math.floor(i / GRID);
            const c = i % GRID;
            const cell = grid[r][c];
            const onPath = phase !== "setup" && isOnPath(r, c);
            return (
              <motion.button
                key={i}
                whileHover={phase === "setup" ? { scale: 1.1 } : {}}
                onClick={() => handleCellClick(r, c)}
                className={`w-11 h-11 rounded border text-lg flex items-center justify-center transition-colors ${
                  onPath && cell !== "start" && cell !== "goal"
                    ? "bg-red-500/30 border-red-500"
                    : cell === "treat"
                    ? "bg-green-900/30 border-green-600"
                    : cell === "wall"
                    ? "bg-orange-900/30 border-orange-600"
                    : cell === "start"
                    ? "bg-blue-900/30 border-blue-500"
                    : cell === "goal"
                    ? "bg-yellow-900/30 border-yellow-500"
                    : "bg-space-900 border-slate-700"
                }`}
              >
                {onPath && cell === "empty" ? "🤖" : CELL_ICONS[cell]}
              </motion.button>
            );
          })}
        </div>
      </div>

      {phase === "setup" && (
        <button
          onClick={handleTrain}
          className="w-full px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold transition-colors"
        >
          🚀 Start Training
        </button>
      )}

      {phase === "done" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-green-400 font-bold mb-2">Training Complete!</p>
          <p className="text-slate-300 text-sm mb-4">
            The AI learned to follow rewards and avoid penalties — just like reinforcement learning in real games!
          </p>
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold transition-colors"
          >
            Complete Activity
          </button>
        </motion.div>
      )}
    </div>
  );
}
