import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.{md,mdx}",
  }),

  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(65),
    description: z.string().max(170),

    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    author: z.string().default("Leka O Bone"),
    category: z.string(),
    tags: z.array(z.string()).default([]),

    image: z.string(),
    imageAlt: z.string(),

    draft: z.boolean().default(false),

    featured: z.boolean().default(false),

    canonicalURL: z.string().url().optional(),
  }),
});

export const collections = {
  blog,
};