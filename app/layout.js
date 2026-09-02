import { Geist, Geist_Mono } from "next/font/google";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import { practiceAreas } from "@/lib/practiceAreas";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const featuredPractices = Object.entries(practiceAreas)
  .filter(([, area]) => area.parent === null && area.homeOrder)
  .sort(([, a], [, b]) => a.homeOrder - b.homeOrder)
  .map(([slug, area]) => ({
    slug,
    title: area.title,
  }));

export const metadata = {
  title: {
    default: "Counterpoint Law",
    template: "%s | Counterpoint Law",
  },
  description:
    "Practical legal counsel for businesses, creators, technology companies, and professionals navigating contracts, intellectual property, transactions, and disputes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SiteHeader featuredPractices={featuredPractices} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
