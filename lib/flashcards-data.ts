import { WORLDS } from "./course-data";

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  worldId: number;
  lessonId: string;
}

// Generate flashcards from course content
export const FLASHCARDS: Flashcard[] = [
  // World 1: What is AI?
  { id: "fc-1-1a", term: "Artificial Intelligence", definition: "A computer system designed to perform tasks that normally require human intelligence, like recognizing images or understanding language.", worldId: 1, lessonId: "1-1" },
  { id: "fc-1-1b", term: "Programmed Behavior", definition: "When a computer follows exact step-by-step instructions written by a human, without learning on its own.", worldId: 1, lessonId: "1-1" },
  { id: "fc-1-2a", term: "AI in Daily Life", definition: "AI systems we interact with every day, like voice assistants, recommendation algorithms, and auto-correct.", worldId: 1, lessonId: "1-2" },
  { id: "fc-1-2b", term: "Recommendation Algorithm", definition: "An AI system that suggests content (videos, songs, products) based on what you and others have liked before.", worldId: 1, lessonId: "1-2" },
  { id: "fc-1-3a", term: "AI Limitations", definition: "Things AI cannot do well, such as truly understand emotions, have common sense, or be creative in the way humans are.", worldId: 1, lessonId: "1-3" },
  { id: "fc-1-3b", term: "Narrow AI", definition: "AI that is designed to do one specific task very well, like playing chess or recognizing faces, but cannot do other tasks.", worldId: 1, lessonId: "1-3" },
  { id: "fc-1-4a", term: "Turing Test", definition: "A test proposed by Alan Turing where a human tries to tell if they are chatting with a machine or another human.", worldId: 1, lessonId: "1-4" },
  { id: "fc-1-4b", term: "Machine Learning Era", definition: "The period starting in the 1990s-2000s when AI shifted from hand-coded rules to systems that learn from data.", worldId: 1, lessonId: "1-4" },

  // World 2: How Machines Learn
  { id: "fc-2-1a", term: "Training Data", definition: "The collection of examples that a machine learning system uses to learn patterns and make predictions.", worldId: 2, lessonId: "2-1" },
  { id: "fc-2-1b", term: "Supervised Learning", definition: "A type of machine learning where the AI is given labeled examples (inputs paired with correct answers) to learn from.", worldId: 2, lessonId: "2-1" },
  { id: "fc-2-2a", term: "Dataset", definition: "An organized collection of data — like images, text, or numbers — used to train or test an AI system.", worldId: 2, lessonId: "2-2" },
  { id: "fc-2-2b", term: "Label", definition: "A tag or category assigned to a piece of training data, telling the AI what the correct answer is for that example.", worldId: 2, lessonId: "2-2" },
  { id: "fc-2-3a", term: "Pattern Recognition", definition: "The ability of AI to find regularities and repeated structures in data, like shapes in images or trends in numbers.", worldId: 2, lessonId: "2-3" },
  { id: "fc-2-3b", term: "Prediction", definition: "An AI's best guess about new data based on patterns it learned during training.", worldId: 2, lessonId: "2-3" },
  { id: "fc-2-4a", term: "Overfitting", definition: "When an AI memorizes the training data too well and performs poorly on new, unseen data.", worldId: 2, lessonId: "2-4" },
  { id: "fc-2-4b", term: "Accuracy", definition: "A measure of how often an AI's predictions are correct, usually expressed as a percentage.", worldId: 2, lessonId: "2-4" },
  { id: "fc-2-5a", term: "Model Training", definition: "The process of feeding data into an AI system so it can adjust its internal settings and learn to make better predictions.", worldId: 2, lessonId: "2-5" },
  { id: "fc-2-5b", term: "Iteration", definition: "One cycle of training where the model sees data, makes predictions, checks errors, and adjusts — repeated many times.", worldId: 2, lessonId: "2-5" },

  // World 3: Language & AI
  { id: "fc-3-1a", term: "Natural Language Processing (NLP)", definition: "The field of AI focused on helping computers understand, interpret, and generate human language.", worldId: 3, lessonId: "3-1" },
  { id: "fc-3-1b", term: "Tokenization", definition: "Breaking text into smaller pieces (tokens) like words or parts of words so an AI can process them.", worldId: 3, lessonId: "3-1" },
  { id: "fc-3-2a", term: "Next-Word Prediction", definition: "An AI technique where the model predicts the most likely next word in a sentence based on the words before it.", worldId: 3, lessonId: "3-2" },
  { id: "fc-3-2b", term: "Language Model", definition: "An AI system trained on huge amounts of text to understand and generate human-like language.", worldId: 3, lessonId: "3-2" },
  { id: "fc-3-3a", term: "Prompt", definition: "The instruction or question you give to an AI to tell it what you want it to do or generate.", worldId: 3, lessonId: "3-3" },
  { id: "fc-3-3b", term: "Prompt Engineering", definition: "The skill of crafting clear, specific instructions to get the best possible output from an AI.", worldId: 3, lessonId: "3-3" },
  { id: "fc-3-4a", term: "Machine Translation", definition: "Using AI to automatically convert text from one language to another, like Google Translate.", worldId: 3, lessonId: "3-4" },
  { id: "fc-3-4b", term: "Context", definition: "The surrounding words and meaning that help an AI understand what a word or sentence really means.", worldId: 3, lessonId: "3-4" },
  { id: "fc-3-5a", term: "Co-writing", definition: "When humans and AI work together to create text, with the human guiding and editing the AI's output.", worldId: 3, lessonId: "3-5" },
  { id: "fc-3-5b", term: "Hallucination", definition: "When an AI confidently generates information that sounds real but is actually made up or incorrect.", worldId: 3, lessonId: "3-5" },

  // World 4: Vision & AI
  { id: "fc-4-1a", term: "Computer Vision", definition: "The field of AI that trains computers to interpret and understand visual information from images and videos.", worldId: 4, lessonId: "4-1" },
  { id: "fc-4-1b", term: "Pixel", definition: "The smallest unit of a digital image — a tiny colored dot. Images are grids of thousands or millions of pixels.", worldId: 4, lessonId: "4-1" },
  { id: "fc-4-2a", term: "Edge Detection", definition: "An AI technique that identifies boundaries between objects in an image by finding where colors change sharply.", worldId: 4, lessonId: "4-2" },
  { id: "fc-4-2b", term: "Feature", definition: "A specific pattern or characteristic (like an edge, texture, or shape) that AI uses to recognize objects in images.", worldId: 4, lessonId: "4-2" },
  { id: "fc-4-3a", term: "Image Classification", definition: "Teaching AI to look at an image and assign it to a category, like 'cat', 'dog', or 'car'.", worldId: 4, lessonId: "4-3" },
  { id: "fc-4-3b", term: "Convolutional Neural Network (CNN)", definition: "A type of AI model specially designed to process images by scanning small sections at a time to find patterns.", worldId: 4, lessonId: "4-3" },
  { id: "fc-4-4a", term: "Facial Recognition", definition: "AI technology that identifies or verifies a person by analyzing the unique features of their face.", worldId: 4, lessonId: "4-4" },
  { id: "fc-4-4b", term: "Biometric Data", definition: "Unique physical characteristics (like fingerprints or face shape) used to identify a person.", worldId: 4, lessonId: "4-4" },
  { id: "fc-4-5a", term: "Adversarial Attack", definition: "Tricking an AI vision system by making tiny, often invisible changes to an image that cause it to misclassify.", worldId: 4, lessonId: "4-5" },
  { id: "fc-4-5b", term: "Confidence Score", definition: "A percentage showing how sure an AI is about its prediction — 95% means it's very confident.", worldId: 4, lessonId: "4-5" },

  // World 5: AI & Creativity
  { id: "fc-5-1a", term: "Generative AI", definition: "AI systems that can create new content — like images, music, text, or video — based on patterns learned from data.", worldId: 5, lessonId: "5-1" },
  { id: "fc-5-1b", term: "Creativity vs. Remixing", definition: "The debate over whether AI truly creates something new or just recombines patterns from its training data.", worldId: 5, lessonId: "5-1" },
  { id: "fc-5-2a", term: "Diffusion Model", definition: "An AI image generator that works by starting with random noise and gradually removing it to form a clear image.", worldId: 5, lessonId: "5-2" },
  { id: "fc-5-2b", term: "Text-to-Image", definition: "AI technology that generates an image from a written description or prompt.", worldId: 5, lessonId: "5-2" },
  { id: "fc-5-3a", term: "AI-Generated Music", definition: "Music composed by AI systems that have learned patterns from thousands of existing songs and melodies.", worldId: 5, lessonId: "5-3" },
  { id: "fc-5-3b", term: "Neural Audio Synthesis", definition: "Using neural networks to generate realistic sounds, voices, or musical instruments from scratch.", worldId: 5, lessonId: "5-3" },
  { id: "fc-5-4a", term: "Style Transfer", definition: "An AI technique that applies the visual style of one image (like a painting) to the content of another image.", worldId: 5, lessonId: "5-4" },
  { id: "fc-5-4b", term: "Copyright & AI", definition: "Legal questions about who owns content created by AI, especially when it was trained on copyrighted human works.", worldId: 5, lessonId: "5-4" },
  { id: "fc-5-5a", term: "Human-AI Collaboration", definition: "Working together with AI as a creative tool, where humans provide direction and AI helps execute or explore ideas.", worldId: 5, lessonId: "5-5" },
  { id: "fc-5-5b", term: "AI as a Tool", definition: "The perspective that AI is best used to augment human abilities rather than replace human creativity.", worldId: 5, lessonId: "5-5" },

  // World 6: AI Ethics
  { id: "fc-6-1a", term: "AI Bias", definition: "When an AI system produces unfair results because the data it learned from contained human prejudices or imbalances.", worldId: 6, lessonId: "6-1" },
  { id: "fc-6-1b", term: "Training Data Bias", definition: "When the examples used to train AI don't fairly represent all groups, leading to skewed or unfair outcomes.", worldId: 6, lessonId: "6-1" },
  { id: "fc-6-2a", term: "Algorithmic Decision-Making", definition: "When AI systems make or influence important decisions about people, like loan approvals or job screening.", worldId: 6, lessonId: "6-2" },
  { id: "fc-6-2b", term: "Accountability", definition: "Determining who is responsible when an AI system makes a mistake or causes harm.", worldId: 6, lessonId: "6-2" },
  { id: "fc-6-3a", term: "Deepfake", definition: "AI-generated fake video or audio that makes it look or sound like a real person said or did something they didn't.", worldId: 6, lessonId: "6-3" },
  { id: "fc-6-3b", term: "Misinformation", definition: "False or misleading information, which AI can both help create (deepfakes) and help detect.", worldId: 6, lessonId: "6-3" },
  { id: "fc-6-4a", term: "Data Privacy", definition: "The right to control what personal information is collected about you and how it is used.", worldId: 6, lessonId: "6-4" },
  { id: "fc-6-4b", term: "Surveillance", definition: "Monitoring people's activities using technology like cameras, sensors, or AI tracking systems.", worldId: 6, lessonId: "6-4" },
  { id: "fc-6-5a", term: "AI Regulation", definition: "Laws and rules created by governments to control how AI can be developed and used.", worldId: 6, lessonId: "6-5" },
  { id: "fc-6-5b", term: "Ethical AI", definition: "Designing and using AI systems that are fair, transparent, accountable, and respect human rights.", worldId: 6, lessonId: "6-5" },
];

export function getFlashcardsByWorld(worldId: number): Flashcard[] {
  return FLASHCARDS.filter((fc) => fc.worldId === worldId);
}

export function getFlashcardsByLesson(lessonId: string): Flashcard[] {
  return FLASHCARDS.filter((fc) => fc.lessonId === lessonId);
}

export function termToSlug(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getFlashcardBySlug(slug: string): Flashcard | undefined {
  return FLASHCARDS.find((fc) => termToSlug(fc.term) === slug);
}

export function getAllSlugs(): string[] {
  return FLASHCARDS.map((fc) => termToSlug(fc.term));
}
