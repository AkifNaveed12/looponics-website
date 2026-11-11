"use client";

import { motion, type Transition } from "motion/react";

type VisualType = "web" | "mobile" | "saas" | "automation" | "agents";

interface ServiceVisualProps {
  type: VisualType;
}

/* ─── Shared float animation ─── */
const floatTransition: Transition = {
  y: {
    duration: 4,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  },
};

/* ─── 1. Web: concentric offset rectangles / grid ─── */
function WebVisual() {
  return (
    <motion.svg
      viewBox="0 0 320 320"
      width="320"
      height="320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -10, 0] }}
      transition={floatTransition}
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false }}
    >
      {/* Background rect */}
      <rect x="40" y="40" width="240" height="240" rx="4" stroke="#e4e4e7" strokeWidth="1.5" />
      {/* Concentric inset rects */}
      <rect x="65" y="65" width="190" height="190" rx="3" stroke="#d1d1d6" strokeWidth="1.5" />
      <rect x="90" y="90" width="140" height="140" rx="3" stroke="#b0b0b8" strokeWidth="1.5" />
      <rect x="115" y="115" width="90" height="90" rx="2" stroke="#0066FF" strokeWidth="1.5" opacity="0.5" />
      <rect x="140" y="140" width="40" height="40" rx="1" fill="#0066FF" opacity="0.15" stroke="#0066FF" strokeWidth="1" />
      {/* Grid lines horizontal */}
      {[100, 130, 160, 190, 220].map((y) => (
        <line key={y} x1="40" y1={y} x2="280" y2={y} stroke="#e4e4e7" strokeWidth="0.75" strokeDasharray="4 6" />
      ))}
      {/* Grid lines vertical */}
      {[100, 130, 160, 190, 220].map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="280" stroke="#e4e4e7" strokeWidth="0.75" strokeDasharray="4 6" />
      ))}
      {/* Corner accent dots */}
      <circle cx="40" cy="40" r="4" fill="#0066FF" opacity="0.6" />
      <circle cx="280" cy="40" r="4" fill="#0066FF" opacity="0.6" />
      <circle cx="40" cy="280" r="4" fill="#0066FF" opacity="0.6" />
      <circle cx="280" cy="280" r="4" fill="#0066FF" opacity="0.6" />
      {/* Center dot */}
      <circle cx="160" cy="160" r="6" fill="#0066FF" opacity="0.8" />
    </motion.svg>
  );
}

/* ─── 2. Mobile: stylized phone with abstract content ─── */
function MobileVisual() {
  return (
    <motion.svg
      viewBox="0 0 320 320"
      width="320"
      height="320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -10, 0] }}
      transition={floatTransition}
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false }}
    >
      {/* Phone body */}
      <rect x="100" y="40" width="120" height="240" rx="20" stroke="#b0b0b8" strokeWidth="2" />
      {/* Screen area */}
      <rect x="110" y="70" width="100" height="175" rx="8" fill="#f8f8f8" stroke="#e4e4e7" strokeWidth="1" />
      {/* Notch */}
      <rect x="140" y="52" width="40" height="8" rx="4" fill="#d1d1d6" />
      {/* Home indicator */}
      <rect x="145" y="262" width="30" height="4" rx="2" fill="#d1d1d6" />
      {/* Abstract content lines on screen */}
      <rect x="120" y="82" width="50" height="6" rx="3" fill="#b0b0b8" />
      <rect x="120" y="94" width="30" height="4" rx="2" fill="#d1d1d6" />
      {/* Card block */}
      <rect x="118" y="108" width="84" height="55" rx="6" fill="#fff" stroke="#e4e4e7" strokeWidth="1" />
      <rect x="124" y="116" width="30" height="4" rx="2" fill="#0066FF" opacity="0.5" />
      <rect x="124" y="126" width="52" height="3" rx="1.5" fill="#d1d1d6" />
      <rect x="124" y="134" width="40" height="3" rx="1.5" fill="#d1d1d6" />
      <rect x="124" y="142" width="22" height="3" rx="1.5" fill="#d1d1d6" />
      {/* Row items */}
      {[172, 188, 204, 220].map((y, i) => (
        <rect key={y} x="118" y={y} width={i % 2 === 0 ? 70 : 50} height="4" rx="2" fill="#e4e4e7" />
      ))}
      {/* Blue accent bar */}
      <rect x="118" y="230" width="84" height="12" rx="4" fill="#0066FF" opacity="0.15" stroke="#0066FF" strokeWidth="0.75" />
      <rect x="122" y="233" width="40" height="6" rx="2" fill="#0066FF" opacity="0.5" />
    </motion.svg>
  );
}

