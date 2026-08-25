"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { practiceAreas } from "@/lib/practiceAreas";
import styles from "./PracticeAreasPage.module.css";

const PRACTICE_AREA_BASE_PATH = "/practice-areas";

const isChildOf = (practiceArea, parentSlug) => {
  if (Array.isArray(practiceArea.parent)) {
    return practiceArea.parent.includes(parentSlug);
  }

  return practiceArea.parent === parentSlug;
};

const parentPracticeAreas = Object.entries(practiceAreas)
  .filter(([, practiceArea]) => practiceArea.parent === null)
  .map(([slug, practiceArea]) => ({
    slug,
    ...practiceArea,
  }))
  .sort(
    (first, second) => (first.homeOrder ?? 999) - (second.homeOrder ?? 999),
  );

const accordionColumns = [
  parentPracticeAreas.filter((_, index) => index % 2 === 0),
  parentPracticeAreas.filter((_, index) => index % 2 !== 0),
];

const allPracticeAreas = Object.entries(practiceAreas)
  .map(([slug, practiceArea]) => ({
    slug,
    ...practiceArea,
  }))
  .sort((first, second) => first.title.localeCompare(second.title));

const getChildren = (parentSlug) =>
  Object.entries(practiceAreas)
    .filter(([, practiceArea]) => isChildOf(practiceArea, parentSlug))
    .map(([slug, practiceArea]) => ({
      slug,
      ...practiceArea,
    }));

const getPracticeAreaHref = (slug, practiceArea, navigationParent = null) => {
  let fromSlug = navigationParent;

  if (!fromSlug && practiceArea.parent) {
    fromSlug = Array.isArray(practiceArea.parent)
      ? practiceArea.parent[0]
      : practiceArea.parent;
  }

  if (!fromSlug) {
    return `${PRACTICE_AREA_BASE_PATH}/${slug}`;
  }

  return {
    pathname: `${PRACTICE_AREA_BASE_PATH}/${slug}`,
    query: {
      from: fromSlug,
    },
  };
};

function AccordionGroup({ practiceArea }) {
  const { slug, title, summary, image, homeOrder } = practiceArea;

  const [isOpen, setIsOpen] = useState(false);
  const children = getChildren(slug);

  const buttonId = `practice-button-${slug}`;
  const panelId = `practice-panel-${slug}`;

  return (
    <article
      className={styles.practiceGroup}
      style={{
        "--practice-order": homeOrder ?? 999,
      }}
    >
      <h2 className={styles.practiceHeading}>
        <button
          id={buttonId}
          className={styles.practiceHeader}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          data-open={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <Image
            className={styles.headerImage}
            src={image?.src || "/images/placeholder.webp"}
            alt=""
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />

          <span className={styles.imageOverlay} aria-hidden="true" />

          <span className={styles.practiceTitle}>{title}</span>

          <span className={styles.toggleIcon} aria-hidden="true">
            <span className={styles.horizontalLine} />
            <span className={styles.verticalLine} />
          </span>
        </button>
      </h2>

      <div
        id={panelId}
        className={styles.practicePanel}
        data-open={isOpen}
        role="region"
        aria-labelledby={buttonId}
      >
        <div className={styles.practicePanelInner}>
          <div className={styles.practicePanelBody}>
            <div className={styles.panelIntroduction}>
              {summary ? <p>{summary}</p> : null}

              <Link
                className={styles.overviewLink}
                href={`${PRACTICE_AREA_BASE_PATH}/${slug}`}
              >
                View {title} Overview
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {children.length ? (
              <ul className={styles.childList}>
                {children.map((child) => (
                  <li key={child.slug}>
                    <Link href={getPracticeAreaHref(child.slug, child, slug)}>
                      <span>{child.title}</span>

                      <span className={styles.childArrow} aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function AccordionColumn({ practiceAreas: columnPracticeAreas }) {
  return (
    <div className={styles.accordionColumn}>
      {columnPracticeAreas.map((practiceArea) => (
        <AccordionGroup key={practiceArea.slug} practiceArea={practiceArea} />
      ))}
    </div>
  );
}

function PracticeAreaDirectory() {
  return (
    <section
      className={styles.directorySection}
      aria-labelledby="all-practice-areas-heading"
    >
      <div className={styles.constrained}>
        <div className={styles.directoryIntroduction}>
          <div>
            <p className={styles.eyebrow}>Complete Directory</p>

            <h2 id="all-practice-areas-heading">Browse All Practice Areas</h2>
          </div>

          <p>
            View every Counterpoint Law practice area alphabetically or explore
            the primary categories above.
          </p>
        </div>

        <ul className={styles.directoryGrid}>
          {allPracticeAreas.map((practiceArea) => (
            <li key={practiceArea.slug}>
              <Link href={getPracticeAreaHref(practiceArea.slug, practiceArea)}>
                <span>{practiceArea.title}</span>

                <span className={styles.directoryArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactCallout() {
  return (
    <section className={styles.contactCallout}>
      <div className={styles.contactCalloutInner}>
        <p className={styles.eyebrow}>Start a Conversation</p>

        <h2>Let’s Discuss Your Legal Needs</h2>

        <p>
          Contact Counterpoint Law to discuss your business, technology,
          entertainment, intellectual property, or dispute-resolution matter.
        </p>

        <Link className={styles.contactButton} href="/contact">
          Schedule a Consultation
        </Link>
      </div>
    </section>
  );
}

export default function PracticeAreasPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="practice-areas-heading">
        <div className={styles.constrained}>
          <div className={styles.heroIntroduction}>
            <p className={styles.eyebrow}>Counterpoint Law</p>

            <h1 id="practice-areas-heading">Practice Areas</h1>

            <p className={styles.heroSummary}>
              Counterpoint Law provides practical legal guidance across
              business, technology, entertainment, intellectual property, and
              dispute resolution. Explore a primary practice area or browse the
              complete service directory.
            </p>
          </div>

          <p className={styles.accordionPrompt}>
            Select a category to explore its services.
          </p>

          <div className={styles.accordionGrid}>
            {accordionColumns.map((columnPracticeAreas, index) => (
              <AccordionColumn
                key={`practice-column-${index}`}
                practiceAreas={columnPracticeAreas}
              />
            ))}
          </div>
        </div>
      </section>

      <PracticeAreaDirectory />

      <ContactCallout />
    </main>
  );
}
