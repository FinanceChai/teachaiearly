"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface EthicsCase {
  title: string;
  icon: string;
  scenario: string;
  stakeholders: string[];
  question: string;
  options: { label: string; reasoning: string; quality: "strong" | "moderate" | "weak" }[];
}

const CASES: EthicsCase[] = [
  {
    title: "AI Surveillance in Schools",
    icon: "📹",
    scenario: "A school district wants to install AI cameras that track student behavior — flagging 'suspicious' movements, tracking bathroom trips, and monitoring facial expressions for signs of distress or aggression.",
    stakeholders: ["Students (privacy, autonomy)", "Parents (safety, concern)", "Teachers (classroom management)", "School administration (liability)"],
    question: "Should schools use AI surveillance on students?",
    options: [
      { label: "Yes, safety comes first — if it prevents even one incident, it's worth it", reasoning: "Prioritizes safety but ignores the chilling effect on students' freedom, creativity, and mental health. Surveillance creates an atmosphere of distrust.", quality: "weak" },
      { label: "Only for specific safety purposes, with strict limits, transparency, and student/parent consent", reasoning: "Balances safety with privacy rights. Limits use to genuine threats, requires transparency about what's tracked, and gives families a voice.", quality: "strong" },
      { label: "No — students deserve privacy, and surveillance doesn't actually prevent problems", reasoning: "Strong on privacy but dismisses legitimate safety concerns entirely. A balanced approach would address both.", quality: "moderate" },
    ],
  },
  {
    title: "AI Medical Diagnosis",
    icon: "🩺",
    scenario: "A hospital deploys AI that diagnoses diseases from medical scans with 95% accuracy — better than the average doctor's 87%. But the AI can't explain WHY it made its diagnosis, and it performs worse on certain ethnic groups.",
    stakeholders: ["Patients (health outcomes)", "Doctors (professional judgment)", "Underrepresented groups (fairness)", "Hospital (costs, liability)"],
    question: "Should hospitals rely on this AI for diagnosis?",
    options: [
      { label: "Yes — 95% is better than 87%, so AI should replace doctors for diagnosis", reasoning: "Higher accuracy overall, but ignoring the bias problem means some patients get worse care. 'Better on average' can still mean worse for specific groups.", quality: "weak" },
      { label: "Use AI as a second opinion alongside doctors, while actively working to fix the bias gap", reasoning: "Gets the benefit of AI accuracy while keeping human judgment in the loop. Acknowledges the bias problem and commits to fixing it rather than ignoring it.", quality: "strong" },
      { label: "No — if it can't explain itself and has bias, it shouldn't be used at all", reasoning: "Valid concerns, but rejecting a tool that could save lives because it's imperfect ignores the fact that human diagnosis is also imperfect and biased.", quality: "moderate" },
    ],
  },
  {
    title: "AI-Generated News",
    icon: "📰",
    scenario: "A news organization uses AI to write 80% of its articles. The AI produces more articles, faster, at lower cost. But it occasionally makes up facts ('hallucinations') and can't do investigative journalism. Human editors review articles but miss some errors.",
    stakeholders: ["Readers (truth, trust)", "Journalists (jobs, profession)", "News organization (costs)", "Democracy (informed public)"],
    question: "Should news organizations use AI to write articles?",
    options: [
      { label: "Yes — faster and cheaper news benefits everyone", reasoning: "Speed and cost matter, but news isn't just content — it's a foundation of democracy. When AI hallucinations become 'news,' public trust erodes.", quality: "weak" },
      { label: "For routine reporting only (weather, sports scores, stock updates), with human journalists for everything requiring judgment", reasoning: "Identifies where AI adds value (routine data) vs. where humans are essential (investigation, analysis, accountability). Preserves journalistic integrity where it matters most.", quality: "strong" },
      { label: "No — journalism is too important to automate", reasoning: "Protects journalistic integrity but ignores that AI could free journalists to do MORE important work by handling routine tasks.", quality: "moderate" },
    ],
  },
  {
    title: "AI Friend for Lonely Teens",
    icon: "💬",
    scenario: "A company creates an AI chatbot designed to be a 'friend' for lonely teenagers. It remembers conversations, shows empathy, and is available 24/7. Usage data shows teens feel less lonely — but they're also spending less time with real people.",
    stakeholders: ["Lonely teens (emotional wellbeing)", "Parents (child development)", "Mental health experts (long-term effects)", "Company (profit, responsibility)"],
    question: "Should AI companionship apps be available to teens?",
    options: [
      { label: "Yes — if teens feel less lonely, the app is working", reasoning: "Short-term relief is real, but replacing human connection with AI connection may worsen isolation long-term. Feeling less lonely isn't the same as actually building social skills.", quality: "moderate" },
      { label: "Yes, but designed to help teens build real-world social skills and connections, not replace them", reasoning: "Uses AI as a bridge, not a destination. The app should actively encourage and facilitate real human connections while providing immediate support.", quality: "strong" },
      { label: "No — teens need real friends, and AI friendship is fake", reasoning: "True that AI friendship isn't real friendship, but dismissing the real pain of loneliness isn't helpful either. Some support is better than none.", quality: "weak" },
    ],
  },
  {
    title: "AI Predictive Policing",
    icon: "🚔",
    scenario: "A city deploys AI that predicts where crimes are likely to happen based on historical data. Police are sent to those areas. Crime rates drop in predicted areas — but the system disproportionately targets minority neighborhoods.",
    stakeholders: ["Residents of targeted neighborhoods (civil rights)", "Police (resource allocation)", "City government (public safety)", "All citizens (fairness, justice)"],
    question: "Should cities use predictive policing AI?",
    options: [
      { label: "Yes — it reduces crime, which benefits everyone", reasoning: "Lower crime is good, but 'predicting' crime in areas that were already over-policed creates a feedback loop. More police = more arrests = 'more crime' in the data = more police. It's circular.", quality: "weak" },
      { label: "Not until the historical bias in policing data is addressed — otherwise AI amplifies existing discrimination", reasoning: "Correctly identifies the core problem: biased historical data creates biased predictions. The AI isn't predicting crime — it's predicting where police have PREVIOUSLY focused.", quality: "strong" },
      { label: "Maybe — but only if the community has oversight and can review/reject the AI's recommendations", reasoning: "Community oversight is important, but doesn't solve the fundamental problem of biased training data. Both the data AND the governance need to be addressed.", quality: "moderate" },
    ],
  },
];

