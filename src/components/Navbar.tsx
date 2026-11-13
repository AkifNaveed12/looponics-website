"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { useDictionary } from "@/i18n/DictionaryContext";
import type { Locale } from "@/i18n/config";

export default function Navbar({ currentLocale = "en" }: { currentLocale?: Locale }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dict = useDictionary();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""} ${
          isMobileMenuOpen ? styles.menuOpenNav : ""
        }`}
      >
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <div className={styles.logoGroup}>
              <Link href={`/${currentLocale}`} className={styles.logoText}>
                Looponics
              </Link>
              <p
                className={`${styles.tagline} ${
                  isScrolled ? styles.taglineHidden : ""
                }`}
              >
                {dict.nav.tagline}
                <br />
                {dict.nav.taglineLine2}
              </p>
            </div>
          </div>

          <nav className={styles.navLinks}>
            <Link href="#services">{dict.nav.services}</Link>
            <Link href="#process">{dict.nav.process}</Link>
            <Link href="#team">{dict.nav.team}</Link>
            <Link href="#faq">{dict.nav.faqs}</Link>
          </nav>

          <div className={styles.actions}>
            <LanguageSwitcher currentLocale={currentLocale} />
            <div className={styles.desktopContact}>
              <Link href="#contact" className={styles.contactBtn}>
                {dict.nav.contactUs}
              </Link>
            </div>
            <button
              className={`${styles.mobileMenuBtn} ${
                isMobileMenuOpen ? styles.menuOpen : ""
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuContent}>
          <nav className={styles.mobileNavLinks}>
            <Link
              href={`/${currentLocale}`}
              className={styles.mobileNavLinkGray}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict.nav.home}
            </Link>
            <Link href="#services" onClick={() => setIsMobileMenuOpen(false)}>
              {dict.nav.services.toUpperCase()}
            </Link>
            <Link href="#process" onClick={() => setIsMobileMenuOpen(false)}>
              {dict.nav.process.toUpperCase()}
            </Link>
            <Link href="#team" onClick={() => setIsMobileMenuOpen(false)}>
              {dict.nav.team.toUpperCase()}
            </Link>
            <Link href="#faq" onClick={() => setIsMobileMenuOpen(false)}>
              {dict.nav.faqs.toUpperCase()}
            </Link>
            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              {dict.nav.contactUs.toUpperCase()}
            </Link>
          </nav>

          <div className={styles.mobileSocials}>
            <div className={styles.socialsLabel}>{dict.nav.followUs}</div>
            <div className={styles.socialsList}>
              <a
                href="https://www.instagram.com/looponics"
                target="_blank"
                rel="noopener noreferrer"
              >
                INSTAGRAM
              </a>
              <a
                href="https://www.linkedin.com/in/looponics-agency"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINKEDIN
              </a>
              <a
                href="https://x.com/looponics"
                target="_blank"
                rel="noopener noreferrer"
              >
                X (TWITTER)
              </a>
              <a
                href="https://discord.com/looponics"
                target="_blank"
                rel="noopener noreferrer"
              >
                DISCORD
              </a>
              <a
                href="https://facebook.com/looponics"
                target="_blank"
                rel="noopener noreferrer"
              >
                FACEBOOK
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
