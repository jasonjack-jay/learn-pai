# Git in Detail — Section Plan (v2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **See also:** `docs/superpowers/specs/2026-04-12-learn-pai-curriculum.md` — the broader curriculum vision that Git in Detail pioneers the patterns for.

**Goal:** Add a comprehensive "Git in Detail" learning path — 16 pages (1 intro + 1 index + 14 content) — covering everything a modern developer needs to know about Git, especially working alongside AI coding assistants. Pages teach *what* Git concepts exist and *why* they matter, with "Ask Your AI Agent" breakouts replacing step-by-step execution instructions.

**Architecture:** New learning path (`git-in-detail`) added to the path system in `state.svelte.ts`. Pages are freely navigable (no prerequisite gating between content pages). Each content page uses a new `PathPageLayout` component (not `ModuleLayout`) that provides end-of-page navigation to the next section or back to the index.

**Tech Stack:** SvelteKit 5, Svelte 5 (runes), plus four new components: `PathIndex`, `PathPageLayout`, `AskYourAgent`, `ImagePlaceholder`.

---

## The Core Principle

**We teach concepts, not execution.**

A page about `git rebase` does NOT teach you how to type `git rebase --interactive HEAD~5` and handle each commit. A page about rebasing teaches you:

- **What rebasing is** (moving commits onto a different base)
- **When you'd want it** (cleaning up before a PR; getting the latest main into your branch)
- **Why it exists** (linear history beats branchy history for readability)
- **The golden rule** (never rebase shared branches)
- **The dangers** (rewriting history someone else has)
- **How to ask your AI to do it for you** (example prompts)

You can learn the syntax — your AI can do it better. What you need is the judgement to know *when* rebasing is right, *why* the golden rule exists, and *how* to ask for it.

---

## What's Missing from Git Basics

Git Basics covers 6 conceptual ideas at the "I've never heard of Git" level. Git in Detail covers everything a developer actually needs to know — 30+ commands, concepts, common pitfalls, and workflows.

### Already introduced (Git Basics — conceptual only)
Repository, Clone, Commit, Branch, Push & Pull, Merge

### Covered by Git in Detail
| Category | Topics |
|----------|--------|
| **Setup** | `git init`, `git config`, `.gitignore`, SSH, authentication |
| **Staging** | `git add` (incl. `-p`), `git status`, `git diff`, the three areas |
| **History** | `git log` options, `git show`, `git blame`, `git bisect` |
| **Branching depth** | `switch` vs `checkout`, tracking, detached HEAD, naming |
| **Rebasing** | basic rebase, interactive rebase, the golden rule |
| **Syncing depth** | `fetch` vs `pull`, upstream, `--force-with-lease`, forks |
| **Stashing** | `stash push/pop/apply/list/branch`, untracked files |
| **Undoing** | `reset` (3 modes), `revert`, `restore`, `reflog`, `amend` |
| **Worktrees** | parallel development, AI agent workflows |
| **Pull Requests** | lifecycle, merge methods, code review, `gh` CLI |
| **Tags** | annotated vs lightweight, semver, `cherry-pick` |
| **Hooks** | `pre-commit`, `commit-msg`, `pre-push`, husky, lefthook |

---

## New Infrastructure

### 1. New components to build

#### `AskYourAgent.svelte`
Breakout box showing example natural-language prompts for the current concept.

```svelte
<AskYourAgent
  title="How you might ask your AI agent"
  prompts={[
    "commit my work with a good message",
    "commit just the changes to the login page",
    "undo my last commit but keep the changes staged",
    "amend my last commit to include this file"
  ]}
/>
```

Renders as a friendly card with a subtle icon, the title, and the prompts as quoted examples. Distinct visual treatment from `ClaudePrompt` (which shows full prompt+response).

#### `PathIndex.svelte`
Chunky card grid for the index hub page. Each card shows:
- Section number
- Section title
- What it covers (one paragraph)
- Why you'd read it / when you'd need it (one paragraph)
- "Read this section →" link
- Visited/unvisited status indicator (subtle, non-gating)

