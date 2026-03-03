"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Scenario pool — 40 items, 3 difficulty tiers
// ---------------------------------------------------------------------------
type Difficulty = "easy" | "medium" | "hard";
type ScenarioItem = { text: string; isAI: boolean; difficulty: Difficulty; category: string };

const SCENARIO_POOL: ScenarioItem[] = [
  // EASY
  { text: "Netflix recommends your next binge show", isAI: true, difficulty: "easy", category: "Streaming" },
  { text: "A calculator adds up your grocery bill", isAI: false, difficulty: "easy", category: "Math" },
  { text: "Your phone finishes your sentence as you type", isAI: true, difficulty: "easy", category: "Phones" },
  { text: "A traffic light switches every 90 seconds", isAI: false, difficulty: "easy", category: "Traffic" },
  { text: "Spotify creates a playlist just for your mood", isAI: true, difficulty: "easy", category: "Music" },
  { text: "A smoke alarm beeps when it detects smoke", isAI: false, difficulty: "easy", category: "Safety" },
  { text: "Siri answers your spoken questions out loud", isAI: true, difficulty: "easy", category: "Phones" },
  { text: "A basic thermostat stays at the temp you set", isAI: false, difficulty: "easy", category: "Home" },
  { text: "Google Photos finds all your dog pictures automatically", isAI: true, difficulty: "easy", category: "Photos" },
  { text: "A vending machine counts your change", isAI: false, difficulty: "easy", category: "Machines" },
  { text: "TikTok learns which videos keep you watching", isAI: true, difficulty: "easy", category: "Social" },
  { text: "A digital clock displays the correct time", isAI: false, difficulty: "easy", category: "Clocks" },
  // MEDIUM
  { text: "A chess app that always plays the same opening move", isAI: false, difficulty: "medium", category: "Games" },
  { text: "A fitness app adjusts your workout based on recent performance", isAI: true, difficulty: "medium", category: "Fitness" },
  { text: "A spam filter that gets smarter when you mark emails as junk", isAI: true, difficulty: "medium", category: "Email" },
  { text: "An alarm clock that rings at exactly 7am every day", isAI: false, difficulty: "medium", category: "Clocks" },
  { text: "A navigation app that learns your regular routes over time", isAI: true, difficulty: "medium", category: "Maps" },
  { text: "A security camera that records whenever motion is detected", isAI: false, difficulty: "medium", category: "Security" },
  { text: "A robot vacuum that maps your home and avoids obstacles", isAI: true, difficulty: "medium", category: "Robots" },
  { text: "A password manager that saves your passwords exactly as entered", isAI: false, difficulty: "medium", category: "Apps" },
  { text: "A translation app that improves from millions of user corrections", isAI: true, difficulty: "medium", category: "Language" },
  { text: "A price calculator that applies the discount you programmed", isAI: false, difficulty: "medium", category: "Shopping" },
  { text: "YouTube decides which video plays automatically after yours ends", isAI: true, difficulty: "medium", category: "Streaming" },
  { text: "A step counter that adds 1 every time you take a step", isAI: false, difficulty: "medium", category: "Fitness" },
  // HARD
  { text: "A photo app that auto-adjusts brightness and contrast using rules", isAI: false, difficulty: "hard", category: "Photos" },
  { text: "A social media feed that picks what to show you", isAI: true, difficulty: "hard", category: "Social" },
  { text: "A music player that crossfades smoothly between songs", isAI: false, difficulty: "hard", category: "Music" },
  { text: "A banking app that notices when your spending seems unusual", isAI: true, difficulty: "hard", category: "Finance" },
  { text: "A modern search bar that guesses what you are searching for", isAI: true, difficulty: "hard", category: "Search" },
  { text: "A phone screen that dims when the light sensor says it is bright", isAI: false, difficulty: "hard", category: "Phones" },
  { text: "A game enemy that always follows the same attack script", isAI: false, difficulty: "hard", category: "Games" },
  { text: "A game enemy that learns your strategy and counters it", isAI: true, difficulty: "hard", category: "Games" },
  { text: "An email app that writes reply suggestions for you", isAI: true, difficulty: "hard", category: "Email" },
  { text: "An app that converts your Word document to a PDF", isAI: false, difficulty: "hard", category: "Apps" },
  { text: "A face-unlock system that still works after you grow a beard", isAI: true, difficulty: "hard", category: "Security" },
  { text: "A fingerprint scanner that checks your print against a stored template", isAI: false, difficulty: "hard", category: "Security" },
  { text: "A self-driving car navigating unexpected road closures", isAI: true, difficulty: "hard", category: "Cars" },
  { text: "A GPS that says turn left after it detects you missed a turn", isAI: false, difficulty: "hard", category: "Maps" },
  { text: "A content filter that learns new types of harmful content", isAI: true, difficulty: "hard", category: "Safety" },
  { text: "A video player that adjusts quality when your internet slows down", isAI: false, difficulty: "hard", category: "Streaming" },
];

