import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = (
    await getCollection("blog", ({ data }) => !data.draft)
  ).sort(
    (a, b) =>
      b.data.publishDate.valueOf() -
      a.data.publishDate.valueOf()
  );

  return rss({
    title: "Leka O Bone Resources",
    description:
      "Website, SEO and digital growth resources from Leka O Bone.",
    site: context.site,

    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}/`,
    })),
  });
}