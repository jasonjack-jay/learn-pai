# Learn PAI — The Complete Curriculum Vision

> **Status:** Spec / strategic curriculum plan
> **Date:** 2026-04-12
> **Scope:** The full learning platform beyond current PAI-specific content

---

## The Core Insight

**Every other developer learning resource teaches you to do things yourself.**

Codecademy teaches you JavaScript. FreeCodeCamp teaches HTML/CSS. Udemy has bootcamps that produce full-stack developers from scratch.

Learn-pai is built for a different world — one where your AI agent writes the code for you. In that world, the skill is no longer *execution*. It's **understanding**:

- Knowing *what is possible* so you know what to ask for
- Knowing *why it matters* so you can make good decisions
- Knowing *roughly how things fit together* so you can evaluate what your AI gives you
- Knowing *what you don't know* so you can ask effectively

**We teach the concepts. The AI handles the execution.**

You *could* learn the how — but why would you? Your AI is better at syntax than you'll ever be. Your job is to be the architect, the decision-maker, the quality-checker. To do that, you need the concepts.

## The Unifying Principle

> **"Removing the unknown unknowns."**

Just knowing *what exists* and *when you'd want it* is powerful. You can't ask your AI to set up CI/CD if you've never heard the term. You can't evaluate whether your AI's database choice is sensible if you don't know what SQL vs NoSQL means. You can't debug a production issue if you don't know what environment variables are.

Every page answers:
1. **What is this?** (in plain English, with no jargon on first use)
2. **Why would I want to know about it?** (when does it come up in real life)
3. **What are the key concepts?** (enough to hold a conversation about it)
4. **How might you ask your AI to do it for you?** (example prompts — this is how you actually use it)

**What we don't teach:** step-by-step "how to write X in Y language." That's what tutorials and AI agents are for.

## Tone & Voice

- **Human-first.** Written for a vibe coder who just joined a team of senior developers and needs to get up to speed fast.
- **Friendly and tongue-in-cheek.** Mild humour. No condescension. Lots of "we've all been there."
- **No assumed knowledge.** Every new term is explained on first use. No unexplained acronyms.
- **Specific over abstract.** "When you run `npm install` and see 400 warnings flash by" beats "when you encounter dependency resolution output."
- **"If you're thinking X, you need Y."** Regular signposting to the next thing.
- **AI-aware.** Every command / concept gets an "ask your AI" breakout box.

## Current State (What Exists)

### Foundation tier (mandatory, sequential)
1. Introduction
2. Prerequisites
3. Terminal Basics
4. Git Basics
5. Claude Code
6. Install Bun
7. PAI vs Claude
8. What is PAI?
9. Principles
10. Installation
11. Superpowers
12. BMAD

### Core tier (opt-in paths)
- **Know Me** — teaching AI about you (Telos, narratives, beliefs, goals)
- **Get Things Done** — skills and workflows
- **Architecture** — how PAI is structured (nine primitives, algorithm, user-system)

### Reference
- `/git-reference` — quick Git cheat sheet
- `/terminal-reference` — quick Terminal cheat sheet

### In progress
- **Git in Detail** — 14-page deep dive, being built now (see separate plan)

## The New Paths

Six new learning paths. Each path has an index hub page, then content pages. All pages follow the "what / why / how your AI does it" structure. Each path is an opt-in core-tier path, like the existing Know Me / Get Things Done / Architecture paths.

---

### Path A: How the Web Works
*"Your AI just built you a web app. Do you understand what it built?"*

**Audience:** Vibe coders who've had their AI build a web thing and realised they don't know what "the server" means.

**Why this matters:** You can't evaluate what your AI built if you don't understand the foundational architecture of the web. Every concept here comes up in every web project.

**Pages (8):**

