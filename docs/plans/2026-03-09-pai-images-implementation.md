# PAI Images Integration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 23 PAI diagram images from the PAI repo into the learn-pai site across 13 lesson pages.

**Architecture:** Copy images to `static/images/pai/`, reference via `{base}/images/pai/<filename>` in Svelte pages. Each image is inserted at a natural breakpoint in the existing content — after a section heading or explanatory paragraph, never replacing content.

**Tech Stack:** SvelteKit, static assets, `{base}` from `$app/paths` for GitHub Pages base path.

---

### Task 1: Copy images to static directory

**Files:**
- Create: `static/images/pai/` (directory + 23 PNG files)

**Step 1: Create the directory and copy all images**

```bash
mkdir -p static/images/pai
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-logo-v7.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-eli5-diagram.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-what-are-we-doing-v4.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-unique-components-diagram.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-human-centered-v3.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-context-first-v2.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-platform-independence-diagram.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-component-4-ai-installation.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-primitive-telos.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-primitive-user-system-separation.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-skill-personalization.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-component-2-skill-system.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-component-3-memory-system.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-component-6-hook-system.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-component-1-assistant-vs-agent.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-primitive-customization.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-component-5-security-system.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-component-8-notification-system.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-component-9-voice-system.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-component-7-terminal-ui.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-algorithm-diagram.png static/images/pai/
cp /Users/jason.jack/Dev/FORKS/TP/Personal_AI_Infrastructure/images/pai-architecture-diagram.png static/images/pai/
```

**Step 2: Verify all 23 images are present**

Run: `ls static/images/pai/ | wc -l`
Expected: `22` (22 unique files — `pai-primitive-user-system-separation.png` is used on 2 pages but only 1 copy needed)

**Step 3: Commit**

```bash
git add static/images/pai/
git commit -m "feat: add PAI diagram images from upstream repo"
```

---

### Task 2: Create a reusable DiagramImage component

**Files:**
- Create: `src/lib/components/DiagramImage.svelte`

**Step 1: Create the component**

This component provides consistent image styling across all pages — responsive sizing, rounded corners, alt text, and optional caption.

```svelte
<script lang="ts">
	import { base } from '$app/paths';

	interface Props {
		src: string;
		alt: string;
		caption?: string;
	}

	let { src, alt, caption }: Props = $props();
</script>

<figure class="my-8">
	<img
		src="{base}/images/pai/{src}"
		{alt}
		class="w-full rounded-xl border border-gray-200 shadow-sm"
		loading="lazy"
	/>
	{#if caption}
		<figcaption class="text-center text-xs text-gray-400 mt-2">{caption}</figcaption>
	{/if}
</figure>
```

**Step 2: Verify it builds**

Run: `cd /Users/jason.jack/Dev/COWORD/learn-pai && npm run build`
Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
git add src/lib/components/DiagramImage.svelte
git commit -m "feat: add DiagramImage component for PAI diagrams"
```

---

### Task 3: Add images to home page and paths page

**Files:**
- Modify: `src/routes/+page.svelte` — add logo to hero section
- Modify: `src/routes/paths/+page.svelte` — add logo above heading

**Step 1: Edit home page**

In `src/routes/+page.svelte`, add the logo above the "Learn PAI" heading. Add `import { base } from '$app/paths';` (already imported). Insert before the `<h1>`:

```svelte
<img
	src="{base}/images/pai/pai-logo-v7.png"
	alt="PAI Logo"
	class="w-16 h-16 mx-auto mb-4"
/>
```

**Step 2: Edit paths page**

In `src/routes/paths/+page.svelte`, add logo above the heading. Insert before `<h1>`:

```svelte
<img
	src="{base}/images/pai/pai-logo-v7.png"
	alt="PAI Logo"
	class="w-12 h-12 mx-auto mb-3"
