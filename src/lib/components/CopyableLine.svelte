<script lang="ts">
	import type { Snippet } from 'svelte';
	let { command = '', children }: { command?: string; children?: Snippet } = $props();

	let copied = $state(false);

	function copy() {
		navigator.clipboard.writeText(command).then(() => {
			copied = true;
			setTimeout(() => copied = false, 1500);
		});
	}
</script>

<div class="group flex items-center gap-2">
	<div class="flex-1">
		{#if children}
			{@render children()}
		{:else}
			<span class="text-green-600">$</span> {command}
		{/if}
	</div>
	<button
		onclick={copy}
		class="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-0.5 rounded print:hidden flex-shrink-0"
		title="Copy command"
	>
		{#if copied}
			<svg class="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
			</svg>
		{:else}
			<svg class="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
			</svg>
		{/if}
	</button>
</div>
