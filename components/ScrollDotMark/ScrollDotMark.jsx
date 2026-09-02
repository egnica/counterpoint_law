"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollDotMark.module.css";

export default function ScrollDotMark() {
  const markRef = useRef(null);

  useEffect(() => {
    const mark = markRef.current;
    if (!mark) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return undefined;

    let frameId = null;

    function updateRotation() {
      frameId = null;
      const rotation = window.scrollY * 0.035;
      mark.style.transform = `rotate(${rotation}deg)`;
    }

    function handleScroll() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateRotation);
    }

    updateRotation();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.mark} ref={markRef} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