export function EthicsBoard({ onComplete }: { onComplete: (passed: boolean) => void }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function pickOption(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const quality = CASES[idx].options[i].quality;
    if (quality === "strong") setScore((s) => s + 2);
    else if (quality === "moderate") setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    if (idx >= CASES.length - 1) {
      setDone(true);
      const maxScore = CASES.length * 2;
      onComplete(score >= maxScore * 0.5);
    } else {
      setIdx((i) => i + 1);
    }
  }

  if (done) {
    const maxScore = CASES.length * 2;
    const pct = Math.round((score / maxScore) * 100);
    return (
      <div className="text-center space-y-5 py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="text-7xl">
          {pct >= 70 ? "🛡️" : "⚖️"}
        </motion.div>
        <div>
          <div className="text-4xl font-black text-white">{score}/{maxScore}</div>
          <div className="text-slate-400 text-sm mt-1">ethics reasoning score</div>
          <div className="text-slate-300 mt-3">
            {pct >= 90 ? "Ethics Guardian level! Your reasoning is nuanced and balanced." : pct >= 60 ? "Strong ethical thinking! You consider multiple perspectives." : "Ethics is hard — the fact that you're thinking about it matters most!"}
          </div>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/40 rounded-2xl p-4">
          <div className="font-black text-orange-300">{pct >= 50 ? "Badge Earned! 🛡️" : "Challenge Complete!"}</div>
          <p className="text-sm text-slate-400 mt-1">There are no perfect answers in AI ethics — but there are better questions. You&apos;ve shown you can think critically about AI&apos;s impact on real people.</p>
        </div>
      </div>
    );
  }

  const c = CASES[idx];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {CASES.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < idx ? "bg-orange-500" : i === idx ? "bg-orange-400" : "bg-slate-700"}`} />
          ))}
        </div>
        <span className="text-xs text-slate-400 font-bold">Case {idx + 1}/{CASES.length}</span>
      </div>

      <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
        <div className="text-xs font-black text-orange-400 mb-3">ETHICS BOARD</div>

        <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-space-900 rounded-xl p-4 border border-slate-600 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{c.icon}</span>
              <span className="text-white font-black">{c.title}</span>
            </div>
            <div className="text-sm text-slate-400 mb-3">{c.scenario}</div>
            <div className="flex flex-wrap gap-1.5">
              {c.stakeholders.map((s, i) => (
                <span key={i} className="bg-space-800 rounded-lg px-2 py-1 text-xs text-slate-400 font-bold border border-slate-700">{s}</span>
              ))}
            </div>
          </div>

          <div className="text-white font-black text-sm mb-3">{c.question}</div>

          {picked === null ? (
            <div className="space-y-3">
              {c.options.map((opt, i) => (
                <motion.button key={i} onClick={() => pickOption(i)} whileTap={{ scale: 0.98 }} className="w-full text-left p-4 rounded-xl border border-slate-700 bg-space-900 hover:border-orange-500/50 transition-colors">
                  <div className="font-bold text-white text-sm">{opt.label}</div>
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`p-4 rounded-xl text-sm font-bold ${
                c.options[picked].quality === "strong" ? "bg-green-500/20 text-green-300" :
                c.options[picked].quality === "moderate" ? "bg-yellow-500/20 text-yellow-300" :
                "bg-red-500/20 text-red-300"
              }`}>
                {c.options[picked].quality === "strong" ? "Strong reasoning! " :
                 c.options[picked].quality === "moderate" ? "Partial credit — good thinking but consider more angles. " :
                 "This perspective misses key considerations. "}
                <span className="font-normal text-slate-300">{c.options[picked].reasoning}</span>
              </div>
              <button onClick={next} className="w-full py-4 rounded-xl font-black text-white bg-orange-500 hover:bg-orange-400 btn-press transition-colors">
                {idx < CASES.length - 1 ? "Next Case" : "See Final Score"} &rarr;
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
