# Accessibility Statement — Al Marsa

**Al Marsa (المرسى)** is committed to ensuring digital accessibility for all sea lovers, yacht charterers, and visitors. We strive to adhere to the **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA** standards to deliver an intuitive, barrier-free experience across desktop and mobile devices.

---

## 1. Core Accessibility Priorities

- **Full Keyboard Operability**: Every interactive element — including the header navigation pill, language/theme selectors, mobile menu drawer, category filters, and slider controls — is fully reachable and operable via keyboard.
- **Bilingual & RTL-First Access**: Native Arabic (RTL) and English (LTR) experiences with automatic `lang` and `dir` root synchronisation. Typography (Cairo and system sans-serif) is scaled for legibility.
- **Motion Sensitivity (`prefers-reduced-motion`)**: Honors user OS-level reduced motion preferences. When enabled, smooth scrolling transitions in the Hill Robinson-inspired Why slider and background animations in the Hero section are instantly disabled.
- **Assistive Technology Compatibility**: Tested with standard screen readers (VoiceOver, NVDA). All decorative icons and aesthetic SVG dividers include `aria-hidden="true"`, while interactive elements maintain explicit `aria-label` descriptors.
- **Color Contrast & Theme Support**: Both dark mode (`marsa-navy`) and light mode (`marsa-pearl`) maintain WCAG 2.1 AA contrast ratios for body copy, interactive buttons, and navigation anchors.

---

## 2. Keyboard Navigation Guide

| Component | Key(s) | Action |
| :--- | :--- | :--- |
| **Global Page** | `Tab` / `Shift + Tab` | Move forward / backward through focusable elements |
| **Global Page** | `Enter` / `Space` | Activate focused button, link, or filter chip |
| **Header Pill** | `Enter` / `Space` | Toggle language (EN ↔ AR) or theme (Dark ↔ Light) |
| **Mobile Menu** | `Escape` | Dismiss and close the open mobile navigation drawer |
| **Why Image Slider** | `Arrow Left` / `Arrow Right` | Advance or rewind slider cards (direction inverts automatically in RTL) |
| **Why Slider Track** | `Home` / `End` | Jump directly to the first or last slider card |

---

## 3. Assistive Technology & ARIA Architecture

- **Semantic Landmarks**: Standard HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<footer>`) define the structure.
- **Slider Landmark**: The Why section is declared with `role="region"` and `aria-label="Why Al Marsa carousel"`. Each card acts as an identifiable slide with sequential numbering.
- **Live State Announcements**: Dynamic updates, such as slider progress and language toggles, announce cleanly without triggering confusing screen-reader loops.

---

## 4. Supported Environments & Verification

Accessibility is continuously verified during feature development:
- **Browsers**: Modern Chromium, Firefox, WebKit (Safari), and Microsoft Edge.
- **Viewports**: Tested across mobile (375px), tablet (768px), and widescreen desktop (1440px+).
- **Assisted Tools**: Keyboard-only traversal, VoiceOver (macOS / iOS), and NVDA (Windows).

---

## 5. Reporting Accessibility Barriers

If you encounter an accessibility barrier or experience difficulty using any part of the Al Marsa lookbook:

1. Open a GitHub Issue using the **Bug Report** template.
2. Include `[A11y]` in the issue title.
3. Describe the problem, your device/browser environment, and assistive software used (if any).

### Severity & Triage SLA
- **P1 (Blocker)**: Inability to navigate or interact with core features — addressed within 48 hours.
- **P2 (Significant)**: Usability difficulties with viable workarounds — prioritized in the next sprint.
- **P3 (Minor)**: Visual contrast or minor announcement refinements — addressed in standard maintenance cycles.
