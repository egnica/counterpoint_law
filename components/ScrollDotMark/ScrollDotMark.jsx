"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollDotMark.module.css";

export default function ScrollDotMark() {
  const markRef = useRef(null);
  const upperDotsRef = useRef(null);
  const lowerDotsRef = useRef(null);

  useEffect(() => {
    const mark = markRef.current;
    const upperDots = upperDotsRef.current;
    const lowerDots = lowerDotsRef.current;
    const section = mark?.closest("#counterpoint");

    if (!mark || !upperDots || !lowerDots || !section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let frameId = null;

    function updateMark() {
      frameId = null;

      const rotation = reducedMotion.matches ? 12 : window.scrollY * 0.09;
      const transform = `rotate(${rotation}deg)`;

      upperDots.style.transform = transform;
      lowerDots.style.transform = transform;

      const markRect = mark.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const splitY = Math.max(
        0,
        Math.min(markRect.height, sectionRect.bottom - markRect.top)
      );

      mark.style.setProperty("--split-y", `${splitY}px`);
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateMark);
    }

    updateMark();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener?.("change", scheduleUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener?.("change", scheduleUpdate);
    };
  }, []);

  const dots = (
    <>
      <span />
      <span />
      <span />
      <span />
    </>
  );

  return (
    <div className={styles.mark} ref={markRef} aria-hidden="true">
      <div className={`${styles.layer} ${styles.upperLayer}`}>
        <div className={styles.dots} ref={upperDotsRef}>
          {dots}
        </div>
      </div>
      <div className={`${styles.layer} ${styles.lowerLayer}`}>
        <div className={styles.dots} ref={lowerDotsRef}>
          {dots}
        </div>
      </div>
    </div>
  );
}
