<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
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

<p>But you can also invoke skills directly if you know what you want:</p>

<Callout type="info">
	<p>Skills are backed by 338 workflows — predefined sequences that chain multiple actions together. A single skill invocation might trigger research, drafting, review, and formatting steps behind the scenes.</p>
</Callout>

<p><em>This path continues in Phase 2 — more skills content is being developed.</em></p>

</ModuleLayout>