// ---------------------------------------------------------------------------
// Round 2 template data
// ---------------------------------------------------------------------------
const R2_SUBJECTS = [
  { id: "app", label: "A smart phone app", emoji: "📱" },
  { id: "robot", label: "A factory robot arm", emoji: "🦾" },
  { id: "stream", label: "A streaming service", emoji: "📺" },
  { id: "car", label: "A self-driving vehicle", emoji: "🚗" },
  { id: "game", label: "A video game character", emoji: "🎮" },
  { id: "scanner", label: "A medical scanner", emoji: "🏥" },
  { id: "home", label: "A smart home gadget", emoji: "🏠" },
  { id: "filter", label: "An online spam filter", emoji: "📧" },
];
const R2_ACTIONS = [
  { id: "learn", label: "learns from your behaviour to predict what you want next", aiScore: 3 },
  { id: "rules", label: "follows a fixed set of rules a programmer wrote", aiScore: -3 },
  { id: "patterns", label: "finds patterns across millions of training examples", aiScore: 3 },
  { id: "measure", label: "precisely measures and counts things every second", aiScore: -2 },
  { id: "improve", label: "gets noticeably better the more data it sees", aiScore: 3 },
  { id: "convert", label: "converts one type of input into a fixed output", aiScore: -2 },
  { id: "saves", label: "saves your settings exactly the way you set them", aiScore: -2 },
  { id: "adapt", label: "handles brand new situations it was never trained for", aiScore: 2 },
];
const R2_DETAILS = [
  { id: "new", label: "— even for things it has never seen before", aiScore: 2 },
  { id: "limit", label: "— but only within the rules someone programmed", aiScore: -2 },
  { id: "users", label: "— getting smarter with every new user who joins", aiScore: 2 },
  { id: "first", label: "— as long as someone set it up correctly first", aiScore: -2 },
  { id: "data", label: "— by connecting patterns across billions of examples", aiScore: 2 },
  { id: "exact", label: "— doing exactly the same thing every single time", aiScore: -3 },
];

