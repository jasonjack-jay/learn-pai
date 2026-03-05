<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
</script>
<ModuleLayout moduleId="workflows-deep" title="338 Workflows" description="Discovering and chaining workflows for complex tasks" estimatedMinutes={10}>

<h2>What are workflows?</h2>

<p>Every PAI skill contains one or more <strong>workflows</strong> — predefined sequences of steps that turn a request into a result. If skills are tools, workflows are the specific ways you use those tools. The Research skill alone has workflows for quick scans, deep dives, competitive analysis, literature reviews, and more.</p>

<p>Across all 13 skill categories, PAI ships with <strong>338 workflows</strong>. You do not need to memorize them — but understanding how they are organized helps you get more from PAI.</p>

<h2>How workflows are organized</h2>

<p>Workflows live inside their parent skill definitions in <code>~/.claude/PAI/Skills/</code>. Each skill YAML file declares its workflows with:</p>

<ul>
	<li><strong>Name</strong> — what the workflow is called (e.g., "competitive-analysis")</li>
	<li><strong>Trigger conditions</strong> — when PAI should automatically select this workflow</li>
	<li><strong>Steps</strong> — the ordered sequence of actions to perform</li>
	<li><strong>Inputs/outputs</strong> — what the workflow expects and produces</li>
	<li><strong>Estimated time</strong> — how long it typically takes</li>
</ul>

<Callout type="info">
	<p>You rarely invoke workflows by name. PAI's context routing picks the right workflow based on your request. Knowing they exist helps you ask better questions — and debug when output is not what you expected.</p>
</Callout>

<h2>Discovering available workflows</h2>

<p>There are several ways to explore what workflows are available:</p>

<Terminal command="What workflows do you have for research?" output={`PAI NATIVE MODE
TASK: List Research skill workflows
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Research skill — 12 workflows:

 1. quick-scan         → Surface-level overview, 1 agent, ~30s
 2. standard-research  → Balanced depth, 3 agents, ~3min
 3. extensive-research → Thorough coverage, 5 agents, ~7min
 4. deep-dive          → Academic depth, 8+ agents, ~15min
 5. competitive-analysis → Compare N competitors across criteria
 6. literature-review  → Academic paper synthesis
 7. market-research    → Industry/market analysis
 8. technical-research → Focus on docs, specs, implementations
 9. trend-analysis     → Track topic evolution over time
10. source-verification → Fact-check claims against sources
11. gap-analysis       → Find what's missing in a space
12. counter-research   → Deliberately seek opposing viewpoints`} title="PAI — Discovering workflows" />

<p>You can also browse the skill files directly to see the full workflow definitions, including all steps and parameters.</p>

<h2>Workflow examples in practice</h2>

<p>Here are four concrete examples showing different workflow types across different skills:</p>

<h3>Example 1: Security audit workflow</h3>

<p>The Security skill has an audit workflow that chains static analysis, dependency scanning, and AI-powered review:</p>

<Terminal command="Run a security audit on this project" output={`PAI ALGORITHM MODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Skill: Security | Workflow: full-audit

Step 1/5: Dependency scan (CODE level)
  → Running npm audit / pip-audit
  → 3 vulnerabilities found (1 high, 2 moderate)

Step 2/5: Secret detection (CLI level)
  → Scanning for hardcoded keys, tokens, passwords
  → 0 secrets found

Step 3/5: Static analysis (CLI level)
  → Running ESLint security plugin
  → 2 findings: prototype pollution risk, open redirect

Step 4/5: AI code review (PROMPT level)
  → Reviewing auth flow, data validation, error handling
  → 4 recommendations generated

Step 5/5: Report synthesis (SKILL level)
  → Combining all findings with severity ratings
  → Output: ~/Documents/security/audit-2025-03-05.md`} title="Security — Audit workflow" />

<h3>Example 2: Content analysis workflow</h3>

<p>The ContentAnalysis skill can break down any content — articles, videos, codebases — into structured insights:</p>

