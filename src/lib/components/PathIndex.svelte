<script lang="ts">
	import { base } from '$app/paths';
	import { getProfile } from '$lib/state.svelte';

	export type PathIndexCard = {
		number: number;
		title: string;
		covers: string;
		whenToRead: string;
		estimatedMinutes: number;
		moduleId: string;
		slug: string;
	};

	let { cards }: { cards: PathIndexCard[] } = $props();

	const profile = getProfile();
</script>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-8">
	{#each cards as card}
		{@const visited = profile.visitedModules.has(card.moduleId)}
		<a
			href="{base}/learn/{card.slug}"
			class="group rounded-2xl border p-5 transition-all hover:shadow-md relative flex flex-col"
			style="border-color: {visited ? '#ddd6fe' : '#e5e7eb'}; background: {visited
				? '#faf5ff'
				: 'white'}"
		>
			<div class="flex items-center justify-between mb-3">
				<span
					class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold"
					style="background: {visited ? '#7c3aed' : '#f3f4f6'}; color: {visited
						? 'white'
						: '#6b7280'}"
				>
					{card.number}
				</span>
				{#if visited}
					<span
						class="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider"
						style="color: #7c3aed"
					>
						<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							/>
						</svg>
						Visited
					</span>
				{/if}
			</div>

			<h3 class="text-lg font-semibold mb-3 tracking-tight" style="color: var(--color-ink)">
				{card.title}
			</h3>

			<div class="space-y-3 flex-1">
				<div>
					<p class="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
						What it covers
					</p>
					<p class="text-sm text-gray-600 leading-relaxed">{card.covers}</p>
				</div>
				<div>
					<p class="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
						When you'd read this
					</p>
					<p class="text-sm text-gray-600 leading-relaxed">{card.whenToRead}</p>
				</div>
			</div>

			<div class="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
				<span class="inline-flex items-center gap-1 text-xs text-gray-400">
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					{card.estimatedMinutes} min
				</span>
				<span
					class="inline-flex items-center gap-1 text-sm font-medium transition-colors"
					style="color: #7c3aed"
				>
					Read
					<span class="transition-transform group-hover:translate-x-0.5">→</span>
				</span>
			</div>
		</a>
	{/each}
</div>
