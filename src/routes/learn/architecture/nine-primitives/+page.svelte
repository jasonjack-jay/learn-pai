<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>
<ModuleLayout moduleId="nine-primitives" title="The 9 Primitives" description="The building blocks of PAI's architecture" estimatedMinutes={10} nextSlug="architecture/user-system">
<h2>Architecture building blocks</h2>
<p>PAI is built on 9 core primitives — modular components that each handle one aspect of making AI personal and persistent:</p>
<div class="space-y-2 my-6">
{#each [
{n: 1, name: 'Assistant vs Agent Interaction', desc: 'Persistent assistant that knows you, not a stateless task executor'},
{n: 2, name: 'TELOS (Deep Goal Understanding)', desc: '10 files capturing who you are — mission, goals, projects, and more'},
{n: 3, name: 'User/System Separation', desc: 'Your customizations stay safe during upgrades'},
{n: 4, name: 'Granular Customization', desc: 'Six layers: Identity, Preferences, Workflows, Skills, Hooks, Memory'},
{n: 5, name: 'Skill System', desc: 'Deterministic capabilities: CODE → CLI → PROMPT → SKILL'},
{n: 6, name: 'Memory System', desc: 'Three-tier learning: hot, warm, cold storage'},
{n: 7, name: 'Hook System', desc: 'Lifecycle event handlers for automation'},
{n: 8, name: 'Security System', desc: 'Command validation and prompt injection prevention'},
{n: 9, name: 'Voice System', desc: 'Audio feedback via ElevenLabs TTS'}
] as p}
<div class="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200">
<span class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0" style="background: var(--color-accent-light); color: var(--color-accent)">{p.n}</span>
<div><p class="font-medium text-sm">{p.name}</p><p class="text-sm text-gray-500 mt-0.5">{p.desc}</p></div>
</div>
{/each}
</div>
<Callout type="info"><p>Each primitive is designed to work independently but compose together. This is the UNIX philosophy in action — do one thing well, then combine.</p></Callout>
</ModuleLayout>
