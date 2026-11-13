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

export interface Post {
  tag: string;
  title: string;
  excerpt: string;
  meta: string;
  /** Put the real article URL here; empty = shown as "coming soon". */
  href: string;
}

export const POSTS: Post[] = [
  {
    tag: "FULL STACK",
    title: "Building a rental platform with Next.js, Prisma & Postgres",
    excerpt:
      "Bookings, availability and PDF invoices: the architecture behind Libaas, and the mistakes that shaped it.",
    meta: "6 MIN READ",
    href: "",
  },
  {
    tag: "PAYMENTS",
    title: "Razorpay checkout without the headaches",
    excerpt: "Webhooks, retries and idempotency for a storefront that never double-charges.",
    meta: "4 MIN READ",
    href: "",
  },
  {
    tag: "AI / ML",
    title: "From 60% to 90%: training a species classifier",
    excerpt: "Data, augmentation and the tricks that got predictions under 200 ms.",
    meta: "7 MIN READ",
    href: "",
  },
];
