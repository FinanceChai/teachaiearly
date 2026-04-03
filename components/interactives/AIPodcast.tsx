"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const TOPICS = [
  { id: "space", emoji: "🚀", title: "Life on Mars", description: "Could humans really live on Mars? What would daily life look like?" },
  { id: "ocean", emoji: "🌊", title: "Deep Sea Mysteries", description: "We've explored less of the ocean floor than the surface of Mars!" },
  { id: "games", emoji: "🎮", title: "How Video Games Are Made", description: "From concept art to code — the secret world of game development." },
  { id: "animals", emoji: "🐾", title: "Animal Superpowers", description: "Mantis shrimp see 16 colors, electric eels stun prey — nature is wild!" },
];

const INTROS: Record<string, string[]> = {
  space: [
    "Welcome to Future Cast! Today we're blasting off to the Red Planet to explore what life on Mars could really look like.",
    "Hey everyone! Imagine waking up, looking out your window, and seeing a red desert stretching to the horizon. That's Mars — and today we're going there!",
    "What if I told you that kids born today might be the first to live on another planet? Buckle up — this is going to be an amazing ride!",
  ],
  ocean: [
    "Dive in with us today as we explore the deepest, darkest parts of our ocean — where sunlight never reaches and creatures glow in the dark!",
    "Welcome back, explorers! Did you know we have better maps of Mars than we do of our own ocean floor? Today, we're changing that.",
    "Picture this: you're in a submarine, 3 miles underwater, and something blinks at you in the darkness. That's where our story begins!",
  ],
  games: [
    "Press start! Today we're going behind the scenes to discover how your favorite video games go from an idea in someone's head to the screen in your hands.",
    "What if I told you that making one video game can take hundreds of people and years of work? Welcome to the wild world of game development!",
    "Hey gamers! Ever wondered why some games feel SO good to play? Today we're cracking open the secrets of game design.",
  ],
  animals: [
    "Welcome to Wild Science! Today we're discovering animals with abilities so incredible, they'd make superheroes jealous.",
    "What has 16 color receptors, punches faster than a bullet, and lives in the ocean? The mantis shrimp — and that's just the start of today's episode!",
    "Hey nature fans! Get ready to have your mind blown — the animal kingdom has powers that scientists are STILL trying to understand.",
  ],
};

const SOUND_EFFECTS = [
  { id: "whoosh", emoji: "💨", name: "Sci-Fi Whoosh", description: "A dramatic swooshing transition sound" },
  { id: "ding", emoji: "🔔", name: "Fun Ding", description: "A bright chime for fun facts" },
  { id: "drumroll", emoji: "🥁", name: "Drumroll", description: "Building suspense before a big reveal" },
  { id: "pop", emoji: "🫧", name: "Bubble Pop", description: "A playful pop for transitions" },
  { id: "magic", emoji: "✨", name: "Magic Sparkle", description: "A twinkling magical sound effect" },
];

const MUSIC_OPTIONS = [
  { id: "upbeat", emoji: "🎵", name: "Upbeat & Fun", description: "Energetic background music that keeps things moving" },
  { id: "chill", emoji: "🎶", name: "Chill Lofi", description: "Relaxed, mellow beats for a cozy vibe" },
  { id: "epic", emoji: "🎻", name: "Epic Orchestra", description: "Dramatic strings and horns for big moments" },
  { id: "electronic", emoji: "🎹", name: "Synth Wave", description: "Futuristic electronic beats" },
];

const CONCLUSIONS: Record<string, string[]> = {
  space: [
    "And that's our journey to Mars! Remember — the future of space exploration might be in YOUR hands. Keep looking up!",
    "Thanks for exploring the Red Planet with us! Who knows — maybe one of YOU will be the first kid on Mars. See you next time!",
  ],
  ocean: [
    "That's a wrap on our deep sea dive! The ocean still holds millions of secrets — maybe you'll be the one to discover them!",
    "Thanks for diving deep with us today! Remember, there's a whole world under the waves waiting to be explored. Until next time!",
  ],
  games: [
    "Game over... just kidding! We're just getting started. Now that you know how games are made, maybe you'll create the next big hit!",
    "And that's how the magic happens! Next time you play your favorite game, you'll see it in a whole new way. Thanks for joining us!",
  ],
  animals: [
    "Nature is the greatest inventor of all time — and we've barely scratched the surface! Thanks for going wild with us today!",
    "That's all for today's animal adventure! Remember, every creature on Earth has something amazing about it — including you! See you next time!",
  ],
};

