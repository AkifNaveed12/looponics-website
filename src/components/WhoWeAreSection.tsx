"use client";

import { motion } from "motion/react";
import styles from "./WhoWeAreSection.module.css";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function WhoWeAreSection() {
  const dict = useDictionary();
  const stats = dict.whoWeAre.stats || [
    { label: "5 Service Areas", sub: "From web to agentic AI" },
    { label: "End-to-End", sub: "Discovery through deployment" },
    { label: "Custom Built", sub: "No templates. No shortcuts." },
  ];

  return (
    <section className={styles.section} id="who-we-are">
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.left}>
            <motion.p
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              • {dict.whoWeAre.eyebrow}
            </motion.p>
            <motion.h2
              className={styles.headline}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {dict.whoWeAre.headline}
            </motion.h2>
          </div>
          <motion.div
            className={styles.right}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={styles.body}>{dict.whoWeAre.body}</p>
          </motion.div>
        </div>

        <div className={styles.statsRow}>
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
            >
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statSub}>{stat.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