1. **Introduction** — Why web basics matter even though your AI writes the code
2. **What Happens When You Visit a URL** — the browser's journey (DNS, TCP, HTTP request, HTML response, rendering). The 2-second tour that unlocks everything else.
3. **Servers, Clients, and the Request/Response Cycle** — what's running where. Why "client-side" and "server-side" are different things. Why it matters whether code runs in the browser or on a server.
4. **APIs and How Apps Talk to Each Other** — what an API is (plain English). REST basics. Why everything uses JSON. What an API endpoint is.
5. **The Frontend/Backend Divide** — the two halves of a web app. What lives where. Why the divide exists. How they communicate.
6. **localhost, Ports, and Dev Servers** — what `localhost:5173` actually means. What a port is. Why your dev server is different from production.
7. **HTTPS, CORS, and Browser Security** — why things sometimes "just don't work" in browsers. The security model in plain English. What CORS errors mean and why they exist.
8. **Cookies, Sessions, and Authentication** — how websites remember you. The basics of login (sessions, tokens, cookies). Why "auth" is hard.

---

### Path B: Understanding Code (Not Writing It)
*"You don't need to write JavaScript. You need to read what your AI wrote."*

**Audience:** Anyone whose AI has generated code they need to evaluate, debug, or modify.

**Why this matters:** This is the difference between vibe coding (accept whatever AI produces) and actually shipping software (verify what AI produces). You need to read code competently even if you never write it from scratch.

**Pages (13):**

1. **Introduction** — The critical distinction: reading vs writing. Why this matters more than ever.
2. **HTML: The Skeleton** — tags, attributes, nesting, forms, semantic elements. What you'll see in every web project.
3. **CSS: The Paint** — selectors, the box model, flexbox/grid, responsive basics. How "make it look like that" becomes reality.
4. **JavaScript: Making Things Happen** — variables, functions, if/else, loops, events. The language of the browser.
5. **JavaScript: The Async World** — promises, async/await, fetch. Why "the database hasn't returned yet" matters.
6. **TypeScript: Types as Documentation** — what types are. Why they catch bugs. How to read a type signature.
7. **Components and Reusability** — what a component is. Why frameworks exist. Why you see the same patterns everywhere.
8. **Project Structure and Imports** — how files connect. `import`/`export` in plain English. Why the folder layout matters.
9. **Package Management** — `package.json`, `node_modules`, lockfiles. `npm install` explained. Bun vs npm vs yarn.
10. **Config Files: The Unsung Heroes** — `tsconfig`, `eslint`, `prettier`, `vite.config`. What each does. When you touch them (almost never, but you need to know).
11. **Environment Variables and `.env`** — config vs code. Dev vs production. The secrets problem. Why `.env` is in `.gitignore`.
12. **The Build Process** — source code → compiled output → deployed site. What "building" means.
13. **Reading a Real Codebase** — how to orient yourself in an unfamiliar project. Where to look first. How to find what you need.

---

### Path C: The Error Whisperer
*"The #1 skill for AI-assisted development: understanding what went wrong so you can tell your AI."*

**Audience:** Everyone. This is the single most underrated skill in development.

**Why this matters:** The most common vibe coder failure pattern: something breaks, copy error to AI, AI suggests fix, fix doesn't work, loop for an hour. Understanding the error well enough to evaluate the AI's suggestion breaks the loop. This path pays for the whole site.

**Pages (10):**

1. **Introduction** — Why errors are your best friend. The AI feedback loop problem and how understanding errors breaks it.
2. **Anatomy of an Error Message** — what every error has (type, message, location, stack trace). How to read one.
3. **Terminal Errors** — what `bash: command not found`, `npm ERR!`, build errors look like. Where they come from.
4. **Browser Errors** — the browser console. Runtime errors (null/undefined). Unhandled promise rejections.
5. **Build Errors vs Runtime Errors** — why some errors happen before your site runs and others happen while it's running. Why the distinction matters.
6. **Common Error Patterns** — "Cannot read property of undefined." "Module not found." "Unexpected token." "CORS error." The top 10 you'll see constantly, translated.
7. **Network Errors** — 4xx vs 5xx. CORS, 404, 500, timeouts. What each means.
8. **Browser DevTools Essentials** — Console, Network, Elements, Sources. The four tabs that solve 90% of problems.
9. **The Debug Loop** — hypothesis → test → narrow down → tell AI with context. The systematic way to work with AI on broken code.
10. **When to Google vs Ask AI vs Ask a Human** — a decision tree. Some problems are still faster to Google. Some need a human.

---

### Path D: Shipping
*"You built it locally. Now get it on the internet."*

