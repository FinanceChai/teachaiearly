"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Setting {
  name: string;
  icon: string;
  description: string;
  offExplanation: string;
  onExplanation: string;
  privacyPoints: number;
}

const SETTINGS: Setting[] = [
  {
    name: "Share Location",
    icon: "📍",
    description: "Allow apps to know where you are",
    offExplanation: "Nice! Without location sharing, apps can't track where you go, what stores you visit, or where you live. Much more private!",
    onExplanation: "With this on, apps know exactly where you are — at school, at home, at the park. They can build a complete map of your daily life.",
    privacyPoints: 15,
  },
  {
    name: "Personalized Ads",
    icon: "🎯",
    description: "Show ads based on your interests",
    offExplanation: "You'll see random ads instead of targeted ones. Companies won't build a profile of what you like to sell you things!",
    onExplanation: "AI tracks everything you search, click, and buy to show you ads you're more likely to click. It knows your interests better than your friends do!",
    privacyPoints: 12,
  },
  {
    name: "Search History",
    icon: "🔍",
    description: "Save everything you search for",
    offExplanation: "Your searches won't be saved. Nobody can look back at everything you were curious about — your questions stay yours!",
    onExplanation: "Every single thing you search gets saved — questions about homework, embarrassing things you looked up, everything. Forever.",
    privacyPoints: 14,
  },
  {
    name: "Voice Recordings",
    icon: "🎙️",
    description: "Store recordings from voice assistant",
    offExplanation: "Your voice recordings get deleted after processing. No human will ever listen to what you said to your device!",
    onExplanation: "Your voice recordings are stored on a server. Sometimes real humans listen to them to 'improve the AI.' Yep, real people!",
    privacyPoints: 13,
  },
  {
    name: "Read Contacts",
    icon: "👥",
    description: "Let apps see your phone contacts",
    offExplanation: "Smart choice! Your friends' phone numbers and names stay private. Apps won't know who your friends and family are.",
    onExplanation: "Apps can see everyone in your contacts — names, phone numbers, emails. They might even send your friends notifications or ads!",
    privacyPoints: 11,
  },
  {
    name: "Camera Access",
    icon: "📸",
    description: "Allow apps to use your camera anytime",
    offExplanation: "Apps can only use your camera when you specifically open it. No sneaky background photos! Much safer.",
    onExplanation: "Apps could technically access your camera at any time, even when you're not using the app. Some have been caught doing this!",
    privacyPoints: 13,
  },
  {
    name: "Activity Tracking",
    icon: "👀",
    description: "Track which apps you use and when",
    offExplanation: "Apps won't know what other apps you use or how much time you spend on them. Your habits stay private!",
    onExplanation: "Companies know every app you open, how long you use it, and what time of day. They sell this info to advertisers.",
    privacyPoints: 12,
  },
  {
    name: "Data Sharing with Partners",
    icon: "🤝",
    description: "Share your data with third-party companies",
    offExplanation: "Your data stays with just this one app. It won't be sold or given to dozens of companies you've never heard of!",
    onExplanation: "Your data gets shared with hundreds of companies you've never heard of. They combine it with other data to know almost everything about you.",
    privacyPoints: 15,
  },
];

