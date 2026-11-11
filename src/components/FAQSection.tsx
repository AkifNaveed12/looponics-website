"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import styles from "./FAQSection.module.css";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "What types of projects do you typically work on?",
    answer:
      "We work on web applications, mobile apps, AI-powered SaaS platforms, business automation systems, and agentic AI workflows. Projects range from early-stage products to improving existing systems at growing companies.",
  },
  {
    id: "faq-2",
    question: "Do you work with early-stage startups or established businesses?",
    answer:
      "Both. We've worked with early-stage founders building their first product and with established teams looking to add AI capabilities or modernize existing infrastructure. What matters is a clear problem and a willingness to build it right.",
  },
  {
    id: "faq-3",
    question: "How does the engagement typically start?",
    answer:
      "It starts with a conversation. We discuss your goals, the problem you're solving, your current setup, and your timeline. From there, we scope the work, define the architecture, and agree on how we'll work together before any code is written.",
  },
  {
    id: "faq-4",
    question: "Do you use AI in everything you build?",
    answer:
      "No — only where it genuinely adds value. We're not in the business of adding AI features because they sound impressive. If your problem is better solved with traditional software engineering, that's what we'll recommend.",
  },
  {
    id: "faq-5",
    question: "What happens after the project is delivered?",
    answer:
      "We don't disappear after launch. We offer ongoing support, maintenance, and iteration. Whether you need a quick bug fix or want to continue building new features, we're available.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  const toggleFaq = (id: string) => {
    setOpenId((prevId) => (prevId === id ? null : id));
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
          <span className={styles.eyebrow}>• FREQUENTLY ASKED QUESTIONS</span>
          <h2 className={styles.title}>
            Common questions. <em>Direct answers.</em>
          </h2>
          <p className={styles.subtitle}>
            Everything you need to know about working with Looponics.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <button
                  type="button"
                  className={styles.questionButton}
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <div className={`${styles.iconWrapper} ${isOpen ? styles.iconOpen : ""}`}>
                    <ChevronDown className={styles.chevronIcon} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
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

