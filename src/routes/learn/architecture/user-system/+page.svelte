<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
</script>
<ModuleLayout moduleId="user-system-split" title="USER/ vs SYSTEM/" description="How PAI keeps your customizations safe during upgrades" estimatedMinutes={6} nextSlug="architecture/algorithm">
<h2>Two worlds, cleanly separated</h2>
<p>Inside <code>~/.claude/PAI/</code>, PAI maintains two directories that never interfere with each other. This is one of the most important architectural decisions in PAI — it's what makes the system both upgradeable and deeply personal.</p>

<DiagramImage src="pai-primitive-user-system-separation.png" alt="User/System separation — your files vs PAI infrastructure" caption="USER/ holds your personalization, SYSTEM/ holds PAI infrastructure — never mixed" />

<h3>The SYSTEM/ directory</h3>
<p><strong>SYSTEM/</strong> contains PAI's core infrastructure. Think of it as the "engine" — you rely on it, but you don't modify it directly. When you upgrade PAI, this entire directory gets replaced with the new version.</p>
<Terminal title="SYSTEM/ structure" command="ls ~/.claude/PAI/SYSTEM/" output="Algorithm/        # The Algorithm v3.6 definition
Skills/           # 63 built-in skills (git, code, deploy, etc.)
Hooks/            # 21 lifecycle hooks (session-start, pre-command, etc.)
Security/         # Command validation policies
Workflows/        # 338 standard workflows
Identity/         # Default DA personality and voice config
Memory/           # Memory system infrastructure
Modes/            # NATIVE, ALGORITHM, MINIMAL mode definitions" />
<p>Key files inside SYSTEM/ include:</p>
<ul>
<li><code>Algorithm/v3.5.0.md</code> — The full Algorithm specification that PAI follows for complex tasks</li>
<li><code>Skills/registry.md</code> — Index of all available skills with resolution rules</li>
<li><code>Hooks/lifecycle.md</code> — Hook definitions and firing order</li>
<li><code>Security/policies.md</code> — What commands are allowed, blocked, or require confirmation</li>
</ul>

<h3>The USER/ directory</h3>
<p><strong>USER/</strong> is yours. It's everything that makes PAI personal to you. This directory is <strong>never touched during upgrades</strong> — not a single file gets modified, moved, or deleted.</p>
<Terminal title="USER/ structure" command="ls ~/.claude/PAI/USER/" output="TELOS/            # Your 10 context files
  MISSION.md      # Your purpose and driving motivation
  GOALS.md        # Current objectives and timelines
  PROJECTS.md     # Active work and tech stacks
  BELIEFS.md      # Principles about code and design
  KNOWLEDGE.md    # Domain expertise
  STYLE.md        # Communication preferences
  RELATIONSHIPS.md # People you work with
  CALENDAR.md     # Deadlines and time context
  ENVIRONMENT.md  # Your dev setup (OS, editor, tools)
  HISTORY.md      # Past decisions and outcomes
Preferences/      # Your settings (verbosity, formatting, etc.)
Workflows/        # Your custom workflows (override or extend SYSTEM)
Skills/           # Your custom skills
Hooks/            # Your custom hooks
Memory/           # Your warm and cold memory files" />
<p>The TELOS files are the heart of USER/. They're plain Markdown files that you can edit directly. When PAI reads them at session start, it builds a complete picture of who you are, what you're working on, and how you like to work.</p>

<h3>Override mechanics</h3>
<p>When both USER/ and SYSTEM/ contain a file with the same name, <strong>USER/ always wins</strong>. This gives you a clean way to customize built-in behavior without modifying system files.</p>
<Callout type="tip"><p>Want to change how the "git-commit" skill works? Don't edit <code>SYSTEM/Skills/git-commit.md</code>. Instead, create <code>USER/Skills/git-commit.md</code> with your version. PAI will use yours. If you ever want to revert, just delete your override.</p></Callout>
<p>This override pattern works for skills, hooks, workflows, and even identity settings. It's the same principle as CSS specificity or environment variable overrides — the more specific (user-level) definition takes precedence.</p>

<h3>What happens during an upgrade?</h3>
<p>When a new version of PAI is released, the upgrade process is straightforward:</p>
<ol>
<li><strong>SYSTEM/ gets replaced</strong> — The entire directory is swapped with the new version. New skills, updated algorithms, patched security policies all come in.</li>
<li><strong>USER/ stays untouched</strong> — Not a single byte changes. Your TELOS, preferences, custom workflows, memories — all exactly as you left them.</li>
<li><strong>Hooks fire</strong> — Post-upgrade hooks can run migration logic if the new version needs to notify you of changes or offer new configuration options.</li>
</ol>
<Terminal title="Upgrade process" command="pai upgrade" output="Downloading PAI v4.1.0...
Backing up SYSTEM/ → SYSTEM.bak/
Replacing SYSTEM/ with v4.1.0
USER/ unchanged (14 files, 3 custom skills, 2 custom hooks)
Running post-upgrade hooks...
  ✓ Compatibility check passed
  ✓ New skills available: docker-compose, k8s-deploy
Upgrade complete. Your TELOS and preferences are intact." />

<h3>Why this matters</h3>
<p>Most AI tools force a tradeoff: either you customize heavily and dread updates, or you stay vanilla and miss out on personalization. PAI eliminates this tradeoff entirely.</p>
<Callout type="info"><p>The USER/SYSTEM split is inspired by how operating systems separate user home directories from system binaries. Just like <code>/usr/bin</code> gets updated by your package manager while <code>/home</code> stays yours, PAI keeps infrastructure and personalization in separate spaces.</p></Callout>
<p>This separation also makes PAI portable. Want to set up PAI on a new machine? Copy your USER/ directory. Everything that makes PAI "you" travels with it.</p>
</ModuleLayout>
