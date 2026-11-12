"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import {
  ProfileCardCarousel,
  TEAM_MEMBERS,
} from "./ui/profile-card-testimonial-carousel";
import styles from "./TeamSection.module.css";

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isManualScrollingRef = useRef(false);
  const manualTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Desktop scroll-driven profile transition track */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map 0 -> 1 progress to 0 -> (total members - 1)
  const rawIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TEAM_MEMBERS.length - 1]
  );

  useMotionValueEvent(rawIndex, "change", (v) => {
    if (isManualScrollingRef.current) return;
    const next = Math.min(
      Math.max(0, Math.round(v)),
      TEAM_MEMBERS.length - 1
    );
    if (next !== activeIndex) {
      setActiveIndex(next);
    }
  });

  /* Synchronize manual carousel clicks (arrows & dots) with scroll position */
  const handleIndexChange = (newIndex: number) => {
    setActiveIndex(newIndex);

    if (typeof window === "undefined" || window.innerWidth <= 860) return;

    const el = containerRef.current;
    if (!el) return;

    isManualScrollingRef.current = true;
    if (manualTimerRef.current) clearTimeout(manualTimerRef.current);

    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const startY = rect.top + scrollTop;
    const scrollableDistance = el.scrollHeight - window.innerHeight;

    if (scrollableDistance > 0) {
      const targetScroll =
        startY + (newIndex / (TEAM_MEMBERS.length - 1)) * scrollableDistance;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }

    manualTimerRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 750);
  };

  return (
    <section id="team" className={styles.section}>
      <div ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.stickyPanel}>
          {/* Section Header */}
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.eyebrow}>THE PEOPLE BEHIND LOOPONICS</span>
            <h2 className={styles.title}>Meet the Team Behind the Work.</h2>
            <p className={styles.subtitle}>
              Three engineers. Different areas of expertise. One shared
              commitment to building meaningful digital experiences.
            </p>
          </motion.div>

          {/* 21st.dev Profile Card Carousel */}
          <div className={styles.carouselWrap}>
            <ProfileCardCarousel
              currentIndex={activeIndex}
              onIndexChange={handleIndexChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
