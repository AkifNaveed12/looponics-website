"use client";

import React from "react";
import styles from "./ShimmerText.module.css";

export interface ShimmerTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  duration?: string;
  baseColor?: string;
  highlightColor?: string;
  band?: string;
}

/**
 * ShimmerText — transitions.dev component 15
 * Pure CSS two-layer shimmer text transition for streaming, thinking, and loading states.
 */
export default function ShimmerText({
  children,
  className,
  style,
  duration = "2000ms",
  baseColor,
  highlightColor,
  band = "400%",
  ...props
}: ShimmerTextProps) {
  const customStyles: React.CSSProperties = {
    ...style,
    ...(duration && ({ "--shimmer-dur": duration } as React.CSSProperties)),
    ...(baseColor && ({ "--shimmer-base": baseColor } as React.CSSProperties)),
    ...(highlightColor && ({ "--shimmer-highlight": highlightColor } as React.CSSProperties)),
    ...(band && ({ "--shimmer-band": band } as React.CSSProperties)),
  };

  return (
    <span
      className={`${styles.shimmer} ${className || ""}`}
      data-text={children}
      style={customStyles}
      {...props}
    >
      {children}
    </span>
  );
}
