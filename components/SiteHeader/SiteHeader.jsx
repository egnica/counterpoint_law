"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";

const overlayNavigation = [
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

export default function SiteHeader({ featuredPractices = [] }) {
  const [open, setOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
        setPracticeOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  function closeMenu() {
    setOpen(false);
    setPracticeOpen(false);
  }

  function toggleMainMenu() {
    setPracticeOpen(false);
    setOpen((current) => !current);
  }

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} onClick={closeMenu}>
          <DotMark />
          <span>Counterpoint Law</span>
        </Link>

        <div className={styles.actions}>
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            <Link href="/vincent-peppe" onClick={closeMenu}>
              About
            </Link>

            <div
              className={styles.practiceNav}
              onMouseEnter={() => setPracticeOpen(true)}
              onMouseLeave={() => setPracticeOpen(false)}
            >
              <button
                type="button"
                className={styles.practiceTrigger}
                aria-expanded={practiceOpen}
                aria-controls="practice-area-menu"
                onClick={() => setPracticeOpen((current) => !current)}
              >
                Practice Areas
                <span aria-hidden="true">⌄</span>
              </button>

              <div
                id="practice-area-menu"
                className={`${styles.practiceDropdown} ${
                  practiceOpen ? styles.practiceDropdownOpen : ""
                }`}
              >
                <p className={styles.dropdownEyebrow}>Featured Practices</p>
                <div className={styles.dropdownLinks}>
                  {featuredPractices.map((practice) => (
                    <Link
                      key={practice.slug}
                      href={`/practice-areas/${practice.slug}`}
                      onClick={closeMenu}
                    >
                      <span>{practice.title}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/practice-areas"
                  className={styles.viewAll}
                  onClick={closeMenu}
                >
                  View All Practice Areas <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <Link href="/#contact" onClick={closeMenu}>
              Contact
            </Link>
          </nav>

          <button
            type="button"
            className={`${styles.menuButton} ${open ? styles.menuButtonOpen : ""}`}
            aria-expanded={open}
            aria-controls="site-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={toggleMainMenu}
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
        <nav className={styles.menuInner} aria-label="Expanded navigation">
          <div className={styles.menuMain}>
            <p className={styles.menuEyebrow}>Navigate</p>
            <div className={styles.menuLinks}>
              {overlayNavigation.map((item) => (
                <Link key={item.label} href={item.href} onClick={closeMenu}>
                  <span>{item.label}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.featuredMenu}>
            <p className={styles.menuEyebrow}>Featured Practices</p>
            <div className={styles.featuredLinks}>
              {featuredPractices.map((practice) => (
                <Link
                  key={practice.slug}
                  href={`/practice-areas/${practice.slug}`}
                  onClick={closeMenu}
                >
                  <span>{practice.title}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
            <Link
              href="/practice-areas"
              className={styles.overlayViewAll}
              onClick={closeMenu}
            >
              View All Practice Areas <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
