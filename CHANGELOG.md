# Changelog

## v1.1.0 — 2026-05-27

### App renamed: Daily Dose of Happiness → Daily Dose of Hope

The app name has been updated across the entire codebase to reflect the final brand direction confirmed in Figma.

**Files updated:**
- `app/layout.tsx` — page title and Open Graph metadata
- `app/page.tsx` — brand label on the home screen
- `app/generating/page.tsx` — brand label on the generating screen
- `app/affirmation/loading.tsx` — brand label on the loading screen
- `components/layout/ResultsHeader.tsx` — brand label in the affirmation page header
- `app/api/generate/route.ts` — Claude system prompt
- `app/api/suggestions/route.ts` — Claude system prompt
- `CLAUDE.md` — project documentation

---

## v1.0.0 — 2026-05-15 (MVP)

Initial release. 8-step build plan completed in full.

**What shipped:**
- Home page with word input (1–3 words) and Surprise Me! path
- Generating screen with coffee loader animation
- Affirmation card page — Claude API returns structured JSON (`affirmation`, `imageTag`, `textPosition`, `textColour`)
- Image library with 60 image variants across 14 tags, each with pre-defined colour and position defaults
- Three text colour modes: `black`, `white`, `white+outline` (4px accent-colour stroke)
- Full E2E wire-up: Home → Generating → Affirmation card
- Server-side input validation — Claude classifies gibberish and inappropriate input before generation, returns 422 with typed error response
- Client-side validation — word count (1–3), spaces-only, long single word (>25 chars)
- Polish pass: favicon, page fade-in, button press feedback, keyboard focus styles, Open Graph meta, error state UX with Try Again button
- `/preview` dev route showing all 60 image variants at 0.46 scale
- 11 bugs identified and resolved during QA (see `tests/bugs.md`)

**What was intentionally deferred:**
- Custom cursor (Step 7 dropped — default cursor shipped instead)
- Supabase integration (scaffolded only)
