<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { markVisited } from '$lib/state.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';

	onMount(() => {
		markVisited('git-in-detail-intro');
	});
</script>

<div class="max-w-3xl mx-auto px-6 py-12 lg:py-16">
	<header class="mb-10">
		<div class="flex items-center gap-3 mb-4">
			<span
				class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
				style="background: #ede9fe; color: #6d28d9"
			>
				<span>🚇</span>
				<span>Git in Detail</span>
			</span>
			<span class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				4 min read
			</span>
		</div>
		<h1 class="text-4xl font-bold tracking-tight mb-3" style="color: var(--color-ink)">
			Why Git in Detail
		</h1>
		<p class="text-lg text-gray-500 leading-relaxed">
			Git Basics gave you six ideas — enough to follow along when your AI assistant talks about
			commits and branches. This section fills in everything else.
		</p>
	</header>

	<article
		class="prose prose-gray max-w-none
			[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4
			[&_p]:text-base [&_p]:leading-relaxed [&_p]:text-gray-600 [&_p]:mb-4
			[&_strong]:text-gray-800 [&_strong]:font-semibold
			[&_ul]:space-y-2 [&_ul]:my-4 [&_ul]:pl-5 [&_ul]:list-disc
			[&_li]:text-gray-600 [&_li]:leading-relaxed"
	>
		<ImagePlaceholder
			description="Overview diagram — six tube-map lines representing the six pillars of Git (setup, local workflow, branching, syncing, undoing, advanced). Friendly aliens with speech bubbles asking 'wait, what's THAT one?'"
			size="large"
		/>

		<p>
			Git Basics taught you six concepts at the "I've never heard of Git" level. That's enough to
			<em>understand</em> what your AI is doing. It is <strong>not</strong> enough to be effective.
		</p>

		<h2>The gap this closes</h2>

		<p>
			When your AI says <em>"I'll rebase your branch onto main and resolve conflicts,"</em> — do
			you know what that means? What it'll change about your history? What could go wrong if the
			branch is already pushed?
		</p>

		<p>
			When your AI sets up a worktree to run in parallel with your work, do you know what it just
			did? Or when it tells you it did a <code>--force-with-lease</code> push, do you know why it
			chose <em>that</em> flavour of force push and not the other one?
		</p>

		<p>
			This section closes those gaps. Each page covers one concept — enough that you can hold a
			conversation about it with any developer (or any AI).
		</p>

		<h2>The key shift</h2>

		<p>
			We don't teach you how to type Git commands. We teach you <strong>what's possible</strong> so
			you can ask. Your AI types the commands. You decide whether that's the right command in the
			first place.
		</p>

		<p>A page on rebasing here does not teach you the 14 flags of <code>git rebase --interactive</code>. It teaches you:</p>

		<ul>
			<li><strong>What rebasing is</strong> (moving commits onto a different base)</li>
			<li><strong>When you'd want it</strong> (cleaning up before a PR; pulling main into your branch)</li>
			<li><strong>Why it exists</strong> (linear history beats branchy history for readability)</li>
			<li><strong>The golden rule</strong> (never rebase shared branches)</li>
			<li><strong>The dangers</strong> (rewriting history someone else has)</li>
			<li><strong>How to ask your AI for it</strong> (example prompts)</li>
		</ul>

		<p>
			You can always learn syntax. Your AI already knows it better than you will. What you need is
			the judgement to know <em>when</em> rebasing is right, <em>why</em> the golden rule exists,
			and <em>how</em> to ask for it clearly.
		</p>

		<h2>How to use this section</h2>

		<p>
			It's not sequential. Jump to what you need — that's why the next page is an index, not a
			Chapter 1. You can read top-to-bottom if you're building a mental model from scratch, or hop
			to Rebasing the first time your AI offers to rebase something and you'd like to know what
			that means before saying yes.
		</p>

		<h2>Who this is for</h2>

		<ul>
			<li><strong>Vibe coders</strong> who've watched their AI do Git things and nodded politely</li>
			<li><strong>Junior devs</strong> joining a team that has strong Git opinions</li>
			<li>
				<strong>Anyone who's been told</strong> <em>"just rebase it"</em> and pretended to know
				what that meant
			</li>
		</ul>

		<p>
			If that's you, the next 14 pages will make the rest of your developer life substantially
			less confusing.
		</p>
	</article>

	<footer class="mt-16 pt-8 border-t border-gray-200">
		<a
			href="{base}/learn/git-in-detail/index-hub"
			class="inline-flex items-center gap-2 py-3 px-6 rounded-xl text-white font-medium text-sm transition-all hover:opacity-90"
			style="background: #7c3aed"
		>
			Ready? Jump to the index
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
			</svg>
		</a>
	</footer>
</div>
