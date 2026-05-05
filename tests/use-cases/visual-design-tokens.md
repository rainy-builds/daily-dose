# Layer 6 — Visual & Design Token Audit

> **Goal:** Confirm every visual element matches the Figma hi-fi exactly.  
> **When:** Day 3 morning, after all functional layers pass.  
> **Reference:** Figma node IDs in CLAUDE.md. Pull `get_design_context` for each node before checking.

---

## 6.1 — Typography

| Element | Specified | Actual | Match? | Notes |
|---|---|---|---|---|
| H1 (home page) | Bagel Fat One, 80px | | ☐ | |
| Subtext / hint | Kingthings Xstitch, 30px | | ☐ | |
| Brand label | relationship of melodrame, 50px | | ☐ | |
| Input placeholder text | Yellow/60 #C5B666 | | ☐ | |
| Affirmation text | Arial Narrow, 80px | | ☐ | |
| Loading screen heading | Bagel Fat One, 80px | | ☐ | |

---

## 6.2 — Colour Tokens

| Token | Specified hex | Element to check | Match? | Notes |
|---|---|---|---|---|
| Page background | #FFF2B2 | All pages | ☐ | |
| Primary button fill | #441E1A | Lock it in! active state | ☐ | |
| Gold border | #A89A53 (yellow-70) | Active button border | ☐ | |
| Secondary button bg | #FFF8D3 | Surprise Me! bg, Home button bg | ☐ | |
| Input placeholder | #C5B666 | Input field placeholder text | ☐ | |
| Input field bg | #FFFDF4 | Input field background | ☐ | |

---

## 6.3 — Component States

| Component | State | Correct? | Notes |
|---|---|---|---|
| Lock it in! button | Inactive/disabled — grey, no border | ☐ | |
| Lock it in! button | Active — dark brown fill, gold border, arrow icon | ☐ | |
| Surprise Me! button | Default — outlined, yellow bg | ☐ | |
| Input field | Default — empty, placeholder visible | ☐ | |
| Input field | Typing state | ☐ | |
| Input field | Hover state | ☐ | |
| Input field | Error state — inline validation shown | ☐ | |
| Input field | Success state — submit button activates | ☐ | |
| Custom cursor | Default state | ☐ | |
| Custom cursor | Hover state | ☐ | |
| Custom cursor | Select state | ☐ | |
| Home button on card page | Circular pill, correct bg colour | ☐ | |

---

## 6.4 — Layout

| Check | Expected | Correct? | Notes |
|---|---|---|---|
| Input field shape | Full-width pill — border-radius 999px | ☐ | |
| Card border radius | 14px | ☐ | |
| Header layout | Coffee cup + brand label left, Home button right | ☐ | |
| Card chrome | No UI elements overlap the card area | ☐ | |
| Horizontal padding | 50px (home/generating), 79px (affirmation — per Figma) | ✅ Pass | |
| Vertical padding | 20px | ☐ | |

---

## 6.5 — Affirmation Card Text Rendering (all 3 colour modes)

| textColour mode | Text renders correctly? | Position renders correctly? | Notes |
|---|---|---|---|
| black | ✅ Pass | ✅ Pass | |
| white | ✅ Pass | ✅ Pass | |
| white+outline | ✅ Pass | ✅ Pass | Outline confirmed as accentColour |
