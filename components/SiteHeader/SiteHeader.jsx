"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";

const navigation = [
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Vincent Peppe", href: "/vincent-peppe" },
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

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} onClick={closeMenu}>
          <DotMark />
          <span>Counterpoint Law</span>
        </Link>

        <div className={styles.actions}>
          <Link href="/#contact" className={styles.contactLink} onClick={closeMenu}>
            Contact
          </Link>

          <button
            type="button"
            className={`${styles.menuButton} ${open ? styles.menuButtonOpen : ""}`}
            aria-expanded={open}
            aria-controls="site-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="site-navigation"
        className={`${styles.menuOverlay} ${open ? styles.menuOverlayOpen : ""}`}
        aria-hidden={!open}
      >
        <nav className={styles.menuInner} aria-label="Primary navigation">
          <div className={styles.menuIntro}>
            <p className={styles.menuEyebrow}>Counterpoint Law</p>
            <p>
              Business-minded legal counsel for companies, creators, innovators,
              and professionals.
            </p>
          </div>

          <div className={styles.menuLinks}>
            {navigation.map((item) => (
              <Link key={item.label} href={item.href} onClick={closeMenu}>
                <span>{item.label}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
