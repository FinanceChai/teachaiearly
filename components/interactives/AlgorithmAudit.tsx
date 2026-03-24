"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Post {
  id: number;
  emoji: string;
  category: string;
  description: string;
  tags: string[];
}

const POSTS: Post[] = [
  { id: 1, emoji: "⚽", category: "Sports", description: "Amazing last-minute goal wins the championship!", tags: ["sports", "excitement", "competition"] },
  { id: 2, emoji: "🎨", category: "Art", description: "Teen artist creates incredible mural for her school", tags: ["art", "creativity", "school"] },
  { id: 3, emoji: "🎮", category: "Gaming", description: "New open-world game breaks download records!", tags: ["gaming", "tech", "entertainment"] },
  { id: 4, emoji: "🔬", category: "Science", description: "Scientists discover New species of deep-sea fish!", tags: ["science", "ocean", "discovery"] },
  { id: 5, emoji: "🎵", category: "Music", description: "Behind the scenes of how your favorite song was made", tags: ["music", "creativity", "entertainment"] },
  { id: 6, emoji: "🍳", category: "Cooking", description: "12-year-old wins cooking competition with grandma's recipe", tags: ["cooking", "family", "competition"] },
  { id: 7, emoji: "🌍", category: "News", description: "Students plant 10,000 trees to fight climate change", tags: ["environment", "school", "action"] },
  { id: 8, emoji: "😂", category: "Comedy", description: "Hilarious cat fails compilation (3 minutes)", tags: ["funny", "animals", "entertainment"] },
];

function generateRecommendations(pickedIds: number[]): { recommended: Post[]; hidden: Post[] } {
  const pickedPosts = POSTS.filter((p) => pickedIds.includes(p.id));
  const notPicked = POSTS.filter((p) => !pickedIds.includes(p.id));

  const pickedTags = pickedPosts.flatMap((p) => p.tags);
  const tagCounts: Record<string, number> = {};
  pickedTags.forEach((t) => { tagCounts[t] = (tagCounts[t] || 0) + 1; });

  const scored = notPicked.map((post) => {
    const score = post.tags.reduce((sum, t) => sum + (tagCounts[t] || 0), 0);
    return { post, score };
  });
  scored.sort((a, b) => b.score - a.score);

  return {
    recommended: scored.slice(0, 2).map((s) => s.post),
    hidden: scored.slice(-2).map((s) => s.post),
  };
}

const EXTRA_RECS = [
  { emoji: "⚽", description: "Top 10 goals of all time!", category: "Sports" },
  { emoji: "🎮", description: "Pro gamer shares secret tips", category: "Gaming" },
  { emoji: "🎨", description: "How to draw anime characters", category: "Art" },
  { emoji: "🔬", description: "Build a volcano at home!", category: "Science" },
  { emoji: "😂", description: "Dogs being derpy for 5 minutes", category: "Comedy" },
  { emoji: "🎵", description: "Learn guitar in 30 days challenge", category: "Music" },
];

