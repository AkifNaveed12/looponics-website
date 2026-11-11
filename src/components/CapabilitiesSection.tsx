"use client";

import { motion } from "motion/react";
import styles from "./CapabilitiesSection.module.css";

const CAPABILITIES = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "CSS / Tailwind"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Python", "FastAPI", "REST & GraphQL"],
  },
  {
    category: "AI & Machine Learning",
    items: [
      "LLMs",
      "RAG Systems",
      "AI Agents",
      "Multi-Agent Systems",
      "Machine Learning",
    ],
  },
  {
    category: "Automation",
    items: [
      "n8n",
      "API Integrations",
      "Workflow Automation",
      "MCP",
      "Webhooks",
    ],
  },
  {
    category: "Infrastructure",
    items: ["Docker", "Cloud Deployment", "PostgreSQL", "MongoDB", "CI/CD"],
  },
];

export default function CapabilitiesSection() {
  return (
    <section className={styles.section} id="capabilities">
      <div className={styles.container}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          • PROVEN CAPABILITIES
        </motion.p>
        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Our Technical Stack.
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          The technologies and tools we work with across different project types.
        </motion.p>

        <div className={styles.list}>
          {CAPABILITIES.map((cap, idx) => (
            <motion.div
              key={cap.category}
              className={styles.row}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <span className={styles.catLabel}>{cap.category}</span>
              <div className={styles.items}>
                {cap.items.map((item, i) => (
                  <span key={item} className={styles.itemTag}>
                    {item}
                    {i < cap.items.length - 1 && (
                      <span className={styles.sep} aria-hidden="true">
                        ,
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
