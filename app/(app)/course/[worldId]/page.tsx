"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getWorld } from "@/lib/course-data";
import { getCourseContent } from "@/lib/course-content";

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const worldId = Number(params.worldId);
  const world = getWorld(worldId);
  const content = getCourseContent(worldId);

  if (!world || !content) return null;

  return (
    <div className="min-h-screen bg-space-900">
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${world.hex}30, transparent)`,
        }}
      >
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-10">
          <button
            onClick={() => router.back()}
            className="text-slate-400 hover:text-sky-600 flex items-center gap-2 mb-6 font-bold text-sm transition-colors"
          >
            ← Back
          </button>

          <div className="flex items-start gap-5">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{
                background: world.hex + "30",
                border: `2px solid ${world.hex}60`,
              }}
            >
              {world.emoji}
            </div>
            <div>
              <div
                className="text-xs font-black px-3 py-1 rounded-full inline-block mb-2"
                style={{ background: world.hex + "30", color: world.hex }}
              >
                COURSE {world.id}
              </div>
              <h1 className="text-3xl font-black text-slate-900 leading-tight">
                {world.title}
              </h1>
              <p className="text-slate-400 mt-1 text-sm">{world.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pb-32">
        {/* Intro */}
        <div className="mt-8 p-5 rounded-2xl border border-slate-200 bg-space-800">
          <p className="text-slate-600 leading-relaxed text-sm">
            {content.intro}
          </p>
        </div>

        {/* Sections */}
        <div className="mt-8 space-y-8">
          {content.sections.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{
                    background: world.hex + "20",
                    color: world.hex,
                    border: `2px solid ${world.hex}40`,
                  }}
                >
                  {idx + 1}
                </div>
                <h2 className="text-xl font-black text-slate-900">
                  {section.title}
                </h2>
              </div>

              <div className="ml-11">
                {section.body.split("\n\n").map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-slate-600 leading-relaxed text-sm mb-3"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.funFact && (
                  <div
                    className="mt-4 p-4 rounded-xl border"
                    style={{
                      background: world.hex + "10",
                      borderColor: world.hex + "30",
                    }}
                  >
                    <div
                      className="text-xs font-black mb-1"
                      style={{ color: world.hex }}
                    >
                      FUN FACT
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {section.funFact}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Wrap-up */}
        <div
          className="mt-10 p-5 rounded-2xl border"
          style={{
            background: world.hex + "10",
            borderColor: world.hex + "30",
          }}
        >
          <div
            className="text-xs font-black mb-2"
            style={{ color: world.hex }}
          >
            WRAP-UP
          </div>
          <p className="text-slate-600 leading-relaxed text-sm">
            {content.wrapUp}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <Link
            href={`/world/${world.id}`}
            className="w-full text-center py-4 rounded-2xl font-black text-slate-900 text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: world.hex }}
          >
            Start the Lessons →
          </Link>
          <p className="text-slate-400 text-xs">
            {world.lessons.length} interactive lessons + 1 world challenge
          </p>
        </div>
      </div>
    </div>
  );
}
