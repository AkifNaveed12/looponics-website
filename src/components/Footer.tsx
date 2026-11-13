"use client";

import Link from "next/link";
import { motion } from "motion/react";
import styles from "./Footer.module.css";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function Footer() {
  const dict = useDictionary();
  const words = dict.footer.words || ["HAVE AN", "IDEA?", "LET'S", "BUILD IT →"];

  const bottomLinks = [
    { label: dict.footer.services, href: "#services", isExternal: false },
    { label: dict.footer.capabilities, href: "#capabilities", isExternal: false },
    { label: dict.footer.process, href: "#process", isExternal: false },
    { label: dict.footer.team, href: "#team", isExternal: false },
    { label: dict.footer.faqs, href: "#faq", isExternal: false },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/looponics-agency", isExternal: true },
    { label: "X (TWITTER)", href: "https://x.com/looponics", isExternal: true },
    { label: "INSTAGRAM", href: "https://www.instagram.com/looponics", isExternal: true },
    { label: "DISCORD", href: "https://discord.com/looponics", isExternal: true },
    { label: "FACEBOOK", href: "https://facebook.com/looponics", isExternal: true },
  ];

  const handleBookCall = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "#contact";
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Main 2-Column Section */}
        <div className={styles.mainGrid}>
          
          {/* Left Column: Big CTA */}
          <div className={styles.leftCol}>
            <nav className={styles.primaryNav}>
              <motion.a
                href="#contact"
                onClick={handleBookCall}
                className={styles.bigCtaLink}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
              >
                {words.map((word, index) => (
                  <span key={`${word}-${index}`} className={styles.wordWrapper}>
                    <motion.span
                      className={styles.animatedWord}
                      variants={{
                        initial: { y: "110%", opacity: 0 },
                        animate: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.7,
                            ease: [0.16, 1, 0.3, 1],
                            delay: index * 0.1,
                          },
                        },
                        hover: {
                          x: 10,
                          opacity: 1,
                          transition: {
                            duration: 0.3,
                            ease: "easeOut",
                            delay: index * 0.04,
                          },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.a>
            </nav>

            {/* Contact Us Section with official business email */}
            <div className={styles.contactSection}>
              <span className={styles.contactLabel}>{dict.footer.contactUs}</span>
              <a
                href="mailto:hello@looponics.tech"
                className={styles.contactEmail}
                aria-label="Email Looponics at hello@looponics.tech"
              >
                hello@looponics.tech
              </a>
              <a
                href="mailto:support@looponics.tech"
                className={styles.contactEmail}
                style={{ opacity: 0.85, fontSize: "0.95rem" }}
                aria-label="Email Looponics Support at support@looponics.tech"
              >
                support@looponics.tech
              </a>
            </div>
          </div>

          {/* Right Column: Looponics Title aligned right of CTA */}
          <div className={styles.rightCol}>
            <div className={styles.brandBanner}>
              <motion.h2
                className={styles.brandTitle}
                initial={{ opacity: 0, y: 35, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              >
                Looponics
              </motion.h2>
            </div>
          </div>

        </div>

        {/* Bottom Navigation Row */}
        <motion.div
          className={styles.bottomRow}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {bottomLinks.map((link, idx) => (
            <motion.div
              key={`${link.label}-${idx}`}
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {link.isExternal ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ) : (
                <Link href={link.href}>{link.label}</Link>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </footer>
  );
}
