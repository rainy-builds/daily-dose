# CLAUDE.md — Daily Dose of Happiness

This file is read by Claude Code at the start of every session.
Follow all rules here before writing any code.

---

## Project

**App:** Daily Dose of Happiness — a web affirmations tool.  
**Figma file:** https://www.figma.com/design/dKY0QE65wPab0hxIe4Ihfp/Daily-Dose-of-Hope  
**Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS  
**AI:** Claude API (`claude-sonnet-4-20250514`) — server-side only  
**Hosting:** Vercel  
**DB (later):** Supabase — scaffold only, do not implement yet  

---

## Figma Design System Rules

Before building ANY component:
1. Use the Figma MCP to call `get_design_context` on the relevant node ID
2. Never guess at spacing, colour, or font values — always pull from Figma
3. Reference node IDs are listed per screen below

**Key node IDs:**
| Screen | Node ID |
|---|---|
| Home Page (empty state) | `96:601` |
| Loading Screen | `96:611` |
| Affirmation Page — Right, Black text | `96:617` |
| Affirmation Page — Middle, Black text | `96:619` |
| Affirmation Page — Top, Black text | `96:632` |
| Affirmation Page — Right, White text | `96:783` |
| Affirmation Page — Middle, White text | `97:535` |
| Affirmation Page — Top, White text | `97:580` |
| Affirmation Page — Right, White+Outline | `97:520` |
| Affirmation Page — Middle, White+Outline | `97:550` |
| Affirmation Page — Top, White+Outline | `97:595` |

| Affirmation text outline | white / white+outline modes | 4px stroke | Affirmation card text |
---

## Design Tokens

These are pulled directly from the Figma variable definitions.
Always reference these via Tailwind config — never hardcode raw hex values.

### Colours
```ts
// tailwind.config.ts
colors: {
  brown:  { 100: '#441E1A' },
  yellow: {
    10:  '#FFFDF4',
    20:  '#FFF8D3',
    30:  '#FFF2B2',
    60:  '#C5B666',
    70:  '#A89A53',
    100: '#504922',
  },
}
```

### Typography
```ts
'Bagel Fat One'
'relationship of melodrame'
'Arial Narrow'
'Kingthings Xstitch'
```

### Text Outline (affirmation card)
Affirmation text stroke/outline — white and white+outline modes: 4px
Colour: matches textColour rules (white stroke on white text uses outline colour)

### Spacing Scale
```ts
spacing: {
  xs:  '12px',
  s:   '20px',
  m:   '40px',
  l:   '60px',
  'h-padding': '50px',
  'v-padding': '20px',
}
```

### Border Radius
```ts
borderRadius: {
  card: '14px',
  pill: '999px',
}
```

---

## Environment Variables

```bash
ANTHROPIC_API_KEY=your_key_here
```

---

## Critical Rules

1. Never expose API keys
2. Use Tailwind tokens only
3. Strict TypeScript
4. Follow Figma exactly

---

## Image Library — OQ #2 RESOLVED

The Claude API affirmation call returns a structured JSON object — not just the affirmation text.
Read `affirmation-prompt-memory.md` for the full system prompt, JSON schema, and
response parsing logic before building Step 5.

### How it works

```ts
// Claude API returns:
{
  affirmation: string;
  imageTag: string;          // key into the image library
  textPosition: 'right' | 'middle' | 'top';
  textColour: 'black' | 'white' | 'white+outline';
}

// Look up image from library (see src/lib/imageLibrary.ts):
const image = getImageEntry(parsed.imageTag);

// white+outline only — use pre-extracted accent colour, no runtime processing:
const outlineColour = parsed.textColour === 'white+outline' ? image.accentColour : null;
```

Images are stored in `/public/images/affirmations/` named `<tag>-01.jpg` etc.
Full image library schema and entries: see `src/lib/imageLibrary.ts`.

### The 14 imageTag values

| Tag | Aesthetic | textColour |
|---|---|---|
| `food-macro` | Close-up food/drink photography (matcha, fruit, peach) | `black` |
| `storybook-illustration` | Vintage watercolour / botanical illustration | `white+outline` |
| `anime-still` | Dreamy anime or classic cartoon screencap | `white` |
| `kawaii-plushie` | Plush toys photographed in real settings | `white+outline` |
| `kawaii-illustration` | Flat cute illustration (Miffy-style, bear & bunny) | `black` |
| `open-sky` | Real landscape dominated by open sky and clouds | `black` |
| `cosy-object` | Close-up domestic object — teapot, ceramic, claymation | `white+outline` |
| `abstract-art` | Bold graphic / contemporary art (colourful grid, star) | `black` |
| `nature-closeup` | Botanical/floral photography against open sky | `white+outline` |
| `collage-bright` | Maximalist digital collage / meme energy | `white` |
| `dark-artwork` | Dark moody vintage painting or fine art | `white` |
| `soft-textile` | Fabric or textile close-up, pastel and tactile | `black` |
| `garden-closeup` | Ground-level garden or nature photography | `white` |
| `open-water` | Calm water with soft horizon, plushie or object foreground | `white+outline` |

### textPosition defaults per tag

- `middle` — food-macro, anime-still, kawaii-plushie, kawaii-illustration, cosy-object, abstract-art, dark-artwork, soft-textile, garden-closeup
- `top` — storybook-illustration, nature-closeup, open-sky, open-water
- `right` — not a default for any tag but valid; Claude may return it for wide landscape images

---

## Build Order

1. Setup ✅
2. Home page ✅
3. Loading screen ✅
4. API ✅
5. Affirmation page ← IN PROGRESS
6. Wire flow
7. Cursor
8. Polish
