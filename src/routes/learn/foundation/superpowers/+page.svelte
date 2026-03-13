<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
	let skillsGroup = $state({ active: 'brainstorming' });
	let installGroup = $state({ active: 'install-step' });
</script>

<ModuleLayout
	moduleId="superpowers"
	title="Superpowers"
	description="Give Claude Code structured development superpowers"
	estimatedMinutes={8}
	nextSlug="foundation/bmad"
>

<DiagramImage
	src="superpowers/superpowers-banner.png"
	alt="Classic Marvel comic book style banner — a team of superheroes on a rooftop at dawn, each with glowing coding power symbols on their chests, bold retro lettering reads SUPERPOWERS"
	caption="With great power comes great development discipline"
/>

<h2>Wait — why are we talking about a plugin?</h2>

<p>Good question. You just installed PAI, and now we're veering into a Claude Code plugin? Here's the thing: <strong>if you write software, Superpowers and PAI are a powerful combination</strong>. PAI gives Claude context about you and your goals. Superpowers gives it a disciplined development process. Together, they turn Claude Code into something genuinely impressive.</p>

<Callout type="info">
	<p><strong>Not a developer?</strong> No problem — mark this lesson complete and move on. Superpowers is specifically for software development workflows. Everything else in PAI works beautifully without it.</p>
</Callout>

<h2>What is Superpowers?</h2>

<p><a href="https://github.com/obra/superpowers" target="_blank" rel="noopener">Superpowers</a> is an open-source plugin for Claude Code (and other AI coding agents) that transforms it from a freeform code generator into a <strong>structured, disciplined development partner</strong>. It's one of the most popular Claude Code extensions with over 81,000 GitHub stars.</p>

<p>Without Superpowers, Claude Code will happily dive straight into writing code the moment you ask. With Superpowers, it follows a deliberate process: <strong>clarify the problem first, plan the approach, write tests before code, review the results, and learn from the outcome</strong>.</p>

<h2>Install Superpowers</h2>

<DiagramImage
	src="superpowers/install.png"
	alt="Comic book panel — a superhero plugging a glowing power cable into a terminal screen, action text reads INSTALL, Kirby crackle energy around the connection"
	caption="One command to unlock your powers"
/>

<p>Superpowers is actively developed and supports multiple platforms. Follow the official installation guide for the most current instructions:</p>

<p><strong><a href="https://github.com/obra/superpowers?tab=readme-ov-file#installation" target="_blank" rel="noopener">Superpowers Installation Guide &rarr;</a></strong></p>

<div class="space-y-2 my-8">

	<Accordion number={1} title="Verify it's working" subtitle="Ask Claude to plan something" defaultOpen={true} group={installGroup} id="install-step">
		<p class="text-sm text-gray-600 mb-3">Superpowers skills activate automatically based on context. Test it by asking Claude to help plan a feature:</p>
		<Terminal
			command="Help me plan a user authentication system for my app"
			output="Using brainstorming skill to refine requirements...

Before we start building, let me understand what you need:
1. What kind of authentication? (email/password, OAuth, magic links?)
2. Do you need role-based access control?
3. What's your current tech stack?
..."
			title="Claude Code"
		/>
		<p class="text-sm text-gray-600 mt-3">If Claude asks clarifying questions before jumping into code, Superpowers is working. Without it, Claude would have started writing auth code immediately.</p>
	</Accordion>

</div>

<h2>The superpowers</h2>

<p>Superpowers adds 14 skills that activate automatically when relevant. They cluster into four groups:</p>

<h3>Think first</h3>

<DiagramImage
	src="superpowers/planning.png"
	alt="Comic book panel — a superhero architect unrolling a giant blueprint, smaller heroes gathered around pointing at different sections, caption reads THE PLAN"
	caption="Planning before coding is the real superpower"
/>

