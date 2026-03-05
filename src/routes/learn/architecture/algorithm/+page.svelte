<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
</script>
<ModuleLayout moduleId="the-algorithm" title="The Algorithm v3.6" description="Observe → Think → Plan → Build → Execute → Verify → Learn" estimatedMinutes={12} nextSlug="architecture/how-it-fits">
<h2>PAI's universal problem-solving method</h2>
<p>At the heart of PAI is "The Algorithm" — a structured approach to solving any problem. It's based on the scientific method, adapted for AI-assisted work:</p>
<div class="space-y-3 my-6">
{#each ['Observe — Gather data and understand the situation', 'Think — Analyze what you\'ve observed, form hypotheses', 'Plan — Design an approach based on your analysis', 'Build — Create the solution', 'Execute — Run it in the real world', 'Verify — Check results against expectations', 'Learn — Capture what worked and what didn\'t'] as step, i}
<div class="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200">
<span class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style="background: var(--color-accent); color: white">{i + 1}</span>
<p class="text-sm">{step}</p>
</div>
{/each}
</div>
<p>This isn't just a suggestion — PAI actually follows this loop. Every complex task goes through these stages, and the "Learn" step feeds back into future interactions.</p>
</ModuleLayout>
