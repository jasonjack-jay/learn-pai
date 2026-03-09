# PAI Images Integration Design

## Goal

Integrate 23 diagram images from the PAI GitHub repo into the learn-pai educational site. Every image gets a home in the most relevant lesson page.

## Source

Local copy at `/Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/`

## Destination

Copy images into `/Users/jason.jack/Dev/COWORD/learn-pai/static/images/pai/` so they're served as static assets at `/learn-pai/images/pai/<filename>`.

## Image-to-Page Mapping

### Foundation Modules

| Image | Target Page | Placement |
|-------|------------|-----------|
| `pai-logo-v7.png` | `/` (home) + `/paths` | Hero section branding |
| `pai-eli5-diagram.png` | `/learn/foundation/what-is-pai` | After "three levels of AI" section |
| `pai-what-are-we-doing-v4.png` | `/learn/foundation/what-is-pai` | Opening section — sets context |
| `pai-unique-components-diagram.png` | `/learn/foundation/pai-vs-claude` | Shows PAI primitives vs vanilla Claude |
| `pai-human-centered-v3.png` | `/learn/foundation/principles` | Human-centered principle section |
| `pai-context-first-v2.png` | `/learn/foundation/principles` | Context-first principle section |
| `pai-platform-independence-diagram.png` | `/learn/foundation/principles` | Platform independence section |
| `pai-component-4-ai-installation.png` | `/learn/foundation/installation` | Installation process overview |

### Path A: Know-Me

| Image | Target Page | Placement |
|-------|------------|-----------|
| `pai-primitive-telos.png` | `/learn/know-me/telos-intro` | TELOS overview diagram |
| `pai-primitive-user-system-separation.png` | `/learn/know-me/context-in-action` | How USER/ files power context |
| `pai-skill-personalization.png` | `/learn/know-me/context-in-action` | Skills using personal context |

### Path B: Get-Things-Done

| Image | Target Page | Placement |
|-------|------------|-----------|
| `pai-component-2-skill-system.png` | `/learn/get-things-done/skills-overview` | Skill system architecture |
| `pai-component-3-memory-system.png` | `/learn/get-things-done/skills-overview` | Memory supports skill context |
| `pai-component-6-hook-system.png` | `/learn/get-things-done/first-workflow` | Hooks in workflow execution |

### Path C: Architecture

| Image | Target Page | Placement |
|-------|------------|-----------|
| `pai-component-1-assistant-vs-agent.png` | `/learn/architecture/nine-primitives` | Primitive #1 |
| `pai-primitive-customization.png` | `/learn/architecture/nine-primitives` | Primitive #4 |
| `pai-component-5-security-system.png` | `/learn/architecture/nine-primitives` | Primitive #8 |
| `pai-component-8-notification-system.png` | `/learn/architecture/nine-primitives` | Notification system |
| `pai-component-9-voice-system.png` | `/learn/architecture/nine-primitives` | Primitive #9 |
| `pai-component-7-terminal-ui.png` | `/learn/architecture/nine-primitives` | Terminal UI |
| `pai-primitive-user-system-separation.png` | `/learn/architecture/user-system` | Direct topic match |
| `pai-algorithm-diagram.png` | `/learn/architecture/algorithm` | Algorithm v3.6 diagram |
| `pai-architecture-diagram.png` | `/learn/architecture/how-it-fits` | Full system architecture |

## Implementation Approach

1. Copy all 23 images to `static/images/pai/`
2. Reference via `{base}/images/pai/<filename>` in each page (SvelteKit base path for GitHub Pages)
3. Add images with appropriate alt text, responsive sizing, and optional click-to-zoom
4. Keep existing page content intact — images supplement, not replace

## Pages Without Images (7)

These pages have no matching diagram and will remain image-free for now:
- `/learn/foundation/terminal-basics` — general terminal concepts
- `/learn/foundation/git-basics` — general git concepts
- `/learn/know-me/mission-goals` — hands-on editing
- `/learn/know-me/projects-beliefs` — hands-on editing
- `/learn/know-me/models-strategies` — hands-on editing
- `/learn/know-me/narratives-ideas` — hands-on editing
- `/learn/get-things-done/skill-hierarchy` — no specific diagram exists
- `/learn/get-things-done/workflows` — no specific diagram exists

## Excluded Images

- `pai-logo.png` — superseded by v7