**Audience:** Vibe coders ready to take their AI-built project live. Junior devs learning deployment.

**Why this matters:** The gap between "works on my machine" and "anyone can visit yourapp.com" is where most vibe coders get permanently stuck. Closing this gap unlocks everything.

**Pages (9):**

1. **Introduction** — From localhost to the internet. What "deploying" actually means.
2. **Deployment Platforms** — Vercel, Netlify, Railway, Fly.io. What they do. What they cost. Which to pick.
3. **Domains and DNS** — how `yourapp.com` finds your server. Buying a domain. Pointing it at your site.
4. **Environment Variables in Production** — dev `.env` vs prod. Secrets management. Why your AI insists on this.
5. **CI/CD: Automated Everything** — what happens when you push. GitHub Actions. Automated tests. Automated deployments.
6. **Monitoring and Uptime** — how you know it's up. How you know it's broken. Tools like Sentry, Vercel Analytics.
7. **Rollbacks and Recovery** — it broke. Now what? Rolling back a deployment. Fixing production.
8. **Docker: Containers Without the Confusion** — what a container is (without buzzwords). When you need one. When you don't.
9. **Databases in Production** — when you need one. Managed (Supabase, Neon, PlanetScale) vs self-hosted. SQL vs NoSQL (briefly). Why data persistence is harder than code persistence.

---

### Path E: Working on a Team
*"You're not alone anymore. Here's how to not break everyone else's work."*

**Audience:** Vibe coders or junior devs joining a team for the first time. Or working with an AI that acts like a teammate.

**Why this matters:** Soft skills are 50% of being a productive developer. Nobody teaches this explicitly. Most frustration on teams is avoidable with a few principles.

**Pages (9):**

1. **Introduction** — You're not alone anymore. The shift from solo to team.
2. **Agile and Scrum in 10 Minutes** — sprint, standup, ticket, board, retro. Enough to not be lost.
3. **Code Review: Reading PRs** — how to review code. What to look for. Reviewing as a learning opportunity.
4. **Code Review: Receiving Feedback** — how to take criticism. Disagreeing productively. The emotional side.
5. **Technical Communication** — commit messages, PR descriptions, bug reports, design docs. How to write them so other humans (and AIs) can use them.
6. **Asking Good Questions** — the framework: context, what you tried, what you expected, what happened. Works for AI, Stack Overflow, and teammates.
7. **Open Source: Reading a Repo** — navigating unfamiliar code. What to look at first. Reading issues and PRs.
8. **Open Source: Contributing** — your first PR to someone else's project. The etiquette. The mechanics.
9. **When to Ask vs When to Figure It Out** — a framework. The 15-minute rule. When stuck is learning vs when stuck is blocked.

---

### Path F: Git in Detail
*Already being built. See separate plan.* 14 pages covering every Git concept a modern developer needs.

---

## Cross-Cutting Concerns

### Navigation Model

All new paths use the same pattern, pioneered by Git in Detail:

1. **Intro page** — why this path matters, what's covered
2. **Index page** — chunky card grid of all sections with what/why/when for each
3. **Content pages** — freely navigable, not sequential-only
4. **End-of-page navigation** — choice: "Next up: [Section] — [reason]" or "Return to [Path] index"

No "unlock next" gating. Users can jump around. The index is the hub.

### The "Ask Your AI Agent" Breakout

Every command, concept, or topic gets a breakout box:

> **How you might ask your AI agent**
> - "commit my work with a good message"
> - "commit just the changes to the login page"
> - "undo my last commit but keep the changes"

Three-to-five example prompts. Natural language. Different phrasings. This replaces "here's the command syntax."

**New Svelte component needed:** `AskYourAgent.svelte` — takes an array of example prompts, renders them in a styled card.

### Image Placeholders

During writing, image locations are marked with placeholders:

```
[IMAGE: Diagram showing the three areas — working directory, staging area, repository — with files moving between them. Two tentacled aliens or similar characters could be shown.]
```

The placeholder describes **what the image should convey**, not the artistic theme. Theme is decided in a later pass (tube map vs other styles).

