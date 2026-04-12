# Git Basics Page Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the Git Basics lesson from absolute first principles (no assumed knowledge of version control), replace the banner with an SVG railway overview diagram, and replace the six section images with Nanobanana-generated HHGTTG BBC-style illustrations showing railway track flows with friendly tiny aliens.

**Architecture:** Banner = one inline SVG Svelte component showing the full git flow. Section images = six PNG files generated via Nanobanana, stored in `static/images/pai/git/`, displayed with the existing `DiagramImage` component. Page content is a full rewrite of the prose sections.

**Tech Stack:** SvelteKit 5, Svelte 5 (runes), inline SVG, Nanobanana (Gemini image generation)

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/lib/components/GitRailwayBanner.svelte` | SVG overview banner — full git flow (commit → branch → push → merge) |
| Replace | `static/images/pai/git/git-banner.png` | Nanobanana: HHGTTG overview image (backup — may not be needed) |
| Replace | `static/images/pai/git/git-repository.png` | Nanobanana: HHGTTG repository concept |
| Replace | `static/images/pai/git/git-clone.png` | Nanobanana: HHGTTG clone concept |
| Replace | `static/images/pai/git/git-commit.png` | Nanobanana: HHGTTG commit concept |
| Replace | `static/images/pai/git/git-branch.png` | Nanobanana: HHGTTG branch concept |
| Replace | `static/images/pai/git/git-push-pull.png` | Nanobanana: HHGTTG push/pull concept |
| Replace | `static/images/pai/git/git-merge.png` | Nanobanana: HHGTTG merge concept |
| Modify | `src/routes/learn/foundation/git-basics/+page.svelte` | Full content rewrite + new image/diagram components |

The old PNG files are **overwritten in place** — same filenames, new art.

---

## Task 1: Generate the six section images with Nanobanana

Run each command from the project root. Use `--size 1344x768` (16:9 landscape) and `--resolution 2K`. All prompts follow the same visual brief: BBC Hitchhiker's Guide to the Galaxy 1981 TV show animation style — bold graphic lines, flat retro colours, small friendly aliens with big expressive eyes, railway track lines showing the flow of the concept.

### Image 1 — Repository

```bash
python3 ~/.claude/plugins/cache/claude-code-settings/nanobanana-skill/1.0.1/skills/nanobanana-skill/nanobanana.py \
  --prompt "BBC Hitchhiker's Guide to the Galaxy 1981 TV show animation style. A cosy railway goods shed built inside a hollow tree trunk. Inside are neat rows of glowing snapshot-globes on shelves, each containing a tiny frozen scene. A small friendly alien with enormous curious eyes and a clipboard stands at the entrance, looking proudly organised and knowledgeable, one arm gesturing inside. Railway tracks lead into the shed from the left. Bold graphic lines, flat retro colours, warm golden light from the globes, dark rich background. Caption area at bottom reads: Repository — every save, kept forever" \
  --size 1344x768 \
  --resolution 2K \
  --output "static/images/pai/git/git-repository.png"
```

### Image 2 — Clone

```bash
python3 ~/.claude/plugins/cache/claude-code-settings/nanobanana-skill/1.0.1/skills/nanobanana-skill/nanobanana.py \
  --prompt "BBC Hitchhiker's Guide to the Galaxy 1981 TV show animation style. A small friendly alien with big excited eyes operates a duplicating machine at a railway junction. One track leads upward to a glowing floating cloud station labelled GitHub. A second track leads to a freshly-assembled copy of the project arriving on a workbench on the right. The alien has multiple arms working the controls and a satisfied expression — they've got this. Bold graphic lines, flat retro colours, dark space-ish background, bright accent colours on the tracks and machine." \
  --size 1344x768 \
  --resolution 2K \
  --output "static/images/pai/git/git-clone.png"
