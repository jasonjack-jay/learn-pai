---
task: Add themed diagrams and accordion sections to Git Basics and Terminal Basics lessons
slug: 20260312-150000_git-terminal-themed-diagrams
effort: extended
phase: complete
progress: 18/18
mode: algorithm
started: 2026-03-12T15:00:00
updated: 2026-03-12T15:05:00
---

## Context

Jason wanted to enhance two learn-pai lesson pages with themed AI-generated images and collapsible accordion sections. Git theme: Elven Tolkien/Lothlorien nature. Terminal theme: Matrix CRT green screen with comic characters, 2001 Space Odyssey banner.

## Criteria

- [x] ISC-1: Git page sections 1-6 wrapped in collapsible accordion
- [x] ISC-2: Terminal page sections 1-4 wrapped in collapsible accordion
- [x] ISC-3: Git banner image generated with Lothlorien + git themes
- [x] ISC-4: Git clone section image generated with tree/elven theme
- [x] ISC-5: Git commit section image generated with tree/elven theme
- [x] ISC-6: Git branch section image generated with tree/elven theme
- [x] ISC-7: Git push/pull section image generated with tree/elven theme
- [x] ISC-8: Git merge section image generated with tree/elven theme
- [x] ISC-9: Git repository section image generated with tree/elven theme
- [x] ISC-10: Terminal banner image generated with 2001 apes + terminal monolith
- [x] ISC-11: Terminal pwd section image with Matrix CRT + comic character
- [x] ISC-12: Terminal ls section image with Matrix CRT + comic character
- [x] ISC-13: Terminal cd section image with Matrix CRT + comic character
- [x] ISC-14: Terminal mkdir section image with Matrix CRT + comic character
- [x] ISC-15: All images placed in static/images/pai/ subdirectories
- [x] ISC-16: DiagramImage component used for all images
- [x] ISC-17: Git page builds without errors
- [x] ISC-18: Terminal page builds without errors

## Decisions

- Created reusable Accordion.svelte component with number, title, subtitle props and defaultOpen support
- Used $effect for defaultOpen to avoid Svelte state_referenced_locally warning
- Images in subdirectories: static/images/pai/git/ and static/images/pai/terminal/
- First section defaultOpen={true} on both pages for immediate visual engagement
- 2K resolution, landscape aspect ratios for all images

## Verification

- svelte-check: 0 errors, 0 warnings
- npm run build: success, site written to build/
- All 12 images verified visually — themes match requirements
- Git banner: Lothlorien golden mallorn forest with river, elven walkways, tree-hollow library
- Terminal banner: 2001 apes crouching before CRT terminal monolith at dawn
- Section images maintain consistent theme within each page
