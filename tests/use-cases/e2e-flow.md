# Use Cases — End-to-End Flow Testing

> ⚠️ **DO NOT mark Step 6 (Wire flow) as DONE until all use cases below have been manually verified and passed.**

Two paths: **Word** (user types feelings) and **Surprise** (random generation).

| UC | Path | Description | Status | Date tested |
|---|---|---|---|---|
| UC-F1 | Word | Full word path happy flow | ✅ Pass | 2026-05-07 |
| UC-F2 | Surprise | Full surprise path happy flow | ✅ Pass | 2026-05-07 |
| UC-F3 | Word | Loading screen never skipped | ✅ Pass | 2026-05-07 |
| UC-F4 | Surprise | Loading screen never skipped | ✅ Pass | 2026-05-07 |
| UC-F5 | Both | Home button returns clean home page | ✅ Pass | 2026-05-07 |
| UC-F6 | Both | Browser back from affirmation page | ✅ Pass | 2026-05-07 |
| UC-F7 | Both | Browser back from generating page | ✅ Pass | 2026-05-07 |

---

## UC-F1 — Full word path happy flow

**Steps:**
1. Navigate to `http://localhost:3000`
2. Type 1–3 words in the input (e.g. "feeling tired")
3. Click "Lock it in!"

**Expected sequence:** Home → Generating → Affirmation  
**Pass criteria:**
- Home page input accepts the words
- Generating screen appears immediately after submission
- Affirmation card appears with real text and a real image
- No blank screens at any step

---

## UC-F2 — Full surprise path happy flow

**Steps:**
1. Navigate to `http://localhost:3000`
2. Click "Surprise Me!" without entering any words

**Expected sequence:** Home → Generating → Affirmation  
**Pass criteria:**
- Generating screen appears immediately after clicking
- Affirmation card appears with real text and a real image
- No blank screens at any step

---

## UC-F3 — Loading screen never skipped (word path)

**Steps:**
1. Navigate to `http://localhost:3000`
2. Type 1–3 words and click "Lock it in!"
3. Watch the transition carefully

**Pass criteria:**
- Generating screen (coffee cup + "Affirmations Generating...") is always visible before the affirmation card
- The generating screen is never skipped or flashed so briefly it's invisible

---

## UC-F4 — Loading screen never skipped (surprise path)

**Steps:**
1. Navigate to `http://localhost:3000`
2. Click "Surprise Me!"
3. Watch the transition carefully

**Pass criteria:**
- Generating screen is always visible before the affirmation card
- Never skipped

---

## UC-F5 — Home button returns clean home page

**Steps:**
1. Complete UC-F1 or UC-F2 to reach the affirmation page
2. Click the home button in the header

**Pass criteria:**
- Browser lands on the home page
- Input field is empty
- No previous words pre-filled
- Page is in default state, ready for a new submission

---

## UC-F6 — Browser back from affirmation page

**Steps:**
1. Complete UC-F1 to reach the affirmation page
2. Press the browser back button

**Pass criteria:**
- No error state or blank screen
- Either lands on generating (acceptable if it re-triggers cleanly) or home
- User is not stuck in a broken loop

---

## UC-F7 — Browser back from generating page

**Steps:**
1. Navigate to `http://localhost:3000`
2. Submit a word — as soon as the generating screen appears, immediately press the browser back button

**Pass criteria:**
- No error state or blank screen
- Browser returns to home page
- Home page is in a clean state

---

## 4.3 — Text Colour Coverage

> **Goal:** Confirm all three text colour modes have been seen in a real end-to-end render. Use the direct URLs below to force specific tags if needed.

| textColour | Confirmed? | Example tag | URL to force it | Notes |
|---|---|---|---|---|
| `black` | ⬜ | `food-macro` | `/affirmation?affirmation=i+love+matcha&imageTag=food-macro` | |
| `white` | ⬜ | `dark-artwork` | `/affirmation?affirmation=you+are+enough&imageTag=dark-artwork` | |
| `white+outline` | ⬜ | `cosy-object` | `/affirmation?affirmation=sometimes+all+you+need+is+tea&imageTag=cosy-object` | |

**Pass criteria for each row:**
- Text is legible against the image at a glance
- Stroke/outline renders correctly (4px for white and white+outline)
- Accent colour on white+outline looks coherent with the image

---

## 4.4 — Long Affirmation Text Stress Test

> **Goal:** Confirm the card layout holds when affirmation text is unusually long. Long affirmations are valid — the layout must not break or clip.

Use the URLs below to test each case directly:

| Input | Position | Colour | URL | Text overflow? | Text clipped? | Status | Notes |
|---|---|---|---|---|---|---|---|
| overwhelmed by everything | middle | black | `/affirmation?affirmation=overwhelmed+by+everything&imageTag=food-macro` | ⬜ | ⬜ | ⬜ Not tested | |
| scared about the future | top | white | `/affirmation?affirmation=scared+about+the+future&imageTag=dark-artwork` | ⬜ | ⬜ | ⬜ Not tested | |
| feeling lost and unlovable | middle | white+outline | `/affirmation?affirmation=feeling+lost+and+unlovable&imageTag=cosy-object` | ⬜ | ⬜ | ⬜ Not tested | |

