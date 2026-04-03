"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Component {
  name: string;
  icon: string;
  render: string;
}

const COMPONENTS: Component[] = [
  { name: "Header", icon: "📌", render: "🔤 App Title" },
  { name: "Button", icon: "🔘", render: "[ Click Me! ]" },
  { name: "Image Area", icon: "🖼️", render: "📷 [Image Here]" },
  { name: "Text Block", icon: "📝", render: "Lorem ipsum text..." },
  { name: "AI Feature", icon: "🧠", render: "🤖 AI Magic Zone" },
  { name: "Navigation", icon: "🧭", render: "← Home | Settings →" },
];

const SCREENS = [
  { name: "Home Screen", description: "The first thing users see", slots: 4 },
  { name: "Main Feature", description: "Where the AI magic happens", slots: 4 },
  { name: "Results Screen", description: "Show what the AI created", slots: 4 },
];

const TEST_STEPS = [
  { action: "User opens the app", emoji: "👋", feedback: "They see the Home Screen!" },
  { action: "User taps the main button", emoji: "👆", feedback: "They move to the AI Feature screen!" },
  { action: "User uses the AI feature", emoji: "🧠", feedback: "The AI processes their input!" },
  { action: "User sees results", emoji: "🎉", feedback: "Results appear on the final screen!" },
];

const ISSUES = [
  { issue: "The button is too small to notice", fix: "Make the main button bigger and more colorful" },
  { issue: "Users don't know what the AI does", fix: "Add a description explaining the AI feature" },
  { issue: "The results screen feels empty", fix: "Add sharing options and fun animations" },
];

