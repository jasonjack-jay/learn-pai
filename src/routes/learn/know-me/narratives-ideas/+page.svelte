<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<ModuleLayout
	moduleId="narratives-ideas"
	title="Narratives, Ideas & Challenges"
	description="Your stories, spark list, and current obstacles"
	estimatedMinutes={10}
>

<h2>NARRATIVES.md — Your story</h2>

<p>Narratives are the stories you tell about yourself and your journey. They might seem soft, but they're powerful context for AI. Your narrative shapes how PAI frames suggestions, what tone it uses, and how it motivates you.</p>

<div class="bg-white border border-gray-200 rounded-xl p-5 my-6">
	<p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3" style="font-family: var(--font-mono)">~/.claude/USER/TELOS/NARRATIVES.md</p>
	<div class="text-sm text-gray-700 leading-relaxed space-y-2" style="font-family: var(--font-mono)">
		<p># My Narrative</p>
		<p class="text-gray-500">I started as a self-taught developer who couldn't get past the tutorial stage. What changed was building real things for real people — even when they were rough.</p>
		<p class="text-gray-500">Now I focus on making complex tools accessible. I've seen too many powerful technologies fail because they couldn't explain themselves to regular people.</p>
	</div>
</div>

<h2>IDEAS.md — Your spark list</h2>

<p>Every interesting thought, half-formed concept, or "what if..." goes here. This is your creative inbox.</p>

<div class="bg-white border border-gray-200 rounded-xl p-5 my-6">
	<p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3" style="font-family: var(--font-mono)">~/.claude/USER/TELOS/IDEAS.md</p>
	<div class="text-sm text-gray-700 leading-relaxed space-y-2" style="font-family: var(--font-mono)">
		<p># Ideas</p>
		<p class="text-gray-500">- A CLI tool that generates changelogs from git history in plain English</p>
		<p class="text-gray-500">- Browser extension that summarizes Slack threads</p>
		<p class="text-gray-500">- "Explain this codebase" tool for onboarding new team members</p>
		<p class="text-gray-500">- Podcast about tools people actually use daily</p>
	</div>
</div>

<p>PAI can reference your ideas when you're looking for your next project, or when a conversation naturally connects to something on your list.</p>

<h2>CHALLENGES.md & LEARNED.md</h2>

<p><strong>CHALLENGES.md</strong> captures what's blocking you right now. This helps PAI proactively offer help with your actual pain points rather than guessing.</p>

<p><strong>LEARNED.md</strong> is your lessons-learned log. What worked, what didn't, what surprised you. Over time, this becomes a personal knowledge base that PAI can reference to avoid repeating past mistakes.</p>

<Callout type="info">
	<p>These two files work as a pair. Challenges capture the present; Learned captures the past. Together, they give PAI a sense of your growth trajectory — where you've been and what you're working through.</p>
</Callout>

<h2>You've completed the TELOS tour</h2>

<p>You now know all 10 TELOS files. You don't need to fill them all in one sitting. Start with the ones that feel most natural — Mission, Goals, and Projects are the highest-impact starting points — and build out the rest as you use PAI.</p>

<p>In the next lesson, we'll see how PAI actually uses all of this context in practice.</p>

</ModuleLayout>
