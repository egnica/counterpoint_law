"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./ImageDivider.module.css";

export default function ImageDivider({
  src = "/images/placeholder.webp",
  alt = "",
}) {
  const frameRef = useRef(null);
  const imageLayerRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const imageLayer = imageLayerRef.current;

    if (!frame || !imageLayer) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const compactScreen = window.matchMedia("(max-width: 760px)");

    if (reducedMotion.matches || compactScreen.matches) return undefined;

    let frameId = null;

    function updatePosition() {
      frameId = null;

      const rect = frame.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom < 0 || rect.top > viewportHeight) return;

      const frameCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const travelRange = viewportCenter + rect.height / 2;
      const normalized = Math.max(
        -1,
        Math.min(1, (frameCenter - viewportCenter) / travelRange)
      );
      const offset = normalized * -36;

      imageLayer.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
    }

    function handleScroll() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updatePosition);
    }

    updatePosition();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className={styles.frame} ref={frameRef} aria-hidden={alt ? undefined : true}>
      <div className={styles.imageLayer} ref={imageLayerRef}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className={styles.image}
        />
      </div>
    </div>
  );
}
