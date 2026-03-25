"use client";

import { useState } from "react";
import Link from "next/link";
import { FLASHCARDS, termToSlug } from "@/lib/flashcards-data";
import { WORLDS } from "@/lib/course-data";

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [activeWorld, setActiveWorld] = useState<number | null>(null);

  const filtered = FLASHCARDS.filter((fc) => {
    const matchesSearch =
      !search ||
      fc.term.toLowerCase().includes(search.toLowerCase()) ||
      fc.definition.toLowerCase().includes(search.toLowerCase());
    const matchesWorld = activeWorld === null || fc.worldId === activeWorld;
    return matchesSearch && matchesWorld;
  });

  // Group by world
  const grouped = new Map<number, typeof filtered>();
  filtered.forEach((fc) => {
    const list = grouped.get(fc.worldId) || [];
    list.push(fc);
    grouped.set(fc.worldId, list);
  });

  return (
    <div className="min-h-screen bg-space-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="text-teal-400 hover:text-teal-300 text-sm font-bold mb-8 inline-block"
        >
          &larr; Back to home
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-2">AI Glossary</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Every AI term kids learn on Teach AI Early — searchable,
            organized by world. Perfect for review, homework help, or
            curious parents.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search terms or definitions..."
            className="w-full bg-space-800 border-2 border-slate-700 rounded-xl px-5 py-3 text-white font-medium placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-colors"
          />
        </div>

        {/* World filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveWorld(null)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
              activeWorld === null
                ? "bg-teal-500/20 text-teal-300 border-teal-500/30"
                : "text-slate-400 border-slate-700 hover:border-slate-500"
            }`}
          >
            All Worlds
          </button>
          {WORLDS.filter((w) => FLASHCARDS.some((fc) => fc.worldId === w.id)).map((world) => (
            <button
              key={world.id}
              onClick={() => setActiveWorld(activeWorld === world.id ? null : world.id)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                activeWorld === world.id
                  ? "bg-teal-500/20 text-teal-300 border-teal-500/30"
                  : "text-slate-400 border-slate-700 hover:border-slate-500"
              }`}
            >
              {world.emoji} {world.title}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs font-bold text-slate-500 mb-6 uppercase">
          {filtered.length} term{filtered.length !== 1 ? "s" : ""}
          {search && ` matching "${search}"`}
        </p>

        {/* Grouped terms */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-500">No terms found. Try a different search.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {Array.from(grouped.entries())
              .sort(([a], [b]) => a - b)
              .map(([worldId, cards]) => {
                const world = WORLDS.find((w) => w.id === worldId);
                if (!world) return null;
                return (
                  <div key={worldId}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">{world.emoji}</span>
                      <h2 className="text-lg font-black text-white">
                        World {world.id}: {world.title}
                      </h2>
                    </div>
                    <div className="grid gap-3">
                      {cards
                        .sort((a, b) => a.term.localeCompare(b.term))
                        .map((fc) => (
                          <Link
                            key={fc.id}
                            href={`/glossary/${termToSlug(fc.term)}`}
                            className="bg-space-800 rounded-xl p-4 border border-slate-700 hover:border-teal-500/40 transition-colors block group"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-black text-white group-hover:text-teal-400 transition-colors">
                                  {fc.term}
                                </h3>
                                <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                                  {fc.definition}
                                </p>
                              </div>
                              <span className="text-slate-600 group-hover:text-teal-400 transition-colors mt-1 shrink-0">
                                &rarr;
                              </span>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
