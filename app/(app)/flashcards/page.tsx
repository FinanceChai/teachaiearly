"use client";

import { useState, useEffect, useRef } from "react";
import { useProgress } from "@/hooks/useProgress";
import {
  FLASHCARDS,
  getFlashcardsByWorld,
  getFlashcardsByLesson,
  Flashcard,
} from "@/lib/flashcards-data";
import { WORLDS } from "@/lib/course-data";
import Link from "next/link";
import PaywallModal from "@/components/PaywallModal";

const SAVED_KEY = "ai_explorer_saved_cards";

function getSavedCards(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
  } catch {
    return [];
  }
}

function setSavedCards(ids: string[]) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
}

type Tab = "study" | "saved" | "quiz";

export default function FlashcardsPage() {
  const { isSubscribed, mounted } = useProgress();
  const [showPaywall, setShowPaywall] = useState(false);

  const [tab, setTab] = useState<Tab>("study");
  const [worldFilter, setWorldFilter] = useState<number | null>(null);
  const [lessonFilter, setLessonFilter] = useState<string | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedFlipped, setSavedFlipped] = useState<Record<string, boolean>>({});

  const touchStartX = useRef(0);

  useEffect(() => {
    setSavedIds(getSavedCards());
  }, []);

  // Compute filtered cards
  const filteredCards: Flashcard[] = lessonFilter
    ? getFlashcardsByLesson(lessonFilter)
    : worldFilter
    ? getFlashcardsByWorld(worldFilter)
    : FLASHCARDS;

  const currentCard = filteredCards[cardIndex] || null;
  const selectedWorld = worldFilter
    ? WORLDS.find((w) => w.id === worldFilter)
    : null;

  // Reset card index when filter changes
  useEffect(() => {
    setCardIndex(0);
    setFlipped(false);
  }, [worldFilter, lessonFilter]);

  function toggleSave(id: string) {
    const next = savedIds.includes(id)
      ? savedIds.filter((s) => s !== id)
      : [...savedIds, id];
    setSavedIds(next);
    setSavedCards(next);
  }

  function goNext() {
    if (cardIndex < filteredCards.length - 1) {
      setCardIndex((i) => i + 1);
      setFlipped(false);
    }
  }

  function goPrev() {
    if (cardIndex > 0) {
      setCardIndex((i) => i - 1);
      setFlipped(false);
    }
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) goNext();
      else goPrev();
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-float">🃏</div>
      </div>
    );
  }

  // Paywall check structure (currently disabled — let everyone through)
  const paywallEnabled = false;
  if (paywallEnabled && !isSubscribed) {
    return (
      <div className="min-h-screen bg-space-900">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-black text-white mb-2">
            Flashcards are a Pro feature
          </h1>
          <p className="text-slate-400 mb-6">
            Upgrade to Explorer Pro to study all flashcards and take quizzes.
          </p>
          <button
            onClick={() => setShowPaywall(true)}
            className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-black text-lg py-3 px-8 rounded-2xl btn-press transition-all"
          >
            Unlock Flashcards
          </button>
          {showPaywall && (
            <PaywallModal onClose={() => setShowPaywall(false)} />
          )}
        </div>
      </div>
    );
  }

  const savedCards = FLASHCARDS.filter((fc) => savedIds.includes(fc.id));

  return (
    <div className="min-h-screen bg-space-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-white">🃏 Flashcards</h1>
          <p className="text-slate-400 mt-1">Master AI vocabulary</p>
        </div>

        {/* Tab bar */}
        <div className="flex bg-space-800 rounded-2xl p-1 mb-6 border border-slate-700">
          {(["study", "saved", "quiz"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all capitalize ${
                tab === t
                  ? "bg-teal-500 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t === "saved" ? `Saved (${savedIds.length})` : t}
            </button>
          ))}
        </div>

        {/* ── Study Mode ── */}
        {tab === "study" && (
          <div>
            {/* World filter */}
            <div className="mb-4">
              <select
                value={worldFilter ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setWorldFilter(val ? Number(val) : null);
                  setLessonFilter(null);
                }}
                className="w-full bg-space-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm font-bold appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">All Worlds ({FLASHCARDS.length} cards)</option>
                {WORLDS.filter((w) => getFlashcardsByWorld(w.id).length > 0).map(
                  (w) => (
                    <option key={w.id} value={w.id}>
                      {w.emoji} World {w.id}: {w.title} (
                      {getFlashcardsByWorld(w.id).length})
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Lesson sub-filter pills */}
            {selectedWorld && (
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setLessonFilter(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !lessonFilter
                      ? "bg-teal-500 text-white"
                      : "bg-space-800 text-slate-400 border border-slate-700 hover:text-white"
                  }`}
                >
                  All Lessons
                </button>
                {selectedWorld.lessons.map((lesson) => {
                  const count = getFlashcardsByLesson(lesson.id).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setLessonFilter(lesson.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        lessonFilter === lesson.id
                          ? "bg-teal-500 text-white"
                          : "bg-space-800 text-slate-400 border border-slate-700 hover:text-white"
                      }`}
                    >
                      L{lesson.lessonNumber}: {lesson.title} ({count})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Card display */}
            {filteredCards.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                No flashcards available for this filter.
              </div>
            ) : currentCard ? (
              <div>
                {/* 3D flip card */}
                <div
                  className="mb-4 cursor-pointer"
                  style={{ perspective: "1000px" }}
                  onClick={() => setFlipped(!flipped)}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className="relative w-full transition-transform duration-500"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      minHeight: "280px",
                    }}
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 bg-space-800 rounded-3xl border border-slate-700 p-8 flex flex-col items-center justify-center"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <p className="text-xs text-teal-400 font-bold mb-4 uppercase tracking-wider">
                        Tap to reveal
                      </p>
                      <h2 className="text-2xl font-black text-white text-center leading-tight">
                        {currentCard.term}
                      </h2>
                      <p className="text-xs text-slate-500 mt-4">
                        World {currentCard.worldId} &middot;{" "}
                        {WORLDS.find((w) => w.id === currentCard.worldId)
                          ?.lessons.find((l) => l.id === currentCard.lessonId)
                          ?.title || currentCard.lessonId}
                      </p>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 bg-space-800 rounded-3xl border border-teal-500/40 p-8 flex flex-col items-center justify-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <p className="text-xs text-teal-400 font-bold mb-4 uppercase tracking-wider">
                        Definition
                      </p>
                      <p className="text-lg text-slate-200 text-center leading-relaxed">
                        {currentCard.definition}
                      </p>
                      <p className="text-xs text-slate-500 mt-4">
                        World {currentCard.worldId} &middot;{" "}
                        {WORLDS.find((w) => w.id === currentCard.worldId)
                          ?.lessons.find((l) => l.id === currentCard.lessonId)
                          ?.title || currentCard.lessonId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card controls */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={goPrev}
                    disabled={cardIndex === 0}
                    className="bg-space-800 border border-slate-700 text-white font-bold px-4 py-2 rounded-xl disabled:opacity-30 transition-all hover:border-teal-500"
                  >
                    ← Prev
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-sm font-bold">
                      {cardIndex + 1} of {filteredCards.length}
                    </span>
                    <button
                      onClick={() => toggleSave(currentCard.id)}
                      className={`text-2xl transition-transform hover:scale-110 ${
                        savedIds.includes(currentCard.id)
                          ? "text-yellow-400"
                          : "text-slate-600"
                      }`}
                      title={
                        savedIds.includes(currentCard.id)
                          ? "Remove from saved"
                          : "Save card"
                      }
                    >
                      {savedIds.includes(currentCard.id) ? "★" : "☆"}
                    </button>
                  </div>

                  <button
                    onClick={goNext}
                    disabled={cardIndex === filteredCards.length - 1}
                    className="bg-space-800 border border-slate-700 text-white font-bold px-4 py-2 rounded-xl disabled:opacity-30 transition-all hover:border-teal-500"
                  >
                    Next →
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ── Saved Mode ── */}
        {tab === "saved" && (
          <div>
            {savedCards.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-3">☆</div>
                <p className="text-slate-400 font-bold">No saved cards yet</p>
                <p className="text-slate-500 text-sm mt-1">
                  Tap the star on any flashcard to save it here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {savedCards.map((card) => (
                  <div
                    key={card.id}
                    className="cursor-pointer"
                    style={{ perspective: "800px" }}
                    onClick={() =>
                      setSavedFlipped((prev) => ({
                        ...prev,
                        [card.id]: !prev[card.id],
                      }))
                    }
                  >
                    <div
                      className="relative transition-transform duration-500"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: savedFlipped[card.id]
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                        minHeight: "140px",
                      }}
                    >
                      {/* Front */}
                      <div
                        className="absolute inset-0 bg-space-800 rounded-2xl border border-slate-700 p-4 flex flex-col items-center justify-center"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <h3 className="text-sm font-black text-white text-center">
                          {card.term}
                        </h3>
                        <p className="text-[10px] text-slate-500 mt-2">
                          W{card.worldId} &middot;{" "}
                          {WORLDS.find((w) => w.id === card.worldId)
                            ?.lessons.find((l) => l.id === card.lessonId)
                            ?.title || card.lessonId}
                        </p>
                      </div>
                      {/* Back */}
                      <div
                        className="absolute inset-0 bg-space-800 rounded-2xl border border-teal-500/40 p-4 flex flex-col items-center justify-center"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <p className="text-xs text-slate-200 text-center leading-snug">
                          {card.definition}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Quiz Mode Link ── */}
        {tab === "quiz" && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-xl font-black text-white mb-2">
              Test Your Knowledge
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              {FLASHCARDS.length} cards available for quizzing
            </p>
            <Link
              href="/flashcards/quiz"
              className="inline-block bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-white font-black text-lg py-4 px-10 rounded-2xl btn-press transition-all shadow-lg"
            >
              Start Quiz →
            </Link>
          </div>
        )}
      </div>

      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
    </div>
  );
}
