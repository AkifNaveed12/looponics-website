"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./AgencyHero.module.css";

const CYCLING_WORDS = ["TECHNOLOGY", "DIGITAL", "ENGINEERING", "CREATIVE"];
const CYCLE_INTERVAL_MS = 2500;

function StarburstSVG({ className }: { className?: string }) {
  // 12-pointed star built from two overlapping polygons
  const size = 200;
  const cx = 100;
  const cy = 100;
  const outerR = 95;
  const innerR = 42;
  const points = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * Math.PI) / 12 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");

  return (
    <svg
      className={className}
      viewBox={`0 0 ${size} ${size}`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon points={points} />
    </svg>
  );
}

export default function AgencyHero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
    }, CYCLE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const headlineLines = ["YOUR", "ALL-IN-ONE"];

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* ── Headline ── */}
        <div className={styles.headline} aria-label="Your all-in-one technology agency.">
          {headlineLines.map((line, i) => (
            <div className={styles.lineWrap} key={line}>
              <motion.span
                className={styles.headlineLine}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: i * 0.1,
                }}
              >
                {line}
              </motion.span>
            </div>
          ))}

          {/* Animated cycling line */}
          <div className={styles.lineWrap}>
            <div className={styles.cyclingLine} aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.span
                  key={CYCLING_WORDS[wordIndex]}
                  className={styles.headlineLine}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: -20 }
                  }
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {CYCLING_WORDS[wordIndex]}{" "}
                  <span className={styles.agencyWord}>AGENCY.</span>
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Secondary CTA ── */}
        <motion.div
          className={styles.secondaryCta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
        >
          <a href="#services" className={styles.secondaryLink}>
            Explore Our Services{" "}
            <span className={styles.arrow}>→</span>
          </a>
        </motion.div>

        {/* ── Decorative shapes ── */}
        <div className={styles.shapesRow}>
          {/* Starburst */}
          <motion.div
            className={styles.starburstWrap}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14,
              delay: 0.5,
            }}
          >
            <motion.div
              className={styles.starburstInner}
              animate={
                prefersReducedMotion ? {} : { rotate: 360 }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: 20,
                      ease: "linear",
                      repeat: Infinity,
                      repeatType: "loop",
                    }
              }
            >
              <StarburstSVG className={styles.starburstSvg} />
            </motion.div>
          </motion.div>

          {/* Blob / CTA */}
          <motion.a
            href="#contact"
            className={styles.blob}
            aria-label="Let's Build Something"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: 1,
                    scale: [1, 1.05, 1],
                    y: [0, -15, 0],
                  }
            }
            transition={
              prefersReducedMotion
                ? { type: "spring", stiffness: 120, damping: 14, delay: 0.5 }
                : {
                    opacity: { duration: 0.6, delay: 0.5 },
                    scale: {
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.5,
                    },
                    y: {
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.5,
                    },
                  }
            }
          >
            <span className={styles.blobText}>
              Let&apos;s Build
              <br />
              Something
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
