"use client";

import { motion } from "motion/react";
import styles from "./WhyOlemaSection.module.css";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function WhyOlemaSection() {
  const dict = useDictionary();
  const differentiators = dict.whyLooponics.items || [];

  return (
    <section className={styles.section} id="why-looponics">
      <div className={styles.container}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          • {dict.whyLooponics.eyebrow}
        </motion.p>
        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {dict.whyLooponics.headline}
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
