# Shaping: Add interactive exercises with live scenarios
**Issue:** MAR-6 | **Date:** 2026-04-28

## Problem Framing

**How might we** present broken or incomplete code (with developer tools accessible) so readers must diagnose and fix it to prove they understand?

**Why this framing:** 
- Mirrors real developer work — debugging is what developers actually do, not writing from scratch
- Uses the tools learners will rely on professionally (browser DevTools)
- Creates a moment of *active struggle* where they prove understanding by doing, not just reading
- Feels pragmatic and practical, not like a quiz

### Secondary Problems

1. **HMW scaffold difficulty appropriately?** — A broken packet router is vastly different from a broken HTTP header. Each concept needs exercises calibrated to its complexity level, or readers get frustrated or breeze through without learning.

2. **HMW create realistic but teachable bugs?** — The bug must reveal the concept directly (e.g., "why is this packet not arriving?" teaches routing logic). Obscure edge cases or syntax errors distract from the core learning.

3. **HMW provide feedback without grading?** — Readers need to know they succeeded (serotonin hit), but you're not tracking scores yet. How do they know their fix is correct?

### Scope

**In:**
- Interactive debugging exercises embedded inline after h2 topics (1–2 per chapter initially)
- Sandboxed code environments (embedded iframes or similar) with broken/incomplete code
- Exercises that map 1:1 to the concept just explained
- Feedback mechanism (visual success state, console feedback)
- Starting with chapters 1–2 as a pilot

**Out:**
- Progress tracking or grading
- Complex multi-step projects
- Automated testing/validation systems
- Mobile optimization (desktop-first)
- Exercises spanning multiple topics

### Appetite

~2 weeks (covers design, 1–2 environments, and exercises for 2 chapters)

## Solution Profile: StackBlitz WebContainers for Debugging Exercises

**Chosen Solution:** Embed interactive StackBlitz projects directly into course topics. Each exercise is a mini-project with broken/incomplete code. Readers use the built-in editor and browser DevTools to diagnose and fix the code. Success is visual: the expected output appears, triggering a "success" state in the exercise UI.

### Overview

StackBlitz WebContainers provides a realistic, browser-based development environment that mirrors what readers will use as actual developers. It supports multi-file projects, real-time rendering, DevTools integration, and offline execution. This keeps readers immersed in the narrative while offering genuine hands-on practice.

### How It Works

1. **Exercise Structure:**
   - One StackBlitz project per h2 topic (starting with Ch1-Ch2)
   - Project folder structure: `index.html`, `style.css`, `script.js`, optionally `data.json` or other assets
   - Code contains deliberate bugs (syntax error, logic error, missing property, incorrect API call, etc.)
   - A README.md file explains what's broken and what they should fix

2. **Embedding:**
   - Use StackBlitz's embed API to drop projects directly below h2 topics
   - Configure: read-only files where appropriate, show console, hide specific panes
   - Projects remain inline; no tab-switching

3. **Success Detection:**
   - Each project includes a validator that checks for correct output
   - When fixed, the app renders correctly OR console shows "✓ You got it!"
   - Visual success state: green border, celebratory feedback

4. **Scaffolding:**
   - Early exercises (Ch1): Simple bugs, single-file HTML+CSS
   - Mid (Ch2-3): Multi-file projects, logic bugs, DevTools required
   - Respects 2-week appetite: focus on depth, not quantity

### Technical Decisions

| Decision | Why |
|----------|-----|
| StackBlitz over CodePen | WebContainers runtime allows offline execution, multi-file projects, more realistic, better DevTools teaching |
| Embedded (not linked) | Keeps readers in narrative flow; no tab-switching friction |
| Validator (not auto-submission) | Encourages inspection; readers build confidence by verifying themselves |
| One exercise per topic | Respects 2-week appetite; quality over quantity |
| Read-only scaffolds | Focuses learning on the bug, not boilerplate |

### Key Risks & Mitigations

🔴 **Dealbreakers:**
- **StackBlitz free tier limit (~10 concurrent embeds):** 2 chapters × 3 topics = 6 projects. We fit. Scaling beyond requires paid tier (~$5–10/month).
  - *Mitigation:* Start with Ch1–2, measure adoption, upgrade as needed
  
- **Browser support (WebContainers requires Chrome 79+, Firefox 79+, Safari 15+ partial, no IE):**
  - *Mitigation:* Provide fallback link to StackBlitz project (open in new tab) for unsupported browsers

🟡 **Mitigatable:**
- **Project setup tedium:** Creating 20+ projects manually is slow.
  - *Mitigation:* Build a template-generation script (YAML → StackBlitz project)
  
- **Validator brittleness:** Exact-match output checking fails on whitespace differences.
  - *Mitigation:* Use loose matching (regex), clear error messages

- **Cold start latency:** First embed takes 2–3s to load.
  - *Mitigation:* Lazy-load below the fold, show loading spinner

🟢 **Acceptable:**
- **External service dependency:** StackBlitz downtime breaks exercises.
  - *Accept:* Low-risk, fallback UX acceptable
  
- **Heavier than text:** ~300–500KB JS per project load.
  - *Accept:* Negligible on broadband
  
- **No progress tracking:** We can't see if readers completed exercises.
  - *Accept:* Out of scope for MVP; can add later

### Implementation Roadmap

**Week 1:**
- Create template StackBlitz projects for Ch1 topics (3–4 exercises)
- Embed in chapter HTML
- Build simple validator system

**Week 2:**
- Polish UX (loading states, success animations, fallback)
- Create Ch2 exercises (2–3)
- Test across browsers
- Deploy and gather feedback

**Post-launch:**
- Upgrade to paid tier if embed limits hit
- Add hint system
- Expand to more chapters
