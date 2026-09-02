import ContactSection from "@/components/ContactSection/ContactSection";
import styles from "../contentPage.module.css";

export const metadata = {
  title: "Flat-Rate Legal Services",
  description:
    "Learn about Counterpoint Law's flat-rate approach to legal services and predictable legal fees.",
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

export default function FlatRateServicesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <DotMark />

        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Counterpoint Law</p>
          <h1>Flat-Rate Legal Services</h1>
          <p className={styles.lead}>
            Clear scope and predictable legal fees, without the uncertainty of
            traditional hourly billing.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          <p className={styles.contentLabel}>How Pricing Works</p>

          <div className={styles.contentCopy}>
            <h2>Know the legal fee before the work begins.</h2>
            <p>
              Counterpoint Law uses flat-rate pricing for matters where the scope
              of work can be defined in advance. The goal is greater cost
              transparency and conversations focused on the legal and business
              issues that matter.
            </p>
            <p>
              The specific flat-rate services, scopes, and pricing are still
              being finalized and will be added to this page once they are
              confirmed.
            </p>

            <div className={styles.note}>
              Detailed service packages and pricing will be added here after the
              final flat-rate menu is approved.
            </div>
          </div>
        </div>
      </section>

      <ContactSection
        heading="Ask about flat-rate services."
        intro="Tell us what you are working on and Counterpoint can help determine whether a flat-rate scope is a good fit."
      />
    </main>
  );
}
