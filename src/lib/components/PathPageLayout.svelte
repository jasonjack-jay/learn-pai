<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { markVisited, getModulesForPath, paths } from '$lib/state.svelte';
	import type { PathId } from '$lib/state.svelte';

	let {
		moduleId,
		title,
		subtitle,
		estimatedMinutes,
		pathId,
		children
	}: {
		moduleId: string;
		title: string;
		subtitle?: string;
		estimatedMinutes: number;
		pathId: PathId;
		children: any;
	} = $props();

	const pathMeta = $derived(paths[pathId]);
	const pathModules = $derived(getModulesForPath(pathId));
	const currentIndex = $derived(pathModules.findIndex((m) => m.id === moduleId));
	const nextModule = $derived(
		currentIndex >= 0 && currentIndex < pathModules.length - 1
			? pathModules[currentIndex + 1]
			: null
	);

	// The index hub always lives at `${pathId}/index-hub` per this path's convention.
	const hubSlug = $derived(`${pathId}/index-hub`);

	onMount(() => {
		markVisited(moduleId);
	});
</script>

<div class="max-w-3xl mx-auto px-6 py-12 lg:py-16">
	<!-- Breadcrumb -->
	<nav class="mb-6 text-xs text-gray-400 flex items-center gap-1.5">
		<a
			href="{base}/learn/{hubSlug}"
			class="hover:text-gray-600 transition-colors inline-flex items-center gap-1"
		>
			<span>{pathMeta.icon}</span>
			<span>{pathMeta.title}</span>
		</a>
		<span>/</span>
		<span class="text-gray-500">{title}</span>
	</nav>

	<!-- Header -->
	<header class="mb-10">
		<div class="flex items-center gap-3 mb-3">
			<span class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				{estimatedMinutes} min read
			</span>
		</div>
		<h1 class="text-3xl font-bold tracking-tight mb-2" style="color: var(--color-ink)">
			{title}
		</h1>
		{#if subtitle}
			<p class="text-lg text-gray-500">{subtitle}</p>
		{/if}
	</header>

	<!-- Content -->
	<article
		class="prose prose-gray max-w-none
			[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4
			[&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-8 [&_h3]:mb-3
			[&_h4]:text-base [&_h4]:font-semibold [&_h4]:mt-6 [&_h4]:mb-2
			[&_p]:text-base [&_p]:leading-relaxed [&_p]:text-gray-600 [&_p]:mb-4
			[&_ul]:space-y-2 [&_ul]:my-4 [&_ul]:pl-5 [&_ul]:list-disc
			[&_ol]:space-y-2 [&_ol]:my-4 [&_ol]:pl-5 [&_ol]:list-decimal
			[&_li]:text-gray-600 [&_li]:leading-relaxed
			[&_strong]:text-gray-800 [&_strong]:font-semibold
			[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:bg-gray-100
			[&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:rounded-xl [&_pre]:p-5 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:text-sm
			[&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:my-6 [&_blockquote]:text-gray-500 [&_blockquote]:italic
			[&_table]:my-6 [&_table]:w-full [&_table]:text-sm
			[&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-800 [&_th]:border-b [&_th]:border-gray-300 [&_th]:pb-2 [&_th]:pr-4
			[&_td]:border-b [&_td]:border-gray-100 [&_td]:py-2 [&_td]:pr-4 [&_td]:text-gray-600 [&_td]:align-top"
	>
		{@render children()}
	</article>

	<!-- End-of-page navigation -->
	<footer class="mt-16 pt-8 border-t border-gray-200 space-y-4">
		{#if nextModule}
			<a
				href="{base}/learn/{nextModule.slug}"
				class="block rounded-xl border p-5 transition-all hover:shadow-sm"
				style="border-color: #ddd6fe; background: #faf5ff"
			>
				<p class="text-xs font-semibold uppercase tracking-wider mb-1" style="color: #6d28d9">
					Next up
				</p>
				<p class="text-base font-semibold mb-0.5" style="color: var(--color-ink)">
					{nextModule.title}
					<span class="inline-block ml-1 transition-transform group-hover:translate-x-0.5">→</span>
				</p>
				<p class="text-sm text-gray-500">{nextModule.description}</p>
			</a>
		{/if}
		<a
			href="{base}/learn/{hubSlug}"
			class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			Return to the {pathMeta.title} index
		</a>
	</footer>
</div>