<div class="space-y-2 my-8">

	<Accordion number={1} title="Brainstorming" subtitle="Refine ideas through Socratic dialogue before building" defaultOpen={true} group={skillsGroup} id="brainstorming">
		<p class="text-sm text-gray-600 mb-3">Instead of accepting your first description and running with it, Claude asks probing questions to uncover what you actually need. It explores design alternatives, surfaces edge cases, and documents an approved specification before any code is written.</p>
		<Callout type="tip">
			<p>This fires automatically when you say things like "build me a...", "I want to add...", or "help me create...". You don't need to invoke it manually.</p>
		</Callout>
	</Accordion>

	<Accordion number={2} title="Writing Plans" subtitle="Decompose work into 2-5 minute tasks" group={skillsGroup} id="writing-plans">
		<p class="text-sm text-gray-600 mb-3">After brainstorming, Superpowers creates a detailed implementation plan. Each task is small enough to complete in 2-5 minutes, with precise specifications for what "done" looks like. This prevents the common problem of Claude going off on a tangent halfway through a large feature.</p>
	</Accordion>

	<Accordion number={3} title="Executing Plans" subtitle="Work through the plan with review checkpoints" group={skillsGroup} id="executing-plans">
		<p class="text-sm text-gray-600 mb-3">Executes the plan task by task, with built-in review checkpoints. Each completed task gets verified against its specification before moving to the next one. If something goes wrong, it's caught early — not after 200 lines of code have been built on a broken foundation.</p>
	</Accordion>

</div>

<h3>Test first</h3>

<DiagramImage
	src="superpowers/tdd.png"
	alt="Comic book panel — a superhero scientist with a magnifying glass examining code, test tubes bubbling in the background, speech bubble reads TEST FIRST"
	caption="Write the test, watch it fail, then make it pass"
/>

<div class="space-y-2 my-8">

	<Accordion number={4} title="Test-Driven Development" subtitle="RED-GREEN-REFACTOR — tests before implementation" group={skillsGroup} id="tdd">
		<p class="text-sm text-gray-600 mb-3">The most impactful skill. Enforces the classic TDD cycle: write a failing test first (RED), write the minimum code to pass it (GREEN), then clean up (REFACTOR). This means every piece of code has a test from the moment it exists. No more "I'll add tests later" — later never comes.</p>
		<Terminal
			command="Add a function that validates email addresses"
			output="Using test-driven-development skill...

Step 1 (RED): Writing test for email validation...
✗ test_valid_email — FAIL (function not yet implemented)
✗ test_invalid_email — FAIL
✗ test_empty_string — FAIL

Step 2 (GREEN): Implementing minimum code to pass...
✓ test_valid_email — PASS
✓ test_invalid_email — PASS
✓ test_empty_string — PASS

Step 3 (REFACTOR): Cleaning up..."
			title="TDD in action"
		/>
	</Accordion>

	<Accordion number={5} title="Verification Before Completion" subtitle="Evidence required — never claim done without proof" group={skillsGroup} id="verification">
		<p class="text-sm text-gray-600 mb-3">Before declaring any task complete, Superpowers requires Claude to run verification commands and confirm the output. No more "Done!" without evidence. Tests must pass, builds must succeed, and the actual result must match the specification.</p>
	</Accordion>

	<Accordion number={6} title="Systematic Debugging" subtitle="Four-phase root cause analysis" group={skillsGroup} id="debugging">
		<DiagramImage
			src="superpowers/debugging.png"
			alt="Comic book panel — a superhero detective examining bugs on a giant circuit board with a magnifying glass, speech bubble reads FOUND YOU"
			caption="Isolate, identify, fix, verify — in that order"
		/>
		<p class="text-sm text-gray-600 mb-3">When something breaks, Superpowers prevents the common AI trap of guessing at fixes. Instead, it follows a structured process: reproduce the issue, isolate the root cause, apply a targeted fix, and verify the fix actually works. One change at a time.</p>
	</Accordion>

</div>

<h3>Work in parallel</h3>

<DiagramImage
	src="superpowers/parallel.png"
	alt="Comic book panel — a multi-armed superhero working on multiple glowing terminals simultaneously, each showing a different git branch, action text reads PARALLEL POWER"
	caption="Multiple agents, isolated branches, coordinated results"
/>

