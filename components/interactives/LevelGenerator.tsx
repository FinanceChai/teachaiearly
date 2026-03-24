"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface LevelConfig {
  difficulty: number;
  size: number;
  enemies: number;
}

interface GeneratedLevel {
  config: LevelConfig;
  grid: string[][];
  rating: number | null;
}

const SIZE_LABELS = ["Small (6x6)", "Medium (8x8)", "Large (10x10)"];
const SIZE_VALUES = [6, 8, 10];
const ENEMY_LABELS = ["Few", "Some", "Many"];
const DIFFICULTY_LABELS = ["Easy", "Medium", "Hard", "Expert", "Nightmare"];

function generateLevel(config: LevelConfig): string[][] {
  const dim = SIZE_VALUES[config.size];
  const grid: string[][] = Array.from({ length: dim }, () =>
    Array.from({ length: dim }, () => "  ")
  );

  // Borders
  for (let r = 0; r < dim; r++) {
    for (let c = 0; c < dim; c++) {
      if (r === 0 || r === dim - 1 || c === 0 || c === dim - 1) {
        grid[r][c] = "🧱";
      }
    }
  }

  // Start and exit
  grid[1][1] = "🚀";
  grid[dim - 2][dim - 2] = "🚪";

  // Treasure
  const treasureCount = config.difficulty;
  let placed = 0;
  while (placed < treasureCount) {
    const r = 1 + Math.floor(Math.random() * (dim - 2));
    const c = 1 + Math.floor(Math.random() * (dim - 2));
    if (grid[r][c] === "  ") {
      grid[r][c] = "💎";
      placed++;
    }
  }

  // Internal walls based on difficulty
  const wallCount = Math.floor(dim * config.difficulty * 0.5);
  placed = 0;
  let attempts = 0;
  while (placed < wallCount && attempts < 200) {
    const r = 1 + Math.floor(Math.random() * (dim - 2));
    const c = 1 + Math.floor(Math.random() * (dim - 2));
    if (grid[r][c] === "  ") {
      grid[r][c] = "🧱";
      placed++;
    }
    attempts++;
  }

  // Enemies
  const enemyCounts = [2, 4, 7];
  const numEnemies = enemyCounts[config.enemies] + config.difficulty - 1;
  const enemyTypes = ["👾", "🐉", "💀", "🦇", "🕷️"];
  placed = 0;
  attempts = 0;
  while (placed < numEnemies && attempts < 200) {
    const r = 1 + Math.floor(Math.random() * (dim - 2));
    const c = 1 + Math.floor(Math.random() * (dim - 2));
    if (grid[r][c] === "  ") {
      grid[r][c] = enemyTypes[Math.floor(Math.random() * Math.min(enemyTypes.length, config.difficulty + 1))];
      placed++;
    }
    attempts++;
  }

  // Health pickups on higher difficulty
  if (config.difficulty >= 3) {
    placed = 0;
    attempts = 0;
    while (placed < 2 && attempts < 100) {
      const r = 1 + Math.floor(Math.random() * (dim - 2));
      const c = 1 + Math.floor(Math.random() * (dim - 2));
      if (grid[r][c] === "  ") {
        grid[r][c] = "❤️";
        placed++;
      }
      attempts++;
    }
  }

  return grid;
}