export function PrototypeBuilder({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"build" | "test" | "fix" | "done">("build");
  const [currentScreen, setCurrentScreen] = useState(0);
  const [screenComponents, setScreenComponents] = useState<number[][]>([[], [], []]);
  const [testStep, setTestStep] = useState(0);
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const addComponent = (compIndex: number) => {
    const current = screenComponents[currentScreen];
    if (current.length >= SCREENS[currentScreen].slots) return;
    const next = [...screenComponents];
    next[currentScreen] = [...current, compIndex];
    setScreenComponents(next);
  };

  const removeComponent = (slotIndex: number) => {
    const next = [...screenComponents];
    next[currentScreen] = next[currentScreen].filter((_, i) => i !== slotIndex);
    setScreenComponents(next);
  };

  const allScreensHaveComponents = screenComponents.every((s) => s.length > 0);

  const handleComplete = () => {
    setCompleted(true);
    onComplete();
  };

  if (phase === "done") {
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <span className="text-5xl">🎉</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Prototype Complete!</h2>
          <p className="text-lime-400 font-semibold mt-1">You just went through the real design process!</p>

          <div className="bg-space-800 rounded-lg p-4 mt-4 text-left">
            <p className="text-lime-400 font-semibold mb-2">What you did:</p>
            <div className="space-y-1 text-slate-600 text-sm">
              <p>✅ Built 3 screens with UI components</p>
              <p>✅ Tested the user flow</p>
              <p>✅ Found and fixed a usability issue</p>
            </div>
          </div>

          <div className="bg-space-800 rounded-lg p-4 mt-3 text-left">
            <p className="text-lime-400 font-semibold mb-1">💡 Pro tip:</p>
            <p className="text-slate-600 text-sm">
              Real app designers do this exact process — build, test, find problems, fix them, repeat!
              It&apos;s called &quot;iterative design&quot; and it&apos;s how every great app is made.
            </p>
          </div>

          {!completed ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              className="mt-4 px-6 py-3 bg-lime-500 text-slate-900 rounded-lg font-bold"
            >
              Complete Activity ✓
            </motion.button>
          ) : (
            <p className="mt-4 text-lime-400 font-semibold">✓ Activity Complete!</p>
          )}
        </motion.div>
      </div>
    );
  }

  if (phase === "fix") {
    const issue = ISSUES[Math.floor(Math.random() * ISSUES.length)];
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-2">🔧 Fix the Issue</h2>
        <p className="text-slate-600 text-sm mb-4">
          During testing, we found a problem. Pick the best fix!
        </p>

        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
          <p className="text-red-400 font-semibold">⚠️ Problem Found:</p>
          <p className="text-slate-600 text-sm mt-1">{issue.issue}</p>
        </div>

        <div className="space-y-2 mb-4">
          {[
            issue.fix,
            "Delete the whole screen and start over",
            "Ignore it — nobody will notice",
          ]
            .sort(() => Math.random() - 0.5)
            .map((fix, i) => (
              <motion.button
                key={fix}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedIssue(fix === issue.fix ? 0 : 1)}
                className={`w-full p-3 rounded-lg border text-left ${
                  selectedIssue === null
                    ? "bg-space-800 border-slate-200 hover:border-lime-500"
                    : fix === issue.fix
                    ? "bg-lime-500/20 border-lime-500"
                    : selectedIssue === 1
                    ? "bg-space-800 border-slate-200 opacity-50"
                    : "bg-space-800 border-slate-200"
                }`}
              >
                <p className="text-slate-900 text-sm">{fix}</p>
              </motion.button>
            ))}
        </div>

        {selectedIssue !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={`rounded-lg p-3 mb-3 ${
              selectedIssue === 0 ? "bg-lime-500/10 border border-lime-500/30" : "bg-yellow-500/10 border border-yellow-500/30"
            }`}>
              <p className={selectedIssue === 0 ? "text-lime-400 text-sm" : "text-yellow-400 text-sm"}>
                {selectedIssue === 0
                  ? "Great fix! Small, targeted improvements are the best approach. You don't need to start over!"
                  : "Not quite — ignoring bugs or starting over aren't great options. Small fixes are better!"}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase("done")}
              className="w-full px-5 py-2 bg-lime-500 text-slate-900 rounded-lg font-bold"
            >
              See Results →
            </motion.button>
          </motion.div>
        )}
      </div>
    );
  }

  if (phase === "test") {
    const step = TEST_STEPS[testStep];
    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-2">🧪 Testing Your Prototype</h2>
        <p className="text-slate-600 text-sm mb-4">
          Watch a mock user try your app! Step {testStep + 1} of {TEST_STEPS.length}
        </p>

        <motion.div
          key={testStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-space-800 rounded-xl p-5 border border-slate-200 text-center mb-4"
        >
          <span className="text-4xl">{step.emoji}</span>
          <p className="text-slate-900 font-bold mt-2">{step.action}</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lime-400 text-sm mt-2"
          >
            {step.feedback}
          </motion.p>
        </motion.div>

        <div className="w-full bg-space-800 rounded-full h-2 mb-4">
          <div
            className="bg-lime-500 h-2 rounded-full transition-all"
            style={{ width: `${((testStep + 1) / TEST_STEPS.length) * 100}%` }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (testStep < TEST_STEPS.length - 1) {
              setTestStep(testStep + 1);
            } else {
              setPhase("fix");
            }
          }}
          className="w-full px-5 py-2 bg-lime-500 text-slate-900 rounded-lg font-bold"
        >
          {testStep < TEST_STEPS.length - 1 ? "Next Step →" : "Find Issues to Fix →"}
        </motion.button>
      </div>
    );
  }

  // Build phase
  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-slate-900 mb-1">🔨 Prototype Builder</h2>
      <p className="text-slate-600 text-sm mb-3">
        Build 3 screens for your app! Drag components into each screen.
      </p>

      {/* Screen tabs */}
      <div className="flex gap-1 mb-3">
        {SCREENS.map((screen, i) => (
          <button
            key={screen.name}
            onClick={() => setCurrentScreen(i)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentScreen === i
                ? "bg-lime-500 text-slate-900"
                : screenComponents[i].length > 0
                ? "bg-lime-500/20 text-lime-400"
                : "bg-space-800 text-slate-400"
            }`}
          >
            {screen.name} {screenComponents[i].length > 0 && "✓"}
          </button>
        ))}
      </div>

      {/* Current screen wireframe */}
      <div className="bg-space-800 rounded-xl p-4 border border-slate-200 mb-3 min-h-[200px]">
        <p className="text-slate-400 text-xs mb-2">
          {SCREENS[currentScreen].description} (
          {screenComponents[currentScreen].length}/{SCREENS[currentScreen].slots} slots)
        </p>
        <div className="space-y-2">
          {screenComponents[currentScreen].map((compIdx, slotIdx) => (
            <motion.div
              key={`${slotIdx}-${compIdx}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-space-900 rounded-lg p-2 border border-lime-500/30 flex items-center justify-between"
            >
              <span className="text-sm text-lime-300">
                {COMPONENTS[compIdx].icon} {COMPONENTS[compIdx].render}
              </span>
              <button
                onClick={() => removeComponent(slotIdx)}
                className="text-red-400 hover:text-red-300 text-xs"
              >
                ✕
              </button>
            </motion.div>
          ))}
          {screenComponents[currentScreen].length === 0 && (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
              <p className="text-slate-400 text-sm">Click components below to add them here!</p>
            </div>
          )}
        </div>
      </div>

      {/* Component palette */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {COMPONENTS.map((comp, i) => (
          <motion.button
            key={comp.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addComponent(i)}
            disabled={screenComponents[currentScreen].length >= SCREENS[currentScreen].slots}
            className="p-2 bg-space-800 rounded-lg border border-slate-200 hover:border-lime-500 disabled:opacity-40"
          >
            <span className="text-lg">{comp.icon}</span>
            <p className="text-slate-900 text-xs">{comp.name}</p>
          </motion.button>
        ))}
      </div>

      {allScreensHaveComponents && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPhase("test")}
          className="w-full px-5 py-2 bg-lime-500 text-slate-900 rounded-lg font-bold"
        >
          🧪 Test Your Prototype →
        </motion.button>
      )}
    </div>
  );
}
