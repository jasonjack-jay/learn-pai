<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
	import { getProfile } from '$lib/state.svelte';

	let agentsGroup = $state({ active: 'analyst' });
	let workflowGroup = $state({ active: 'analysis' });
	let extrasGroup = $state({ active: 'party-mode' });

	const profile = getProfile();
	const nextSlug = $derived(
		profile.interests.length > 0
			? profile.interests[0] === 'know-me' ? 'know-me/telos-intro'
			: profile.interests[0] === 'get-things-done' ? 'get-things-done/skills-overview'
			: 'architecture/nine-primitives'
			: null
	);
</script>

<ModuleLayout
	moduleId="bmad"
	title="The BMAD Method"
	description="A full agile development team, powered by AI agents"
	estimatedMinutes={10}
	nextSlug={nextSlug}
>

<DiagramImage
	src="bmad/bmad-banner.png"
	alt="Mad scientist laboratory in technicolor — a wild-haired scientist at a massive control panel with tesla coils, bubbling beakers, and bold lettering reading BMAD METHOD"
	caption="Build More. Architect Dreams."
/>

<h2>Wait — another plugin?!</h2>

<p>Yes, one more — and then you're done with the foundation. Like Superpowers, <strong>BMAD is optional and aimed at software developers</strong>. But where Superpowers focuses on disciplined coding practices (TDD, debugging, code review), BMAD takes a completely different angle: it gives you an <strong>entire agile development team</strong> made of specialized AI agents.</p>

<p>BMAD has actually evolved beyond pure software development. At its core (<a href="https://docs.bmad-method.org/" target="_blank" rel="noopener">BMad Core</a>), it's a framework capable of orchestrating any workflow or process you can imagine. There's far too much here to cover in detail — it's well worth spending time exploring <a href="https://docs.bmad-method.org/" target="_blank" rel="noopener">the docs</a> and experimenting. The guide here focuses on what matters most for software developers.</p>

<Callout type="info">
	<p><strong>Not a developer?</strong> Mark this lesson complete and move on. But do bookmark <a href="https://docs.bmad-method.org/" target="_blank" rel="noopener">the BMAD docs</a> — the core framework is being extended to support non-development workflows too.</p>
</Callout>

<h2>Install BMAD</h2>

<DiagramImage
	src="bmad/install.png"
	alt="Mad scientist plugging a giant glowing cable into a wall socket with sparks flying, cluttered laboratory with monitors, test tubes, and a small robot assistant"
	caption="One command to assemble your AI team"
/>

<p>BMAD is actively developed and the installation process evolves. Follow the official guide for the most current instructions:</p>

<p><strong><a href="https://docs.bmad-method.org/how-to/install-bmad/" target="_blank" rel="noopener">BMAD Installation Guide &rarr;</a></strong></p>

<Callout type="tip">
	<p>BMAD requires <strong>Node.js v20+</strong>. The installer is interactive and will walk you through selecting which modules and tools to configure for your project.</p>
</Callout>

<h2>Meet the team</h2>

<p>BMAD's secret weapon is its cast of specialized agents. Each one has a distinct role, personality, and area of expertise. They're not generic assistants — they're opinionated domain experts who push back, ask hard questions, and keep each other honest.</p>

<DiagramImage
	src="bmad/agents.png"
	alt="Nine eccentric scientists in different colored lab coats sitting around a chaotic round table in a cluttered lab, each with unique personality quirks, a whiteboard of flowcharts behind them"
	caption="Nine specialists, one team, zero egos (okay, maybe a few)"
/>

<div class="space-y-2 my-8">

	<Accordion number={1} title="Mary — the Analyst" subtitle="Brainstorming, research, and product briefs" defaultOpen={true} group={agentsGroup} id="analyst">
		<p class="text-sm text-gray-600 mb-3">Mary is your starting point. She runs brainstorming sessions, conducts research, and distills everything into a clear product brief. She's the one who turns "I have an idea for an app" into a structured document that the rest of the team can work from.</p>
		<Terminal
			command="bmad-analyst"
			output="Mary here. Let's explore your idea before we commit to anything.
