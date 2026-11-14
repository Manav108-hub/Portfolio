/* Editable copy for the Journey and Blogs screens. */

export interface Chapter {
  tag: string;
  title: string;
  text: string;
  now?: boolean;
}

export const JOURNEY: Chapter[] = [
  {
    tag: "CHAPTER 01",
    title: "Engineering the foundation",
    text: "Computer Science Engineering: algorithms, systems and a habit of building things on the side.",
  },
  {
    tag: "CHAPTER 02",
    title: "Teaching machines to see",
    text: "AI Species Recognition: a classifier at 90% accuracy with predictions in under 200 ms.",
  },
  {
    tag: "CHAPTER 03",
    title: "Shipping real products",
    text: "Libaas, Aurena and Smart Kitchen: full-stack stores with payments, admin panels and cloud deploys.",
  },
  {
    tag: "2023 - PRESENT",
    title: "Co-Founder & CTO, Amaippu",
    text: "Architecting the platform, scaling infrastructure and leading developers toward one vision.",
    now: true,
  },
];

export {
  type Post,
  type BlogPost,
  POSTS,
  BLOGS,
  blogs,
  posts,
  BLOG_URL,
} from "./constants/blogs";
