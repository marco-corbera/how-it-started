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
