<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
</script>

<ModuleLayout
	moduleId="skills-overview"
	title="The Skills System"
	description="63 skills across 13 categories — your AI toolkit"
	estimatedMinutes={8}
	nextSlug="get-things-done/skill-hierarchy"
>

<h2>What are skills?</h2>

<p>Skills are PAI's structured capabilities. Unlike free-form prompting where you hope the AI understands what you want, skills are <strong>deterministic, tested, and versioned</strong>. Each skill knows exactly what it does, what inputs it needs, and what outputs it produces.</p>

<p>Think of them as specialized tools in a workshop. You wouldn't use a hammer for everything — you'd pick the right tool for the job. PAI does the same with skills.</p>

<DiagramImage src="pai-component-2-skill-system.png" alt="PAI Skill System architecture" caption="The Skill System: 63 deterministic, versioned capabilities" />

<h2>13 categories, 63 skills</h2>

<p>PAI organizes its skills into categories that cover most knowledge work:</p>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 my-6">
	{#each [
		'Writing & Content', 'Code & Development', 'Research & Analysis',
		'Planning & Strategy', 'Communication', 'Data & Extraction',
		'Security & Review', 'Learning & Education', 'Creative',
		'System Management', 'Integration', 'Workflows', 'Meta / Self-Improvement'
	] as cat, i}
		<div class="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-200 text-sm">
			<span class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold" style="background: var(--color-accent-light); color: var(--color-accent)">{i + 1}</span>
			{cat}
		</div>
	{/each}
</div>

<h2>How skills get invoked</h2>

<p>You don't always need to call skills explicitly. PAI uses <strong>context routing</strong> — it reads what you're asking for and automatically selects the right skill. If you say "write a blog post about AI trends," PAI knows to invoke its writing skill with the right parameters.</p>

<p>But you can also invoke skills directly when you know exactly what you want:</p>

<h3>Invoking skills by name</h3>

<p>Prefix a skill name with <code>/</code> to call it directly, bypassing context routing:</p>

<Terminal command="/research AI agent frameworks 2025" output="PAI RESEARCH | Standard Mode
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Spawning 3 parallel research agents...
Agent 1: Scanning academic sources...
Agent 2: Scanning developer documentation...
Agent 3: Scanning recent articles and discussions...

Synthesizing findings from 47 sources...

Research complete. Output saved to ~/Documents/research/" title="PAI — Direct skill invocation" />

<h3>Natural language invocation</h3>

<p>Most of the time you just describe what you need. PAI figures out which skill to use:</p>

<Terminal command="Summarize the last 3 days of Hacker News posts about LLMs" output="PAI NATIVE MODE
TASK: Summarize recent HN posts about LLMs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Routing to: Scraping → ContentAnalysis
Fetching HN front page and comments...
Filtering for LLM-related posts...
Found 14 relevant posts across 3 days.

SUMMARY:
• Llama 4 benchmarks show..." title="PAI — Natural language routing" />

<h3>Chaining skills in conversation</h3>

<p>Skills can feed into each other within a single session. Here is a real example of asking PAI to do something that spans multiple skill categories:</p>

<Terminal command="Research what makes a good developer portfolio site, then draft an outline for mine" output="PAI ALGORITHM MODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 1: Research (standard mode, 3 agents)
  → 32 sources analyzed
  → Key patterns identified

Phase 2: Writing (outline mode)
  → Applying research findings
  → Structuring based on best practices

OUTLINE:
1. Hero section — clear value prop, not just name
2. Featured projects — 3 max, with impact metrics
3. Technical writing — blog posts showing depth
..." title="PAI — Multi-skill chain" />

<Callout type="tip">
	<p>You do not need to memorize skill names. Just describe your goal and PAI will route to the right skill. Direct invocation with <code>/skill-name</code> is there for when you want precision or to force a specific approach.</p>
</Callout>

<h2>How skills are defined</h2>

<p>Every skill is a YAML + Markdown file stored in <code>~/.claude/PAI/Skills/</code>. Each file declares:</p>

<ul>
	<li><strong>Name and version</strong> — skills are versioned independently</li>
	<li><strong>Inputs</strong> — what the skill expects (a topic, a file, a URL, etc.)</li>
	<li><strong>Modes</strong> — many skills have modes like quick, standard, and deep</li>
	<li><strong>Workflows</strong> — the step-by-step sequences the skill follows</li>
	<li><strong>Output format</strong> — what you get back and where it goes</li>
</ul>

<DiagramImage src="pai-component-3-memory-system.png" alt="PAI Memory System — hot, warm, and cold tiers" caption="The Memory System supports skills with context from past interactions" />

<Callout type="info">
	<p>Skills are backed by 338 workflows — predefined sequences that chain multiple actions together. A single skill invocation might trigger research, drafting, review, and formatting steps behind the scenes.</p>
</Callout>

</ModuleLayout>
