# Shaping: Update and structure README file
**Issue:** MAR-1 | **Date:** 2026-04-22

## Problem Framing

**How might we** quickly communicate what this interactive history is, so that visitors understand the concept and can start exploring in seconds?

**Why this framing:** The project is an interactive, engaging experience designed for learners and educators. The README should reflect that — it's not a technical reference, but an invitation. Marco confirmed the goal is simply to show what the repo/app does, favoring clarity and approachability over comprehensive documentation.

### Secondary Problems
1. **How might we convey the bilingual nature without cluttering the README?** — Visitors should know it's available in both English and Spanish without making that the focal point.

### Scope
**In:**
- Clear, concise explanation of what "How It Started — A History of the Web" is
- What experience visitors will have (interactive chapters, learning-focused)
- How to access and explore the project (e.g., open in browser)
- Mention of bilingual availability
- Quick setup if any

**Out:**
- Detailed contributor/developer guide
- Technical architecture deep-dives
- Advanced customization instructions
- API documentation
- Extensive CLI setup procedures

---

## Solution Profile: Museum Placard README

**HMW:** How might we quickly communicate what this interactive history is, so that visitors understand the concept and can start exploring in seconds?

### Jobs to Be Done
- **Main job:** When I land on the repo, I want to understand what this project is in under 20 seconds, so I can decide if it's worth exploring.
- **Related jobs:** 
  - I want to know the target audience so I can assess if this is for me.
  - I want a frictionless way to access the live experience without setup steps.
  - I want to know the content is available in my language.

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
- 🟢 **Acceptable:** Writing evocative copy takes creative effort but is low-risk technically.
- 🟡 **Mitigatable:** If we don't have a live demo URL, we clarify "clone the repo and open index.html" — slightly less frictionless but still simple.
- 🟢 **Acceptable:** README will be minimal (under 300 words), which means some edge-case info isn't included — but that's by design per scope.
