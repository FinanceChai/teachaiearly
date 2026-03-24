"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getWorld, getLesson } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";
import { RuleRobotVsAI } from "@/components/interactives/RuleRobotVsAI";
import { SpotTheAI } from "@/components/interactives/SpotTheAI";
import { WhoDoesItBetter } from "@/components/interactives/WhoDoesItBetter";
import { TimelineBuilder } from "@/components/interactives/TimelineBuilder";
import { AISpotterChallenge } from "@/components/interactives/AISpotterChallenge";
import { TeachTheSorter } from "@/components/interactives/TeachTheSorter";
import { DataChef } from "@/components/interactives/DataChef";
import { GuessTheNext } from "@/components/interactives/GuessTheNext";
import { StumpTheAI } from "@/components/interactives/StumpTheAI";
import { TrainingTracker } from "@/components/interactives/TrainingTracker";
import { TrainClassifierChallenge } from "@/components/interactives/TrainClassifierChallenge";
import { LockedInteractive } from "@/components/interactives/LockedInteractive";
import { AIGameShow } from "@/components/interactives/AIGameShow";
import { WordMap } from "@/components/interactives/WordMap";
import { FinishMySentence } from "@/components/interactives/FinishMySentence";
import { PromptShowdown } from "@/components/interactives/PromptShowdown";
import { TranslationTelephone } from "@/components/interactives/TranslationTelephone";
import { CoAuthor } from "@/components/interactives/CoAuthor";
import { PromptLab } from "@/components/interactives/PromptLab";
import { ZoomIn } from "@/components/interactives/ZoomIn";
import { FeatureFinder } from "@/components/interactives/FeatureFinder";
import { PhotoCoach } from "@/components/interactives/PhotoCoach";
import { FaceParts } from "@/components/interactives/FaceParts";
import { TrickTheEye } from "@/components/interactives/TrickTheEye";
import { VisionClassifier } from "@/components/interactives/VisionClassifier";
import { CreativeOrCopy } from "@/components/interactives/CreativeOrCopy";
import { DreamMachine } from "@/components/interactives/DreamMachine";
import { BeatBuilder } from "@/components/interactives/BeatBuilder";
import { StyleMixer } from "@/components/interactives/StyleMixer";
import { DirectorsChair } from "@/components/interactives/DirectorsChair";
import { CreativeShowcase } from "@/components/interactives/CreativeShowcase";
import { BiasedBots } from "@/components/interactives/BiasedBots";
import { DesignDilemmas } from "@/components/interactives/DesignDilemmas";
import { TruthDetective } from "@/components/interactives/TruthDetective";
import { DataTrail } from "@/components/interactives/DataTrail";
import { RuleMaker } from "@/components/interactives/RuleMaker";
import { FutureForecaster } from "@/components/interactives/FutureForecaster";
import { EthicsBoard } from "@/components/interactives/EthicsBoard";
// World 7: AI & Sound
import { WaveformExplorer } from "@/components/interactives/WaveformExplorer";
import { VoicePipeline } from "@/components/interactives/VoicePipeline";
import { MelodyMaker } from "@/components/interactives/MelodyMaker";
import { VoiceLineup } from "@/components/interactives/VoiceLineup";
import { AIPodcast } from "@/components/interactives/AIPodcast";
// World 8: AI & Games
import { NPCBrainMapper } from "@/components/interactives/NPCBrainMapper";
import { AIBattleTimeline } from "@/components/interactives/AIBattleTimeline";
import { RewardTrainer } from "@/components/interactives/RewardTrainer";
import { LevelGenerator } from "@/components/interactives/LevelGenerator";
import { FairPlayJudge } from "@/components/interactives/FairPlayJudge";
import { GameDesignerChallenge } from "@/components/interactives/GameDesignerChallenge";
// World 9: AI & Robots
import { RobotOrPuppet } from "@/components/interactives/RobotOrPuppet";
import { SelfDrivingSim } from "@/components/interactives/SelfDrivingSim";
import { RobotDesigner } from "@/components/interactives/RobotDesigner";
import { RobotRightsDebate } from "@/components/interactives/RobotRightsDebate";
import { RobotPitch } from "@/components/interactives/RobotPitch";
// World 10: AI & You
import { AlgorithmAudit } from "@/components/interactives/AlgorithmAudit";
import { BubbleBreaker } from "@/components/interactives/BubbleBreaker";
import { SmartHomeMapper } from "@/components/interactives/SmartHomeMapper";
import { HealthTrackerSim } from "@/components/interactives/HealthTrackerSim";
import { SettingsSafari } from "@/components/interactives/SettingsSafari";
import { AILifeAudit } from "@/components/interactives/AILifeAudit";
// World 11: Building with AI
import { ToolkitTour } from "@/components/interactives/ToolkitTour";
import { ProjectScoper } from "@/components/interactives/ProjectScoper";
import { PrototypeBuilder } from "@/components/interactives/PrototypeBuilder";
import { FeedbackLoop } from "@/components/interactives/FeedbackLoop";
import { ProjectShowcase } from "@/components/interactives/ProjectShowcase";
import { PortfolioPiece } from "@/components/interactives/PortfolioPiece";
// World 12: AI Futures
import { FutureBingo } from "@/components/interactives/FutureBingo";
import { AIForGood } from "@/components/interactives/AIForGood";
import { RiskOMeter } from "@/components/interactives/RiskOMeter";
import { FutureLetter } from "@/components/interactives/FutureLetter";
import { AIManifesto } from "@/components/interactives/AIManifesto";

