<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';

	const principles = [
		{ num: 1, name: 'User Centricity', short: 'You come first, not tools or models' },
		{ num: 2, name: 'Foundational Algorithm', short: 'Scientific method: Observe → Think → Plan → Build → Execute → Verify → Learn' },
		{ num: 3, name: 'Clear Thinking First', short: 'Clarify the problem before you prompt' },
		{ num: 4, name: 'Scaffolding > Model', short: 'Architecture matters more than which model you use' },
		{ num: 5, name: 'Deterministic Infrastructure', short: 'Use templates and structure, not random AI output' },
		{ num: 6, name: 'Code Before Prompts', short: 'If bash can do it, don\'t ask AI' },
		{ num: 7, name: 'Spec/Test/Evals First', short: 'Define success before building' },
		{ num: 8, name: 'UNIX Philosophy', short: 'Do one thing well, then compose' },
		{ num: 9, name: 'ENG/SRE Principles', short: 'Treat AI like production software' },
		{ num: 10, name: 'CLI as Interface', short: 'Text beats GUIs for speed and scriptability' },
		{ num: 11, name: 'Goal → Code → CLI → Prompts → Agents', short: 'Decision hierarchy — use the simplest solution' },
		{ num: 12, name: 'Skill Management', short: 'Modular capabilities, routed by context' },
		{ num: 13, name: 'Memory System', short: 'Capture everything worth remembering' },
		{ num: 14, name: 'Agent Personalities', short: 'Different work needs different voices' },
		{ num: 15, name: 'Science as Meta-Loop', short: 'Hypothesis → Experiment → Measure → Iterate' },
		{ num: 16, name: 'Permission to Fail', short: 'Say "I don\'t know" to prevent hallucinations' },
	];

	let expanded = $state<number | null>(null);
</script>

<ModuleLayout
	moduleId="principles-overview"
	title="The 16 Principles"
	description="A visual tour of the ideas that guide PAI's design"
	estimatedMinutes={8}
	nextSlug="foundation/installation"
>

<p>PAI isn't just a collection of scripts. It's built on a coherent philosophy — 16 principles that guide every design decision. You don't need to memorize them, but understanding the thinking behind PAI will help you get the most out of it.</p>

<Callout type="info">
	<p>Click any principle to learn more. Don't worry about absorbing all of these now — they'll become intuitive as you use PAI.</p>
</Callout>

<div class="space-y-2 my-8">
	{#each principles as p}
		<button
			class="w-full text-left rounded-xl border transition-all cursor-pointer {expanded === p.num ? 'bg-white border-gray-300 shadow-sm' : 'bg-white/60 border-gray-200 hover:bg-white hover:border-gray-300'}"
			onclick={() => expanded = expanded === p.num ? null : p.num}
		>
			<div class="flex items-start gap-3 p-4">
				<span class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 {expanded === p.num ? 'text-white' : 'bg-gray-100 text-gray-500'}" style="{expanded === p.num ? 'background: var(--color-accent)' : ''}">{p.num}</span>
				<div class="flex-1 min-w-0">
					<p class="font-medium text-sm" style="color: var(--color-ink)">{p.name}</p>
					<p class="text-sm text-gray-500 mt-0.5">{p.short}</p>
				</div>
				<svg class="w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform {expanded === p.num ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
			</div>
		</button>
	{/each}
</div>

<h2>The big themes</h2>

<p>If you zoom out, these 16 principles cluster around a few big ideas:</p>

<p><strong>You are the priority.</strong> Principles 1, 3, and 14 all center on the human. PAI exists to serve your goals, not to show off AI capabilities.</p>

<p><strong>Structure beats cleverness.</strong> Principles 4, 5, 6, 7, 8, and 11 emphasize that good architecture and deterministic tools will outperform clever prompting every time.</p>

<p><strong>Learning is continuous.</strong> Principles 2, 13, 15, and 16 create a feedback loop where PAI (and you) get better over time through systematic observation and honest failure.</p>

<p><strong>Production-grade engineering.</strong> Principles 9, 10, and 12 mean PAI isn't a toy — it's infrastructure you can rely on, maintained like real software.</p>

</ModuleLayout>
