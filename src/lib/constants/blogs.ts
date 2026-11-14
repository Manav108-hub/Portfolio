/**
 * Blogs configuration and articles data.
 */

export interface Post {
  tag: string;
  title: string;
  excerpt: string;
  meta: string;
  date?: string;
  /** Article URL; opens in new tab when clicked. */
  href: string;
}

export type BlogPost = Post;

export const POSTS: Post[] = [
  {
    tag: "Web",
    title: "FROM REACT TO ASTRO: WHY I SWITCHED",
    excerpt:
      "Why I transitioned from React to Astro for content-driven websites and high-speed delivery.",
    meta: "5 MIN READ",
    date: "01 Jan 2026",
    href: "https://manav10.hashnode.dev/from-react-to-astro-why-i-switched",
  },
  {
    tag: "AI",
    title: "HOW AI HELPS TRACK AND SAVE ENDANGERED SPECIES",
    excerpt:
      "Deploying machine learning and computer vision classifiers to protect endangered wildlife in real time.",
    meta: "6 MIN READ",
    date: "01 Jan 2026",
    href: "https://manav108.hashnode.dev/how-ai-helps-track-and-save-endangered-species",
  },
];

export const BLOGS = POSTS;
export const blogs = POSTS;
export const posts = POSTS;

export const BLOG_URL =
  process.env.NEXT_PUBLIC_BLOG_URL || "https://manav10.hashnode.dev";

export default POSTS;

