"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./profile-card-testimonial-carousel.module.css";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

import { TeamMember, TEAM_MEMBERS } from "@/data/team";
export { type TeamMember, TEAM_MEMBERS } from "@/data/team";

export interface ProfileCardCarouselProps {
  className?: string;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

export function ProfileCardCarousel({
  className,
  currentIndex: controlledIndex,
  onIndexChange,
}: ProfileCardCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);

  const isControlled = typeof controlledIndex === "number";
  const currentIndex = isControlled ? controlledIndex : internalIndex;

  const handleIndexChange = (newIndex: number) => {
    if (!isControlled) {
      setInternalIndex(newIndex);
    }
    onIndexChange?.(newIndex);
  };

  const handleNext = () => {
    handleIndexChange((currentIndex + 1) % TEAM_MEMBERS.length);
  };

  const handlePrevious = () => {
    handleIndexChange(
      (currentIndex - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length
    );
  };

  const currentMember = TEAM_MEMBERS[currentIndex] || TEAM_MEMBERS[0];

  const socialLinks = [
    {
      icon: GithubIcon,
      url: currentMember.githubUrl,
      label: `${currentMember.name}'s GitHub Profile`,
    },
    {
      icon: LinkedinIcon,
      url: currentMember.linkedinUrl,
      label: `${currentMember.name}'s LinkedIn Profile`,
    },
  ];

  return (
    <div className={cn(styles.wrapper, className)}>
      {/* Desktop Layout */}
      <div className={styles.desktopLayout}>
        {/* Avatar Frame */}
        <div className={styles.avatarFrame}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMember.imageUrl}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={styles.imageWrapper}
            >
              <Image
                src={currentMember.imageUrl}
                alt={currentMember.name}
                width={470}
                height={470}
                className={styles.memberImage}
                priority
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Info Card */}
        <div className={styles.infoCard}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMember.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.headerBlock}>
                <h3 className={styles.memberName}>{currentMember.name}</h3>
                <p className={styles.memberRole}>{currentMember.role}</p>
              </div>

              <p className={styles.memberBio}>{currentMember.description}</p>

              <div className={styles.socialList}>
                {socialLinks.map(({ icon: IconComponent, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label={label}
                  >
                    <IconComponent className={styles.socialIcon} />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileAvatarFrame}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMember.imageUrl}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={styles.imageWrapper}
            >
              <Image
                src={currentMember.imageUrl}
                alt={currentMember.name}
                width={400}
                height={400}
                className={styles.memberImage}
                priority
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.mobileCard}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMember.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.headerBlock}>
                <h3 className={styles.memberName}>{currentMember.name}</h3>
                <p className={styles.memberRole}>{currentMember.role}</p>
              </div>

              <p className={styles.memberBio}>{currentMember.description}</p>

              <div className={styles.mobileSocialList}>
                {socialLinks.map(({ icon: IconComponent, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label={label}
                  >
                    <IconComponent className={styles.socialIcon} />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Synchronized Carousel Navigation Controls */}
      <div className={styles.carouselControls}>
        <button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous team member"
          className={styles.navArrowBtn}
        >
          <ChevronLeft size={22} />
        </button>

        <div className={styles.dotsGroup}>
          {TEAM_MEMBERS.map((member, idx) => (
            <button
              key={member.name}
              type="button"
              onClick={() => handleIndexChange(idx)}
              className={cn(
                styles.dotBtn,
                idx === currentIndex ? styles.dotActive : styles.dotInactive
              )}
              aria-label={`View ${member.name}'s profile (${idx + 1} of ${TEAM_MEMBERS.length})`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next team member"
          className={styles.navArrowBtn}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}

// Export default and named for flexibility
export default ProfileCardCarousel;
export { ProfileCardCarousel as TestimonialCarousel };
