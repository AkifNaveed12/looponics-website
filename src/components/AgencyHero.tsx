"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import styles from "./AgencyHero.module.css";
import { useDictionary } from "@/i18n/DictionaryContext";

const SHIFT_INTERVAL_MS = 3200;

export default function AgencyHero() {
  const dict = useDictionary();
  const dynamicWords = dict.hero.words && dict.hero.words.length > 0
    ? dict.hero.words
    : ["DIGITAL", "CREATIVE", "ALL-IN-ONE", "TECHNOLOGY"];

  const [wordIndex, setWordIndex] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Smooth custom trailing cursor inside hero
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 26, stiffness: 240, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, SHIFT_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [dynamicWords.length]);

  const currentWord = dynamicWords[wordIndex] || dynamicWords[0];

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringHero(true)}
      onMouseLeave={() => setIsHoveringHero(false)}
    >
      {/* ── Custom Lavender Trailing Pointer (Scoped strictly to hero) ── */}
      <motion.div
        className={styles.customPointer}
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isHoveringHero ? 1 : 0,
        }}
        aria-hidden="true"
      />

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
              {dict.hero.your}
            </motion.span>
          </div>

          {/* Line 2: Dynamic Centered Line with letter-stagger shift */}
          <div className={styles.dynamicLineWrap}>
            <div className={styles.dynamicLineBox}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWord}
                  className={styles.wordContainer}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {Array.from(currentWord).map((char, index) => (
                    <motion.span
                      key={`${currentWord}-${index}`}
                      className={styles.charSpan}
                      variants={{
                        initial: { opacity: 0, y: 55 },
                        animate: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.45,
                            ease: [0.16, 1, 0.3, 1],
                            delay: index * 0.035,
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -55,
                          transition: {
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                            delay: index * 0.02,
                          },
                        },
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
              {dict.hero.agency}
            </motion.span>

            {/* Two Animated Shapes Placed Side-by-Side */}
            <div className={styles.shapesSideBySide}>
              {/* Shape 1: 16-point Faceted Cross Starburst (Continuous Slow Spin) */}
              <motion.div
                className={styles.starburstContainer}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
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
                aria-label={`${dict.hero.letsBond} - Contact Looponics`}
                whileHover="hovered"
                initial="idle"
              >
                <motion.div
                  className={styles.badgeSvgWrapper}
                  variants={{
                    idle: { rotate: 0, scale: 1 },
                    hovered: { rotate: 45, scale: 1.08 },
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 125 125"
                    fill="currentColor"
                    className={styles.badgeSvg}
                    aria-hidden="true"
                  >
                    <path d="M11.4576 83.9274C9.91978 102.544 22.9721 115.601 41.583 114.063C53.6527 128.312 72.1136 128.312 84.1908 114.063C102.802 115.601 115.854 102.544 114.316 83.9274C128.561 71.8537 128.561 53.3868 114.316 41.3056C115.854 22.6886 102.802 9.63195 84.1908 11.1702C72.1211 -3.07953 53.6602 -3.07953 41.583 11.1702C22.9721 9.63195 9.91978 22.6886 11.4576 41.3056C-2.78753 53.3793 -2.78753 71.8462 11.4576 83.9274Z" />
                  </svg>
                </motion.div>
                <span className={styles.badgeText}>{dict.hero.letsBond}</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
