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
  {
    worldId: 7,
    intro:
      "You talk to AI assistants, listen to AI-generated playlists, and maybe even use voice commands every day. But have you ever wondered how AI actually HEARS? Sound is invisible — it's just vibrations in the air. So how does a machine make sense of something it can't see or touch? In this course, we'll explore how AI processes sound, speech, and music — and why voice cloning is both amazing and a little scary.",
    sections: [
      {
        title: "How Machines Hear",
        body: "Sound is made of waves — vibrations traveling through the air. When you speak, your vocal cords vibrate, creating waves that travel to someone's ear (or a microphone). A microphone converts those air vibrations into electrical signals, which are then turned into numbers a computer can process.\n\nThink of it like this: imagine drawing a wavy line on paper — peaks for loud moments, dips for quiet ones. That drawing is called a waveform, and it's one way AI \"sees\" sound. But AI can go even further with something called a spectrogram, which is like an X-ray of sound. It shows which frequencies (pitches) are present at every moment, turning invisible sound waves into a colorful image.\n\nOnce sound is converted to numbers or images, AI can analyze it the same way it analyzes any other data — by finding patterns. A dog bark has different patterns than a car horn, and the word \"hello\" has different patterns than the word \"goodbye.\" It all starts with turning vibrations into math.",
        funFact:
          "A spectrogram of a dolphin's clicks looks completely different from human speech — but AI can analyze both! Some researchers use AI to try to decode what dolphins might be communicating.",
      },
      {
        title: "Voice Assistants — How They Work",
        body: "When you say \"Hey Siri, what's the weather?\" it feels like one smooth interaction. But behind the scenes, a whole chain of AI models is working in sequence, like a relay race.\n\nFirst, a wake word detector is always listening for that magic phrase — \"Hey Siri\" or \"OK Google.\" This is a small, specialized AI that runs constantly on your device. Once it hears the wake word, it activates the next step: speech-to-text AI, which converts your spoken words into written text. Then, a natural language understanding AI figures out what you actually WANT — that's called intent recognition. It determines you're asking about weather, not just saying random words.\n\nFinally, the system fetches the answer and a text-to-speech AI converts the written response back into spoken words. That's at least four or five different AI models working together in under a second! Each one is specialized for its job, and if any single link in the chain fails — if speech-to-text mishears you, or intent recognition misunderstands you — the whole thing breaks down.",
        funFact:
          "The wake word detector on your phone processes sound entirely on the device — your voice isn't sent to the internet until AFTER it hears \"Hey Siri\" or \"OK Google.\" That tiny AI model uses less power than the LED on your phone!",
      },
      {
        title: "AI Makes Music",
        body: "Just like language AI learns patterns in sentences, music AI learns patterns in melody, rhythm, and harmony. It studies thousands of songs and discovers that certain chord progressions sound pleasing, certain rhythms make people want to dance, and certain melodies feel happy or sad.\n\nAI can generate a full musical piece — drums, bass, melody, and all. Some AI music tools let you type a description like \"upbeat jazz with piano and saxophone\" and get a complete track in seconds. The AI isn't copying any specific song; it's combining the patterns it learned into something new.\n\nBut here's the key: AI doesn't feel the music. It doesn't know what makes a song emotional or what makes a beat hit just right. That's where you come in. The best AI music is created when a human provides the creative direction — the mood, the purpose, the feeling — and AI handles the technical heavy lifting. Think of it as having a session musician who can play every instrument but needs you to be the producer.",
        funFact:
          "In 2023, an AI-generated song mimicking Drake and The Weeknd went viral with millions of streams before being taken down — sparking a global conversation about AI in the music industry!",
      },
      {
        title: "Sound Fakes & Voice Cloning",
        body: "Here's where things get both exciting and unsettling: AI can now clone a person's voice from just a few seconds of audio. It analyzes the unique characteristics of someone's voice — their pitch, tone, accent, speaking rhythm — and creates a model that can say anything in that voice.\n\nThe helpful uses are genuinely wonderful. People who lose their voice to illness can preserve it digitally and keep \"speaking\" through AI. Endangered languages with few remaining speakers can be documented and taught using cloned voices. Audiobooks can be produced in any author's voice. Accessibility tools can give anyone a natural-sounding voice.\n\nBut the harmful uses are serious. Scammers have used voice cloning to impersonate family members and trick people into sending money. Fake audio of politicians or celebrities saying things they never said can spread misinformation. If you get a panicked phone call from \"grandma\" asking for money, it might not actually be grandma. The rule of thumb: if something sounds urgent and asks for money or personal information, verify through a different channel before acting.",
        funFact:
          "Some voice cloning AI only needs about 3 seconds of audio to create a basic clone of someone's voice. With 30 seconds, the clone becomes nearly indistinguishable from the real person!",
      },
    ],
    wrapUp:
      "Sound AI is one of the most fascinating areas of artificial intelligence — from the complex relay race inside your voice assistant to AI that composes entire symphonies. But voice cloning raises some of the most important questions we face about AI: just because we CAN replicate someone's voice, when SHOULD we? Understanding how sound AI works helps you appreciate the technology AND stay safe when someone tries to fool your ears. Ready to hear it in action? Head to the interactive lessons!",
  },
  {
    worldId: 8,
    intro:
      "AI and games go way back — all the way to the very first video games. Those ghosts chasing you in Pac-Man? That was AI (simple AI, but still AI). The chess computer that beat the world champion? Definitely AI. In this course, we'll explore how AI powers the games you play, how it learned to beat the best human players on Earth, and how it's even starting to design games on its own.",
    sections: [
      {
        title: "NPCs — The AI You Already Know",
        body: "Every time you play a video game, you're interacting with AI — you just might not think of it that way. Those enemy soldiers that take cover when you shoot at them? AI. The villagers in Minecraft who wander around and trade with you? AI. Your teammates in a sports game who pass you the ball? AI.\n\nNon-Player Characters (NPCs) are the most common form of AI in games. Some NPCs follow very simple rules — like a Goomba in Mario that just walks forward and turns around when it hits a wall. Others are much more sophisticated, reacting to your behavior and adapting their strategy.\n\nModern game AI can be impressively complex. Enemies in stealth games might investigate suspicious sounds, alert their friends, and search areas where they last saw you. Companion characters learn to complement your play style. The AI doesn't need to be perfect — it just needs to be fun to play against. Sometimes making AI intentionally imperfect makes the game more enjoyable than a flawless opponent would.",
        funFact:
          "The ghosts in Pac-Man each have different AI personalities! Blinky chases you directly, Pinky tries to get ahead of you, Inky is unpredictable, and Clyde switches between chasing and running away. Game designers programmed these in 1980!",
      },
      {
        title: "AI vs Humans — The Great Battles",
        body: "Some of the most dramatic moments in AI history happened in games. In 1997, IBM's Deep Blue defeated world chess champion Garry Kasparov. It was the first time a computer beat a reigning world champion, and it shocked the world. Kasparov was so stunned he accused IBM of cheating (they didn't).\n\nBut chess is relatively straightforward — there are clear rules and a limited number of moves. The game of Go is different. Go has more possible board positions than there are atoms in the universe. Experts said AI wouldn't beat a top Go player for decades. Then in 2016, Google's AlphaGo defeated world champion Lee Sedol 4 games to 1. Lee Sedol said AlphaGo made moves that no human would ever think of — moves that were initially baffling but turned out to be brilliant.\n\nThen AI went after even bigger challenges. In 2019, OpenAI Five defeated the world champion team in Dota 2, a complex video game where you control characters in real-time, deal with incomplete information, and coordinate with teammates. Each of these victories pushed the boundaries of what people thought AI could do.",
        funFact:
          "AlphaGo's famous \"Move 37\" in Game 2 against Lee Sedol was so unusual that commentators thought it was a mistake. It turned out to be a brilliant strategic move that no human had ever played in thousands of years of Go history!",
      },
      {
        title: "How Game AI Learns",
        body: "The AI that beats human champions doesn't learn by being programmed with strategies — it learns by playing. A LOT. This approach is called reinforcement learning, and it works like training a dog: good behavior gets a reward, bad behavior gets a penalty.\n\nImagine an AI learning to play a simple game. At first, it moves randomly and loses immediately. But sometimes, by pure chance, it does something slightly good — and it gets a small reward. Over time, it does more of the things that earn rewards and less of the things that earn penalties. After millions of games, it develops strategies that no human ever taught it.\n\nThe scale is mind-boggling. OpenAI Five played the equivalent of 45,000 YEARS of Dota 2 in just 10 months. It explored strategies that no human would ever have time to try. This is the power of reinforcement learning: given clear rules and enough time, AI can discover strategies that go beyond human imagination. The same principles that teach AI to play games are now being used to solve real-world problems in robotics, drug discovery, and energy management.",
        funFact:
          "DeepMind's AlphaZero taught itself to play chess from scratch — knowing only the rules — and after just 4 hours of training against itself, it could beat the world's best chess program. It essentially rediscovered centuries of human chess knowledge in an afternoon!",
      },
      {
        title: "AI Designs Games",
        body: "AI doesn't just play games — it's increasingly helping to build them. Procedural generation is a technique where AI algorithms create game content automatically: landscapes, levels, items, quests, even entire worlds.\n\nMinecraft uses procedural generation to create its infinite worlds — no two are exactly alike because the terrain is generated by algorithms as you explore. No Man's Sky took this to an extreme, generating over 18 quintillion unique planets, each with its own terrain, creatures, and ecosystems. No human design team could hand-craft that much content in a thousand lifetimes.\n\nAI is pushing this even further. Newer systems can generate not just landscapes but entire game levels designed to be fun and challenging. Some AI can create puzzles that match a specific difficulty level, or generate storylines that adapt to player choices. Game designers aren't being replaced — but they're getting incredibly powerful tools that let small teams create experiences that used to require hundreds of people.",
        funFact:
          "No Man's Sky contains over 18 quintillion (that's 18 followed by 18 zeros) procedurally generated planets. If you visited one planet per second, it would take 585 billion years to see them all — that's about 42 times the age of the universe!",
      },
      {
        title: "Fair Play — Cheating, Difficulty & AI",
        body: "AI in games raises some interesting fairness questions. Aim-assist in shooting games uses AI to help your cursor snap to enemies — is that fair? Dynamic difficulty adjustment secretly makes the game easier when you're struggling and harder when you're dominating — is that honest? AI anti-cheat systems monitor your behavior to detect cheating — how much surveillance in a game is OK?\n\nThese questions don't have simple answers. Aim-assist helps players with disabilities enjoy games they otherwise couldn't play — that seems great. But in competitive multiplayer, some players feel it gives an unfair advantage. Dynamic difficulty keeps games fun for everyone, but some players feel cheated when they learn the game was secretly going easy on them.\n\nAI anti-cheat is particularly tricky. To catch cheaters, these systems need to monitor a lot of your computer activity — sometimes even scanning your files or running in the background at all times. It's a constant tension between keeping games fair and respecting player privacy. As games become more AI-powered, these questions about fairness, honesty, and privacy will only become more important.",
        funFact:
          "Some racing games have used \"rubber banding\" AI for decades — when you're far ahead, AI opponents speed up, and when you're behind, they slow down. Mario Kart is famous for this!",
      },
    ],
    wrapUp:
      "Games were AI's first playground — the place where researchers could test ideas in a safe, rule-based environment. The reinforcement learning techniques that taught AI to master chess, Go, and Dota 2 are now being applied to solve real-world problems in medicine, science, and engineering. Next time you play a game, pay attention to the AI around you — the NPCs, the generated worlds, the difficulty adjustments. You'll see AI everywhere. Now jump into the interactive lessons and put these concepts to the test!",
  },
  {
    worldId: 9,
    intro:
      "So far, everything we've learned about AI has been on screens — recognizing images, writing text, playing games. But what happens when AI gets a physical body? When it can move through the real world, pick things up, and interact with the environment? That's where robots come in. And when AI meets robotics, everything changes.",
    sections: [
      {
        title: "Brains vs Bodies",
        body: "Here's a simple way to think about the relationship between AI and robots: AI is the brain, and the robot is the body. Without AI, a robot is just a fancy puppet — it can move, but it can't think, decide, or adapt. Without a body, AI is just software on a screen — it can think, but it can't physically do anything in the real world.\n\nPut them together, and you get something remarkable: a machine that can sense the world around it, make decisions, and take physical action. A robot vacuum uses AI to map your house and decide the most efficient cleaning path. A robot arm in a factory uses AI to recognize parts and assemble them with precision.\n\nBut here's the twist that surprises most people: giving AI a body makes everything HARDER, not easier. In the digital world, AI can process millions of images per second. In the physical world, a robot has to deal with gravity, friction, unexpected obstacles, and the fact that if it drops something, there's no \"undo\" button. That's why we have AI that can beat world champions at chess but robots that still struggle to fold a towel.",
        funFact:
          "It took decades of research for robots to reliably walk on two legs. Boston Dynamics' Atlas robot can now do backflips — but it took billions of dollars and thousands of engineers to get there!",
      },
      {
        title: "Self-Driving Cars",
        body: "A self-driving car is one of the most complex robots ever built. To navigate safely, it needs the equivalent of five senses working together. Cameras act as eyes, capturing the visual scene in every direction. LIDAR (Light Detection and Ranging) shoots millions of laser beams to create a precise 3D map of everything nearby. Radar detects the speed and distance of other vehicles, even in rain or fog. GPS provides location data. And microphones listen for emergency sirens.\n\nAll of this sensor data flows into the car's AI brain, which has to make hundreds of decisions every single second. Is that shape a pedestrian or a mailbox? Is that car going to change lanes? Should I slow down for that yellow light? What if a ball rolls into the street — should I expect a child to follow?\n\nThe challenge isn't the normal driving — it's the weird stuff. AI can learn to stay in a lane and follow traffic rules pretty easily. But what about a mattress flying off the truck in front of you? A construction worker waving you through a red light? A dog running across the highway? These rare, unexpected situations are where self-driving AI is still being tested and improved.",
        funFact:
          "Self-driving cars generate about 4 terabytes of data per day — that's roughly the same amount of data you'd use streaming Netflix 24/7 for about 3 months!",
      },
      {
        title: "Robots That Help",
        body: "Some of the most inspiring robots are the ones designed to help people in ways that would be dangerous, impossible, or exhausting for humans. Surgical robots can make incisions smaller than a millimeter, allowing doctors to perform operations with superhuman precision. The doctor is still in control — they're guiding the robot — but the robot's steady hands eliminate human tremor.\n\nIn disaster zones, robots go where humans can't safely go. After earthquakes, snake-like robots can slither through rubble to find survivors. After nuclear disasters, robots can enter highly radioactive areas to assess damage. In deep ocean exploration, robotic submarines have discovered species and ecosystems that no human has ever seen.\n\nRobots are also transforming accessibility. Robotic exoskeletons can help people with paralysis stand and walk. AI-powered prosthetic limbs can learn their user's movement patterns and respond more naturally over time. And in space, robots like the Mars rovers explore other planets on our behalf, making discoveries millions of miles from any human.",
        funFact:
          "The da Vinci surgical robot has performed over 12 million procedures worldwide. Its arms can rotate 540 degrees — way more than a human wrist — and it filters out hand tremors automatically!",
      },
      {
        title: "Robots & Us — Living Together",
        body: "As robots become more capable and more common, we're facing some big questions about how humans and robots will coexist. Already, some people have robot pets (like Sony's Aibo dog) that they genuinely bond with. Companion robots for elderly people can reduce loneliness and remind them to take medication. Some schools are experimenting with robot teaching assistants.\n\nBut this raises fascinating questions. If a child grows up with a robot friend, does that change how they relate to other humans? If a robot teacher is more patient and available than a human teacher, is that better or worse for learning? When a delivery robot is rolling down the sidewalk, should pedestrians give it the right of way?\n\nLooking further ahead, the questions get even bigger. If a robot is intelligent enough to have preferences, should it have rights? Who is responsible when a robot makes a mistake — the robot, the owner, or the company that built it? Your generation will be the first to truly grapple with these questions. You won't just use robots — you'll be the ones who decide the rules for how they fit into our society.",
        funFact:
          "In Japan, a robot named Pepper has been \"employed\" in over 2,000 businesses as a greeter and customer service assistant. Some Japanese people have even held funerals for their robot pets when they stopped working!",
      },
    ],
    wrapUp:
      "Robots with AI are already among us — in operating rooms, on factory floors, in disaster zones, and maybe even in your home. As the technology improves, they'll become an even bigger part of daily life. Your generation won't just live alongside intelligent robots — you'll be the ones who set the rules for how they work, what rights they might have, and how they should treat us. That's a huge responsibility, and understanding AI is the first step. Head to the interactive lessons to explore robotics hands-on!",
  },
  {
    worldId: 10,
    intro:
      "Here's something to think about: AI already shapes your daily life more than you probably realize. It decides what videos you see, what products get recommended to you, what news shows up in your feed, and even how your smart devices behave. In this course, we'll pull back the curtain on the AI that's personal to YOU — and give you the tools to take back control.",
    sections: [
      {
        title: "The Algorithm Knows",
        body: "Every time you watch a video, like a post, or pause while scrolling, an algorithm is watching. Not a creepy person — a mathematical system designed to learn what keeps you engaged. It tracks what you click, how long you watch, what you skip, and what makes you come back.\n\nOver time, the algorithm builds a model of you — your interests, your habits, your emotional triggers. It uses this model to predict what you'll want to see next. And it's REALLY good at it. That's why you sometimes feel like your phone is reading your mind — it's not, but it has analyzed so much of your behavior that its predictions feel eerily accurate.\n\nHere's the important part: these algorithms are designed to maximize engagement — to keep you on the app as long as possible. That's not the same as showing you what's most important, most true, or best for you. An algorithm doesn't care if a video is educational or misleading — it only cares whether you'll keep watching. Understanding this changes how you interact with your feeds.",
        funFact:
          "TikTok's algorithm can figure out your interests with surprising accuracy after you've watched just 30-40 videos. Internal research found it can predict what you'll like better than you can predict it yourself!",
      },
      {
        title: "Filter Bubbles & Echo Chambers",
        body: "Because algorithms show you more of what you already like, they can accidentally trap you in a \"filter bubble\" — a personalized information universe where you mostly see things that confirm what you already believe. If you watch one video about a topic, the algorithm feeds you twenty more just like it.\n\nThis creates echo chambers, where the same ideas bounce around and get amplified. You might start thinking everyone agrees with you — when really, you're just not seeing the other side. Two people can search the exact same term and get completely different results based on their history.\n\nThis isn't a conspiracy — it's a side effect of personalization. The algorithm is doing exactly what it was designed to do: give you more of what you engage with. But the result can be a narrower view of the world. You might miss out on different perspectives, new ideas, and important information that doesn't match your existing interests. Being aware of filter bubbles is the first step to popping them.",
        funFact:
          "Researchers found that two people searching the same political topic on the same search engine can get results so different that they might as well be looking at two different internets!",
      },
      {
        title: "Smart Home, Smart Life",
        body: "Take a moment to count the AI-powered devices in your home. There might be more than you think: smart speakers (Alexa, Google Home), smart TVs that recommend shows, smart thermostats that learn your schedule, robot vacuums that map your rooms, smart doorbells with facial recognition, fitness trackers on your wrist, and phones with voice assistants in every pocket.\n\nEach of these devices is collecting data about you and your family. Your smart speaker knows what questions you ask. Your smart TV knows what you watch and when. Your thermostat knows when you're home and when you're away. Your doorbell camera knows who visits you. Individually, each data point seems harmless. Together, they paint a very detailed picture of your life.\n\nThis doesn't mean smart devices are bad — they're genuinely useful. A smart thermostat can save energy and money. A robot vacuum saves you time. But it's worth asking: what data is being collected? Where is it stored? Who has access to it? And what would happen if that data were leaked or misused? Being a smart user of smart devices means understanding the trade-offs.",
        funFact:
          "A smart speaker in your home can accidentally record conversations it wasn't meant to hear. Amazon has confirmed that human reviewers have listened to Alexa recordings to improve the system — including private moments users didn't know were being recorded!",
      },
      {
        title: "AI & Your Health",
        body: "If you wear a fitness tracker or smartwatch, you're carrying a personal health AI on your wrist. These devices track your steps, heart rate, sleep patterns, stress levels, and sometimes even blood oxygen. The AI inside analyzes this data to spot patterns you might not notice yourself.\n\nSome of these insights are genuinely life-saving. Apple Watches have detected irregular heartbeats and alerted users who turned out to have serious heart conditions they didn't know about. Sleep tracking AI can identify patterns that suggest sleep disorders. Fitness AI can tell you when you're overtraining and need rest.\n\nBut health AI also has limitations. It can cause unnecessary anxiety — checking your heart rate fifty times a day because your watch flagged something that turned out to be nothing. It can give you a false sense of security — just because your tracker says you're healthy doesn't mean you can skip doctor visits. And the accuracy varies widely between devices. Health AI is a useful tool, but it's not a substitute for actual medical care.",
        funFact:
          "In 2023, a man's Apple Watch detected an irregular heartbeat and sent him a notification. He went to the hospital and discovered he had a serious heart condition that required immediate treatment. The watch likely saved his life!",
      },
      {
        title: "Taking Back Control",
        body: "Here's the empowering truth: you are not helpless against algorithms. You have more control than you think. Start with privacy settings — every app and device has them, and most default to collecting the maximum amount of data. Take 10 minutes to go through the privacy settings on your phone and your most-used apps. Turn off what you don't need.\n\nManage your recommendations actively. Most platforms let you tell the algorithm \"not interested\" or \"show less like this.\" Use these tools! Follow accounts that challenge your thinking, not just ones that confirm it. Deliberately search for different perspectives on topics you care about. Pop your filter bubble on purpose.\n\nDigital literacy is a superpower in the age of AI. Understanding how algorithms work gives you the power to use them instead of being used by them. You can enjoy personalized recommendations while knowing they're designed to keep you scrolling. You can use smart devices while controlling what data they collect. Knowledge is the difference between being a passive consumer of AI and being an active, informed user.",
        funFact:
          "Studies show that simply knowing how recommendation algorithms work makes people less likely to fall into filter bubbles. Awareness alone changes behavior — and you now have that awareness!",
      },
    ],
    wrapUp:
      "AI is deeply woven into your personal life — from the videos you watch to the health data on your wrist. That's not inherently good or bad — it's just reality. What matters is whether you're aware of it and whether you're making conscious choices about your relationship with these systems. You now understand how algorithms shape your world, and that awareness gives you the power to take control. Go explore the interactive lessons and become the boss of your own digital life!",
  },
  {
    worldId: 11,
    intro:
      "Enough watching from the sidelines — it's time to BUILD something. You've spent the last ten worlds learning about what AI is, how it works, and what it can do. Now you're going to use that knowledge to actually create something with AI. And here's a secret: you don't need to be a coding genius or a math whiz. The tools available today let anyone build with AI. Let's go.",
    sections: [
      {
        title: "Your AI Toolkit",
        body: "You have access to powerful AI tools right now — many of them free. Teachable Machine by Google lets you train an image, sound, or pose recognition AI right in your browser, no code required. You drag in examples, click train, and boom — you have a working AI model in minutes.\n\nScratch with Machine Learning (ML) extensions combines the beginner-friendly block coding of Scratch with AI capabilities. You can build games and apps that recognize images, understand text, or respond to speech. ChatGPT and similar language AIs can help you brainstorm, debug, and explain concepts as you build. Image generators like DALL-E can create visuals for your projects.\n\nThere are also AI music generators for creating soundtracks, text-to-speech tools for adding narration, and AI coding assistants that can help you write actual code. The toolkit is huge and growing every day. The hardest part isn't finding tools — it's choosing which ones to use for your specific project. Start with one tool, get comfortable, and expand from there.",
        funFact:
          "Teachable Machine is so simple that students as young as 8 have used it to build working AI projects — including one kid who built a system that recognizes different types of recyclable materials to help with sorting!",
      },
      {
        title: "Project Planning",
        body: "Before you touch any tools, you need a plan. The biggest mistake beginners make is jumping straight into building without thinking about what they're building or who it's for. A few minutes of planning saves hours of confusion later.\n\nStart with three questions. First: What problem am I solving? The best projects solve a real problem — even a small one. \"I want my AI to recognize when my cat is at the door\" is a great problem. \"I want to build something cool\" is not specific enough. Second: Who is this for? Yourself? Your family? Your classmates? Knowing your audience shapes every decision. Third: What's realistic? If you've never built an AI project before, don't try to build a self-driving car. Start small.\n\nWrite your plan down in one or two sentences: \"I'm building a [what] that [does what] for [who].\" For example: \"I'm building an AI sorter that identifies different types of birds from photos for my science class.\" That's clear, specific, and achievable. Now you know exactly what to build.",
        funFact:
          "Most successful tech products started as tiny projects. Instagram was originally a simple photo filter app. Google started as a college research project. Your small AI project today could be the start of something huge!",
      },
      {
        title: "Build Phase 1 — Prototype",
        body: "Here's the most liberating rule in building: your prototype is SUPPOSED to look ugly. A prototype is a rough first version — it's proof that your idea works, not a finished product. Professional engineers and designers build ugly prototypes all the time. It's a feature, not a bug.\n\nThe goal of your prototype is simple: make it work. Not pretty, not perfect, not polished — just working. If you're building an image classifier, can it correctly identify at least some of your test images? If you're building a chatbot, can it have a basic conversation? Get the core function working first and ignore everything else.\n\nDon't get stuck trying to make things perfect at this stage. If something is 70% working, move on and come back to fix it later. Speed matters more than quality in a prototype because you need to find out quickly if your idea is feasible. Many great projects pivot completely after the prototype stage — you might discover that your original idea doesn't work, but something you noticed along the way is even better.",
        funFact:
          "The first prototype of the iPhone was a giant tablet-sized device that looked nothing like the sleek phone we know today. Even Apple starts ugly!",
      },
      {
        title: "Build Phase 2 — Iterate",
        body: "You have a working prototype. Now comes the most important phase: iteration. This means going through a cycle of build, test, learn, improve, and repeat — over and over. Every cycle makes your project a little better.\n\nStart by testing your prototype with real users — not just yourself. Show it to a friend, a family member, a classmate. Watch how they use it. Do they get confused? Do they try to do something your project doesn't support? Their struggles reveal what you need to improve. The feedback you get from real users is worth more than hours of you guessing what to fix.\n\nEach time you iterate, focus on one or two improvements. Don't try to fix everything at once. Maybe this round you improve the accuracy of your AI model by adding more training data. Next round you make the interface clearer. The round after that you add a new feature someone requested. Professional developers use this exact process — build, test, learn, improve, repeat. It's not a sign that you did something wrong. It's how all good software is made.",
        funFact:
          "Google runs over 600,000 experiments per year on its search engine — that's thousands of tiny iterations every day. Even the world's biggest tech companies are constantly in the build-test-learn-improve cycle!",
      },
      {
        title: "Build Phase 3 — Polish & Present",
        body: "Your project works. You've iterated based on feedback. Now it's time for the finishing touches that turn a prototype into something you're proud to show off. This is where you clean up the interface, add clear instructions, fix the last bugs, and make sure everything runs smoothly from start to finish.\n\nBut building something great is only half the battle — you also need to present it well. The key to a great demo is explaining the PROBLEM first, not the solution. Don't start with \"I built an AI that classifies images.\" Start with \"My little sister has a rock collection but can't identify any of them, so I built an AI that identifies rocks from photos.\" See the difference? The first is technical. The second is a story that makes people care.\n\nWhen you present, show it working live. Let people try it. Be honest about what works and what doesn't — that shows maturity and real understanding. Explain one interesting challenge you faced and how you solved it. And most importantly, be proud. You just built something with AI. That's a skill that most adults don't have. You took an idea from your head and turned it into something real. That's what builders do.",
        funFact:
          "Steve Jobs was famous for his product demos, but even he rehearsed them dozens of times. A great demo looks effortless — but that effortlessness comes from practice!",
      },
    ],
    wrapUp:
      "You just learned how to build something real with AI — from planning to prototyping to iterating to presenting. That's not just a school project. That's the actual process that professional developers, designers, and engineers use every day. The tools are available, the knowledge is in your head, and the only thing left is to start. Don't wait for the perfect idea — start with a good enough idea and make it better as you go. Head to the interactive lessons and start building!",
  },
  {
    worldId: 12,
    intro:
      "You've made it to the final world. You've learned what AI is, how it learns, how it sees, speaks, creates, plays, moves, and affects your daily life. You've even built something with it. Now let's look forward. What's coming next? What are the biggest opportunities — and the biggest risks? And most importantly, what role will YOU play in shaping AI's future?",
    sections: [
      {
        title: "AI in 2030",
        body: "The near future of AI is already taking shape, and some of it sounds like science fiction. Personalized AI tutors will adapt to each student's learning style, pace, and interests — imagine a teacher who knows exactly what you're struggling with and explains it in exactly the way you learn best, available 24/7.\n\nReal-time translation earbuds will let you have a conversation with anyone in the world, in any language, with almost no delay. You'll speak English, they'll hear Mandarin. They'll speak Mandarin, you'll hear English. The language barrier — one of humanity's oldest challenges — could essentially disappear within your lifetime.\n\nAutonomous delivery robots and drones will bring packages and food to your door. AI medical assistants will help doctors catch diseases earlier and recommend more personalized treatments. AI will help scientists discover new materials, design more efficient buildings, and optimize energy grids. These aren't far-off dreams — most of these technologies already exist in early forms and will mature in the next few years.",
        funFact:
          "Several companies are already testing real-time translation earbuds that can handle over 40 languages. By 2030, experts predict they'll be as common as wireless headphones are today!",
      },
      {
        title: "AI & Big Problems",
        body: "The most exciting potential of AI isn't in consumer gadgets — it's in tackling humanity's biggest challenges. Climate change is perhaps the most urgent: AI is being used to optimize energy grids, design more efficient solar panels, predict extreme weather events, and even discover new materials for carbon capture.\n\nIn healthcare, AI is helping researchers develop new medicines faster than ever. During the COVID-19 pandemic, AI helped analyze the virus's structure and contributed to vaccine development at unprecedented speed. AI is also being used to predict disease outbreaks, personalize cancer treatments, and make healthcare more accessible in remote areas.\n\nFood security is another frontier. AI helps farmers use water and fertilizer more efficiently, predicts crop diseases before they spread, and is even being used to develop alternative proteins. And in space exploration, AI helps navigate rovers on Mars, analyze data from telescopes searching for habitable planets, and plan missions that would be too complex for humans to calculate alone. The problems are enormous — but so is AI's potential to help solve them.",
        funFact:
          "DeepMind's AlphaFold AI solved a 50-year-old biology problem by predicting the 3D structure of nearly every known protein. Scientists say this will accelerate drug discovery by years or even decades!",
      },
      {
        title: "The Risks Ahead",
        body: "It would be dishonest to talk about AI's future without talking honestly about the risks. Surveillance is a major concern — as AI gets better at tracking faces, analyzing behavior, and processing data, governments and companies gain unprecedented power to monitor people. Some countries already use AI surveillance on their citizens in ways that most people would find deeply troubling.\n\nInequality is another risk. AI could widen the gap between rich and poor — between countries that develop AI and countries that don't, between companies that control AI and workers whose jobs are displaced by it. If the benefits of AI flow mostly to those who are already powerful, it could make existing inequalities much worse.\n\nThere's also the problem of unexplainable AI. As AI systems become more complex, even their creators sometimes can't explain WHY the AI made a particular decision. When that decision affects whether you get a loan, get into a school, or get a job, \"the AI decided\" isn't a good enough answer. We need AI systems that can explain their reasoning — and humans who hold them accountable.",
        funFact:
          "The European Union's AI Act, passed in 2024, is the world's first comprehensive AI law. It bans certain uses of AI (like social scoring) and requires high-risk AI systems to meet strict safety standards. Other countries are now following their lead.",
      },
      {
        title: "Your AI Future",
        body: "Here's the most important thing to understand: you are not just a consumer of AI. You are a shaper of AI. The generation growing up right now — your generation — will make the decisions that determine how AI affects humanity for the next century. That's not an exaggeration.\n\nYoung people are already making an impact. Teenagers have built AI systems that detect wildfires from satellite images, identify microplastics in water, diagnose plant diseases to help farmers, and translate sign language in real time. You don't need a PhD or a tech company to make a difference — you need curiosity, a problem you care about, and the tools we've been learning about.\n\nYou now understand AI in a way that most adults don't. You know how it learns, where it fails, how it can be biased, and what makes it powerful. That knowledge gives you something incredibly valuable: the ability to ask the right questions. Not just \"what can AI do?\" but \"what SHOULD AI do?\" Not just \"how does it work?\" but \"who does it work FOR?\" Those questions will guide the future of this technology — and you're equipped to answer them.",
        funFact:
          "A 14-year-old built an AI app that helps people with Alzheimer's recognize their family members using facial recognition. Young people aren't waiting for permission to use AI for good — they're just building!",
      },
    ],
    wrapUp:
      "You've completed the entire TeachAI journey. Think about how far you've come: from \"what even IS AI?\" to understanding machine learning, language models, computer vision, creativity, ethics, sound, games, robots, personal AI, building projects, and now the future. You understand AI better than most adults on the planet. That's not just impressive — it's important. Because the future of AI won't be decided by the technology itself. It will be decided by people who understand it. People like you. Now go out there, keep learning, keep building, and keep asking the hard questions. The future is yours to shape.",
  },
];

export function getCourseContent(worldId: number): CourseContent | undefined {
  return COURSE_CONTENT.find((c) => c.worldId === worldId);
}
