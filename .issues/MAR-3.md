MAR-3 1. Write & Structure README Content

**Goal:** Create a well-structured README with all copy sections and proper markdown formatting.

**Tasks:**

1. Draft evocative pitch (1-2 sentences) and outline 'What You'll Learn' topics based on the 6 chapters
2. Write 'How to Explore' section with clear access instructions (GitHub Pages URL + local fallback)
3. Write 'Languages' section clearly noting English & Spanish availability
4. Create [README.md](<http://README.md>) file with all sections, proper markdown formatting, and screenshot placeholder

**Acceptance Criteria:**

* [README.md](<http://README.md>) exists in repo root with all sections
* Pitch clearly communicates the interactive history concept
* 'What You'll Learn' section includes key topics from chapters
* Access instructions are clear and include both methods
* Bilingual availability is mentioned naturally
* All markdown is properly formatted

**Estimates:** Naive 2h | Real 3h

Details:
State: Planning
Assignee: Unassigned
Team: Marco-Test
Priority: Normal
Created: 2026-04-22 21:05:38
Updated: 2026-04-22 23:07:05
Git Branch: feature/mar-3-1-write-structure-readme-content
URL: https://linear.app/turboai/issue/MAR-3

Parent Issue:
  MAR-1 Update and structure README file

---
## Implementation Plan

### Context
The repo is a static site ("How It Started — A History of the Web") hosted on GitHub Pages at https://marco-corbera.github.io/how-it-started/. It has no README today. This ticket (milestone 1 of [MAR-1](https://linear.app/turboai/issue/MAR-1)) creates a ~250-word README at the repo root that acts as a "museum placard": evocative pitch, what you'll learn, how to explore, and language availability. Screenshot integration is out of scope — that's [MAR-4](https://linear.app/turboai/issue/MAR-4); this ticket only leaves a placeholder.

### Reference Facts (pulled from the codebase)
- Site title (from `index.html`): **How It Started — A History of the Web**
- Landing tagline: "From a cold-war military network to the app on your screen. Every era lived in. Every concept explained. Six chapters through 60 years of the web."
- Six chapters (title + era from `index.html` cards):
  1. Before the Web (1960s – 1989)
  2. The First Web (1989 – 1995)
  3. Browser Wars & Forums (1993 – 2001)
  4. The Dynamic Web (1995 – 2004)
  5. Web 2.0 (2004 – 2010)
  6. The Modern Web (2010 – Now)
- Entry point: `index.html` at repo root
- Bilingual: English (`/chapters/ch*.html`) + Spanish (`/chapters/es/ch*.html`), toggled by the `ES`/`EN` button in the nav
- GitHub Pages: enabled, `status: built`, served from `main` at `/`

### Solution Strategy
Create a single new file `README.md` at the repo root with five sections, matching the parent's "museum placard" structure and MAR-3's acceptance criteria. No build steps, no other files touched.

### Step-by-step

1. **Create `README.md` at repo root** with these sections in order:

   - **Title + pitch (1–2 sentences)** — lead with `# How It Started — A History of the Web`, then a short, evocative pitch. Reuse the landing subtitle's spirit ("cold-war military network to the app on your screen"). Make the invitation clear: this is an interactive history, not a reference doc.

   - **Screenshot placeholder** — add a markdown image reference pointing at `docs/screenshot.png` (or `assets/screenshot.png`) with a descriptive alt attribute. File does not need to exist yet; MAR-4 will add it. Use an HTML comment `<!-- Screenshot added in MAR-4 -->` so a reader knows the placeholder is intentional.

   - **What You'll Learn** — bulleted list of the six chapter topics with their eras, pulled verbatim from `index.html` cards. Keep each bullet to one line (title + era + one-phrase hook). This is how an educator decides in 20 seconds if it fits their curriculum.

   - **How to Explore** — two options, live link first:
     - Live: https://marco-corbera.github.io/how-it-started/
     - Local: clone the repo and open `index.html` in a browser (no build, no dependencies).

   - **Languages** — one short line noting availability in English and Spanish, and that the `EN/ES` toggle lives in the top nav. Keep it natural, not a feature-list bullet.

2. **Target ~250 words total** across the body (excluding the title and image tag). If the draft runs long, trim the pitch and the chapter hooks first — the sections themselves all stay.

3. **Markdown formatting checks** before committing:
   - Single `#` for the title, `##` for section headers, no deeper nesting
   - The live URL is a plain autolink or `[text](url)` — not bare text
   - Image uses markdown image syntax with alt text
   - No trailing whitespace, ends with a single newline

### Notes / Assumptions
- **Screenshot path** — I'll plan on `docs/screenshot.png`. MAR-4 can move/rename; keeping it in `docs/` avoids polluting the site root (which GitHub Pages serves). If MAR-4 decides otherwise, the path in the placeholder is a one-line edit.
- **Out of scope per parent shaping**: contributor/dev guide, architecture notes, CLI setup. Don't add them.

---
## Unit Testing Plan

This change is a single markdown file with no executable code, so traditional unit tests don't apply. The equivalent validation is content/markdown correctness, verified in review:

1. **README renders on GitHub** — after push, open the file on the remote branch and confirm all five sections render, the live-site link is clickable, and the image placeholder shows a broken-image icon with the alt text visible (expected until MAR-4).
2. **Word count check** — body is ~250 words (±50). Anything over 350 should be trimmed before merge.
3. **Link check** — the GitHub Pages URL (https://marco-corbera.github.io/how-it-started/) resolves to the live site (200).
4. **Acceptance-criteria walkthrough** — for each of the 6 acceptance criteria in the ticket, point to the line/section of the README that satisfies it.

---
## Browser Testing Plan

Not applicable. This ticket only adds `README.md` at the repo root. It does not modify `index.html`, chapter files, CSS, JS, or any user-facing flow. The README is rendered by GitHub, not the site itself, so there is nothing to exercise in a browser beyond the GitHub rendering check already covered in the Unit Testing Plan.
