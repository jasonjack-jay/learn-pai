<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { setStream, setTechLevel, completeQuiz } from '$lib/state.svelte';
	import type { StreamId } from '$lib/state.svelte';

	const streams: { id: StreamId; icon: string; title: string; description: string }[] = [
		{
			id: 'developer',
			icon: '</>',
			title: 'Developer Setup',
			description: 'Get your AI tooling set up in 10 minutes. Consistent setup across the team.'
		},
		{
			id: 'vibe-coder',
			icon: '~',
			title: 'Learn to Vibe Code',
			description: 'From terminal basics to building with AI agents. The full learning path.'
		},
		{
			id: 'pai-learner',
			icon: 'PAI',
			title: 'Learn PAI',
			description: 'Understand Personal AI Infrastructure — what it is, how to use it, how it works.'
		}
	];

	let step = $state(0);

	function selectStream(stream: StreamId) {
		setStream(stream);
		if (stream === 'developer') {
			goto(`${base}/setup`);
		} else if (stream === 'vibe-coder') {
			step = 1;
		} else {
			goto(`${base}/learn/foundation/introduction`);
		}
	}

	function selectLevel(level: 'beginner' | 'intermediate' | 'advanced') {
		setTechLevel(level);
		completeQuiz();
		goto(`${base}/learn/foundation/introduction`);
	}
</script>

<div class="min-h-screen flex flex-col" style="background: var(--color-surface)">
	<div class="flex-1 flex items-center justify-center px-6 py-16">
		<div class="max-w-2xl w-full">
			{#if step === 0}
				<div class="text-center mb-12">
					<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6" style="background: var(--color-accent-light); color: var(--color-accent)">
						Based on PAI v4.0.3
					</div>
					<img
						src="{base}/images/pai/pai-logo-v7.png"
						alt="PAI Logo"
						class="w-16 h-16 mx-auto mb-4"
					/>
					<h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4" style="color: var(--color-ink)">
						A Guide to Using AI
					</h1>
					<p class="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
						Get set up with AI tooling, learn to vibe code, or go deep with Personal AI Infrastructure.
					</p>
				</div>

				<div class="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
					<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">I want to...</h2>

					<div class="space-y-3">
						{#each streams as stream}
							<button
								class="w-full text-left p-5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all cursor-pointer group hover:shadow-sm"
								onclick={() => selectStream(stream.id)}
							>
								<div class="flex items-start gap-4">
									<div class="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent-light); color: var(--color-accent)">
										{stream.icon}
									</div>
									<div>
										<p class="font-medium text-sm group-hover:text-blue-600 transition-colors">{stream.title}</p>
										<p class="text-sm text-gray-500 mt-1">{stream.description}</p>
									</div>
								</div>
							</button>
						{/each}
					</div>
				</div>

				<p class="text-center text-xs text-gray-400 mt-6">
					Free and open source. Based on <a href="https://github.com/danielmiessler/Personal_AI_Infrastructure" class="underline hover:text-gray-500" target="_blank" rel="noopener">danielmiessler/Personal_AI_Infrastructure</a>.
				</p>
			{:else}
				<!-- Tech level quiz (vibe coders only) -->
				<div class="text-center mb-8">
					<h2 class="text-2xl font-bold tracking-tight mb-2" style="color: var(--color-ink)">How technical are you?</h2>
					<p class="text-gray-500">This helps us calibrate explanations to your level.</p>
				</div>

				<div class="space-y-3 max-w-md mx-auto">
					<button
						class="w-full text-left p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group"
						onclick={() => selectLevel('beginner')}
					>
						<p class="font-medium text-sm mb-1 group-hover:text-blue-600 transition-colors">I'm new to the command line</p>
						<p class="text-sm text-gray-500">I use AI through chat interfaces. The terminal is unfamiliar territory.</p>
					</button>

					<button
						class="w-full text-left p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group"
						onclick={() => selectLevel('intermediate')}
					>
						<p class="font-medium text-sm mb-1 group-hover:text-blue-600 transition-colors">I'm comfortable with basics</p>
						<p class="text-sm text-gray-500">I can navigate the terminal, install things, and I've used Claude Code before.</p>
					</button>

					<button
						class="w-full text-left p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group"
						onclick={() => selectLevel('advanced')}
					>
						<p class="font-medium text-sm mb-1 group-hover:text-blue-600 transition-colors">I'm a developer / power user</p>
						<p class="text-sm text-gray-500">I live in the terminal, write code daily, and want to go deep fast.</p>
					</button>
				</div>

				<button class="block mx-auto mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" onclick={() => step = 0}>
					Back
				</button>
			{/if}
		</div>
	</div>
</div>
