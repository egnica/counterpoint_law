import Link from "next/link";
import styles from "./SiteFooter.module.css";

const footerLinks = [
  { label: "About", href: "/vincent-peppe" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Flat-Rate Services", href: "/#flat-rates" },
  { label: "Contact", href: "/#contact" },
];

function DotMark() {
  return (
    <span className={styles.dotMark} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <Link href="/" className={styles.brand}>
            <DotMark />
            <span>Counterpoint Law</span>
          </Link>
          <p>
            Business, technology, entertainment, intellectual-property, and
            dispute-resolution counsel.
          </p>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          {footerLinks.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Counterpoint Law.</span>
        <span>Attorney advertising. Prior results do not guarantee a similar outcome.</span>
      </div>
    </footer>
  );
}
