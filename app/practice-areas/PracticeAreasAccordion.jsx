"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./PracticeAreasPage.module.css";

const PRACTICE_AREA_BASE_PATH = "/practice-areas";

function AccordionGroup({ practiceArea }) {
  const { slug, title, summary, image, homeOrder, children } = practiceArea;
  const [isOpen, setIsOpen] = useState(false);

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
                    <Link
                      href={{
                        pathname: `${PRACTICE_AREA_BASE_PATH}/${child.slug}`,
                        query: { from: slug },
                      }}
                    >
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

function AccordionColumn({ practiceAreas }) {
  return (
    <div className={styles.accordionColumn}>
      {practiceAreas.map((practiceArea) => (
        <AccordionGroup key={practiceArea.slug} practiceArea={practiceArea} />
      ))}
    </div>
  );
}

export default function PracticeAreasAccordion({ columns }) {
  return (
    <div className={styles.accordionGrid}>
      {columns.map((practiceAreas, index) => (
        <AccordionColumn
          key={`practice-column-${index}`}
          practiceAreas={practiceAreas}
        />
      ))}
    </div>
  );
}
