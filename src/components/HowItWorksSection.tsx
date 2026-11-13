"use client";

import styles from "./HowItWorksSection.module.css";
import { motion } from "motion/react";
import { useDictionary } from "@/i18n/DictionaryContext";

const ROW_CLASSES = [styles.zrow1, styles.zrow2, styles.zrow3, styles.zrow4];

const ICONS = [
  (
    <svg key="i1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  ),
  (
    <svg key="i2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M4 14h16" />
      <path d="M10 14v6" />
    </svg>
  ),
  (
    <svg key="i3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
    </svg>
  ),
  (
    <svg key="i4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  ),
];

export default function HowItWorksSection() {
  const dict = useDictionary();
  const rawSteps = dict.howItWorks.steps || [];

  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.xwrap}>
        <motion.div 
          className={styles.xeyebrow}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          • {dict.howItWorks.eyebrow}
        </motion.div>
        
        <motion.h2 
          className={styles.xh2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {dict.howItWorks.headline} <em>{dict.howItWorks.headlineEm}</em>
        </motion.h2>

        <div className={styles.zig}>
          {rawSteps.map((step, idx) => (
            <motion.div 
              key={step.num || idx} 
              className={`${styles.zrow} ${ROW_CLASSES[idx % ROW_CLASSES.length]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
            >
              {idx > 0 && (
                <>
                  <i className={`${styles.zseg} ${styles.v1}`} />
                  <i className={`${styles.zseg} ${styles.h}`} />
                  <i className={`${styles.zseg} ${styles.v2}`} />
                </>
              )}
              
              <div className={`${styles.zcard} ${idx === rawSteps.length - 1 ? styles.acc : ""}`}>
                <div className={styles.ztabVertical}>
                  <span>{step.tab}</span>
                </div>
                <div className={styles.zbody}>
                  <div className={styles.zhd}>
                    <span className={styles.zico}>{ICONS[idx % ICONS.length]}</span>
                    <b>{step.num} · {step.title}</b>
                  </div>
                  <p>{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
