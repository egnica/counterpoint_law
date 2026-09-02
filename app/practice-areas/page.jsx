import Link from "next/link";

import ContactSection from "@/components/ContactSection/ContactSection";
import { practiceAreas } from "@/lib/practiceAreas";
import PracticeAreasAccordion from "./PracticeAreasAccordion";
import styles from "./PracticeAreasPage.module.css";

const PRACTICE_AREA_BASE_PATH = "/practice-areas";

const isChildOf = (practiceArea, parentSlug) => {
  if (Array.isArray(practiceArea.parent)) {
    return practiceArea.parent.includes(parentSlug);
  }

  return practiceArea.parent === parentSlug;
};

const allPracticeAreas = Object.entries(practiceAreas)
  .map(([slug, practiceArea]) => ({
    slug,
    title: practiceArea.title,
    parent: practiceArea.parent,
  }))
  .sort((first, second) => first.title.localeCompare(second.title));

const getChildren = (parentSlug) =>
  Object.entries(practiceAreas)
    .filter(([, practiceArea]) => isChildOf(practiceArea, parentSlug))
    .map(([slug, practiceArea]) => ({
      slug,
      title: practiceArea.title,
    }));

const parentPracticeAreas = Object.entries(practiceAreas)
  .filter(([, practiceArea]) => practiceArea.parent === null)
  .map(([slug, practiceArea]) => ({
    slug,
    title: practiceArea.title,
    summary: practiceArea.summary,
    image: practiceArea.image,
    homeOrder: practiceArea.homeOrder,
    children: getChildren(slug),
  }))
  .sort(
    (first, second) => (first.homeOrder ?? 999) - (second.homeOrder ?? 999),
  );

const accordionColumns = [
  parentPracticeAreas.filter((_, index) => index % 2 === 0),
  parentPracticeAreas.filter((_, index) => index % 2 !== 0),
];

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

          <PracticeAreasAccordion columns={accordionColumns} />
        </div>
      </section>

      <PracticeAreaDirectory />

      <ContactSection />
    </main>
  );
}
