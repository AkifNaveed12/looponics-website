"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { PointerEvent } from "react";
import styles from "./LooponicsChatLauncher.module.css";

type LogoVariant = "on-dark" | "on-orange";

export interface LooponicsChatLauncherProps {
  /** Whether the chat panel is currently open. Reflected in aria-expanded. */
  isOpen: boolean;
  /** Called after the logo's click-spin reaches its midpoint. */
  onClick: () => void;
  /** Dark site: white outer stroke + orange inner stroke. */
  variant?: LogoVariant;
  /** Button width/height in pixels. Defaults to the supplied artifact's 88px. */
  size?: number;
  /** Optional accessible label override. */
  label?: string;
  /** Optional class for positioning overrides. Prefer the module styles by default. */
  className?: string;
}

const DEPTH = 14;
const STEP = 1.2;
const VIEW_BOX = "190 230 644 580";
const OUTER_PATH = "M322 318A251 251 0 1 0 672 290";
const INNER_PATH = "M489 356A128 128 0 1 0 640 455";

function rgb(values: readonly number[], multiplier: number): string {
  return `rgb(${values.map((value) => Math.round(value * multiplier)).join(",")})`;
}

/**
 * Looponics' extracted 3D chatbot mark.
 *
 * The geometry and motion are adapted from the owner-supplied `3d-chatbotlogo`
 * HTML artifact. SVG layers are rendered declaratively in React; no runtime
 * innerHTML injection or external icon dependency is used.
 */
export function LooponicsChatLauncher({
  isOpen,
  onClick,
  variant = "on-dark",
  size = 88,
  label,
  className,
}: LooponicsChatLauncherProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const tiltRef = useRef<HTMLSpanElement>(null);
  const midpointTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const instanceId = useId().replace(/:/g, "");
  const orangeGradientId = `${instanceId}-lp-orange`;
  const inkGradientId = `${instanceId}-lp-ink`;
  const whiteGradientId = `${instanceId}-lp-white`;
  const shineGradientId = `${instanceId}-lp-shine`;

  const isDarkVariant = variant === "on-dark";
  const innerFront = isDarkVariant
    ? `url(#${orangeGradientId})`
    : `url(#${inkGradientId})`;
  const innerSide = isDarkVariant ? [140, 40, 0] : [28, 28, 28];

  useEffect(() => {
    return () => {
      if (midpointTimerRef.current) clearTimeout(midpointTimerRef.current);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
  }, []);

  function handleClick() {
    if (isSpinning) return;

    setIsSpinning(true);
    midpointTimerRef.current = setTimeout(() => {
      onClick();
    }, 430);
    finishTimerRef.current = setTimeout(() => {
      setIsSpinning(false);
    }, 800);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    // Apply the original pointer tilt only for devices with a real hover pointer.
    if (event.pointerType === "touch" || !tiltRef.current) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltRef.current.style.transform = `rotateY(${x * 40}deg) rotateX(${-y * 40}deg)`;
  }

  function handlePointerLeave() {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  }

  const depthLayers = Array.from({ length: DEPTH }, (_, index) => {
    const layerIndex = DEPTH - index;
    const t = 1 - layerIndex / (DEPTH + 2);
    return {
      key: layerIndex,
      outer: rgb([205, 205, 205], 0.62 + 0.3 * t),
      inner: rgb(innerSide, 0.7 + 0.3 * t),
      z: -layerIndex * STEP,
    };
  });

  return (
    <button
      type="button"
      className={`${styles.launcher} ${className ?? ""} ${isSpinning ? styles.isSpinning : ""}`}
      style={{ width: size, height: size }}
      aria-label={label ?? (isOpen ? "Close Looponics chat" : "Open Looponics chat")}
      aria-expanded={isOpen}
      aria-controls="looponics-chat-panel"
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span className={styles.shadow} aria-hidden="true" />
      <span className={styles.float} aria-hidden="true">
        <span className={styles.tilt} ref={tiltRef}>
          <span className={styles.spin}>
            {depthLayers.map((layer) => (
              <svg
                key={layer.key}
                className={styles.layer}
                viewBox={VIEW_BOX}
                aria-hidden="true"
                style={{ transform: `scale(.8) translateZ(${layer.z}px)` }}
              >
                <g fill="none" strokeWidth="92" strokeLinecap="round">
                  <path d={OUTER_PATH} stroke={layer.outer} />
                  <path d={INNER_PATH} stroke={layer.inner} />
                </g>
              </svg>
            ))}

            <svg
              className={styles.layer}
              viewBox={VIEW_BOX}
              aria-hidden="true"
              style={{ transform: "scale(.8) translateZ(0)" }}
            >
              <defs>
                <linearGradient id={whiteGradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fff" />
                  <stop offset="1" stopColor="#e4e4e4" />
                </linearGradient>
                <linearGradient id={inkGradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#363636" />
                  <stop offset="1" stopColor="#0b0b0b" />
                </linearGradient>
                <linearGradient id={orangeGradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ff7a33" />
                  <stop offset="1" stopColor="#fc5101" />
                </linearGradient>
                <linearGradient id={shineGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity=".5" />
                  <stop offset=".5" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g fill="none" strokeWidth="92" strokeLinecap="round">
                <path d={OUTER_PATH} stroke={`url(#${whiteGradientId})`} />
                <path d={INNER_PATH} stroke={innerFront} />
              </g>
              <g
                fill="none"
                strokeWidth="92"
                strokeLinecap="round"
                opacity=".9"
              >
                <path d={OUTER_PATH} stroke={`url(#${shineGradientId})`} />
                <path d={INNER_PATH} stroke={`url(#${shineGradientId})`} />
              </g>
            </svg>
          </span>
        </span>
      </span>
    </button>
  );
}

export default LooponicsChatLauncher;
