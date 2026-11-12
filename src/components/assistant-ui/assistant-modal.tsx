"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  AssistantRuntimeProvider,
  WebSpeechDictationAdapter,
  AuiConfig,
  Suggestions,
} from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "./thread";
import { LooponicsChatLauncher } from "../LooponicsChatLauncher";
import { X } from "lucide-react";
import styles from "./assistant-modal.module.css";

export default function AssistantModal() {
  const [isOpen, setIsOpen] = useState(false);

  const runtime = useChatRuntime({
    adapters: {
      dictation: typeof window !== "undefined" ? new WebSpeechDictationAdapter() : undefined,
    },
  });

  const auiConfig = useMemo(
    () =>
      AuiConfig({
        suggestions: Suggestions([
          {
            title: "Web Development",
            label: "Explore web & Next.js engineering",
            prompt: "What web development and Next.js solutions does Looponics provide?",
          },
          {
            title: "Custom AI SaaS",
            label: "Learn about AI SaaS capabilities",
            prompt: "How does Looponics architect and build intelligent AI SaaS platforms?",
          },
          {
            title: "Agentic AI Systems",
            label: "Inquire about autonomous workflows",
            prompt: "Can Looponics build custom AI agents, MCP workflows, and business automations?",
          },
          {
            title: "Mobile App Development",
            label: "Ask about cross-platform apps",
            prompt: "What mobile app development services does Looponics offer?",
          },
        ]),
      }),
    []
  );

  return (
    <>
      {isOpen && (
        <div
          className={styles.modalWindow}
          role="dialog"
          aria-modal="true"
          aria-label="Looponics AI Assistant"
        >
          <div className={styles.modalHeader}>
            <div className={styles.modalBrand}>
              <div className={styles.logoWrap}>
                <Image
                  src="/images/looponics-logo.png"
                  alt="Looponics Logo"
                  width={22}
                  height={22}
                  className={styles.brandLogo}
                />
              </div>
              <div className={styles.brandMeta}>
                <span className={styles.modalTitle}>Looponics Assistant</span>
                <span className={styles.onlineBadge}>
                  <span className={styles.brandDot} />
                  Active
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          </div>

          <div className={styles.threadContainer}>
            <AssistantRuntimeProvider runtime={runtime} config={auiConfig}>
              <Thread />
            </AssistantRuntimeProvider>
          </div>
        </div>
      )}

      {/* Floating 3D Looponics Chat Launcher */}
      <LooponicsChatLauncher
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        variant="on-dark"
        size={80}
        label={isOpen ? "Close Looponics Assistant" : "Open Looponics Assistant"}
      />
    </>
  );
}