export function LevelGenerator({ onComplete }: { onComplete: () => void }) {
  const [difficulty, setDifficulty] = useState(1);
  const [size, setSize] = useState(1);
  const [enemies, setEnemies] = useState(1);
  const [levels, setLevels] = useState<GeneratedLevel[]>([]);
  const [viewing, setViewing] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  function handleGenerate() {
    const config: LevelConfig = { difficulty, size, enemies };
    const grid = generateLevel(config);
    const newLevel: GeneratedLevel = { config, grid, rating: null };
    setLevels((l) => [...l, newLevel]);
    setViewing(levels.length);
  }

  function handleRate(levelIdx: number, rating: number) {
    setLevels((l) =>
      l.map((lv, i) => (i === levelIdx ? { ...lv, rating } : lv))
    );
  }

  const allRated = levels.length >= 3 && levels.every((l) => l.rating !== null);
  const currentLevel = viewing !== null ? levels[viewing] : null;

  if (finished) {
    const avgRating = levels.reduce((s, l) => s + (l.rating || 0), 0) / levels.length;
    return (
      <div className="bg-space-800 rounded-xl border border-slate-700 p-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="text-4xl mb-4">🎮</div>
          <h3 className="text-2xl font-bold text-white mb-2">Level Designer Complete!</h3>
          <p className="text-slate-300 mb-2">
            You generated {levels.length} levels with an average rating of {avgRating.toFixed(1)}/5.
          </p>
          <p className="text-slate-300 text-sm mb-4">
            Real games use AI like this to create procedurally generated levels — adjusting parameters to create unique experiences every time!
          </p>
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold transition-colors"
          >
            Complete Activity
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-space-800 rounded-xl border border-slate-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">🏗️ Level Generator</h3>
        <span className="text-sm text-slate-300">
          {levels.length}/3 levels generated
        </span>
      </div>

      <p className="text-slate-300 text-sm mb-4">
        Adjust the sliders and generate AI-powered game levels! Create at least 3 and rate each one.
      </p>

      {/* Controls */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-white text-sm font-semibold flex justify-between">
            <span>Difficulty</span>
            <span className="text-red-400">{DIFFICULTY_LABELS[difficulty - 1]}</span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="w-full accent-red-500"
          />
        </div>
        <div>
          <label className="text-white text-sm font-semibold flex justify-between">
            <span>Size</span>
            <span className="text-red-400">{SIZE_LABELS[size]}</span>
          </label>
          <input
            type="range"
            min={0}
            max={2}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-red-500"
          />
        </div>
        <div>
          <label className="text-white text-sm font-semibold flex justify-between">
            <span>Enemies</span>
            <span className="text-red-400">{ENEMY_LABELS[enemies]}</span>
          </label>
          <input
            type="range"
            min={0}
            max={2}
            value={enemies}
            onChange={(e) => setEnemies(Number(e.target.value))}
            className="w-full accent-red-500"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold transition-colors mb-4"
      >
        ⚡ Generate Level
      </button>

      {/* Level tabs */}
      {levels.length > 0 && (
        <div className="flex gap-2 mb-4">
          {levels.map((_, i) => (
            <button
              key={i}
              onClick={() => setViewing(i)}
              className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                viewing === i
                  ? "bg-red-500 text-white"
                  : "bg-space-900 border border-slate-700 text-slate-300"
              }`}
            >
              Level {i + 1} {levels[i].rating ? `(${"⭐".repeat(levels[i].rating!)})` : ""}
            </button>
          ))}
        </div>
      )}

      {/* Level display */}
      {currentLevel && (
        <motion.div
          key={viewing}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-space-900 rounded-lg p-3 mb-3 overflow-x-auto">
            <div className="inline-block">
              {currentLevel.grid.map((row, r) => (
                <div key={r} className="flex">
                  {row.map((cell, c) => (
                    <span
                      key={c}
                      className="w-8 h-8 flex items-center justify-center text-sm"
                      title={cell.trim() || "empty"}
                    >
                      {cell.trim() || "·"}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-slate-300 text-sm">Rate this level:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRate(viewing!, star)}
                className={`text-xl transition-transform hover:scale-125 ${
                  (currentLevel.rating || 0) >= star ? "opacity-100" : "opacity-30"
                }`}
              >
                ⭐
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-4">
            <span>🚀 Start</span>
            <span>🚪 Exit</span>
            <span>💎 Treasure</span>
            <span>👾 Enemy</span>
            <span>🧱 Wall</span>
            <span>❤️ Health</span>
          </div>
        </motion.div>
      )}

      {allRated && (
        <button
          onClick={() => setFinished(true)}
          className="w-full px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-colors"
        >
          Finish & Review
        </button>
      )}
    </div>
  );
}
