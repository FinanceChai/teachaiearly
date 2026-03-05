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
        interactiveType: "locked",
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
        interactiveType: "locked",
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
        interactiveType: "locked",
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
        interactiveType: "locked",
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
        interactiveType: "locked",
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
        interactiveType: "locked",
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
      interactiveType: "locked",
      xpReward: 150,
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