/* ─── 3. SaaS: overlapping translucent circles / intelligence network ─── */
function SaasVisual() {
  return (
    <motion.svg
      viewBox="0 0 320 320"
      width="320"
      height="320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -10, 0] }}
      transition={floatTransition}
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false }}
    >
      <defs>
        <radialGradient id="saas-g1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0066FF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="saas-g2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b0b0b8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#b0b0b8" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Outer rings */}
      <circle cx="160" cy="160" r="120" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="6 8" />
      <circle cx="160" cy="160" r="90" stroke="#d1d1d6" strokeWidth="1" />
      {/* Overlapping filled circles */}
      <circle cx="130" cy="140" r="55" fill="url(#saas-g2)" stroke="#c0c0c8" strokeWidth="1" />
      <circle cx="190" cy="140" r="55" fill="url(#saas-g2)" stroke="#c0c0c8" strokeWidth="1" />
      <circle cx="160" cy="185" r="55" fill="url(#saas-g1)" stroke="#0066FF" strokeWidth="0.75" opacity="0.6" />
      {/* Node dots at intersections */}
      <circle cx="160" cy="105" r="6" fill="#b0b0b8" />
      <circle cx="122" cy="175" r="6" fill="#b0b0b8" />
      <circle cx="198" cy="175" r="6" fill="#b0b0b8" />
      <circle cx="160" cy="160" r="10" fill="#0066FF" opacity="0.7" />
      {/* Connecting spoke lines */}
      <line x1="160" y1="150" x2="160" y2="111" stroke="#0066FF" strokeWidth="1" opacity="0.4" />
      <line x1="152" y1="166" x2="128" y2="175" stroke="#0066FF" strokeWidth="1" opacity="0.4" />
      <line x1="168" y1="166" x2="192" y2="175" stroke="#0066FF" strokeWidth="1" opacity="0.4" />
      {/* Outer satellite nodes */}
      <circle cx="80" cy="90" r="4" fill="#d1d1d6" />
      <circle cx="240" cy="90" r="4" fill="#d1d1d6" />
      <circle cx="55" cy="190" r="4" fill="#d1d1d6" />
      <circle cx="265" cy="190" r="4" fill="#d1d1d6" />
      <circle cx="160" cy="265" r="4" fill="#d1d1d6" />
      <line x1="84" y1="92" x2="124" y2="136" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="236" y1="92" x2="196" y2="136" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="59" y1="188" x2="118" y2="170" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="261" y1="188" x2="202" y2="170" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="160" y1="261" x2="160" y2="216" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 5" />
    </motion.svg>
  );
}

/* ─── 4. Automation: cog / connected pipeline nodes ─── */
function AutomationVisual() {
  /* Generate gear teeth path */
  const gearPath = (() => {
    const r = 60;
    const rInner = 42;
    const teeth = 10;
    const toothH = 14;
    const cx = 160;
    const cy = 160;
    let d = "";
    for (let i = 0; i < teeth; i++) {
      const a1 = ((i * 2 - 0.5) / (teeth * 2)) * Math.PI * 2;
      const a2 = ((i * 2 + 0.5) / (teeth * 2)) * Math.PI * 2;
      const a3 = ((i * 2 + 1.5) / (teeth * 2)) * Math.PI * 2;
      const a4 = ((i * 2 + 2.5) / (teeth * 2)) * Math.PI * 2;
      const toothR = r + toothH;
      if (i === 0) {
        d += `M ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} `;
      } else {
        d += `L ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} `;
      }
      d += `L ${cx + toothR * Math.cos(a2)} ${cy + toothR * Math.sin(a2)} `;
      d += `L ${cx + toothR * Math.cos(a3)} ${cy + toothR * Math.sin(a3)} `;
      d += `L ${cx + r * Math.cos(a4)} ${cy + r * Math.sin(a4)} `;
    }
    d += "Z";
    return d;
  })();

  return (
    <motion.svg
      viewBox="0 0 320 320"
      width="320"
      height="320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -10, 0] }}
      transition={floatTransition}
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false }}
    >
      {/* Pipeline nodes at top */}
      {[80, 140, 200, 260].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={72} r={i === 2 ? 10 : 7} fill={i === 2 ? "#0066FF" : "#d1d1d6"} opacity={i === 2 ? 0.7 : 1} />
          {i < 3 && (
            <line x1={x + (i === 2 ? 10 : 7)} y1="72" x2={i === 2 ? 193 : x + 33} y2="72" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4 4" />
          )}
        </g>
      ))}
      {/* Main gear */}
      <path d={gearPath} stroke="#b0b0b8" strokeWidth="1.5" fill="#f8f8f8" />
      {/* Inner hub */}
      <circle cx="160" cy="160" r="22" fill="#fff" stroke="#0066FF" strokeWidth="1.5" opacity="0.6" />
      <circle cx="160" cy="160" r="6" fill="#0066FF" opacity="0.8" />
      {/* Small satellite gear */}
      <circle cx="246" cy="168" r="22" stroke="#d1d1d6" strokeWidth="1" fill="#f8f8f8" strokeDasharray="4 4" />
      <circle cx="246" cy="168" r="8" fill="#e4e4e7" />
      <circle cx="246" cy="168" r="3" fill="#b0b0b8" />
      {/* Connection line between gears */}
      <line x1="222" y1="162" x2="224" y2="162" stroke="#b0b0b8" strokeWidth="1.5" />
      {/* Bottom pipeline */}
      <rect x="80" y="240" width="40" height="22" rx="6" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="1" />
      <rect x="140" y="240" width="40" height="22" rx="6" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="1" />
      <rect x="200" y="240" width="40" height="22" rx="6" fill="#0066FF" opacity="0.1" stroke="#0066FF" strokeWidth="1" />
      <line x1="120" y1="251" x2="140" y2="251" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arr)" />
      <line x1="180" y1="251" x2="200" y2="251" stroke="#e4e4e7" strokeWidth="1.5" />
    </motion.svg>
  );
}

