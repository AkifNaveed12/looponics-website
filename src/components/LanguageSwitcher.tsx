"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { useDictionary } from "@/i18n/DictionaryContext";
import styles from "./LanguageSwitcher.module.css";

const LOCALE_COOKIE = "NEXT_LOCALE";

function setLocaleCookie(locale: Locale) {
  if (typeof document !== "undefined") {
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  }
}

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dict = useDictionary();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function switchLocale(newLocale: Locale) {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    setLocaleCookie(newLocale);

    // Replace current locale prefix in pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/") || `/${newLocale}`;
    setIsOpen(false);
    router.push(newPath);
  }

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={dict.languageSwitcher.ariaLabel}
      >
        <span className={styles.globe} aria-hidden="true">🌐</span>
        <span className={styles.currentLang}>{localeNames[currentLocale]}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} aria-hidden="true">▾</span>
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox" aria-label={dict.languageSwitcher.label}>
          {locales.map((locale) => (
            <li key={locale} role="option" aria-selected={locale === currentLocale}>
              <button
                type="button"
                className={`${styles.option} ${locale === currentLocale ? styles.active : ""}`}
                onClick={() => switchLocale(locale)}
                lang={locale}
              >
                {localeNames[locale]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
