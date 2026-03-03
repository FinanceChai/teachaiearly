"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BLOG_POSTS,
  CATEGORY_COLORS,
  type BlogCategory,
} from "@/lib/blog-data";

const CATEGORIES: (BlogCategory | "All")[] = [
  "All",
  "Parent Guide",
  "Educator",
  "AI Explained",
  "Critical Thinking",
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");

  const filtered =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">📖</div>
        <h1 className="text-4xl font-black text-white mb-3">The AI Explorer Blog</h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Practical guides for parents and educators navigating AI with kids — no jargon, no hype.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const colors = cat !== "All" ? CATEGORY_COLORS[cat as BlogCategory] : null;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-black border transition-all ${
                isActive
                  ? cat === "All"
                    ? "bg-teal-500 border-teal-400 text-white"
                    : `${colors?.pill} ${colors?.text} border-current`
                  : "bg-space-800 border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((post) => {
          const colors = CATEGORY_COLORS[post.category];
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-space-800 rounded-2xl border border-slate-700 p-6 card-hover flex flex-col gap-3 group"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-4xl">{post.emoji}</span>
                <span
                  className={`text-xs font-black px-2.5 py-1 rounded-full border whitespace-nowrap ${colors.pill} ${colors.text}`}
                >
                  {post.category}
                </span>
              </div>

              <div>
                <h2 className="font-black text-white text-base leading-snug group-hover:text-teal-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm mt-1.5 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-auto pt-2 border-t border-slate-700/60 text-xs text-slate-500 font-bold">
                <span>🕐 {post.readTime} min read</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-bold">No articles in this category yet.</p>
        </div>
      )}
    </div>
  );
}