/* ─── 5. Agents: constellation / multi-agent network ─── */
function AgentsVisual() {
  const nodes = [
    { cx: 160, cy: 160, r: 14, fill: "#0066FF", opacity: 0.8 }, // hub
    { cx: 85, cy: 100, r: 8, fill: "#b0b0b8", opacity: 1 },
    { cx: 235, cy: 100, r: 8, fill: "#b0b0b8", opacity: 1 },
    { cx: 60, cy: 190, r: 8, fill: "#b0b0b8", opacity: 1 },
    { cx: 260, cy: 190, r: 8, fill: "#b0b0b8", opacity: 1 },
    { cx: 115, cy: 255, r: 8, fill: "#b0b0b8", opacity: 1 },
    { cx: 205, cy: 255, r: 8, fill: "#b0b0b8", opacity: 1 },
    { cx: 160, cy: 65, r: 6, fill: "#d1d1d6", opacity: 1 },
    { cx: 55, cy: 135, r: 5, fill: "#e4e4e7", opacity: 1 },
    { cx: 265, cy: 135, r: 5, fill: "#e4e4e7", opacity: 1 },
    { cx: 160, cy: 275, r: 5, fill: "#e4e4e7", opacity: 1 },
  ];

  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [1, 7], [1, 8], [2, 7], [2, 9], [3, 8], [3, 5],
    [4, 9], [4, 6], [5, 10], [6, 10],
  ];

  return (
    <motion.svg
      viewBox="0 0 320 320"
      width="320"
      height="320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -10, 0] }}
      transition={floatTransition}
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false }}
    >
      {/* Outer orbit ring */}
      <circle cx="160" cy="160" r="115" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="5 7" />
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke={a === 0 ? "#0066FF" : "#e4e4e7"}
          strokeWidth={a === 0 ? 1 : 0.75}
          opacity={a === 0 ? 0.35 : 0.7}
          strokeDasharray={a === 0 ? "none" : "3 5"}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          {i === 0 && (
            <circle cx={n.cx} cy={n.cy} r={n.r + 8} fill="#0066FF" opacity="0.1" />
          )}
          <circle
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill={n.fill}
            opacity={n.opacity}
          />
          {i > 0 && i <= 6 && (
            <circle cx={n.cx} cy={n.cy} r={n.r + 4} fill="none" stroke={i <= 6 ? "#d1d1d6" : "#e4e4e7"} strokeWidth="0.75" />
          )}
        </g>
      ))}
    </motion.svg>
  );
}

/* ─── Main export ─── */
export default function ServiceVisual({ type }: ServiceVisualProps) {
  switch (type) {
    case "web":
      return <WebVisual />;
    case "mobile":
      return <MobileVisual />;
    case "saas":
      return <SaasVisual />;
    case "automation":
      return <AutomationVisual />;
    case "agents":
      return <AgentsVisual />;
    default:
      return null;
  }
}
