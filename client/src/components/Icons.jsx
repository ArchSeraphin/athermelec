/**
 * SVG icon set — Industrial Noir × Amber Electric
 * Thin-stroke geometric icons, 24×24 viewBox, stroke="currentColor"
 * Sharp linecaps (square) for a precise, technical aesthetic
 */
import React from 'react';

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.5',
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
  width: '1em',
  height: '1em',
  'aria-hidden': 'true',
};

// ── Electricity ──────────────────────────────────────────────────────
export const IconBolt = () => (
  <svg {...base}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const IconPower = () => (
  <svg {...base}>
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

// ── Automation / PLC ─────────────────────────────────────────────────
export const IconCpu = () => (
  <svg {...base}>
    <rect x="4" y="4" width="16" height="16" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

// ── Networks / VDI ───────────────────────────────────────────────────
export const IconNetwork = () => (
  <svg {...base}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const IconServer = () => (
  <svg {...base}>
    <rect x="2" y="2" width="20" height="8" />
    <rect x="2" y="14" width="20" height="8" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

// ── Engineering / Bureau d'études ────────────────────────────────────
export const IconCompass = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

// ── EV Charging ──────────────────────────────────────────────────────
export const IconBatteryCharging = () => (
  <svg {...base}>
    <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19" />
    <path d="M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19" />
    <line x1="23" y1="13" x2="23" y2="11" />
    <polyline points="11 6 7 12 13 12 9 18" />
  </svg>
);

// ── HVAC / Climate ───────────────────────────────────────────────────
export const IconSnowflake = () => (
  <svg {...base}>
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    <polyline points="12 6 9 9 12 9" />
    <polyline points="12 6 15 9 12 9" />
    <polyline points="12 18 9 15 12 15" />
    <polyline points="12 18 15 15 12 15" />
  </svg>
);

// ── Security / Access Control ────────────────────────────────────────
export const IconLock = () => (
  <svg {...base}>
    <rect x="3" y="11" width="18" height="11" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// ── Process steps ────────────────────────────────────────────────────
export const IconClipboard = () => (
  <svg {...base}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" />
  </svg>
);

export const IconMonitor = () => (
  <svg {...base}>
    <rect x="2" y="3" width="20" height="14" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <polyline points="7 8 10 11 7 14" />
    <line x1="13" y1="14" x2="17" y2="14" />
  </svg>
);

export const IconWrench = () => (
  <svg {...base}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

export const IconCheckCircle = () => (
  <svg {...base}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const IconCalendar = () => (
  <svg {...base}>
    <rect x="3" y="4" width="18" height="18" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const IconMapPin = () => (
  <svg {...base}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ── Industry sectors ─────────────────────────────────────────────────
export const IconFactory = () => (
  <svg {...base}>
    <line x1="2" y1="22" x2="22" y2="22" />
    <path d="M7 22V12l4-3v3l4-3v3l5-3v13" />
    <line x1="16" y1="4" x2="16" y2="9" />
    <line x1="19" y1="4" x2="19" y2="7" />
    <rect x="9" y="16" width="6" height="6" />
  </svg>
);

export const IconFlask = () => (
  <svg {...base}>
    <path d="M10 2v7.31L6 17a2 2 0 0 0 1.72 3h8.56A2 2 0 0 0 18 17l-4-7.69V2" />
    <line x1="8.5" y1="2" x2="15.5" y2="2" />
    <line x1="7" y1="13" x2="17" y2="13" />
  </svg>
);

export const IconFlame = () => (
  <svg {...base}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export const IconCross = () => (
  <svg {...base}>
    <rect x="3" y="3" width="18" height="18" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

export const IconDiamond = () => (
  <svg {...base}>
    <polygon points="12 2 22 12 12 22 2 12" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

export const IconWind = () => (
  <svg {...base}>
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
  </svg>
);

export const IconBuilding = () => (
  <svg {...base}>
    <rect x="2" y="2" width="14" height="22" />
    <path d="M16 7h6v17H16V7z" />
    <rect x="5" y="6" width="3" height="3" />
    <rect x="10" y="6" width="3" height="3" />
    <rect x="5" y="11" width="3" height="3" />
    <rect x="10" y="11" width="3" height="3" />
    <rect x="5" y="16" width="3" height="3" />
    <rect x="10" y="16" width="3" height="3" />
  </svg>
);

export const IconGlobe = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
