export type ChallengeType = "quiz" | "poll" | "spot" | "think" | "estimate";

export interface DailyChallenge {
  id: number;
  type: ChallengeType;
  question: string;
  emoji: string;
  options: string[];
  correctIndex?: number;
  explanation: string;
  funFact?: string;
  xpReward: number;
  category: string;
}

export const DAILY_CHALLENGES: DailyChallenge[] = [
  // 1 — quiz
  {
    id: 1,
    type: "quiz",
    question: "Which of these does NOT use AI?",
    emoji: "🤔",
    options: ["Voice assistants like Siri", "A regular light switch", "Netflix recommendations", "Spam email filters"],
    correctIndex: 1,
    explanation: "A regular light switch is a simple electrical circuit — no AI needed! It just opens or closes a connection when you flip it.",
    funFact: "The first light switch was invented in 1884, over 100 years before AI became common.",
    xpReward: 10,
    category: "AI Basics",
  },
  // 2 — poll
  {
    id: 2,
    type: "poll",
    question: "Would you trust a robot to cook your dinner?",
    emoji: "🍳",
    options: ["Yes, robots could be great chefs!", "Only simple meals like pasta", "No way, I want a human cooking", "Only if a human checks the food first"],
    explanation: "Robot chefs already exist! Some restaurants use AI-powered robots to flip burgers and make salads. But most people still prefer the human touch for complex meals.",
    funFact: "A robot named Flippy works at real fast-food restaurants flipping burgers!",
    xpReward: 10,
    category: "AI in Life",
  },
  // 3 — spot
  {
    id: 3,
    type: "spot",
    question: "Which of these school activities uses AI behind the scenes?",
    emoji: "🔍",
    options: ["Spell-check in Google Docs", "Using a pencil sharpener", "Reading a printed textbook", "Drawing with crayons"],
    correctIndex: 0,
    explanation: "Google Docs uses AI-powered spell check and grammar suggestions! It understands language context to catch tricky errors that simple spell checkers would miss.",
    xpReward: 10,
    category: "AI in Life",
  },
  // 4 — think
  {
    id: 4,
    type: "think",
    question: "If you could teach AI one thing about being human, what would it be?",
    emoji: "💭",
    options: ["How to feel emotions", "What friendship means", "Why we love music", "How humor works"],
    explanation: "These are all things AI struggles with! AI can recognize patterns in emotions, friendships, music, and jokes — but truly understanding them the way humans do is a whole different challenge.",
    funFact: "AI can detect if someone sounds happy or sad in their voice, but it doesn't actually feel those emotions itself.",
    xpReward: 10,
    category: "Ethics",
  },
  // 5 — estimate
  {
    id: 5,
    type: "estimate",
    question: "How many images were used to train the first major image recognition AI (ImageNet)?",
    emoji: "📊",
    options: ["About 1,000", "About 100,000", "About 14 million", "About 1 billion"],
    correctIndex: 2,
    explanation: "ImageNet used about 14 million labeled images across 20,000 categories! Humans had to sort and label all those pictures so the AI could learn from them.",
    funFact: "It took researchers over 2 years and 25,000 workers to label all those images.",
    xpReward: 10,
    category: "Machine Learning",
  },
  // 6 — quiz
  {
    id: 6,
    type: "quiz",
    question: "What does 'training' an AI mean?",
    emoji: "🏋️",
    options: ["Teaching it to exercise", "Feeding it data so it can learn patterns", "Programming every single rule by hand", "Giving it a diploma"],
    correctIndex: 1,
    explanation: "Training an AI means showing it lots of examples (data) so it can find patterns on its own. It's like how you learn to recognize dogs by seeing lots of different dogs!",
    xpReward: 10,
    category: "Machine Learning",
  },
  // 7 — poll
  {
    id: 7,
    type: "poll",
    question: "Which AI superpower would you want most?",
    emoji: "⚡",
    options: ["Instant language translation", "Perfect memory of everything", "Predicting the weather perfectly", "Creating any image I describe"],
    explanation: "All of these are real things AI can do (or is getting close to)! Language translation, data storage, weather prediction, and image generation are all active AI fields.",
    xpReward: 10,
    category: "Future AI",
  },
  // 8 — spot
  {
    id: 8,
    type: "spot",
    question: "Which of these uses AI to work?",
    emoji: "🕵️",
    options: ["A calculator app doing 2+2", "YouTube suggesting your next video", "A regular alarm clock", "A paper calendar"],
    correctIndex: 1,
    explanation: "YouTube's recommendation system uses advanced AI to analyze what you watch, how long you watch, and what millions of other users like to suggest videos you might enjoy.",
    funFact: "YouTube's AI processes over 1 billion hours of video recommendations every single day!",
    xpReward: 10,
    category: "AI in Life",
  },
  // 9 — think
  {
    id: 9,
    type: "think",
    question: "Should AI art be allowed in school art contests?",
    emoji: "🎨",
    options: ["Yes, it's a new kind of creativity", "Only if the human did most of the work", "No, contests should be human-only", "It should have its own separate category"],
    explanation: "This is a real debate happening right now! Some people think AI art is a new creative tool, while others feel it's unfair to human artists who spent years learning their craft.",
    funFact: "In 2022, an AI-generated artwork won first place at the Colorado State Fair art competition, sparking huge debate.",
    xpReward: 10,
    category: "Creative AI",
  },
  // 10 — estimate
  {
    id: 10,
    type: "estimate",
    question: "How many words of text was ChatGPT trained on?",
    emoji: "📚",
    options: ["1 million words", "100 million words", "Hundreds of billions of words", "1 trillion words"],
    correctIndex: 2,
    explanation: "Large language models like ChatGPT were trained on hundreds of billions of words from books, websites, and articles. That's like reading millions of books!",
    funFact: "If you tried to read all that text yourself at normal speed, it would take over 100,000 years.",
    xpReward: 10,
    category: "AI Basics",
  },
  // 11 — quiz
  {
    id: 11,
    type: "quiz",
    question: "What is a 'deepfake'?",
    emoji: "🎭",
    options: ["A very deep ocean photo", "AI-generated fake video or audio of real people", "A type of computer virus", "An underwater robot"],
    correctIndex: 1,
    explanation: "Deepfakes use AI to create realistic-looking fake videos or audio that make it seem like someone said or did something they never actually did. They can be used for fun but also to spread misinformation.",
    xpReward: 10,
    category: "Ethics",
  },
  // 12 — poll
  {
    id: 12,
    type: "poll",
    question: "If AI could do your homework perfectly, would you use it?",
    emoji: "📝",
    options: ["Yes, more free time!", "Only for subjects I struggle with", "No, I want to learn myself", "I'd use it to check my answers"],
    explanation: "This is a question many students face today! While AI can help you learn and check your work, doing homework yourself builds important skills and understanding that AI can't give you.",
    xpReward: 10,
    category: "Ethics",
  },
  // 13 — spot
  {
    id: 13,
    type: "spot",
    question: "Which of these pets uses an AI-powered device?",
    emoji: "🐕",
    options: ["A dog with a regular collar", "A cat with an AI-powered automatic feeder that detects the cat's face", "A fish in a tank with a filter", "A hamster on a wheel"],
    correctIndex: 1,
    explanation: "Smart pet feeders use facial recognition AI to identify specific pets and give them the right amount of food. This is useful in homes with multiple pets on different diets!",
    xpReward: 10,
    category: "AI in Life",
  },
  // 14 — think
  {
    id: 14,
    type: "think",
    question: "What job do you think AI will NEVER be able to do as well as humans?",
    emoji: "🧑‍🏫",
    options: ["Being a best friend", "Teaching kindergarten", "Being a stand-up comedian", "Leading a country"],
    explanation: "Many experts believe jobs requiring deep empathy, moral judgment, and genuine human connection will always need real humans. AI might assist in these roles but probably can't replace the human element.",
    xpReward: 10,
    category: "Future AI",
  },
  // 15 — estimate
  {
    id: 15,
    type: "estimate",
    question: "How many voice assistant devices (like Alexa and Google Home) are in use worldwide?",
    emoji: "🔊",
    options: ["About 10 million", "About 100 million", "About 500 million", "About 4 billion"],
    correctIndex: 2,
    explanation: "There are around 500 million smart speakers and voice assistants in use around the world! That's roughly one for every 16 people on Earth.",
    funFact: "Voice assistants process your speech in the cloud — your words travel to a data center and back in under a second!",
    xpReward: 10,
    category: "AI in Life",
  },
  // 16 — quiz
  {
    id: 16,
    type: "quiz",
    question: "What is 'bias' in AI?",
    emoji: "⚖️",
    options: ["When AI runs too slowly", "When AI unfairly favors or discriminates against certain groups", "When AI uses too much electricity", "When AI makes spelling mistakes"],
    correctIndex: 1,
    explanation: "AI bias happens when the data used to train AI doesn't represent everyone fairly. For example, if a facial recognition AI is mostly trained on light-skinned faces, it may work poorly for darker-skinned people.",
    xpReward: 10,
    category: "Ethics",
  },
  // 17 — poll
  {
    id: 17,
    type: "poll",
    question: "Would you ride in a self-driving car with no human driver at all?",
    emoji: "🚗",
    options: ["Absolutely, sounds amazing!", "Only on a highway, not in the city", "Only if someone could take over in emergencies", "No, I want a human driver"],
    explanation: "Self-driving cars use AI to see the road, predict what other drivers will do, and make split-second decisions. They're already being tested in some cities, but the technology is still improving.",
    funFact: "Self-driving cars can 'see' 360 degrees around them using cameras, radar, and lidar — way more than a human driver!",
    xpReward: 10,
    category: "Future AI",
  },
  // 18 — spot
  {
    id: 18,
    type: "spot",
    question: "Which of these uses machine learning?",
    emoji: "🔎",
    options: ["A microwave heating food for 2 minutes", "An email app sorting spam from real messages", "A flashlight turning on", "A manual door lock"],
    correctIndex: 1,
    explanation: "Spam filters use machine learning to study millions of emails and learn the patterns that separate real messages from junk. They keep getting smarter as they see more examples!",
    xpReward: 10,
    category: "Machine Learning",
  },
  // 19 — think
  {
    id: 19,
    type: "think",
    question: "If you were designing an AI assistant for kids, what would be the most important rule?",
    emoji: "📋",
    options: ["Always be honest, even when it's hard", "Never collect personal info without permission", "Make learning fun, not boring", "Always explain things in kid-friendly language"],
    explanation: "All of these are important! Real AI companies think about safety, privacy, engagement, and accessibility when building products for kids. The best AI assistants try to do all of these.",
    xpReward: 10,
    category: "Ethics",
  },
  // 20 — estimate
  {
    id: 20,
    type: "estimate",
    question: "How fast can AI identify a face in a photo?",
    emoji: "👤",
    options: ["About 10 seconds", "About 1 second", "Less than half a second", "About 5 minutes"],
    correctIndex: 2,
    explanation: "Modern facial recognition AI can identify a face in under 100 milliseconds — that's less than the time it takes you to blink! It processes the image almost instantly.",
    funFact: "Your phone's Face ID checks 30,000 invisible dots on your face every time you unlock it.",
    xpReward: 10,
    category: "AI Basics",
  },
  // 21 — quiz
  {
    id: 21,
    type: "quiz",
    question: "What does NLP stand for in AI?",
    emoji: "💬",
    options: ["New Learning Program", "Natural Language Processing", "Neural Laptop Processor", "Next Level Programming"],
    correctIndex: 1,
    explanation: "Natural Language Processing is the branch of AI that helps computers understand, interpret, and respond to human language — like when you talk to Siri or use Google Translate.",
    xpReward: 10,
    category: "AI Basics",
  },
  // 22 — poll
  {
    id: 22,
    type: "poll",
    question: "What AI invention would you want for your school?",
    emoji: "🏫",
    options: ["AI tutor that adapts to your learning speed", "AI that translates any language instantly", "AI that creates custom study games", "AI that summarizes long textbooks"],
    explanation: "All of these AI tools are being developed right now! Some schools are already testing AI tutors that adjust difficulty based on how well each student is doing.",
    funFact: "Studies show students using AI tutors can learn some subjects 2x faster than traditional methods.",
    xpReward: 10,
    category: "AI in Life",
  },
  // 23 — spot
  {
    id: 23,
    type: "spot",
    question: "Which game uses AI opponents?",
    emoji: "🎮",
    options: ["Tic-tac-toe on paper with a friend", "Chess against the computer", "A jigsaw puzzle", "Playing catch outside"],
    correctIndex: 1,
    explanation: "When you play chess against a computer, you're playing against AI! Chess AI programs like Stockfish can calculate millions of moves per second and are now stronger than any human player.",
    funFact: "In 1997, IBM's Deep Blue became the first AI to beat a world chess champion (Garry Kasparov).",
    xpReward: 10,
    category: "AI Basics",
  },
  // 24 — think
  {
    id: 24,
    type: "think",
    question: "Should AI-generated stories be allowed in creative writing class?",
    emoji: "✍️",
    options: ["Yes, it's a new form of storytelling", "Only as a brainstorming tool, not the final work", "No, students should write everything themselves", "Yes, but students must heavily edit and improve it"],
    explanation: "This is one of the biggest debates in education right now. Many teachers believe AI can be a helpful brainstorming partner, but the real learning happens when students do their own thinking and writing.",
    xpReward: 10,
    category: "Creative AI",
  },
  // 25 — estimate
  {
    id: 25,
    type: "estimate",
    question: "How many languages can the best AI translation tools handle?",
    emoji: "🌍",
    options: ["About 10 languages", "About 50 languages", "Over 100 languages", "Over 1,000 languages"],
    correctIndex: 2,
    explanation: "Google Translate supports over 130 languages! That covers most of the world's major languages, though there are about 7,000 total languages spoken on Earth.",
    funFact: "AI is helping preserve endangered languages by learning from the few remaining speakers and creating digital records.",
    xpReward: 10,
    category: "AI Basics",
  },
  // 26 — quiz
  {
    id: 26,
    type: "quiz",
    question: "What is a 'neural network' inspired by?",
    emoji: "🧠",
    options: ["Spider webs", "The human brain", "Computer cables", "The internet"],
    correctIndex: 1,
    explanation: "Neural networks are AI systems inspired by how the human brain works! They have layers of connected 'neurons' that process information, similar to the neurons in your brain.",
    funFact: "Your brain has about 86 billion neurons — the largest AI models have billions of parameters, but they still work very differently from a real brain.",
    xpReward: 10,
    category: "Machine Learning",
  },
  // 27 — poll
  {
    id: 27,
    type: "poll",
    question: "What creative thing would you most want AI to help you with?",
    emoji: "🎵",
    options: ["Composing music", "Making a movie", "Designing a video game", "Writing a comic book"],
    explanation: "AI tools exist for all of these! There are AI music composers, video editors, game design assistants, and even AI that can draw in comic book styles. The creative possibilities are exploding!",
    xpReward: 10,
    category: "Creative AI",
  },
  // 28 — spot
  {
    id: 28,
    type: "spot",
    question: "Which shopping experience uses AI?",
    emoji: "🛍️",
    options: ["Paying with cash at a lemonade stand", "Amazon suggesting 'Customers also bought...'", "Picking fruit at a farmer's market", "Using a paper coupon"],
    correctIndex: 1,
    explanation: "Amazon's recommendation engine is one of the most famous AI systems! It analyzes your browsing history, purchases, and what similar shoppers bought to suggest products you might like.",
    funFact: "About 35% of what people buy on Amazon comes from AI recommendations!",
    xpReward: 10,
    category: "AI in Life",
  },
  // 29 — think
  {
    id: 29,
    type: "think",
    question: "If an AI self-driving car has to choose between two bad options in an emergency, who should decide the rules?",
    emoji: "🚦",
    options: ["The car company that made it", "The government with laws", "The person who bought the car", "A team of ethicists and the public together"],
    explanation: "This is called the 'trolley problem' for AI — it's one of the hardest questions in AI ethics. Most experts believe these decisions should involve input from many different groups, not just one.",
    xpReward: 10,
    category: "Ethics",
  },
  // 30 — estimate
  {
    id: 30,
    type: "estimate",
    question: "How much electricity does it take to train a large AI model like GPT-4?",
    emoji: "🔌",
    options: ["Same as charging a phone", "Same as a house for a month", "Same as a small town for a month", "Same as a whole country for a year"],
    correctIndex: 2,
    explanation: "Training a large AI model can use as much electricity as a small town uses in a month! That's millions of dollars in energy costs and a significant environmental impact.",
    funFact: "Researchers are working on making AI training more energy-efficient — some new methods use 100x less power.",
    xpReward: 10,
    category: "Future AI",
  },
  // 31 — quiz
  {
    id: 31,
    type: "quiz",
    question: "What does an AI 'hallucination' mean?",
    emoji: "🌀",
    options: ["The AI can see things like a human", "The AI confidently makes up false information", "The AI creates dream-like artwork", "The AI shuts down unexpectedly"],
    correctIndex: 1,
    explanation: "When AI 'hallucinates,' it generates information that sounds convincing but is completely made up. This is why it's important to fact-check AI responses!",
    funFact: "AI chatbots have been caught inventing fake court cases, fake scientific papers, and even fake historical events.",
    xpReward: 10,
    category: "AI Basics",
  },
  // 32 — poll
  {
    id: 32,
    type: "poll",
    question: "How do you feel about AI knowing your online habits?",
    emoji: "🔐",
    options: ["It's fine if it helps me find things I like", "It's a little creepy but I accept it", "I wish I could control what it knows", "I think it should be banned"],
    explanation: "Data privacy is a big topic! Many countries are creating new laws about how companies can collect and use your data. You have the right to know what data is being collected about you.",
    xpReward: 10,
    category: "Ethics",
  },
  // 33 — spot
  {
    id: 33,
    type: "spot",
    question: "Which of these medical tools uses AI?",
    emoji: "🏥",
    options: ["A simple bandage", "AI that detects diseases in X-ray images", "A stethoscope", "A thermometer"],
    correctIndex: 1,
    explanation: "AI can analyze X-rays, MRIs, and CT scans to spot signs of diseases like cancer, sometimes catching things that human doctors miss. It's becoming a powerful tool in medicine!",
    funFact: "In some studies, AI can detect certain cancers in medical images with over 95% accuracy.",
    xpReward: 10,
    category: "AI in Life",
  },
  // 34 — think
  {
    id: 34,
    type: "think",
    question: "Should robots have rights?",
    emoji: "🤖",
    options: ["Yes, if they become conscious", "Only basic protections from destruction", "No, they're just machines", "It depends on how advanced they get"],
    explanation: "This might seem like science fiction, but philosophers and lawmakers are already debating this. As AI gets more sophisticated, questions about robot rights become more serious.",
    funFact: "Saudi Arabia granted citizenship to a robot named Sophia in 2017, sparking worldwide debate!",
    xpReward: 10,
    category: "Future AI",
  },
  // 35 — estimate
  {
    id: 35,
    type: "estimate",
    question: "How many photos are uploaded to Instagram every day?",
    emoji: "📱",
    options: ["About 1 million", "About 10 million", "About 100 million", "About 1 billion"],
    correctIndex: 2,
    explanation: "About 100 million photos are uploaded to Instagram daily! AI helps process all of these — detecting content, suggesting filters, ranking your feed, and more.",
    funFact: "Instagram's AI can identify the content of photos (food, dogs, sunsets) without any human telling it what's in them.",
    xpReward: 10,
    category: "AI in Life",
  },
  // 36 — quiz
  {
    id: 36,
    type: "quiz",
    question: "What is 'supervised learning' in AI?",
    emoji: "📖",
    options: ["AI that is watched by a human at all times", "AI that learns from labeled examples with correct answers", "AI that only works when supervised", "AI that teaches other AIs"],
    correctIndex: 1,
    explanation: "In supervised learning, you give the AI examples with the correct answers already labeled. It's like a teacher showing students worked examples before asking them to solve problems on their own!",
    xpReward: 10,
    category: "Machine Learning",
  },
  // 37 — poll
  {
    id: 37,
    type: "poll",
    question: "What's the coolest thing AI can do right now?",
    emoji: "🌟",
    options: ["Generate realistic images from text", "Have human-like conversations", "Drive cars by itself", "Discover new medicines"],
    explanation: "AI is doing all of these things right now! What's 'coolest' depends on what you care about — some think life-saving medical discoveries matter most, while others are amazed by creative AI.",
    xpReward: 10,
    category: "AI Basics",
  },
  // 38 — spot
  {
    id: 38,
    type: "spot",
    question: "Which of these music experiences involves AI?",
    emoji: "🎧",
    options: ["Playing a guitar", "Spotify's Discover Weekly playlist", "Singing in a choir", "Beating a drum"],
    correctIndex: 1,
    explanation: "Spotify uses AI to analyze your listening habits and compare them with millions of other users to create personalized playlists. Its AI studies tempo, mood, instruments, and more!",
    funFact: "Spotify's AI analyzes over 100 billion user interactions every day to make recommendations.",
    xpReward: 10,
    category: "Creative AI",
  },
  // 39 — think
  {
    id: 39,
    type: "think",
    question: "If AI could predict your future career, would you want to know?",
    emoji: "🔮",
    options: ["Yes, I'm curious!", "Only if I could still change it", "No, I want to figure it out myself", "Only if it showed me multiple possibilities"],
    explanation: "AI can spot patterns in people's interests and skills, but predicting the future is very different from finding patterns in the past. Your choices and effort shape your future more than any prediction!",
    xpReward: 10,
    category: "Future AI",
  },
  // 40 — estimate
  {
    id: 40,
    type: "estimate",
    question: "How many times per day does the average person interact with AI?",
    emoji: "📲",
    options: ["About 5 times", "About 20 times", "About 100 times", "Over 300 times"],
    correctIndex: 2,
    explanation: "You probably interact with AI around 100+ times daily! Every search query, autocorrect, social media scroll, map direction, and app recommendation involves AI working behind the scenes.",
    funFact: "Many of these AI interactions happen without you even noticing — they're built into the apps and devices you use every day.",
    xpReward: 10,
    category: "AI in Life",
  },
  // 41 — quiz
  {
    id: 41,
    type: "quiz",
    question: "What does 'prompt engineering' mean?",
    emoji: "🛠️",
    options: ["Building AI hardware", "Crafting clear instructions to get the best AI output", "Programming in a new coding language", "Designing computer prompts for login screens"],
    correctIndex: 1,
    explanation: "Prompt engineering is the skill of writing clear, specific instructions for AI to get the best results. It's like learning to ask great questions — the better your prompt, the better the AI's answer!",
    funFact: "Prompt engineer is now a real job title at some companies, paying over $100,000 per year!",
    xpReward: 10,
    category: "AI Basics",
  },
  // 42 — poll
  {
    id: 42,
    type: "poll",
    question: "Would you want an AI best friend?",
    emoji: "🫂",
    options: ["Yes, it would always be there for me", "As a companion, but not a 'best' friend", "No, friendships need to be with real humans", "Maybe, if it could truly understand me"],
    explanation: "AI chatbots can be supportive and fun to talk to, but they don't truly understand emotions or form real bonds. Most psychologists say human connections are essential for well-being.",
    xpReward: 10,
    category: "Ethics",
  },
  // 43 — spot
  {
    id: 43,
    type: "spot",
    question: "Which weather tool uses AI?",
    emoji: "🌦️",
    options: ["Looking out the window", "A weather app that predicts weather 10 days ahead", "A simple outdoor thermometer", "A wind sock"],
    correctIndex: 1,
    explanation: "Modern weather apps use AI to analyze satellite images, atmospheric data, and historical patterns to predict the weather. AI weather models are now more accurate than traditional methods!",
    funFact: "Google's AI weather model can make a 10-day forecast in under a minute — traditional methods take hours on supercomputers.",
    xpReward: 10,
    category: "AI in Life",
  },
  // 44 — think
  {
    id: 44,
    type: "think",
    question: "What's the biggest risk of relying too much on AI?",
    emoji: "⚠️",
    options: ["We might forget how to do things ourselves", "AI could make mistakes we don't catch", "People might trust AI more than other people", "We could become too lazy to think critically"],
    explanation: "All of these are valid concerns! Experts call this 'automation complacency' — when people trust technology so much they stop questioning it. Staying curious and thinking critically is always important.",
    xpReward: 10,
    category: "Ethics",
  },
  // 45 — estimate
  {
    id: 45,
    type: "estimate",
    question: "How many songs has AI been used to help create on major streaming platforms?",
    emoji: "🎶",
    options: ["About 100", "About 10,000", "Over 100,000", "Over 10 million"],
    correctIndex: 2,
    explanation: "Over 100,000 AI-assisted songs have been uploaded to streaming platforms. AI helps with everything from composing melodies to mastering audio quality.",
    funFact: "Some AI-generated songs have gotten millions of streams — and listeners couldn't tell they were made with AI!",
    xpReward: 10,
    category: "Creative AI",
  },
  // 46 — quiz
  {
    id: 46,
    type: "quiz",
    question: "What is 'computer vision'?",
    emoji: "👁️",
    options: ["A brand of computer monitor", "AI that can interpret and understand images and videos", "Software that helps people with poor eyesight", "A virtual reality headset"],
    correctIndex: 1,
    explanation: "Computer vision is the field of AI that enables machines to 'see' and understand visual information. It powers everything from photo filters to self-driving cars to medical imaging!",
    xpReward: 10,
    category: "Machine Learning",
  },
  // 47 — poll
  {
    id: 47,
    type: "poll",
    question: "If you could have an AI-powered pet, what would it be?",
    emoji: "🐾",
    options: ["A robot dog that learns tricks", "A virtual dragon you can talk to", "An AI fish tank that designs itself", "A holographic cat"],
    explanation: "Robot pets already exist! Sony's Aibo robot dog uses AI to develop its own personality over time, learn tricks, and recognize its owner. The future of AI pets is exciting!",
    funFact: "Some nursing homes use AI robot pets to provide comfort to elderly residents who can't care for real animals.",
    xpReward: 10,
    category: "Future AI",
  },
  // 48 — spot
  {
    id: 48,
    type: "spot",
    question: "Which of these uses AI to protect you online?",
    emoji: "🛡️",
    options: ["Using a strong password", "AI that detects if someone hacked your account", "Logging out when you're done", "Closing your laptop lid"],
    correctIndex: 1,
    explanation: "Banks and websites use AI to detect unusual activity on your account — like a login from a new country or a suspicious purchase. The AI learns your normal patterns and flags anything weird.",
    funFact: "AI fraud detection saves billions of dollars every year by catching suspicious transactions in milliseconds.",
    xpReward: 10,
    category: "AI in Life",
  },
  // 49 — think
  {
    id: 49,
    type: "think",
    question: "In 20 years, what do you think will be the most important AI skill for kids to learn?",
    emoji: "🚀",
    options: ["How to code and build AI", "How to spot AI-generated misinformation", "How to work alongside AI effectively", "How to make ethical decisions about AI"],
    explanation: "Experts believe all of these skills will be crucial! Understanding AI, thinking critically about its output, collaborating with it, and making ethical choices are the new literacies of the future.",
    funFact: "You're already learning these skills right now by using this app!",
    xpReward: 10,
    category: "Future AI",
  },
  // 50 — estimate
  {
    id: 50,
    type: "estimate",
    question: "How many AI-powered apps are on the average smartphone?",
    emoji: "📱",
    options: ["About 2-3 apps", "About 5-10 apps", "About 15-30 apps", "Almost every single app"],
    correctIndex: 2,
    explanation: "The average smartphone has 15-30 apps that use AI in some way — your camera, keyboard, maps, social media, email, music, and many more all have AI working behind the scenes!",
    funFact: "Even your phone's battery management uses AI to learn your charging habits and extend battery life.",
    xpReward: 10,
    category: "AI Basics",
  },
];

/**
 * Get today's challenge using day-of-year modulo 50 to rotate through all challenges.
 */
export function getTodaysChallenge(): DailyChallenge {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % DAILY_CHALLENGES.length;
  return DAILY_CHALLENGES[index];
}

/**
 * Get a specific challenge by its ID (1-50).
 */
export function getChallengeById(id: number): DailyChallenge | undefined {
  return DAILY_CHALLENGES.find((c) => c.id === id);
}