export function SettingsSafari({ onComplete }: { onComplete: () => void }) {
  const [toggles, setToggles] = useState<boolean[]>(SETTINGS.map(() => true));
  const [reviewed, setReviewed] = useState<boolean[]>(SETTINGS.map(() => false));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [done, setDone] = useState(false);

  const allReviewed = reviewed.every(Boolean);

  const handleToggle = (index: number) => {
    const next = [...toggles];
    next[index] = !next[index];
    setToggles(next);
    const rev = [...reviewed];
    rev[index] = true;
    setReviewed(rev);
    setSelectedIndex(index);
  };

  const privacyScore = toggles.reduce(
    (sum, isOn, i) => sum + (isOn ? 0 : SETTINGS[i].privacyPoints),
    5
  );
  const maxScore = SETTINGS.reduce((sum, s) => sum + s.privacyPoints, 5);

  const handleFinish = () => {
    setShowResults(true);
  };

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  if (showResults) {
    const percentage = Math.round((privacyScore / maxScore) * 100);
    const offCount = toggles.filter((t) => !t).length;
    let rating = "";
    let ratingColor = "";
    if (percentage >= 80) {
      rating = "Privacy Champion!";
      ratingColor = "text-cyan-400";
    } else if (percentage >= 50) {
      rating = "Privacy Aware";
      ratingColor = "text-cyan-500";
    } else if (percentage >= 25) {
      rating = "Could Be More Private";
      ratingColor = "text-yellow-400";
    } else {
      rating = "Wide Open!";
      ratingColor = "text-red-400";
    }

    return (
      <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            🛡️ Your Privacy Score
          </h2>
          <div className="my-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-36 h-36 mx-auto rounded-full border-4 border-cyan-500 flex items-center justify-center bg-space-800"
            >
              <div>
                <div className="text-4xl font-bold text-cyan-400">
                  {percentage}%
                </div>
                <div className="text-xs text-slate-600">private</div>
              </div>
            </motion.div>
          </div>
          <p className={`text-xl font-bold ${ratingColor} mb-2`}>{rating}</p>
          <p className="text-slate-600 mb-4">
            You turned off {offCount} out of 8 settings.
          </p>
          <div className="bg-space-800 rounded-lg p-4 mb-6 text-left">
            <p className="text-cyan-400 font-semibold mb-2">
              💡 What you learned:
            </p>
            <ul className="text-slate-600 text-sm space-y-1">
              <li>
                • Most apps start with privacy settings turned ON (sharing your
                data)
              </li>
              <li>
                • Each setting you control gives you more privacy and power
              </li>
              <li>
                • It&apos;s always worth checking your settings on real apps too!
              </li>
              <li>
                • There&apos;s no one &quot;right&quot; answer — it&apos;s about
                making informed choices
              </li>
            </ul>
          </div>
          {!done && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              className="px-6 py-3 bg-cyan-500 text-slate-900 rounded-lg font-bold"
            >
              Complete Activity ✓
            </motion.button>
          )}
          {done && (
            <p className="text-cyan-400 font-semibold">
              ✓ Activity Complete!
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-space-900 rounded-xl border border-slate-200 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        ⚙️ Settings Safari
      </h2>
      <p className="text-slate-600 text-sm mb-4">
        This app has 8 privacy settings — all turned ON by default. Review each
        one and decide: keep it on or turn it off? Tap a toggle to switch it and
        learn what it really does.
      </p>

      <div className="space-y-2 mb-4">
        {SETTINGS.map((setting, i) => (
          <motion.div
            key={setting.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-space-800 rounded-lg p-3 border ${
              reviewed[i] ? "border-cyan-500/40" : "border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{setting.icon}</span>
                <div>
                  <p className="text-slate-900 font-semibold text-sm">
                    {setting.name}
                  </p>
                  <p className="text-slate-600 text-xs">
                    {setting.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle(i)}
                className={`w-14 h-7 rounded-full relative transition-colors ${
                  toggles[i] ? "bg-red-500" : "bg-cyan-500"
                }`}
              >
                <motion.div
                  animate={{ x: toggles[i] ? 28 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-5 h-5 bg-white rounded-full absolute top-1"
                />
                <span className="sr-only">Toggle</span>
              </button>
            </div>
            {selectedIndex === i && reviewed[i] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="mt-2 p-2 rounded bg-space-900 text-xs"
              >
                <p
                  className={
                    toggles[i] ? "text-red-300" : "text-cyan-300"
                  }
                >
                  {toggles[i]
                    ? setting.onExplanation
                    : setting.offExplanation}
                </p>
              </motion.div>
            )}
            {reviewed[i] && (
              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs">
                  {toggles[i] ? "🔴 ON (sharing)" : "🟢 OFF (private)"}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-slate-600 text-sm">
          Reviewed: {reviewed.filter(Boolean).length}/8
        </p>
        {allReviewed && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFinish}
            className="px-5 py-2 bg-cyan-500 text-slate-900 rounded-lg font-bold"
          >
            See My Privacy Score →
          </motion.button>
        )}
      </div>
    </div>
  );
}
