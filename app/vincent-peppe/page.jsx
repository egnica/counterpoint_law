import ContactSection from "@/components/ContactSection/ContactSection";
import styles from "../contentPage.module.css";

export const metadata = {
  title: "Vincent Peppe",
  description:
    "Learn more about Vincent Peppe and the business-minded approach behind Counterpoint Law.",
};

function DotMark() {
  return (
    <div className={styles.heroMark} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export default function VincentPeppePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <DotMark />

        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>About Counterpoint Law</p>
          <h1>Vincent Peppe</h1>
          <p className={styles.lead}>
            Business-minded legal counsel for entrepreneurs, companies,
            creators, and professionals navigating important decisions,
            agreements, and disputes.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          <p className={styles.contentLabel}>About Vincent</p>

          <div className={styles.contentCopy}>
            <h2>A fuller biography is coming next.</h2>
            <p>
              This page will be expanded with Vincent Peppe&apos;s professional
              background, experience, approach to client work, and other
              biographical details as the final site content is approved.
            </p>
            <p>
              For now, the page is in place so the site structure, navigation,
              and design can be reviewed as a complete system.
            </p>
          </div>
        </div>
      </section>

      <ContactSection
        heading="Start a conversation with Counterpoint."
        intro="Tell us a little about the legal or business issue you are working through."
      />
    </main>
  );
}