function hostGuess(actionId: string, detailId: string): boolean {
  const action = R2_ACTIONS.find((a) => a.id === actionId)!;
  const detail = R2_DETAILS.find((d) => d.id === detailId)!;
  const score = action.aiScore + detail.aiScore;
  // 25% random flip so the host is beatable but not trivial
  if (Math.random() < 0.25) return score <= 0;
  return score > 0;
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------
function calculatePoints(elapsedSeconds: number, difficulty: Difficulty): number {
  const base = difficulty === "hard" ? 200 : difficulty === "medium" ? 150 : 100;
  if (elapsedSeconds < 1) return base * 3;
  if (elapsedSeconds < 2) return Math.round(base * 2.5);
  if (elapsedSeconds < 3) return base * 2;
  if (elapsedSeconds < 4) return Math.round(base * 1.5);
  return base;
}

// ---------------------------------------------------------------------------
// Leaderboard (localStorage)
// ---------------------------------------------------------------------------
type LeaderboardEntry = { name: string; score: number; date: string };
const LB_KEY = "ai_explorer_gameshow_leaderboard";

function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(LB_KEY) ?? "[]"); } catch { return []; }
}
function saveLeaderboard(entries: LeaderboardEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LB_KEY, JSON.stringify(entries.slice(0, 10)));
}
function addToLeaderboard(name: string, score: number): LeaderboardEntry[] {
  const entries = getLeaderboard();
  entries.push({ name, score, date: new Date().toLocaleDateString() });
  entries.sort((a, b) => b.score - a.score);
  const trimmed = entries.slice(0, 10);
  saveLeaderboard(trimmed);
  return trimmed;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
function pickQuestions(): number[] {
  const easy = shuffle(SCENARIO_POOL.map((_, i) => i).filter((i) => SCENARIO_POOL[i].difficulty === "easy")).slice(0, 7);
  const medium = shuffle(SCENARIO_POOL.map((_, i) => i).filter((i) => SCENARIO_POOL[i].difficulty === "medium")).slice(0, 7);
  const hard = shuffle(SCENARIO_POOL.map((_, i) => i).filter((i) => SCENARIO_POOL[i].difficulty === "hard")).slice(0, 6);
  return shuffle([...easy, ...medium, ...hard]);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type GamePhase = "intro" | "round1" | "r1-results" | "round2-intro" | "round2" | "final";
type R1Result = { correct: boolean; points: number; elapsed: number; difficulty: Difficulty };
type R2Result = { scenario: string; kidLabel: boolean; hostGuessed: boolean; fooled: boolean; points: number };

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TimerBar({ running, onTimeout }: { running: boolean; onTimeout: () => void }) {
  return (
    <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
      {running ? (
        <motion.div
          key={Math.random()} // force remount each question
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 5, ease: "linear" }}
          style={{ transformOrigin: "left" }}
          onAnimationComplete={onTimeout}
          className="h-full bg-gradient-to-r from-teal-500 via-amber-400 to-red-500 rounded-full"
        />
      ) : (
        <div className="h-full bg-slate-600 rounded-full" />
      )}
    </div>
  );
}

