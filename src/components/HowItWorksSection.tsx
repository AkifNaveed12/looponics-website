"use client";

import styles from "./HowItWorksSection.module.css";
import { motion } from "motion/react";

const steps = [
  {
    id: "step-1",
    tab: "STAGE 01",
    num: "1",
    title: "Discover",
    description: "Understand the business, requirements, users, and objectives. We ask the right questions before writing a single line of code.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
    ),
    rowClass: styles.zrow1,
    isAccent: false,
  },
  {
    id: "step-2",
    tab: "STAGE 02",
    num: "2",
    title: "Strategize",
    description: "Define the technical approach, architecture, project scope, and delivery roadmap.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M4 14h16" />
        <path d="M10 14v6" />
      </svg>
    ),
    rowClass: styles.zrow2,
    isAccent: false,
  },
  {
    id: "step-3",
    tab: "STAGE 03",
    num: "3",
    title: "Design & Build",
    description: "Engineer, integrate, test, and refine. Weekly deliverables with continuous feedback loops.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
      </svg>
    ),
    rowClass: styles.zrow3,
    isAccent: false,
  },
  {
    id: "step-4",
    tab: "STAGE 04",
    num: "4",
    title: "Deploy",
    description: "Launch, monitor, and support the delivered product. We don't disappear after go-live.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
    rowClass: styles.zrow4,
    isAccent: true,
  },
];

export default function HowItWorksSection() {
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
          • OUR PROCESS
        </motion.div>
        
        <motion.h2 
          className={styles.xh2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          From First Conversation <em>to Production.</em>
        </motion.h2>

        <div className={styles.zig}>
          {steps.map((step, idx) => (
            <motion.div 
              key={step.id} 
              className={`${styles.zrow} ${step.rowClass}`}
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
              
              <div className={`${styles.zcard} ${step.isAccent ? styles.acc : ""}`}>
                <div className={styles.ztabVertical}>
                  <span>{step.tab}</span>
                </div>
                <div className={styles.zbody}>
                  <div className={styles.zhd}>
                    <span className={styles.zico}>{step.icon}</span>
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
