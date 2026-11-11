"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./AgencyHero.module.css";

const DYNAMIC_WORDS = ["DIGITAL", "CREATIVE", "ALL-IN-ONE", "TECHNOLOGY"];
const SHIFT_INTERVAL_MS = 2800;

export default function AgencyHero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
    }, SHIFT_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const currentWord = DYNAMIC_WORDS[wordIndex];

  return (
    <section className={styles.hero}>
      {/* ── Top Micro Tagline (Copula Agency layout style) ── */}
      <div className={styles.topBar}>
        <p className={styles.tagline}>
          New generation, same
          <br />
          Engineering DNA
        </p>
      </div>

      {/* ── Bottom-Anchored Oversized Headline Composition ── */}
      <div className={styles.headlineWrapper}>
        <div className={styles.heroTitle}>
          {/* Line 1: YOUR */}
          <div className={styles.lineWrap}>
            <motion.span
              className={styles.staticLine}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              YOUR
            </motion.span>
          </div>

          {/* Line 2: Dynamic Centered Line with letter-stagger shift */}
          <div className={styles.dynamicLineWrap}>
            <div className={styles.dynamicLineBox}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWord}
                  className={styles.wordContainer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {currentWord.split("").map((char, index) => (
                    <motion.span
                      key={`${currentWord}-${index}`}
                      className={styles.charSpan}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 50 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: -50 }
                      }
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                        delay: index * 0.03,
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Line 3: AGENCY + Both Animated Shapes Side-by-Side */}
          <div className={styles.agencyRow}>
            <motion.span
              className={styles.staticLine}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              AGENCY
            </motion.span>

            {/* Two Animated Shapes Placed Side-by-Side */}
            <div className={styles.shapesSideBySide}>
              {/* Shape 1: 16-point Faceted Cross Starburst (Continuous Spin) */}
              <motion.div
                className={styles.starburstContainer}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 118 119"
                  fill="none"
                  className={styles.starburstSvg}
                  aria-hidden="true"
                >
                  <path
                    d="M0 70.2418H33.8241L9.90981 94.164L24.5755 108.842L48.4969 84.9194V118.755H69.2407V84.9194L93.155 108.842L107.828 94.164L83.9134 70.2418H117.73V49.4913H83.9134L107.828 25.5691L93.155 10.8915L69.2407 34.8137V0.978394H48.4969V34.8137L24.5755 10.8915L9.90981 25.5691L33.8241 49.4913H0V70.2418Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>

              {/* Shape 2: Scalloped Cloud Badge CTA ("LET'S BOND" with hover rotation) */}
              <motion.a
                href="#contact"
                className={styles.badgeLink}
                aria-label="Let's bond - Contact Looponics"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                <div className={styles.badgeSvgWrapper}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 125 125"
                    fill="currentColor"
                    className={styles.badgeSvg}
                    aria-hidden="true"
                  >
                    <path d="M11.4576 83.9274C9.91978 102.544 22.9721 115.601 41.583 114.063C53.6527 128.312 72.1136 128.312 84.1908 114.063C102.802 115.601 115.854 102.544 114.316 83.9274C128.561 71.8537 128.561 53.3868 114.316 41.3056C115.854 22.6886 102.802 9.63195 84.1908 11.1702C72.1211 -3.07953 53.6602 -3.07953 41.583 11.1702C22.9721 9.63195 9.91978 22.6886 11.4576 41.3056C-2.78753 53.3793 -2.78753 71.8462 11.4576 83.9274Z" />
                  </svg>
                </div>
                <span className={styles.badgeText}>LET&apos;S BOND</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
