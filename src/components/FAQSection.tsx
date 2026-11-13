"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import styles from "./FAQSection.module.css";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function FAQSection() {
  const dict = useDictionary();
  const faqs = dict.faq.items || [];
  const [openId, setOpenId] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenId((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.eyebrow}>• {dict.faq.eyebrow}</span>
          <h2 className={styles.title}>
            {dict.faq.headline} <em>{dict.faq.headlineEm}</em>
          </h2>
          <p className={styles.subtitle}>
            {dict.faq.subtitle}
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openId === index;
            return (
              <motion.div
                key={faq.question || index}
                className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <button
                  type="button"
                  className={styles.questionButton}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <div className={`${styles.iconWrapper} ${isOpen ? styles.iconOpen : ""}`}>
                    <ChevronDown className={styles.chevronIcon} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      className={styles.answerWrapper}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className={styles.answerContent}>
                        <p className={styles.answerText}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
