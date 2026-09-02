import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ContactSection from "@/components/ContactSection/ContactSection";
import { practiceAreas } from "@/lib/practiceAreas";
import styles from "./PracticeAreaPage.module.css";

const PRACTICE_AREA_BASE_PATH = "/practice-areas";

const toParagraphs = (body) => {
  if (!body) return [];
  return Array.isArray(body) ? body.filter(Boolean) : [body];
};

const hasImage = (image) => Boolean(image?.src);

const isChildOf = (practiceArea, parentSlug) => {
  if (Array.isArray(practiceArea.parent)) {
    return practiceArea.parent.includes(parentSlug);
  }

  return practiceArea.parent === parentSlug;
};

const getChildPracticeAreas = (parentSlug) =>
  Object.entries(practiceAreas)
    .filter(([, practiceArea]) => isChildOf(practiceArea, parentSlug))
    .map(([slug, practiceArea]) => ({ slug, ...practiceArea }));

const getParentSlugs = (practiceArea) => {
  if (!practiceArea?.parent) return [];

  return Array.isArray(practiceArea.parent)
    ? practiceArea.parent
    : [practiceArea.parent];
};

const getNavigationParent = (practiceArea, fromSlug) => {
  const parentSlugs = getParentSlugs(practiceArea);

  if (!parentSlugs.length) return null;

  if (fromSlug && parentSlugs.includes(fromSlug) && practiceAreas[fromSlug]) {
    return {
      slug: fromSlug,
      ...practiceAreas[fromSlug],
    };
  }

  if (parentSlugs.length === 1 && practiceAreas[parentSlugs[0]]) {
    return {
      slug: parentSlugs[0],
      ...practiceAreas[parentSlugs[0]],
    };
  }

  return null;
};

export function generateStaticParams() {
  return Object.keys(practiceAreas).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const practiceArea = practiceAreas[slug];

  if (!practiceArea) return {};

  return {
    title: `${practiceArea.title} | Counterpoint Law`,
    description:
      practiceArea.summary ||
      `Learn more about ${practiceArea.title} legal services from Counterpoint Law.`,
  };
}

function Paragraphs({ body }) {
  return toParagraphs(body).map((paragraph, index) => (
    <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>
  ));
}

function SectionImage({ image, sizes = "(max-width: 800px) 100vw, 50vw" }) {
  if (!hasImage(image)) return null;

  return (
    <div className={styles.sectionImage}>
      <Image
        src={image.src}
        alt={image.alt || ""}
        fill
        sizes={sizes}
        className={styles.coverImage}
      />
    </div>
  );
}

function StandardSection({ block, index }) {
  const imageVisible = hasImage(block.image);

  const sectionClasses = [
    styles.standardSection,
    !imageVisible ? styles.textOnlySection : "",
    imageVisible && index % 2 !== 0 ? styles.reverseSection : "",
    block.emphasis === "dark" ? styles.darkSection : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClasses}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionCopy}>
          <h2>{block.title}</h2>
          <Paragraphs body={block.body} />

          {block.link?.href && block.link?.label ? (
            <Link className={styles.textLink} href={block.link.href}>
              {block.link.label}
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>

        <SectionImage image={block.image} />
      </div>
    </section>
  );
}

