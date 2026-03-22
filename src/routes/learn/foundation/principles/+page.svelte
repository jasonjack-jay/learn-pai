<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';

	const principles = [
		{ num: 1, name: 'User Centricity', short: 'You come first, not tools or models', detail: 'PAI stores your goals, preferences, and context in TELOS files so the AI always works toward what matters to you. Every design decision asks "does this serve the user?" first. For example, PAI\'s memory system remembers your coding style preferences so you don\'t have to repeat yourself across sessions.' },
		{ num: 2, name: 'Foundational Algorithm', short: 'Scientific method: Observe → Think → Plan → Build → Execute → Verify → Learn', detail: 'The Algorithm is PAI\'s structured reasoning process. Instead of letting AI freeform its way through a task, it follows explicit phases: observe the situation, think about what\'s needed, plan the approach, build it, execute, verify it worked, and capture what was learned. This turns complex work from chaotic prompting into a repeatable, auditable process.' },
		{ num: 3, name: 'Clear Thinking First', short: 'Clarify the problem before you prompt', detail: 'Before you type a single prompt, you should be able to state what you want in plain language. If you can\'t explain the problem clearly to yourself, the AI won\'t magically figure it out. In practice, this means spending 30 seconds writing down what "done" looks like before engaging Claude.' },
		{ num: 4, name: 'Scaffolding > Model', short: 'Architecture matters more than which model you use', detail: 'A well-structured CLAUDE.md file, good context routing, and proper skill definitions will outperform a smarter model with no structure. PAI proves this daily — the same model produces dramatically different results depending on whether it has proper scaffolding. Invest your time in architecture, not model shopping.' },
		{ num: 5, name: 'Deterministic Infrastructure', short: 'Use templates and structure, not random AI output', detail: 'PAI uses structured templates, fixed output formats, and predefined response modes (NATIVE, ALGORITHM, MINIMAL) so you get consistent results. When you run a skill, it produces the same shape of output every time. This is why PAI feels reliable rather than random — the infrastructure constrains the AI into predictable patterns.' },
		{ num: 6, name: 'Code Before Prompts', short: 'If bash can do it, don\'t ask AI', detail: 'A bash script that renames 500 files will be faster, more reliable, and more repeatable than asking an AI to do it. PAI uses hooks — actual shell scripts — for tasks like git commits, notifications, and file management. Save AI for judgment calls, creativity, and complex reasoning. Use code for everything else.' },
		{ num: 7, name: 'Spec/Test/Evals First', short: 'Define success before building', detail: 'Before building a feature, PAI asks: how will we know it works? Write the test, define the eval criteria, or spec the expected output first. This prevents the common trap of building something that "feels done" but doesn\'t actually solve the problem. It also gives the AI clear acceptance criteria to work toward.' },
		{ num: 8, name: 'UNIX Philosophy', short: 'Do one thing well, then compose', detail: 'Each PAI skill does one thing — context routing, memory capture, voice notification — and does it well. Complex workflows are built by composing these small, focused pieces. This makes the system easier to debug, test, and extend. If a skill tries to do too much, break it apart.' },
		{ num: 9, name: 'ENG/SRE Principles', short: 'Treat AI like production software', detail: 'PAI treats AI infrastructure with the same rigor as production systems: version control for configurations, structured logging, clear error handling, and reproducible setups. Your CLAUDE.md is checked into git. Your skills are versioned. If your AI setup can\'t survive a laptop wipe and restore, it\'s not infrastructure — it\'s a house of cards.' },
		{ num: 10, name: 'CLI as Interface', short: 'Text beats GUIs (Graphical User Interfaces) for speed and scriptability', detail: 'Claude Code runs in the terminal because text interfaces are fast, scriptable, and composable. You can pipe output, chain commands, and automate workflows in ways no GUI allows. PAI leans into this — hooks are shell scripts, skills are text files, and the primary interface is your terminal.' },
		{ num: 11, name: 'Goal → Code → CLI → Prompts → Agents', short: 'Decision hierarchy — use the simplest solution', detail: 'When solving a problem, start with the simplest tool that works. Can you achieve the goal with a clear plan? Do that. Need code? Write a script. Need a CLI tool? Use one. Only reach for AI prompts when simpler tools fall short, and only use full agent workflows for genuinely complex tasks. Most problems don\'t need agents.' },
		{ num: 12, name: 'Skill Management', short: 'Modular capabilities, routed by context', detail: 'PAI skills are modular instruction sets that get loaded based on context. Instead of cramming everything into one massive prompt, PAI routes to the right skill for the job. Context routing in CLAUDE.md tells PAI where to find specialized instructions, keeping each piece focused and maintainable.' },
		{ num: 13, name: 'Memory System', short: 'Capture everything worth remembering', detail: 'PAI captures decisions, learnings, and context into persistent memory so knowledge compounds over time. When you discover that a particular approach works well for your codebase, PAI remembers it. This turns every session into an investment — future sessions benefit from everything learned in past ones.' },
		{ num: 14, name: 'Agent Personalities', short: 'Different work needs different voices', detail: 'PAI supports different agent personalities because different tasks benefit from different communication styles. A coding review needs precision and directness. Creative brainstorming needs openness and exploration. PAI lets you configure distinct voices so the AI adapts its style to match the work, not the other way around.' },
		{ num: 15, name: 'Science as Meta-Loop', short: 'Hypothesis → Experiment → Measure → Iterate', detail: 'PAI itself evolves through the scientific method. Have a hypothesis about a better prompt structure? Test it. Measure whether it actually improves output quality. Keep what works, discard what doesn\'t. This meta-loop is how PAI went from v1 to v4 — continuous, evidence-based iteration on the infrastructure itself.' },
		{ num: 16, name: 'Permission to Fail', short: 'Say "I don\'t know" to prevent hallucinations', detail: 'PAI explicitly gives the AI permission to say "I don\'t know" rather than fabricating an answer. This is critical for trust — a system that confidently makes things up is worse than one that admits uncertainty. In practice, PAI\'s structured output formats make it obvious when the AI is guessing versus working from solid ground.' },
	];

	let expanded = $state<number | null>(null);
	let principleEls: Record<number, HTMLButtonElement> = {};

	function toggle(num: number) {
		const opening = expanded !== num;
		expanded = opening ? num : null;
		if (opening) {
			requestAnimationFrame(() => {
				principleEls[num]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			});
		}
	}