export function AlgorithmAudit({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"pick" | "results" | "hidden" | "done">("pick");
  const [selected, setSelected] = useState<number[]>([]);

  const togglePost = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const { recommended, hidden } = generateRecommendations(selected);

  const pickedPosts = POSTS.filter((p) => selected.includes(p.id));
  const pickedTags = pickedPosts.flatMap((p) => p.tags);
  const tagCounts: Record<string, number> = {};
  pickedTags.forEach((t) => { tagCounts[t] = (tagCounts[t] || 0) + 1; });
  const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([t]) => t);

  // Pick extra recommendations based on picked tags
  const extraRecs = EXTRA_RECS.filter((e) => {
    const cat = e.category.toLowerCase();
    return topTags.some((t) => cat.includes(t) || t.includes(cat.slice(0, 4)));
  }).slice(0, 2);
  const finalRecs = extraRecs.length >= 2 ? extraRecs : EXTRA_RECS.slice(0, 2);

  if (phase === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-space-800 rounded-2xl p-6 border border-slate-700 text-center"
      >
        <div className="text-5xl mb-4">💡</div>
        <h2 className="text-2xl font-bold text-white mb-3">The Algorithm Effect</h2>
        <div className="bg-space-900 rounded-xl p-4 mb-5 text-left">
          <p className="text-slate-300 text-sm mb-3">
            What just happened to you is what happens to <span className="text-cyan-400 font-bold">billions of people every day</span>.
          </p>
          <p className="text-slate-300 text-sm mb-3">
            Algorithms watch what you click, like, and watch. Then they show you <span className="text-cyan-400 font-bold">more of the same</span> — creating a &ldquo;bubble&rdquo; where you only see things you already agree with.
          </p>
          <p className="text-slate-300 text-sm">
            This means you might <span className="text-cyan-500 font-bold">never discover</span> amazing things outside your bubble — unless you actively look for them!
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="px-6 py-3 bg-cyan-500 text-space-900 font-bold rounded-xl"
        >
          Continue
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="bg-space-800 rounded-2xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">🔍 Algorithm Audit</h2>
        <span className="text-cyan-400 text-sm font-mono">
          {phase === "pick" ? `Selected: ${selected.length}/4` : phase === "results" ? "Your Bubble" : "Hidden Content"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {phase === "pick" && (
          <motion.div key="pick" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-slate-300 text-sm mb-4">
              Here&apos;s your social media feed! Pick <span className="text-cyan-400 font-bold">4 posts</span> you&apos;d actually like or watch:
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {POSTS.map((post) => (
                <motion.button
                  key={post.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => togglePost(post.id)}
                  className={`p-3 rounded-xl border-2 text-left transition-colors ${
                    selected.includes(post.id)
                      ? "border-cyan-500 bg-cyan-500/10"
                      : selected.length >= 4
                      ? "border-slate-700 bg-space-900 opacity-40"
                      : "border-slate-700 bg-space-900 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">{post.emoji}</span>
                    <div>
                      <div className="text-xs text-cyan-400">{post.category}</div>
                      <div className="text-white text-sm">{post.description}</div>
                    </div>
                  </div>
                  {selected.includes(post.id) && (
                    <div className="text-cyan-400 text-xs mt-1 text-right">❤️ Liked</div>
                  )}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => selected.length === 4 && setPhase("results")}
              disabled={selected.length !== 4}
              className={`w-full py-3 font-bold rounded-xl ${
                selected.length === 4 ? "bg-cyan-500 text-space-900" : "bg-slate-700 text-slate-500 cursor-not-allowed"
              }`}
            >
              See What the Algorithm Does →
            </motion.button>
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-space-900 rounded-xl p-4 mb-4">
              <div className="text-xs text-slate-500 mb-1">🤖 ALGORITHM ANALYSIS</div>
              <p className="text-slate-300 text-sm mb-2">
                Based on your likes, the AI thinks you enjoy:{" "}
                <span className="text-cyan-400 font-bold">{topTags.join(", ")}</span>
              </p>
            </div>

            <h3 className="text-white font-bold mb-2">📱 Your New Recommendations:</h3>
            <div className="space-y-2 mb-4">
              {recommended.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 flex items-center gap-3"
                >
                  <span className="text-2xl">{post.emoji}</span>
                  <div>
                    <div className="text-xs text-cyan-400">{post.category} — Recommended for you</div>
                    <div className="text-white text-sm">{post.description}</div>
                  </div>
                </motion.div>
              ))}
              {finalRecs.map((rec, i) => (
                <motion.div
                  key={`extra-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 flex items-center gap-3"
                >
                  <span className="text-2xl">{rec.emoji}</span>
                  <div>
                    <div className="text-xs text-cyan-400">{rec.category} — Recommended for you</div>
                    <div className="text-white text-sm">{rec.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-slate-300 text-sm mb-4">
              Notice how everything looks similar? The algorithm is showing you <span className="text-cyan-400 font-bold">more of what you already like</span>.
              But what about everything else?
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPhase("hidden")}
              className="w-full py-3 bg-cyan-500 text-space-900 font-bold rounded-xl"
            >
              See What You&apos;ll NEVER See →
            </motion.button>
          </motion.div>
        )}

        {phase === "hidden" && (
          <motion.div key="hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
              <h3 className="text-red-400 font-bold mb-2">🚫 Hidden from Your Feed:</h3>
              <p className="text-slate-300 text-sm mb-3">
                The algorithm decided you wouldn&apos;t be interested in these — so you&apos;d <span className="text-red-400 font-bold">never see them</span>:
              </p>
              <div className="space-y-2">
                {hidden.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-space-900 rounded-lg p-3 flex items-center gap-3"
                  >
                    <span className="text-2xl">{post.emoji}</span>
                    <div>
                      <div className="text-xs text-red-400/60">{post.category} — Filtered out</div>
                      <div className="text-white text-sm">{post.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-space-900 rounded-xl p-4 mb-4">
              <h3 className="text-cyan-400 font-bold mb-2">🫧 You&apos;re in a Filter Bubble!</h3>
              <p className="text-slate-300 text-sm">
                The algorithm only showed you things matching your interests. That means you&apos;d miss out on awesome content about{" "}
                <span className="text-white font-bold">{hidden.map((h) => h.category.toLowerCase()).join(" and ")}</span>.
                Imagine this happening every day for years — your world gets smaller and smaller!
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPhase("done")}
              className="w-full py-3 bg-cyan-500 text-space-900 font-bold rounded-xl"
            >
              See the Big Picture →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