function ListSection({ block }) {
  return (
    <section className={styles.listSection}>
      <div className={styles.constrainedSection}>
        <div className={styles.sectionHeading}>
          <h2>{block.title}</h2>
          <Paragraphs body={block.body} />
        </div>

        <div className={styles.listLayout}>
          <SectionImage
            image={block.image}
            sizes="(max-width: 900px) 100vw, 38vw"
          />

          <ul className={styles.featureList}>
            {(block.items || []).map((item, index) => (
              <li key={`${item.lead || item.text}-${index}`}>
                <span className={styles.listNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  {item.lead ? <strong>{item.lead}</strong> : null}
                  {item.text ? <p>{item.text}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StepsSection({ block }) {
  return (
    <section className={styles.stepsSection}>
      <div className={styles.constrainedSection}>
        <div className={styles.stepsIntroduction}>
          <div>
            <p className={styles.eyebrow}>How We Work</p>
            <h2>{block.title}</h2>
          </div>

          <div className={styles.stepsBody}>
            <Paragraphs body={block.body} />
          </div>
        </div>

        <ol className={styles.stepsGrid}>
          {(block.steps || []).map((step, index) => (
            <li key={`${step.heading || step.text}-${index}`}>
              <span className={styles.stepNumber}>{index + 1}</span>
              {step.heading ? <h3>{step.heading}</h3> : null}
              {step.text ? <p>{step.text}</p> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PracticeLinksSection({ block, currentSlug }) {
  const children = getChildPracticeAreas(currentSlug);

  if (!children.length) return null;

  return (
    <section className={styles.practiceLinksSection}>
      <div className={styles.constrainedSection}>
        <div className={styles.practiceLinksHeading}>
          <div>
            <p className={styles.eyebrow}>Explore Our Services</p>
            <h2>{block.title}</h2>
          </div>

          <div className={styles.practiceLinksIntro}>
            <Paragraphs body={block.body} />
          </div>
        </div>

        <div className={styles.practiceGrid}>
          {children.map((child) => (
            <Link
              className={styles.practiceCard}
              href={{
                pathname: `${PRACTICE_AREA_BASE_PATH}/${child.slug}`,
                query: { from: currentSlug },
              }}
              key={child.slug}
            >
              <span className={styles.cardTitle}>{child.title}</span>

              {child.summary ? (
                <span className={styles.cardSummary}>{child.summary}</span>
              ) : null}

              <span className={styles.cardLink}>
                Learn More <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContentBlock({ block, currentSlug, index }) {
  switch (block.type) {
    case "section":
      return <StandardSection block={block} index={index} />;

    case "list-section":
      return <ListSection block={block} />;

    case "steps-section":
      return <StepsSection block={block} />;

    case "practice-links-section":
      return <PracticeLinksSection block={block} currentSlug={currentSlug} />;

    default:
      return null;
  }
}

function PracticeAreaHero({ navigationParent, practiceArea }) {
  const backHref = navigationParent
    ? `${PRACTICE_AREA_BASE_PATH}/${navigationParent.slug}`
    : PRACTICE_AREA_BASE_PATH;

  const backLabel = navigationParent
    ? `Back to ${navigationParent.title}`
    : "Back to All Practice Areas";

  return (
    <header className={styles.hero}>
      {hasImage(practiceArea.image) ? (
        <div className={styles.heroImage} aria-hidden="true">
          <Image
            src={practiceArea.image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.coverImage}
          />
        </div>
      ) : null}

      <div className={styles.heroShade} aria-hidden="true" />

      <div className={styles.heroMark} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href={PRACTICE_AREA_BASE_PATH}>Practice Areas</Link>

            {navigationParent ? (
              <>
                <span aria-hidden="true">/</span>
                <Link
                  href={`${PRACTICE_AREA_BASE_PATH}/${navigationParent.slug}`}
                >
                  {navigationParent.title}
                </Link>
              </>
            ) : null}

            <span aria-hidden="true">/</span>
            <span aria-current="page">{practiceArea.title}</span>
          </nav>

          <Link className={styles.backLink} href={backHref}>
            <span aria-hidden="true">←</span>
            <span>{backLabel}</span>
          </Link>

          <p className={styles.eyebrow}>Counterpoint Law</p>
          <h1>{practiceArea.title}</h1>

          {practiceArea.summary ? (
            <p className={styles.heroSummary}>{practiceArea.summary}</p>
          ) : null}

          <Link className={styles.primaryButton} href="/#contact">
            Contact Counterpoint
          </Link>
        </div>
      </div>
    </header>
  );
}

export default async function PracticeAreaPage({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const practiceArea = practiceAreas[slug];

  if (!practiceArea) notFound();

  const fromParam = resolvedSearchParams?.from;
  const fromSlug = Array.isArray(fromParam) ? fromParam[0] : fromParam;
  const navigationParent = getNavigationParent(practiceArea, fromSlug);

  const contentBlocks = Array.isArray(practiceArea.content)
    ? practiceArea.content
    : [];

  return (
    <main className={styles.page}>
      <PracticeAreaHero
        navigationParent={navigationParent}
        practiceArea={practiceArea}
      />

      {contentBlocks.map((block, index) => (
        <ContentBlock
          block={block}
          currentSlug={slug}
          index={index}
          key={`${block.type}-${block.title || index}`}
        />
      ))}

      <ContactSection />
    </main>
  );
}
