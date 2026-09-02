import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection/ContactSection";
import ImageDivider from "@/components/ImageDivider/ImageDivider";
import ScrollDotMark from "@/components/ScrollDotMark/ScrollDotMark";
import { practiceAreas } from "@/lib/practiceAreas";
import styles from "./page.module.css";

export const metadata = {
  title: "Business, Technology & Entertainment Counsel",
  description:
    "Counterpoint Law provides practical legal counsel for businesses, entrepreneurs, technology companies, creators, artists, and professionals navigating contracts, intellectual property, transactions, and disputes.",
};

const featuredPractices = Object.entries(practiceAreas)
  .filter(([, area]) => area.parent === null && area.homeOrder)
  .sort(([, a], [, b]) => a.homeOrder - b.homeOrder)
  .map(([slug, area]) => ({ slug, ...area }));

const clientNeeds = [
  {
    title: "Launching, structuring, or changing a business",
    body:
      "From formation and ownership arrangements to commercial contracts and major transactions, clear legal foundations help a business make decisions with fewer surprises.",
    href: "/practice-areas/business-corporate",
  },
  {
    title: "Negotiating technology and digital agreements",
    body:
      "Software, platforms, data, vendors, licensing, and emerging tools create practical questions about ownership, access, performance, responsibility, and risk.",
    href: "/practice-areas/technology",
  },
  {
    title: "Building an entertainment or music deal",
    body:
      "Creative projects often depend on agreements covering contributions, rights, compensation, licensing, production, distribution, sponsorships, and long-term control.",
    href: "/practice-areas/entertainment-music",
  },
  {
    title: "Protecting creative work, trademarks, and brands",
    body:
      "Copyright, trademark, licensing, confidentiality, advertising, and brand-rights planning can help protect valuable assets while preserving room for commercial opportunity.",
    href: "/practice-areas/copyright-trademark-brand-protection",
  },
  {
    title: "Resolving a contract, ownership, or IP dispute",
    body:
      "Early analysis, strategic communication, negotiation, and carefully documented settlement terms can help clients pursue a useful resolution without losing sight of the business at stake.",
    href: "/practice-areas/dispute-resolution",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div
          className={styles.heroPanelVisual}
          aria-hidden="true"
          style={{
            inset: 0,
            width: "100%",
            clipPath: "none",
            background:
              "linear-gradient(90deg, rgba(5, 11, 31, 0.9) 0%, rgba(7, 20, 57, 0.76) 38%, rgba(7, 20, 57, 0.38) 58%, rgba(7, 20, 57, 0.08) 76%, rgba(7, 20, 57, 0) 88%)",
          }}
        >
          <div className={styles.heroMark}>
            <span style={{ background: "rgba(22, 135, 183, 0.28)" }} />
            <span style={{ background: "rgba(22, 135, 183, 0.28)" }} />
            <span style={{ background: "rgba(22, 135, 183, 0.28)" }} />
            <span style={{ background: "rgba(22, 135, 183, 0.28)" }} />
          </div>
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 id="home-title">Counterpoint Law</h1>
            <p className={styles.heroTagline}>
              Legal counsel for businesses, creators and innovators.
            </p>
            <p className={styles.heroBody}>
              Practical, business-minded guidance for contracts, transactions,
              technology, entertainment, intellectual property, and disputes.
            </p>
            <Link href="#contact" className={styles.heroCta}>
              Contact Counterpoint
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.practiceCtas} aria-label="Featured practice areas">
        <div className={styles.practiceGrid}>
          {featuredPractices.map((practice) => (
            <Link
              key={practice.slug}
              href={`/practice-areas/${practice.slug}`}
              className={styles.practiceCard}
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(6, 17, 55, 0.34) 0%, rgba(6, 17, 55, 0.08) 50%, rgba(6, 17, 55, 0.34) 100%), linear-gradient(180deg, rgba(6, 17, 55, 0.16) 0%, rgba(6, 17, 55, 0.9) 100%), url("${practice.image.src}")`,
              }}
            >
              <span className={styles.practiceTitle}>{practice.title}</span>
              <span className={styles.practiceArrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>

        <Link href="/practice-areas" className={styles.morePractices}>
          <span>More Practices</span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={styles.positioning} id="counterpoint">
        <ScrollDotMark />

        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Counterpoint Law</p>
          <h2 className={styles.verticalHeadline}>
            <span>Legal</span>
            <span>strategy</span>
            <span>keeps</span>
            <span>business</span>
            <span>moving.</span>
          </h2>
        </div>

        <div className={styles.positioningCopy}>
          <p>
            Counterpoint Law works with entrepreneurs, business owners,
            technology companies, creators, artists, producers, and other
            professionals whose legal questions are closely connected to the work
            they are building.
          </p>
          <p>
            The firm advises on the agreements, ownership decisions, intellectual
            property, transactions, and conflicts that can shape a company,
            creative project, product, or professional relationship. The goal is
            to identify what matters, explain the tradeoffs clearly, and develop a
            practical path forward.
          </p>
          <p>
            Vincent Peppe brings a business-minded approach to legal counsel,
            helping clients protect important interests without losing sight of
            the opportunity, relationship, or larger objective behind the matter.
          </p>
          <Link href="/vincent-peppe" className={styles.textLink}>
            Meet Vincent Peppe <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className={styles.needs}>
        <div className={styles.needsHeader}>
          <div className={styles.needsHeadline}>
            <p className={styles.eyebrow}>When legal questions become business questions</p>
            <h2>Advice grounded in the situation you are actually trying to solve.</h2>
          </div>

          <div className={styles.needsImage}>
            <Image
              src="/images/placeholder.webp"
              alt=""
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
              className={styles.needsImageAsset}
            />
          </div>

          <p className={styles.needsIntro}>
            Legal needs rarely arrive as neat categories. They show up while a
            client is launching something, negotiating a deal, protecting valuable
            work, managing a relationship, or deciding how to respond when a
            disagreement threatens progress.
          </p>
        </div>

        <div className={styles.needsGrid}>
          {clientNeeds.map((need, index) => (
            <Link key={need.title} href={need.href} className={styles.needCard}>
              <span className={styles.needNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{need.title}</h3>
              <p>{need.body}</p>
              <span className={styles.needLink}>
                Explore this area <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ImageDivider />

      <section className={styles.flatRates} id="flat-rates">
        <div className={styles.flatRateMark} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className={styles.flatRateCopy}>
          <p className={styles.flatRateEyebrow}>Flat-Rate Legal Services</p>
          <h2>Clear scope. Predictable legal fees.</h2>
          <p>
            Counterpoint Law uses flat-rate pricing rather than traditional hourly
            billing. When the scope of a matter can be defined in advance, clients
            know the legal fee before the work begins. That creates greater cost
            transparency and keeps conversations focused on the legal and business
            issues that matter.
          </p>
          <Link href="#contact" className={styles.flatRateCta}>
            Ask About Flat-Rate Services <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
