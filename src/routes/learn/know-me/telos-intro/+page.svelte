<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
</script>

<ModuleLayout
	moduleId="telos-intro"
	title="Meet TELOS"
	description="The 10 files that teach AI who you are"
	estimatedMinutes={6}
	nextSlug="know-me/mission-goals"
>

<h2>The problem with context</h2>

<p>Every time you start a conversation with a chatbot, you're a blank slate. You have to re-explain who you are, what you're working on, and what you care about. Imagine hiring a brilliant assistant who gets amnesia every morning.</p>

<p>TELOS is PAI's solution. It's a structured collection of 10 markdown files that capture the essential context about <em>you</em>. When PAI starts a session, it reads your TELOS files and has your full context before you type a single word.</p>

<DiagramImage src="pai-primitive-telos.png" alt="TELOS — Deep Goal Understanding system" caption="TELOS: 10 structured context files that teach AI who you are" />

<h2>The 10 TELOS files</h2>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
	{#each [
		{ file: 'MISSION.md', desc: 'Your overarching purpose — why you do what you do', icon: '🎯' },
		{ file: 'GOALS.md', desc: 'What you\'re actively working toward', icon: '📌' },
		{ file: 'PROJECTS.md', desc: 'Your current initiatives and their status', icon: '📋' },
		{ file: 'BELIEFS.md', desc: 'Core convictions that shape your decisions', icon: '💡' },
		{ file: 'MODELS.md', desc: 'Mental models you use to understand the world', icon: '🧩' },
		{ file: 'STRATEGIES.md', desc: 'Your preferred approaches to common challenges', icon: '♟️' },
		{ file: 'NARRATIVES.md', desc: 'The stories you tell about yourself and your work', icon: '📖' },
		{ file: 'LEARNED.md', desc: 'Lessons learned — what worked, what didn\'t', icon: '📝' },
		{ file: 'CHALLENGES.md', desc: 'Current obstacles and blockers', icon: '🚧' },
		{ file: 'IDEAS.md', desc: 'Your spark list — things you want to explore', icon: '✨' },
	] as item}
		<div class="flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-200">
			<span class="text-lg">{item.icon}</span>
			<div>
				<p class="text-sm font-medium" style="font-family: var(--font-mono); color: var(--color-ink)">{item.file}</p>
				<p class="text-xs text-gray-500 mt-0.5">{item.desc}</p>
			</div>
		</div>
	{/each}
</div>

<h2>Where do they live?</h2>

<p>Your TELOS files live in <code>~/.claude/USER/TELOS/</code>. They're plain markdown, which means you can edit them with any text editor, and they're version-controlled with git if you want to track changes over time.</p>

<Callout type="tip">
	<p>You don't need to fill all 10 files right away. Start with <strong>MISSION.md</strong> and <strong>GOALS.md</strong> — those two alone will dramatically improve how PAI helps you.</p>
</Callout>

<h2>How PAI uses TELOS</h2>

<p>When a PAI session starts, it loads your TELOS context. This means:</p>

<p><strong>Relevant suggestions.</strong> PAI can proactively suggest help with your active projects instead of waiting for you to ask.</p>

<p><strong>Aligned reasoning.</strong> When PAI makes decisions or offers advice, it weighs your beliefs and mental models, not generic best practices.</p>

<p><strong>Continuity.</strong> Pick up where you left off. PAI knows what you were working on and what's blocking you.</p>

<p>In the next few lessons, we'll walk through writing each of these files together.</p>

</ModuleLayout>
