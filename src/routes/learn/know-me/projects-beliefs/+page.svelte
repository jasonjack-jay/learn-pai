<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<ModuleLayout
	moduleId="projects-beliefs"
	title="Projects & Beliefs"
	description="Mapping your current work and core worldview"
	estimatedMinutes={10}
>

<h2>PROJECTS.md — What you're building</h2>

<p>Your projects file is the most tactical piece of TELOS. It tells PAI exactly what's on your plate right now — active projects, their status, and what needs attention.</p>

<div class="bg-white border border-gray-200 rounded-xl p-5 my-6">
	<p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3" style="font-family: var(--font-mono)">~/.claude/USER/TELOS/PROJECTS.md</p>
	<div class="text-sm text-gray-700 leading-relaxed space-y-2" style="font-family: var(--font-mono)">
		<p># Active Projects</p>
		<p>## Learn PAI Web App</p>
		<p class="text-gray-500">Status: In progress</p>
		<p class="text-gray-500">Stack: SvelteKit 2, Tailwind, static hosting</p>
		<p class="text-gray-500">Goal: Interactive training app for PAI users</p>
		<p class="text-gray-500">Next: Complete Tier 1 content, build branching engine</p>
		<p>## Home Automation</p>
		<p class="text-gray-500">Status: On hold</p>
		<p class="text-gray-500">Blocked: Waiting for new sensor hardware</p>
	</div>
</div>

<p>When PAI knows your projects, it can do something powerful: <strong>connect the dots between your work and your goals.</strong> If your goal is to "ship the Learn PAI app by March" and your project shows it's in progress, PAI can prioritize tasks that move that project forward.</p>

<Callout type="tip">
	<p>Include a "Next" line for each active project. This gives PAI a clear starting point when you begin a session. "You mentioned the next step on Learn PAI is completing Tier 1 content — want to work on that?"</p>
</Callout>

<h2>BELIEFS.md — What you stand for</h2>

<p>This one feels unusual. Why would an AI assistant need to know your beliefs?</p>

<p>Because beliefs shape decisions. If you believe "simple solutions are better than clever ones," PAI should suggest straightforward approaches first. If you believe "documentation is as important as code," PAI should remind you to document as you build.</p>

<div class="bg-white border border-gray-200 rounded-xl p-5 my-6">
	<p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3" style="font-family: var(--font-mono)">~/.claude/USER/TELOS/BELIEFS.md</p>
	<div class="text-sm text-gray-700 leading-relaxed space-y-2" style="font-family: var(--font-mono)">
		<p># Beliefs</p>
		<p class="text-gray-500">- Shipping beats perfection. Get it in front of users fast.</p>
		<p class="text-gray-500">- Complexity is the enemy of reliability.</p>
		<p class="text-gray-500">- Good tools should feel invisible.</p>
		<p class="text-gray-500">- Everyone has something valuable to contribute — they just need the right support.</p>
		<p class="text-gray-500">- Open source creates more value than it captures.</p>
	</div>
</div>

<p>Your beliefs don't have to be philosophical. They can be practical ("I prefer TypeScript over JavaScript") or cultural ("I value async communication over meetings"). The more honest they are, the better PAI can align with how you actually think.</p>

<Callout type="info">
	<p>Beliefs aren't static. Review them periodically. As you learn and grow, your beliefs evolve — and PAI should evolve with you.</p>
</Callout>

</ModuleLayout>