```

### Image 3 — Commit

```bash
python3 ~/.claude/plugins/cache/claude-code-settings/nanobanana-skill/1.0.1/skills/nanobanana-skill/nanobanana.py \
  --prompt "BBC Hitchhiker's Guide to the Galaxy 1981 TV show animation style. A railway timeline stretches left to right with four glowing station stops. A small friendly alien in a station master uniform stands at the newest stop, holding a rubber stamp and looking delighted — they just had a great idea and are stamping a document. Above each previous station stop floats a tiny snow-globe showing a frozen scene from the past. Bold graphic railway track lines, flat retro colours, satisfying sense of history being preserved." \
  --size 1344x768 \
  --resolution 2K \
  --output "static/images/pai/git/git-commit.png"
```

### Image 4 — Branch

```bash
python3 ~/.claude/plugins/cache/claude-code-settings/nanobanana-skill/1.0.1/skills/nanobanana-skill/nanobanana.py \
  --prompt "BBC Hitchhiker's Guide to the Galaxy 1981 TV show animation style. A railway junction where one track splits into two. A small friendly alien stands at the switch lever, eyes wide with inspiration, pointing enthusiastically at the branching track — clearly brimming with a new idea. The straight track is labelled main in retro block letters. The forking track goes off to the right with a sense of adventure and possibility. Bold graphic lines, flat colours, the two tracks in different colours, dark background." \
  --size 1344x768 \
  --resolution 2K \
  --output "static/images/pai/git/git-branch.png"
```

### Image 5 — Push and Pull

```bash
python3 ~/.claude/plugins/cache/claude-code-settings/nanobanana-skill/1.0.1/skills/nanobanana-skill/nanobanana.py \
  --prompt "BBC Hitchhiker's Guide to the Galaxy 1981 TV show animation style. Two small friendly aliens on a two-level railway system. Upper track: one alien pushes a glowing cargo trolley upward to a floating cloud station labeled GitHub, looking purposeful and strong. Lower track: another alien pulls a trolley of fresh cargo downward toward a laptop station, looking pleased about the delivery. Bold graphic lines, flat retro colours, clear arrows showing direction, sense of cheerful collaboration." \
  --size 1344x768 \
  --resolution 2K \
  --output "static/images/pai/git/git-push-pull.png"
```

### Image 6 — Merge

```bash
python3 ~/.claude/plugins/cache/claude-code-settings/nanobanana-skill/1.0.1/skills/nanobanana-skill/nanobanana.py \
  --prompt "BBC Hitchhiker's Guide to the Galaxy 1981 TV show animation style. Two railway tracks — one straight (main, in grey), one curving in from the right (feature branch, in purple) — gracefully converging into a single unified track on the right side. A small friendly alien conductor stands at the merge point with both arms raised triumphantly, huge smile, clearly delighted this worked. A big green glowing node marks the merge point. Bold graphic lines, flat retro colours, celebratory energy." \
  --size 1344x768 \
  --resolution 2K \
  --output "static/images/pai/git/git-merge.png"
```

- [ ] **Step 1: Run Image 1** (git-repository.png) and verify file written to `static/images/pai/git/`
- [ ] **Step 2: View git-repository.png** — confirm style matches brief, aliens present, tracks visible
- [ ] **Step 3: Run Images 2–6** (clone, commit, branch, push-pull, merge)
- [ ] **Step 4: View each image** — spot-check for style consistency and clarity
- [ ] **Step 5: Re-generate any images** that missed the brief (adjust prompt if needed)

---

## Task 2: Create the SVG banner component

**Files:**
- Create: `src/lib/components/GitRailwayBanner.svelte`

The banner replaces the Elven forest image at the top of the page. It's a horizontal SVG showing the complete git story in one diagram: a main track with commits, a branch forking off, a feature branch running parallel, and a merge back in. Labels identify each concept so it acts as a visual table of contents.

```svelte
<script lang="ts">
  // No props — this is a fixed overview diagram
</script>

