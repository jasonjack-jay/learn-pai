<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
</script>
<ModuleLayout moduleId="the-algorithm" title="The Algorithm v3.6" description="Observe → Think → Plan → Build → Execute → Verify → Learn" estimatedMinutes={12} nextSlug="architecture/how-it-fits">
<h2>PAI's universal problem-solving method</h2>
<p>At the heart of PAI is "The Algorithm" — a structured approach to solving any problem. It's based on the scientific method, adapted for AI-assisted work. Unlike ad-hoc prompting where the AI just starts generating, the Algorithm forces PAI to understand before it acts.</p>

<DiagramImage src="pai-algorithm-diagram.png" alt="The Algorithm — Observe, Think, Plan, Build, Execute, Verify, Learn" caption="The Algorithm: PAI's 7-step problem-solving loop" />

<div class="space-y-3 my-6">
{#each ['Observe — Gather data and understand the situation', 'Think — Analyze what you\'ve observed, form hypotheses', 'Plan — Design an approach based on your analysis', 'Build — Create the solution', 'Execute — Run it in the real world', 'Verify — Check results against expectations', 'Learn — Capture what worked and what didn\'t'] as step, i}
<div class="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200">
<span class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style="background: var(--color-accent); color: white">{i + 1}</span>
<p class="text-sm">{step}</p>
</div>
{/each}
</div>

<p>This isn't just a suggestion — PAI actually follows this loop. Every complex task goes through these stages, and the "Learn" step feeds back into future interactions. Let's look at each step in detail.</p>

<h3>Step 1: Observe</h3>
<p>Before PAI does anything, it gathers context. This means reading files, checking your current directory, looking at git status, reviewing your TELOS context, and understanding what you're actually asking for — not just the literal words, but the intent behind them.</p>
<Terminal title="Observe in action" command='You: "Fix the failing tests in the auth module"' output="PAI Observes:
  → Reading src/auth/__tests__/ (4 test files found)
  → Running existing tests to see which fail
  → Checking git log for recent auth changes
  → Reading PROJECTS.md for auth module context
  → 3 tests failing, all related to token expiry logic" />
<p>Good observation prevents wasted work. If PAI skipped this step and just started editing code, it might fix the wrong tests or miss the root cause entirely.</p>

<h3>Step 2: Think</h3>
<p>With data gathered, PAI analyzes what it found. This is where hypotheses form. "The tests broke because the token expiry was changed from 1 hour to 30 minutes in yesterday's commit, but the test fixtures still expect 3600 seconds."</p>
<p>Thinking also involves consulting your BELIEFS.md — do you prefer fixing tests to match new behavior, or reverting the behavior change? PAI considers your principles, not just the technical options.</p>
<Callout type="info"><p>The Think step is where PAI differentiates from basic AI assistants. Instead of jumping to the first solution, it forms hypotheses and considers alternatives. This mirrors how experienced developers approach debugging — understand first, then act.</p></Callout>

<h3>Step 3: Plan</h3>
<p>Now PAI designs an approach. The plan is explicit — it's not hidden in the model's reasoning. PAI outputs what it intends to do, in what order, and why.</p>
<Terminal title="Plan output" command="PAI plans:" output="1. Update token expiry constant in test fixtures (3600 → 1800)
2. Fix 2 tests that hardcode expiry timestamps
3. Add a shared constant TOKEN_EXPIRY_SECONDS to avoid future drift
4. Run full test suite to verify no regressions
5. Commit with descriptive message referencing the original change" />
<p>The plan step also selects which <strong>Skills</strong> will be needed — in this case, file editing skills, the test runner skill, and the git-commit skill.</p>

<h3>Step 4: Build</h3>
<p>Build is where PAI creates the actual solution — writing code, editing configuration, generating content. This is the step most people think of as "what AI does," but in the Algorithm, it's only step 4 of 7.</p>
<p>During Build, PAI follows your STYLE.md preferences. If you prefer explicit types over inference, it writes explicit types. If you like descriptive variable names over abbreviations, it names things clearly. The output isn't generic — it's coded in <em>your</em> style.</p>

<h3>Step 5: Execute</h3>
<p>Execute takes the built solution and runs it in the real environment. This is where files get written, commands get run, and changes take effect. The <strong>Security System</strong> is active here — every command is validated against your security policies before execution.</p>
<Terminal title="Execute with security" command="PAI executes:" output="  → Writing src/auth/constants.ts [ALLOWED]
  → Writing src/auth/__tests__/token.test.ts [ALLOWED]
  → Running: npm test [ALLOWED]
  → Running: rm -rf / [BLOCKED — destructive operation]" />
<p>Execute also triggers hooks. Pre-command hooks can add logging, post-command hooks can notify you of results, and the Voice System can announce completion of long-running steps.</p>

<h3>Step 6: Verify</h3>
<p>PAI doesn't just execute and hope for the best. Verify checks that the results match expectations. Did the tests pass? Did the build succeed? Does the output look correct?</p>
<p>Verification can be automated (run the test suite, check the exit code) or qualitative (does this generated content match the brief?). If verification fails, PAI loops back — typically to Think or Plan — to try a different approach.</p>
<Callout type="warning"><p>Without the Verify step, AI assistants can silently produce broken output. The Algorithm's explicit verification catches issues before they reach you. If tests still fail after the fix, PAI doesn't just say "done" — it re-enters the loop.</p></Callout>

<h3>Step 7: Learn</h3>
<p>The final step captures what happened for future reference. What approach worked? What didn't? What should PAI remember next time?</p>
<Terminal title="Learn step" command="PAI learns:" output="  → Memory: Token expiry tests use shared constant now
  → Memory: User prefers fixing tests over reverting behavior
  → Memory: Auth module has 47 tests, ~3s runtime
  → Warm storage updated (3 new entries)" />
<p>These learnings go into the <strong>Memory System</strong>'s warm storage. Next time you work on the auth module, PAI already knows the test count, your preferences around test-vs-revert decisions, and the shared constant pattern.</p>

<h2>When does the Algorithm activate?</h2>
<p>PAI runs in three modes. The Algorithm only activates for complex tasks:</p>
<ul>
<li><strong>MINIMAL mode</strong> — Simple acknowledgments and ratings. No Algorithm needed.</li>
<li><strong>NATIVE mode</strong> — Quick, single-step tasks. Straightforward execution without the full loop.</li>
<li><strong>ALGORITHM mode</strong> — Multi-step, complex work. Debugging, building, investigating, refactoring. The full 7-step loop runs here.</li>
</ul>
<p>PAI classifies every request before starting work. A quick "what time is it?" gets MINIMAL. "Rename this variable" gets NATIVE. "Refactor the authentication system to support OAuth2" gets the full Algorithm.</p>

<Callout type="tip"><p>The Algorithm is a loop, not a line. If Verify fails, PAI goes back to Think or Plan. If new information emerges during Build, PAI can re-Observe. Real problem-solving is iterative, and the Algorithm embraces that.</p></Callout>
</ModuleLayout>
