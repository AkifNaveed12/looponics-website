"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <Link href="/" className={styles.logoText}>
                Looponics
              </Link>
              <p
                className={`${styles.tagline} ${
                  isScrolled ? styles.taglineHidden : ""
                }`}
              >
                New generation, same
                <br />
                Engineering DNA
              </p>
            </div>
          </div>

          <nav className={styles.navLinks}>
            <Link href="#services">Services</Link>
            <Link href="#process">Process</Link>
            <Link href="#team">Team</Link>
            <Link href="#faq">FAQs</Link>
          </nav>

          <div className={styles.actions}>
            <div className={styles.desktopContact}>
              <Link href="#contact" className={styles.contactBtn}>
                Contact Us
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
              href="/"
              className={styles.mobileNavLinkGray}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link href="#services" onClick={() => setIsMobileMenuOpen(false)}>
              SERVICES
            </Link>
            <Link href="#process" onClick={() => setIsMobileMenuOpen(false)}>
              PROCESS
            </Link>
            <Link href="#team" onClick={() => setIsMobileMenuOpen(false)}>
              TEAM
            </Link>
            <Link href="#faq" onClick={() => setIsMobileMenuOpen(false)}>
              FAQS
            </Link>
            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              CONTACT
            </Link>
          </nav>

          <div className={styles.mobileSocials}>
            <div className={styles.socialsLabel}>FOLLOW US</div>
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