/>
```

**Step 3: Verify dev server renders images**

Run: `npm run dev`
Check: Navigate to `/` and `/paths`, confirm logo appears.

**Step 4: Commit**

```bash
git add src/routes/+page.svelte src/routes/paths/+page.svelte
git commit -m "feat: add PAI logo to home and paths pages"
```

---

### Task 4: Add images to "What is PAI?" page

**Files:**
- Modify: `src/routes/learn/foundation/what-is-pai/+page.svelte`

**Step 1: Add imports and images**

Add `import DiagramImage from '$lib/components/DiagramImage.svelte';` to the script block.

Insert after `<h2>What makes PAI different</h2>` paragraph (line 23):

```svelte
<DiagramImage src="pai-what-are-we-doing-v4.png" alt="What PAI is building — the vision for personal AI infrastructure" caption="The PAI vision: from chatbots to personal AI infrastructure" />
```

Insert after `<h2>AI has been evolving in stages</h2>` section, before `<h2>What makes PAI different</h2>` (after line 21):

```svelte
<DiagramImage src="pai-eli5-diagram.png" alt="The AI Evolution — from chatbots to agents to personal AI" caption="Three levels of AI: chatbots, agents, and personal infrastructure" />
```

**Step 2: Verify**

Run dev server, navigate to `/learn/foundation/what-is-pai`, confirm both images render correctly between text sections.

**Step 3: Commit**

```bash
git add src/routes/learn/foundation/what-is-pai/+page.svelte
git commit -m "feat: add PAI evolution diagrams to What is PAI page"
```

---

### Task 5: Add image to "PAI vs Claude Code" page

**Files:**
- Modify: `src/routes/learn/foundation/pai-vs-claude/+page.svelte`

**Step 1: Add import and image**

Add `import DiagramImage from '$lib/components/DiagramImage.svelte';` to script block.

Insert after `<h2>What PAI adds</h2>` (before the feature list, after line 31):

```svelte
<DiagramImage src="pai-unique-components-diagram.png" alt="PAI Primitives — the components that make PAI more than Claude Code" caption="PAI's unique components layered on top of Claude Code" />
```

**Step 2: Verify**

Check `/learn/foundation/pai-vs-claude` — image should appear between "What PAI adds" heading and the feature descriptions.

**Step 3: Commit**

```bash
git add src/routes/learn/foundation/pai-vs-claude/+page.svelte
git commit -m "feat: add PAI primitives diagram to PAI vs Claude page"
```

---

### Task 6: Add images to "The 16 Principles" page

**Files:**
- Modify: `src/routes/learn/foundation/principles/+page.svelte`

**Step 1: Add import and images**

Add `import DiagramImage from '$lib/components/DiagramImage.svelte';` to script block.

Insert after `<h2>The big themes</h2>` (line 64), after the "You are the priority" paragraph:

```svelte
<DiagramImage src="pai-human-centered-v3.png" alt="Human-centered design — PAI puts you at the center" caption="Principle theme: You are the priority" />
```

After the "Structure beats cleverness" paragraph:

```svelte
<DiagramImage src="pai-context-first-v2.png" alt="Context-first approach — structure over clever prompts" caption="Principle theme: Context and structure first" />
```

After the "Production-grade engineering" paragraph:

```svelte
<DiagramImage src="pai-platform-independence-diagram.png" alt="Platform independence — PAI works across environments" caption="Principle theme: Platform-independent, production-grade infrastructure" />
```

**Step 2: Verify**

Check `/learn/foundation/principles` — three images should appear interspersed with the theme descriptions.

**Step 3: Commit**

```bash
git add src/routes/learn/foundation/principles/+page.svelte
git commit -m "feat: add principle theme diagrams to 16 Principles page"
```

---

### Task 7: Add image to "Installing PAI" page

**Files:**
- Modify: `src/routes/learn/foundation/installation/+page.svelte`

**Step 1: Add import and image**

Add `import DiagramImage from '$lib/components/DiagramImage.svelte';` to script block.

Insert after `<h2>Prerequisites</h2>` paragraph (after line 29):

```svelte
<DiagramImage src="pai-component-4-ai-installation.png" alt="AI-based installation process — PAI's intelligent setup" caption="PAI's AI-powered installation detects your environment and configures automatically" />
```

**Step 2: Verify**

Check `/learn/foundation/installation` — image appears after the prerequisites intro.

**Step 3: Commit**

```bash
git add src/routes/learn/foundation/installation/+page.svelte
git commit -m "feat: add installation diagram to Installing PAI page"
```

---

### Task 8: Add image to "Meet TELOS" page

**Files:**
- Modify: `src/routes/learn/know-me/telos-intro/+page.svelte`

**Step 1: Add import and image**

Add `import DiagramImage from '$lib/components/DiagramImage.svelte';` to script block.

Insert after the "TELOS is PAI's solution" paragraph (after line 18), before `<h2>The 10 TELOS files</h2>`:

```svelte
<DiagramImage src="pai-primitive-telos.png" alt="TELOS — Deep Goal Understanding system" caption="TELOS: 10 structured context files that teach AI who you are" />
```

**Step 2: Verify**

Check `/learn/know-me/telos-intro` — image appears between intro and the 10-file grid.

**Step 3: Commit**

```bash
git add src/routes/learn/know-me/telos-intro/+page.svelte
git commit -m "feat: add TELOS diagram to Meet TELOS page"
```

---

### Task 9: Add images to "Seeing Context in Action" page

**Files:**
- Modify: `src/routes/learn/know-me/context-in-action/+page.svelte`

**Step 1: Add import and images**

Add `import DiagramImage from '$lib/components/DiagramImage.svelte';` to script block.

Insert after `<h2>Context flows through everything</h2>` (after line 58):

```svelte
<DiagramImage src="pai-primitive-user-system-separation.png" alt="User/System separation — your context lives in USER/" caption="Your TELOS files live in USER/ — safe, portable, and always loaded" />
```

Insert after the "The feedback loop" section intro (after line 75):

```svelte
<DiagramImage src="pai-skill-personalization.png" alt="Skill personalization — skills use your context for tailored output" caption="Skills read your TELOS context to personalize every interaction" />
```

**Step 2: Verify**

Check `/learn/know-me/context-in-action` — both images appear at appropriate positions.

**Step 3: Commit**

```bash
git add src/routes/learn/know-me/context-in-action/+page.svelte
git commit -m "feat: add context diagrams to Seeing Context in Action page"
```

---

### Task 10: Add images to "The Skills System" page

**Files:**
- Modify: `src/routes/learn/get-things-done/skills-overview/+page.svelte`

**Step 1: Add import and images**

Add `import DiagramImage from '$lib/components/DiagramImage.svelte';` to script block.

Insert after `<h2>What are skills?</h2>` paragraph (after line 19):

```svelte
<DiagramImage src="pai-component-2-skill-system.png" alt="PAI Skill System architecture" caption="The Skill System: 63 deterministic, versioned capabilities" />
```

Insert after the "How skills are defined" section (before the final `<Callout>`, after line 108):

```svelte
<DiagramImage src="pai-component-3-memory-system.png" alt="PAI Memory System — hot, warm, and cold tiers" caption="The Memory System supports skills with context from past interactions" />
```

**Step 2: Verify**

Check `/learn/get-things-done/skills-overview` — skill system image near top, memory image near bottom.

**Step 3: Commit**

```bash
git add src/routes/learn/get-things-done/skills-overview/+page.svelte
git commit -m "feat: add skill and memory system diagrams to Skills System page"
```

---

### Task 11: Add image to "Your First Workflow" page

**Files:**
- Modify: `src/routes/learn/get-things-done/first-workflow/+page.svelte`

**Step 1: Add import and image**

Add `import DiagramImage from '$lib/components/DiagramImage.svelte';` to script block.

Insert after `<h2>What just happened under the hood</h2>` (after line 111), before the ordered list:

```svelte
<DiagramImage src="pai-component-6-hook-system.png" alt="PAI Hook System — lifecycle event automation" caption="Hooks fire at key lifecycle moments, automating context loading and workflow orchestration" />
```

**Step 2: Verify**

Check `/learn/get-things-done/first-workflow` — hook system image appears in the "under the hood" section.

**Step 3: Commit**

```bash
git add src/routes/learn/get-things-done/first-workflow/+page.svelte
git commit -m "feat: add hook system diagram to First Workflow page"
```

---

### Task 12: Add images to "The 9 Primitives" page

**Files:**
- Modify: `src/routes/learn/architecture/nine-primitives/+page.svelte`

This page has 9 sections, and 6 images map to specific primitives. Insert each image after the corresponding `<h3>` section's first paragraph.

**Step 1: Add import**

Add `import DiagramImage from '$lib/components/DiagramImage.svelte';` to script block.

**Step 2: Insert images after each primitive's intro paragraph**

After `<h3>1. Assistant vs Agent Interaction</h3>` first paragraph (after line 12):

```svelte
<DiagramImage src="pai-component-1-assistant-vs-agent.png" alt="Assistant vs Agent interaction model" caption="Persistent identity: PAI remembers you across sessions" />
```

After `<h3>4. Granular Customization</h3>` list (after line 44):

```svelte
<DiagramImage src="pai-primitive-customization.png" alt="Granular customization — six layers of personalization" caption="Six customization layers: identity, preferences, workflows, skills, hooks, memory" />
```

After `<h3>7. Hook System</h3>` Terminal example (after line 69):

```svelte
<DiagramImage src="pai-component-7-terminal-ui.png" alt="Terminal-based UI" caption="PAI's terminal interface with hook-driven automation" />
```

After `<h3>8. Security System</h3>` Callout (after line 73):

```svelte
<DiagramImage src="pai-component-5-security-system.png" alt="Security System — command validation and policy enforcement" caption="Every command validated against security policies before execution" />
```

After the security image, add notification system image:

```svelte
<DiagramImage src="pai-component-8-notification-system.png" alt="Notification System — ambient awareness through alerts" caption="Notification system for ambient awareness during long-running tasks" />
```

After `<h3>9. Voice System</h3>` Terminal example (after line 78):

```svelte
<DiagramImage src="pai-component-9-voice-system.png" alt="Voice System — ElevenLabs text-to-speech integration" caption="Voice feedback provides ambient awareness while you multitask" />
```

**Step 3: Verify**

Check `/learn/architecture/nine-primitives` — 6 images interspersed with primitive descriptions.

**Step 4: Commit**

```bash
git add src/routes/learn/architecture/nine-primitives/+page.svelte
git commit -m "feat: add primitive diagrams to 9 Primitives page"
```

---

### Task 13: Add image to "USER/ vs SYSTEM/" page

**Files:**
- Modify: `src/routes/learn/architecture/user-system/+page.svelte`

**Step 1: Add import and image**

Add `import DiagramImage from '$lib/components/DiagramImage.svelte';` to script block.

Insert after `<h2>Two worlds, cleanly separated</h2>` paragraph (after line 8):

```svelte
<DiagramImage src="pai-primitive-user-system-separation.png" alt="User/System separation — your files vs PAI infrastructure" caption="USER/ holds your personalization, SYSTEM/ holds PAI infrastructure — never mixed" />
```

**Step 2: Verify**

Check `/learn/architecture/user-system` — image appears right after the intro.

**Step 3: Commit**

```bash
git add src/routes/learn/architecture/user-system/+page.svelte
git commit -m "feat: add user/system separation diagram to USER vs SYSTEM page"
```

---

### Task 14: Add image to "The Algorithm v3.6" page

**Files:**
- Modify: `src/routes/learn/architecture/algorithm/+page.svelte`

**Step 1: Add import and image**

Add `import DiagramImage from '$lib/components/DiagramImage.svelte';` to script block.

Insert after `<h2>PAI's universal problem-solving method</h2>` paragraph (after line 8), before the step list:

