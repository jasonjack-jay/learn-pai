<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getProfile, resetProgress, setStream, getTheme, setTheme } from '$lib/state.svelte';
	import type { StreamId, Theme } from '$lib/state.svelte';

	const profile = getProfile();
	let confirming = $state(false);

	const streamLabels: Record<StreamId, string> = {
		'developer': 'Developer Setup',
		'vibe-coder': 'Learn to Vibe Code',
		'pai-learner': 'Learn PAI'
	};

	function changeStream(stream: StreamId) {
		setStream(stream);
		if (stream === 'developer') {
			goto(`${base}/setup`);
		}
	}

	function handleReset() {
		resetProgress();
		goto(`${base}/`);
	}
</script>

<div class="max-w-2xl mx-auto px-6 py-16">
	<h1 class="text-2xl font-bold tracking-tight mb-1" style="color: var(--color-ink)">Settings</h1>
	<p class="text-sm text-gray-500 mb-10">Manage your Learn PAI experience.</p>

	<section class="bg-white rounded-xl border border-gray-200 p-6 mb-6">
		<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Appearance</h2>
		<div class="flex items-center justify-between">
			<div>
				<p class="text-sm font-medium" style="color: var(--color-ink)">Theme</p>
				<p class="text-sm text-gray-500 mt-0.5">Switch between light and dark mode.</p>
			</div>
			<div class="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
				<button
					class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer {getTheme() === 'light' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}"
					style="{getTheme() === 'light' ? 'color: var(--color-ink)' : ''}"
					onclick={() => setTheme('light')}
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
					Light
				</button>
				<button
					class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer {getTheme() === 'dark' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}"
					style="{getTheme() === 'dark' ? 'color: var(--color-ink)' : ''}"
					onclick={() => setTheme('dark')}
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
					Dark
				</button>
			</div>
		</div>
	</section>

	<section class="bg-white rounded-xl border border-gray-200 p-6 mb-6">
		<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Learning Stream</h2>
		<p class="text-sm text-gray-500 mb-4">Current: <span class="font-medium text-gray-900">{profile.stream ? streamLabels[profile.stream] : 'Not set'}</span></p>
		<div class="flex flex-wrap gap-2">
			{#each (['developer', 'vibe-coder', 'pai-learner'] as StreamId[]) as stream}
				<button
					class="px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer {profile.stream === stream ? 'text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'}"
					style="{profile.stream === stream ? 'background: var(--color-accent)' : ''}"
					onclick={() => changeStream(stream)}
				>
					{streamLabels[stream]}
				</button>
			{/each}
		</div>
	</section>

	<section class="bg-white rounded-xl border border-gray-200 p-6">
		<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Progress</h2>

		<div class="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
			<div>
				<p class="text-sm font-medium" style="color: var(--color-ink)">Modules completed</p>
				<p class="text-sm text-gray-500 mt-0.5">{profile.completedModules.size} of 20</p>
			</div>
			<div>
				<p class="text-sm font-medium" style="color: var(--color-ink)">Modules visited</p>
				<p class="text-sm text-gray-500 mt-0.5">{profile.visitedModules.size} of 20</p>
			</div>
			<div>
				<p class="text-sm font-medium" style="color: var(--color-ink)">Tech level</p>
				<p class="text-sm text-gray-500 mt-0.5 capitalize">{profile.techLevel ?? 'Not set'}</p>
			</div>
		</div>

		<div class="flex items-center justify-between gap-4">
			<div>
				<p class="text-sm font-medium" style="color: var(--color-ink)">Reset all progress</p>
				<p class="text-sm text-gray-500 mt-0.5">Clears completed modules, visited modules, tech level, and learning path selections. You'll start from the welcome screen.</p>
			</div>
			{#if !confirming}
				<button
					class="shrink-0 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
					onclick={() => confirming = true}
				>
					Reset progress
				</button>
			{:else}
				<div class="shrink-0 flex items-center gap-2">
					<button
						class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
						onclick={handleReset}
					>
						Yes, reset everything
					</button>
					<button
						class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
						onclick={() => confirming = false}
					>
						Cancel
					</button>
				</div>
			{/if}
		</div>
	</section>
</div>
