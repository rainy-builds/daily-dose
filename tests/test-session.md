# Test Session — Daily Dose of Hope

> Live test run — 2026-05-24

## Status Key

| Symbol | Meaning |
|---|---|
| ✅ Pass | Verified and working |
| 🚫 Blocked | Cannot run — dependency or environment issue |
| ⬜ Not Started | Queued but not yet run |

---

## All Test Cases

| ID | Area | Description | Status | Notes |
|---|---|---|---|---|
| UC-F1 | E2E Flow | Full word path happy flow | ✅ Pass | |
| UC-F2 | E2E Flow | Full surprise path happy flow | ✅ Pass | |
| UC-F3 | E2E Flow | Loading screen never skipped (word path) | ✅ Pass | |
| UC-F4 | E2E Flow | Loading screen never skipped (surprise path) | ✅ Pass | |
| UC-F5 | E2E Flow | Home button returns clean home page | ✅ Pass | |
| UC-F6 | E2E Flow | Browser back from affirmation page | ⬜ Not Started | |
| UC-F7 | E2E Flow | Browser back from generating page | ✅ Pass | |
| UC-1 | URL Params | Happy path via direct URL | ✅ Pass | |
| UC-2 | URL Params | No params → redirect to home | ✅ Pass | |
| UC-3 | URL Params | Affirmation present, imageTag missing → fallback | ⬜ Not Started | |
| UC-4 | URL Params | imageTag present, affirmation missing → redirect | ⬜ Not Started | |
| UC-5 | URL Params | URL-encoded special characters decode correctly | ⬜ Not Started | |
| UC-6 | URL Params | Unknown imageTag → soft-textile fallback | ✅ Pass | |
| UC-7 | URL Params | Very long affirmation text wraps without overflow | ✅ Pass | |
| UC-8 | URL Params | Home button returns to home | ✅ Pass | |
| UC-9 | URL Params | API failure → error state → redirect | 🚫 Blocked | Requires breaking API key — env access needed |
| V1 | Validation | Empty submit — button stays inactive | ✅ Pass | |
| V2 | Validation | Single word accepted | ✅ Pass | |
| V3 | Validation | Two words accepted | ✅ Pass | |
| V4 | Validation | Three words accepted | ✅ Pass | |
| V5 | Validation | Four words — inline error, submission blocked | ✅ Pass | |
| V6 | Validation | Spaces only — treated as empty | ✅ Pass | |
| V7 | Validation | Single character accepted as 1 word | ✅ Pass | |
| V8 | Validation | Numbers accepted as 1 word | ⬜ Not Started | |
| V9 | Validation | Very long single word → "Looks like you forgot spaces" | ✅ Pass | |
| V10 | Validation | Inappropriate content → API returns error, no crash | ✅ Pass | |
| V11 | Validation | Mixed appropriate + harmful → graceful error | ⬜ Not Started | |
| I1 | Interaction | Double-click "Lock it in!" — no duplicate API call | ✅ Pass | |
| I2 | Interaction | Browser back from affirmation card | 🚫 Blocked | Inconsistent across browsers — needs device matrix |
| I3 | Interaction | Refresh during loading screen → returns home | ✅ Pass | |
| I4 | Interaction | Refresh on affirmation card → re-renders correctly | ✅ Pass | |
| I5 | Interaction | Surprise Me! then Home → clean home page | ✅ Pass | |
| I6 | Interaction | Rapid repeated use — 5 runs, no degradation | ✅ Pass | |
| I7 | Interaction | Surprise Me! double-click — no duplicate API call | ✅ Pass | |
| I8 | Interaction | Unknown imageTag from API → fallback, no crash | ✅ Pass | |
| 4.3a | Visual | black text colour mode renders correctly | ✅ Pass | |
| 4.3b | Visual | white text colour mode renders correctly | ✅ Pass | |
| 4.3c | Visual | white+outline text colour mode renders correctly | ✅ Pass | |
| 4.4a | Visual | Long text stress — middle/black | ✅ Pass | |
| 4.4b | Visual | Long text stress — top/white | ✅ Pass | |
| 4.4c | Visual | Long text stress — middle/white+outline | ✅ Pass | |
| D1 | Viewport | Mobile portrait — 390px | ✅ Pass | |
| D2 | Viewport | Mobile landscape — ~844px | ✅ Pass | |
| D3 | Viewport | Tablet — 768px | ⬜ Not Started | |
| D4 | Viewport | Desktop — 1440px | ✅ Pass | |
| D5 | Viewport | Large screen — 2560px | 🚫 Blocked | No 2560px display available in current setup |
| 6.1 | Design Tokens | Typography matches Figma | ⬜ Not Started | |
| 6.2 | Design Tokens | Colour tokens match Figma spec | ⬜ Not Started | |
| 6.3 | Design Tokens | Component states correct | ⬜ Not Started | |
| 6.4 | Design Tokens | Layout spacing matches Figma | ⬜ Not Started | |

---

## Summary

| Status | Count |
|---|---|
| ✅ Pass | 35 |
| ⬜ Not Started | 12 |
| 🚫 Blocked | 3 |
| **Total** | **50** |