</script>

<ModuleLayout
	moduleId="principles-overview"
	title="The 16 Principles"
	description="A visual tour of the ideas that guide PAI's design"
	estimatedMinutes={8}
>

<p>PAI isn't just a collection of scripts. It's built on a coherent philosophy — 16 principles that guide every design decision. You don't need to memorize them, but understanding the thinking behind PAI will help you get the most out of it.</p>

<Callout type="info">
	<p>Click any principle to learn more. Don't worry about absorbing all of these now — they'll become intuitive as you use PAI.</p>
</Callout>

<div class="space-y-2 my-8">
	{#each principles as p}
		<button
			bind:this={principleEls[p.num]}
			class="w-full text-left rounded-xl border transition-all cursor-pointer scroll-mt-4 {expanded === p.num ? 'bg-white border-gray-300 shadow-sm' : 'bg-white/60 border-gray-200 hover:bg-white hover:border-gray-300'}"
			onclick={() => toggle(p.num)}
		>
			<div class="flex items-start gap-3 p-4">
				<span class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 {expanded === p.num ? 'text-white' : 'bg-gray-100 text-gray-500'}" style="{expanded === p.num ? 'background: var(--color-accent)' : ''}">{p.num}</span>
				<div class="flex-1 min-w-0">
					<p class="font-medium text-sm" style="color: var(--color-ink)">{p.name}</p>
					<p class="text-sm text-gray-500 mt-0.5">{p.short}</p>
				</div>
				<svg class="w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform {expanded === p.num ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
			</div>
			{#if expanded === p.num}
				<div class="px-4 pb-4 pt-3 border-t border-gray-100 mx-4 mb-1">
					<p class="text-sm text-gray-600 leading-relaxed">{p.detail}</p>
				</div>
			{/if}
		</button>
	{/each}
</div>

<h2>The big themes</h2>

<p>If you zoom out, these 16 principles cluster around a few big ideas:</p>

<p><strong>You are the priority.</strong> Principles 1, 3, and 14 all center on the human. PAI exists to serve your goals, not to show off AI capabilities.</p>

<DiagramImage src="pai-human-centered-v3.png" alt="Human-centered design — PAI puts you at the center" caption="Principle theme: You are the priority" />

<p><strong>Structure beats cleverness.</strong> Principles 4, 5, 6, 7, 8, and 11 emphasize that good architecture and deterministic tools will outperform clever prompting every time.</p>

<DiagramImage src="pai-context-first-v2.png" alt="Context-first approach — structure over clever prompts" caption="Principle theme: Context and structure first" />

<p><strong>Learning is continuous.</strong> Principles 2, 13, 15, and 16 create a feedback loop where PAI (and you) get better over time through systematic observation and honest failure.</p>

<p><strong>Production-grade engineering.</strong> Principles 9, 10, and 12 mean PAI isn't a toy — it's infrastructure you can rely on, maintained like real software.</p>

<DiagramImage src="pai-platform-independence-diagram.png" alt="Platform independence — PAI works across environments" caption="Principle theme: Platform-independent, production-grade infrastructure" />

</ModuleLayout>
