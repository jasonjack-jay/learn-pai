# Git in Detail — Section Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a comprehensive "Git in Detail" learning path to learn-pai — 14 pages covering everything a modern developer needs to know about Git, especially when working with AI coding assistants.

**Architecture:** New learning path (`git-in-detail`) added to the existing path system in `state.svelte.ts`. Each page follows the established `ModuleLayout` pattern. Pages are ordered as a progression from setup through advanced topics, with `git-basics` as the prerequisite for the intro page.

**Tech Stack:** SvelteKit 5, Svelte 5 (runes), existing component library (ModuleLayout, Accordion, Callout, ClaudePrompt, DiagramImage)

---

## What's Missing from Git Basics

Git Basics covers 6 conceptual ideas. "Git in Detail" covers **everything a developer actually needs to operate Git** — 30+ commands, their most-used options, real scenarios, common mistakes, and recovery techniques. Here's the gap analysis:

### Already introduced (Git Basics — conceptual only, no commands)
Repository, Clone, Commit, Branch, Push & Pull, Merge

### Missing entirely from the site
| Category | Commands / Topics |
|----------|------------------|
| **Setup** | `git init`, `git config`, `.gitignore`, SSH keys |
| **Staging** | `git add` (incl. `-p` patch mode), `git status`, `git diff` |
| **History** | `git log` (20+ useful options), `git show`, `git blame`, `git bisect` |
| **Branching (detail)** | `git switch` vs `git checkout`, `git branch` options, remote tracking, detached HEAD |
| **Rebasing** | `git rebase`, interactive rebase (`squash`, `fixup`, `reword`, `drop`), the golden rule |
| **Syncing (detail)** | `git fetch` (vs pull), `git remote`, upstream tracking, `--force-with-lease` |
| **Stashing** | `git stash` (push, pop, apply, list, drop, branch, `-u`, `--keep-index`) |
| **Undoing** | `git reset` (soft/mixed/hard), `git revert`, `git restore`, `git reflog`, `git commit --amend` |
| **Worktrees** | `git worktree` — parallel development, AI agent workflows |
| **Pull Requests** | The PR lifecycle, code review, squash vs merge vs rebase merge |
| **Tags** | `git tag` (annotated/lightweight), semantic versioning, `git cherry-pick` |
| **Hooks** | `pre-commit`, `commit-msg`, `pre-push`, tools (husky, lefthook) |
| **Workflows** | GitHub Flow, GitFlow, trunk-based development |
| **Cleanup** | `git clean`, `git gc` |
| **Recovery** | The "oh no" table — 12 common disasters and their fixes |

### Key statistics (from research)
- 70% of developers have used a Git command without fully understanding it
- 55% find rebase challenging and error-prone
- 45% have been burned by a colleague's force push
- 28% have lost work using stash
- 40% of Stack Overflow Git questioners had 4+ years of experience

This section exists because **even experienced developers have gaps**.

---

## Section Implementation

### Site infrastructure changes

**Files to modify:**
- `src/lib/state.svelte.ts` — add `'git-in-detail'` to `PathId`, add path metadata, add 14 module entries

**Files to create:**
- 14 page files under `src/routes/learn/git-in-detail/*/+page.svelte`
- London Tube map images for each page (via Nanobanana)

### Path configuration

```typescript
// Add to PathId type:
export type PathId = 'know-me' | 'get-things-done' | 'architecture' | 'git-in-detail';

// Add to paths object:
'git-in-detail': {
    title: 'Git in Detail',
    tagline: 'Everything Git — because your AI assistant needs you to understand it',
    icon: '🚇',
    color: 'purple'
}
```

---

## Page Structure (14 pages)

### Page 1: Why Git in Detail (Introduction)
**Slug:** `git-in-detail/introduction` | **Time:** 4 min | **Prereq:** `git-basics`

