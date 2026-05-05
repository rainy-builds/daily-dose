# Bug Tracker

| ID | Title | Severity | Status | Notes |
|---|---|---|---|---|
| BUG-01 | Flash of previous image on navigation | Medium | 🔴 Open | Router cache shows old affirmation image briefly before new one loads. Fix: add `loading.tsx` for the affirmation route |
| BUG-02 | Surprise Me! repeats same card | Low | 🔴 Open | Random selection in `getImageEntry` can return same variant as previous run. No dedup logic |
| BUG-03 | Error border lost on hover | Low | ✅ Fixed | Error state takes priority in activeBorderClass ternary — confirmed not reproducible 2026-05-05 |
| BUG-04 | Very long single word causes 404 | Medium | ✅ Fixed | Words >25 chars now trigger "noSpaces" error state with message "Looks like you forgot spaces". Blocks submission. Fixed 2026-05-05 |
| BUG-05 | Inappropriate single-word input reaches Claude | High | 🔴 Open | No pre-flight filter — clearly harmful words sent directly to Claude API |
| BUG-06 | Mixed input generates inappropriate affirmation | High | 🔴 Open | 2 normal words + 1 harmful word — Claude may generate content that references the harmful word |
| BUG-07 | Double-click fires duplicate API calls | Medium | ⚠️ Masked | AbortController cancels the first call on nav, but underlying issue (no debounce/disabled state on submit) remains. See I1, I7 in e2e-flow.md |
| BUG-08 | Refresh on /generating re-triggers API | Medium | 🔴 Open | React Strict Mode + useEffect — refreshing the generating page fires a new Claude API call |
| BUG-09 | Image changes on affirmation page refresh | High | ✅ Fixed | Fixed 2026-05-05 — generating page now resolves image file before navigating; affirmation page uses `getImageEntryByFile` |
| BUG-10 | Buttons shift when input error appears | Low | ✅ Fixed | Always render `<p>` with `visibility` toggle — element stays in DOM, space always reserved. Fixed 2026-05-05 |
| BUG-11 | No pre-flight input validation before Claude API | High | 🔴 Open | Words are sent to Claude without checking if they're meaningful or appropriate. Should validate server-side before calling Claude and return a user-facing error if input is gibberish or violates content policy |

---

## BUG-11 — Implementation Notes

**Problem:** Any 1–3 words pass client-side validation and go straight to the Claude API. Gibberish (e.g. "asdf qwer"), offensive words, or nonsense all reach Claude.

**Proposed fix (server-side in `/api/generate/route.ts`):**

Add a pre-flight check before calling Claude:
1. Use Claude itself with a lightweight system prompt to classify the input as `valid` / `gibberish` / `inappropriate` — single token response, fast and cheap
2. If invalid, return a structured error response (e.g. `{ error: "invalid_input", reason: "gibberish" | "inappropriate" }`)
3. On the generating page, detect this error response and route to a user-facing message instead of the generic error screen

**Generating page error UI:**
- `gibberish` → "Hmm, we couldn't make sense of that. Try different words."
- `inappropriate` → "Those words aren't quite right for an affirmation. Try something else."
- Both include a "Try again" button back to home

**Alternative (simpler):** Add a basic blocklist of the most obviously harmful words client-side to catch the common cases, with the Claude pre-flight as a backup on the server.