<figure class="my-8">
  <svg
    viewBox="0 0 760 160"
    class="w-full block rounded-xl border border-gray-200 shadow-sm bg-gray-950"
    aria-label="Git flow overview: commit, branch, push, merge"
  >
    <!-- Main track line -->
    <line x1="40" y1="60" x2="720" y2="60" stroke="#6b7280" stroke-width="3"/>

    <!-- Feature branch: forks at x=280, runs to x=560, merges at x=620 -->
    <line x1="280" y1="60" x2="380" y2="110" stroke="#818cf8" stroke-width="3"/>
    <line x1="380" y1="110" x2="560" y2="110" stroke="#818cf8" stroke-width="3"/>
    <line x1="560" y1="110" x2="620" y2="60" stroke="#818cf8" stroke-width="3"/>

    <!-- Main track commits -->
    <circle cx="80"  cy="60" r="9" fill="#4b5563"/>
    <circle cx="160" cy="60" r="9" fill="#4b5563"/>
    <circle cx="240" cy="60" r="9" fill="#4b5563"/>
    <circle cx="280" cy="60" r="9" fill="#4b5563"/>  <!-- branch point -->
    <circle cx="620" cy="60" r="11" fill="#10b981"/> <!-- merge commit -->
    <circle cx="700" cy="60" r="9" fill="#4b5563"/>

    <!-- Feature branch commits -->
    <circle cx="420" cy="110" r="9" fill="#818cf8"/>
    <circle cx="500" cy="110" r="9" fill="#818cf8"/>

    <!-- Labels -->
    <text x="80"  y="42" text-anchor="middle" font-size="10" fill="#9ca3af">commit</text>
    <text x="280" y="42" text-anchor="middle" font-size="10" fill="#a5b4fc">branch</text>
    <text x="460" y="136" text-anchor="middle" font-size="10" fill="#a5b4fc">feature work</text>
    <text x="620" y="42" text-anchor="middle" font-size="10" fill="#6ee7b7">merge</text>
    <text x="40"  y="56" font-size="10" fill="#6b7280" font-weight="600">main</text>
  </svg>
  <figcaption class="text-center text-xs text-gray-400 mt-2">
    The full git story: commit → branch → do work → merge back
  </figcaption>
</figure>
```

- [ ] **Step 1: Write `GitRailwayBanner.svelte`** with the SVG above
- [ ] **Step 2: Verify build** — `npm run build`, 0 errors

---

## Task 3: Rewrite the page content from first principles

**Files:**
- Modify: `src/routes/learn/foundation/git-basics/+page.svelte`

### Full revised page structure

```svelte
<script lang="ts">
  import { base } from '$app/paths';
  import ModuleLayout from '$lib/components/ModuleLayout.svelte';
  import ClaudePrompt from '$lib/components/ClaudePrompt.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import Accordion from '$lib/components/Accordion.svelte';
  import DiagramImage from '$lib/components/DiagramImage.svelte';
  import GitRailwayBanner from '$lib/components/GitRailwayBanner.svelte';

  let gitGroup = $state({ active: 'repository' });
</script>

<ModuleLayout
  moduleId="git-basics"
  title="Git Basics"
  description="What Git is, why it exists, and the six ideas you actually need"
  estimatedMinutes={6}
>

<GitRailwayBanner />

<h2>The problem Git solves</h2>

<p>Before we talk about Git, let's talk about the problem it solves — because you've almost certainly lived it.</p>

<p>You're working on something. You make changes. Something breaks. You try to undo it, but you can't quite remember what it looked like before. You hit Ctrl+Z forty times. Sometimes you get back to the good version. Often you don't.</p>

<p>Or maybe you've seen a folder like this:</p>

<div class="bg-gray-50 rounded-lg p-4 font-mono text-sm my-4 space-y-1">
  <p class="text-gray-600">📄 essay.docx</p>
  <p class="text-gray-600">📄 essay_v2.docx</p>
  <p class="text-gray-600">📄 essay_FINAL.docx</p>
  <p class="text-gray-600">📄 essay_FINAL_v2.docx</p>
  <p class="text-gray-600">📄 essay_FINAL_USE_THIS_ONE.docx</p>
</div>

<p>This is what happens when you try to manage history by hand. It half-works, but it's exhausting and you always lose something eventually.</p>

<p><strong>Git is a tool that solves this automatically.</strong> It watches your project folder and lets you take named snapshots whenever you want. You can go back to any snapshot at any time. You can work on two different versions in parallel and combine them later. And it keeps every snapshot forever — nothing is ever truly lost.</p>

