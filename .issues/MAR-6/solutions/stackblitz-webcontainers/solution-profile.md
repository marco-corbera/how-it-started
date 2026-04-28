# Solution Profile: StackBlitz WebContainers for Debugging Exercises

**Issue:** MAR-6 | **Date:** 2026-04-28
**HMW:** Present broken or incomplete code (with developer tools accessible) so readers must diagnose and fix it to prove they understand?

## Overview

Embed interactive StackBlitz projects directly into course topics. Each exercise is a mini-project with broken/incomplete code (HTML, CSS, JS, and optionally data files). Readers use the built-in editor and browser DevTools to diagnose and fix the code. Success is visual: the expected output appears, triggering a "success" state in the exercise UI.

## Jobs to Be Done

- **Main job:** When I finish reading about a web concept (e.g., packet routing), I want to debug broken code that demonstrates that concept in a realistic environment, so I can prove my understanding through doing and build confidence.

- **Related jobs:**
  - I want immediate visual feedback on whether my fix is correct (not ambiguous)
  - I want to practice using browser DevTools in a realistic dev environment (because that's what I'll use as a developer)
  - I want to see error messages and console output, not just broken UI

## How It Works

1. **Exercise Structure:**
   - One StackBlitz project per h2 topic (starting with Ch1-Ch2)
   - Project folder structure: `index.html`, `style.css`, `script.js`, optionally `data.json` or other assets
   - Code contains deliberate bugs (syntax error, logic error, missing property, incorrect API call, etc.)
   - A README.md file in the project explains what's broken and what they should fix

2. **Embedding:**
   - Use StackBlitz's embed API: `<script async src="https://unpkg.com/@stackblitz/sdk/bundles/sdk.umd.js"></script>`
   - Embed the project directly below the h2 topic in the chapter HTML
   - Configure embed settings: read-only files where appropriate, show console, hide specific panes

3. **Success Detection:**
   - Each project includes a simple validator script that checks for correct output
   - When the reader fixes the code, the app renders correctly OR console shows "✓ You got it!"
   - Visual success state: green border around iframe, confetti or celebratory feedback

4. **Scaffolding by Concept:**
   - Early exercises (Ch1): Simple bugs, single-file HTML+CSS (e.g., missing closing tag)
   - Mid (Ch2-3): Multi-file projects, logic bugs, DevTools required
   - Later: More complex, networked scenarios (if expanded)

## Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **StackBlitz over CodePen** | WebContainers runtime allows offline execution, multi-file projects, more realistic dev environment, better for teaching DevTools |
| **Embedded (not linked)** | Keeps readers in narrative flow; no tab-switching friction |
| **Validator (not auto-submission)** | Readers must verify themselves; encourages inspection and confidence-building |
| **One exercise per topic (not multiple)** | Respects 2-week appetite; prevents decision fatigue; quality over quantity |
| **Read-only scaffolds** | Teacher-provided setup (HTML structure, starter CSS) focuses learning on the bug, not boilerplate |

## Acceptance Test-Driven Development (ATDD) Scenarios

### Scenario 1: Happy Path — Reader Fixes a Simple Bug
```gherkin
Given the reader just finished reading a topic about packet routing
And they see an embedded StackBlitz project below the topic
And the project displays broken output (e.g., packets not arriving at destination)
When the reader opens DevTools (right-click → Inspect)
And examines the JavaScript console and network flow
And identifies the missing route declaration
And adds the correct code (e.g., `router.add('destination')`)
Then the output updates in real-time
And a green "✓ Success!" banner appears
And the reader can move on to the next topic
```

### Scenario 2: Reader Gets Stuck — Hint System
```gherkin
Given the reader has been stuck for 3+ minutes
And they click "Show Hint"
Then a subtle hint appears (e.g., "Check the console. What error message do you see?")
And they can continue debugging
```

### Scenario 3: Reader Introduces New Bugs
```gherkin
Given the reader has fixed the original bug
And they accidentally introduce a new bug while experimenting
Then the success banner disappears
And the console shows the new error
And they can fix it again
```

### Scenario 4: Offline / WebContainers Unsupported
```gherkin
Given the reader's browser doesn't support WebContainers (e.g., Safari <18)
Or the reader is offline
When the page loads
Then a fallback message appears
And a link to a StackBlitz public project is shown (open in new tab)
```

### Scenario 5: Reader Skips the Exercise
```gherkin
Given the reader chooses to skip the embedded exercise
And scrolls past it
Then they can continue reading the narrative
And the exercise remains available if they want to revisit
```

## Risks

🔴 **Dealbreakers:**
- **StackBlitz free tier embeds limit:** Free tier allows ~10 concurrent embedded projects. If we're doing 2 chapters × 3 topics × 1 exercise, we fit. But scaling to 6+ chapters might require paid tier (~$5–10/month). *Mitigation:* Start with Ch1–2, measure adoption, decide on upgrade path.
- **Browser support:** WebContainers requires Chrome/Edge 79+, Firefox 79+. Safari 15+ partial (limited Node.js). IE/older Safari fail silently. *Mitigation:* Fallback to StackBlitz link (open in new tab) for unsupported browsers.

🟡 **Mitigatable:**
- **Project setup complexity:** Creating 20+ StackBlitz projects manually is tedious. *Mitigation:* Build a Python/Node script to template-generate projects from a YAML file (1 hour dev work).
- **Validator brittleness:** If validator checks for exact output, whitespace or minor formatting differences fail silently. *Mitigation:* Use loose matching (e.g., regex), clear error messages.
- **Cold start:** First StackBlitz embed takes 2–3s to load. Subsequent embeds are faster. *Mitigation:* Lazy-load embeds below the fold; show loading spinner.

🟢 **Acceptable:**
- **Dependency on external service:** If StackBlitz goes down, exercises don't load. *Accept:* Low downtime risk; fallback UX is acceptable.
- **Slightly heavier than text-only:** Adds 300–500KB of JS per project load. *Accept:* Inline with modern web standards; negligible on broadband.
- **No progress tracking:** We don't know if readers actually completed exercises. *Accept:* Out of scope for this iteration; can add later with form submission.

## Implementation Roadmap (High-Level)

**Week 1:**
- Create template StackBlitz projects for Ch1 topics (3–4 exercises)
- Embed in chapter HTML
- Build simple validator system

**Week 2:**
- Polish UX (loading states, success animations, fallback messages)
- Create Ch2 exercises (2–3)
- Test across browsers
- Deploy and gather feedback

**Post-launch (if needed):**
- Upgrade to StackBlitz paid tier if embed limits hit
- Add hint system
- Expand to more chapters
