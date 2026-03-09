<script lang="ts">
	import { base } from '$app/paths';

	interface Props {
		src: string;
		alt: string;
		caption?: string;
	}

	let { src, alt, caption }: Props = $props();
	let open = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
	}
</script>

<svelte:window onkeydown={open ? handleKeydown : undefined} />

<figure class="my-8">
	<button
		class="relative w-full cursor-zoom-in group rounded-xl overflow-hidden border border-gray-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
		style="focus-visible:ring-color: var(--color-accent)"
		onclick={() => open = true}
		aria-label="Enlarge image: {alt}"
	>
		<img
			src="{base}/images/pai/{src}"
			{alt}
			class="w-full block"
			loading="lazy"
		/>
		<span class="absolute top-2 right-2 bg-black/50 text-white rounded-lg px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
			<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
			Enlarge
		</span>
	</button>
	{#if caption}
		<figcaption class="text-center text-xs text-gray-400 mt-2">{caption}</figcaption>
	{/if}
</figure>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out p-4 sm:p-8"
		onclick={() => open = false}
		onkeydown={handleKeydown}
		role="dialog"
		aria-label="Enlarged view: {alt}"
		tabindex="-1"
	>
		<img
			src="{base}/images/pai/{src}"
			{alt}
			class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
		/>
	</div>
{/if}
