import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FLASHCARDS,
  getFlashcardBySlug,
  getFlashcardsByWorld,
  termToSlug,
  getAllSlugs,
} from "@/lib/flashcards-data";
import { WORLDS } from "@/lib/course-data";

export async function generateStaticParams() {
  return getAllSlugs().map((term) => ({ term }));
}

export async function generateMetadata({
  params,
}: {
  params: { term: string };
}): Promise<Metadata> {
  const fc = getFlashcardBySlug(params.term);
  if (!fc) return {};

  const world = WORLDS.find((w) => w.id === fc.worldId);
  const title = `${fc.term} — AI Glossary for Kids | Teach AI Early`;
  const description = `${fc.definition} Learn about ${fc.term} in World ${fc.worldId}: ${world?.title}. Kid-friendly AI glossary.`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url: `https://teachaiearly.vercel.app/glossary/${params.term}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function GlossaryTermPage({
  params,
}: {
  params: { term: string };
}) {
  const fc = getFlashcardBySlug(params.term);
  if (!fc) notFound();

  const world = WORLDS.find((w) => w.id === fc.worldId);
  const lesson = world?.lessons.find((l) => l.id === fc.lessonId);

  // Related terms from the same world (exclude current)
  const related = getFlashcardsByWorld(fc.worldId)
    .filter((f) => f.id !== fc.id)
    .slice(0, 4);

  // Terms from other worlds that might be interesting
  const seeAlso = FLASHCARDS.filter(
    (f) => f.worldId !== fc.worldId && f.id !== fc.id
  )
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-space-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-10">
          <Link href="/" className="hover:text-slate-300 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/glossary"
            className="hover:text-slate-300 transition-colors"
          >
            Glossary
          </Link>
          <span>/</span>
          <span className="text-slate-300">{fc.term}</span>
        </div>

        {/* Term header */}
        <div className="mb-10">
          {world && (
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: world.hex + "20",
                  borderColor: world.hex + "40",
                  color: world.hex,
                }}
              >
                {world.emoji} World {world.id}: {world.title}
              </span>
              {lesson && (
                <span className="text-xs text-slate-500">
                  Lesson: {lesson.title}
                </span>
              )}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            {fc.term}
          </h1>

          <div className="bg-space-800 rounded-2xl p-6 border border-slate-700">
            <p className="text-lg text-slate-300 leading-relaxed">
              {fc.definition}
            </p>
          </div>
        </div>

        {/* Why it matters */}
        <div className="mb-10 bg-teal-500/5 rounded-2xl p-6 border border-teal-500/20">
          <h2 className="text-sm font-black text-teal-400 mb-2">
            Why does this matter?
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Understanding <strong className="text-white">{fc.term}</strong> is
            part of building real AI literacy. Kids who learn this concept can
            better understand how technology works in their daily lives — from
            the apps they use to the content they see online.
          </p>
        </div>

        {/* Learn this in context */}
        <div className="mb-10 bg-space-800 rounded-2xl p-6 border border-slate-700 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Learn about <strong className="text-white">{fc.term}</strong> with
            hands-on interactive lessons
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-white font-bold px-6 py-3 rounded-xl btn-press transition-all shadow-lg text-sm"
          >
            Start Learning Free
          </Link>
        </div>

        {/* Related terms from same world */}
        {related.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-black text-white mb-4">
              More from World {fc.worldId}: {world?.title}
            </h2>
            <div className="grid gap-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/glossary/${termToSlug(r.term)}`}
                  className="bg-space-800 rounded-xl p-4 border border-slate-700 hover:border-teal-500/40 transition-colors block group"
                >
                  <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors text-sm">
                    {r.term}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-1">
                    {r.definition}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* See also from other worlds */}
        {seeAlso.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-black text-white mb-4">
              Explore other AI concepts
            </h2>
            <div className="grid gap-3">
              {seeAlso.map((r) => {
                const rWorld = WORLDS.find((w) => w.id === r.worldId);
                return (
                  <Link
                    key={r.id}
                    href={`/glossary/${termToSlug(r.term)}`}
                    className="bg-space-800 rounded-xl p-4 border border-slate-700 hover:border-teal-500/40 transition-colors block group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{rWorld?.emoji}</span>
                      <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors text-sm">
                        {r.term}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-xs mt-1 line-clamp-1">
                      {r.definition}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Back to glossary */}
        <div className="text-center pt-6 border-t border-slate-800">
          <Link
            href="/glossary"
            className="text-teal-400 hover:text-teal-300 font-bold text-sm transition-colors"
          >
            &larr; Back to full glossary
          </Link>
        </div>
      </div>
    </div>
  );
}
