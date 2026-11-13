"use client";

import { motion } from "motion/react";
import styles from "./CapabilitiesSection.module.css";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function CapabilitiesSection() {
  const dict = useDictionary();
  const capabilities = dict.capabilities.categories || [];

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
          • {dict.capabilities.eyebrow}
        </motion.p>
        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {dict.capabilities.headline}
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {dict.capabilities.subtitle}
        </motion.p>

        <div className={styles.list}>
          {capabilities.map((cap, idx) => (
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