<div class="space-y-2 my-8">

	<Accordion number={7} title="Git Worktrees" subtitle="Isolated branches for safe parallel work" group={skillsGroup} id="worktrees">
		<p class="text-sm text-gray-600 mb-3">Creates isolated git worktrees so agents can work on separate branches without interfering with each other or your main codebase. Each worktree gets its own copy of the repo, and baseline tests are verified before work begins.</p>
	</Accordion>

	<Accordion number={8} title="Dispatching Parallel Agents" subtitle="Multiple agents working on independent tasks" group={skillsGroup} id="parallel">
		<p class="text-sm text-gray-600 mb-3">When a plan has independent tasks, Superpowers can dispatch multiple sub-agents to work on them simultaneously. Each agent works in its own worktree, and results are coordinated back together. This can dramatically speed up large features.</p>
	</Accordion>

	<Accordion number={9} title="Subagent-Driven Development" subtitle="Two-stage review for agent-produced code" group={skillsGroup} id="subagent">
		<p class="text-sm text-gray-600 mb-3">When sub-agents complete their work, it goes through a two-stage review process: first checking against the task specification, then reviewing code quality. This catches issues before they're merged back into the main branch.</p>
	</Accordion>

</div>

<h3>Review and ship</h3>

<div class="space-y-2 my-8">

	<Accordion number={10} title="Requesting Code Review" subtitle="Get structured feedback on completed work" group={skillsGroup} id="request-review">
		<p class="text-sm text-gray-600 mb-3">When your work is ready, this skill structures a code review with severity-based issue flagging. Critical issues block merging, warnings suggest improvements, and informational notes capture things to consider for the future.</p>
	</Accordion>

	<Accordion number={11} title="Receiving Code Review" subtitle="Process feedback with technical rigor" group={skillsGroup} id="receive-review">
		<p class="text-sm text-gray-600 mb-3">When you receive review feedback, this skill prevents blind agreement. It ensures each piece of feedback is evaluated on technical merit — verifying suggestions are correct before implementing them, and pushing back when feedback is technically wrong.</p>
	</Accordion>

	<Accordion number={12} title="Finishing a Development Branch" subtitle="Merge, PR, or cleanup — structured completion" group={skillsGroup} id="finishing">
		<p class="text-sm text-gray-600 mb-3">Guides the completion of a development branch with structured options: merge directly, create a pull request, or clean up and abandon. Ensures nothing is left in a half-finished state.</p>
	</Accordion>

</div>

<h3>Meta skills</h3>

<div class="space-y-2 my-8">

	<Accordion number={13} title="Writing Skills" subtitle="Create your own custom superpowers" group={skillsGroup} id="writing-skills">
		<p class="text-sm text-gray-600 mb-3">Superpowers is extensible. This meta-skill guides you through creating new skills that follow the same patterns — so you can add domain-specific workflows that activate automatically for your projects.</p>
	</Accordion>

	<Accordion number={14} title="Using Superpowers" subtitle="Framework introduction and onboarding" group={skillsGroup} id="using-superpowers">
		<p class="text-sm text-gray-600 mb-3">The self-referential skill that teaches Claude how to discover and use the other skills. It ensures relevant skills are checked before every task — making the framework proactive rather than passive.</p>
	</Accordion>

</div>

<h2>The workflow in practice</h2>

<p>Here's what a typical Superpowers session looks like for a real feature:</p>

<ol class="space-y-2 text-sm text-gray-700">
	<li><strong>You say:</strong> "Add a dark mode toggle to the settings page"</li>
	<li><strong>Brainstorming activates:</strong> Claude asks about CSS strategy, persistence, transition animations, system preference detection</li>
	<li><strong>You refine:</strong> "CSS custom properties, save to localStorage, respect prefers-color-scheme"</li>
	<li><strong>Planning activates:</strong> Claude creates 5 tasks — CSS variables, toggle component, localStorage persistence, system preference detection, transition animations</li>
	<li><strong>TDD activates:</strong> For each task, tests are written first, then implementation</li>
	<li><strong>Verification:</strong> Each task is verified before moving to the next</li>
	<li><strong>Code review:</strong> Final review against the original spec</li>
</ol>

<p>The entire process takes longer than "just write the code" — but the result is tested, reviewed, and actually matches what you asked for.</p>

<Callout type="tip">
	<p>You can always tell Claude to skip the process for quick, simple tasks. Say "just do it" or "skip brainstorming" and it'll go direct. Superpowers adds structure where it helps, not bureaucracy where it doesn't.</p>
</Callout>

</ModuleLayout>
