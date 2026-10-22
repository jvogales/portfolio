---
version: alpha
colors:
  background: "#0a0814"
  surface: "#14101f"
  raised: "#1e1830"
  text: "#f5f3ff"
  muted: "#aaa3ba"
  primary: "#7c3aed"
  accent: "#c4b5fd"
  pink: "#e879f9"
  border: "#2a2638"
  success: "#4ade80"
typography:
  display:
    fontFamily: "Inter, Arial, sans-serif"
  body:
    fontFamily: "Inter, Arial, sans-serif"
  utility:
    fontFamily: "JetBrains Mono, Consolas, monospace"
rounded:
  card: "8px"
  button: "5px"
omitted:
  - section: spacing
    reason: "Responsive section spacing is owned by --section-space and media queries in style.css."
  - section: components
    reason: "Static portfolio; shared CSS selectors and native elements own component styles."
---

# João Vitor Gales — Cyber Purple

## Overview

A Portuguese-language developer portfolio for recruiters and collaborators. The user explicitly requested a full Cyber Purple redesign inspired by https://www.alissonlimadev.com/ and supplied a detailed brief. Reference source: https://github.com/alissonlimabr/portfolio at 63f202d1130cbf0ce51a3f94de2826b309396131, inspected and rendered locally. Its MIT notice is retained in assets/licenses/Alisson-Lima-MIT.txt for the reused technology SVGs and adapted visual patterns. Do not reuse its personal biography, photo, professional history, blog posts, projects or branding.

Brand register: large editorial name, Linux terminal details, restrained purple/pink glow, fine separators and numbered sections. The personal signature is a code monogram in a circular avatar composition. The previous blue orbit direction is intentionally superseded by the user's Cyber Purple brief.

## Colors

Runtime source of truth is `style.css :root`: background → --bg; surface → --surface; raised → --raised; text → --text; muted → --muted; primary → --accent; accent → --accent-light; pink → --pink; border → --line; success → --success. Gradient headings use purple through pink. Green only signals online status. The muted color is lighter than the reference for text contrast. Decorative low-contrast lines must never carry required text.

## Typography

Local variable Inter for headings and body; local JetBrains Mono for terminal, technical labels and numbering. Licenses live in assets/licenses. No runtime font CDN. Hero scales from 62px mobile to 108px desktop; secondary headings from 33px to 68px. The full name appears in the biography; the hero uses João Vitor Gales.

## Layout

1240px maximum width with 56px desktop side gutters. Sticky 80px navigation, 72px at tablet/mobile, with matching scroll offset. Below 820px the navigation becomes a nonmodal disclosure; Escape closes it and restores focus. Six real section anchors; the current one is exposed through aria-current. Sections: Perfil, Sobre, Habilidades, Trajetória, Projetos, Contato. Blog is deliberately omitted because no original articles were provided.

Two-column hero, biography and project grid on desktop; single-column content below 600px. Reserve preview aspect ratios and image dimensions. Keep document scrollbars visible and tokenized. Header, button labels and clipboard feedback reserve consistent geometry.

## Elevation & Depth

Fine purple borders and restrained radial lighting. No large floating card shadows. Canvas particles stop offscreen, on hidden tabs, when paused and with reduced motion. The technology marquee pauses on hover and through the global pause control. Reveal is progressive enhancement; content stays visible without JS and with reduced motion.

## Shapes

8px project/technology corners, 5px action corners, circular identity treatment. Avoid the former code-editor shell and generic SaaS widgets.

## Components

Native anchors navigate. `.project` is the shared preview/category/index/title/description/technology/code-link pattern. Captures and prototypes open their local original images; illustrations are explicitly labeled. No false live-demo links.

The trajectory contains verified commercial and academic projects; it does not claim employment, dates, years of experience, employer logos or credentials that were not supplied. The third entry is revealed by the disclosure button, with aria-expanded and aria-controls. All entries remain available without JS.

Clipboard success/failure uses one persistent live region. The mailto link remains available if permissions fail. No external data services or account credentials are needed.

## Do's and Don'ts

Use only the owner's real projects and known facts. Keep illustrations distinguishable from actual captures. Do not invent employers, dates, availability guarantees, production URLs, testimonials, articles or statistics. Keep keyboard focus visible and actions discoverable on touch. Respect reduced motion and the explicit pause control. Reuse theme tokens and update this document for durable design decisions.
