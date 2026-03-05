<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<ModuleLayout
	moduleId="context-in-action"
	title="Seeing Context in Action"
	description="How PAI uses your TELOS files to personalize every interaction"
	estimatedMinutes={8}
>

<h2>Before and after TELOS</h2>

<p>The best way to understand TELOS is to see the difference it makes. Let's look at the same request with and without context.</p>

<h3>Without TELOS (plain Claude Code)</h3>

<Terminal
	command="Help me plan my week"
	output="Sure! Here's a general weekly planning framework:
1. Review your calendar
2. Identify top 3 priorities
3. Block time for deep work
4. Schedule breaks
..."
	title="Claude Code (no context)"
/>

<p>Generic. Useful maybe, but it doesn't know <em>you</em>.</p>

<h3>With TELOS (PAI)</h3>

<Terminal
	command="Help me plan my week"
	output="Based on your active goals and projects:

Your Learn PAI app target is end of March — that's 26 days away.
You're in the middle of Tier 1 content. At your current pace,
you need about 2 more focused sessions to finish it.

Your AWS cert exam is in 6 weeks. You haven't logged study
time in 5 days.

Suggested week:
• Mon/Wed/Fri mornings: Learn PAI development (2hr blocks)
• Tue/Thu mornings: AWS study (1.5hr blocks)
• Daily: 500 words writing habit (you've hit this 3/7 days last week)

Want me to create calendar blocks for these?"
	title="PAI (with TELOS context)"
/>

<p>That's a completely different experience. PAI knows your projects, deadlines, goals, and habits — and it plans accordingly.</p>

<h2>Context flows through everything</h2>

<p>TELOS doesn't just affect planning. It changes how PAI helps with every kind of task:</p>

<p><strong>Code reviews</strong> — PAI knows your belief that "simple solutions beat clever ones," so it flags unnecessary complexity.</p>

<p><strong>Writing</strong> — PAI knows your communication strategy of "lead with the bottom line," so drafts start with the key point.</p>

<p><strong>Problem solving</strong> — PAI knows you use first-principles thinking, so it breaks problems down to fundamentals instead of suggesting quick fixes.</p>

<p><strong>Project suggestions</strong> — PAI can look at your IDEAS.md and suggest which one to tackle next based on your current goals and available time.</p>

<Callout type="tip">
	<p>The more specific your TELOS files are, the more personalized PAI becomes. Vague goals get vague help. Specific goals get specific, actionable assistance.</p>
</Callout>

<h2>The feedback loop</h2>

<p>TELOS isn't a "set it and forget it" system. As you use PAI, it learns:</p>

<p>PAI's <strong>memory system</strong> captures what works and what doesn't. If it suggests an approach and you say "that's not how I'd do it," PAI records that preference. Over time, its suggestions converge toward your actual working style.</p>

<p>And you should update your TELOS files regularly. Goals change, projects complete, new challenges emerge. Think of TELOS as a living document — a conversation between you and your AI about who you are and what you want.</p>

<h2>What's next?</h2>

<p>You've completed the "AI That Knows Me" path. You understand TELOS, how to write each file, and how PAI uses that context to personalize everything.</p>

<p>From here, you might want to explore how PAI's <strong>skills system</strong> works (the "Get Things Done" path) or dive into the <strong>architecture</strong> to understand how all the pieces connect.</p>

<p>Check the sidebar for more paths, or head back to the path selector to add new ones.</p>

</ModuleLayout>
