<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
</script>

<ModuleLayout
	moduleId="skill-hierarchy"
	title="The Skill Hierarchy"
	description="CODE → CLI → PROMPT → SKILL — choosing the right level"
	estimatedMinutes={8}
	nextSlug="get-things-done/first-workflow"
>

<h2>Not everything needs AI</h2>

<p>One of PAI's core principles is: <strong>use the simplest solution that works.</strong> The skill hierarchy codifies this:</p>

<div class="space-y-3 my-6">
	<div class="p-4 rounded-xl bg-white border border-gray-200">
		<div class="flex items-center gap-3 mb-2">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background: var(--color-success-light); color: var(--color-success)">1</span>
			<p class="font-semibold text-sm">CODE — Write deterministic code</p>
		</div>
		<p class="text-sm text-gray-500 ml-11">If a bash script can do it reliably, don't involve AI at all. Fastest, most predictable.</p>
	</div>
	<div class="p-4 rounded-xl bg-white border border-gray-200">
		<div class="flex items-center gap-3 mb-2">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background: var(--color-accent-light); color: var(--color-accent)">2</span>
			<p class="font-semibold text-sm">CLI-BASED-TOOL — Use existing tools</p>
		</div>
		<p class="text-sm text-gray-500 ml-11">grep, jq, ffmpeg, git — proven tools with predictable output. Use them.</p>
	</div>
	<div class="p-4 rounded-xl bg-white border border-gray-200">
		<div class="flex items-center gap-3 mb-2">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background: var(--color-warn-light); color: var(--color-warn)">3</span>
			<p class="font-semibold text-sm">PROMPT — Structured AI prompt</p>
		</div>
		<p class="text-sm text-gray-500 ml-11">When you need AI reasoning, use a well-structured prompt with clear instructions.</p>
	</div>
	<div class="p-4 rounded-xl bg-white border border-gray-200">
		<div class="flex items-center gap-3 mb-2">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-purple-100 text-purple-600">4</span>
			<p class="font-semibold text-sm">SKILL — Full PAI skill</p>
		</div>
		<p class="text-sm text-gray-500 ml-11">Complex tasks that need context, multi-step reasoning, and tool chaining. The full PAI experience.</p>
	</div>
</div>

<Callout type="tip">
	<p>The hierarchy is about <strong>reliability and speed</strong>. Code is the most reliable, AI skills the least — but also the most flexible. Match the tool to the task.</p>
</Callout>

<h2>Concrete examples at each level</h2>

<p>Let's walk through a real scenario at each level. Suppose you need to find all TODO comments in a codebase and understand what they mean.</p>

<h3>Level 1: CODE — Bash one-liner</h3>

<p>If you just need the list, a one-liner is the right tool. It is instant, deterministic, and never hallucinates:</p>

<Terminal command="grep -rn 'TODO' src/ --include='*.ts' | wc -l" output="23" title="CODE level — deterministic" />

<p>No AI involved. The answer is exact. If this is all you need, <strong>stop here</strong>.</p>

<h3>Level 2: CLI-BASED-TOOL — jq, grep, ripgrep</h3>

<p>If you need structured extraction — say, pulling TODOs with their file, line number, and surrounding context into JSON — chain CLI tools:</p>

<Terminal command="rg 'TODO' src/ --json | jq -s '[.[] | select(.type==&quot;match&quot;) | .data]'" output={`[
  {"file": "src/api/auth.ts", "line": 42, "text": "  // TODO: add rate limiting"},
  {"file": "src/db/migrate.ts", "line": 17, "text": "  // TODO: handle rollback case"},
  ...
]`} title="CLI level — structured extraction" />

<p>Still deterministic. The output is machine-parseable. You could pipe this into another tool or save it to a file. Use CLI tools when you need <strong>transformation and structure</strong> beyond what a simple command gives you.</p>

<h3>Level 3: PROMPT — Structured Claude query</h3>

<p>If you need to <strong>understand and prioritize</strong> those TODOs — which ones are critical, which are cosmetic — you need AI reasoning. A structured prompt gets you there:</p>

<Terminal command={`claude -p "Here are 23 TODOs from our codebase. Categorize each as: critical (blocks shipping), important (should fix soon), or minor (nice to have). For critical items, explain why they're blocking.

$(rg 'TODO' src/ -C 2)"`} output={`CRITICAL (3):
• src/api/auth.ts:42 — "add rate limiting"
  → No rate limiting means the auth endpoint is vulnerable to brute force.
  → Blocks: production deployment

• src/db/migrate.ts:17 — "handle rollback case"
  → Migration failures will leave DB in corrupt state.
  → Blocks: any schema change

IMPORTANT (8):
• src/utils/cache.ts:91 — "implement cache invalidation"
  → Stale data possible but not dangerous...

MINOR (12):
...`} title="PROMPT level — AI reasoning" />

<p>Now you are using AI for what it is good at: <strong>judgment, prioritization, and explanation</strong>. The prompt is structured with clear instructions and real data. This is not a vague "help me with my code" — it is a targeted query.</p>

<h3>Level 4: SKILL — Full PAI skill</h3>

<p>If you need a <strong>complete audit</strong> — find all TODOs, analyze them, cross-reference with git blame to see how old they are, check if any are in critical paths, generate a report, and create tickets — that is a SKILL-level task:</p>

<Terminal command="Audit the codebase for technical debt. Focus on TODOs, FIXMEs, and hacky workarounds. Cross-reference with git history. Produce an actionable report with priorities." output={`PAI ALGORITHM MODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 1: Scanning codebase (CODE level — grep/rg)
  → 23 TODOs, 7 FIXMEs, 4 HACKs found
Phase 2: Git analysis (CLI level — git log/blame)
  → Oldest TODO: 14 months (auth.ts)
  → 3 TODOs in files with no recent commits
Phase 3: Impact analysis (PROMPT level — reasoning)
  → Cross-referencing with import graph
  → Identifying critical-path items
Phase 4: Report generation (SKILL level — synthesis)
  → Writing structured report with recommendations

Technical Debt Report saved to ~/Documents/reports/
Created 3 Linear tickets for critical items.`} title="SKILL level — full orchestration" />

<p>Notice how the skill <strong>uses all the lower levels internally</strong>. It runs grep, pipes through CLI tools, uses AI reasoning for analysis, and orchestrates everything into a coherent output. This is the power of the hierarchy — skills build on top of the simpler levels.</p>

<h2>When to reach for each level</h2>

<Callout type="info">
	<p><strong>Rule of thumb:</strong> Start at CODE. Move up only when the current level cannot solve the problem. If you need exact data, stay low. If you need judgment, go higher. If you need orchestration across multiple steps, use a SKILL.</p>
</Callout>

<ul>
	<li><strong>CODE</strong> — You know exactly what you want and the answer is deterministic</li>
	<li><strong>CLI</strong> — You need to transform, filter, or restructure data</li>
	<li><strong>PROMPT</strong> — You need AI to reason, summarize, or make judgment calls</li>
	<li><strong>SKILL</strong> — The task has multiple phases, needs context across steps, or produces complex output</li>
</ul>

<p>Getting this right is the difference between a PAI user and a PAI power user. Over-using skills for simple tasks wastes time and tokens. Under-using them for complex tasks means doing extra manual work.</p>

</ModuleLayout>