**Content:**
- AI coding assistants (Claude Code, Cursor, Copilot) use Git's advanced features constantly — worktrees for parallel work, rebasing for clean history, stashing to context-switch, hooks for validation
- If you only know the 6 basics, you'll hit walls: "Claude just said it's rebasing onto main — what does that mean?" "Why did it create a worktree?"
- This section goes deep. Even if you think you know Git, check each page — the research says 70% of developers have used commands they don't fully understand
- Overview of what's covered with links to each page
- "You still don't need to memorise commands. But you need to understand what's happening."

---

### Page 2: Setting Up Git
**Slug:** `git-in-detail/setup` | **Time:** 8 min | **Prereq:** `git-detail-intro`

**Content:**
- **`git init`** — creating a repo from scratch vs cloning
  - What actually happens (the `.git` folder)
  - `git init --bare` for server repos
- **`git config`** — the three levels (system, global, local)
  - Essential first-time setup: `user.name`, `user.email`, `init.defaultBranch`
  - Recommended power settings:
    - `push.autoSetupRemote = true` (never type `-u` again)
    - `fetch.prune = true` (auto-clean stale branches)
    - `rerere.enabled = true` (remember conflict resolutions)
    - `diff.algorithm = histogram` (smarter diffs)
    - `commit.verbose = true` (see diff while writing message)
    - `rebase.autoSquash = true`
    - `merge.conflictstyle = zdiff3` (better conflict markers)
  - Useful aliases
- **`.gitignore`** — patterns, nesting, global gitignore, `git check-ignore -v`
  - Common patterns: node_modules, .env, .DS_Store, build output
  - The `.gitignore` template collection (github/gitignore)
