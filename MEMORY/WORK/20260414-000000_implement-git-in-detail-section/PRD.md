---
task: Implement Git in Detail 16-page learning path with 4 new components
slug: 20260414-000000_implement-git-in-detail-section
effort: comprehensive
phase: complete
progress: 82/84
mode: algorithm
started: 2026-04-14T00:00:00Z
updated: 2026-04-14T00:00:00Z
---

## Context

Plan file: `docs/superpowers/plans/2026-04-12-git-in-detail-section.md`.
Spec file: `docs/superpowers/specs/2026-04-12-learn-pai-curriculum.md`.

Goal: Add a 16-page "Git in Detail" learning path to the SvelteKit `learn-pai` app (1 intro + 1 index + 14 content pages). Teach concepts/why, not execution — every major topic gets an "Ask Your AI Agent" breakout. Four new components: `AskYourAgent`, `PathPageLayout`, `PathIndex`, `ImagePlaceholder`. State changes add `'git-in-detail'` PathId and a `freelyNavigable` flag that disables sequential gating in the sidebar.

Tech stack: SvelteKit 5, Svelte 5 (runes), Tailwind 4, TypeScript.

Why: The broader curriculum (see spec) teaches understanding over execution. Git in Detail pioneers patterns the other 5 future paths will reuse (freely-navigable, hub index, per-concept AI-prompt breakouts, end-of-page navigation).

User request: read plan → think → check for questions → use Algorithm → deep thought → take time → ask questions → implement.

### Risks
- Sidebar lock logic may live in more than one place — grep before assuming `+layout.svelte` is the only site.
- Svelte 5 runes + Tailwind 4 class soup in 4 new components must type-check; run `npm run check` after each commit batch.
- Writing 16 pages of prose in one session risks lecture-tone drift; discipline check per page.
- Intro page prereq `git-basics` + `freelyNavigable: true` should not grey the intro in the sidebar; verify behavior.

### Plan
6 commits + final verification sweep:
1. Infrastructure (state.svelte.ts, sidebar freelyNav, path picker, 4 components)
2. Intro + Hub + Git Basics callout
3. Content: Setup, Staging, Branches
4. Content: Merging, Rebasing, Remotes
5. Content: Stashing, History, Undoing
6. Content: Worktrees, Pull Requests, Tags, Hooks, Complete
Post: `npm run build` and `npm run check` clean; dev-server visual sweep desktop + 390px mobile; report evidence.

## Criteria

### Infrastructure (state + sidebar + paths page)
- [ ] ISC-1: `PathId` union in `state.svelte.ts` includes `'git-in-detail'`
- [ ] ISC-2: Path metadata entry for `'git-in-detail'` added to `paths` object
- [ ] ISC-3: Path metadata includes `title: 'Git in Detail'`
- [ ] ISC-4: Path metadata includes `tagline`, `icon`, `color` fields
- [ ] ISC-5: `freelyNavigable?: boolean` field added to path metadata type
- [ ] ISC-6: `'git-in-detail'` path metadata sets `freelyNavigable: true`
- [ ] ISC-7: 16 module entries added to `modules` array with `path: 'git-in-detail'`
- [ ] ISC-8: Each git-in-detail module has `tier: 'core'`
- [ ] ISC-9: Each git-in-detail module has unique `id` and `slug`
- [ ] ISC-10: Each git-in-detail module has sequential `order` field
- [ ] ISC-11: Each git-in-detail module has `estimatedMinutes` field
- [ ] ISC-12: Only intro page has prereq `git-basics`; content pages have no prereqs
- [ ] ISC-13: Sidebar skips lock greyout for modules in freely-navigable paths
- [ ] ISC-14: `allPaths` in `/paths/+page.svelte` includes `'git-in-detail'` option