type Phase = "concept" | "interactive" | "takeaway" | "complete";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const worldId = Number(params.worldId);
  const lessonIdParam = params.lessonId as string;
  const isChallenge = lessonIdParam === "challenge";

  const world = getWorld(worldId);
  const lesson = isChallenge ? null : getLesson(worldId, lessonIdParam);
  const { markLessonComplete, markChallengeComplete, progress } = useProgress();

  const [phase, setPhase] = useState<Phase>("concept");
  const [interactiveDone, setInteractiveDone] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const [showXpPop, setShowXpPop] = useState(false);

  if (!world) return null;

  const isAlreadyDone = isChallenge
    ? progress.completedChallenges.includes(worldId)
    : progress.completedLessons.includes(lessonIdParam);

  const title = isChallenge ? world.challenge.title : lesson?.title ?? "";
  const concept = isChallenge ? world.challenge.description : lesson?.concept ?? "";
  const interactiveTitle = isChallenge
    ? world.challenge.title
    : lesson?.interactiveTitle ?? "";
  const takeaway = isChallenge
    ? `You earned the ${world.challenge.badgeName} badge!`
    : lesson?.dinnerTakeaway ?? "";
  const xpReward = isChallenge ? world.challenge.xpReward : lesson?.xpReward ?? 0;
  const interactiveType = isChallenge
    ? world.challenge.interactiveType
    : lesson?.interactiveType ?? "locked";

  function handleInteractiveDone() {
    setInteractiveDone(true);
  }

  function handleContinue() {
    if (phase === "concept") {
      setPhase("interactive");
    } else if (phase === "interactive") {
      setPhase("takeaway");
      // Award XP
      if (!xpAwarded && !isAlreadyDone) {
        if (isChallenge) {
          markChallengeComplete(worldId, world!.challenge.badgeName, xpReward);
        } else {
          markLessonComplete(lessonIdParam, xpReward);
        }
        setXpAwarded(true);
        setShowXpPop(true);
        setTimeout(() => setShowXpPop(false), 2500);
      }
    } else if (phase === "takeaway") {
      setPhase("complete");
    } else {
      router.push(`/world/${worldId}`);
    }
  }

  function renderInteractive() {
    switch (interactiveType) {
      case "rule-robot-vs-ai":
        return <RuleRobotVsAI onComplete={handleInteractiveDone} />;
      case "spot-the-ai":
        return <SpotTheAI onComplete={handleInteractiveDone} />;
      case "who-does-it-better":
        return <WhoDoesItBetter onComplete={handleInteractiveDone} />;
      case "timeline-builder":
        return <TimelineBuilder onComplete={handleInteractiveDone} />;
      case "ai-spotter-challenge":
        return (
          <AISpotterChallenge
            onComplete={(passed) => {
              handleInteractiveDone();
              if (passed) handleContinue();
            }}
          />
        );
      case "teach-the-sorter":
        return <TeachTheSorter onComplete={handleInteractiveDone} />;
      case "data-chef":
        return <DataChef onComplete={handleInteractiveDone} />;
      case "guess-the-next":
        return <GuessTheNext onComplete={handleInteractiveDone} />;
      case "stump-the-ai":
        return <StumpTheAI onComplete={handleInteractiveDone} />;
      case "training-tracker":
        return <TrainingTracker onComplete={handleInteractiveDone} />;
      case "train-classifier-challenge":
        return (
          <TrainClassifierChallenge
            onComplete={(passed) => {
              handleInteractiveDone();
              if (passed) handleContinue();
            }}
          />
        );
      case "ai-game-show":
        return (
          <AIGameShow
            onComplete={(passed) => {
              handleInteractiveDone();
              if (passed) handleContinue();
            }}
          />
        );
      case "word-map":
        return <WordMap onComplete={handleInteractiveDone} />;
      case "finish-my-sentence":
        return <FinishMySentence onComplete={handleInteractiveDone} />;
      case "prompt-showdown":
        return <PromptShowdown onComplete={handleInteractiveDone} />;
      case "translation-telephone":
        return <TranslationTelephone onComplete={handleInteractiveDone} />;
      case "co-author":
        return <CoAuthor onComplete={handleInteractiveDone} />;
      case "prompt-lab":
        return (
          <PromptLab
            onComplete={(passed) => {
              handleInteractiveDone();
              if (passed) handleContinue();
            }}
          />
        );
      case "zoom-in":
        return <ZoomIn onComplete={handleInteractiveDone} />;
      case "feature-finder":
        return <FeatureFinder onComplete={handleInteractiveDone} />;
      case "photo-coach":
        return <PhotoCoach onComplete={handleInteractiveDone} />;
      case "face-parts":
        return <FaceParts onComplete={handleInteractiveDone} />;
      case "trick-the-eye":
        return <TrickTheEye onComplete={handleInteractiveDone} />;
      case "vision-classifier":
        return (
          <VisionClassifier
            onComplete={(passed) => {
              handleInteractiveDone();
              if (passed) handleContinue();
            }}
          />
        );
      case "creative-or-copy":
        return <CreativeOrCopy onComplete={handleInteractiveDone} />;
      case "dream-machine":
        return <DreamMachine onComplete={handleInteractiveDone} />;
      case "beat-builder":
        return <BeatBuilder onComplete={handleInteractiveDone} />;
      case "style-mixer":
        return <StyleMixer onComplete={handleInteractiveDone} />;
      case "directors-chair":
        return <DirectorsChair onComplete={handleInteractiveDone} />;
      case "creative-showcase":
        return (
          <CreativeShowcase
            onComplete={(passed) => {
              handleInteractiveDone();
              if (passed) handleContinue();
            }}
          />
        );
      case "biased-bots":
        return <BiasedBots onComplete={handleInteractiveDone} />;
      case "design-dilemmas":
        return <DesignDilemmas onComplete={handleInteractiveDone} />;
      case "truth-detective":
        return <TruthDetective onComplete={handleInteractiveDone} />;
      case "data-trail":
        return <DataTrail onComplete={handleInteractiveDone} />;
      case "rule-maker":
        return <RuleMaker onComplete={handleInteractiveDone} />;
      case "future-forecaster":
        return <FutureForecaster onComplete={handleInteractiveDone} />;
      case "ethics-board":
        return (
          <EthicsBoard
            onComplete={(passed) => {
              handleInteractiveDone();
              if (passed) handleContinue();
            }}
          />
        );
      // World 7: AI & Sound
      case "waveform-explorer":
        return <WaveformExplorer onComplete={handleInteractiveDone} />;
      case "voice-pipeline":
        return <VoicePipeline onComplete={handleInteractiveDone} />;
      case "melody-maker":
        return <MelodyMaker onComplete={handleInteractiveDone} />;
      case "voice-lineup":
        return <VoiceLineup onComplete={handleInteractiveDone} />;
      case "ai-podcast":
        return <AIPodcast onComplete={handleInteractiveDone} />;
      // World 8: AI & Games
      case "npc-brain-mapper":
        return <NPCBrainMapper onComplete={handleInteractiveDone} />;
      case "ai-battle-timeline":
        return <AIBattleTimeline onComplete={handleInteractiveDone} />;
      case "reward-trainer":
        return <RewardTrainer onComplete={handleInteractiveDone} />;
      case "level-generator":
        return <LevelGenerator onComplete={handleInteractiveDone} />;
      case "fair-play-judge":
        return <FairPlayJudge onComplete={handleInteractiveDone} />;
      case "game-designer-challenge":
        return <GameDesignerChallenge onComplete={handleInteractiveDone} />;
      // World 9: AI & Robots
      case "robot-or-puppet":
        return <RobotOrPuppet onComplete={handleInteractiveDone} />;
      case "self-driving-sim":
        return <SelfDrivingSim onComplete={handleInteractiveDone} />;
      case "robot-designer":
        return <RobotDesigner onComplete={handleInteractiveDone} />;
      case "robot-rights-debate":
        return <RobotRightsDebate onComplete={handleInteractiveDone} />;
      case "robot-pitch":
        return <RobotPitch onComplete={handleInteractiveDone} />;
      // World 10: AI & You
      case "algorithm-audit":
        return <AlgorithmAudit onComplete={handleInteractiveDone} />;
      case "bubble-breaker":
        return <BubbleBreaker onComplete={handleInteractiveDone} />;
      case "smart-home-mapper":
        return <SmartHomeMapper onComplete={handleInteractiveDone} />;
      case "health-tracker-sim":
        return <HealthTrackerSim onComplete={handleInteractiveDone} />;
      case "settings-safari":
        return <SettingsSafari onComplete={handleInteractiveDone} />;
      case "ai-life-audit":
        return <AILifeAudit onComplete={handleInteractiveDone} />;
      // World 11: Building with AI
      case "toolkit-tour":
        return <ToolkitTour onComplete={handleInteractiveDone} />;
      case "project-scoper":
        return <ProjectScoper onComplete={handleInteractiveDone} />;
      case "prototype-builder":
        return <PrototypeBuilder onComplete={handleInteractiveDone} />;
      case "feedback-loop":
        return <FeedbackLoop onComplete={handleInteractiveDone} />;
      case "project-showcase":
        return <ProjectShowcase onComplete={handleInteractiveDone} />;
      case "portfolio-piece":
        return <PortfolioPiece onComplete={handleInteractiveDone} />;
      // World 12: AI Futures
      case "future-bingo":
        return <FutureBingo onComplete={handleInteractiveDone} />;
      case "ai-for-good":
        return <AIForGood onComplete={handleInteractiveDone} />;
      case "risk-o-meter":
        return <RiskOMeter onComplete={handleInteractiveDone} />;
      case "future-letter":
        return <FutureLetter onComplete={handleInteractiveDone} />;
      case "ai-manifesto":
        return <AIManifesto onComplete={handleInteractiveDone} />;
      default:
        return <LockedInteractive title={interactiveTitle} onComplete={handleInteractiveDone} />;
    }
  }

  const progressSteps = ["concept", "interactive", "takeaway", "complete"];
  const currentStep = progressSteps.indexOf(phase);

  return (
    <div className="min-h-screen bg-space-900">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-space-900/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => router.push(`/world/${worldId}`)}
            className="text-slate-400 hover:text-white font-bold text-sm transition-colors"
          >
            ✕
          </button>
          <div className="flex-1">
            <div className="flex gap-1.5">
              {progressSteps.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-2 rounded-full transition-all duration-500"
                  style={{
                    background: i <= currentStep ? world.hex : "#334155",
                  }}
                />
              ))}
            </div>
          </div>
          <span className="text-xs font-bold text-yellow-400">+{xpReward} XP</span>
        </div>
      </div>

      {/* XP Pop */}
      {showXpPop && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-yellow-400 text-yellow-900 font-black text-xl px-6 py-3 rounded-2xl animate-bounce shadow-lg">
          +{xpReward} XP ⭐
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Phase: Concept */}
        {phase === "concept" && (
          <div className="space-y-6">
            <div>
              <div className="text-xs font-black mb-2" style={{ color: world.hex }}>
                {isChallenge ? "CHALLENGE" : `WORLD ${world.id} · LESSON`}
              </div>
              <h1 className="text-3xl font-black text-white leading-tight">{title}</h1>
            </div>

            <div
              className="p-6 rounded-2xl border"
              style={{ background: world.hex + "15", borderColor: world.hex + "40" }}
            >
              <div className="text-xs font-black text-slate-400 mb-3">THE BIG IDEA</div>
              <p className="text-white text-lg leading-relaxed font-semibold">{concept}</p>
            </div>

            <div className="bg-space-800 rounded-2xl p-5 border border-slate-700">
              <div className="text-xs font-black text-slate-400 mb-2">COMING UP</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <div className="font-black text-white">{interactiveTitle}</div>
                  <div className="text-xs text-slate-400">Interactive activity</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-5 rounded-2xl font-black text-xl text-white btn-press transition-all"
              style={{ background: `linear-gradient(135deg, ${world.hex}, ${world.hex}bb)` }}
            >
              Let's Go! →
            </button>
          </div>
        )}

        {/* Phase: Interactive */}
        {phase === "interactive" && (
          <div className="space-y-6">
            <div>
              <div className="text-xs font-black mb-2" style={{ color: world.hex }}>
                INTERACTIVE
              </div>
              <h2 className="text-2xl font-black text-white">{interactiveTitle}</h2>
            </div>

            {renderInteractive()}

            {interactiveDone && (
              <button
                onClick={handleContinue}
                className="w-full py-5 rounded-2xl font-black text-xl text-white btn-press transition-all mt-4"
                style={{ background: `linear-gradient(135deg, ${world.hex}, ${world.hex}bb)` }}
              >
                Continue →
              </button>
            )}
          </div>
        )}

        {/* Phase: Takeaway */}
        {phase === "takeaway" && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <div className="text-7xl mb-4 animate-float inline-block">🍽️</div>
              <h2 className="text-2xl font-black text-white">Dinner Table Takeaway</h2>
              <p className="text-slate-400 mt-2">Tell someone in your family tonight:</p>
            </div>

            <div
              className="p-7 rounded-3xl text-center border"
              style={{ background: world.hex + "15", borderColor: world.hex + "40" }}
            >
              <p className="text-xl font-black text-white leading-relaxed">
                "{takeaway}"
              </p>
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-5 rounded-2xl font-black text-xl text-white btn-press transition-all"
              style={{ background: `linear-gradient(135deg, ${world.hex}, ${world.hex}bb)` }}
            >
              I'll share it! →
            </button>
          </div>
        )}

        {/* Phase: Complete */}
        {phase === "complete" && (
          <div className="text-center space-y-6 py-8">
            <div className="text-8xl animate-float inline-block">
              {isChallenge ? world.challenge.badgeEmoji : "⭐"}
            </div>
            <div>
              <h2 className="text-3xl font-black text-white">
                {isChallenge ? "Badge Earned!" : "Lesson Complete!"}
              </h2>
              {isChallenge && (
                <p className="text-slate-300 mt-2 text-lg">
                  You earned the <strong style={{ color: world.hex }}>{world.challenge.badgeName}</strong> badge!
                </p>
              )}
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="text-yellow-400 font-black text-xl">+{xpReward} XP</span>
                <span className="text-yellow-400">⭐</span>
              </div>
            </div>

            <button
              onClick={() => router.push(`/world/${worldId}`)}
              className="w-full py-5 rounded-2xl font-black text-xl text-white btn-press transition-all"
              style={{ background: `linear-gradient(135deg, ${world.hex}, ${world.hex}bb)` }}
            >
              Back to World {worldId} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