<p>That's the whole idea. Everything else is just details.</p>

<Callout type="tip">
  <p>If you already use Git comfortably, mark this complete and move on. If you've never touched it, read on — five minutes from now you'll understand what's happening every time Claude Code talks about commits, branches, and pushes.</p>
</Callout>

<h2>What is Git, exactly?</h2>

<p>Git is software that runs on your computer invisibly — there's no window or icon. It runs in the background, tracking changes inside a folder you tell it to watch.</p>

<p>When Git is watching a folder, that folder is called a <strong>repository</strong> (or "repo"). Inside the repo, there's a hidden folder called <code>.git</code> — that's where Git stores every snapshot you've ever saved. You never touch it directly. Git manages it for you.</p>

<p>One important distinction: <strong>Git</strong> is the tool; <strong>GitHub</strong> is a website. GitHub stores copies of Git repositories online so you can back them up, share them, and collaborate with others. Git can exist without GitHub. Most people use them together.</p>

<p>Almost every software project in the world uses Git. PAI's own code lives in a Git repository on GitHub. The project you'll clone to install PAI is a Git repository. Once you understand the six concepts below, all of that will make immediate sense.</p>

<h2>The six concepts</h2>

<div class="space-y-2 my-8">

  <Accordion number={1} title="Repository" subtitle="The project folder Git is watching" defaultOpen={true} group={gitGroup} id="repository">
    <DiagramImage
      src="git/git-repository.png"
      alt="A BBC Hitchhiker's Guide to the Galaxy style illustration of a friendly alien standing at a railway goods shed filled with glowing snapshot globes, representing a git repository"
      caption="A repository: every save, kept forever"
    />
    <p class="text-sm text-gray-600 mb-3">A <strong>repository</strong> (or "repo") is just a project folder that Git is tracking. Inside it, there's a hidden folder called <code>.git</code> where Git stores every snapshot you've ever made — the complete history of the project.</p>
    <p class="text-sm text-gray-600 mb-0">When someone says "check the repo" or "open the repo," they mean: open the project folder. The history comes along automatically.</p>
  </Accordion>

  <Accordion number={2} title="Clone" subtitle="Getting a project onto your machine" group={gitGroup} id="clone">
    <DiagramImage
      src="git/git-clone.png"
      alt="A BBC Hitchhiker's Guide to the Galaxy style illustration of a friendly alien operating a duplicating machine with railway tracks, copying a project from a GitHub cloud station to a local workbench"
      caption="Clone: download the whole project — files and all its history"
    />
    <p class="text-sm text-gray-600 mb-3">When someone shares a project on GitHub, you <strong>clone</strong> it to get your own copy on your computer. It downloads every file and the entire history in one go. This is how you'll get PAI — by cloning its repository.</p>
    <p class="text-sm text-gray-600 mb-3">You've probably never done this before, and that's fine. The next lesson walks through installation step by step. For now, just know what the word means: <em>clone = give me a complete copy of this project.</em></p>
    <ClaudePrompt
      prompt="clone the PAI repository"
      response="I'll clone it for you.
