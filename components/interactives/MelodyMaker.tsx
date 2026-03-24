"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const NOTES = ["G", "F", "E", "D", "C"];
const BEATS = 8;

const NOTE_COLORS: Record<string, string> = {
  C: "bg-violet-600",
  D: "bg-violet-500",
  E: "bg-purple-500",
  F: "bg-fuchsia-500",
  G: "bg-fuchsia-600",
};

const NOTE_HOVER: Record<string, string> = {
  C: "hover:bg-violet-600/40",
  D: "hover:bg-violet-500/40",
  E: "hover:bg-purple-500/40",
  F: "hover:bg-fuchsia-500/40",
  G: "hover:bg-fuchsia-600/40",
};

const AI_PATTERNS = [
  {
    name: "Rising Scale",
    description: "AI noticed most melodies move in steps — so it suggests a rising pattern!",
    generate: (): boolean[][] => {
      const grid = Array.from({ length: 5 }, () => Array(BEATS).fill(false));
      // C D E F G rising then back down
      const seq = [4, 3, 2, 1, 0, 1, 2, 3]; // row indices for C,D,E,F,G,F,E,D
      seq.forEach((row, col) => { grid[row][col] = true; });
      return grid;
    },
  },
  {
    name: "Echo Pattern",
    description: "AI learned that repeating a short phrase sounds catchy!",
    generate: (): boolean[][] => {
      const grid = Array.from({ length: 5 }, () => Array(BEATS).fill(false));
      // Short motif repeated
      grid[4][0] = true; grid[2][1] = true; grid[3][2] = true; grid[4][3] = true;
      grid[4][4] = true; grid[2][5] = true; grid[3][6] = true; grid[4][7] = true;
      return grid;
    },
  },
  {
    name: "Harmony Fill",
    description: "AI adds notes that harmonize — notes that sound good together!",
    generate: (): boolean[][] => {
      const grid = Array.from({ length: 5 }, () => Array(BEATS).fill(false));
      // C and E together (a third), alternating with D and G
      grid[4][0] = true; grid[2][0] = true;
      grid[3][1] = true;
      grid[4][2] = true; grid[2][2] = true;
      grid[1][3] = true;
      grid[4][4] = true; grid[0][4] = true;
      grid[3][5] = true;
      grid[2][6] = true; grid[4][6] = true;
      grid[3][7] = true;
      return grid;
    },
  },
];

function createEmptyGrid(): boolean[][] {
  return Array.from({ length: 5 }, () => Array(BEATS).fill(false));
}

function countNotes(grid: boolean[][]): number {
  return grid.flat().filter(Boolean).length;
}

export function MelodyMaker({ onComplete }: { onComplete: () => void }) {
  const [grid, setGrid] = useState<boolean[][]>(createEmptyGrid);
  const [playing, setPlaying] = useState(false);
  const [playCol, setPlayCol] = useState(-1);
  const [aiUsed, setAiUsed] = useState(false);
  const [showAiMenu, setShowAiMenu] = useState(false);
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState<"compose" | "done">("compose");

  function toggleCell(row: number, col: number) {
    if (playing || done) return;
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = !next[row][col];
      return next;
    });
  }

  function applyAiPattern(patternIdx: number) {
    const pattern = AI_PATTERNS[patternIdx].generate();
    setGrid(pattern);
    setAiUsed(true);
    setShowAiMenu(false);
  }

  function clearGrid() {
    setGrid(createEmptyGrid());
  }

  function playMelody() {
    if (countNotes(grid) === 0) return;
    setPlaying(true);
    setPlayCol(0);
    let col = 0;
    const interval = setInterval(() => {
      col++;
      if (col >= BEATS) {
        clearInterval(interval);
        setPlaying(false);
        setPlayCol(-1);
        if (!done) {
          setDone(true);
          setPhase("done");
          onComplete();
        }
      } else {
        setPlayCol(col);
      }
    }, 300);
  }

  if (phase === "done") {
    return (
      <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-700 space-y-4 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <p className="text-4xl mb-2">🎶</p>
          <h3 className="text-xl font-bold text-white">Melody Created!</h3>
          <p className="text-violet-400 font-semibold mt-1">
            {countNotes(grid)} notes in your composition
          </p>
          <p className="text-slate-300 text-sm mt-2">
            {aiUsed
              ? "You collaborated with AI! Real music producers do the same — AI suggests patterns, humans make the creative choices."
              : "You composed this all on your own! AI can suggest patterns, but human creativity is what makes music special."}
          </p>
          <p className="text-xs text-slate-400 mt-3">
            Fun fact: AI music tools like Google&apos;s MusicLM can generate full songs from text descriptions,
            but they learn from patterns in human-made music!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-700 space-y-4">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold text-white">Melody Maker</h3>
        <p className="text-slate-300 text-sm">
          Click cells to place notes, or let AI suggest a pattern! Then hit Play.
        </p>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-[320px]">
          {/* Column numbers */}
          <div className="flex mb-1 ml-8">
            {Array.from({ length: BEATS }, (_, i) => (
              <div
                key={i}
                className={`flex-1 text-center text-xs font-mono ${
                  playCol === i ? "text-violet-400 font-bold" : "text-slate-500"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {NOTES.map((note, row) => (
            <div key={note} className="flex items-center gap-1 mb-1">
              <span className="w-7 text-right text-xs font-bold text-slate-400">{note}</span>
              {Array.from({ length: BEATS }, (_, col) => {
                const active = grid[row][col];
                const isPlayHead = playCol === col;
                return (
                  <motion.button
                    key={col}
                    whileTap={!playing ? { scale: 0.9 } : undefined}
                    onClick={() => toggleCell(row, col)}
                    className={`flex-1 h-10 sm:h-12 rounded-md border transition-all ${
                      active
                        ? `${NOTE_COLORS[note]} border-white/30 ${
                            isPlayHead ? "ring-2 ring-white scale-110" : ""
                          }`
                        : `bg-space-800 border-slate-700 ${NOTE_HOVER[note]} ${
                            isPlayHead ? "bg-slate-700/50" : ""
                          }`
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={playMelody}
          disabled={playing || countNotes(grid) === 0}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-lg text-sm flex items-center gap-2"
        >
          {playing ? "♫ Playing..." : "▶ Play Melody"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAiMenu(!showAiMenu)}
          disabled={playing}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 text-white font-bold rounded-lg text-sm"
        >
          🤖 AI Suggest
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearGrid}
          disabled={playing}
          className="px-4 py-2 bg-space-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium rounded-lg text-sm"
        >
          Clear
        </motion.button>
      </div>

      {/* AI Pattern Menu */}
      {showAiMenu && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-space-800 rounded-lg border border-slate-700 p-3 space-y-2"
        >
          <p className="text-xs text-slate-400 text-center">Pick an AI pattern (you can edit it after!):</p>
          {AI_PATTERNS.map((pat, i) => (
            <button
              key={i}
              onClick={() => applyAiPattern(i)}
              className="w-full text-left p-2 rounded-md border border-slate-700 hover:border-violet-400 bg-space-900 transition-all"
            >
              <p className="text-sm font-semibold text-violet-400">{pat.name}</p>
              <p className="text-xs text-slate-400">{pat.description}</p>
            </button>
          ))}
        </motion.div>
      )}

      <p className="text-xs text-slate-500 text-center">
        Notes placed: {countNotes(grid)} — {countNotes(grid) === 0 ? "Click cells or use AI Suggest to get started!" : "Hit Play when you're ready!"}
      </p>
    </div>
  );
}