Types of images we want:
- **Concept diagrams** — how things relate (e.g., the three areas of git)
- **Before/after** — what a command does visually
- **"You are here" maps** — where this concept fits in the bigger picture
- **Decision trees** — "if you want X, use Y" visual guides
- **Breathing room / humour** — breaking up dense text with something friendly

### Component Library Additions

- `AskYourAgent.svelte` — AI prompt examples breakout
- `PathIndex.svelte` — chunky card grid for path index pages
- `PathNavFooter.svelte` — end-of-page navigation (next + return to index)
- `ImagePlaceholder.svelte` — dev-mode visual placeholder that shows the intended image description

### Module System Changes

The existing `state.svelte.ts` needs:

1. **New PathIds:**
   - `git-in-detail`
   - `how-web-works`
   - `understanding-code`
   - `error-whisperer`
   - `shipping`
   - `team`

2. **Path metadata** added for each (title, tagline, icon, colour)

3. **Module entries** for each page (~70 new modules across all paths)

4. **"Freely navigable" flag** — some paths (Git in Detail, references) don't enforce sequential prerequisites. This is new. Currently prerequisites are strictly checked. We need a `freelyNavigable: true` flag on paths, or make prerequisites advisory rather than gating.

### Link-out Strategy

We deliberately don't teach everything end-to-end. For mastery topics, link out:

- Full JavaScript tutorials → MDN, FreeCodeCamp
- React/Svelte/Next.js specifics → official docs
- Databases in depth → platform-specific docs (Supabase, etc.)
- Advanced CSS → CSS Tricks, Kevin Powell's YouTube

Our job is to explain *what* and *why*. The how is one link away.

## Implementation Priorities

Suggested build order:

1. **Git in Detail** (in progress) — establishes the patterns (navigation, index page, breakouts, placeholders)
2. **The Error Whisperer** — highest leverage. Immediately useful. Relatively small (10 pages).
3. **How the Web Works** — foundational. Unlocks everything else. Moderate size (8 pages).
4. **Understanding Code** — the biggest path (13 pages) but most frequently-needed once shipped.
5. **Shipping** — for users who've got through a project and want to go live.
6. **Working on a Team** — the soft-skills path. Least "technical" so can come last.

Each path is independent — users can jump in at their level of need. But if someone works through all six in order, they go from "I've had my AI build me something" to "I can ship, maintain, and collaborate on real software with AI assistance."

## Total Scope

| Path | Pages |
|------|-------|
| Git in Detail | 16 (14 content + intro + index) |
| How the Web Works | 10 (8 content + intro + index) |
| Understanding Code | 15 (13 content + intro + index) |
| The Error Whisperer | 12 (10 content + intro + index) |
| Shipping | 11 (9 content + intro + index) |
| Working on a Team | 11 (9 content + intro + index) |
| **Total new pages** | **75** |

Plus:
- 6 new path configurations in `state.svelte.ts`
- ~75 new image placeholders (later converted to real images)
- 4 new reusable components

Plus cross-cutting:
- ~225-300 "Ask Your AI Agent" breakout instances across all pages
- Revised Git Basics lesson already complete (references into Git in Detail)

## Design Principles Checklist

Every page must:

- [ ] Open with the problem/situation, not the command
- [ ] Define any jargon on first use, in plain English
- [ ] Show at least one "if you're thinking X, you need Y" signpost
- [ ] Include 2-5 "How You Might Ask Your AI Agent" examples for each major concept
- [ ] Mark image locations with descriptive placeholders
- [ ] End with a clear "next up" suggestion and "return to index" option
- [ ] Be readable by someone who's never touched a terminal before this course
- [ ] Include real-world scenario examples ("You're working on a PR and...")
- [ ] Be slightly tongue-in-cheek without being smug
- [ ] Not teach end-to-end execution — teach concepts + "ask your AI"

## Open Questions for Later

Once Git in Detail is done and patterns are established:

1. Do we want a "Path Picker" home page where users see all 6 new paths and pick where to start?
2. Do we need a "search across all paths" feature for users looking for a specific concept?
3. Should paths be versioned (e.g., "Git in Detail v2 for Git 2.50+")?
4. Do we eventually need a Spanish/French/etc. version? (Probably not v1)
5. Do we link into specific pages from Git Basics, or keep the entry point at the path index?

These don't block the work. They're future considerations.