```svelte
<DiagramImage src="pai-algorithm-diagram.png" alt="The Algorithm — Observe, Think, Plan, Build, Execute, Verify, Learn" caption="The Algorithm: PAI's 7-step problem-solving loop" />
```

**Step 2: Verify**

Check `/learn/architecture/algorithm` — diagram appears between intro text and the step-by-step breakdown.

**Step 3: Commit**

```bash
git add src/routes/learn/architecture/algorithm/+page.svelte
git commit -m "feat: add algorithm diagram to Algorithm v3.6 page"
```

---

### Task 15: Add image to "How It All Fits Together" page

**Files:**
- Modify: `src/routes/learn/architecture/how-it-fits/+page.svelte`

**Step 1: Add import and image**

Add `import DiagramImage from '$lib/components/DiagramImage.svelte';` to script block.

Insert after `<h2>The system diagram</h2>` (line 79), before the bullet list:

```svelte
<DiagramImage src="pai-architecture-diagram.png" alt="PAI complete architecture diagram — all 9 primitives working together" caption="The complete PAI architecture: every primitive connected" />
```

**Step 2: Verify**

Check `/learn/architecture/how-it-fits` — architecture diagram appears in the system diagram section.

**Step 3: Commit**

```bash
git add src/routes/learn/architecture/how-it-fits/+page.svelte
git commit -m "feat: add full architecture diagram to How It All Fits page"
```

---

### Task 16: Final verification — full build and spot-check

**Step 1: Run full build**

Run: `cd /Users/jason.jack/Dev/COWORD/learn-pai && npm run build`
Expected: Build succeeds with no errors.

**Step 2: Run dev server and spot-check 3 pages**

Run: `npm run dev`
Check these pages visually:
- `/learn/foundation/what-is-pai` — 2 images
- `/learn/architecture/nine-primitives` — 6 images
- `/learn/architecture/how-it-fits` — 1 image

**Step 3: Verify image count**

Run: `grep -r "DiagramImage" src/routes/ | wc -l`
Expected: 23 (one per image placement, some pages have multiple)

**Step 4: Final commit if any cleanup needed**

Only if corrections are needed from spot-checking.