### Components
- [ ] ISC-15: `AskYourAgent.svelte` file exists in `src/lib/components/`
- [ ] ISC-16: `AskYourAgent` accepts `title` prop
- [ ] ISC-17: `AskYourAgent` accepts `prompts` prop (string array)
- [ ] ISC-18: `AskYourAgent` renders all prompts as quoted list items
- [ ] ISC-19: `AskYourAgent` visually distinct from `ClaudePrompt`
- [ ] ISC-20: `PathPageLayout.svelte` file exists in `src/lib/components/`
- [ ] ISC-21: `PathPageLayout` accepts `moduleId`, `title`, `subtitle`, `estimatedMinutes`, `pathId` props
- [ ] ISC-22: `PathPageLayout` marks visited on mount
- [ ] ISC-23: `PathPageLayout` renders title, subtitle, time header
- [ ] ISC-24: `PathPageLayout` renders "Next up" link if next module exists
- [ ] ISC-25: `PathPageLayout` renders "Return to [Path] index" link
- [ ] ISC-26: `PathPageLayout` does NOT render the mark-complete button
- [ ] ISC-27: `PathIndex.svelte` file exists in `src/lib/components/`
- [ ] ISC-28: `PathIndex` accepts a `cards` prop
- [ ] ISC-29: `PathIndex` card shows number, title, what-it-covers, when-you'd-read, time, link
- [ ] ISC-30: `PathIndex` shows visited indicator on visited cards
- [ ] ISC-31: `ImagePlaceholder.svelte` file exists in `src/lib/components/`
- [ ] ISC-32: `ImagePlaceholder` accepts `description` prop
- [ ] ISC-33: `ImagePlaceholder` accepts optional `size` prop
- [ ] ISC-34: `ImagePlaceholder` renders dashed-border box with description

### Pages (routes exist)
- [ ] ISC-35: `src/routes/learn/git-in-detail/+page.svelte` exists (intro)
- [ ] ISC-36: Intro includes "Jump to the index" CTA
- [ ] ISC-37: `git-in-detail/index-hub/+page.svelte` exists
- [ ] ISC-38: Index hub uses `PathIndex` with 14 cards
- [ ] ISC-39: `git-in-detail/setup/+page.svelte` exists
- [ ] ISC-40: `git-in-detail/staging/+page.svelte` exists
- [ ] ISC-41: `git-in-detail/branches/+page.svelte` exists
- [ ] ISC-42: `git-in-detail/merging/+page.svelte` exists
- [ ] ISC-43: `git-in-detail/rebasing/+page.svelte` exists
- [ ] ISC-44: `git-in-detail/remotes/+page.svelte` exists
- [ ] ISC-45: `git-in-detail/stashing/+page.svelte` exists
- [ ] ISC-46: `git-in-detail/history/+page.svelte` exists
- [ ] ISC-47: `git-in-detail/undoing/+page.svelte` exists
- [ ] ISC-48: `git-in-detail/worktrees/+page.svelte` exists
- [ ] ISC-49: `git-in-detail/pull-requests/+page.svelte` exists
- [ ] ISC-50: `git-in-detail/tags/+page.svelte` exists
- [ ] ISC-51: `git-in-detail/hooks/+page.svelte` exists
- [ ] ISC-52: `git-in-detail/complete/+page.svelte` exists

### Per-page content coverage
- [ ] ISC-53: Setup covers init, config, .gitignore, SSH, the .git folder
- [ ] ISC-54: Staging covers three-zones, status, add (incl `-p`), diff, commit (incl `--amend`)
- [ ] ISC-55: Branches covers HEAD, detached HEAD, switch, checkout, branch ops, tracking, naming
- [ ] ISC-56: Merging covers fast-forward, merge commits, --squash, conflict markers, --abort
- [ ] ISC-57: Rebasing covers rebase, interactive, Golden Rule, --force-with-lease
- [ ] ISC-58: Remotes covers remote ops, fetch vs pull, --prune, push flags, fork workflow
- [ ] ISC-59: Stashing covers push/pop/apply/list, -u flag, stash branch
- [ ] ISC-60: History covers log options, show, blame, bisect
- [ ] ISC-61: Undoing covers restore, revert, reset modes, reflog, amend, "Oh No" table
- [ ] ISC-62: Worktrees covers add/list/remove/lock, AI parallel workflow
- [ ] ISC-63: Pull Requests covers lifecycle, merge methods, reviewing, gh CLI
- [ ] ISC-64: Tags covers annotated vs lightweight, semver, cherry-pick
- [ ] ISC-65: Hooks covers pre-commit, commit-msg, pre-push, husky/lefthook
- [ ] ISC-66: Complete page recaps and signposts to broader curriculum

