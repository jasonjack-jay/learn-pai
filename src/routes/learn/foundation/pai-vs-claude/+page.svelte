<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
</script>

<ModuleLayout
	moduleId="pai-vs-claude"
	title="PAI vs Plain Claude Code"
	description="What changes when you add PAI on top of Claude Code"
	estimatedMinutes={5}
>

<h2>Same engine, completely different experience</h2>

<p>Claude Code on its own is already powerful. It can write code, run commands, manage files, and reason through complex problems. But it has a fundamental limitation: <strong>it doesn't know you</strong>.</p>

<p>PAI sits on top of Claude Code and adds the layers that make AI personal. Here's what changes:</p>

<h2>What Claude Code gives you</h2>

<p>Out of the box, Claude Code is a capable agentic assistant. It can execute shell commands, edit files, search the web, and chain tools together to accomplish tasks. Each session starts fresh — you explain what you need, and it gets to work.</p>

<Terminal
	command="claude"
	output="Welcome to Claude Code! How can I help you today?"
	title="Plain Claude Code"
/>

<h2>What PAI adds</h2>

<DiagramImage src="pai-unique-components-diagram.png" alt="PAI Primitives — the components that make PAI more than Claude Code" caption="PAI's unique components layered on top of Claude Code" />

<p><strong>Persistent identity (TELOS).</strong> Ten structured files that capture who you are — your mission, goals, projects, beliefs, mental models, strategies, narratives, lessons learned, challenges, and ideas. Every session starts with this context loaded.</p>

<p><strong>A skill system.</strong> 63 skills across 13 categories that PAI can invoke. These aren't random prompts — they're tested, versioned capabilities with deterministic behavior. Think of them as your AI's toolkit.</p>

<p><strong>Memory that learns.</strong> A three-tier memory system (hot, warm, cold) that captures your feedback — explicit ratings, implicit signals, what worked and what didn't. Your AI actually improves over time.</p>

<p><strong>Hooks for automation.</strong> 21 lifecycle hooks that fire at key moments: when a session starts, when a task completes, when tools are used. These can trigger voice notifications, load context, or run security checks.</p>

<p><strong>Security built in.</strong> Default policies that validate commands before execution. Normal workflows are permitted; dangerous operations are blocked.</p>

<Callout type="tip">
	<p>Think of it this way: <strong>Claude Code is the engine. PAI is the entire vehicle</strong> — with navigation, memory, a dashboard, and autopilot that learns your driving style.</p>
</Callout>

<h2>A side-by-side comparison</h2>

<div class="overflow-x-auto my-6">
	<table class="w-full text-sm border-collapse">
		<thead>
			<tr class="border-b border-gray-200">
				<th class="text-left py-3 pr-4 font-semibold text-gray-800">Feature</th>
				<th class="text-left py-3 px-4 font-semibold text-gray-800">Claude Code</th>
				<th class="text-left py-3 pl-4 font-semibold" style="color: var(--color-accent)">PAI</th>
			</tr>
		</thead>
		<tbody class="text-gray-600">
			<tr class="border-b border-gray-100"><td class="py-2.5 pr-4">Knows your goals</td><td class="py-2.5 px-4">No</td><td class="py-2.5 pl-4 font-medium" style="color: var(--color-accent)">Yes (TELOS)</td></tr>
			<tr class="border-b border-gray-100"><td class="py-2.5 pr-4">Learns from feedback</td><td class="py-2.5 px-4">No</td><td class="py-2.5 pl-4 font-medium" style="color: var(--color-accent)">Yes (Memory system)</td></tr>
			<tr class="border-b border-gray-100"><td class="py-2.5 pr-4">Structured skills</td><td class="py-2.5 px-4">Prompt-based</td><td class="py-2.5 pl-4 font-medium" style="color: var(--color-accent)">63 skills, 338 workflows</td></tr>
			<tr class="border-b border-gray-100"><td class="py-2.5 pr-4">Lifecycle hooks</td><td class="py-2.5 px-4">Basic</td><td class="py-2.5 pl-4 font-medium" style="color: var(--color-accent)">21 production hooks</td></tr>
			<tr class="border-b border-gray-100"><td class="py-2.5 pr-4">Voice feedback</td><td class="py-2.5 px-4">No</td><td class="py-2.5 pl-4 font-medium" style="color: var(--color-accent)">Yes (ElevenLabs)</td></tr>
			<tr><td class="py-2.5 pr-4">Security policies</td><td class="py-2.5 px-4">Manual</td><td class="py-2.5 pl-4 font-medium" style="color: var(--color-accent)">Built-in validation</td></tr>
		</tbody>
	</table>
</div>

</ModuleLayout>
