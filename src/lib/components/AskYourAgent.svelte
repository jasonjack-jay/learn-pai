<script lang="ts">
	let {
		title = 'How you might ask your AI agent',
		prompts = []
	}: { title?: string; prompts?: string[] } = $props();
</script>

<div
	class="rounded-2xl my-6 p-5 border"
	style="background: #f5f3ff; border-color: #ddd6fe"
>
	<div class="flex items-center gap-2 mb-3">
		<span
			class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs"
			style="background: #7c3aed; color: white"
			aria-hidden="true"
		>
			✦
		</span>
		<p
			class="text-xs font-semibold uppercase tracking-wider"
			style="color: #6d28d9"
		>
			{title}
		</p>
	</div>
	<ul class="space-y-1.5 pl-0">
		{#each prompts as p}
			<li class="flex items-start gap-2 text-sm leading-relaxed" style="color: #4c1d95">
				<span class="mt-1 select-none" style="color: #a78bfa" aria-hidden="true">›</span>
				<span class="italic">"{p}"</span>
			</li>
		{/each}
	</ul>
</div>
