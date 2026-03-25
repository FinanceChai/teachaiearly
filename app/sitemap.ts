import { MetadataRoute } from "next";
import { WORLDS } from "@/lib/course-data";
import { BLOG_POSTS } from "@/lib/blog-data";
import { FLASHCARDS, termToSlug } from "@/lib/flashcards-data";

const BASE_URL = "https://teachaiearly.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const worldPages: MetadataRoute.Sitemap = WORLDS.map((world) => ({
    url: `${BASE_URL}/course/${world.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const glossaryPages: MetadataRoute.Sitemap = FLASHCARDS.map((fc) => ({
    url: `${BASE_URL}/glossary/${termToSlug(fc.term)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...worldPages, ...blogPages, ...glossaryPages];
}
