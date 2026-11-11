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

/* ─── Data ─── */
const SERVICES = [
  {
    id: "01",
    title: "Web Development",
    description:
      "We engineer fast, scalable, and responsive digital experiences tailored to your business requirements.",
    tags: ["Custom Websites", "Full-Stack Development", "Scalable Architecture"],
    visual: "web" as const,
  },
  {
    id: "02",
    title: "Mobile App Development",
    description:
      "We build intuitive mobile applications that connect users with powerful, reliable digital experiences.",
    tags: ["Cross-Platform Apps", "Mobile UI", "API Integration"],
    visual: "mobile" as const,
  },
  {
    id: "03",
    title: "AI-Powered SaaS",
    description:
      "We turn ideas into intelligent software products using AI-powered capabilities, modern architectures, and scalable infrastructure.",
    tags: ["AI Integration", "SaaS Platforms", "Intelligent Applications"],
    visual: "saas" as const,
  },
  {
    id: "04",
    title: "Custom Automations",
    description:
      "We eliminate repetitive processes through tailored automations, integrations, and intelligent business workflows.",
    tags: ["Workflow Automation", "API Integrations", "Business Processes"],
    visual: "automation" as const,
  },
  {
    id: "05",
    title: "Agentic AI Systems",
    description:
      "We design autonomous and multi-agent systems that reason, coordinate tools, and execute complex workflows according to business needs.",
    tags: ["AI Agents", "Multi-Agent Systems", "MCP Integrations"],
    visual: "agents" as const,
  },
] as const;

/* ─── Orbital arc positions (SVG viewBox 0 0 100 400) ─── */
// 5 points along an inward-curving arc bowing toward the content
const ARC_POINTS: [number, number][] = [
  [26, 42],
  [54, 115],
  [65, 200],
  [54, 285],
  [26, 358],
];

/* ─── OrbitalNav ─── */
function OrbitalNav({ activeIndex }: { activeIndex: number }) {
  return (
    <div className={styles.orbitalNav} aria-hidden="true">
      <svg
        viewBox="0 0 100 400"
        className={styles.arcSvg}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Decorative curved arc — inward bowing parenthesis towards content */}
        <path
          d="M 12 15 C 82 105, 82 295, 12 385"
          stroke="#e4e4e7"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <div className={styles.arcLabels}>
        {SERVICES.map((s, i) => {
          const [lx, ly] = ARC_POINTS[i];
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Mobile: tap-based navigation
  const [mobileIndex, setMobileIndex] = useState(0);

  /* Scroll-driven active index (desktop) */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map 0→1 to 0→4 segment index
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, SERVICES.length - 1]);

  useMotionValueEvent(rawIndex, "change", (v) => {
    const next = Math.round(v);
    if (next !== activeIndex) {
      setActiveIndex(next);
    }
  });

  const service = SERVICES[activeIndex];
  const mobileService = SERVICES[mobileIndex];

  return (
    <section id="services" className={styles.section}>
      {/* ── Desktop sticky scroll container ── */}
      <div ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.stickyPanel}>
          <div className={styles.inner}>
            {/* Left: Orbital nav */}
            <div className={styles.orbitalCol}>
              <OrbitalNav activeIndex={activeIndex} />
            </div>

            {/* Center: Service content */}
            <div className={styles.contentCol}>
              <p className={styles.eyebrow}>• OUR SERVICES</p>

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
        <p className={styles.eyebrow}>• OUR SERVICES</p>

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
          {SERVICES.map((s, i) => (
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