git clone https://github.com/danielmiessler/Personal_AI_Infrastructure.git
Cloning into 'Personal_AI_Infrastructure'... done."
      title="Claude Code handles it"
    />
  </Accordion>

  <Accordion number={3} title="Commit" subtitle="Saving a snapshot of your work" group={gitGroup} id="commit">
    <DiagramImage
      src="git/git-commit.png"
      alt="A BBC Hitchhiker's Guide to the Galaxy style illustration of a friendly alien in a station master uniform stamping a document at a railway timeline with glowing snapshot globes at each stop"
      caption="Each commit is a named snapshot. You can jump back to any of them."
    />
    <p class="text-sm text-gray-600 mb-3">A <strong>commit</strong> is a snapshot. It captures every file in your project at that exact moment, with a short message describing what changed. Think of it as pressing Save — except instead of overwriting the old version, Git keeps it. You can have thousands of commits and return to any of them.</p>
    <p class="text-sm text-gray-600 mb-3">The message matters. A good commit message completes the sentence: <em>"If applied, this commit will…"</em></p>
    <div class="grid grid-cols-2 gap-3 text-sm my-3">
      <div class="bg-red-50 rounded-lg p-3">
        <p class="font-medium text-red-700 text-xs mb-1">Unhelpful</p>
        <p class="font-mono text-xs text-red-600">fix stuff</p>
        <p class="font-mono text-xs text-red-600">update</p>
        <p class="font-mono text-xs text-red-600">wip</p>
      </div>
      <div class="bg-green-50 rounded-lg p-3">
        <p class="font-medium text-green-700 text-xs mb-1">Clear</p>
        <p class="font-mono text-xs text-green-600">Fix login crash with special chars</p>
        <p class="font-mono text-xs text-green-600">Add onboarding flow for new users</p>
        <p class="font-mono text-xs text-green-600">Remove deprecated API calls</p>
      </div>
    </div>
    <ClaudePrompt
      prompt="commit my changes"
      response="I'll review what changed and create a commit.

Looking at your changes... you've updated the homepage copy
and fixed two broken links.

git add src/pages/index.html src/pages/about.html
git commit -m &quot;Update homepage copy and fix broken links&quot;

Done. Changes committed."
      title="Claude Code writes good commit messages for you"
    />
  </Accordion>

  <Accordion number={4} title="Branch" subtitle="A safe space to experiment" group={gitGroup} id="branch">
    <DiagramImage
      src="git/git-branch.png"
      alt="A BBC Hitchhiker's Guide to the Galaxy style illustration of a friendly alien at a railway junction switch, enthusiastically pointing at the branching track with an inspired expression"
      caption="A branch: work on something new without touching the safe main track"
    />
    <p class="text-sm text-gray-600 mb-3">Imagine you want to try a completely different approach to something, but you're not sure if it'll work. You don't want to wreck what you have. A <strong>branch</strong> is a copy of your project that you work on separately — like having two versions open in parallel. If the new approach works, you merge it back. If not, you throw it away and nothing is lost.</p>
    <p class="text-sm text-gray-600 mb-3">Every project has a main branch (usually called <code>main</code>). That's the "official" version. New work branches off from it, gets tested, then merges back in.</p>
    <ClaudePrompt
      prompt="create a branch for the new feature"
      response="I'll create a new branch for you.
git checkout -b add-search-feature
Switched to a new branch 'add-search-feature'

You're now working on the new branch.
Any changes you make won't affect main."
      title="Branches keep your work safe"
    />
  </Accordion>

  <Accordion number={5} title="Push & Pull" subtitle="Syncing with GitHub" group={gitGroup} id="push-pull">
    <DiagramImage
      src="git/git-push-pull.png"
      alt="A BBC Hitchhiker's Guide to the Galaxy style illustration of two friendly aliens on a two-level railway — one pushing cargo up to a GitHub cloud station, one pulling cargo down to a laptop"
      caption="Push sends your commits up; pull brings new commits down"
    />
    <p class="text-sm text-gray-600 mb-3"><strong>Push</strong> sends your commits from your computer up to GitHub. <strong>Pull</strong> brings other people's commits down to your computer. It's how you stay in sync.</p>
    <p class="text-sm text-gray-600 mb-3">If you're working alone, pushing is like backing up your work to the cloud. If you're on a team, push and pull constantly to share progress and stay current with everyone else's changes.</p>
    <ClaudePrompt
      prompt="push my changes to GitHub"
      response="Pushing your branch to GitHub...