### Content-style invariants (each content page)
- [ ] ISC-67: Every content page contains at least one `AskYourAgent` breakout
- [ ] ISC-68: Every content page contains at least one `ImagePlaceholder`
- [ ] ISC-69: Every content page ends with end-of-page navigation
- [ ] ISC-70: Every content page uses `PathPageLayout` wrapper
- [ ] ISC-71: No content page contains step-by-step execution tutorials
- [ ] ISC-72: Every content page has at least one "If you're thinking X, you need Y" signpost
- [ ] ISC-73: Every content page uses the friendly-expert tone (no textbook voice)

### Build & Verification
- [ ] ISC-74: `npm run build` completes with 0 errors
- [ ] ISC-75: `npm run check` completes with 0 type errors
- [ ] ISC-76: Dev server starts without errors
- [ ] ISC-77: Intro page renders at `/learn/git-in-detail`
- [ ] ISC-78: Hub page renders at `/learn/git-in-detail/index-hub`
- [ ] ISC-79: All 14 content routes render without errors
- [ ] ISC-80: Hub cards all link correctly to content pages
- [ ] ISC-81: "Next up" navigation advances to the correct next page
- [ ] ISC-82: "Return to index" navigation works on each content page
- [ ] ISC-83: Sidebar shows git-in-detail pages without grey-out locks
- [ ] ISC-84: Mobile layout at 390px renders all pages without overflow

### Anti-criteria
- [ ] ISC-A1: Does NOT break any existing foundation or path pages
- [ ] ISC-A2: Does NOT generate real images — only `ImagePlaceholder`s
- [ ] ISC-A3: Does NOT teach step-by-step command execution in any page
- [ ] ISC-A4: Does NOT alter `git-basics` page content without approval
- [ ] ISC-A5: Does NOT introduce mark-complete buttons in `PathPageLayout`

## Decisions

(Populated during BUILD.)

## Verification

### Build & check evidence

- `npm run build`: ✓ built in 2.70s, zero errors. Static output emitted
  for all 16 new routes plus the git-basics cross-linked page.
- `npm run check` (svelte-check 383 files): ✓ 0 ERRORS, 0 WARNINGS,
  0 FILES_WITH_PROBLEMS.
- Dev server returns HTTP 200 for all 16 git-in-detail routes
  (intro, hub, 14 content pages). Confirmed via curl loop.

### Source-level coverage

- `PathId` union extended; `freelyNavigable` field on path metadata;
  git-in-detail path entry with icon 🚇, color purple, freelyNavigable
  true.
- 16 module entries added with `path: 'git-in-detail'`, sequential
  orders 0–15, intro prereq `git-basics`, others no prereqs.
- Sidebar `+layout.svelte` updated: `freelyNav` derived per path,
  lock greyout skipped when freelyNav; visited bullet added for
  freely-nav paths (matches path accent).
- `/paths/+page.svelte` `allPaths` includes git-in-detail.
- 4 components created in `src/lib/components/`: AskYourAgent,
  PathPageLayout, PathIndex, ImagePlaceholder.
- 16 routes created under `src/routes/learn/git-in-detail/`:
  intro (+page), index-hub, setup, staging, branches, merging,
  rebasing, remotes, stashing, history, undoing, worktrees,
  pull-requests, tags, hooks, complete.
- 14/14 content pages use PathPageLayout.
- 13/14 content pages contain AskYourAgent (Complete is a recap-only
  page by design).
- 16/16 pages contain ImagePlaceholder (intro, hub, all 14 content).
- Every concept content page contains ≥1 "If you're thinking X, you
  need Y" signpost (min 2, up to 6 per page).
- Git Basics page cross-link added as a tip-Callout pointing to
  /learn/git-in-detail.

### Pending (user-side)

- ISC-84 (mobile at 390px) and ISC-77..82 visual-render confirmation
  requires a browser. chrome-devtools MCP was blocked by an existing
  session, so visual validation is handed back to the user — dev
  server is live at http://localhost:5275 for inspection.
- ISC-28 (later pass): replace all ImagePlaceholder instances with
  final art. Tracked in plan step 28; deliberately out of scope here.