type Step = "topic" | "intro" | "effects" | "arrange" | "produce" | "done";

interface Segment {
  type: "intro" | "content" | "effect" | "conclusion";
  label: string;
  emoji: string;
}

export function AIPodcast({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<Step>("topic");
  const [topic, setTopic] = useState<string | null>(null);
  const [customIntro, setCustomIntro] = useState("");
  const [selectedIntro, setSelectedIntro] = useState<number | null>(null);
  const [useCustom, setUseCustom] = useState(false);
  const [selectedEffects, setSelectedEffects] = useState<Set<string>>(new Set());
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [selectedConclusion, setSelectedConclusion] = useState<number>(0);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [producing, setProducing] = useState(false);
  const [produceStep, setProduceStep] = useState(-1);

  // --- STEP 1: TOPIC ---
  if (step === "topic") {
    return (
      <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-5">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">AI Podcast Studio</h3>
          <p className="text-slate-600 text-sm">
            Create your own podcast episode! First, pick a topic:
          </p>
          <div className="flex gap-1 justify-center">
            {["topic", "intro", "effects", "arrange", "produce"].map((s, i) => (
              <div key={s} className={`h-1.5 w-8 rounded-full ${i === 0 ? "bg-violet-500" : "bg-slate-700"}`} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOPICS.map((t) => (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setTopic(t.id); setStep("intro"); }}
              className="text-left p-4 bg-space-800 border-2 border-slate-200 hover:border-violet-400 rounded-xl transition-all"
            >
              <span className="text-2xl">{t.emoji}</span>
              <p className="text-slate-900 font-bold text-sm mt-1">{t.title}</p>
              <p className="text-xs text-slate-400 mt-1">{t.description}</p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const topicData = TOPICS.find((t) => t.id === topic)!;
  const introOptions = topic ? INTROS[topic] : [];
  const conclusionOptions = topic ? CONCLUSIONS[topic] : [];

  // --- STEP 2: INTRO ---
  if (step === "intro") {
    return (
      <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-5">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">
            {topicData.emoji} Write Your Intro
          </h3>
          <p className="text-slate-600 text-sm">
            Pick an AI-suggested intro or write your own!
          </p>
          <div className="flex gap-1 justify-center">
            {["topic", "intro", "effects", "arrange", "produce"].map((s, i) => (
              <div key={s} className={`h-1.5 w-8 rounded-full ${i <= 1 ? "bg-violet-500" : "bg-slate-700"}`} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-violet-400 font-semibold">AI-Suggested Intros:</p>
          {introOptions.map((intro, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedIntro(i); setUseCustom(false); }}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all text-sm ${
                !useCustom && selectedIntro === i
                  ? "border-violet-400 bg-violet-500/20 text-slate-900"
                  : "border-slate-200 bg-space-800 text-slate-600 hover:border-slate-300"
              }`}
            >
              {intro}
            </motion.button>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs text-violet-400 font-semibold">Or write your own:</p>
          <textarea
            value={customIntro}
            onChange={(e) => { setCustomIntro(e.target.value); setUseCustom(true); setSelectedIntro(null); }}
            placeholder="Type your custom intro here..."
            className="w-full p-3 bg-space-800 border border-slate-200 rounded-lg text-slate-900 text-sm placeholder-slate-500 focus:outline-none focus:border-violet-400 resize-none h-20"
          />
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={() => setStep("topic")} className="px-4 py-2 bg-space-800 border border-slate-200 text-slate-600 rounded-lg text-sm">
            Back
          </button>
          <button
            onClick={() => setStep("effects")}
            disabled={selectedIntro === null && !customIntro.trim()}
            className="px-5 py-2 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-400 text-slate-900 font-bold rounded-lg text-sm"
          >
            Next: Sound Effects
          </button>
        </div>
      </div>
    );
  }

  // --- STEP 3: EFFECTS & MUSIC ---
  if (step === "effects") {
    return (
      <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-5">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">Choose Your Sounds</h3>
          <p className="text-slate-600 text-sm">Pick sound effects and background music!</p>
          <div className="flex gap-1 justify-center">
            {["topic", "intro", "effects", "arrange", "produce"].map((s, i) => (
              <div key={s} className={`h-1.5 w-8 rounded-full ${i <= 2 ? "bg-violet-500" : "bg-slate-700"}`} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-violet-400 font-semibold">Sound Effects (pick 1-3):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SOUND_EFFECTS.map((fx) => {
              const selected = selectedEffects.has(fx.id);
              return (
                <motion.button
                  key={fx.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const next = new Set(selectedEffects);
                    if (selected) next.delete(fx.id); else if (next.size < 3) next.add(fx.id);
                    setSelectedEffects(next);
                  }}
                  className={`text-left p-3 rounded-lg border-2 transition-all ${
                    selected ? "border-violet-400 bg-violet-500/20" : "border-slate-200 bg-space-800 hover:border-slate-300"
                  }`}
                >
                  <span className="text-lg">{fx.emoji}</span>
                  <p className="text-slate-900 text-sm font-medium">{fx.name}</p>
                  <p className="text-xs text-slate-400">{fx.description}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-violet-400 font-semibold">Background Music:</p>
          <div className="grid grid-cols-2 gap-2">
            {MUSIC_OPTIONS.map((m) => (
              <motion.button
                key={m.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedMusic(m.id)}
                className={`text-left p-3 rounded-lg border-2 transition-all ${
                  selectedMusic === m.id ? "border-violet-400 bg-violet-500/20" : "border-slate-200 bg-space-800 hover:border-slate-300"
                }`}
              >
                <span className="text-lg">{m.emoji}</span>
                <p className="text-slate-900 text-xs font-medium">{m.name}</p>
                <p className="text-[10px] text-slate-400">{m.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-violet-400 font-semibold">Conclusion:</p>
          <div className="space-y-2">
            {conclusionOptions.map((c, i) => (
              <button
                key={i}
                onClick={() => setSelectedConclusion(i)}
                className={`w-full text-left p-2 rounded-lg border-2 text-sm transition-all ${
                  selectedConclusion === i ? "border-violet-400 bg-violet-500/20 text-slate-900" : "border-slate-200 bg-space-800 text-slate-600"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={() => setStep("intro")} className="px-4 py-2 bg-space-800 border border-slate-200 text-slate-600 rounded-lg text-sm">
            Back
          </button>
          <button
            onClick={() => {
              // Build segments
              const introText = useCustom ? customIntro : introOptions[selectedIntro ?? 0];
              const segs: Segment[] = [
                { type: "intro", label: introText.slice(0, 60) + "...", emoji: "🎙️" },
                { type: "content", label: `Main content about ${topicData.title}`, emoji: topicData.emoji },
              ];
              const effectsList = SOUND_EFFECTS.filter((fx) => selectedEffects.has(fx.id));
              effectsList.forEach((fx) => {
                segs.push({ type: "effect", label: fx.name, emoji: fx.emoji });
              });
              segs.push({ type: "conclusion", label: conclusionOptions[selectedConclusion].slice(0, 60) + "...", emoji: "👋" });
              setSegments(segs);
              setStep("arrange");
            }}
            disabled={selectedEffects.size === 0 || !selectedMusic}
            className="px-5 py-2 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-400 text-slate-900 font-bold rounded-lg text-sm"
          >
            Next: Arrange
          </button>
        </div>
      </div>
    );
  }

  const moveSegment = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= segments.length) return;
    const next = [...segments];
    [next[idx], next[target]] = [next[target], next[idx]];
    setSegments(next);
  };

  // --- STEP 4: ARRANGE ---
  if (step === "arrange") {
    return (
      <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-5">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">Arrange Your Episode</h3>
          <p className="text-slate-600 text-sm">
            Drag or use arrows to reorder segments. Put them in the order that tells the best story!
          </p>
          <div className="flex gap-1 justify-center">
            {["topic", "intro", "effects", "arrange", "produce"].map((s, i) => (
              <div key={s} className={`h-1.5 w-8 rounded-full ${i <= 3 ? "bg-violet-500" : "bg-slate-700"}`} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {segments.map((seg, i) => (
            <motion.div
              key={`${seg.type}-${seg.label}-${i}`}
              layout
              className="flex items-center gap-2 p-3 bg-space-800 border border-slate-200 rounded-lg"
            >
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveSegment(i, -1)}
                  disabled={i === 0}
                  className="text-xs text-slate-400 hover:text-violet-400 disabled:text-slate-300"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveSegment(i, 1)}
                  disabled={i === segments.length - 1}
                  className="text-xs text-slate-400 hover:text-violet-400 disabled:text-slate-300"
                >
                  ▼
                </button>
              </div>
              <span className="text-lg">{seg.emoji}</span>
              <div className="flex-1">
                <p className="text-xs text-violet-400 font-semibold uppercase">{seg.type}</p>
                <p className="text-slate-900 text-sm">{seg.label}</p>
              </div>
              <span className="text-xs text-slate-400 font-mono">#{i + 1}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={() => setStep("effects")} className="px-4 py-2 bg-space-800 border border-slate-200 text-slate-600 rounded-lg text-sm">
            Back
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setStep("produce");
              setProducing(true);
              setProduceStep(0);
              let s = 0;
              const interval = setInterval(() => {
                s++;
                if (s >= segments.length) {
                  clearInterval(interval);
                  setProducing(false);
                  setProduceStep(segments.length);
                } else {
                  setProduceStep(s);
                }
              }, 800);
            }}
            className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-slate-900 font-bold rounded-lg text-sm"
          >
            🎬 Produce Episode!
          </motion.button>
        </div>
      </div>
    );
  }

  // --- STEP 5: PRODUCE ---
  if (step === "produce") {
    const musicData = MUSIC_OPTIONS.find((m) => m.id === selectedMusic);
    const allDone = !producing && produceStep >= segments.length;

    return (
      <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-5">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">
            {producing ? "Producing..." : "Episode Complete!"}
          </h3>
          <div className="flex gap-1 justify-center">
            {["topic", "intro", "effects", "arrange", "produce"].map((s, i) => (
              <div key={s} className="h-1.5 w-8 rounded-full bg-violet-500" />
            ))}
          </div>
          {musicData && (
            <p className="text-xs text-slate-400">
              {musicData.emoji} Background: {musicData.name}
            </p>
          )}
        </div>

        {/* Production timeline */}
        <div className="space-y-2">
          {segments.map((seg, i) => {
            const isActive = produceStep === i && producing;
            const isDone = produceStep > i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0.4 }}
                animate={{
                  opacity: isDone || isActive ? 1 : 0.4,
                  scale: isActive ? 1.02 : 1,
                }}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                  isActive
                    ? "border-violet-400 bg-violet-500/20"
                    : isDone
                    ? "border-green-500/40 bg-green-500/10"
                    : "border-slate-200 bg-space-800"
                }`}
              >
                <span className="text-lg">{isActive ? "⏳" : isDone ? "✅" : seg.emoji}</span>
                <div className="flex-1">
                  <p className="text-xs text-violet-400 font-semibold uppercase">{seg.type}</p>
                  <p className="text-slate-900 text-sm">{seg.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 rounded-full h-2">
          <motion.div
            className="bg-violet-500 h-2 rounded-full"
            animate={{ width: `${(produceStep / segments.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-3"
          >
            <p className="text-green-400 font-bold text-lg">
              🎉 Your podcast episode is ready!
            </p>
            <div className="bg-space-800 rounded-lg border border-slate-200 p-3 text-left">
              <p className="text-violet-400 text-sm font-bold">{topicData.emoji} {topicData.title}</p>
              <p className="text-xs text-slate-400 mt-1">
                {segments.length} segments | {musicData?.name} background |{" "}
                {selectedEffects.size} sound effects
              </p>
            </div>
            <p className="text-xs text-slate-400">
              Real podcast producers use AI tools for editing, sound effects, and even generating background music.
              You just experienced the creative process!
            </p>
            <button
              onClick={() => { setStep("done"); onComplete(); }}
              className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-slate-900 font-bold rounded-lg"
            >
              Complete Challenge!
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  // --- DONE ---
  return (
    <div className="p-4 sm:p-6 bg-space-900 rounded-xl border border-slate-200 space-y-4 text-center">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <p className="text-4xl mb-2">🎙️</p>
        <h3 className="text-xl font-bold text-slate-900">Podcast Producer!</h3>
        <p className="text-violet-400 font-semibold">Challenge Complete!</p>
        <p className="text-slate-600 text-sm mt-2">
          You created a full podcast episode from scratch — choosing a topic, writing an intro,
          picking sounds, and arranging everything. Real podcast creators use AI for many of these steps!
        </p>
        <p className="text-xs text-slate-400 mt-3">
          Fun fact: AI tools like Descript can edit podcasts by editing the text transcript —
          delete a word from the text, and it removes it from the audio too!
        </p>
      </motion.div>
    </div>
  );
}
