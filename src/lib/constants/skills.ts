/**
 * Skills array and badge configurations for the marquee and project chips.
 */
import { LOGO, type TechLogo } from "@/lib/tech-logos";

export const SKILLS = [
  "ts",
  "react",
  "next",
  "node",
  "express",
  "prisma",
  "postgres",
  "aws",
  "python",
  "tf",
  "opencv",
  "razorpay",
  "vercel",
] as const;

export type Skill = (typeof SKILLS)[number];

export const skills = SKILLS;

export interface SkillDetail {
  key: Skill;
  name: string;
  color: string;
  iconPath: string;
}

export const SKILL_DETAILS: SkillDetail[] = SKILLS.map((key) => ({
  key,
  name: LOGO[key]?.n ?? key,
  color: LOGO[key]?.c ?? "#ffffff",
  iconPath: LOGO[key]?.p ?? "",
}));

export default SKILLS;

