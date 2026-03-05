<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<ModuleLayout
	moduleId="models-strategies"
	title="Models & Strategies"
	description="Your mental models and how you approach problems"
	estimatedMinutes={10}
	nextSlug="know-me/narratives-ideas"
>

<h2>MODELS.md — How you think</h2>

<p>Mental models are the frameworks you use to understand the world. You have them whether you've written them down or not. The Pareto Principle, first-principles thinking, systems thinking — these are all mental models.</p>

<p>When PAI knows your preferred models, it can frame its reasoning in ways that resonate with how you actually think. Instead of generic advice, it can say: "Applying the 80/20 rule here, the biggest impact would be..."</p>

<div class="bg-white border border-gray-200 rounded-xl p-5 my-6">
	<p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3" style="font-family: var(--font-mono)">~/.claude/USER/TELOS/MODELS.md</p>
	<div class="text-sm text-gray-700 leading-relaxed space-y-2" style="font-family: var(--font-mono)">
		<p># Mental Models</p>
		<p>## Decision Making</p>
		<p class="text-gray-500">- Reversible vs irreversible decisions (two-way doors)</p>
		<p class="text-gray-500">- Second-order thinking: "And then what?"</p>
		<p>## Problem Solving</p>
		<p class="text-gray-500">- First principles: break down to fundamentals</p>
		<p class="text-gray-500">- Inversion: what would guarantee failure?</p>
		<p>## Systems</p>
		<p class="text-gray-500">- Feedback loops: positive and negative</p>
		<p class="text-gray-500">- Bottleneck theory: the system is only as fast as its constraint</p>
	</div>
</div>

<Callout type="tip">
	<p>Don't feel pressure to list dozens of models. Start with the 3-5 frameworks you actually use when making decisions. You can always add more later.</p>
</Callout>

<h2>STRATEGIES.md — How you act</h2>

<p>If models are how you think, strategies are how you act. These are your go-to approaches for common situations.</p>

<div class="bg-white border border-gray-200 rounded-xl p-5 my-6">
	<p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3" style="font-family: var(--font-mono)">~/.claude/USER/TELOS/STRATEGIES.md</p>
	<div class="text-sm text-gray-700 leading-relaxed space-y-2" style="font-family: var(--font-mono)">
		<p># Strategies</p>
		<p>## When starting a new project</p>
		<p class="text-gray-500">1. Define what "done" looks like before writing code</p>
		<p class="text-gray-500">2. Build the smallest possible thing that works</p>
		<p class="text-gray-500">3. Get it in front of users, then iterate</p>
		<p>## When stuck</p>
		<p class="text-gray-500">1. Step away for 15 minutes</p>
		<p class="text-gray-500">2. Explain the problem to someone (or rubber duck)</p>
		<p class="text-gray-500">3. Reduce scope until it's tractable</p>
		<p>## When communicating</p>
		<p class="text-gray-500">- Lead with the bottom line, then provide context</p>
		<p class="text-gray-500">- Use concrete examples over abstract descriptions</p>
	</div>
</div>

<p>PAI uses your strategies to guide its own approach. If your strategy for new projects is "define done first," PAI will start by asking you to define success criteria before diving into implementation.</p>

</ModuleLayout>