function PointsPop({ points, key: k }: { points: number; key: string }) {
  return (
    <motion.div
      key={k}
      initial={{ opacity: 0, y: 0, scale: 0.6 }}
      animate={{ opacity: [0, 1, 1, 0], y: -60, scale: 1 }}
      transition={{ duration: 1.2 }}
      className={`absolute top-0 left-1/2 -translate-x-1/2 font-black text-2xl pointer-events-none z-50 ${points > 0 ? "text-yellow-400" : "text-red-400"}`}
    >
      {points > 0 ? `+${points}` : "✗"}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function AIGameShow({ onComplete }: { onComplete: (passed: boolean) => void }) {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [playerName, setPlayerName] = useState("");

  // Round 1
  const [questions, setQuestions] = useState<number[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [r1Score, setR1Score] = useState(0);
  const [r1Results, setR1Results] = useState<R1Result[]>([]);
  const [r1Streak, setR1Streak] = useState(0);
  const [r1BestStreak, setR1BestStreak] = useState(0);
  const [showResult, setShowResult] = useState<"correct" | "wrong" | "timeout" | null>(null);
  const [popKey, setPopKey] = useState("");
  const [popPoints, setPopPoints] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Round 2
  const [r2Step, setR2Step] = useState(0);
  const [r2Subject, setR2Subject] = useState("");
  const [r2Action, setR2Action] = useState("");
  const [r2Detail, setR2Detail] = useState("");
  const [r2Label, setR2Label] = useState<boolean | null>(null);
  const [r2Score, setR2Score] = useState(0);
  const [r2Results, setR2Results] = useState<R2Result[]>([]);
  const [hostGuessing, setHostGuessing] = useState(false);
  const [hostResult, setHostResult] = useState<R2Result | null>(null);

  // Final
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Refs for timer
  const questionStartRef = useRef(0);
  const answeredRef = useRef(false);
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentScenario = questions[currentQ] !== undefined ? SCENARIO_POOL[questions[currentQ]] : null;
  const totalScore = r1Score + r2Score;

  // Answer handler (stable via useCallback)
  const handleAnswer = useCallback((isAI: boolean | null) => {
    if (answeredRef.current) return;
    answeredRef.current = true;
    setTimerRunning(false);
    if (timerIdRef.current) clearTimeout(timerIdRef.current);

    const elapsed = (Date.now() - questionStartRef.current) / 1000;
    const scenario = SCENARIO_POOL[questions[currentQ]];
    if (!scenario) return;

    const timeout = isAI === null;
    const correct = !timeout && isAI === scenario.isAI;
    const points = correct ? calculatePoints(elapsed, scenario.difficulty) : 0;

    setPopKey(Date.now().toString());
    setPopPoints(points);

    const resultType = timeout ? "timeout" : correct ? "correct" : "wrong";
    setShowResult(resultType);

    setR1Results((prev) => [...prev, { correct, points, elapsed, difficulty: scenario.difficulty }]);
    setR1Score((s) => s + points);
    setR1Streak((streak) => {
      const newStreak = correct ? streak + 1 : 0;
      setR1BestStreak((b) => Math.max(b, newStreak));
      return newStreak;
    });

    setTimeout(() => {
      setShowResult(null);
      if (currentQ + 1 >= questions.length) {
        setPhase("r1-results");
      } else {
        setCurrentQ((q) => q + 1);
      }
    }, 900);
  }, [questions, currentQ]);

  // Start timer when question changes in round1
  useEffect(() => {
    if (phase !== "round1" || questions.length === 0) return;
    answeredRef.current = false;
    questionStartRef.current = Date.now();
    setTimerRunning(true);

    // Backup timeout (framer-motion handles visual; this is a safety net)
    timerIdRef.current = setTimeout(() => {
      handleAnswer(null);
    }, 5200);

    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
    };
  }, [currentQ, phase, questions.length]); // eslint-disable-line react-hooks/exhaustive-deps

  function startGame() {
    if (!playerName.trim()) return;
    const qs = pickQuestions();
    setQuestions(qs);
    setCurrentQ(0);
    setR1Score(0);
    setR1Results([]);
    setR1Streak(0);
    setR1BestStreak(0);
    setPhase("round1");
  }

  function submitRound2() {
    if (!r2Subject || !r2Action || !r2Detail || r2Label === null) return;
    setHostGuessing(true);
    const subj = R2_SUBJECTS.find((s) => s.id === r2Subject)!;
    const act = R2_ACTIONS.find((a) => a.id === r2Action)!;
    const det = R2_DETAILS.find((d) => d.id === r2Detail)!;
    const scenarioText = `${subj.label} that ${act.label} ${det.label}`;
    const hostGuessed = hostGuess(r2Action, r2Detail);
    const fooled = hostGuessed !== r2Label;
    const pts = fooled ? 400 : 0;

    setTimeout(() => {
      const result: R2Result = { scenario: scenarioText, kidLabel: r2Label!, hostGuessed, fooled, points: pts };
      setR2Results((prev) => [...prev, result]);
      setR2Score((s) => s + pts);
      setHostResult(result);
      setHostGuessing(false);
    }, 2000);
  }

  function nextR2() {
    setHostResult(null);
    setR2Subject("");
    setR2Action("");
    setR2Detail("");
    setR2Label(null);
    if (r2Step + 1 >= 5) {
      const lb = addToLeaderboard(playerName, r1Score + r2Score + (hostResult?.points ?? 0));
      setLeaderboard(lb);
      setPhase("final");
    } else {
      setR2Step((s) => s + 1);
    }
  }

  function finishGame() {
    const lb = addToLeaderboard(playerName, totalScore);
    setLeaderboard(lb);
    setPhase("final");
  }

  // -------------------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------------------

  // INTRO
  if (phase === "intro") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="text-6xl mb-3">🎬</motion.div>
          <h2 className="text-3xl font-black text-white">AM I AI?</h2>
          <p className="text-teal-400 font-bold text-sm mt-1">The World 1 Capstone Game Show</p>
        </div>

        <div className="bg-space-800 rounded-2xl p-5 border border-slate-700 space-y-3">
          <div className="font-black text-white mb-1">How to play:</div>
          <div className="flex gap-3 text-sm text-slate-300">
            <span className="text-teal-400 font-black">Round 1</span>
            <span>20 rapid-fire scenarios · 5 seconds each · speed bonus points!</span>
          </div>
          <div className="flex gap-3 text-sm text-slate-300">
            <span className="text-purple-400 font-black">Round 2</span>
            <span>Build 5 tricky scenarios to fool the AI host · +400 pts each fool!</span>
          </div>
          <div className="flex gap-3 text-sm text-slate-300">
            <span className="text-yellow-400 font-black">Scoring</span>
            <span>Fast + correct = max points · Easy to Hard scenarios · leaderboard!</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-black text-slate-300 mb-2 block">Your contestant name:</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && startGame()}
            maxLength={18}
            placeholder="Enter your name..."
            className="w-full bg-space-900 border-2 border-slate-600 rounded-2xl px-5 py-4 text-white text-xl font-bold placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-colors"
            autoFocus
          />
        </div>

        <button
          onClick={startGame}
          disabled={!playerName.trim()}
          className="w-full py-5 rounded-2xl font-black text-xl text-white bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 btn-press transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
        >
          Start the Show! 🎬
        </button>
      </div>
    );
  }

  // ROUND 1
  if (phase === "round1" && currentScenario) {
    const qNum = currentQ + 1;
    const totalQ = questions.length;
    const diffColor = currentScenario.difficulty === "easy" ? "text-green-400" : currentScenario.difficulty === "medium" ? "text-amber-400" : "text-red-400";

    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-black">⭐</span>
            <span className="text-white font-black text-lg">{r1Score}</span>
          </div>
          <div className="text-xs font-black text-slate-400">{qNum}/{totalQ}</div>
          <div className="flex items-center gap-2">
            {r1Streak >= 3 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-orange-400 font-black text-sm">🔥{r1Streak}</motion.span>
            )}
            <span className={`text-xs font-black uppercase ${diffColor}`}>{currentScenario.difficulty}</span>
          </div>
        </div>

        {/* Timer bar */}
        <TimerBar
          running={timerRunning && showResult === null}
          onTimeout={() => handleAnswer(null)}
        />

        {/* Scenario card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.18 }}
              className={`bg-space-800 rounded-3xl p-8 border-2 text-center min-h-[160px] flex flex-col items-center justify-center transition-colors ${
                showResult === "correct" ? "border-green-500/70 bg-green-500/10"
                  : showResult === "wrong" || showResult === "timeout" ? "border-red-500/70 bg-red-500/10"
                  : "border-slate-700"
              }`}
            >
              <div className="text-xs font-black text-slate-500 mb-3 uppercase">{currentScenario.category}</div>
              <p className="text-white font-black text-xl leading-snug">{currentScenario.text}</p>
              {showResult && (
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className={`mt-4 text-2xl font-black ${showResult === "correct" ? "text-green-300" : "text-red-300"}`}
                >
                  {showResult === "correct" ? `✓ +${popPoints}` : showResult === "timeout" ? "⏱ Too slow!" : `✗ ${currentScenario.isAI ? "That WAS AI!" : "That was NOT AI!"}`}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {showResult && popPoints > 0 && (
              <PointsPop key={popKey} points={popPoints} />
            )}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => showResult === null && handleAnswer(true)}
            disabled={showResult !== null}
            className="py-6 rounded-2xl font-black text-2xl text-teal-300 bg-teal-500/20 border-2 border-teal-500/50 hover:bg-teal-500/30 active:bg-teal-500/40 transition-all disabled:opacity-50"
          >
            🤖 ROBOT
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => showResult === null && handleAnswer(false)}
            disabled={showResult !== null}
            className="py-6 rounded-2xl font-black text-2xl text-slate-300 bg-slate-700/60 border-2 border-slate-600 hover:bg-slate-700 active:bg-slate-600 transition-all disabled:opacity-50"
          >
            ❌ NOT
          </motion.button>
        </div>

        <p className="text-center text-xs text-slate-600 font-bold">Faster = more points · {difficulty_label(currentScenario.difficulty)} scenario</p>
      </div>
    );
  }

  // ROUND 1 RESULTS
  if (phase === "r1-results") {
    const correct = r1Results.filter((r) => r.correct).length;
    const accuracy = Math.round((correct / r1Results.length) * 100);
    const fastest = r1Results.filter((r) => r.correct).reduce((min, r) => Math.min(min, r.elapsed), 99);

    return (
      <div className="space-y-5">
        <div className="text-center">
          <div className="text-5xl mb-2">🎯</div>
          <div className="text-3xl font-black text-white">Round 1 Done!</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Score", value: r1Score, color: "text-yellow-400" },
            { label: "Accuracy", value: `${accuracy}%`, color: "text-teal-400" },
            { label: "Best Streak", value: `${r1BestStreak}x 🔥`, color: "text-orange-400" },
            { label: "Fastest", value: fastest < 99 ? `${fastest.toFixed(1)}s` : "—", color: "text-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-space-800 rounded-2xl p-4 border border-slate-700 text-center">
              <div className="text-xs text-slate-500 font-bold mb-1">{stat.label}</div>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Question breakdown */}
        <div className="bg-space-800 rounded-2xl p-4 border border-slate-700">
          <div className="text-xs font-black text-slate-400 mb-2">BY DIFFICULTY</div>
          {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => {
            const subset = r1Results.filter((_, i) => SCENARIO_POOL[questions[i]]?.difficulty === diff);
            const pct = subset.length ? Math.round(subset.filter((r) => r.correct).length / subset.length * 100) : 0;
            return (
              <div key={diff} className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-black w-14 ${diff === "easy" ? "text-green-400" : diff === "medium" ? "text-amber-400" : "text-red-400"}`}>{diff.toUpperCase()}</span>
                <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full bg-teal-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-slate-400 w-10 text-right">{pct}%</span>
              </div>
            );
          })}
        </div>

        <button onClick={() => setPhase("round2-intro")} className="w-full py-5 rounded-2xl font-black text-xl text-white bg-gradient-to-r from-purple-500 to-violet-400 hover:from-purple-400 hover:to-violet-300 btn-press transition-all shadow-lg">
          Round 2: Stump the Host! →
        </button>
      </div>
    );
  }

  // ROUND 2 INTRO
  if (phase === "round2-intro") {
    return (
      <div className="space-y-5">
        <div className="text-center">
          <div className="text-5xl mb-2">🤔</div>
          <div className="text-3xl font-black text-white">Flip the Script!</div>
          <p className="text-purple-400 font-bold text-sm mt-1">Now YOU try to trick the AI host</p>
        </div>
        <div className="bg-space-800 rounded-2xl p-5 border border-purple-500/30 space-y-3">
          <p className="text-white font-bold text-sm">In Round 2, you BUILD a technology scenario using a template. Then label it as AI or NOT AI. The AI host tries to guess.</p>
          <div className="bg-purple-500/15 rounded-xl p-4 text-sm text-slate-300">
            <span className="font-black text-purple-300">How to win: </span>
            Pick an action that sounds like AI but label it NOT — or pick something that sounds simple but label it AI. Fool the host and score <span className="text-yellow-300 font-black">+400 points!</span>
          </div>
          <div className="bg-space-900 rounded-xl p-3 text-xs text-slate-400 border border-slate-700">
            <span className="text-slate-300 font-bold">Hot tip: </span>
            Vocabulary can be tricky! Words like "detects" and "adapts" make the host think AI — even if the tech is just following rules.
          </div>
        </div>
        <button onClick={() => setPhase("round2")} className="w-full py-5 rounded-2xl font-black text-xl text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors">
          Start Round 2! →
        </button>
      </div>
    );
  }

  // ROUND 2
  if (phase === "round2") {
    const scenarioParts = [
      R2_SUBJECTS.find((s) => s.id === r2Subject)?.label ?? "",
      R2_ACTIONS.find((a) => a.id === r2Action)?.label ?? "",
      R2_DETAILS.find((d) => d.id === r2Detail)?.label ?? "",
    ];
    const scenarioPreview = r2Subject && r2Action && r2Detail
      ? `${R2_SUBJECTS.find(s => s.id === r2Subject)?.emoji} ${scenarioParts[0]} that ${scenarioParts[1]} ${scenarioParts[2]}`
      : null;

    const canSubmit = r2Subject && r2Action && r2Detail && r2Label !== null && !hostGuessing && !hostResult;

    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-black text-slate-400">Attempt {r2Step + 1}/5</div>
          <div className="text-sm font-black text-purple-400">+{r2Score} pts fooled</div>
          <div className="text-sm font-black text-yellow-400">Total: {r1Score + r2Score}</div>
        </div>

        {/* Builder */}
        {!hostResult ? (
          <div className="space-y-3">
            <div className="bg-space-800 rounded-2xl p-4 border border-purple-500/30">
              <div className="text-xs font-black text-purple-400 mb-3">BUILD YOUR SCENARIO</div>

              {/* Subject */}
              <div className="mb-3">
                <div className="text-xs text-slate-400 font-bold mb-2">1. Pick a technology:</div>
                <div className="grid grid-cols-2 gap-2">
                  {R2_SUBJECTS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setR2Subject(s.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold text-left transition-all btn-press ${r2Subject === s.id ? "bg-purple-500/30 border-purple-400/60 text-purple-200" : "bg-space-900 border-slate-700 text-slate-400 hover:border-slate-500"}`}
                    >
                      <span>{s.emoji}</span><span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mb-3">
                <div className="text-xs text-slate-400 font-bold mb-2">2. Pick what it does:</div>
                <div className="space-y-1.5">
                  {R2_ACTIONS.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setR2Action(a.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs font-bold transition-all btn-press ${r2Action === a.id ? "bg-purple-500/30 border-purple-400/60 text-purple-200" : "bg-space-900 border-slate-700 text-slate-400 hover:border-slate-500"}`}
                    >
                      ...{a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail */}
              <div className="mb-4">
                <div className="text-xs text-slate-400 font-bold mb-2">3. Add a detail:</div>
                <div className="space-y-1.5">
                  {R2_DETAILS.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setR2Detail(d.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs font-bold transition-all btn-press ${r2Detail === d.id ? "bg-purple-500/30 border-purple-400/60 text-purple-200" : "bg-space-900 border-slate-700 text-slate-400 hover:border-slate-500"}`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              {scenarioPreview && (
                <div className="bg-space-900 rounded-xl p-3 mb-4 border border-slate-700 text-sm text-white font-bold">
                  {scenarioPreview}
                </div>
              )}

              {/* Label toggle */}
              {r2Subject && r2Action && r2Detail && (
                <div>
                  <div className="text-xs text-slate-400 font-bold mb-2">4. Label it (this is your trick!):</div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setR2Label(true)} className={`py-3 rounded-xl font-black text-sm btn-press transition-all ${r2Label === true ? "bg-teal-500 text-white" : "bg-space-900 border border-slate-700 text-teal-400 hover:border-teal-500/50"}`}>🤖 This IS AI</button>
                    <button onClick={() => setR2Label(false)} className={`py-3 rounded-xl font-black text-sm btn-press transition-all ${r2Label === false ? "bg-red-500 text-white" : "bg-space-900 border border-slate-700 text-red-400 hover:border-red-500/50"}`}>❌ This is NOT</button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={submitRound2}
              disabled={!canSubmit}
              className="w-full py-4 rounded-2xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {hostGuessing ? "AI Host is thinking... 🤔" : "Submit to AI Host! →"}
            </button>

            {hostGuessing && (
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.8, repeat: 2 }}
                  className="text-5xl inline-block"
                >
                  🤖
                </motion.div>
                <p className="text-slate-400 text-sm mt-2 font-bold">Analysing your scenario...</p>
              </div>
            )}
          </div>
        ) : (
          /* Host result */
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="space-y-4">
            <div className="bg-space-800 rounded-2xl p-5 border border-slate-700 text-center">
              <div className="text-4xl mb-2">🤖</div>
              <div className="text-xs text-slate-400 font-bold mb-1">AI HOST SAYS...</div>
              <div className="text-xl font-black text-white mb-3">
                "I think this is {hostResult.hostGuessed ? "🤖 AI" : "❌ NOT AI"}!"
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className={`rounded-2xl p-5 border text-center ${hostResult.fooled ? "bg-yellow-500/20 border-yellow-500/40" : "bg-slate-700/50 border-slate-600"}`}
            >
              <div className={`text-3xl font-black mb-1 ${hostResult.fooled ? "text-yellow-300" : "text-slate-300"}`}>
                {hostResult.fooled ? "YOU FOOLED THE HOST! 🎉" : "Host was right this time."}
              </div>
              {hostResult.fooled && <div className="text-yellow-400 font-black text-xl">+400 pts!</div>}
              <p className="text-slate-400 text-sm mt-2">
                Your label was <span className="font-black text-white">{hostResult.kidLabel ? "AI" : "NOT AI"}</span>. The host guessed <span className="font-black text-white">{hostResult.hostGuessed ? "AI" : "NOT AI"}</span>.
              </p>
            </motion.div>
            <button
              onClick={nextR2}
              className="w-full py-4 rounded-2xl font-black text-white bg-purple-500 hover:bg-purple-400 btn-press transition-colors"
            >
              {r2Step + 1 >= 5 ? "See Final Score! →" : `Next Attempt (${r2Step + 2}/5) →`}
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  // FINAL RESULTS
  if (phase === "final") {
    const lb = leaderboard.length > 0 ? leaderboard : getLeaderboard();
    const myRank = lb.findIndex((e) => e.name === playerName && e.score === totalScore) + 1;
    const passed = totalScore >= 800;

    return (
      <div className="space-y-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-6xl mb-2">{passed ? "🏆" : "🎬"}</div>
          <div className="text-3xl font-black text-white">{playerName}</div>
          <div className="text-5xl font-black text-yellow-400 mt-1">{totalScore} pts</div>
          {passed && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3 }} className="mt-2 inline-block bg-teal-500/20 border border-teal-500/40 rounded-xl px-4 py-1 text-teal-300 font-black text-sm">
              AI Spotter Badge Earned!
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-space-800 rounded-2xl p-4 border border-slate-700 text-center">
            <div className="text-xs text-slate-500 font-bold mb-1">Round 1</div>
            <div className="text-2xl font-black text-teal-400">{r1Score}</div>
          </div>
          <div className="bg-space-800 rounded-2xl p-4 border border-slate-700 text-center">
            <div className="text-xs text-slate-500 font-bold mb-1">Round 2</div>
            <div className="text-2xl font-black text-purple-400">{r2Score}</div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-space-800 rounded-2xl p-4 border border-slate-700">
          <div className="text-xs font-black text-slate-400 mb-3">🏆 LEADERBOARD (this device)</div>
          <div className="space-y-2">
            {lb.slice(0, 7).map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl ${entry.name === playerName && entry.score === totalScore ? "bg-teal-500/20 border border-teal-500/30" : "bg-space-900"}`}
              >
                <span className="text-sm font-black w-6 text-slate-500">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}</span>
                <span className="flex-1 font-bold text-white text-sm truncate">{entry.name}</span>
                <span className="font-black text-yellow-400">{entry.score}</span>
                <span className="text-xs text-slate-500">{entry.date}</span>
              </motion.div>
            ))}
            {lb.length === 0 && <div className="text-slate-500 text-sm text-center">No scores yet — you are first!</div>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setPhase("intro");
              setR1Score(0); setR2Score(0); setR1Results([]); setR2Results([]);
              setCurrentQ(0); setR1Streak(0); setR1BestStreak(0);
              setR2Step(0); setR2Subject(""); setR2Action(""); setR2Detail(""); setR2Label(null);
              setHostResult(null); setPlayerName("");
            }}
            className="py-4 rounded-2xl font-black text-white bg-slate-700 hover:bg-slate-600 btn-press transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={() => onComplete(passed)}
            className="py-4 rounded-2xl font-black text-white bg-teal-500 hover:bg-teal-400 btn-press transition-colors"
          >
            {passed ? "Claim Badge! →" : "Finish →"}
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function difficulty_label(d: Difficulty) {
  return d === "easy" ? "Easy" : d === "medium" ? "Medium" : "Hard";
}
