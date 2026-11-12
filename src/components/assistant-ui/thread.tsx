"use client";

import React from "react";
import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  AuiIf,
} from "@assistant-ui/react";
import type { EmptyMessagePartProps, TextMessagePartProps } from "@assistant-ui/react";
import { Mic, MicOff, ArrowUp, Sparkles } from "lucide-react";
import ShimmerText from "../transitions/ShimmerText";
import StreamingText from "../transitions/StreamingText";
import styles from "./thread.module.css";

const CustomEmptyPart: React.FC<EmptyMessagePartProps> = ({ status }) => {
  if (status.type === "running") {
    return (
      <div className={styles.thinkingWrap}>
        <ShimmerText duration="2000ms" baseColor="#888888" highlightColor="#fc5101">
          Thinking...
        </ShimmerText>
      </div>
    );
  }
  return null;
};

const CustomTextPart: React.FC<TextMessagePartProps> = ({ text, status }) => {
  if (status.type === "running") {
    return <StreamingText text={text} className={styles.streamingText} />;
  }
  return <span className={styles.messageText}>{text}</span>;
};

export function Thread() {
  return (
    <ThreadPrimitive.Root className={styles.threadRoot}>
      <ThreadPrimitive.Viewport className={styles.viewport}>
        <ThreadPrimitive.Empty>
          <div className={styles.emptyState}>
            <div className={styles.emptyHeader}>
              <div className={styles.sparkleWrap}>
                <Sparkles size={20} className={styles.sparkleIcon} />
              </div>
              <h3 className={styles.emptyTitle}>Looponics AI Assistant</h3>
            </div>
            <p className={styles.emptySubtitle}>
              Ask about our web development, AI SaaS, agentic workflows, or dictate your message.
            </p>

            <div className={styles.suggestionsContainer}>
              <span className={styles.suggestionsLabel}>Suggested prompts</span>
              <div className={styles.suggestionsList}>
                <ThreadPrimitive.Suggestions>
                  {({ suggestion }) => (
                    <ThreadPrimitive.Suggestion
                      className={styles.suggestionBtn}
                      prompt={suggestion.prompt}
                      autoSend
                    >
                      <span className={styles.suggestionTitle}>{suggestion.title}</span>
                      <span className={styles.suggestionPrompt}>
                        {suggestion.label || suggestion.prompt}
                      </span>
                    </ThreadPrimitive.Suggestion>
                  )}
                </ThreadPrimitive.Suggestions>
              </div>
            </div>
          </div>
        </ThreadPrimitive.Empty>

        <ThreadPrimitive.Messages
          components={{
            UserMessage: () => (
              <MessagePrimitive.Root className={styles.messageUser}>
                <MessagePrimitive.Content />
              </MessagePrimitive.Root>
            ),
            AssistantMessage: () => (
              <MessagePrimitive.Root className={styles.messageAssistant}>
                <MessagePrimitive.Content
                  components={{
                    Empty: CustomEmptyPart,
                    Text: CustomTextPart,
                  }}
                />
                <MessagePrimitive.Error>
                  <div className={styles.errorMessage}>
                    Unable to process request. Please try again or reach out to support@looponics.tech.
                  </div>
                </MessagePrimitive.Error>
              </MessagePrimitive.Root>
            ),
          }}
        />
      </ThreadPrimitive.Viewport>

      {/* Composer */}
      <ComposerPrimitive.Root className={styles.composerRoot}>
        <div className={styles.inputWrap}>
          <ComposerPrimitive.Input
            className={styles.composerInput}
            placeholder="Type a message or ask a question..."
            rows={1}
            autoFocus
          />

          <div className={styles.actionsWrap}>
            {/* Voice Dictation Control (Phase 5 UI placeholder) */}
            <AuiIf condition={(s) => s.composer.dictation == null}>
              <ComposerPrimitive.Dictate
                className={`${styles.controlBtn} ${styles.dictateBtn}`}
                title="Voice dictation (speech-to-text)"
                aria-label="Start voice dictation"
              >
                <Mic size={17} />
              </ComposerPrimitive.Dictate>
            </AuiIf>

            <AuiIf condition={(s) => s.composer.dictation != null}>
              <ComposerPrimitive.StopDictation
                className={`${styles.controlBtn} ${styles.stopDictateBtn}`}
                title="Stop voice dictation"
                aria-label="Stop voice dictation"
              >
                <MicOff size={17} />
              </ComposerPrimitive.StopDictation>
            </AuiIf>

            <ComposerPrimitive.Send
              className={`${styles.controlBtn} ${styles.sendBtn}`}
              title="Send message"
              aria-label="Send message"
            >
              <ArrowUp size={17} strokeWidth={2.4} />
            </ComposerPrimitive.Send>
          </div>
        </div>
      </ComposerPrimitive.Root>
    </ThreadPrimitive.Root>
  );
}