#### `PathPageLayout.svelte`
Wraps a content page. Provides:
- Page title, subtitle, estimated time (top)
- Slot for content (middle)
- End-of-page navigation (bottom):
  - "Next up: [Section Name] — [one-line hook explaining what you'll learn]" (if there's a next page)
  - "Return to the [Path Name] index"
- No "mark complete / unlock next" button
- Still registers visited state for the index's visual indicator

#### `ImagePlaceholder.svelte`
During development, visually shows intended images with description. In production, hidden or rendered as the actual image.

```svelte
<ImagePlaceholder description="Diagram showing the three areas — working directory, staging area, repository — with arrows showing how files move between them via add and commit." size="medium" />
```

Renders as a dashed-border box with the description inside. Dev-friendly.

### 2. Module system changes

```typescript
// src/lib/state.svelte.ts — add:
export type PathId = 'know-me' | 'get-things-done' | 'architecture' | 'git-in-detail';

// In paths object:
'git-in-detail': {
    title: 'Git in Detail',
    tagline: 'Everything Git — because your AI assistant needs you to understand it',
    icon: '🚇',
    color: 'purple',
    freelyNavigable: true  // NEW FIELD — pages within this path don't enforce prereqs
}
```

Add `freelyNavigable?: boolean` to the path metadata type. Update sidebar/navigation logic to not gate pages within freely-navigable paths.

### 3. Page structure

- `src/routes/learn/git-in-detail/+page.svelte` — intro (page 1)
- `src/routes/learn/git-in-detail/index-hub/+page.svelte` — index hub (page 2)
- `src/routes/learn/git-in-detail/setup/+page.svelte` — content page 1
- ... and so on for all 14 content pages

---

## Page Structure (16 pages total)

Every content page follows this template:

```
[IMAGE: opening concept image]

# Page Title

One-paragraph opener — the situation, the problem, what you'll learn.

## What is this?
Plain-English explanation.

## Why does this matter?
Real scenarios where it comes up.

## [Sub-concept 1]
Explanation + example.

[AskYourAgent breakout for this sub-concept]

## [Sub-concept 2]
Explanation + example.

[AskYourAgent breakout for this sub-concept]

...

## Common gotchas / "If you're thinking X, you need Y"
Signposts to related concepts.

## Summary
Three-sentence takeaway.

[End-of-page navigation: Next up or Return to index]
```

---

### Page 1: Why Git in Detail (intro)
**Slug:** `git-in-detail` | **Time:** 4 min | **Prereq:** `git-basics`

Opens the path. Why this exists, what's in it, how to use it.

**Content outline:**
- Git Basics gave you 6 concepts. That's enough to *understand* what your AI is doing. But it's not enough to be effective.
- When your AI says "I'll rebase your branch onto main and resolve conflicts," do you know what that means? What to verify? What could go wrong?
- When your AI sets up a worktree to run in parallel with your work, do you know what it just did?
- This section closes those gaps. Each page covers one concept — enough that you can hold a conversation about it with any developer (or AI).
- **Key shift:** we don't teach you to type git commands. We teach you what's possible so you can ask. Your AI types the commands.
- How to use this section: it's not sequential. Jump to what you need. The index page has a map.
- Who it's for: vibe coders, junior devs joining a team, anyone who's nodded along when a senior dev said "just rebase it" and didn't know what they meant.

[IMAGE: Overview — six tube map sections representing the six pillars of git (setup, local workflow, branching, syncing, undoing, advanced). Aliens with question marks in speech bubbles, implying "wait, what's THAT one?"]

**End-of-page:** "Ready? Jump to the index →"

---

### Page 2: Index / Hub
**Slug:** `git-in-detail/index-hub` | **Time:** 2 min | **Prereq:** (none — available from intro)

The map. Every content section gets a chunky card with what and why.

**Card structure for each section:**

```
┌─────────────────────────────────────────┐
│ 1. Setting Up Git                       │
│                                         │
│ What it covers                          │
│ The first-time setup that nobody        │
│ explains properly. Configs, .gitignore, │
│ SSH keys, the .git folder.              │
│                                         │
│ When you'd read this                    │
│ First time installing Git. Joining a    │
│ new team. After a laptop rebuild.       │
│ Whenever you want to stop typing -u.    │
│                                         │
│ ⏱ 8 min   [Read →]                      │
└─────────────────────────────────────────┘
```

14 cards, one per content section. Visual indicator (subtle) for visited/unvisited. Clicking a card navigates to that page.

**End-of-page:** None — this is the hub. All navigation is via cards.

[IMAGE: Index/map style — a tube map legend showing all 14 lines with their colours and brief labels, as if you're standing in front of a station wall map.]

---

### Page 3: Setting Up Git
**Slug:** `git-in-detail/setup` | **Time:** 8 min

[IMAGE: A fresh laptop screen with Git setup checklist. Or: a tube station ticket booth where an alien explains what each setup step does.]

#### What is this?
Git needs a few things set up before it really works well. Your identity (for commits), your editor, some useful defaults. Without these, every commit you make is anonymous and Git keeps asking you the same questions.

#### Why does this matter?
If you've ever typed `-u origin main` for the fiftieth time and thought "there must be a better way," there is. If you've ever wondered why your commits show up as "unknown author," that's this. If you've ever been baffled by `.gitignore`, that's this too.

#### `git init` — creating a repo from scratch
Turns any folder into a Git repository. Creates the hidden `.git` folder where everything is stored.

**When you'd do it:** Starting a new project that isn't already on GitHub.
**When you wouldn't:** You're cloning something — `git clone` does this for you automatically.

<AskYourAgent title="How you might ask your AI agent" prompts={[
  "make this folder a git repository",
  "set up git here and create the first commit",
  "init a new repo and add a sensible .gitignore"
]} />

#### `git config` — your identity and preferences
Three levels: system (for this whole machine), global (for your user), local (for this one repo). You almost always use global.

**The bare minimum first-time setup:**
- Your name and email (goes on every commit)
- Your default branch name (use `main`, not `master`)
- Your preferred editor (for commit messages)

**The "why didn't anyone tell me?" power settings:**
- `push.autoSetupRemote = true` — never type `-u` again
- `fetch.prune = true` — auto-delete branches that no longer exist on remote
- `rerere.enabled = true` — Git remembers how you resolved conflicts and does it for you next time
- `diff.algorithm = histogram` — noticeably smarter diffs
- `commit.verbose = true` — shows you the diff while you're writing the commit message
- `rebase.autoSquash = true` — auto-organises fixup commits during interactive rebase
- `merge.conflictstyle = zdiff3` — conflict markers that show you what was originally there (huge improvement)

[IMAGE: A "settings control panel" diagram showing the off/on toggles for each power setting, with the impact of each on a little screen next to it.]

<AskYourAgent title="How you might ask your AI agent" prompts={[
  "set up git with my name, email, and all the recommended settings",
  "configure git to stop asking me for -u every time",
  "turn on all the git quality-of-life settings that most developers don't know about"
]} />

#### `.gitignore` — files Git should pretend don't exist
Some files shouldn't be committed. Build output. Secrets. Your editor's weird temp files. `.gitignore` is a list of patterns Git ignores.

**Common patterns:**
- `node_modules/` — dependencies (massive, re-creatable)
- `.env` and `.env.local` — secrets (NEVER commit these)
- `.DS_Store` — macOS metadata
- `dist/`, `build/` — compiled output (re-creatable)
- `*.log` — log files

**If you're thinking "I want my `.gitignore` to ignore everything in a folder except one file,"** you need pattern negation with `!`. Your AI can do this.

**If you're thinking "I want this pattern everywhere, in all my repos,"** you need a global `.gitignore` — configured with `core.excludesfile`.

<AskYourAgent title="How you might ask your AI agent" prompts={[
  "create a .gitignore for a SvelteKit project",
  "add node_modules and .env files to my gitignore",
  "set up a global .gitignore for my macOS-specific files",
  "my .env was accidentally committed — get it out and add it to .gitignore"
]} />

#### SSH keys — authenticating with GitHub
When you push to GitHub, GitHub needs to know it's really you. SSH keys are the modern way (better than passwords).

**The concept:** You have two keys — a public one (share with GitHub) and a private one (never share). When you push, your computer proves it has the private key without revealing it.

**When you set them up:** Once per computer.
**When they break:** After a laptop rebuild, or when you get a new machine.

<AskYourAgent title="How you might ask your AI agent" prompts={[
  "set up SSH keys for GitHub",
  "I just got a new laptop — get my GitHub SSH working",
  "switch this repo from HTTPS to SSH"
]} />

#### The `.git` folder — the magic box
Every Git repo has a hidden `.git` folder. That's where everything lives — every commit, every branch, every tag. If you delete it, you've un-Gitted the folder (the files stay, but the history is gone).

**What's inside:**
- `HEAD` — a pointer to your current branch
- `refs/` — all your branches and tags
- `objects/` — every file version Git has ever stored (compressed)
- `config` — this repo's specific config

**You never touch any of this.** Your AI doesn't either. But knowing it's there demystifies Git.

#### Summary
Set up your name, email, and default branch. Turn on the power settings. Write a good `.gitignore`. Set up SSH. The `.git` folder is magic and you never touch it.

**Next up:** The Staging Area — add, commit, status, diff, and why Git has a "waiting room" for your changes.

---

### Page 4: The Staging Area
**Slug:** `git-in-detail/staging` | **Time:** 10 min

[IMAGE: Three-zone diagram — "working directory" (your files, being edited) → "staging area" (a waiting room) → "repository" (the commit history). Arrows showing `add` and `commit` as the verbs that move things.]

#### What is this?
Git has three zones: the **working directory** (your files as they are right now), the **staging area** (files marked for the next commit), and the **repository** (every commit ever made). The staging area is Git's "waiting room" — you put things in it, review them, then commit.

#### Why does this matter?
The staging area is what makes Git powerful. It lets you commit *selectively*: you can have 10 changed files and commit just 2 of them. You can even commit just *part* of a file. This is how you make clean, atomic commits that tell a coherent story.

**If you're thinking "I just want to save my work,"** you need `git add .` and `git commit -m "message"`.
**If you're thinking "I changed 5 files but only 2 are ready,"** you need `git add` for specific files.
**If you're thinking "I changed 3 things in one file but want them as separate commits,"** you need `git add -p` (patch mode — game changer).

#### `git status` — what's going on?
The single most-run Git command. Shows you: what's staged, what's modified but not staged, what's untracked, which branch you're on.

95% of developers run this multiple times per day.

<AskYourAgent title="How you might ask your AI agent" prompts={[
  "what's the current state of my repo?",
  "show me what I've changed",
  "what's ready to commit?"
]} />

#### `git add` — staging files
**`git add <filename>`** — stage specific file
**`git add .`** — stage all changes in current folder (and subfolders)
**`git add -p`** — patch mode: go through each change and pick which to stage. The power user's best friend.

**Why `add .` can be dangerous:** it stages everything, including things you didn't mean to (debug logs, `.env` files, build output). Better practice: look at `git status` first.

[IMAGE: Diagram showing three files in the working directory — `login.js`, `styles.css`, `debug.log` — with `git add login.js styles.css` pulling just two of them into the staging area, leaving `debug.log` behind.]

<AskYourAgent title="How you might ask your AI agent" prompts={[
  "stage all my changes",
  "stage just the changes to the login page",
  "stage my changes but exclude the debug logs",
  "help me split this one file into two separate commits"
]} />

#### `git diff` — what actually changed?
**`git diff`** — changes in your working directory that are NOT yet staged
**`git diff --staged`** — changes that ARE staged (the most-forgotten flag!)
**`git diff HEAD`** — all changes since the last commit (staged + unstaged)

**Useful flags:**
- `--stat` — summary: which files changed, by how much
- `--word-diff` — shows word-level changes (great for prose/config files)
- `-w` — ignore whitespace (filters reformatting noise)

**If you're thinking "my AI just made changes — let me see what it did,"** you need `git diff`.

<AskYourAgent title="How you might ask your AI agent" prompts={[
  "show me what changed",
  "show me what's about to be committed",
  "what changed between this branch and main?",
  "summarise my changes in a sentence"
]} />

#### `git commit` — saving a snapshot
**`git commit -m "message"`** — commit with an inline message
**`git commit`** — opens your editor for a longer message (better for anything complex)
**`git commit --amend`** — modifies the last commit (add forgotten files, fix the message)

**Atomic commits** — one logical change per commit. The "if applied, this commit will..." test. Good commits tell a story; bad commits are "fixed stuff."

**If you're thinking "I forgot a file in my last commit,"** you need `git commit --amend --no-edit`.
**If you're thinking "my last commit message has a typo,"** you need `git commit --amend`.

[IMAGE: Before/after of a bad commit ("wip stuff") versus a good commit ("Fix login crash when email contains +"), with a little thumbs-up/down from an alien.]

<AskYourAgent title="How you might ask your AI agent" prompts={[
  "commit my work with a good message",
  "commit just the login changes with message 'Fix login crash'",
  "I forgot to add the CSS — amend the last commit",
  "my commit message has a typo — fix it"
]} />

#### Common scenarios

**"I changed 5 files but only want to commit 2"**
Use `git add <file1> <file2>` then commit.

**"I changed one file in two unrelated ways"**
Use `git add -p` to stage them as separate hunks, commit each one.

**"I want to undo my staging"**
Use `git restore --staged <file>` to unstage.

**"I accidentally committed my .env file"**
`git reset HEAD~1`, remove the file, update `.gitignore`, re-commit.

#### Summary
Three zones: working directory → staging area → repository. `add` moves things right, `commit` saves the snapshot. `git status` and `git diff` are how you check what's happening. The staging area lets you commit selectively, which is how you make clean history.

**Next up:** Branches in Depth — creating, switching, tracking, cleaning up, and why `switch` is better than `checkout`.

---

### Page 5: Branches in Depth
**Slug:** `git-in-detail/branches` | **Time:** 8 min

[IMAGE: A branch visualisation — main line with several feature branches forking off and coming back. Labels showing where HEAD is currently pointing.]

#### What is this?
A branch in Git is just a pointer to a commit. That's it. A tiny 40-byte pointer. When you "create a branch," you're creating a new pointer. When you "switch branches," you move your working directory to wherever that pointer points.

This is important because it means **creating and deleting branches is practically free**. Use them liberally.

#### Why does this matter?
Branches are how you do anything non-trivial. Every feature, every bug fix, every experiment lives on a branch. Understanding branches deeply removes a huge category of confusion ("wait, where did my changes go?").

**If you're thinking "should I just work on main?"** No. Branch everything. It's almost free.
**If you're thinking "how many branches is too many?"** Local branches: any number. Remote branches: clean up merged ones regularly.

#### HEAD — the "you are here" pointer
`HEAD` is a special pointer that points to whatever branch (or commit) you currently have checked out. When you see a tutorial say "HEAD~1" it means "one commit before where you are now."

#### Detached HEAD — a scary-sounding safe state
If you check out a specific commit (not a branch), you're in "detached HEAD" state. It means you're looking at history, not at any branch. Commits you make here aren't on any branch — they'll be lost if you switch away.

**How to escape safely:** create a branch from where you are: `git switch -c rescue-branch`.

<AskYourAgent title="How you might ask your AI agent" prompts={[
  "I'm in detached HEAD — save my work",
  "what branch am I on?",
  "help me figure out where I am in the commit history"
]} />

#### `git switch` — the modern way (Git 2.23+)
**`git switch <branch>`** — switch to an existing branch
**`git switch -c <branch>`** — create a new branch and switch to it
**`git switch -`** — switch to the branch you were on before (like `cd -`)

Why switch is better than `checkout`: it refuses to put you in detached HEAD by accident. It's a scalpel, not a Swiss Army knife.

<AskYourAgent title="How you might ask your AI agent" prompts={[
  "switch to the main branch",
  "create a new branch for the search feature and switch to it",
  "switch back to the branch I was just on"
]} />

#### `git checkout` — the old way (still works)
`git checkout` does several things: switch branches, restore files, enter detached HEAD. Because it's overloaded, it's error-prone. `git switch` (for branches) and `git restore` (for files) replace it cleanly.

You'll still see `git checkout` in older tutorials. Both work.

#### `git branch` — managing the pointers
**`git branch`** — list local branches (current one has a `*`)
**`git branch -a`** — list ALL branches including remote
**`git branch -vv`** — show tracking info (what remote each branch tracks)
**`git branch -d <name>`** — delete a merged branch (safe)
**`git branch -D <name>`** — force-delete a branch (dangerous)
**`git branch -m <new-name>`** — rename current branch

**If you're thinking "I have 40 local branches from old features,"** you need `git branch --merged` to find safe-to-delete branches, then batch-delete them.

[IMAGE: A "branch graveyard" cleanup scene — many old branches being swept away, a few important ones remaining.]

<AskYourAgent title="How you might ask your AI agent" prompts={[
  "list all my branches with their tracking info",
  "delete the feature branches I already merged",
  "rename this branch to something more descriptive",
  "clean up my local branches — keep main and the one I'm on"
]} />

#### Remote tracking branches
When you clone a repo, Git creates "remote tracking branches" — names like `origin/main`. These are Git's memory of where the remote was last time you fetched. They're different from your local branches.

**Your local `main`** = where you're working
**`origin/main`** = where the remote was last time you checked

When they diverge, that's when you need to pull, fetch, or resolve.

#### Branch naming conventions
Teams usually adopt a convention. Common patterns:
- `feature/PROJ-123-add-search` — new features, often with ticket reference
- `fix/login-crash` — bug fixes
- `chore/update-deps` — maintenance
- `release/v2.1.0` — release branches
- `hotfix/critical-security-patch` — urgent production fixes

Kebab-case (dash-separated), lowercase, descriptive but not too long.

<AskYourAgent title="How you might ask your AI agent" prompts={[
  "create a branch for fixing the login crash, following our team's naming convention",
  "what's a good branch name for adding search functionality?"
]} />

#### Summary
Branches are cheap pointers. `git switch` is the modern, safe way to move between them. `git branch` manages the list. Remote tracking branches (`origin/main`) are different from local branches. Clean up merged branches regularly.

**Next up:** Merging in Depth — combining branches, handling conflicts, and the three merge strategies.

---

### Pages 6–16 Content Outlines

*(Abbreviated outlines for pages 6 through 16 — full content follows the same template as pages 3–5 above. Each has image placeholders, "Ask Your AI Agent" breakouts per concept, "if you're thinking X you need Y" signposts, and end-of-page navigation.)*

#### Page 6: Merging in Depth — `git-in-detail/merging` — 10 min

Cover fast-forward vs non-fast-forward merges, merge commits, `--squash`, conflict resolution (reading `<<<<<`/`=====`/`>>>>>` markers, `zdiff3` base marker), `git merge --abort`, merge strategies (recursive, ort, octopus). "Merge vs rebase" preview for next page.

Key scenarios:
- "Main has moved ahead while I was branching"
- "I want my branch's history preserved when merging"
- "I want one clean commit for my whole feature"
- "Conflict in a file I didn't change"

[IMAGE: Two branches converging at a merge commit, with the merge commit highlighted. Alternative: a conflict visualisation showing the three-way view with "base / mine / theirs".]

#### Page 7: Rebasing — `git-in-detail/rebasing` — 10 min

Cover what rebase does (replaying commits), basic rebase for updating a branch, interactive rebase (`squash`, `fixup`, `reword`, `edit`, `drop`, reordering), the Golden Rule (never rebase shared history), `--force-with-lease` for when you must force, `--fixup` + `--autosquash` workflow.

Key scenarios:
- "I have 15 WIP commits, I want 3 clean ones before PR"
- "Main has moved ahead — get my branch up to date cleanly"
- "I accidentally rebased something I'd pushed"

[IMAGE: Before/after of a messy commit history vs a clean rebased one. Alternative: a timeline showing commits being "picked up" from one branch and replayed on another.]

#### Page 8: Working with Remotes — `git-in-detail/remotes` — 10 min

Cover `git remote` management (add, remove, set-url), clone depth, single-branch clones, `git fetch` vs `git pull`, `--prune`, push options (`-u`, `--force-with-lease`, `--delete`), working with forks (upstream convention), HTTPS vs SSH.

Key scenarios:
- "I want to contribute to a project on GitHub"
- "My remote URL changed (switched from HTTPS to SSH)"
- "Clean up branches that no longer exist on remote"
- "See what's on the remote without integrating"

[IMAGE: Multiple-remote diagram showing your laptop, origin (your fork), upstream (the original project) with fetch/push arrows.]

#### Page 9: Stashing — `git-in-detail/stashing` — 6 min

Cover `git stash push -m "name"`, the untracked problem (`-u`), `pop` vs `apply` (always apply first), `git stash list`, `git stash show`, `git stash branch`, the 28% loss statistic and how to avoid it.

Key scenarios:
- "Urgent bug, I'm mid-feature, need to switch branches"
- "Test just my staged changes"
- "My WIP deserves its own branch"
- "I can't remember which stash had what"

[IMAGE: A "shelf of stashes" with labels — the metaphor made literal. Could include an alien putting jars on shelves.]

#### Page 10: Investigating History — `git-in-detail/history` — 10 min

Cover `git log` with its 15+ useful options (`--oneline`, `--graph`, `--all`, `--author`, `--since`, `--grep`, `-S`, `-G`, path filters, `-L` for function history), `git show`, `git blame` (with `-w`, `-M`, `-C`), `git bisect` (manual + `--run`).

Key scenarios:
- "Who wrote this line and why?"
- "When did this file get deleted?"
- "When did the bug get introduced?" (bisect)
- "Find all commits that mention this ticket number"

[IMAGE: Detective/investigator theme — examining the timeline of a file or line, with a magnifying glass or similar.]

#### Page 11: Undoing Things — `git-in-detail/undoing` — 10 min

Cover the undo spectrum: `restore` (gentle file-level) → `revert` (safe commit-level) → `reset --soft` → `reset --mixed` → `reset --hard` (nuclear). Plus `git reflog` as the safety net. Plus `commit --amend` for the last commit.

**The "Oh No" table** — 12 common disasters with their fixes. Most memorable part of the section.

Key scenarios:
- "I committed to the wrong branch"
- "I force-pushed and lost my work"
- "I deleted a branch I needed"
- "I staged a `.env` file — now what?"

[IMAGE: The "Oh No" spectrum — a dial from "minor oops" to "nuclear reset" with the appropriate command at each point. Alternative: an alien holding up the Git reflog like a safety net.]

#### Page 12: Worktrees — `git-in-detail/worktrees` — 8 min

Cover what worktrees are (multiple working directories, one `.git` database), commands (`add`, `list`, `remove`, `lock`), why AI coding assistants love them (Claude Code, Cursor parallel agents), the parallel-work workflow.

Key scenarios:
- "Run Claude Code on two features simultaneously"
- "Urgent bug fix without disturbing my in-progress feature"
- "Test a PR locally without switching branches"
- "Main worktree stays clean while AI agents work in branches"

[IMAGE: One central `.git` database with multiple folders branching off, each a different working state. Aliens working in each folder independently.]

#### Page 13: Pull Requests — `git-in-detail/pull-requests` — 10 min

Cover what a PR actually is (platform feature, not a Git command), the complete lifecycle (branch → commit → push → open PR → review → address feedback → merge → cleanup), merge methods (merge commit vs squash vs rebase), writing good PRs, reviewing PRs, `gh` CLI.

Key scenarios:
- "Open a PR from my current branch"
- "Review this colleague's PR locally"
- "Address review feedback"
- "Clean up my branch before merge"

[IMAGE: PR workflow as a stage play or assembly line — commits flow through review, feedback loops back, eventual merge.]

#### Page 14: Tags, Releases & Cherry-Pick — `git-in-detail/tags` — 6 min

Cover annotated vs lightweight tags, semantic versioning (MAJOR.MINOR.PATCH), pushing tags, deleting tags, `git cherry-pick` for backporting fixes.

Key scenarios:
- "Release v1.2.3 from main"
- "Backport this bugfix to the v2.x release branch"
- "List all release tags"

[IMAGE: A timeline with release tags as bookmarks/flags. Alternative: an alien pulling a specific fruit (cherry) from one branch onto another.]

#### Page 15: Git Hooks & Automation — `git-in-detail/hooks` — 8 min

Cover what hooks are (scripts at Git events), the useful ones (`pre-commit`, `commit-msg`, `pre-push`), tools (husky, lefthook, pre-commit framework), why they matter with AI (block bad AI code before commit, enforce team conventions).

Key scenarios:
- "Set up hooks so I can't commit `console.log`"
- "Run tests before every push"
- "Enforce Conventional Commits"
- "Scan for API keys in every commit"

[IMAGE: A gate or checkpoint system — commits/pushes have to pass through a series of automated checks (linting, tests, format) before proceeding.]

#### Page 16: Closing / "Where to Next" — `git-in-detail/complete` — 3 min

A wrap-up page (not a new concept — just closing the loop).

- Congratulations, you now know enough Git to hold your own with any senior developer.
- Quick recap of what was covered.
- Signposts to the broader curriculum: "Now that you understand Git, maybe learn about The Error Whisperer or How the Web Works."
- Link back to `/git-reference` for the cheat sheet.

[IMAGE: Celebration — aliens at a terminus station, all paths met. The complete tube map with every station lit up.]

---

## Implementation Tasks

### Task 1: Infrastructure (before any content)

- [ ] **Step 1:** Update `src/lib/state.svelte.ts`:
  - Add `'git-in-detail'` to `PathId` union
  - Add `freelyNavigable?: boolean` to path metadata type
  - Add `'git-in-detail'` path metadata entry
  - Add 16 module entries with `path: 'git-in-detail'`, `tier: 'core'`, sequential `order`, `freelyNavigable: true`
- [ ] **Step 2:** Update sidebar/navigation logic to respect `freelyNavigable` (don't lock pages based on order within freely-navigable paths)
- [ ] **Step 3:** Create `src/lib/components/AskYourAgent.svelte` with prompt-list card styling
- [ ] **Step 4:** Create `src/lib/components/PathPageLayout.svelte` — wraps content, handles end-of-page nav (next section OR return to index)
- [ ] **Step 5:** Create `src/lib/components/PathIndex.svelte` — chunky card grid for index hub page
- [ ] **Step 6:** Create `src/lib/components/ImagePlaceholder.svelte` — dev-mode visual placeholder

### Task 2: Write intro and index pages

- [ ] **Step 7:** Write `src/routes/learn/git-in-detail/+page.svelte` (intro)
- [ ] **Step 8:** Write `src/routes/learn/git-in-detail/index-hub/+page.svelte` (hub)

### Task 3: Write content pages (14 pages, one per concept)

Each page: create directory, write `+page.svelte`, verify build, verify visual in browser.

- [ ] **Step 9:** Setup
- [ ] **Step 10:** The Staging Area
- [ ] **Step 11:** Branches in Depth
- [ ] **Step 12:** Merging in Depth
- [ ] **Step 13:** Rebasing
- [ ] **Step 14:** Working with Remotes
- [ ] **Step 15:** Stashing
- [ ] **Step 16:** Investigating History
- [ ] **Step 17:** Undoing Things
- [ ] **Step 18:** Worktrees
- [ ] **Step 19:** Pull Requests
- [ ] **Step 20:** Tags, Releases & Cherry-Pick
- [ ] **Step 21:** Git Hooks & Automation
- [ ] **Step 22:** Closing / Where to Next

### Task 4: Final verification

- [ ] **Step 23:** `npm run build` — 0 errors
- [ ] **Step 24:** Dev server visual check — every page renders, navigation works, index hub links to each page, end-of-page navigation takes you where it should
- [ ] **Step 25:** Mobile responsive check — all 16 pages at 390px width
- [ ] **Step 26:** Read three pages cold as if you've never used Git — does the "what / why / how to ask AI" pattern land?
- [ ] **Step 27:** Commit
- [ ] **Step 28:** (Later pass) Replace all `ImagePlaceholder`s with real images

---

## Notes

- **Images are placeholders during first pass.** Each placeholder describes the intended image. Theme decided later.
- **No "mark complete" button** — pages are freely navigable. The path index shows visited/unvisited as a subtle indicator, not a gate.
- **Every major concept gets an "Ask Your AI Agent" breakout** — not buried at the end. Inline, right after the explanation.
- **Tone is "knowledgeable friend explaining at coffee,"** not "textbook" and not "tutorial." If a page reads like it's lecturing, rewrite.
- **"If you're thinking X, you need Y"** signposts are a signature move. Include several per page.
- **Scenarios come before syntax.** Every concept opens with a real situation the reader might recognise.
- **The existing `git-reference` page stays as-is** and is linked from the intro and the closing page as "the cheat sheet."
