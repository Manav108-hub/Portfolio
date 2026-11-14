/**
 * Projects configuration and data.
 * Can be overridden via environment variables (see .env.example).
 */

export interface ProjectConfig {
  label: string;
  title: string;
  desc: string;
  tech: string[];
  /** Demo video shown in the player. */
  video: string;
  /** Live website of the project. Empty string = not available yet. */
  website: string;
}

export const VIDEO_LIBAAS =
  process.env.NEXT_PUBLIC_VIDEO_LIBAAS || "/assets/videos/libaas.mp4";
export const VIDEO_AURENA =
  process.env.NEXT_PUBLIC_VIDEO_AURENA || "/assets/videos/aurena.mp4";
export const VIDEO_AI_SPECIES =
  process.env.NEXT_PUBLIC_VIDEO_AI_SPECIES || "/assets/videos/ai-species.mp4";
export const VIDEO_SMART_KITCHEN =
  process.env.NEXT_PUBLIC_VIDEO_SMART_KITCHEN ||
  "/assets/videos/smart-kitchen.mp4";

export const SITE_LIBAAS = process.env.NEXT_PUBLIC_SITE_LIBAAS || "";
export const SITE_AURENA = process.env.NEXT_PUBLIC_SITE_AURENA || "";
export const SITE_AI_SPECIES = process.env.NEXT_PUBLIC_SITE_AI_SPECIES || "";
export const SITE_SMART_KITCHEN =
  process.env.NEXT_PUBLIC_SITE_SMART_KITCHEN || "";

export const PROJECTS: ProjectConfig[] = [
  {
    label: "Libaas",
    title: "Pooja's Libaas",
    video: VIDEO_LIBAAS,
    website: SITE_LIBAAS,
    desc: "Dress rental: bookings, availability and PDF invoices.",
    tech: ["next", "express", "prisma", "aws", "postgres"],
  },
  {
    label: "Aurena",
    title: "Aurena Fashion",
    video: VIDEO_AURENA,
    website: SITE_AURENA,
    desc: "Fashion store with Razorpay payments and an admin panel.",
    tech: ["next", "express", "prisma", "razorpay", "aws"],
  },
  {
    label: "AI Species",
    title: "AI Species Recognition",
    video: VIDEO_AI_SPECIES,
    website: SITE_AI_SPECIES,
    desc: "Image classifier at 90% accuracy, predictions in under 200 ms.",
    tech: ["python", "tf", "opencv"],
  },
  {
    label: "Kitchen",
    title: "Smart Kitchen",
    video: VIDEO_SMART_KITCHEN,
    website: SITE_SMART_KITCHEN,
    desc: "Smart Kitchen: a full-stack app with Razorpay payments.",
    tech: ["next", "vercel", "express", "prisma", "postgres", "razorpay", "aws"],
  },
];

export const projects = PROJECTS;
export default PROJECTS;

