# Use Cases — Affirmation Page URL Params

> ⚠️ **DO NOT mark Step 5 (Affirmation page) or Step 6 (Wire flow) as DONE until all 9 use cases below have been manually verified and passed.**

These test the param handling in `app/affirmation/page.tsx`.
Test by navigating directly to the URLs below in the browser.

| UC | Description | Status |
|---|---|---|
| UC-1 | Happy path | ⬜ Not tested |
| UC-2 | No params → redirect | ⬜ Not tested |
| UC-3 | Missing imageTag → fallback | ⬜ Not tested |
| UC-4 | Missing affirmation → redirect | ⬜ Not tested |
| UC-5 | Special characters decode | ⬜ Not tested |
| UC-6 | Unknown imageTag → fallback | ⬜ Not tested |
| UC-7 | Long text wraps correctly | ⬜ Not tested |
| UC-8 | Home button returns to home | ⬜ Not tested |
| UC-9 | API failure → error message → redirect | ⬜ Not tested |

---

## UC-1 — Happy path

**URL:** `/affirmation?affirmation=you%20have%20time&imageTag=cosy-object`  
**Expected:** Affirmation card renders with text "you have time" and a cosy-object image  
**Pass criteria:**
- Page loads without error
- Affirmation text is decoded correctly (no `%20`, reads as spaces)
- Image is from the `cosy-object` tag

---

## UC-2 — No params at all

**URL:** `/affirmation`  
**Expected:** Redirects to `/`  
**Pass criteria:**
- Browser lands on the home page
- No blank card is rendered

---

## UC-3 — Affirmation present, imageTag missing

**URL:** `/affirmation?affirmation=you%20have%20time`  
**Expected:** Affirmation card renders using the `soft-textile` fallback tag  
**Pass criteria:**
- Page loads without error
- Affirmation text renders correctly
- Image is from the `soft-textile` tag (fallback)

---

## UC-4 — imageTag present, affirmation missing

**URL:** `/affirmation?imageTag=cosy-object`  
**Expected:** Redirects to `/`  
**Pass criteria:**
- Browser lands on the home page
- No blank card is rendered

---

## UC-5 — URL-encoded special characters in affirmation

**URL:** `/affirmation?affirmation=it%27s%20ok%20%26%20you%27re%20fine&imageTag=soft-textile`  
**Expected:** Affirmation renders as `it's ok & you're fine`  
**Pass criteria:**
- Apostrophes and ampersand decode correctly
- No garbled characters visible on card

---

## UC-6 — Unknown imageTag

**URL:** `/affirmation?affirmation=you%20have%20time&imageTag=does-not-exist`  
**Expected:** Affirmation card renders using the `soft-textile` fallback (library fallback)  
**Pass criteria:**
- Page loads without error
- A valid image renders (not broken)
- Affirmation text is visible

---

## UC-7 — Very long affirmation text

**URL:** `/affirmation?affirmation=the%20day%20you%20plant%20the%20seed%20is%20not%20the%20day%20you%20eat%20the%20fruit%20and%20that%20is%20perfectly%20fine&imageTag=garden-closeup`  
**Expected:** Long text wraps correctly within the card without overflow  
**Pass criteria:**
- Text stays within the `w-[745px]` text container
- No text is clipped or overflows the card boundaries

---

## UC-8 — Home button returns to home

**Setup:** Navigate to any valid affirmation URL (UC-1)  
**Action:** Click the home button in the header  
**Expected:** Returns to `/`  
**Pass criteria:**
- Browser lands on the home page
- Home page input is empty and ready for new input

---

## UC-9 — API failure shows error state then redirects

**Setup:** Temporarily break the API key in `.env.local` (prepend `BROKEN` to the key value), restart the dev server  
**Action:** Submit a word from the home page  
**Expected:** Generating page shows error message for ~3 seconds then redirects to `/`  
**Pass criteria:**
- "oops." and "something went wrong." are visible on screen
- "heading back home..." subtext is visible
- Page automatically redirects to home after ~3 seconds
- No blank screen or unhandled error

**Cleanup:** Restore the API key in `.env.local` and restart the dev server
