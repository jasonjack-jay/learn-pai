<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getProfile, paths, toggleInterest, completeQuiz } from '$lib/state.svelte';
	import type { PathId } from '$lib/state.svelte';

	const profile = getProfile();

	// Ensure quiz is marked done if they got here
	if (!profile.quizCompleted) completeQuiz();

	const allPaths: PathId[] = ['know-me', 'get-things-done', 'architecture'];

	function proceed() {
		if (profile.interests.length === 0) return;
		goto(`${base}/learn/foundation/what-is-pai`);
	}
</script>

<div class="min-h-screen flex items-center justify-center px-6 py-16" style="background: var(--color-surface)">
	<div class="max-w-2xl w-full">
		<div class="text-center mb-8">
			<img
				src="{base}/images/pai/pai-logo-v7.png"
				alt="PAI Logo"
				class="w-12 h-12 mx-auto mb-3"
			/>
			<h1 class="text-2xl font-bold tracking-tight mb-2" style="color: var(--color-ink)">What do you want from PAI?</h1>
			<p class="text-gray-500">Pick one or more paths. You'll start with the foundations, then dive into what interests you most.</p>
		</div>

		<div class="space-y-3 mb-8">
			{#each allPaths as pathId}
				{@const p = paths[pathId]}
				{@const selected = profile.interests.includes(pathId)}
				<button
					class="w-full text-left p-5 rounded-xl border-2 transition-all cursor-pointer {selected ? 'bg-white shadow-sm' : 'bg-white/60 hover:bg-white'}"
					style="border-color: {selected ? 'var(--color-accent)' : '#e5e7eb'}"
					onclick={() => toggleInterest(pathId)}
				>
					<div class="flex items-start gap-4">
						<span class="text-2xl">{p.icon}</span>
						<div class="flex-1">
							<div class="flex items-center gap-2">
								<p class="font-semibold text-sm">{p.title}</p>
								{#if selected}
									<svg class="w-4 h-4" style="color: var(--color-accent)" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
								{/if}
							</div>
							<p class="text-sm text-gray-500 mt-1">{p.tagline}</p>
						</div>
					</div>
				</button>
			{/each}
		</div>

		<button
			class="w-full py-3 px-6 rounded-xl text-white font-medium text-sm transition-all cursor-pointer {profile.interests.length === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90'}"
			style="background: var(--color-accent)"
			disabled={profile.interests.length === 0}
			onclick={proceed}
		>
			{profile.interests.length === 0 ? 'Select at least one path' : `Start with the foundations`}
		</button>
	</div>
</div>
