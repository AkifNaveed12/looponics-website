"use client";

import { motion } from "motion/react";
import styles from "./WhyOlemaSection.module.css";

const differentiators = [
  {
    num: "01",
    title: "Business-First Thinking",
    description:
      "We start with your goals, not a technology checklist. Every decision is made in context of what moves your business forward.",
  },
  {
    num: "02",
    title: "Custom, Not Cookie-Cutter",
    description:
      "No templates, no one-size-fits-all solutions. Everything we build is designed around your specific requirements.",
  },
  {
    num: "03",
    title: "AI Where It Adds Value",
    description:
      "We integrate AI thoughtfully — where it genuinely improves your product, not because it's trendy.",
  },
  {
    num: "04",
    title: "Scalable Architecture",
    description:
      "Systems designed to grow with you. We build for where you're going, not just where you are today.",
  },
  {
    num: "05",
    title: "End-to-End Delivery",
    description:
      "From the first conversation through deployment and beyond. We own the entire process.",
  },
  {
    num: "06",
    title: "Reliable Integrations",
    description:
      "Whether it's third-party APIs, legacy systems, or new automations — we make the connections that keep your business running.",
  },
];

export default function WhyOlemaSection() {
  return (
    <section className={styles.section} id="why-olema">
      <div className={styles.container}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          • WHY OLEMA
        </motion.p>
        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Not Just Development. Thoughtful Engineering.
        </motion.h2>

        <div className={styles.grid}>
          {differentiators.map((item, idx) => (
            <motion.div
              key={item.num}
              className={styles.item}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <span className={styles.num} aria-hidden="true">
                {item.num}
              </span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