git push origin add-search-feature
Done. Your changes are now on GitHub."
      title="Push to share, pull to sync"
    />
  </Accordion>

  <Accordion number={6} title="Merge" subtitle="Bringing work together" group={gitGroup} id="merge">
    <DiagramImage
      src="git/git-merge.png"
      alt="A BBC Hitchhiker's Guide to the Galaxy style illustration of a friendly alien conductor raising both arms triumphantly as two railway tracks converge into one, with a green glowing merge node"
      caption="Merge: two tracks become one — the branch's work joins main"
    />
    <p class="text-sm text-gray-600 mb-3">When your branch is ready, you <strong>merge</strong> it back into main. Git combines the changes from your branch with main. Most of the time it does this automatically. The tricky case is when two people changed the exact same line — then Git flags a <strong>conflict</strong> and asks you to decide which version to keep.</p>
    <ClaudePrompt
      prompt="merge my branch into main"
      response="Switching to main and merging your branch.
git checkout main
git merge add-search-feature
Merge successful. Your search feature is now part of main.

Want me to delete the branch?"
      title="Claude Code can handle merge conflicts too"
    />
  </Accordion>

</div>

<h2>That's genuinely all you need</h2>

<p>With these six concepts, you can have a real conversation with Claude Code about any Git operation. You don't need to remember whether it's <code>git checkout -b</code> or <code>git switch -c</code>. You just say what you want:</p>

<ul>
  <li><em>"Commit my work with a good message"</em></li>
  <li><em>"Create a branch for the redesign"</em></li>
  <li><em>"Push this to GitHub"</em></li>
  <li><em>"What changed since yesterday?"</em></li>
  <li><em>"Undo my last commit but keep the changes"</em></li>
</ul>

<p>Claude Code knows every Git command. Your job is knowing what you want to happen. Now you do.</p>

<Callout type="info">
  <p>If you want to go deeper into Git commands, we've put together a <a href="{base}/git-reference" target="_blank">quick reference card</a> with the most common ones. Completely optional — but useful if you're the kind of person who likes to understand what's happening under the hood.</p>
</Callout>

</ModuleLayout>
```

**Changes from current page:**
- Opening `<h2>` changed from "You don't need to learn Git commands" → "The problem Git solves"
- New `file:///essay_FINAL_USE_THIS_ONE.docx` section added before Callout
- New "What is Git, exactly?" section added (Git vs GitHub distinction)
- Accordion order: Repository (1), Clone (2), Commit (3), Branch (4), Push & Pull (5), Merge (6)
- `defaultOpen` moved from Clone to Repository
- `gitGroup` initial active changed from `clone` to `repository`
- Each accordion's prose updated with beginner-friendly framing
- All `DiagramImage` src and alt attributes updated for new images
- `DiagramImage` import kept; `GitRailwayBanner` added; old banner `DiagramImage` removed

- [ ] **Step 1: Write `GitRailwayBanner.svelte`** (from Task 2)
- [ ] **Step 2: Rewrite `+page.svelte`** with the full content above
- [ ] **Step 3: Verify build** — `npm run build`, 0 errors
- [ ] **Step 4: Dev server check** — `npm run dev`, open the page, verify layout and SVG banner render

---

## Task 4: Final verification

- [ ] **Step 1: Build** — `npm run build`, 0 errors, 0 warnings
- [ ] **Step 2: Dev server** — open `/learn/foundation/git-basics`
- [ ] **Step 3: Visual check** — all six HHGTTG images display, SVG banner renders, accordions open/close
- [ ] **Step 4: Read the opening** — read from the top as if you've never heard of version control. Does it land?
- [ ] **Step 5: Mobile check** — resize window narrow; images and SVG should be responsive
- [ ] **Step 6: Commit**

```bash
git add static/images/pai/git/ src/lib/components/GitRailwayBanner.svelte src/routes/learn/foundation/git-basics/+page.svelte
git commit -m "Rewrite Git Basics with first-principles content, HHGTTG images, and railway banner"
```

---

## Notes

- Images are generated at 16:9 (1344×768) 2K — same resolution as the previous Elven images
- If any Nanobanana image misses the HHGTTG brief badly, re-run with an adjusted prompt — the prompts above are a strong starting point but Gemini may need nudging on "BBC 1981 animation style"
- The SVG banner uses `bg-gray-950` background to give it a dark starfield feel consistent with the HHGTTG space aesthetic
- `defaultOpen` on Repository (not Clone) means the first thing a new reader sees is the foundational concept, not a tool operation
