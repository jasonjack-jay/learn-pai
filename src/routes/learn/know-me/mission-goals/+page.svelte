<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<ModuleLayout
	moduleId="mission-goals"
	title="Mission & Goals"
	description="Writing your MISSION.md and GOALS.md — your North Star"
	estimatedMinutes={12}
	nextSlug="know-me/projects-beliefs"
>

<h2>MISSION.md — Your "why"</h2>

<p>Your mission statement isn't a corporate exercise. It's the answer to a simple question: <strong>what are you trying to do with your life and work?</strong> It doesn't need to be grand. It needs to be honest.</p>

<p>PAI uses your mission to orient everything it does. When it's unsure which approach to take, it checks: "Does this serve my user's mission?"</p>

<h3>What a good MISSION.md looks like</h3>

<div class="bg-white border border-gray-200 rounded-xl p-5 my-6">
	<p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3" style="font-family: var(--font-mono)">~/.claude/USER/TELOS/MISSION.md</p>
	<div class="text-sm text-gray-700 leading-relaxed space-y-2" style="font-family: var(--font-mono)">
		<p># My Mission</p>
		<p class="text-gray-500">I build tools that help small teams operate like large ones.</p>
		<p class="text-gray-500">I believe technology should reduce friction, not add it. My work focuses on automation, clear documentation, and systems that scale without scaling headcount.</p>
		<p class="text-gray-500">I want to spend more time on creative problem-solving and less time on repetitive coordination.</p>
	</div>
</div>

<Callout type="tip">
	<p>Write it in first person. Keep it under a page. If you can't articulate it yet, that's fine — start with "I'm figuring this out" and refine it over time. PAI adapts as you do.</p>
</Callout>

<h3>Try it yourself</h3>

<p>Open your terminal and create or edit your mission file:</p>

<Terminal
	command="code ~/.claude/USER/TELOS/MISSION.md"
	title="Open in your editor"
/>

<p>Or if you prefer the terminal:</p>

<Terminal
	command="nano ~/.claude/USER/TELOS/MISSION.md"
	title="Edit in terminal"
/>

<h2>GOALS.md — Your active targets</h2>

<p>Goals are different from your mission. Your mission is the direction; goals are the milestones. GOALS.md should reflect what you're actively working toward — not a wishlist, but a focused set of targets.</p>

<h3>Structure your goals clearly</h3>

<div class="bg-white border border-gray-200 rounded-xl p-5 my-6">
	<p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3" style="font-family: var(--font-mono)">~/.claude/USER/TELOS/GOALS.md</p>
	<div class="text-sm text-gray-700 leading-relaxed space-y-2" style="font-family: var(--font-mono)">
		<p># Goals</p>
		<p>## Active (Q1 2026)</p>
		<p class="text-gray-500">- Ship the Learn PAI training app by end of March</p>
		<p class="text-gray-500">- Complete AWS Solutions Architect certification</p>
		<p class="text-gray-500">- Establish a daily writing habit (500 words/day)</p>
		<p>## Longer-term</p>
		<p class="text-gray-500">- Build a personal knowledge management system</p>
		<p class="text-gray-500">- Mentor 2 junior developers this year</p>
	</div>
</div>

<Callout type="info">
	<p>PAI doesn't just read your goals — it tracks them. It can remind you of progress, flag goals that haven't been touched in a while, and suggest actions aligned with what you're trying to achieve.</p>
</Callout>

<h2>The power of these two files</h2>

<p>With just MISSION.md and GOALS.md filled in, your PAI sessions immediately change. Instead of starting from "How can I help you today?", PAI can start from "You're working on the Learn PAI app — want to continue where you left off, or focus on something else?"</p>

<p>That's the difference between a tool and an assistant.</p>

</ModuleLayout>
