MAR-1 Update and structure README file

# Shaping: Update and structure README file

**Issue:** MAR-1 | **Date:** 2026-04-22

## Problem Framing

**How might we** quickly communicate what this interactive history is, so that visitors understand the concept and can start exploring in seconds?

**Why this framing:** The project is an interactive, engaging experience designed for learners and educators. The README should reflect that — it's not a technical reference, but an invitation. Marco confirmed the goal is simply to show what the repo/app does, favoring clarity and approachability over comprehensive documentation.

### Secondary Problems

1. **How might we convey the bilingual nature without cluttering the README?** — Visitors should know it's available in both English and Spanish without making that the focal point.

### Scope

**In:**

* Clear, concise explanation of what "How It Started — A History of the Web" is
* What experience visitors will have (interactive chapters, learning-focused)
* How to access and explore the project (e.g., open in browser)
* Mention of bilingual availability
* Quick setup if any

**Out:**

* Detailed contributor/developer guide
* Technical architecture deep-dives
* Advanced customization instructions
* API documentation
* Extensive CLI setup procedures

---

## Solution Profile: Museum Placard README

**HMW:** How might we quickly communicate what this interactive history is, so that visitors understand the concept and can start exploring in seconds?

### Jobs to Be Done

* **Main job:** When I land on the repo, I want to understand what this project is in under 20 seconds, so I can decide if it's worth exploring.
* **Related jobs:**
  * I want to know the target audience so I can assess if this is for me.
  * I want a frictionless way to access the live experience without setup steps.
  * I want to know the content is available in my language.

### ATDD Scenarios

**Scenario 1: First-time visitor discovers the project**

```
Given a visitor lands on the GitHub repo
When they scroll to the README section
Then they see an evocative 1-2 sentence pitch that explains the concept
And they immediately understand it's an interactive history of the web
And they feel invited to explore
```

**Scenario 2: Educator assesses relevance**

```
Given an educator reads the "What You'll Learn" section
When they scan the key topics covered
Then they can quickly determine if this fits their curriculum
And they see it's bilingual before committing time
```

**Scenario 3: User accesses the project**

```
Given a visitor finishes reading the README
When they look for how to access the project
Then they see a clear, simple link or instruction (e.g., "Open index.html" or GitHub Pages URL)
And they can start exploring with one click
And no setup is required
```

**Scenario 4: Bilingual awareness**

```
Given a visitor reads the README
When they reach the bottom or language section
Then they see "Available in English & Spanish" mentioned naturally
And it doesn't feel like a feature list
```

### Risks

* 🟢 **Acceptable:** Writing evocative copy takes creative effort but is low-risk technically.
* 🟡 **Mitigatable:** If we don't have a live demo URL, we clarify "clone the repo and open index.html" — slightly less frictionless but still simple.
* 🟢 **Acceptable:** README will be minimal (under 300 words), which means some edge-case info isn't included — but that's by design per scope.

---

## Key Decisions & Roadmap

### Key Decisions

1. **Access Method** — Provide both GitHub Pages link (if available) and local fallback instructions. Maximizes accessibility.
2. **Visual Assets** — Include a static screenshot of the landing page. Enhances the museum-placard feel without excessive overhead.
3. **README Structure** — Use balanced structure: Pitch + "What You'll Learn" + "How to Explore" + "Languages" (\~250 words). Gives educators key info without unnecessary detail.

### Milestones

#### Milestone 1: Write & Structure README Content

**Goal:** Create a well-structured README with all copy sections and proper markdown formatting.

**Tasks:**

