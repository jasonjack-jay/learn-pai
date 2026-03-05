<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<ModuleLayout
	moduleId="skill-hierarchy"
	title="The Skill Hierarchy"
	description="CODE → CLI → PROMPT → SKILL — choosing the right level"
	estimatedMinutes={8}
	nextSlug="get-things-done/first-workflow"
>

<h2>Not everything needs AI</h2>

<p>One of PAI's core principles is: <strong>use the simplest solution that works.</strong> The skill hierarchy codifies this:</p>

<div class="space-y-3 my-6">
	<div class="p-4 rounded-xl bg-white border border-gray-200">
		<div class="flex items-center gap-3 mb-2">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background: var(--color-success-light); color: var(--color-success)">1</span>
			<p class="font-semibold text-sm">CODE — Write deterministic code</p>
		</div>
		<p class="text-sm text-gray-500 ml-11">If a bash script can do it reliably, don't involve AI at all. Fastest, most predictable.</p>
	</div>
	<div class="p-4 rounded-xl bg-white border border-gray-200">
		<div class="flex items-center gap-3 mb-2">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background: var(--color-accent-light); color: var(--color-accent)">2</span>
			<p class="font-semibold text-sm">CLI-BASED-TOOL — Use existing tools</p>
		</div>
		<p class="text-sm text-gray-500 ml-11">grep, jq, ffmpeg, git — proven tools with predictable output. Use them.</p>
	</div>
	<div class="p-4 rounded-xl bg-white border border-gray-200">
		<div class="flex items-center gap-3 mb-2">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background: var(--color-warn-light); color: var(--color-warn)">3</span>
			<p class="font-semibold text-sm">PROMPT — Structured AI prompt</p>
		</div>
		<p class="text-sm text-gray-500 ml-11">When you need AI reasoning, use a well-structured prompt with clear instructions.</p>
	</div>
	<div class="p-4 rounded-xl bg-white border border-gray-200">
		<div class="flex items-center gap-3 mb-2">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-purple-100 text-purple-600">4</span>
			<p class="font-semibold text-sm">SKILL — Full PAI skill</p>
		</div>
		<p class="text-sm text-gray-500 ml-11">Complex tasks that need context, multi-step reasoning, and tool chaining. The full PAI experience.</p>
	</div>
</div>

<Callout type="tip">
	<p>The hierarchy is about <strong>reliability and speed</strong>. Code is the most reliable, AI skills the least — but also the most flexible. Match the tool to the task.</p>
</Callout>

<p><em>More content for this path is coming in Phase 2.</em></p>

</ModuleLayout>