- **SSH keys** — `ssh-keygen`, adding to GitHub, testing connection
- **The `.git` folder** — quick tour (don't touch, but understand: HEAD, refs, objects, config)

---

### Page 3: The Staging Area
**Slug:** `git-in-detail/staging` | **Time:** 10 min | **Prereq:** `git-detail-setup`

**Content:**
- **The three areas** — working directory → staging area → repository
  - Why the staging area exists (selective commits, atomic changes)
  - The mental model: "staging = what goes into the next snapshot"
- **`git add`**
  - `git add <file>` — stage specific files
  - `git add .` — stage everything (and why it can be dangerous)
  - `git add -p` — patch mode (stage individual hunks) — game changer for clean commits
  - `git add -A` vs `git add .` — subtle difference with deletions
- **`git status`**
  - `-s` short format, `-b` branch info
  - Reading the output: staged, unstaged, untracked
- **`git diff`**
  - `git diff` — unstaged changes only
  - `git diff --staged` — staged changes (the most-forgotten flag)
  - `git diff HEAD` — all changes vs last commit
  - `git diff branch1..branch2` — compare branches
  - `--stat` for summary, `--word-diff` for prose, `-w` to ignore whitespace
  - `--name-only` and `--name-status`
- **`git commit`**
  - `-m "message"` — inline message
  - `-v` / `--verbose` — show diff in editor (should be default via config)
  - `--amend` — fix the last commit (message or contents)
  - `--amend --no-edit` — add files to last commit silently
  - `--fixup=<hash>` — for later autosquash
  - Atomic commits: one logical change per commit, the "if applied, this will..." test
- **`git rm`** and **`git mv`** — tracked file operations
- Common scenario examples:
  - "I changed 5 files but only want to commit 2"
  - "I want to split my changes into 3 clean commits"
  - "I forgot a file in my last commit"
  - "My commit message has a typo"

---

### Page 4: Branches in Depth
**Slug:** `git-in-detail/branches` | **Time:** 8 min | **Prereq:** `git-detail-staging`

**Content:**
- **What a branch actually is** — just a pointer to a commit (40 bytes!)
  - HEAD — the pointer to the current branch
  - Detached HEAD — what it means, when it happens, how to fix it
- **`git branch`**
  - `-a` all branches (local + remote)
  - `-v` / `-vv` verbose (with tracking info — extremely useful)
  - `-d` safe delete, `-D` force delete
  - `-m` rename
  - `--sort=-committerdate` — sort by recent (put in config!)
  - `--merged` / `--no-merged` — find branches ready to delete
- **`git switch`** (modern, Git 2.23+)
  - `git switch <branch>` — switch to existing
  - `git switch -c <branch>` — create and switch
  - `git switch -` — switch to previous branch (the `cd -` of Git)
  - Why switch is safer than checkout (refuses detached HEAD by default)
- **`git checkout`** (legacy, still works)
  - `git checkout <branch>` — same as switch
  - `git checkout -b <branch>` — same as switch -c
  - `git checkout <hash>` — detached HEAD! (switch refuses this)
  - When you still need checkout (checking out specific files from other commits)
- **Remote tracking branches**
  - What `origin/main` means
  - `git branch --set-upstream-to=origin/main`
  - How fetch updates tracking branches without touching your work
- **Branch naming conventions**
  - `feature/`, `fix/`, `chore/`, `release/`, `hotfix/`
  - Kebab-case, include ticket numbers: `feature/PROJ-123-add-search`

---

### Page 5: Merging in Depth
**Slug:** `git-in-detail/merging` | **Time:** 10 min | **Prereq:** `git-detail-branches`

**Content:**
- **Types of merge**
  - Fast-forward — when main hasn't moved, just slides the pointer forward
  - `--no-ff` — always create a merge commit (preserves branch history)
  - `--ff-only` — refuse if fast-forward isn't possible (useful for CI)
  - `--squash` — combine all branch commits into one, don't create merge commit
- **Merge conflicts**
  - Why they happen (same lines changed on both branches)
  - Reading conflict markers: `<<<<<<<`, `=======`, `>>>>>>>`
  - With `zdiff3` config: the `|||||||` base marker (shows what was originally there — much easier to resolve)
  - Step-by-step resolution: edit file → remove markers → `git add` → `git commit`
  - `git merge --abort` — cancel and go back to before the merge
  - Tools: VS Code merge editor, `git mergetool`
- **Merge strategies** (brief — mostly handled automatically)
  - `recursive` (default for 2-branch merges)
  - `ort` (newer, faster recursive replacement — default in Git 2.34+)
  - `octopus` (for merging multiple branches at once)
- **When to merge vs rebase** (preview — detailed in next page)
  - Merge: preserves complete history, safe for shared branches
  - Rebase: cleaner linear history, only for local/private branches
  - Recommended hybrid: rebase locally, merge (with --no-ff) into main
- Common scenarios:
  - "Main has moved ahead while I was on my branch"
  - "I want to see exactly when this feature was integrated"
  - "Merge conflict in a file I didn't even change" (transitive conflicts)

---

### Page 6: Rebasing
**Slug:** `git-in-detail/rebasing` | **Time:** 10 min | **Prereq:** `git-detail-merging`

**Content:**
- **What rebase does** — replays your commits on top of a new base
  - Visually: moves your branch from where it forked to the tip of main
  - Each commit gets a new SHA (it's a new commit, just with the same changes)
- **Basic rebase**
  - `git fetch origin && git rebase origin/main` — update your branch
  - `--continue`, `--abort`, `--skip` — handling conflicts during rebase
- **Interactive rebase (`git rebase -i`)**
  - `pick` — keep as-is
  - `squash` — meld into previous, edit combined message
  - `fixup` — meld into previous, discard this message
  - `reword` — change the commit message
  - `edit` — pause and let you amend the commit
  - `drop` — delete the commit entirely
  - Reorder by rearranging lines
  - Use case: cleaning up 15 WIP commits into 3 meaningful ones before a PR
- **The Golden Rule**
  - **NEVER rebase commits that have been pushed to a shared branch**
  - Why: rebase rewrites history (new SHAs). If someone else has the old commits, their history diverges. Chaos.
  - Safe: rebasing your own unpushed feature branch
  - Dangerous: rebasing main, rebasing a branch others are working on
  - If you did it anyway: `--force-with-lease` (safer force push — refuses if remote has new commits you haven't seen)
- **`git commit --fixup=<hash>` + `git rebase -i --autosquash`**
  - The workflow: commit a fix, mark it as a fixup for an earlier commit, then autosquash
  - With `rebase.autoSquash = true` in config, fixups auto-arrange in interactive rebase
- **Rebase vs merge — the full picture**
  - Rebase for: keeping feature branches up-to-date, cleaning history before merge
  - Merge for: integrating into shared branches, preserving integration points
  - The recommended workflow: rebase your branch onto main regularly, then merge (--no-ff) the clean branch into main

---

### Page 7: Working with Remotes
**Slug:** `git-in-detail/remotes` | **Time:** 10 min | **Prereq:** `git-detail-rebasing`

**Content:**
- **What a remote is** — a bookmark to another copy of the repo
  - `origin` — the default name for where you cloned from
  - `upstream` — convention for the original repo when you're working on a fork
- **`git remote`**
  - `-v` — show URLs
  - `add <name> <url>` — add a remote
  - `set-url` — change URL (e.g., HTTPS → SSH)
  - `remove` — remove a remote
- **`git clone`** (in depth)
  - `--depth 1` — shallow clone (fast, saves space, great for CI)
  - `--branch <name>` — clone a specific branch
  - `--recurse-submodules` — also clone submodules
  - `--bare` — clone without working directory (for servers)
  - HTTPS vs SSH — when to use which, how to switch
- **`git fetch`**
  - What it does: downloads commits, branches, tags — but doesn't change your working directory
  - `git fetch origin` — fetch from origin
  - `--all` — fetch from all remotes
  - `--prune` — delete local tracking branches that no longer exist on remote
  - **fetch vs pull**: fetch = download only, pull = fetch + merge (or rebase)
  - When to fetch instead of pull: when you want to see what changed before integrating
- **`git pull`**
  - `--rebase` — rebase instead of merge (cleaner history; set `pull.rebase = true` in config)
  - `--ff-only` — refuse if not a fast-forward (useful for main)
  - Why "just pull" can surprise you: creates merge commits you didn't expect
- **`git push`**
  - `-u origin <branch>` — set upstream tracking (first push of a new branch)
  - With `push.autoSetupRemote = true` in config: just `git push`, always works
  - `--force-with-lease` — safe force push (refuses if remote has commits you haven't fetched)
  - `--force` — DANGEROUS force push (overwrites remote regardless). 45% of developers have been burned by this.
  - `--delete origin <branch>` — delete a remote branch
  - `--tags` — push all tags
- **Working with forks**
  - Fork → clone your fork → add upstream remote → fetch upstream → rebase onto upstream/main → push to origin
  - Keeping a fork in sync

---

### Page 8: Stashing
**Slug:** `git-in-detail/stashing` | **Time:** 6 min | **Prereq:** `git-detail-remotes`

**Content:**
- **What stash is** — a temporary shelf for unfinished work
  - The problem: "I need to switch branches but I'm not ready to commit"
  - Stash = save your changes, get a clean working directory, do something else, come back
- **`git stash`** (or `git stash push`)
  - `git stash push -m "description"` — named stash (DO THIS — unnamed stashes are chaos)
  - `-u` / `--include-untracked` — also stash new files that aren't tracked
  - `-a` / `--all` — stash everything including ignored files
  - `--keep-index` — stash unstaged changes but keep staged changes (useful for testing just what's staged)
  - `-p` / `--patch` — interactive, stash specific hunks
- **Getting stashed changes back**
  - `git stash pop` — apply most recent stash AND remove it from the stack
  - `git stash apply` — apply but keep it in the stack (safer — you can always drop it later)
  - `git stash apply stash@{2}` — apply a specific stash
- **Managing stashes**
  - `git stash list` — show all stashes
  - `git stash show` / `git stash show -p` — preview what's in a stash
  - `git stash drop stash@{n}` — delete a specific stash
  - `git stash clear` — delete ALL stashes (careful!)
  - `git stash branch <name>` — create a branch from a stash (great for "this WIP deserves its own branch")
- **28% of developers have lost work with stash.** Tips:
  - Always name your stashes (`-m`)
  - Prefer `apply` over `pop` until you're sure it worked
  - If pop has a conflict: the stash is NOT dropped. Resolve, then manually `git stash drop`
- Common scenarios:
  - "Urgent bug! I'm mid-feature, need to switch to main"
  - "I want to test just my staged changes — stash the rest temporarily"
  - "This WIP has grown — it deserves its own branch"

---

### Page 9: Investigating History
**Slug:** `git-in-detail/history` | **Time:** 10 min | **Prereq:** `git-detail-stashing`

**Content:**
- **`git log`** — the most option-rich Git command
  - `--oneline` — one line per commit (use this constantly)
  - `--graph` — ASCII branch visualisation
  - `--all` — include all branches
  - `--oneline --graph --all` — the "show me everything" combo
  - `--stat` — which files changed and how much
  - `-p` / `--patch` — full diff for each commit
  - `--author="name"` — filter by author
  - `--since="2 weeks ago"` / `--until="yesterday"` — date range
  - `--grep="keyword"` — search commit messages
  - `-S "search term"` — pickaxe: find when a string was added or removed
  - `-G "regex"` — grep in diffs (more flexible pickaxe)
  - `-- path/to/file` — history of a specific file
  - `-L :functionName:file.js` — history of a specific function (!)
  - `--diff-filter=D -- filename` — find when a file was deleted
  - `branch1..branch2` — commits in branch2 not in branch1
  - `--no-merges` — exclude merge commits
  - `--pretty=format:"%h %an %ar %s"` — custom format
- **`git show <hash>`** — view a specific commit's details and diff
- **`git blame`**
  - `git blame <file>` — who last changed each line, and when
  - `-L 10,20` — blame a specific line range
  - `-w` — ignore whitespace changes (filters out reformatting noise)
  - `-M` — detect moved lines within a file
  - `-C` — detect copied lines from other files
  - Pro tip: blame is for understanding, not for blaming. Follow up with `git show <hash>` to read the full commit.
- **`git bisect`** — binary search for bugs
  - The scenario: "this worked two weeks ago, now it's broken, 200 commits in between"
  - `git bisect start` → `git bisect bad` (current is broken) → `git bisect good <hash>` (this was working) → Git checks out the midpoint → test → `good` or `bad` → repeat
  - In 1000 commits, finds the culprit in ~10 steps
  - `git bisect run <test-script>` — fully automated (the "chef's kiss" version)
  - `git bisect reset` — go back to where you started
- Common scenarios:
  - "Who wrote this line and why?"
  - "When did we remove the old API endpoint?"
  - "What changed in the last sprint?"
  - "Which exact commit broke the login flow?"

---

### Page 10: Undoing Things
**Slug:** `git-in-detail/undoing` | **Time:** 10 min | **Prereq:** `git-detail-history`

**Content:**
- **Overview: the undo spectrum** — from gentle to nuclear
  - `restore` (file-level, gentle) → `revert` (commit-level, safe) → `reset --soft` → `reset --mixed` → `reset --hard` (nuclear)
- **`git restore`** (Git 2.23+ — replaces `git checkout -- <file>`)
  - `git restore <file>` — discard working directory changes
  - `git restore --staged <file>` — unstage a file (replaces `git reset HEAD <file>`)
  - `git restore --source=HEAD~3 <file>` — get a file from 3 commits ago
  - Why restore is better: single purpose, no risk of detached HEAD
- **`git revert`**
  - Creates a new commit that undoes a previous commit
  - Safe for shared branches — doesn't rewrite history
  - `git revert <hash>` — revert a specific commit
  - `git revert HEAD` — revert the most recent commit
  - `-n` / `--no-commit` — stage the revert without committing (useful for reverting multiple commits)
  - Reverting a merge commit: `git revert -m 1 <merge-hash>` (specify which parent to keep)
- **`git reset`**
  - `--soft HEAD~1` — undo the commit, keep everything staged. Like pressing "uncommit"
  - `--mixed HEAD~1` — undo the commit AND unstaging. Changes are in working directory. (This is the default!)
  - `--hard HEAD~1` — undo everything. Changes are **gone**. (But see reflog below)
  - Can also reset to any commit: `git reset --soft <hash>`
  - `git reset HEAD <file>` — unstage a specific file (older syntax; `git restore --staged` is cleaner)
- **`git reflog`** — your safety net
  - Records every movement of HEAD, even for commits no longer in any branch
  - `git reflog` — show the log
  - The recovery pattern: find the SHA before the mistake → `git reset --hard <sha>` or `git branch recovered <sha>`
  - Retention: 90 days for reachable commits, 30 days for unreachable
  - Local only — not pushed to remotes, not shared
- **The "Oh No" table** — 12 common disasters and their fixes:

| Disaster | Fix |
|----------|-----|
| Committed to wrong branch | `git reset --soft HEAD~1`, switch, re-commit |
| Typo in commit message | `git commit --amend -m "correct message"` |
| Forgot a file in last commit | `git add file && git commit --amend --no-edit` |
| Need to undo a pushed commit | `git revert <hash>` |
| Accidentally `reset --hard` | `git reflog` → find SHA → `git reset --hard <sha>` |
| Detached HEAD with commits | `git branch save-my-work` before switching away |
| Merge conflicts everywhere | `git merge --abort` to cancel, rethink approach |
| Rebase went sideways | `git rebase --abort` (during) or reflog (after) |
| Deleted a branch | `git reflog` → `git branch <name> <sha>` |
| Staged a .env file | `git restore --staged .env`, add to .gitignore |
| Pushed a secret | Rotate it NOW, then `git filter-repo` to remove from history |
| Need to switch branches with WIP | `git stash push -m "wip"`, switch, come back, `git stash pop` |

---

### Page 11: Worktrees
**Slug:** `git-in-detail/worktrees` | **Time:** 8 min | **Prereq:** `git-detail-undoing`

**Content:**
- **The problem worktrees solve**
  - You're mid-feature on a branch. Urgent bug comes in. Options: commit WIP, stash, or... worktree.
  - Or: you want to run two AI agents on two features simultaneously. Same repo, two branches, at the same time.
  - A worktree is a second (or third, or fourth) working directory that shares the same `.git` database
- **How they work**
  - One repo, multiple checkouts. Each worktree is on its own branch.
  - Near-zero disk overhead (shared objects database)
  - All worktrees see each other's commits, stashes, remotes instantly
  - Constraint: two worktrees can't be on the same branch at the same time
- **Commands**
  - `git worktree add ../hotfix-branch hotfix/login-crash` — create a worktree checking out an existing branch
  - `git worktree add -b feature/new-thing ../new-thing` — create with a new branch
  - `git worktree list` — show all worktrees
  - `git worktree remove ../hotfix-branch` — clean up
  - `git worktree lock` / `unlock` — prevent accidental pruning
  - `git worktree prune` — clean up stale entries
- **Why AI coding assistants love worktrees**
  - Claude Code uses worktrees to isolate work from your main checkout
  - You can run multiple Claude Code sessions, each in its own worktree, on different branches
  - No conflicts between agents — each has its own working directory
  - Cursor's "Parallel Agents" feature is built on worktrees
  - Companies like incident.io run 4-5 AI agents simultaneously via worktrees
- **The AI worktree workflow**
  1. Main worktree: your active development
  2. `git worktree add ../ai-feature-1 -b feature/search` — AI agent 1 works here
  3. `git worktree add ../ai-feature-2 -b feature/auth` — AI agent 2 works here
  4. Review each agent's PR independently
  5. Clean up: `git worktree remove ../ai-feature-1`
- **Worktrees vs stash vs multiple clones**
  - Stash: temporary, single-branch, easy to forget
  - Multiple clones: disk-heavy, separate histories, can diverge
  - Worktrees: lightweight, shared history, purpose-built for this

---

### Page 12: Pull Requests
**Slug:** `git-in-detail/pull-requests` | **Time:** 10 min | **Prereq:** `git-detail-worktrees`

**Content:**
- **What a PR actually is**
  - Not a Git command — it's a platform feature (GitHub, GitLab, Bitbucket)
  - A request to merge your branch into another branch, with discussion and review
  - The central collaboration mechanism for modern development
- **The PR lifecycle**
  1. Create a feature branch: `git switch -c feature/add-search`
  2. Make commits (small, atomic, well-messaged)
  3. Keep your branch current: `git fetch origin main && git rebase origin/main`
  4. Push: `git push -u origin feature/add-search`
  5. Open the PR (via `gh pr create` or web UI)
  6. Description: what, why, how to test, screenshots
  7. Code review happens — reviewers comment, request changes
  8. Address feedback: commit fixes, push again
  9. Clean up history if needed: `git rebase -i` to squash WIP commits
  10. Merge (reviewer or CI merges via the platform)
  11. Clean up: `git branch -d feature/add-search && git fetch --prune`
- **Merge methods** (platform settings)
  - **Merge commit** — preserves all commits + creates a merge commit. Full history.
  - **Squash and merge** — combines all branch commits into one commit on main. Clean history, loses detail.
  - **Rebase and merge** — replays branch commits onto main individually. Linear history, preserves granularity.
  - When to use which: squash for messy branches, rebase for clean branches, merge for preserving full context
- **Writing good PRs**
  - Title: what it does (imperative mood, under 72 chars)
  - Description: why, what changed, how to test, screenshots for UI changes
  - Small PRs are reviewed faster — aim for <400 lines changed
  - Draft PRs for early feedback
- **Reviewing PRs**
  - `git fetch origin && git switch feature/their-branch` — check out locally
  - Or: `gh pr checkout 123` — GitHub CLI shortcut
  - Test it, don't just read it
- **Using `gh` CLI for PRs**
  - `gh pr create` — create PR from command line
  - `gh pr list` — list open PRs
  - `gh pr checkout <number>` — check out a PR locally
  - `gh pr merge <number>` — merge a PR
  - `gh pr review <number>` — add a review
  - Claude Code can do all of this for you

---

### Page 13: Tags, Releases & Cherry-Pick
**Slug:** `git-in-detail/tags` | **Time:** 6 min | **Prereq:** `git-detail-pull-requests`

**Content:**
- **`git tag`** — marking important points
  - **Lightweight** tags: just a name pointing to a commit (like a branch that doesn't move)
  - **Annotated** tags: full objects with tagger name, date, message (USE THESE for releases)
  - `git tag -a v1.2.3 -m "Release 1.2.3"` — create annotated tag
  - `git tag v1.2.3` — lightweight tag (fine for temporary markers)
  - `git tag -l "v1.*"` — list matching tags
  - `git tag -d v1.2.3` — delete a local tag
  - `git push --tags` — push all tags to remote
  - `git push origin v1.2.3` — push a specific tag
  - `git push --delete origin v1.2.3` — delete a remote tag
- **Semantic versioning** — MAJOR.MINOR.PATCH
  - MAJOR: breaking changes (v1.x.x → v2.0.0)
  - MINOR: new features, backwards-compatible (v1.2.x → v1.3.0)
  - PATCH: bug fixes (v1.2.3 → v1.2.4)
- **`git cherry-pick`** — applying specific commits from other branches
  - `git cherry-pick <hash>` — apply one commit
  - `git cherry-pick <hash1> <hash2>` — apply multiple commits
  - `-n` / `--no-commit` — apply changes but don't commit (stage only)
  - `--continue`, `--abort` — for handling conflicts
  - When to use: backporting a bugfix to a release branch, grabbing one commit from a branch you don't want to merge entirely
  - Warning: creates new commits with new SHAs. Can cause duplicate-looking history if you later merge the original branch.
- Common scenarios:
  - "Ship v2.1.0 from what's on main right now"
  - "That bugfix on `develop` needs to go to the `v2.0.x` release branch too"

---

### Page 14: Git Hooks & Automation
**Slug:** `git-in-detail/hooks` | **Time:** 8 min | **Prereq:** `git-detail-tags`

**Content:**
- **What hooks are** — scripts that run automatically at key Git events
  - Live in `.git/hooks/` (local, not shared by default)
  - Can block actions (exit non-zero = abort)
  - Client-side vs server-side
- **The hooks you'll actually use**
  - **`pre-commit`** — runs before commit is created
    - Lint your code, run formatters, check for secrets, validate file sizes
    - If it exits non-zero, the commit is blocked
  - **`commit-msg`** — runs after you write the message
    - Enforce Conventional Commits format (`feat:`, `fix:`, `chore:`)
    - Check message length, format, ticket references
  - **`pre-push`** — runs before push
    - Run test suite, prevent pushing to main directly
    - Last line of defence
  - **`post-checkout`** / **`post-merge`** — after switching branches or merging
    - Auto-install dependencies when package.json changes
- **Hook management tools**
  - **Husky** (Node.js) — most popular, `.husky/` directory committed to repo
  - **Lefthook** (Go binary) — faster, multi-language, `lefthook.yml` config
  - **pre-commit** (Python) — language-agnostic framework with plugin ecosystem
  - Why tools > raw scripts: shareable, versioned, easy to install for new team members
- **Hooks and AI coding assistants**
  - Claude Code respects pre-commit hooks (won't bypass them)
  - Hooks catch AI-generated code that doesn't meet standards
  - `commit-msg` hooks ensure AI commits follow your message conventions
  - `pre-push` hooks verify AI changes pass tests before sharing
- Common hook recipes:
  - Block commits containing `console.log` or `debugger`
  - Auto-format with Prettier on commit
  - Require branch names to match a pattern
  - Scan for API keys and secrets (GitLeaks)

---

## Implementation Notes

### Tone & Style
- **Easy to use**: every command explained with "when you'd actually use this" scenarios
- **Slightly tongue in cheek**: playful headings, relatable frustration ("we've all been there"), the "oh no" table
- **No assumed knowledge**: each page is self-contained. Jargon is explained on first use.
- **AI-aware**: regularly reference "Claude Code can do this for you" and "here's what your AI is doing when it says X"
- **ClaudePrompt examples**: each page should have 2-3 `ClaudePrompt` components showing natural language → git operation

### Images
- Each page gets a London Tube map style Nanobanana image (same style as Git Basics)
- Mosaic tile wall, tentacled aliens, meaningful tube map diagrams for each concept
- Images should be generated as pages are built

### Ordering in state.svelte.ts
All 14 modules use `tier: 'core'` with `path: 'git-in-detail'`. Order 0-13 within the path. First module prerequisite: `git-basics`.

### Existing git-reference page
The standalone `/git-reference` page can stay as-is — it's a quick reference card. Link to it from the intro page as "already have the concepts? Here's the cheat sheet."

### Page not included: Git Workflows
Originally planned as page 15 (GitHub Flow, GitFlow, trunk-based development). Decided to fold workflow context into the pages where it's relevant:
- PR page covers GitHub Flow naturally
- Branching page mentions naming conventions by workflow
- Rebasing page covers the "rebase locally, merge publicly" hybrid
- A dedicated workflows page can be added later if requested

---

## Estimated Scope

| Item | Count |
|------|-------|
| Pages to create | 14 |
| Module entries in state.svelte.ts | 14 |
| Nanobanana images to generate | 14 |
| Infrastructure changes | PathId type + paths object + sidebar rendering |
| Total estimated reading time | ~118 minutes |
| Estimated implementation time | Significant — each page is 100-200 lines of Svelte |
