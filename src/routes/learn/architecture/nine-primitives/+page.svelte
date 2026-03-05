<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
</script>
<ModuleLayout moduleId="nine-primitives" title="The 9 Primitives" description="The building blocks of PAI's architecture" estimatedMinutes={10} nextSlug="architecture/user-system">
<h2>Architecture building blocks</h2>
<p>PAI is built on 9 core primitives — modular components that each handle one aspect of making AI personal and persistent. Unlike monolithic AI tools, each primitive is independently useful and replaceable. Let's walk through each one and why it matters.</p>

<h3>1. Assistant vs Agent Interaction</h3>
<p>Most AI tools treat every conversation as a blank slate. PAI doesn't. It maintains a persistent identity — it knows your name, your projects, your preferences, your communication style. This is the difference between a tool and a collaborator.</p>
<p>In practice, this means PAI can say "Last time we worked on the API refactor, you preferred explicit error handling over try-catch blocks" without you reminding it. The assistant model carries context <strong>across sessions</strong>, not just within them.</p>

<h3>2. TELOS (Deep Goal Understanding)</h3>
<p>TELOS is a set of 10 structured context files that capture who you are at multiple levels. These aren't vague summaries — they're specific, actionable documents:</p>
<ul>
<li><strong>MISSION.md</strong> — Your overarching purpose and what drives you</li>
<li><strong>GOALS.md</strong> — Current objectives with timelines and priorities</li>
<li><strong>PROJECTS.md</strong> — Active work with status, tech stacks, and blockers</li>
<li><strong>BELIEFS.md</strong> — Your principles about code, design, and work</li>
<li><strong>KNOWLEDGE.md</strong> — Domain expertise and technical background</li>
<li><strong>STYLE.md</strong> — Communication and coding style preferences</li>
<li><strong>RELATIONSHIPS.md</strong> — People you work with and their roles</li>
<li><strong>CALENDAR.md</strong> — Time-sensitive context and deadlines</li>
<li><strong>ENVIRONMENT.md</strong> — Your tools, OS, editor, and dev setup</li>
<li><strong>HISTORY.md</strong> — Past decisions and their outcomes</li>
</ul>
<p>When PAI reads your TELOS before responding, it doesn't just answer your question — it answers it in a way that aligns with your mission, respects your beliefs, and fits your current projects.</p>

<h3>3. User/System Separation</h3>
<p>Everything in PAI lives in either <code>USER/</code> or <code>SYSTEM/</code>. Your personal files (TELOS, custom workflows, preferences) go in USER. PAI's infrastructure (skills, hooks, the algorithm) lives in SYSTEM. When you upgrade PAI, only SYSTEM changes. Your stuff is untouched.</p>
<p>This solves one of the biggest problems with AI tools: the fear of losing your configuration when updating. With PAI, upgrades are fearless.</p>

<h3>4. Granular Customization</h3>
<p>PAI provides six distinct layers of customization, each serving a different purpose:</p>
<ul>
<li><strong>Identity</strong> — Who PAI is (name, personality, voice)</li>
<li><strong>Preferences</strong> — How you like things done (formatting, verbosity, tool choices)</li>
<li><strong>Workflows</strong> — Multi-step processes you run repeatedly (338 workflows and counting)</li>
<li><strong>Skills</strong> — Atomic capabilities PAI can invoke (63 skills)</li>
<li><strong>Hooks</strong> — Event-driven automations (21 hooks)</li>
<li><strong>Memory</strong> — Learned patterns from past interactions</li>
</ul>
<p>Each layer can be customized independently. You might change your preferences without touching your workflows, or add a new skill without affecting your identity settings.</p>

<h3>5. Skill System</h3>
<p>Skills are PAI's deterministic capabilities — reliable, repeatable actions that follow a strict resolution order: <strong>CODE → CLI → PROMPT → SKILL</strong>. This means PAI first checks if there's hardcoded logic, then a CLI command, then a prompt template, then a general skill definition.</p>
<Terminal title="Skill Resolution" command="pai skill run git-commit" output="Resolving skill: git-commit
  CODE handler: not found
  CLI handler: found → git commit -m (with AI-generated message)
  Executing CLI skill..." />
<p>Skills are composable — complex workflows chain multiple skills together. A "deploy" workflow might invoke skills for testing, building, versioning, and pushing in sequence.</p>

<h3>6. Memory System</h3>
<p>PAI's memory operates in three tiers, inspired by how human memory works:</p>
<ul>
<li><strong>Hot memory</strong> — Current session context. What you just said, what files are open, what task you're working on. Fast, ephemeral.</li>
<li><strong>Warm memory</strong> — Recent learnings persisted to disk. "This user prefers Svelte over React" or "The staging server needs VPN access." Survives between sessions.</li>
<li><strong>Cold memory</strong> — Long-term patterns stored in TELOS and history files. Deep preferences, past decisions, project evolution over months.</li>
</ul>
<p>The "Learn" step of the Algorithm writes to warm memory. Over time, frequently-accessed warm memories get promoted into your TELOS files as cold storage.</p>

<h3>7. Hook System</h3>
<p>Hooks are event handlers that fire at specific lifecycle moments — session start, session end, before a command runs, after a task completes. They're PAI's automation layer.</p>
<Terminal title="Hook Example" command="# On session start, these hooks fire:" output="hook: load-telos → reads your 10 TELOS files
hook: check-calendar → flags upcoming deadlines
hook: load-memory → pulls recent warm memories
hook: project-detect → identifies active project from cwd" />
<p>With 21 built-in hooks, PAI automates context loading, cleanup, notifications, and more. You can add your own hooks in USER/ for custom automation.</p>

<h3>8. Security System</h3>
<p>Every command PAI runs gets validated against security policies. This prevents prompt injection attacks (where malicious content in a file tries to trick PAI into running harmful commands) and enforces boundaries you set.</p>
<Callout type="warning"><p>Without a security layer, an AI assistant with shell access is a significant risk. PAI's security system validates commands before execution and blocks anything that violates your configured policies — like destructive operations on production systems.</p></Callout>

<h3>9. Voice System</h3>
<p>PAI can speak to you using ElevenLabs text-to-speech. This isn't a gimmick — it provides ambient awareness. When PAI finishes a long-running task, you hear it. When something fails, you hear the tone shift. Voice feedback lets you multitask while PAI works.</p>
<Terminal title="Voice Notification" command="curl -s -X POST http://localhost:8888/notify -d '...'" output="Speaking: Build complete
Audio duration: 1.2s" />

<h2>How they compose together</h2>
<p>The real power of the 9 primitives isn't any individual piece — it's how they combine. Consider what happens when you start a new coding session:</p>
<ol>
<li>The <strong>Hook System</strong> fires session-start events</li>
<li>Hooks load your <strong>TELOS</strong> context (who you are, what you're working on)</li>
<li>The <strong>Memory System</strong> pulls in recent learnings from your last session</li>
<li>Your <strong>Preferences</strong> configure how PAI will communicate and work</li>
<li>The <strong>Security System</strong> activates command validation</li>
<li>PAI greets you as the <strong>persistent assistant</strong> that already knows your context</li>
</ol>
<p>All of this runs from the <strong>USER/SYSTEM split</strong>, so your personal configuration is safe. And when you make a request, the <strong>Algorithm</strong> orchestrates <strong>Skills</strong> to execute it, with <strong>Voice</strong> providing feedback along the way.</p>

<Callout type="tip"><p>Think of the 9 primitives like LEGO bricks. Each one is simple and well-defined. The complexity — and the magic — comes from how they snap together. You can swap any brick without breaking the others.</p></Callout>
</ModuleLayout>
