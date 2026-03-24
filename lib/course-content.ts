export interface CourseSection {
  title: string;
  body: string;
  funFact?: string;
}

export interface CourseContent {
  worldId: number;
  intro: string;
  sections: CourseSection[];
  wrapUp: string;
}

export const COURSE_CONTENT: CourseContent[] = [
  {
    worldId: 1,
    intro:
      "You've probably heard people talk about AI — in movies, in the news, maybe even at school. But what actually IS artificial intelligence? In this course, we're going to pull back the curtain and find out. Spoiler: it's not magic, it's not a robot brain, and it's definitely not like the movies.",
    sections: [
      {
        title: "Smart vs. Programmed",
        body: "Think about a calculator. You press 2 + 2 and it gives you 4. Every single time. It follows exact rules that a human programmed into it. Now think about how you learned to catch a ball — nobody gave you a formula. You just practiced, missed a bunch, and got better over time.\n\nThat's the big difference between regular software and AI. A calculator follows rules. AI learns from examples. When something unexpected happens, the calculator breaks — but AI can adapt because it learned patterns, not just rules.\n\nThis doesn't mean AI is \"smart\" like a person. It's more like a very powerful pattern-matching machine. It looks at thousands (or millions) of examples and figures out the patterns. But it doesn't truly understand what it's doing.",
        funFact:
          "The first computer program ever written was by Ada Lovelace in 1843 — over 100 years before the first actual computer was built!",
      },
      {
        title: "AI is Everywhere",
        body: "Here's something that might surprise you: you probably use AI every single day. When your phone suggests the next word you're typing — that's AI. When Netflix recommends a show — AI. When Spotify makes you a playlist — AI. When your email filters out spam — you guessed it, AI.\n\nBut not everything that seems \"smart\" is AI. A traffic light that changes on a timer? That's just following a schedule — no learning involved. A thermostat that turns on at 70 degrees? Just a simple rule.\n\nThe key question to ask is: does this thing learn and adapt from data, or is it just following instructions someone wrote?",
        funFact:
          "Your phone's keyboard AI learns YOUR specific typing patterns — that's why it gets better at predicting what you want to say over time!",
      },
      {
        title: "What AI Can and Can't Do",
        body: "AI is incredible at some things. It can scan millions of medical images and spot a tiny tumor that a tired doctor might miss. It can translate languages in real time. It can beat the world's best chess and Go players.\n\nBut AI is also terrible at things that are easy for you. It can't really understand a joke (it can recognize joke patterns, but it doesn't find anything funny). It can't use common sense — like knowing you shouldn't put a glass of water on your head. It can't truly feel emotions or understand why a sunset is beautiful.\n\nThe things AI is good at (processing huge amounts of data, finding patterns, repetitive tasks) are different from what humans are good at (creativity, empathy, common sense, adapting to totally new situations). That's important to remember.",
      },
      {
        title: "A Brief History of AI",
        body: "AI isn't new — not even close. In 1950, a brilliant mathematician named Alan Turing asked: \"Can machines think?\" That question kicked off decades of research.\n\nIn 1956, scientists at a workshop at Dartmouth College officially named the field \"Artificial Intelligence\" and predicted that machines would be as smart as humans within 20 years. They were... very wrong about the timeline.\n\nFor decades, AI went through cycles of excitement and disappointment (scientists call the down periods \"AI winters\"). Progress was slow because computers weren't powerful enough and there wasn't enough data.\n\nThen, around 2012, everything changed. Computers got incredibly fast, the internet created enormous amounts of data, and a technique called \"deep learning\" started producing amazing results. That's why AI has exploded in the last few years — the ingredients finally came together.",
        funFact:
          "The term \"Artificial Intelligence\" was coined in 1956 — the same year Elvis Presley first appeared on TV!",
      },
    ],
    wrapUp:
      "So now you know: AI is a tool that learns from data and finds patterns. It's not magic, it's not alive, and it's not perfect. But it IS powerful, and it's everywhere. The more you understand about how it works, the better you can use it — and the better you can spot when someone is exaggerating what it can do. Ready to see it in action? Head to the interactive lessons!",
  },
  {
    worldId: 2,
    intro:
      "OK, so AI learns from examples instead of following fixed rules. But HOW does it actually learn? What happens inside the machine? In this course, we'll break down the process of machine learning — and you'll see that it's not mysterious at all. It's actually a lot like how you learn... just with way more math.",
    sections: [
      {
        title: "Learning from Examples",
        body: "Imagine you're teaching a little kid what a dog is. You don't hand them a 50-page manual about dogs. You just point at dogs and say \"dog!\" After seeing enough dogs — big ones, small ones, fluffy ones, short-haired ones — the kid figures out the pattern.\n\nThat's basically how supervised learning works. You show AI thousands of labeled examples: \"This is a cat. This is a dog. This is a cat. This is a dog.\" The AI finds patterns in the data (pointy ears vs. floppy ears, face shape, size) and builds an internal model.\n\nThe key insight: AI doesn't start knowing ANYTHING. It starts with zero knowledge and builds up entirely from examples. The more diverse and accurate the examples, the better it learns.",
        funFact:
          "Google's image AI was trained on over 14 million labeled images from a database called ImageNet — that's like looking at a new picture every second for 162 straight days!",
      },
      {
        title: "What is Training Data?",
        body: "Training data is the set of examples you feed to an AI so it can learn. And here's the thing that trips most people up: the data matters MORE than the AI itself.\n\nThink of it this way. If you only ever showed a kid golden retrievers and said \"dog,\" they might not recognize a chihuahua as a dog. If you only trained an AI to recognize faces using photos of one ethnicity, it would be terrible at recognizing faces of other ethnicities. (This has actually happened in the real world.)\n\nThis is the \"garbage in, garbage out\" principle. If your training data is biased, incomplete, or wrong, your AI will be biased, incomplete, or wrong. The data is the foundation of everything.",
        funFact:
          "One famous AI was trained to detect if photos showed a wolf or a husky. It seemed super accurate — until researchers realized it was just looking for SNOW in the background, not the actual animal!",
      },
      {
        title: "Patterns and Predictions",
        body: "Once an AI has learned from training data, it uses those patterns to make predictions about NEW things it's never seen before. That's the whole point.\n\nA weather AI looks at patterns in temperature, humidity, wind, and historical data to predict tomorrow's weather. A music AI looks at patterns in what you've listened to and predicts what you'll enjoy next. A language AI looks at patterns in billions of sentences and predicts the next word.\n\nIt's all pattern completion. AI is essentially a super-powered guessing machine. It finds statistical patterns in massive amounts of data and uses those patterns to make educated guesses. Sometimes those guesses are amazing. Sometimes they're hilariously wrong.",
      },
      {
        title: "When AI Gets It Wrong",
        body: "AI makes mistakes. A lot of them, actually. And here's the tricky part: AI can sound VERY confident while being completely wrong.\n\nA language AI might confidently tell you that the capital of Australia is Sydney (it's actually Canberra). An image AI might confidently say a blueberry muffin is a chihuahua (seriously — there are famous examples of this).\n\nThe problem is that AI doesn't \"know\" anything — it just calculates probabilities. When it says it's 95% sure about something, it's just saying the pattern match is strong. But strong pattern matches can still be wrong, especially with unusual or tricky inputs.\n\nThis is why humans need to stay in the loop. Never blindly trust AI output — always think critically about whether the answer makes sense.",
        funFact:
          "AI image classifiers have famously confused chihuahuas with blueberry muffins, puppies with bagels, and Labradoodles with fried chicken. Google it — the comparison photos are amazing!",
      },
      {
        title: "Practice Makes Better (Not Perfect)",
        body: "Just like you get better at basketball by practicing, AI gets better with more training data and feedback. But here's an important nuance: it never becomes perfect.\n\nIn the beginning, more data helps a LOT. Going from 100 examples to 1,000 makes a huge difference. But going from 1 million to 2 million? The improvement is tiny. This is called diminishing returns.\n\nAlso, some tasks are just genuinely hard. Even with unlimited data, there are predictions AI will never get 100% right — like predicting the weather weeks in advance, or knowing exactly what a person is feeling. Some things have too much randomness or require understanding that goes beyond pattern matching.\n\nThe goal isn't a perfect AI. The goal is an AI that's useful — one that's right often enough to be helpful, while humans handle the cases where it falls short.",
      },
    ],
    wrapUp:
      "Machine learning boils down to this: show AI lots of examples, it finds patterns, and it uses those patterns to make predictions. The quality of the data matters enormously, mistakes are inevitable, and more practice helps but has limits. Understanding this process is like having X-ray vision — you can see through the hype and understand what AI can really do. Now go try the interactive lessons and experience it firsthand!",
  },
  {
    worldId: 3,
    intro:
      "You've probably used ChatGPT, or seen people talk to Siri, Alexa, or Google Assistant. Language AI is everywhere — and it feels like magic. But it's not. In this course, we'll look under the hood at how AI reads, writes, predicts, and translates language. You'll never look at autocomplete the same way again.",
    sections: [
      {
        title: "How AI Reads",
        body: "Here's something wild: AI doesn't understand words. Not the way you do. When you read the word \"dog,\" you picture a furry animal, maybe hear a bark, remember a specific dog you know. AI sees the word \"dog\" and converts it into... a list of numbers.\n\nThis process is called word embedding. Every word gets mapped to a point in a mathematical space. Words with similar meanings end up close together — \"dog\" and \"puppy\" are neighbors, while \"dog\" and \"refrigerator\" are far apart.\n\nThis number-based representation lets AI do math with language. It can calculate that \"king\" minus \"man\" plus \"woman\" roughly equals \"queen.\" Not because it understands royalty or gender — but because the patterns in millions of sentences create these mathematical relationships.",
        funFact:
          "The word embedding for \"king\" minus \"man\" plus \"woman\" really does equal something very close to \"queen\" — AI figured this out entirely from reading text, with no one teaching it what those words mean!",
      },
      {
        title: "Predicting the Next Word",
        body: "Here's the secret behind ChatGPT and every other language AI: they predict the next word. That's it. That's the whole trick.\n\n\"The cat sat on the ___\" — what comes next? You'd probably say \"mat\" or \"chair\" or \"floor.\" Language AI does the same thing, but it was trained on billions of sentences, so its predictions are incredibly sophisticated.\n\nWhen ChatGPT writes a paragraph, it's generating one word at a time, each time asking: \"Given everything so far, what's the most likely next word?\" It's like the world's most advanced autocomplete.\n\nThis is why AI can write things that SOUND intelligent without actually understanding what it's saying. It's incredibly good at mimicking the patterns of human language — but there's no real comprehension happening behind the curtain.",
      },
      {
        title: "The Art of Asking (Prompt Craft)",
        body: "Since language AI responds to text input, the way you phrase your question (your \"prompt\") matters enormously. A vague prompt gets a vague answer. A specific, well-structured prompt gets a much better result.\n\nCompare these two prompts:\n- \"Tell me about space\" → You'll get a generic paragraph about outer space.\n- \"Explain why Mars looks red, in 3 sentences, for a 10-year-old\" → You'll get exactly what you need.\n\nGood prompts include: context (who you are, what you need), specificity (exactly what you want), format (how you want it structured), and constraints (length, audience, tone).\n\nLearning to write good prompts is a genuinely useful skill. It's like learning to ask good questions — the better your question, the better the answer you'll get.",
        funFact:
          "\"Prompt engineering\" is now an actual job title at some companies — people get paid to figure out the best way to talk to AI!",
      },
      {
        title: "Lost in Translation",
        body: "AI translation has come incredibly far. Google Translate used to be a joke — now it's genuinely useful for most situations. But it still struggles with some things that are easy for human translators.\n\nIdioms are a classic problem. \"It's raining cats and dogs\" doesn't mean animals are falling from the sky, but an AI translating word-by-word might not catch that. Humor, sarcasm, and cultural references are tricky too — a joke that's hilarious in English might make no sense in Japanese, and a good translator adapts the joke. AI usually can't do that.\n\nContext also matters. The word \"bank\" means something different in \"I went to the bank\" vs. \"I sat on the river bank.\" Modern AI is better at handling this, but it still makes mistakes, especially in languages with less training data.",
      },
      {
        title: "AI as a Writing Partner",
        body: "AI can help you write — brainstorm ideas, suggest different wordings, check grammar, even draft entire paragraphs. But there's something it absolutely cannot do: bring YOUR perspective.\n\nAI writes by combining patterns from millions of other texts. That means its output is, by definition, average. It's a blend of everything it's read. YOUR writing is different because it comes from YOUR experiences, YOUR thoughts, YOUR way of seeing the world.\n\nThe best way to use AI for writing is as a partner, not a replacement. Let it help with the mechanical stuff — finding the right word, fixing sentence structure, generating rough drafts. But always add your own ideas, voice, and critical thinking. The human part is what makes writing worth reading.",
      },
    ],
    wrapUp:
      "Language AI is one of the most impressive applications of machine learning — and also one of the most misunderstood. It doesn't understand language; it predicts patterns in language. It's an incredible tool for writing, translating, and communicating, but it works best when paired with human judgment and creativity. Go try the interactive lessons to see these concepts in action!",
  },
  {
    worldId: 4,
    intro:
      "You see the world through your eyes — and it feels effortless. You glance at a photo and instantly know it's a dog in a park on a sunny day. But for AI, \"seeing\" is an incredibly complex process. In this course, we'll explore how AI interprets images, from raw pixels to object recognition, and discover where it still falls short.",
    sections: [
      {
        title: "Pixels and Patterns",
        body: "When you look at a photo, you see a cat. When AI looks at the same photo, it sees a grid of numbers. Every image is made up of tiny colored squares called pixels, and each pixel is just three numbers — one for red, one for green, one for blue.\n\nA typical phone photo might have 12 million pixels. That's 36 million numbers. From those raw numbers alone, AI has to figure out: \"This is a tabby cat sitting on a blue couch.\"\n\nThink about how remarkable that is. You go from a massive spreadsheet of numbers to understanding what's in the picture. AI does this by looking at which pixels are similar to their neighbors (creating edges), which groups of pixels form shapes, and which shapes combine into recognizable objects.",
        funFact:
          "A single 4K photo contains over 8 million pixels — that's more numbers for AI to process than the entire text of the Harry Potter series!",
      },
      {
        title: "Finding Edges and Shapes",
        body: "AI vision works in layers, kind of like a detective building a case. The first layer detects simple things: edges, lines, and color changes. The next layer combines those edges into shapes: circles, rectangles, curves. The layer after that recognizes parts: an eye, a wheel, a leaf. And finally, the top layer puts it all together: \"That's a face\" or \"That's a car.\"\n\nThis layered approach is inspired by how your own visual brain works! Scientists discovered that your brain processes vision in similar stages — simple features first, complex objects last.\n\nThe technique behind this is called a Convolutional Neural Network (CNN). Each layer has \"filters\" that scan across the image looking for specific patterns. Early filters look for basic edges; later filters look for increasingly complex features.",
      },
      {
        title: "Teaching AI to See",
        body: "To train an image classifier, you need thousands of labeled examples. Want AI to recognize cats? Show it 10,000 photos labeled \"cat\" and 10,000 photos labeled \"not cat.\" The AI learns what features make something cat-like.\n\nBut edge cases are genuinely difficult. Is a cat costume a cat? Is a cartoon cat a cat? What about a cat that's mostly hidden behind a box? Even humans disagree on some of these!\n\nThe diversity of training images matters enormously. If you only train on photos of white cats, the AI won't recognize black cats. If all your photos are well-lit, the AI will struggle with dark photos. Good training data needs to cover the full range of what the AI might encounter in the real world.",
        funFact:
          "ImageNet, the database used to train many vision AIs, was labeled by over 25,000 workers who spent 2 years categorizing 14 million images into 22,000 categories!",
      },
      {
        title: "Faces and Recognition",
        body: "Facial recognition is one of the most powerful — and most controversial — applications of AI vision. It works by mapping the geometry of your face: the distance between your eyes, the shape of your jawline, the width of your nose, the depth of your eye sockets.\n\nThese measurements create a unique \"face print\" — similar to a fingerprint but for your face. Modern systems can identify people with over 99% accuracy under good conditions.\n\nBut the controversy is real. Facial recognition has been shown to be less accurate for certain demographics (particularly women and people with darker skin), raising serious fairness concerns. It's also used for surveillance in ways that many people find troubling. Just because we CAN recognize faces doesn't mean we always SHOULD.",
      },
      {
        title: "When AI Sees Things That Aren't There",
        body: "Here's something mind-bending: you can fool AI vision by changing just a few pixels in an image — changes so tiny that you literally cannot see the difference. These are called adversarial examples.\n\nResearchers have shown that adding a specific pattern of tiny pixel changes to a photo of a panda can make AI confidently classify it as a gibbon. The image looks IDENTICAL to human eyes, but the AI is completely fooled.\n\nThis matters because if we're relying on AI vision for important things — self-driving cars, security systems, medical diagnosis — we need to know it can be tricked. A sticker on a stop sign could potentially make a self-driving car's AI think it's a speed limit sign. These vulnerabilities are an active area of research.",
        funFact:
          "Researchers created a pair of glasses with a special pattern that could fool facial recognition AI into thinking the wearer was a completely different person!",
      },
    ],
    wrapUp:
      "AI vision has come incredibly far — it can diagnose diseases from X-rays, drive cars, and recognize faces in crowds. But it's fundamentally different from human vision. It sees numbers, not meaning. It can be fooled in ways humans can't. Understanding these strengths and weaknesses helps you appreciate both how impressive and how limited AI vision really is. Dive into the interactive lessons to see for yourself!",
  },
  {
    worldId: 5,
    intro:
      "AI can paint pictures, write songs, compose poetry, and generate videos. Does that mean it's creative? That's one of the biggest debates in AI right now. In this course, we'll explore how AI creates things, what \"creativity\" really means, and why the human-AI creative partnership might be the most exciting thing happening in technology.",
    sections: [
      {
        title: "Can AI Be Creative?",
        body: "Let's start with the big question: when AI generates a beautiful painting or a catchy melody, is that creativity?\n\nIt depends on how you define creativity. AI generates new content by finding patterns in existing content and recombining them in new ways. A music AI trained on thousands of jazz songs can produce a new jazz piece that sounds genuinely original — but every note is derived from patterns in its training data.\n\nSome people say that's exactly what human creativity is too — we remix our influences and experiences into something new. Others argue that true creativity requires intention, emotion, and consciousness — things AI doesn't have.\n\nThere's no right answer yet. But here's what's clear: AI can produce novel, interesting, and even beautiful things. Whether we call that \"creative\" is a philosophical question, not a technical one.",
      },
      {
        title: "How AI Makes Images",
        body: "Text-to-image AI (like DALL-E or Midjourney) works by learning the relationship between words and images from millions of image-caption pairs. When you type \"a cat wearing a top hat on the moon,\" the AI doesn't search for that image — it GENERATES one from scratch.\n\nThe process involves starting with random noise (like TV static) and gradually refining it, step by step, until it matches the description. Each step makes the image a little more coherent, a little more detailed.\n\nThe cool thing: the same prompt produces a different image every time, because the starting noise is random. It's like asking 10 artists to paint the same scene — you'll get 10 different interpretations.\n\nThe limitation: AI doesn't truly understand the concepts. It knows what things LOOK like together but not what they MEAN. That's why you sometimes get weird results — hands with six fingers, text that's almost-but-not-quite readable.",
        funFact:
          "An AI-generated artwork called \"Th\u00e9\u00e2tre D'op\u00e9ra Spatial\" won first place at the Colorado State Fair art competition in 2022 — sparking huge debate about whether AI art should be allowed in contests!",
      },
      {
        title: "AI Music and Sound",
        body: "AI can compose music by learning patterns in melody, rhythm, harmony, and song structure from thousands of existing songs. It can generate a pop song, a classical symphony, or a hip-hop beat.\n\nBut here's the interesting part: the AI doesn't know what music FEELS like. It doesn't experience the joy of a major chord or the tension of a minor one. It just knows that certain patterns of notes tend to follow other patterns.\n\nThis is where humans come in. A human decides: \"I want a sad song about rain\" or \"I need upbeat background music for a video.\" The human provides the creative vision — the WHY. The AI can help with the HOW — generating melodies, suggesting chord progressions, creating arrangements. The best AI music tools are the ones that let humans steer the creative direction.",
      },
      {
        title: "The Remix Question",
        body: "Here's an uncomfortable question: AI art is trained on millions of human artworks, often without the artists' permission. Is that fair?\n\nSome argue it's no different from how human artists learn — by studying other artists' work. When you learn to draw by copying your favorite cartoonist's style, nobody calls that theft. Isn't AI doing the same thing at scale?\n\nOthers argue there's a big difference between a person learning from art (developing their own perspective) and a company scraping millions of artworks to build a commercial product. Many artists feel their work was used without consent or compensation.\n\nThis is genuinely complicated and the rules are still being figured out. Courts around the world are hearing cases about AI training data and copyright. There are no easy answers — but it's important to think about the human creators behind the data.",
        funFact:
          "Over 10,000 artists signed an open letter protesting the use of their artwork in AI training data without permission or payment.",
      },
      {
        title: "Humans + AI Together",
        body: "The most exciting creative work isn't AI alone or humans alone — it's humans and AI working together.\n\nThink of AI as the ultimate creative assistant. A filmmaker can use AI to generate concept art for scenes they haven't shot yet. A musician can use AI to explore chord progressions they'd never think of on their own. A writer can use AI to brainstorm plot ideas, then craft the actual story themselves.\n\nThe human brings: vision, taste, emotion, meaning, intention, and the ability to say \"this is what I want to express.\" The AI brings: speed, variation, technical execution, and the ability to generate hundreds of options in seconds.\n\nYou are the creative director. AI is a powerful tool in your toolkit. The most important skill isn't knowing how to use the tool — it's knowing what you want to create in the first place.",
      },
    ],
    wrapUp:
      "AI creativity raises fascinating questions about what it means to create, to be original, and to be an artist. The technology is powerful and getting better fast. But the human role isn't going away — if anything, it's becoming more important. The people who thrive will be the ones who can combine their unique human perspective with AI's capabilities. Ready to create? Jump into the interactive lessons!",
  },
  {
    worldId: 6,
    intro:
      "AI is powerful. But with great power comes great responsibility (yes, like Spider-Man). In this final course, we tackle the hard questions: How can AI be unfair? Who's in charge? Can you trust what AI shows you? And what does YOUR future with AI look like? These aren't easy questions — but they're the most important ones.",
    sections: [
      {
        title: "Bias In, Bias Out",
        body: "AI learns from data created by humans. And humans have biases — sometimes obvious, sometimes hidden. When those biases are baked into training data, AI amplifies them.\n\nReal examples: hiring AI trained on historical hiring data discriminated against women, because the historical data reflected decades of gender bias in hiring. Facial recognition AI was less accurate for people with darker skin, because the training data was mostly lighter-skinned faces. A healthcare AI gave lower priority to Black patients because it used healthcare spending as a proxy for health needs — but systemic inequality meant Black patients historically had less access to healthcare spending.\n\nNone of these AIs were programmed to be biased on purpose. They simply learned the patterns in their data — and the data reflected an imperfect world. This is why diverse teams building AI, and careful auditing of training data, are so critically important.",
        funFact:
          "Amazon built an AI hiring tool that penalized r\u00e9sum\u00e9s containing the word \"women's\" (as in \"women's chess club\"). They had to scrap the entire system.",
      },
      {
        title: "Who Decides?",
        body: "Every AI system is built by people who make choices: What data to train on. What to optimize for. What counts as \"success.\" These choices embed values — and values are not neutral.\n\nIf a social media AI is optimized for \"engagement,\" it will learn that outrage keeps people scrolling. Is that good? If a news AI is optimized for \"relevance,\" who decides what's relevant? If a self-driving car has to choose between two bad options in a crash, whose values guide that choice?\n\nThere's no such thing as a value-free AI. Every system reflects the priorities of the people who built it. That's not necessarily bad — but it means we need to ask: whose values? Who benefits? Who might be harmed? And are the people affected by AI decisions part of the conversation about how it's designed?",
      },
      {
        title: "Real or Fake?",
        body: "AI can now generate text, images, audio, and video that are incredibly hard to distinguish from real content. Deepfake videos can put words in anyone's mouth. AI can write articles that read like a journalist wrote them. Generated photos of people who don't exist look completely real.\n\nThis is genuinely concerning. Misinformation can spread faster when it's easy to create convincing fake content. A deepfake video of a politician saying something they never said could influence an election. A fake image of a celebrity could ruin a reputation.\n\nSo how do you protect yourself? Look for multiple sources. Check if reputable news outlets are reporting the same thing. Be extra skeptical of content that makes you feel a strong emotion — outrage, fear, excitement — because that's often a sign it was designed to manipulate. And remember: just because something looks real doesn't mean it is.",
        funFact:
          "The website \"This Person Does Not Exist\" generates a completely new, realistic human face every time you refresh the page — none of these people are real!",
      },
      {
        title: "Privacy and Your Data",
        body: "AI needs data to function. A lot of data. And much of that data comes from people — from you.\n\nEvery time you use an app, you generate data: what you click on, how long you look at something, what you search for, where you go, who you talk to. This data is incredibly valuable because it helps AI understand and predict human behavior.\n\nSome data collection is obvious (you know Google Maps tracks your location). Some is less obvious (many apps track exactly how you scroll through content). And some is invisible (your data might be combined with data from other sources to build a surprisingly detailed profile of you).\n\nThis doesn't mean you should be paranoid. But you should be aware. Read privacy settings. Understand what you're agreeing to. And know that \"free\" apps aren't actually free — you're often paying with your data.",
      },
      {
        title: "AI Rules: Who Makes Them?",
        body: "Right now, the world is trying to figure out how to govern AI. It's like the early days of the internet — the technology is moving faster than the rules.\n\nDifferent places are taking different approaches. The European Union has passed comprehensive AI regulations that classify AI systems by risk level. The United States has taken a lighter approach, relying more on voluntary guidelines. China has its own AI regulations focused on different priorities.\n\nCompanies also set their own rules. Some AI companies have ethics boards. Some publish guidelines about what their AI should and shouldn't do. But there's no global standard.\n\nHere's the important thing: these rules will shape YOUR future. The decisions being made now about AI regulation will affect what jobs look like, how privacy works, and how fair society is. Your generation will live with these rules — and eventually, you'll be the ones making them.",
      },
      {
        title: "Your AI Future",
        body: "AI will keep getting more powerful. That's not a prediction — it's a certainty. The question isn't whether AI will change the world. It's how.\n\nSome jobs will be transformed or replaced by AI. But new jobs will be created — jobs we can't even imagine yet. The most valuable skills in an AI world won't be things AI can do (memorizing facts, crunching numbers). They'll be things AI can't do: critical thinking, creativity, empathy, leadership, ethical judgment.\n\nYou are growing up at arguably the most important moment in the history of this technology. The choices your generation makes about AI — how to build it, how to use it, how to regulate it — will shape the world for decades to come.\n\nThe fact that you're learning about AI now, understanding how it works and what its limitations are, puts you ahead. You won't just be a user of AI — you'll be someone who understands it, questions it, and helps guide its future.",
        funFact:
          "The World Economic Forum estimates that 65% of children entering school today will work in jobs that don't exist yet — many of which will involve AI!",
      },
    ],
    wrapUp:
      "AI ethics isn't a side topic — it's THE topic. Every technical capability of AI connects back to questions about fairness, privacy, truth, and power. You now have the foundation to think critically about AI in your life and in the world. That's not just knowledge — it's a superpower. Go complete the interactive lessons and earn your Ethics Guardian badge!",
  },
];

export function getCourseContent(worldId: number): CourseContent | undefined {
  return COURSE_CONTENT.find((c) => c.worldId === worldId);
}
