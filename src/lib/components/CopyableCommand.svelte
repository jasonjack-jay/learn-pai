<script lang="ts">
	let { text = '' }: { text?: string } = $props();

	let copied = $state(false);

	function copy() {
		navigator.clipboard.writeText(text).then(() => {
			copied = true;
			setTimeout(() => copied = false, 1500);
		});
	}
</script>

<button
	onclick={copy}
	class="group inline-flex items-center gap-1 cursor-pointer print:pointer-events-none"
	title="Copy to clipboard"
>
	<span class="font-mono text-gray-800 whitespace-nowrap text-xs">{text}</span>
	<span class="opacity-0 group-hover:opacity-100 transition-opacity duration-150 print:hidden flex-shrink-0">
		{#if copied}
			<svg class="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
			</svg>
		{:else}
			<svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
			</svg>
		{/if}
	</span>
</button>
