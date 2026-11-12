"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import styles from "./StreamingText.module.css";

export interface StreamingTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  wordGap?: number;
  wordFade?: string;
  blur?: string;
  onComplete?: () => void;
}

/**
 * StreamingText — transitions.dev component 30
 * Word-by-word streaming condensation with blur-to-focus resolution.
 * Robust against dynamic token streaming so text is always visible and smoothly animated.
 */
export default function StreamingText({
  text,
  className,
  style,
  wordGap = 40,
  wordFade = "280ms",
  blur = "1px",
  onComplete,
  ...props
}: StreamingTextProps) {
  const words = useMemo(() => {
    const trimmed = text.trim();
    return trimmed ? trimmed.split(/\s+/) : [];
  }, [text]);

  const [revealedCount, setRevealedCount] = useState<number>(() => words.length);
  const prevCountRef = useRef(words.length);

  useEffect(() => {
    if (words.length > prevCountRef.current) {
      prevCountRef.current = words.length;
      setRevealedCount(words.length);
      onComplete?.();
    } else if (words.length < prevCountRef.current) {
      prevCountRef.current = words.length;
      setRevealedCount(words.length);
    }
  }, [words.length, onComplete]);

  const customStyles: React.CSSProperties = {
    ...style,
    ...(wordFade && ({ "--stream-fade": wordFade } as React.CSSProperties)),
    ...(blur && ({ "--stream-blur": blur } as React.CSSProperties)),
  };

  return (
    <div
      className={`${styles.streamBlock} ${className || ""}`}
      style={customStyles}
      {...props}
    >
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span
            className={`${styles.word} ${i < revealedCount ? styles.isIn : ""}`}
          >
            {w}
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </div>
  );
}
