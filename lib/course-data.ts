export type Tier = "free" | "paid";
export type InteractiveType =
  | "rule-robot-vs-ai"
  | "spot-the-ai"
  | "who-does-it-better"
  | "timeline-builder"
  | "ai-spotter-challenge"
  | "teach-the-sorter"
  | "data-chef"
  | "guess-the-next"
  | "stump-the-ai"
  | "training-tracker"
  | "train-classifier-challenge"
  | "ai-game-show"
  | "word-map"
  | "finish-my-sentence"
  | "prompt-showdown"
  | "translation-telephone"
  | "co-author"
  | "prompt-lab"
  | "zoom-in"
  | "feature-finder"
  | "photo-coach"
  | "face-parts"
  | "trick-the-eye"
  | "vision-classifier"
  | "creative-or-copy"
  | "dream-machine"
  | "beat-builder"
  | "style-mixer"
  | "directors-chair"
  | "creative-showcase"
  | "biased-bots"
  | "design-dilemmas"
  | "truth-detective"
  | "data-trail"
  | "rule-maker"
  | "future-forecaster"
  | "ethics-board"
  // World 7: AI & Sound
  | "waveform-explorer"
  | "voice-pipeline"
  | "melody-maker"
  | "voice-lineup"
  | "ai-podcast"
  // World 8: AI & Games
  | "npc-brain-mapper"
  | "ai-battle-timeline"
  | "reward-trainer"
  | "level-generator"
  | "fair-play-judge"
  | "game-designer-challenge"
  // World 9: AI & Robots
  | "robot-or-puppet"
  | "self-driving-sim"
  | "robot-designer"
  | "robot-rights-debate"
  | "robot-pitch"
  // World 10: AI & You
  | "algorithm-audit"
  | "bubble-breaker"
  | "smart-home-mapper"
  | "health-tracker-sim"
  | "settings-safari"
  | "ai-life-audit"
  // World 11: Building with AI
  | "toolkit-tour"
  | "project-scoper"
  | "prototype-builder"
  | "feedback-loop"
  | "project-showcase"
  | "portfolio-piece"
  // World 12: AI Futures
  | "future-bingo"
  | "ai-for-good"
  | "risk-o-meter"
  | "future-letter"
  | "ai-manifesto"
  | "locked";

export interface Lesson {
  id: string; // "1-1"
  worldId: number;
  lessonNumber: number;
  title: string;
  concept: string;
  interactiveType: InteractiveType;
  interactiveTitle: string;
  dinnerTakeaway: string;
  xpReward: number;
}

export interface WorldChallenge {
  title: string;
  description: string;
  badgeName: string;
  badgeEmoji: string;
  interactiveType: InteractiveType;
  xpReward: number;
}

export interface World {
  id: number;
  title: string;
  subtitle: string;
  theme: string;
  emoji: string;
  color: string;      // tailwind color class
  bgColor: string;    // tailwind bg class
  ringColor: string;  // tailwind ring class
  textColor: string;  // tailwind text class
  gradientFrom: string;
  gradientTo: string;
  hex: string;        // raw hex for inline styles
  tier: Tier;
  lessons: Lesson[];
  challenge: WorldChallenge;
}