What problem are you trying to solve?"
			title="Starting a brainstorming session"
		/>
	</Accordion>

	<Accordion number={2} title="John — the Product Manager" subtitle="PRDs, epics, stories, and course correction" group={agentsGroup} id="pm">
		<p class="text-sm text-gray-600 mb-3">John takes Mary's brief and turns it into a proper Product Requirements Document. He breaks the work into epics and stories, checks implementation readiness, and steps in when the project needs course correction. He's the one who keeps asking "but does this actually solve the user's problem?"</p>
	</Accordion>

	<Accordion number={3} title="Winston — the Architect" subtitle="System architecture and technical decisions" group={agentsGroup} id="architect">
		<p class="text-sm text-gray-600 mb-3">Winston designs the technical architecture. He makes the big structural decisions — what frameworks, what patterns, what trade-offs. He also runs implementation readiness checks to make sure the architecture is solid enough to build on before anyone writes a line of code.</p>
	</Accordion>

	<Accordion number={4} title="Sally — the UX Designer" subtitle="User experience design and interface specs" group={agentsGroup} id="ux">
		<p class="text-sm text-gray-600 mb-3">Sally handles everything user-facing. If the project has a UI, she produces the UX specification — interaction patterns, component layouts, accessibility considerations. She joins the workflow automatically when the project needs a front end.</p>
	</Accordion>

	<Accordion number={5} title="Bob — the Scrum Master" subtitle="Sprint planning, story creation, and retrospectives" group={agentsGroup} id="sm">
		<p class="text-sm text-gray-600 mb-3">Bob runs the agile process. He handles sprint planning, creates individual story files, and runs retrospectives after each epic. He's the one tracking what's done, what's blocked, and what's next.</p>
	</Accordion>

	<Accordion number={6} title="Amelia — the Developer" subtitle="Feature development and code review" group={agentsGroup} id="dev">
		<p class="text-sm text-gray-600 mb-3">Amelia writes the code. She picks up stories from Bob's sprint plan and implements them, then runs code reviews on the results. She works from the architecture Winston defined and the stories John wrote — so she always has context for what she's building and why.</p>
	</Accordion>

	<Accordion number={7} title="Quinn — the QA Engineer" subtitle="Test generation and quality assurance" group={agentsGroup} id="qa">
		<p class="text-sm text-gray-600 mb-3">Quinn generates tests for existing features. She's the lightweight quality gate — making sure the code Amelia writes actually does what the stories said it should.</p>
	</Accordion>

	<Accordion number={8} title="Barry — the Quick Flow Solo Dev" subtitle="Rapid spec-to-code for smaller changes" group={agentsGroup} id="quick">
		<p class="text-sm text-gray-600 mb-3">Barry is the shortcut. For well-understood changes that don't need the full team, Barry handles spec, development, and review in one go. He's the "just get it done" agent.</p>
	</Accordion>

	<Accordion number={9} title="Paige — the Technical Writer" subtitle="Documentation, diagrams, and standards" group={agentsGroup} id="writer">
		<p class="text-sm text-gray-600 mb-3">Paige produces documentation, creates diagrams, updates standards, and explains concepts. She turns the team's work into something future developers (and future you) can actually understand.</p>
	</Accordion>

</div>

<h2>The full workflow</h2>

<p>BMAD follows four phases. Each phase produces documents that become context for the next — so by the time code is being written, the developer has requirements, architecture, UX specs, and stories to work from. No guessing.</p>

<DiagramImage
	src="bmad/workflow.png"
	alt="A Rube Goldberg machine spanning a laboratory — a ball triggers dominoes, beakers, and conveyor belts carrying documents through four stations: ANALYZE, PLAN, BUILD, SHIP"
	caption="Each phase feeds the next — documents become context automatically"
/>

<div class="space-y-2 my-8">

	<Accordion number={1} title="Phase 1: Analysis" subtitle="Mary brainstorms, researches, and writes the product brief" defaultOpen={true} group={workflowGroup} id="analysis">
		<p class="text-sm text-gray-600 mb-3">This phase is optional but recommended. Mary (the Analyst) helps you explore the problem space through structured brainstorming. She produces a <strong>brainstorming report</strong> and a <strong>product brief</strong> — the foundation everything else builds on.</p>
		<p class="text-sm text-gray-600 mb-0">For well-understood problems, you can skip straight to Phase 2. But for anything novel, this phase prevents the "we built the wrong thing" problem.</p>
	</Accordion>

	<Accordion number={2} title="Phase 2: Planning" subtitle="John creates the PRD, Sally designs the UX" group={workflowGroup} id="planning">
		<p class="text-sm text-gray-600 mb-3">John (the PM) takes the product brief and creates a full <strong>Product Requirements Document</strong>. If the project has a user interface, Sally (UX Designer) produces a <strong>UX specification</strong>. These documents define what you're building and what it should look and feel like.</p>
	</Accordion>

	<Accordion number={3} title="Phase 3: Solutioning" subtitle="Winston architects, John creates epics and stories" group={workflowGroup} id="solutioning">
		<p class="text-sm text-gray-600 mb-3">Winston (the Architect) designs the <strong>technical architecture</strong> — frameworks, patterns, data models, API contracts. Then John breaks the PRD into <strong>epics and stories</strong> and runs an <strong>implementation readiness check</strong> to verify everything is solid before development starts.</p>
		<Callout type="tip">
			<p>The readiness check is a gate. If the architecture has gaps or the stories are ambiguous, it catches them here — not halfway through a sprint.</p>
		</Callout>
	</Accordion>

	<Accordion number={4} title="Phase 4: Implementation" subtitle="Bob plans sprints, Amelia codes, Quinn tests" group={workflowGroup} id="implementation">
		<p class="text-sm text-gray-600 mb-3">Bob (Scrum Master) runs <strong>sprint planning</strong> and creates individual story files. Amelia (Developer) picks up stories and writes code. She runs <strong>code reviews</strong> on her own work. Quinn (QA) generates tests. After each epic, Bob runs a <strong>retrospective</strong> to capture lessons learned.</p>
		<p class="text-sm text-gray-600 mb-0">If things go sideways mid-sprint, John can step in with <strong>course correction</strong> to update the plan without starting over.</p>
	</Accordion>