**Note:** These inputs test the real Claude output — the affirmation text returned will be longer than the input. If you want to test a specific long string directly, use:
`/affirmation?affirmation=the+day+you+plant+the+seed+is+not+the+day+you+eat+the+fruit&imageTag=garden-closeup`

**Pass criteria:**
- Text wraps cleanly within the `w-[745px]` text container
- No text overflows the card boundary
- No text is clipped or cut off at the card edge
- Layout remains stable regardless of text length

---

## 5.1 — Input Validation

| # | Test case | Steps | Expected result | Actual result | Status | Bug ID | Date tested |
|---|---|---|---|---|---|---|---|
| V1 | Empty submit | Click "Lock it in!" with no text entered | Button stays inactive — no submission fires | | ⬜ Not tested | | |
| V2 | Single word | Type one word, click "Lock it in!" | Button activates, flow proceeds normally | | ⬜ Not tested | | |
| V3 | Two words | Type two words, click "Lock it in!" | Button activates, flow proceeds normally | | ⬜ Not tested | | |
| V4 | Three words | Type three words, click "Lock it in!" | Button activates, flow proceeds normally | | ⬜ Not tested | | |
| V5 | Four words | Type four words, click "Lock it in!" | Inline error shown, submission blocked | | ⬜ Not tested | | |
| V6 | Spaces only | Type spaces only, click "Lock it in!" | Treated as empty — button stays inactive | | ⬜ Not tested | | |
| V7 | Single character | Type one letter | Button activates (counts as 1 word) | | ⬜ Not tested | | |
| V8 | Numbers | Type a number e.g. 123 | Accepted as 1 word, flow proceeds | | ⬜ Not tested | | |
| V9 | Very long single word | Type a 30+ character string | Accepted as 1 word, renders on card without overflow | | ⬜ Not tested | | |
| V10 | Inappropriate content | Type a clearly harmful word | API handles gracefully — no crash, error state shown | | ⬜ Not tested | | |
| V11 | Mixed appropriate + harmful | Two normal words + one harmful word | Same as V10 — graceful error, no crash | | ⬜ Not tested | | |

---

## 5.2 — Interaction Edge Cases

| # | Test case | Steps | Expected result | Actual result | Status | Bug ID | Date tested |
|---|---|---|---|---|---|---|---|
| I1 | Double-click "Lock it in!" | Click submit button twice rapidly | Only one API call fires — no duplicate submissions | Second click navigated away before call completed — AbortController cancelled it | ⚠️ Masked by AbortController | BUG-07 | 2026-05-05 |
| I2 | Browser back from card | On affirmation card, press browser back | Handled gracefully — returns to home or appropriate state | | ⬜ Not tested | | |
| I3 | Refresh on loading screen | Refresh browser during loading state | Returns to home page — no stuck loading state | | ⬜ Not tested | | |
| I4 | Refresh on affirmation card | Refresh browser on final card | Card re-renders correctly — no broken state | | ⬜ Not tested | | |
| I5 | Surprise Me! then Home | Use Surprise Me!, view card, click Home | Returns to clean empty home page | Pass | ✅ Pass | | 2026-05-05 |
| I6 | Rapid repeated use | Complete full flow 5 times in a row | No degradation — each run produces a valid result | Pass | ✅ Pass | | 2026-05-05 |
| I7 | Surprise Me! double-click | Click "Surprise Me!" twice rapidly | Only one API call fires | Same as I1 — AbortController masking the issue | ⚠️ Masked by AbortController | BUG-07 | 2026-05-05 |
| I8 | Unknown imageTag returned | API returns imageTag not in library | Falls back to soft-textile — no crash, card renders | No crash, fallback rendered | ✅ Pass | | 2026-05-05 |

---

## 5.3 — Viewport & Device

| # | Device / size | Steps | Expected result | Actual result | Status | Bug ID | Date tested |
|---|---|---|---|---|---|---|---|
| D1 | Mobile portrait — iPhone / 390px | Resize browser to 390px wide, run full flow | Card layout holds, text readable, buttons tappable | | ⬜ Not tested | | |
| D2 | Mobile landscape — iPhone / ~844px | Rotate to landscape or resize to 844px, run full flow | Layout adapts, no overflow | | ⬜ Not tested | | |
| D3 | Tablet — iPad / ~768px | Resize to 768px, run full flow | Layout holds between mobile and desktop | | ⬜ Not tested | | |
| D4 | Desktop — 1440px | Full browser width at 1440px | Reference layout — matches Figma exactly | | ⬜ Not tested | | |
| D5 | Large screen — 2560px | Expand browser to 2560px | No extreme stretching or layout breaks | | ⬜ Not tested | | |
