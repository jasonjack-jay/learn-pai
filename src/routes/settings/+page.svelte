<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getProfile, resetProgress } from '$lib/state.svelte';

	const profile = getProfile();
	let confirming = $state(false);

	function handleReset() {
		resetProgress();
		goto(`${base}/`);
	}
</script>

<div class="max-w-2xl mx-auto px-6 py-16">
	<h1 class="text-2xl font-bold tracking-tight mb-1" style="color: var(--color-ink)">Settings</h1>
	<p class="text-sm text-gray-500 mb-10">Manage your Learn PAI experience.</p>

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
