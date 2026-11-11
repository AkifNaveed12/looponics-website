"use client";

import { motion } from "motion/react";
import styles from "./ProjectsSection.module.css";

const PROJECTS = [
  {
    id: "p1",
    name: "Commerce Platform",
    shortDesc:
      "A full-stack e-commerce platform with custom inventory management and automated order workflows.",
    category: "Web Development",
    tags: ["Next.js", "Node.js", "Stripe", "PostgreSQL"],
    bgColor: "#f4f4f5",
    accentColor: "#181818",
  },
  {
    id: "p2",
    name: "AI Ops Dashboard",
    shortDesc:
      "An internal operations dashboard with AI-powered analytics, anomaly detection, and workflow automation.",
    category: "AI-Powered SaaS",
    tags: ["React", "Python", "FastAPI", "LLMs"],
    bgColor: "#181818",
    accentColor: "#ffffff",
  },
  {
    id: "p3",
    name: "Mobile Booking App",
    shortDesc:
      "A cross-platform mobile application for service booking with real-time availability and payment processing.",
    category: "Mobile App Development",
    tags: ["React Native", "Node.js", "Stripe"],
    bgColor: "#f0f0f0",
    accentColor: "#181818",
  },
  {
    id: "p4",
    name: "Automation Suite",
    shortDesc:
      "A multi-integration automation pipeline connecting CRM, billing, and customer communications.",
    category: "Custom Automations",
    tags: ["n8n", "API Integrations", "Webhooks"],
    bgColor: "#0066FF",
    accentColor: "#ffffff",
  },
];

function AbstractShape({
  accentColor,
  bgColor,
}: {
  accentColor: string;
  bgColor: string;
}) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <circle
        cx="320"
        cy="110"
        r="90"
        fill="none"
        stroke={accentColor}
        strokeWidth="1"
        strokeOpacity="0.2"
      />
      <circle
        cx="320"
        cy="110"
        r="60"
        fill="none"
        stroke={accentColor}
        strokeWidth="1"
        strokeOpacity="0.15"
      />
      <circle cx="320" cy="110" r="30" fill={accentColor} fillOpacity="0.08" />
      <line
        x1="0"
        y1="0"
        x2="400"
        y2="220"
        stroke={accentColor}
        strokeWidth="1"
        strokeOpacity="0.07"
      />
      <line
        x1="400"
        y1="0"
        x2="0"
        y2="220"
        stroke={accentColor}
        strokeWidth="1"
        strokeOpacity="0.07"
      />
      <rect
        x="40"
        y="60"
        width="100"
        height="100"
        rx="4"
        fill="none"
        stroke={accentColor}
        strokeWidth="1"
        strokeOpacity="0.12"
      />
    </svg>
  );
}

export default function ProjectsSection() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          • SELECTED WORK
        </motion.p>
        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Selected Work. Built with Purpose.
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          A closer look at the digital experiences, products, and intelligent
          systems we&apos;re building.
        </motion.p>
        <motion.p
          className={styles.disclaimer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Project details are representative of the type of work we do. Specific
          client information is confidential.
        </motion.p>

        <div className={styles.grid}>
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div
                className={styles.visual}
                style={{ backgroundColor: project.bgColor }}
              >
                <span
                  className={styles.categoryPill}
                  style={{
                    color: project.accentColor,
                    borderColor: project.accentColor + "33",
                  }}
                >
                  {project.category}
                </span>
                <AbstractShape
                  accentColor={project.accentColor}
                  bgColor={project.bgColor}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectDesc}>{project.shortDesc}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className={styles.viewLink}>View Project →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
