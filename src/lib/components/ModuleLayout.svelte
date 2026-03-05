<script lang="ts">
	import { goto } from '$app/navigation';
	import { completeModule, modules } from '$lib/state.svelte';
	import { getProfile } from '$lib/state.svelte';

	let {
		moduleId,
		title,
		description,
		estimatedMinutes,
		nextSlug = null,
		children
	}: {
		moduleId: string;
		title: string;
		description: string;
		estimatedMinutes: number;
		nextSlug?: string | null;
		children: any;
	} = $props();

	const profile = getProfile();
	const isCompleted = $derived(profile.completedModules.has(moduleId));

	function markComplete() {
		completeModule(moduleId);
		if (nextSlug) {
			goto(`/learn/${nextSlug}`);
		}
	}
</script>

<div class="max-w-3xl mx-auto px-6 py-12 lg:py-16">
	<!-- Header -->
	<header class="mb-10">
		<div class="flex items-center gap-3 mb-3">
			<span class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
				{estimatedMinutes} min read
			</span>
			{#if isCompleted}
				<span class="inline-flex items-center gap-1.5 text-xs font-medium" style="color: var(--color-success)">
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
					Completed
				</span>
			{/if}
		</div>
		<h1 class="text-3xl font-bold tracking-tight mb-2" style="color: var(--color-ink)">{title}</h1>
		<p class="text-lg text-gray-500">{description}</p>
	</header>

	<!-- Content -->
	<article class="prose prose-gray max-w-none
		[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4
		[&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-8 [&_h3]:mb-3
		[&_p]:text-base [&_p]:leading-relaxed [&_p]:text-gray-600 [&_p]:mb-4
		[&_ul]:space-y-2 [&_ul]:my-4 [&_ul]:pl-0
		[&_li]:text-gray-600 [&_li]:leading-relaxed
		[&_strong]:text-gray-800 [&_strong]:font-semibold
		[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:bg-gray-100
		[&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:rounded-xl [&_pre]:p-5 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:text-sm
		[&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:my-6 [&_blockquote]:text-gray-500 [&_blockquote]:italic
	" style="[&_blockquote]:border-color: var(--color-accent-light)">
		{@render children()}
	</article>

	<!-- Footer / CTA -->
	<footer class="mt-12 pt-8 border-t border-gray-200">
		{#if !isCompleted}
			<button
				class="w-full sm:w-auto py-3 px-8 rounded-xl text-white font-medium text-sm transition-all hover:opacity-90 cursor-pointer"
				style="background: var(--color-accent)"
				onclick={markComplete}
			>
				{nextSlug ? 'Mark complete & continue' : 'Mark complete'}
			</button>
		{:else if nextSlug}
			<a
				href="/learn/{nextSlug}"
				class="inline-flex items-center gap-2 py-3 px-8 rounded-xl text-white font-medium text-sm transition-all hover:opacity-90"
				style="background: var(--color-accent)"
			>
				Next lesson
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
			</a>
		{:else}
			<div class="flex items-center gap-2 text-sm" style="color: var(--color-success)">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
				You've completed this module. Check the sidebar for more.
			</div>
		{/if}
	</footer>
</div>