1. Draft evocative pitch (1-2 sentences) and outline "What You'll Learn" topics based on the 6 chapters (Naive: 0.5h)
2. Write "How to Explore" section with clear access instructions (GitHub Pages URL + local fallback) (Naive: 0.5h)
3. Write "Languages" section clearly noting English & Spanish availability (Naive: 0.5h)
4. Create [README.md](<http://README.md>) file with all sections, proper markdown formatting, and screenshot placeholder (Naive: 0.5h)

Naive Estimate: 2h | Real Estimate: 3h

#### Milestone 2: Add Screenshot & Finalize

**Goal:** Add visual asset and polish README to meet all ATDD scenarios.

**Tasks:**

1. Capture a screenshot of the landing page or first interactive chapter (Naive: 1h)
2. Integrate screenshot into README with descriptive alt text and proper sizing (Naive: 0.5h)
3. Review README against all 4 ATDD scenarios and make refinements as needed (Naive: 0.5h)

Naive Estimate: 2h | Real Estimate: 3h

#### Milestone 3: QA & Verification

**Goal:** Ensure README is production-ready and meets all acceptance criteria.

**Tasks:**

1. Verify README renders correctly on GitHub and links are functional (Naive: 0.5h)
2. Test both access methods (live link + local instructions) work as intended (Naive: 0.5h)
3. Confirm bilingual availability is clear and naturally presented (Naive: 0.5h)

Naive Estimate: 1.5h | Real Estimate: 2h

**Total:** Naive 5.5h | Real 8h

Details:
State: Planning
Assignee: Unassigned
Team: Marco-Test
Priority: Normal
Created: 2026-04-22 20:58:00
Updated: 2026-04-28 15:20:59
Git Branch: feature/mar-1-update-and-structure-readme-file
URL: https://linear.app/turboai/issue/MAR-1

Sub-issues:
  ○ MAR-5 3. QA & Verification (Unassigned)
  ○ MAR-4 2. Add Screenshot & Finalize (Unassigned)
  ◐ MAR-3 1. Write & Structure README Content (Unassigned)
  ○ MAR-2 Shaping: Update and structure README file (Unassigned)

---
## Implementation Plan

### Context

The repo `marco-corbera/how-it-started` has no `README.md` at the root. The shaping doc above frames the README as a "museum placard": a ~250-word, evocative invitation that explains what the project is, what visitors will learn across the 6 chapters, how to access it, and that it's bilingual (EN/ES).

Verified facts (from exploration):
- GitHub Pages is **enabled and built** from the `main` branch — live URL: `https://marco-corbera.github.io/how-it-started/`. So the "live link + local fallback" approach in the shaping doc is fully achievable; the 🟡 risk in the shaping doc (no live URL) is resolved.
- The app is a static site (vanilla HTML/CSS/JS + HTMX, no build step). Local fallback is simply opening `index.html` in a browser, or serving the directory with any static server.
- Six chapters exist as `chapters/ch1.html` … `chapters/ch6.html` with Spanish mirrors at `chapters/es/ch{1..6}.html`. Chapter titles + year ranges (from `index.html`):
  1. Before the Web — 1960s–1989
  2. The First Web — 1989–1995
  3. Browser Wars & Forums — 1993–2001
  4. The Dynamic Web — 1995–2004
  5. Web 2.0 — 2004–2010
  6. The Modern Web — 2010–Now
- Per-chapter audio narration exists in `audio/ch{1..6}.mp3` (Winamp-styled player in `index.html`).
- Bilingual toggle is the `ES`/`EN` button in the top nav (`index.html:34`, handler `toggleLang()` in `js/app.js`).
- No existing `.github/`, `docs/`, or asset directory for screenshots.

### Solution Strategy

Single deliverable: a new file `README.md` at the repo root, plus one screenshot asset committed to the repo. No application code changes.

Decisions taken (no genuine trade-offs — proceeding without asking):
- **Screenshot location**: commit to `docs/screenshot-landing.png`. Rationale: dedicated, conventional folder; avoids cluttering the root; doesn't conflict with anything existing. (Not `.github/` because that folder is reserved for GitHub-specific config like workflows/templates, and not the root because we may add more docs assets later.)
- **Screenshot format**: PNG, ~1600px wide, captured on the landing page in the default `landing` theme at desktop viewport. Rationale: shows the most recognizable framing (chapter grid + title) — matches "Scenario 1" in the shaping doc.
- **README length**: target 200–280 words (within the shaping doc's "~250 words" guidance).
- **No live-demo badge / shields.io**: out-of-scope per the shaping doc's "Out: extensive setup".

### Step-by-step Instructions

**Milestone 1 — Write & Structure README Content (sub-issue MAR-3)**

1. Create `README.md` at the repo root with the following section order:
   1. **H1 title + 1–2 sentence evocative pitch.** Lead with what the project *is* and the feeling it evokes — not features. Reuse the existing landing tagline as inspiration: "From a cold-war military network to the app on your screen. Every era lived in. Every concept explained." Keep the pitch ≤ 50 words.
   2. **Screenshot** (placeholder path: `docs/screenshot-landing.png`) immediately after the pitch, with descriptive alt text (e.g., "How It Started landing page showing the six-chapter grid"). Markdown: `![alt](docs/screenshot-landing.png)`.
   3. **What You'll Learn** — short bulleted list of the 6 chapters with title + year range + a one-line "what's covered" description per chapter. Use the chapter titles and year ranges listed in the Context above. Keep each bullet to a single line so the list scans quickly. Example shape:
      - **Before the Web (1960s–1989)** — Packet switching, ARPANET, and how the internet existed before HTML.
   4. **How to Explore** — two access paths, in this order:
      - Live: link to `https://marco-corbera.github.io/how-it-started/` framed as the recommended path ("Open in your browser").
      - Local: a 2-line fallback — `git clone …` then "open `index.html`" (single sentence). Optionally mention `python3 -m http.server` for users who hit CORS issues with audio playback when opening files directly; keep it as a one-line note, not a procedure.
   5. **Languages** — one short paragraph or single bullet noting "Available in English and Spanish — toggle with the EN/ES button in the top nav." Do **not** make this a feature list; per Scenario 4 it should feel natural.
2. Verify the file is at the repo root (`/README.md`) and that the section order matches Scenarios 1–4 in the shaping doc (pitch first, learn next, explore, languages last).

**Milestone 2 — Add Screenshot & Finalize (sub-issue MAR-4)**

1. Capture a screenshot of the landing page:
   - Serve the site locally: `python3 -m http.server 8000` from the repo root, then open `http://localhost:8000/`.
   - Use the default `landing` theme (the page loads in this theme by default — no action needed).
   - Capture at desktop viewport (~1600×1000px). Frame should include the title block, the kicker, and at least the first row of the chapter grid. Don't include browser chrome.
   - If on macOS: `Shift+Cmd+4` (region select). If on Linux: `gnome-screenshot -a` or similar.
2. Save to `docs/screenshot-landing.png`. Create the `docs/` directory if it doesn't exist.
3. Verify the image renders in the README locally (e.g., open `README.md` in a markdown previewer or push to a draft branch and view on GitHub).
4. Re-read the README against ATDD Scenarios 1–4 in the shaping doc and tighten any wording that doesn't pass:
   - Scenario 1: under-20-second comprehension → is the pitch evocative and concrete?
   - Scenario 2: educator can scan topics → are the 6 chapter bullets scannable?
   - Scenario 3: one-click access → is the live link the first thing under "How to Explore"?
   - Scenario 4: bilingual feels natural → is the EN/ES note under-stated, not a feature flag?

**Milestone 3 — QA & Verification (sub-issue MAR-5)**

1. Push the branch and open the README on GitHub to confirm:
   - Markdown renders correctly (headings, list, image).
   - Screenshot displays inline (no broken-image icon).
   - Live link to GitHub Pages opens the deployed site.
   - Local-fallback instructions run end-to-end (clone → open `index.html` → page loads).
2. Word count check: open the rendered README and confirm body is in the 200–280 word range.
3. Confirm no claims in the README that aren't true (e.g., don't promise features that don't exist — only mention bilingual EN/ES, audio if included, the 6 chapters).

### Files Touched

- `README.md` *(new)*
- `docs/screenshot-landing.png` *(new)*

No application code (`index.html`, `js/app.js`, CSS, chapters) is modified.

### Reference Documentation

- GitHub Pages site (verified live): https://marco-corbera.github.io/how-it-started/
- GitHub Pages config API (used to verify): `gh api repos/marco-corbera/how-it-started/pages` → built from `main` branch, root path.
- GitHub Markdown image syntax: https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/attaching-files

---
## Unit Testing Plan

The deliverable is a Markdown file plus an image asset — there is no executable code to unit-test. In place of unit tests, run these verification checks (2–5, per the workflow guidance) before merging:

1. **Image asset resolves** — `test -f docs/screenshot-landing.png` returns 0; the file is non-empty (> 0 bytes).
2. **README image link is not broken** — grep the README for the screenshot path (`docs/screenshot-landing.png`) and confirm the path matches the file location exactly (case-sensitive on GitHub).
3. **Live URL is reachable** — `curl -sI https://marco-corbera.github.io/how-it-started/ | head -1` returns `HTTP/2 200`.
4. **Word count is on target** — `wc -w README.md` should land in the 220–320 range (200–280 prose words plus markdown overhead).
5. **No internal references leaked** — grep the README for `MAR-`, `linear.app`, `turboai` and confirm zero matches.

These can be run manually or wired into a one-off shell script later if the team wants automation — out of scope for this issue.

---
## Browser Testing Plan

Skipped — this issue is a documentation change with no impact on the app's user flows or integrations. The README links to the existing GitHub Pages site and to a local-open path; both are exercised by the manual QA in Milestone 3 above (live link click + local clone-and-open). No new browser-level behavior is introduced in the app itself.
