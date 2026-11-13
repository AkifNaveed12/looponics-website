"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import ServiceVisual from "./ServiceVisual";
import styles from "./ServicesSection.module.css";
import { useDictionary } from "@/i18n/DictionaryContext";

/* ─── Visual types mapped to indices ─── */
const VISUAL_TYPES = ["web", "mobile", "saas", "automation", "agents"] as const;

/* ─── Orbital arc positions (SVG viewBox 0 0 100 400) ─── */
const ARC_POINTS: [number, number][] = [
  [26, 42],
  [54, 115],
  [65, 200],
  [54, 285],
  [26, 358],
];

/* ─── OrbitalNav ─── */
function OrbitalNav({
  activeIndex,
  services,
}: {
  activeIndex: number;
  services: Array<{ id: string; title: string }>;
}) {
  return (
    <div className={styles.orbitalNav} aria-hidden="true">
      <svg
        viewBox="0 0 100 400"
        className={styles.arcSvg}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M 12 15 C 82 105, 82 295, 12 385"
          stroke="#e4e4e7"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <div className={styles.arcLabels}>
        {services.map((s, i) => {
          const [lx, ly] = ARC_POINTS[i] || [26, 42];
          const isActive = i === activeIndex;
          return (
            <div
              key={s.id}
              className={`${styles.arcLabel} ${isActive ? styles.arcLabelActive : ""}`}
              style={{
                left: `${lx}%`,
                top: `${(ly / 400) * 100}%`,
                transform: "translate(-20%, -50%)",
              }}
            >
              {isActive && <span className={styles.arcDot}>●</span>}
              <motion.span
                className={styles.arcNum}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  fontSize: isActive ? "1.1rem" : "0.85rem",
                  fontWeight: isActive ? 700 : 400,
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {s.id}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function ServicesSection() {
  const dict = useDictionary();
  const rawServices = dict.services.items || [];
  const services = rawServices.map((s, idx) => ({
    ...s,
    visual: VISUAL_TYPES[idx % VISUAL_TYPES.length],
  }));

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  /* Scroll-driven active index (desktop) */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, Math.max(1, services.length - 1)]);

  useMotionValueEvent(rawIndex, "change", (v) => {
    const next = Math.round(v);
    if (next !== activeIndex && next >= 0 && next < services.length) {
      setActiveIndex(next);
    }
  });

  const service = services[activeIndex] || services[0];
  const mobileService = services[mobileIndex] || services[0];

  if (!service) return null;

  return (
    <section id="services" className={styles.section}>
      {/* ── Desktop sticky scroll container ── */}
      <div ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.stickyPanel}>
          <div className={styles.inner}>
            {/* Left: Orbital nav */}
            <div className={styles.orbitalCol}>
              <OrbitalNav activeIndex={activeIndex} services={services} />
            </div>

            {/* Center: Service content */}
            <div className={styles.contentCol}>
              <p className={styles.eyebrow}>• {dict.services.eyebrow}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={service.id}
                  className={styles.serviceContent}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <h2 className={styles.serviceTitle}>{service.title}</h2>
                  <p className={styles.serviceDesc}>{service.description}</p>
                  <div className={styles.tagRow}>
                    {service.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Abstract visual */}
            <div className={styles.visualCol}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.id}
                  className={styles.visualWrap}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <ServiceVisual type={service.visual} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile layout (shown <1024px) ── */}
      <div className={styles.mobileSection}>
        <p className={styles.eyebrow}>• {dict.services.eyebrow}</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={mobileService.id}
            className={styles.mobileContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className={styles.mobileServiceNum}>
              <span className={styles.mobileDotIndicator}>●</span>
              <span>{mobileService.id}</span>
            </div>
            <h2 className={styles.serviceTitle}>{mobileService.title}</h2>
            <p className={styles.serviceDesc}>{mobileService.description}</p>
            <div className={styles.tagRow}>
              {mobileService.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={styles.mobileVisual}>
              <ServiceVisual type={mobileService.visual} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot nav */}
        <div className={styles.mobileDots}>
          {services.map((s, i) => (
            <button
              key={s.id}
              className={`${styles.mobileDot} ${i === mobileIndex ? styles.mobileDotActive : ""}`}
              onClick={() => setMobileIndex(i)}
              aria-label={`View ${s.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
