import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBlogPost,
  getRelatedPosts,
  CATEGORY_COLORS,
  type ContentBlock,
} from "@/lib/blog-data";

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);
  const colors = CATEGORY_COLORS[post.category];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm mb-10"
      >
        ← All articles
      </Link>

      {/* Article header */}
      <div className="mb-10">
        <div className="text-6xl mb-4">{post.emoji}</div>
        <span
          className={`text-xs font-black px-3 py-1 rounded-full border ${colors.pill} ${colors.text} mb-4 inline-block`}
        >
          {post.category}
        </span>
        <h1 className="text-3xl font-black text-white leading-tight mt-3 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-slate-500 font-bold">
          <span>🕐 {post.readTime} min read</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
        <div className="mt-6 border-t border-slate-800" />
      </div>

      {/* Article body */}
      <article className="space-y-5">
        {post.content.map((block, i) => (
          <ContentRenderer key={i} block={block} />
        ))}
      </article>

      {/* CTA */}
      <div className="mt-14 bg-gradient-to-br from-teal-500/15 to-cyan-500/10 border border-teal-500/30 rounded-2xl p-7 text-center">
        <div className="text-3xl mb-3">🚀</div>
        <h3 className="text-xl font-black text-white mb-2">
          Ready to explore AI with your child?
        </h3>
        <p className="text-slate-400 text-sm mb-5">
          AI Explorer turns these concepts into hands-on lessons kids aged 9–12 actually enjoy.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl font-black text-white bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 transition-all"
        >
          Try AI Explorer Free →
        </Link>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-black text-white mb-5">More articles</h2>
          <div className="space-y-3">
            {related.map((p) => {
              const c = CATEGORY_COLORS[p.category];
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="flex items-start gap-4 bg-space-800 rounded-2xl border border-slate-700 p-4 card-hover group"
                >
                  <span className="text-3xl flex-shrink-0">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-black ${c.text}`}>{p.category}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-slate-500 font-bold">{p.readTime} min</span>
                    </div>
                    <p className="font-black text-white text-sm leading-snug group-hover:text-teal-300 transition-colors">
                      {p.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ContentRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-slate-300 leading-relaxed text-base">{block.text}</p>
      );
    case "heading":
      return (
        <h2 className="text-xl font-black text-white pt-4 pb-1">{block.text}</h2>
      );
    case "subheading":
      return (
        <h3 className="text-base font-black text-teal-300 pt-2">{block.text}</h3>
      );
    case "list":
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300 text-base">
              <span className="text-teal-400 font-black mt-0.5 flex-shrink-0">→</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-5 flex gap-4">
          <span className="text-2xl flex-shrink-0">{block.emoji}</span>
          <p className="text-slate-300 leading-relaxed text-sm">{block.text}</p>
        </div>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-teal-500 pl-5 py-1">
          <p className="text-white font-bold italic leading-relaxed">"{block.text}"</p>
          {block.attribution && (
            <cite className="text-slate-500 text-sm not-italic mt-2 block">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );
    default:
      return null;
  }
}
