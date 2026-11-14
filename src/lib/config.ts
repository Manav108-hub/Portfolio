/**
 * Portfolio configuration driven by environment variables.
 *
 * NOTE: Next.js only inlines `NEXT_PUBLIC_*` variables into the browser bundle
 * when they are referenced with a literal `process.env.NEXT_PUBLIC_X` access,
 * so every variable is spelled out below (no dynamic lookups).
 *
 * Videos can be a path under /public (e.g. "/assets/videos/libaas.mp4") or any
 * absolute URL (CDN, S3, ...). Change them in `.env.local` - see `.env.example`.
 */

import {
  type ProjectConfig,
  PROJECTS,
  VIDEO_LIBAAS,
  VIDEO_AURENA,
  VIDEO_AI_SPECIES,
  VIDEO_SMART_KITCHEN,
  SITE_LIBAAS,
  SITE_AURENA,
  SITE_AI_SPECIES,
  SITE_SMART_KITCHEN,
} from "./constants/projects";

export {
  type ProjectConfig,
  PROJECTS,
  VIDEO_LIBAAS,
  VIDEO_AURENA,
  VIDEO_AI_SPECIES,
  VIDEO_SMART_KITCHEN,
  SITE_LIBAAS,
  SITE_AURENA,
  SITE_AI_SPECIES,
  SITE_SMART_KITCHEN,
};

/* ---- contact / socials / blog (override via env) ---- */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "manavadwani@gmail.com";
export const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Manav108-hub";
export const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ||
  "https://www.linkedin.com/in/manav-r-adwani";
/** Link of the full blog (Medium, Hashnode, ...). Empty = "All posts" button is dimmed. */
export const BLOG_URL =
  process.env.NEXT_PUBLIC_BLOG_URL || "https://manav10.hashnode.dev";