<Terminal command="Analyze the writing style and key arguments in this article: https://example.com/ai-regulation" output={`PAI NATIVE MODE
TASK: Analyze article writing style and arguments
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Skill: ContentAnalysis | Workflow: rhetorical-analysis

Fetching and parsing article...

WRITING STYLE:
• Tone: Authoritative but accessible
• Structure: Problem → evidence → proposal
• Avg sentence length: 18 words (readable)
• Rhetorical devices: Analogies (3), statistics (7), expert quotes (4)

KEY ARGUMENTS:
1. Self-regulation has failed (supported by 3 case studies)
2. EU approach is too restrictive (compared to innovation metrics)
3. Proposes tiered framework based on risk level
...`} title="ContentAnalysis — Rhetorical analysis" />

<h3>Example 3: Investigation workflow</h3>

<p>The Investigation skill follows leads across multiple data sources, building a knowledge graph as it goes:</p>

<Terminal command="Investigate why our API response times spiked last Tuesday between 2-4 PM" output={`PAI ALGORITHM MODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Skill: Investigation | Workflow: incident-analysis

Phase 1: Data collection
  → Pulling logs from 14:00-16:00 UTC
  → Pulling metrics from monitoring dashboard
  → Checking deployment history

Phase 2: Correlation analysis
  → Deploy at 13:47 introduced new DB query
  → Query lacks index on user_sessions.updated_at
  → Table scan time correlates with response spike

Phase 3: Impact assessment
  → 2,847 requests affected (12% of traffic)
  → P99 latency went from 200ms to 4.2s
  → 23 timeout errors returned to users

ROOT CAUSE: Missing index on user_sessions.updated_at
FIX: CREATE INDEX idx_sessions_updated ON user_sessions(updated_at);
PREVENTION: Add query plan analysis to CI pipeline`} title="Investigation — Incident analysis" />

<h3>Example 4: Media workflow</h3>

<p>The Media skill handles audio, video, and image processing — often chaining ffmpeg and AI analysis:</p>

<Terminal command="Extract the audio from this video, transcribe it, and create a summary with timestamps" output={`PAI ALGORITHM MODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Skill: Media | Workflow: video-to-summary

Step 1: Audio extraction (CODE level — ffmpeg)
  → Extracted 47:23 of audio to /tmp/extracted.wav

Step 2: Transcription (SKILL level — Whisper)
  → Transcribed 6,842 words
  → Output: ~/Documents/media/transcript.md

Step 3: Summary with timestamps (PROMPT level)
  → Identifying key topics and transitions
  → 8 major sections identified

TIMESTAMPED SUMMARY:
[00:00] Introduction — speaker background and talk goals
[03:15] Problem statement — why current tools fail
[08:42] Proposed architecture — three-layer approach
...`} title="Media — Video-to-summary" />

<h2>Chaining workflows</h2>

<p>The real power comes from chaining workflows together. You do not need special syntax — just describe a multi-step goal and PAI will chain the appropriate workflows:</p>

<Terminal command="Research our top 3 competitors, analyze their pricing pages, then draft a competitive positioning document for our sales team" output={`PAI ALGORITHM MODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Chaining 3 workflows:

Workflow 1: Research → competitive-analysis
  → Identified 3 competitors, 47 data points collected

Workflow 2: ContentAnalysis → pricing-comparison
  → Scraped and analyzed 3 pricing pages
  → Feature matrix generated

Workflow 3: Writing → sales-collateral
  → Applying competitive intelligence
  → Structuring for sales team use

Output: ~/Documents/writing/competitive-positioning.md`} title="PAI — Workflow chaining" />

<Callout type="tip">
	<p>When chaining workflows, PAI passes context between them automatically. The competitive analysis results feed directly into the content analysis, which feeds into the writing workflow. You do not need to manually copy data between steps.</p>
</Callout>

<h2>Finding the right workflow</h2>

<p>With 338 workflows, here is how to find what you need:</p>

<ul>
	<li><strong>Just ask</strong> — describe your goal and let context routing handle it</li>
	<li><strong>Ask what's available</strong> — "What workflows do you have for X?"</li>
	<li><strong>Browse skill files</strong> — read the YAML definitions in <code>~/.claude/PAI/Skills/</code></li>
	<li><strong>Check the output</strong> — PAI always tells you which workflow it selected, so you learn over time</li>
</ul>

<Callout type="warning">
	<p>Do not try to memorize all 338 workflows. Learn the skill categories, understand that workflows exist within them, and let PAI's routing do the matching. You will naturally learn the names of the ones you use most.</p>
</Callout>

</ModuleLayout>