export const WORLDS: World[] = [
  {
    id: 1,
    title: "What is AI?",
    subtitle: "Welcome to the Machine Mind",
    theme: "Demystify AI — it's not magic, not a brain, not a movie robot",
    emoji: "🤖",
    color: "teal",
    bgColor: "bg-teal-500",
    ringColor: "ring-teal-400",
    textColor: "text-teal-400",
    gradientFrom: "from-teal-500",
    gradientTo: "to-cyan-400",
    hex: "#14b8a6",
    tier: "free",
    lessons: [
      {
        id: "1-1",
        worldId: 1,
        lessonNumber: 1,
        title: "Smart vs. Programmed",
        concept:
          "Calculators follow exact rules and break when something unexpected happens. AI learns from examples and adapts — that's the big difference.",
        interactiveType: "rule-robot-vs-ai",
        interactiveTitle: "Rule Robot vs. Learning Robot",
        dinnerTakeaway:
          "A calculator follows rules, but AI learns from examples — that's the big difference!",
        xpReward: 50,
      },
      {
        id: "1-2",
        worldId: 1,
        lessonNumber: 2,
        title: "AI is Everywhere",
        concept:
          "AI is already in everyday tech kids use — but not everything 'tech' uses AI. The key question: does it learn and adapt, or follow fixed rules?",
        interactiveType: "spot-the-ai",
        interactiveTitle: "Spot the AI",
        dinnerTakeaway:
          "AI is already in our phones, games, and email — it's not just in movies!",
        xpReward: 50,
      },
      {
        id: "1-3",
        worldId: 1,
        lessonNumber: 3,
        title: "What AI Can and Can't Do",
        concept:
          "AI is great at pattern recognition and processing massive data. But it struggles with common sense, emotions, true creativity, and knowing when to break rules.",
        interactiveType: "who-does-it-better",
        interactiveTitle: "Who Does It Better?",
        dinnerTakeaway:
          "AI is great at patterns but terrible at common sense — it can beat you at chess but can't tell you why a joke is funny!",
        xpReward: 50,
      },
      {
        id: "1-4",
        worldId: 1,
        lessonNumber: 4,
        title: "A Brief History of AI",
        concept:
          "AI isn't new — scientists have been building toward intelligent machines since the 1950s. Today's breakthroughs are built on decades of research.",
        interactiveType: "timeline-builder",
        interactiveTitle: "Timeline Builder",
        dinnerTakeaway:
          "Scientists have been working on AI since the 1950s — it's not new, but it's getting really powerful really fast!",
        xpReward: 50,
      },
    ],
    challenge: {
      title: "AM I AI? — The Game Show",
      description:
        "20 rapid-fire scenarios with a 5-second timer — slam ROBOT or NOT as fast as you can! Speed matters: faster correct answers score more points. Then flip the script and build trick scenarios to fool the AI host!",
      badgeName: "AI Spotter",
      badgeEmoji: "🔍",
      interactiveType: "ai-game-show",
      xpReward: 200,
    },
  },
  {
    id: 2,
    title: "How Machines Learn",
    subtitle: "The Training Ground",
    theme: "AI learns from data, not from being 'smart'",
    emoji: "🧠",
    color: "green",
    bgColor: "bg-green-500",
    ringColor: "ring-green-400",
    textColor: "text-green-400",
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-400",
    hex: "#22c55e",
    tier: "free",
    lessons: [
      {
        id: "2-1",
        worldId: 2,
        lessonNumber: 1,
        title: "Learning from Examples",
        concept:
          "Supervised learning: you show AI labeled examples and it finds patterns. More examples = better learning. AI doesn't start smart — it starts with zero knowledge.",
        interactiveType: "teach-the-sorter",
        interactiveTitle: "Teach the Sorter",
        dinnerTakeaway:
          "AI doesn't start smart — it starts with zero knowledge and learns everything from examples we give it!",
        xpReward: 50,
      },
      {
        id: "2-2",
        worldId: 2,
        lessonNumber: 2,
        title: "What is Training Data?",
        concept:
          "The data you feed AI determines what it learns. Biased or limited data = biased or limited AI. Garbage in, garbage out.",
        interactiveType: "data-chef",
        interactiveTitle: "Data Chef",
        dinnerTakeaway:
          "If you only teach AI about one thing, that's all it will ever know — garbage in, garbage out!",
        xpReward: 50,
      },
      {
        id: "2-3",
        worldId: 2,
        lessonNumber: 3,
        title: "Patterns and Predictions",
        concept:
          "AI finds patterns to make predictions about new things it hasn't seen. It's essentially a pattern-completion machine — like a super-powered guesser.",
        interactiveType: "guess-the-next",
        interactiveTitle: "Guess the Next",
        dinnerTakeaway:
          "AI is basically a super-powered pattern finder — it looks at tons of examples and figures out what comes next!",
        xpReward: 50,
      },
      {
        id: "2-4",
        worldId: 2,
        lessonNumber: 4,
        title: "When AI Gets It Wrong",
        concept:
          "AI makes mistakes, especially with bad data or novel situations. AI confidence does NOT equal correctness — it can be 99% sure and still be wrong.",
        interactiveType: "stump-the-ai",
        interactiveTitle: "Stump the AI",
        dinnerTakeaway:
          "Just because AI sounds confident doesn't mean it's right — always check important stuff yourself!",
        xpReward: 50,
      },
      {
        id: "2-5",
        worldId: 2,
        lessonNumber: 5,
        title: "Practice Makes Better (Not Perfect)",
        concept:
          "AI improves with more data and feedback but never reaches 100% accuracy. Diminishing returns are real — more data helps less and less over time.",
        interactiveType: "training-tracker",
        interactiveTitle: "Training Tracker",
        dinnerTakeaway:
          "AI gets better with practice, just like you do — but unlike you, it needs thousands of examples instead of just a few!",
        xpReward: 50,
      },
    ],
    challenge: {
      title: "Train Your Own Classifier",
      description:
        "Pick a category, provide training examples, test your model, and see accuracy scores. Can you build a working classifier?",
      badgeName: "Data Trainer",
      badgeEmoji: "📊",
      interactiveType: "train-classifier-challenge",
      xpReward: 150,
    },
  },
  {
    id: 3,
    title: "Language & AI",
    subtitle: "The Word Lab",
    theme: "Understand how AI reads, writes, and talks",
    emoji: "💬",
    color: "purple",
    bgColor: "bg-purple-500",
    ringColor: "ring-purple-400",
    textColor: "text-purple-400",
    gradientFrom: "from-purple-500",
    gradientTo: "to-violet-400",
    hex: "#a855f7",
    tier: "paid",
    lessons: [
      {
        id: "3-1",
        worldId: 3,
        lessonNumber: 1,
        title: "How AI Reads",
        concept:
          "AI doesn't understand words like humans — it converts them to numbers and maps relationships between them (word embeddings). Similar words have similar numbers.",
        interactiveType: "word-map",
        interactiveTitle: "Word Map",
        dinnerTakeaway:
          "To an AI, every word is actually a bunch of numbers — and similar words have similar numbers!",
        xpReward: 50,
      },
      {
        id: "3-2",
        worldId: 3,
        lessonNumber: 2,
        title: "Predicting the Next Word",
        concept:
          "Language models work by predicting what word comes next, repeatedly. Chatbots are sophisticated autocomplete — nothing more, nothing less.",
        interactiveType: "finish-my-sentence",
        interactiveTitle: "Finish My Sentence",
        dinnerTakeaway:
          "Chatbots like ChatGPT are basically super-advanced autocomplete — they just predict the next word, over and over!",
        xpReward: 50,
      },
      {
        id: "3-3",
        worldId: 3,
        lessonNumber: 3,
        title: "The Art of Asking (Prompt Craft)",
        concept:
          "How you phrase a question to AI dramatically changes the output. Specificity, context, and structure matter — a lot.",
        interactiveType: "prompt-showdown",
        interactiveTitle: "Prompt Showdown",
        dinnerTakeaway:
          "The secret to getting great answers from AI? Ask great questions — be specific about what you want!",
        xpReward: 50,
      },
      {
        id: "3-4",
        worldId: 3,
        lessonNumber: 4,
        title: "Lost in Translation",
        concept:
          "AI can translate languages but sometimes misses context, humor, idioms, and cultural nuance. It's fast but not always perfect.",
        interactiveType: "translation-telephone",
        interactiveTitle: "Translation Telephone",
        dinnerTakeaway:
          "AI can translate languages super fast, but it sometimes misses jokes, sayings, and things that only make sense in one culture!",
        xpReward: 50,
      },
      {
        id: "3-5",
        worldId: 3,
        lessonNumber: 5,
        title: "AI as a Writing Partner",
        concept:
          "AI can help with writing but can't replace human ideas, voice, and lived experience. Your ideas and your voice are what make writing special.",
        interactiveType: "co-author",
        interactiveTitle: "Co-Author",
        dinnerTakeaway:
          "AI can help you write, but YOUR ideas and YOUR voice are what make writing special!",
        xpReward: 50,
      },
    ],
    challenge: {
      title: "Prompt Lab",
      description:
        "Craft prompts to get AI to produce specific outputs. Scored on creativity and precision.",
      badgeName: "Prompt Master",
      badgeEmoji: "✍️",
      interactiveType: "prompt-lab",
      xpReward: 150,
    },
  },
  {
    id: 4,
    title: "Vision & AI",
    subtitle: "Through Robot Eyes",
    theme: "Understand how AI sees and interprets images",
    emoji: "👁️",
    color: "pink",
    bgColor: "bg-pink-500",
    ringColor: "ring-pink-400",
    textColor: "text-pink-400",
    gradientFrom: "from-pink-500",
    gradientTo: "to-rose-400",
    hex: "#ec4899",
    tier: "paid",
    lessons: [
      {
        id: "4-1",
        worldId: 4,
        lessonNumber: 1,
        title: "Pixels and Patterns",
        concept:
          "AI sees images as grids of numbers (pixels), not objects. It must build understanding from millions of tiny colored squares — starting from zero.",
        interactiveType: "zoom-in",
        interactiveTitle: "Zoom In",
        dinnerTakeaway:
          "AI doesn't see pictures like we do — it sees millions of tiny colored squares and has to figure out what they mean!",
        xpReward: 50,
      },
      {
        id: "4-2",
        worldId: 4,
        lessonNumber: 2,
        title: "Finding Edges and Shapes",
        concept:
          "AI breaks images into layers of features: edges first, then shapes, then parts, then full objects. Like a detective putting clues together.",
        interactiveType: "feature-finder",
        interactiveTitle: "Feature Finder",
        dinnerTakeaway:
          "AI builds up from edges to shapes to parts to objects — like a detective putting together clues!",
        xpReward: 50,
      },
      {
        id: "4-3",
        worldId: 4,
        lessonNumber: 3,
        title: "Teaching AI to See",
        concept:
          "Image classifiers learn from thousands of labeled examples. Edge cases are genuinely hard — even humans disagree on them.",
        interactiveType: "photo-coach",
        interactiveTitle: "Photo Coach",
        dinnerTakeaway:
          "To teach AI to recognize anything, you need thousands of examples — and even then, weird edge cases will trip it up!",
        xpReward: 50,
      },
      {
        id: "4-4",
        worldId: 4,
        lessonNumber: 4,
        title: "Faces and Recognition",
        concept:
          "Facial recognition works by measuring face geometry — distance between eyes, jaw shape, nose width. It's powerful and controversial.",
        interactiveType: "face-parts",
        interactiveTitle: "Face Parts",
        dinnerTakeaway:
          "AI can recognize faces by measuring the distance between your eyes, nose, and mouth — like a face fingerprint!",
        xpReward: 50,
      },
      {
        id: "4-5",
        worldId: 4,
        lessonNumber: 5,
        title: "When AI Sees Things That Aren't There",
        concept:
          "Adversarial examples: tiny changes to images that fool AI but not humans. A panda can become a toaster with just a few pixel tweaks.",
        interactiveType: "trick-the-eye",
        interactiveTitle: "Trick the Eye",
        dinnerTakeaway:
          "You can trick AI by changing just a few tiny pixels in a picture — things so small you can't even see the difference!",
        xpReward: 50,
      },
    ],
    challenge: {
      title: "Build a Vision Classifier",
      description:
        "Pick a theme, provide training images, and build your own working image classifier!",
      badgeName: "Vision Builder",
      badgeEmoji: "🔭",
      interactiveType: "vision-classifier",
      xpReward: 150,
    },
  },
  {
    id: 5,
    title: "AI & Creativity",
    subtitle: "The Imagination Engine",
    theme: "Explore what AI can create and what creativity really means",
    emoji: "🎨",
    color: "blue",
    bgColor: "bg-blue-500",
    ringColor: "ring-blue-400",
    textColor: "text-blue-400",
    gradientFrom: "from-blue-500",
    gradientTo: "to-sky-400",
    hex: "#3b82f6",
    tier: "paid",
    lessons: [
      {
        id: "5-1",
        worldId: 5,
        lessonNumber: 1,
        title: "Can AI Be Creative?",
        concept:
          "AI generates new content by remixing patterns from training data. Is recombination the same as creativity? Philosophy meets technology.",
        interactiveType: "creative-or-copy",
        interactiveTitle: "Creative or Copy?",
        dinnerTakeaway:
          "AI creates new things by mixing up patterns from millions of examples — but is remixing the same as being creative? You decide!",
        xpReward: 50,
      },
      {
        id: "5-2",
        worldId: 5,
        lessonNumber: 2,
        title: "How AI Makes Images",
        concept:
          "Text-to-image models turn descriptions into pictures by learning from millions of image-text pairs. Same prompt, different results every time.",
        interactiveType: "dream-machine",
        interactiveTitle: "Dream Machine",
        dinnerTakeaway:
          "AI can turn words into pictures by learning what millions of images look like — but every time you ask, you get something different!",
        xpReward: 50,
      },
      {
        id: "5-3",
        worldId: 5,
        lessonNumber: 3,
        title: "AI Music and Sound",
        concept:
          "AI composes music by learning patterns in melody, rhythm, and harmony. But humans make the creative decisions — what to make and why.",
        interactiveType: "beat-builder",
        interactiveTitle: "Beat Builder",
        dinnerTakeaway:
          "AI can write music by copying patterns from thousands of songs, but it takes a human to decide WHAT kind of music to make and WHY!",
        xpReward: 50,
      },
      {
        id: "5-4",
        worldId: 5,
        lessonNumber: 4,
        title: "The Remix Question",
        concept:
          "AI art is trained on human art. Is that fair to artists? Questions about learning vs copying, attribution, and consent don't have easy answers.",
        interactiveType: "style-mixer",
        interactiveTitle: "Style Mixer",
        dinnerTakeaway:
          "AI art is trained by studying millions of human artworks — which raises big questions about fairness and giving credit to artists!",
        xpReward: 50,
      },
      {
        id: "5-5",
        worldId: 5,
        lessonNumber: 5,
        title: "Humans + AI Together",
        concept:
          "The most interesting creative work combines human vision with AI execution. Human = the why, AI = the how. You're the creative director.",
        interactiveType: "directors-chair",
        interactiveTitle: "Director's Chair",
        dinnerTakeaway:
          "The best AI creativity happens when humans and AI work as a team — you bring the ideas, AI helps make them real!",
        xpReward: 50,
      },
    ],
    challenge: {
      title: "Creative Showcase",
      description:
        "Create a mini project — a short story, mood board, or song concept — using AI tools and your own ideas.",
      badgeName: "Creative Director",
      badgeEmoji: "🎬",
      interactiveType: "creative-showcase",
      xpReward: 150,
    },
  },
  {
    id: 6,
    title: "AI Ethics",
    subtitle: "The Judgment Zone",
    theme: "Equip kids to think critically about AI in their lives",
    emoji: "⚖️",
    color: "orange",
    bgColor: "bg-orange-500",
    ringColor: "ring-orange-400",
    textColor: "text-orange-400",
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-400",
    hex: "#f97316",
    tier: "paid",
    lessons: [
      {
        id: "6-1",
        worldId: 6,
        lessonNumber: 1,
        title: "Bias In, Bias Out",
        concept:
          "AI inherits biases from its training data and builders. Biased data produces biased outcomes — and biased AI can hurt real people.",
        interactiveType: "biased-bots",
        interactiveTitle: "Biased Bots",
        dinnerTakeaway:
          "If you train AI on unfair examples, it will make unfair decisions — that's why the data we use matters so much!",
        xpReward: 50,
      },
      {
        id: "6-2",
        worldId: 6,
        lessonNumber: 2,
        title: "Who Decides?",
        concept:
          "Humans make value-laden choices at every step of AI development. There is no 'neutral' AI — values are embedded in every system.",
        interactiveType: "design-dilemmas",
        interactiveTitle: "Design Dilemmas",
        dinnerTakeaway:
          "Every AI was designed by people who had to make choices about what's 'right' and 'wrong' — there's no such thing as a neutral AI!",
        xpReward: 50,
      },
      {
        id: "6-3",
        worldId: 6,
        lessonNumber: 3,
        title: "Real or Fake?",
        concept:
          "AI can generate realistic fake content: deepfakes, synthetic text, fabricated images. Critical literacy is more important than ever.",
        interactiveType: "truth-detective",
        interactiveTitle: "Truth Detective",
        dinnerTakeaway:
          "AI can now create fake images, text, and videos that look totally real — that's why it's so important to check your sources!",
        xpReward: 50,
      },
      {
        id: "6-4",
        worldId: 6,
        lessonNumber: 4,
        title: "Privacy and Your Data",
        concept:
          "AI needs data to function. That data often comes from people — sometimes without their full awareness or consent.",
        interactiveType: "data-trail",
        interactiveTitle: "Data Trail",
        dinnerTakeaway:
          "Every time you use an app, you leave a data trail — knowing what's being collected helps you make better choices!",
        xpReward: 50,
      },
      {
        id: "6-5",
        worldId: 6,
        lessonNumber: 5,
        title: "AI Rules: Who Makes Them?",
        concept:
          "Governments, companies, and communities are all trying to establish governance frameworks for AI. Your opinion matters.",
        interactiveType: "rule-maker",
        interactiveTitle: "Rule Maker",
        dinnerTakeaway:
          "Just like we have rules for driving and building things, people around the world are creating rules for AI — and your opinion matters!",
        xpReward: 50,
      },
      {
        id: "6-6",
        worldId: 6,
        lessonNumber: 6,
        title: "Your AI Future",
        concept:
          "AI will keep evolving. The most important skill is knowing how to think about it critically and adapt. You are the generation that will shape AI.",
        interactiveType: "future-forecaster",
        interactiveTitle: "Future Forecaster",
        dinnerTakeaway:
          "You're growing up at the most important time in AI history — what you learn now will help you shape how AI is used in the future!",
        xpReward: 50,
      },
    ],
    challenge: {
      title: "Ethics Board",
      description:
        "You're presented with a real-world AI scenario. Write a short recommendation: should it be used? Why or why not?",
      badgeName: "Ethics Guardian",
      badgeEmoji: "🛡️",
      interactiveType: "ethics-board",
      xpReward: 150,
    },
  },
  // ─── WORLD 7: AI & Sound (PRO) ───────────────────────────────────────
  {
    id: 7,
    title: "AI & Sound",
    subtitle: "Machines That Listen",
    theme: "How AI processes sound, speech, and music",
    emoji: "🔊",
    color: "violet",
    bgColor: "bg-violet-500",
    ringColor: "ring-violet-400",
    textColor: "text-violet-400",
    gradientFrom: "from-violet-500",
    gradientTo: "to-purple-400",
    hex: "#8b5cf6",
    tier: "paid",
    lessons: [
      {
        id: "7-1",
        worldId: 7,
        lessonNumber: 1,
        title: "How Machines Hear",
        concept:
          "Sound is just waves, and AI converts those waves into numbers. What you hear as music, a voice, or a clap, AI sees as squiggly lines made of data.",
        interactiveType: "waveform-explorer",
        interactiveTitle: "Waveform Explorer",
        dinnerTakeaway:
          "When AI 'hears' your voice, it doesn't hear sounds — it sees squiggly lines made of numbers!",
        xpReward: 50,
      },
      {
        id: "7-2",
        worldId: 7,
        lessonNumber: 2,
        title: "Voice Assistants — How They Work",
        concept:
          "When you say 'Hey Siri,' a chain of AI models kicks in — one detects the wake word, another converts speech to text, another figures out what you meant, and another talks back.",
        interactiveType: "voice-pipeline",
        interactiveTitle: "Voice Pipeline",
        dinnerTakeaway:
          "When you talk to Siri, at least 4 different AI systems work together just to answer your question!",
        xpReward: 50,
      },
      {
        id: "7-3",
        worldId: 7,
        lessonNumber: 3,
        title: "AI Makes Music",
        concept:
          "AI can compose music by learning patterns in melody, rhythm, and harmony — but it doesn't feel the music. It knows what sounds good together without knowing why.",
        interactiveType: "melody-maker",
        interactiveTitle: "Melody Maker",
        dinnerTakeaway:
          "AI can write a catchy song by copying patterns from thousands of other songs — but it has no idea what the music feels like!",
        xpReward: 50,
      },
      {
        id: "7-4",
        worldId: 7,
        lessonNumber: 4,
        title: "Sound Fakes & Voice Cloning",
        concept:
          "AI can clone anyone's voice from just a few seconds of audio. This has amazing uses (accessibility, preserving languages) and scary ones (scam calls, impersonation).",
        interactiveType: "voice-lineup",
        interactiveTitle: "Voice Lineup",
        dinnerTakeaway:
          "AI can now copy anyone's voice almost perfectly — which is why you should always double-check if a surprising call or message is really from who you think!",
        xpReward: 50,
      },
    ],
    challenge: {
      title: "The AI Podcast",
      description:
        "Create a mini podcast episode using AI-generated sound effects, music, or narration. Mix AI-made elements with your own voice to produce a 2-minute show!",
      badgeName: "Sound Engineer",
      badgeEmoji: "🎧",
      interactiveType: "ai-podcast",
      xpReward: 150,
    },
  },
  // ─── WORLD 8: AI & Games (PRO) ───────────────────────────────────────
  {
    id: 8,
    title: "AI & Games",
    subtitle: "The Player's Guide",
    theme: "How AI learns to play, create, and challenge you in games",
    emoji: "🎮",
    color: "red",
    bgColor: "bg-red-500",
    ringColor: "ring-red-400",
    textColor: "text-red-400",
    gradientFrom: "from-red-500",
    gradientTo: "to-rose-400",
    hex: "#ef4444",
    tier: "paid",
    lessons: [
      {
        id: "8-1",
        worldId: 8,
        lessonNumber: 1,
        title: "NPCs — The AI You Already Know",
        concept:
          "Every video game enemy that chases you, every villager with dialogue, every teammate that adapts — that's AI. Some are simple rule followers, others actually learn your play style.",
        interactiveType: "npc-brain-mapper",
        interactiveTitle: "NPC Brain Mapper",
        dinnerTakeaway:
          "Those enemies chasing you in video games? That's AI! And some of them are actually learning how you play!",
        xpReward: 50,
      },
      {
        id: "8-2",
        worldId: 8,
        lessonNumber: 2,
        title: "AI vs Humans — The Great Battles",
        concept:
          "From Deep Blue beating the world chess champion in 1997 to AlphaGo mastering Go in 2016 — AI has been challenging humans at games for decades, and winning.",
        interactiveType: "ai-battle-timeline",
        interactiveTitle: "AI Battle Timeline",
        dinnerTakeaway:
          "AI beat the world's best chess player in 1997 and the best Go player in 2016 — games people thought computers could NEVER win!",
        xpReward: 50,
      },
      {
        id: "8-3",
        worldId: 8,
        lessonNumber: 3,
        title: "How Game AI Learns",
        concept:
          "Reinforcement learning is like training a puppy — reward good behavior, ignore bad behavior, repeat thousands of times. Game AI learns by playing millions of rounds and figuring out what earns points.",
        interactiveType: "reward-trainer",
        interactiveTitle: "Reward Trainer",
        dinnerTakeaway:
          "Game AI learns by playing the same game millions of times — it starts out terrible but eventually figures out winning strategies all on its own!",
        xpReward: 50,
      },
      {
        id: "8-4",
        worldId: 8,
        lessonNumber: 4,
        title: "AI Designs Games",
        concept:
          "Procedural generation lets AI create infinite unique worlds, levels, and puzzles. Minecraft's endless landscapes and No Man's Sky's 18 quintillion planets are all AI-generated.",
        interactiveType: "level-generator",
        interactiveTitle: "Level Generator",
        dinnerTakeaway:
          "Minecraft's infinite worlds are created by AI — no human designed all those caves, mountains, and villages!",
        xpReward: 50,
      },
      {
        id: "8-5",
        worldId: 8,
        lessonNumber: 5,
        title: "Fair Play — Cheating, Difficulty & AI",
        concept:
          "Is AI aim-assist cheating? What about dynamic difficulty that secretly makes the game easier when you're losing? AI in gaming raises big questions about what's fair.",
        interactiveType: "fair-play-judge",
        interactiveTitle: "Fair Play Judge",
        dinnerTakeaway:
          "Some games secretly get easier when you're losing — that's AI adjusting the difficulty without telling you!",
        xpReward: 50,
      },
    ],
    challenge: {
      title: "Design a Game with AI",
      description:
        "Design your own game concept that uses AI — whether it's adaptive NPCs, procedural levels, or dynamic difficulty. Plan the rules and playtest your idea!",
      badgeName: "Game Designer",
      badgeEmoji: "🕹️",
      interactiveType: "game-designer-challenge",
      xpReward: 150,
    },
  },
  // ─── WORLD 9: AI & Robots (PRO) ──────────────────────────────────────
  {
    id: 9,
    title: "AI & Robots",
    subtitle: "When AI Gets a Body",
    theme: "What happens when AI moves from screens to the physical world",
    emoji: "🦾",
    color: "slate",
    bgColor: "bg-slate-500",
    ringColor: "ring-slate-400",
    textColor: "text-slate-400",
    gradientFrom: "from-slate-500",
    gradientTo: "to-zinc-400",
    hex: "#71717a",
    tier: "paid",
    lessons: [
      {
        id: "9-1",
        worldId: 9,
        lessonNumber: 1,
        title: "Brains vs Bodies",
        concept:
          "A robot without AI is like a puppet — it only does what you tell it. A robot WITH AI can adapt, learn, and make decisions on its own. The brain (AI) is what makes the body (robot) intelligent.",
        interactiveType: "robot-or-puppet",
        interactiveTitle: "Robot or Puppet?",
        dinnerTakeaway:
          "A robot without AI is just a fancy puppet — it's the AI brain that makes robots actually smart!",
        xpReward: 50,
      },
      {
        id: "9-2",
        worldId: 9,
        lessonNumber: 2,
        title: "Self-Driving Cars",
        concept:
          "Self-driving cars use cameras, LIDAR, radar, GPS, and microphones — five AI-powered senses working together to navigate roads safely. Every second, they make hundreds of decisions.",
        interactiveType: "self-driving-sim",
        interactiveTitle: "Self-Driving Simulator",
        dinnerTakeaway:
          "A self-driving car makes hundreds of decisions every second using cameras, radar, and AI — way more than a human driver thinks about!",
        xpReward: 50,
      },
      {
        id: "9-3",
        worldId: 9,
        lessonNumber: 3,
        title: "Robots That Help",
        concept:
          "Robots assist in surgery with superhuman precision, explore disaster zones too dangerous for humans, help disabled people with daily tasks, and venture into deep ocean and outer space.",
        interactiveType: "robot-designer",
        interactiveTitle: "Robot Designer",
        dinnerTakeaway:
          "Robots with AI are already performing surgery, exploring the deep ocean, and helping people who can't walk — and they're getting better every year!",
        xpReward: 50,
      },
      {
        id: "9-4",
        worldId: 9,
        lessonNumber: 4,
        title: "Robots & Us — Living Together",
        concept:
          "As robots get smarter, we face big questions: Would you want a robot friend? A robot teacher? What about one that looks exactly human? Somewhere along that spectrum, things get complicated.",
        interactiveType: "robot-rights-debate",
        interactiveTitle: "Robot Rights Debate",
        dinnerTakeaway:
          "As robots get smarter, we have to decide — should a really advanced robot have rights? It's one of the biggest questions we'll face in your lifetime!",
        xpReward: 50,
      },
    ],
    challenge: {
      title: "Robot Pitch",
      description:
        "Design a robot that solves a real-world problem. Create a pitch with the problem, your robot's design, what AI it uses, and why someone would want it!",
      badgeName: "Robot Engineer",
      badgeEmoji: "🤖",
      interactiveType: "robot-pitch",
      xpReward: 150,
    },
  },
  // ─── WORLD 10: AI & You (PRO) ────────────────────────────────────────
  {
    id: 10,
    title: "AI & You",
    subtitle: "Your Digital Mirror",
    theme: "How AI already shapes your daily life — and how to take control",
    emoji: "📱",
    color: "cyan",
    bgColor: "bg-cyan-500",
    ringColor: "ring-cyan-400",
    textColor: "text-cyan-400",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-teal-400",
    hex: "#06b6d4",
    tier: "paid",
    lessons: [
      {
        id: "10-1",
        worldId: 10,
        lessonNumber: 1,
        title: "The Algorithm Knows",
        concept:
          "TikTok and YouTube learn what you like by watching what you watch. You watch → AI notes it → AI recommends similar → you watch more → AI learns more. It's a feedback loop designed to keep you scrolling.",
        interactiveType: "algorithm-audit",
        interactiveTitle: "Algorithm Audit",
        dinnerTakeaway:
          "Every time you watch a video or like a post, you're training an AI to know exactly what keeps you scrolling!",
        xpReward: 50,
      },
      {
        id: "10-2",
        worldId: 10,
        lessonNumber: 2,
        title: "Filter Bubbles & Echo Chambers",
        concept:
          "When AI only shows you things you already agree with, your world gets smaller. Two people can search the same word and see completely different results — and neither knows what the other sees.",
        interactiveType: "bubble-breaker",
        interactiveTitle: "Bubble Breaker",
        dinnerTakeaway:
          "AI shows you what it thinks you want to see — which means you might never see things that challenge your opinions!",
        xpReward: 50,
      },
      {
        id: "10-3",
        worldId: 10,
        lessonNumber: 3,
        title: "Smart Home, Smart Life",
        concept:
          "Voice assistants, robot vacuums, smart thermostats, smart doorbells — your home is full of AI that collects data and makes decisions. Each device knows a little about you; together, they know a lot.",
        interactiveType: "smart-home-mapper",
        interactiveTitle: "Smart Home Mapper",
        dinnerTakeaway:
          "Almost every 'smart' device in your home is collecting data about you — your voice assistant alone knows your schedule, music taste, and what questions you ask!",
        xpReward: 50,
      },
      {
        id: "10-4",
        worldId: 10,
        lessonNumber: 4,
        title: "AI & Your Health",
        concept:
          "Fitness trackers, sleep monitors, and screen time apps all use AI to analyze your habits. They can spot patterns you'd never notice — like how your sleep changes before you get sick.",
        interactiveType: "health-tracker-sim",
        interactiveTitle: "Health Tracker Sim",
        dinnerTakeaway:
          "AI in fitness trackers can sometimes predict you're getting sick before you even feel it — just by noticing tiny changes in your heart rate and sleep!",
        xpReward: 50,
      },
      {
        id: "10-5",
        worldId: 10,
        lessonNumber: 5,
        title: "Taking Back Control",
        concept:
          "You're not powerless. You can adjust recommendations, manage privacy settings, and choose when to listen to AI and when to ignore it. Digital literacy is a superpower.",
        interactiveType: "settings-safari",
        interactiveTitle: "Settings Safari",
        dinnerTakeaway:
          "You can actually control what AI shows you and what data it collects — most people just never check their settings!",
        xpReward: 50,
      },
    ],
    challenge: {
      title: "AI Life Audit",
      description:
        "Map every AI in your life — every device, app, and service. For each one, note what it does, what data it collects, and one change you'd make.",
      badgeName: "Digital Detective",
      badgeEmoji: "🔎",
      interactiveType: "ai-life-audit",
      xpReward: 150,
    },
  },
  // ─── WORLD 11: Building with AI (PRO) ────────────────────────────────
  {
    id: 11,
    title: "Building with AI",
    subtitle: "The Maker's Workshop",
    theme: "Stop watching. Start making. Build your own AI project.",
    emoji: "🔧",
    color: "lime",
    bgColor: "bg-lime-500",
    ringColor: "ring-lime-400",
    textColor: "text-lime-400",
    gradientFrom: "from-lime-500",
    gradientTo: "to-green-400",
    hex: "#84cc16",
    tier: "paid",
    lessons: [
      {
        id: "11-1",
        worldId: 11,
        lessonNumber: 1,
        title: "Your AI Toolkit",
        concept:
          "Teachable Machine, Scratch with ML, ChatGPT, image generators, music AI — these are real tools you can use RIGHT NOW to build things with AI. No coding degree required.",
        interactiveType: "toolkit-tour",
        interactiveTitle: "Toolkit Tour",
        dinnerTakeaway:
          "You don't need to be a programmer to build with AI — tools like Teachable Machine let you train your own AI in minutes!",
        xpReward: 50,
      },
      {
        id: "11-2",
        worldId: 11,
        lessonNumber: 2,
        title: "Project Planning",
        concept:
          "Good projects have a clear goal, a specific audience, and a realistic scope. 'I want to build everything' becomes 'I want to build an AI that recognizes hand-drawn emojis.'",
        interactiveType: "project-scoper",
        interactiveTitle: "Project Scoper",
        dinnerTakeaway:
          "The secret to building cool things is starting small — even the biggest tech companies start with a simple prototype!",
        xpReward: 50,
      },
      {
        id: "11-3",
        worldId: 11,
        lessonNumber: 3,
        title: "Build Phase 1 — Prototype",
        concept:
          "Prototypes are supposed to be ugly. The point is to make it work, not make it pretty. Every great product started as a rough first version.",
        interactiveType: "prototype-builder",
        interactiveTitle: "Prototype Builder",
        dinnerTakeaway:
          "The first version of Google was literally just a white page with a search box — prototypes are supposed to be simple!",
        xpReward: 50,
      },
      {
        id: "11-4",
        worldId: 11,
        lessonNumber: 4,
        title: "Build Phase 2 — Iterate",
        concept:
          "Build, test, learn, improve, repeat. Every product goes through this cycle dozens of times. The feedback from real users is worth more than months of guessing.",
        interactiveType: "feedback-loop",
        interactiveTitle: "Feedback Loop",
        dinnerTakeaway:
          "The best builders aren't the ones who get it right the first time — they're the ones who listen to feedback and keep improving!",
        xpReward: 50,
      },
      {
        id: "11-5",
        worldId: 11,
        lessonNumber: 5,
        title: "Build Phase 3 — Polish & Present",
        concept:
          "Finishing a project means cleaning it up and presenting it well. When you demo, talk about the problem you solved, not just the buttons you built.",
        interactiveType: "project-showcase",
        interactiveTitle: "Project Showcase",
        dinnerTakeaway:
          "Being able to explain what you built and WHY is just as important as building it — that's how real inventors pitch their ideas!",
        xpReward: 50,
      },
    ],
    challenge: {
      title: "Portfolio Piece",
      description:
        "Complete your AI project and present it! Include the problem, your solution, what AI tools you used, and what you'd do differently next time.",
      badgeName: "AI Builder",
      badgeEmoji: "🏗️",
      interactiveType: "portfolio-piece",
      xpReward: 150,
    },
  },
  // ─── WORLD 12: AI Futures (PRO) ──────────────────────────────────────
  {
    id: 12,
    title: "AI Futures",
    subtitle: "What Comes Next",
    theme: "You're not just learning about AI — you're the generation that will shape it",
    emoji: "🔮",
    color: "amber",
    bgColor: "bg-amber-500",
    ringColor: "ring-amber-400",
    textColor: "text-amber-400",
    gradientFrom: "from-amber-500",
    gradientTo: "to-yellow-400",
    hex: "#f59e0b",
    tier: "paid",
    lessons: [
      {
        id: "12-1",
        worldId: 12,
        lessonNumber: 1,
        title: "AI in 2030",
        concept:
          "In the next few years: AI tutors personalized to every student, AI doctors in rural areas, real-time translation earbuds, fully autonomous delivery. Some of these are almost here.",
        interactiveType: "future-bingo",
        interactiveTitle: "2030 Bingo",
        dinnerTakeaway:
          "By the time you're a teenager, AI might give you a personal tutor, translate any language in your ear, and deliver your packages by drone!",
        xpReward: 50,
      },
      {
        id: "12-2",
        worldId: 12,
        lessonNumber: 2,
        title: "AI & Big Problems",
        concept:
          "AI is being pointed at humanity's biggest challenges — climate change, disease, food shortages, space exploration. It can optimize energy grids, discover new medicines, and navigate Mars rovers.",
        interactiveType: "ai-for-good",
        interactiveTitle: "AI for Good",
        dinnerTakeaway:
          "AI is already helping fight climate change, discover new medicines, and grow food more efficiently — it might help solve problems that seemed impossible!",
        xpReward: 50,
      },
      {
        id: "12-3",
        worldId: 12,
        lessonNumber: 3,
        title: "The Risks Ahead",
        concept:
          "AI could be used for mass surveillance, could widen inequality if only rich countries have access, and could make decisions that are hard to explain or reverse. Being honest about risks helps us prevent them.",
        interactiveType: "risk-o-meter",
        interactiveTitle: "Risk-O-Meter",
        dinnerTakeaway:
          "AI has real risks — like being used to spy on people or making unfair decisions — which is why we need smart people like you to help guide it!",
        xpReward: 50,
      },
      {
        id: "12-4",
        worldId: 12,
        lessonNumber: 4,
        title: "Your AI Future",
        concept:
          "You're growing up at the most important moment in AI history. The choices your generation makes about AI will shape the world for decades. You won't just use AI — you'll shape it.",
        interactiveType: "future-letter",
        interactiveTitle: "Letter to Future Me",
        dinnerTakeaway:
          "You're part of the first generation that will grow up WITH AI — what you learn and decide now will shape how AI works for everyone!",
        xpReward: 50,
      },
    ],
    challenge: {
      title: "My AI Manifesto",
      description:
        "Write your personal AI Manifesto — your vision for how AI should be built and used. Include principles you believe in and a promise about how you'll use AI responsibly.",
      badgeName: "AI Visionary",
      badgeEmoji: "🌟",
      interactiveType: "ai-manifesto",
      xpReward: 200,
    },
  },
];

export function getWorld(worldId: number): World | undefined {
  return WORLDS.find((w) => w.id === worldId);
}

export function getLesson(worldId: number, lessonId: string): Lesson | undefined {
  const world = getWorld(worldId);
  return world?.lessons.find((l) => l.id === lessonId);
}

export const TOTAL_XP =
  WORLDS.reduce(
    (sum, w) =>
      sum +
      w.lessons.reduce((ls, l) => ls + l.xpReward, 0) +
      w.challenge.xpReward,
    0
  );

export const ALL_BADGES = WORLDS.map((w) => ({
  worldId: w.id,
  name: w.challenge.badgeName,
  emoji: w.challenge.badgeEmoji,
  color: w.hex,
  bgColor: w.bgColor,
  description: w.challenge.description,
}));