</div>

<h2>The shortcuts and special moves</h2>

<div class="space-y-2 my-8">

	<Accordion number={1} title="Quick Flow" subtitle="Skip the ceremony for well-understood changes" defaultOpen={true} group={extrasGroup} id="party-mode">
		<DiagramImage
			src="bmad/quick-flow.png"
			alt="A mad scientist riding a rocket-powered office chair through a laboratory at high speed, typing on a laptop, papers flying, coffee mug floating mid-air, bold text reads QUICK FLOW"
			caption="When you know what needs doing, Barry gets it done fast"
		/>
		<p class="text-sm text-gray-600 mb-3">Not every change needs four phases and nine agents. For bug fixes, small features, and well-understood work, <strong>Quick Flow</strong> lets Barry (the solo dev agent) handle everything: produce a quick tech spec, write the code, and review it. One agent, one flow, done.</p>
	</Accordion>

	<Accordion number={2} title="Party Mode" subtitle="Multiple agents in one session, debating in real time" group={extrasGroup} id="party">
		<DiagramImage
			src="bmad/party-mode.png"
			alt="Multiple eccentric scientists arguing, gesturing, and drawing on whiteboards in absolute creative chaos, a banner reads PARTY MODE, confetti and sparks fly"
			caption="When you need the whole team arguing in the same room"
		/>
		<p class="text-sm text-gray-600 mb-3">This is BMAD's most distinctive feature. <strong>Party Mode</strong> brings multiple agents into a single conversation — the PM, the Architect, the Developer, and the UX Designer all debating and building on each other's ideas in real time. It's ideal for major design decisions, creative brainstorming, retrospectives, or any situation where you want diverse expert perspectives colliding.</p>
		<Terminal
			command="bmad-party-mode"
			output="Party Mode activated. Your AI team is assembled.

John (PM): What are we discussing?
Winston (Architect): I have concerns about the proposed data model...
Sally (UX): Before we get into data models — have we validated the user flow?"
			title="Party Mode in action"
		/>
	</Accordion>

	<Accordion number={3} title="bmad-help" subtitle="Ask what to do next at any point" group={extrasGroup} id="help">
		<p class="text-sm text-gray-600 mb-3">Lost? At any point in the workflow you can invoke <code>bmad-help</code> and ask where you are and what should happen next. It's context-aware — it knows which documents exist, which phase you're in, and what the logical next step is.</p>
		<Terminal
			command="bmad-help I just finished the architecture, what do I do next?"
			output="You're at the end of Phase 3 (Solutioning).

Your architecture.md is complete. Next steps:
1. Run 'create-epics-and-stories' with John to break the PRD into implementable units
2. Then 'check-implementation-readiness' to verify everything is solid
3. Once the gate passes, move to Phase 4 with sprint planning"
			title="Getting guidance mid-workflow"
		/>
	</Accordion>

</div>

<h2>BMAD + PAI + Superpowers</h2>

<p>These three tools occupy different layers of the stack and complement each other well:</p>

<ul class="space-y-2 text-sm text-gray-700">
	<li><strong>PAI</strong> gives Claude deep context about you — your goals, preferences, communication style, and current projects</li>
	<li><strong>Superpowers</strong> enforces coding discipline — TDD, systematic debugging, verification before completion</li>
	<li><strong>BMAD</strong> provides the agile process — requirements, architecture, sprint planning, and a team of specialized agents</li>
</ul>

<p>Together, you get an AI that knows who you are (PAI), follows professional development practices (Superpowers), and can run a complete product lifecycle from idea to deployment (BMAD).</p>

<Callout type="tip">
	<p>You don't need all three to get value. Start with PAI, add whichever plugin matches how you work, and explore the other later. There's no wrong order.</p>
</Callout>

</ModuleLayout>
