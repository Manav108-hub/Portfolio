import type { Metadata } from "next";
import { Alexandria, Anton, Montserrat, Syncopate } from "next/font/google";
import "./globals.css";
import "@/components/landing.css";
import "@/components/sections.css";

const alexandria = Alexandria({ subsets: ["latin"], weight: "900", variable: "--font-alexandria" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
});
const syncopate = Syncopate({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-syncopate" });

export const metadata: Metadata = {
  title: "Manav R. Adwani",
  description:
    "Portfolio of Manav R. Adwani: full stack, cloud and entrepreneurship. Co-Founder & CTO at Amaippu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${alexandria.variable} ${anton.variable} ${montserrat.variable} ${syncopate.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
