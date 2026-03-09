<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
</script>
<ModuleLayout moduleId="first-workflow" title="Your First Workflow" description="Running a real skill-based task from start to finish" estimatedMinutes={12} nextSlug="get-things-done/workflows">

<h2>What you will build</h2>

<p>In this walkthrough, you will run a real PAI workflow from start to finish: researching a topic using the Research skill. By the end, you will understand how a single request triggers multi-agent parallel research, synthesis, and structured output.</p>

<p>No setup needed beyond having PAI running. Open your terminal and let's go.</p>

<h2>Step 1: Ask a research question</h2>

<p>Start by asking PAI something that requires genuine research — not a simple fact lookup, but a topic with depth. Here is a good example:</p>

<Terminal command="Research the current state of local LLM inference — what hardware is needed, what models run well locally, and what the tradeoffs are vs cloud APIs" output={`PAI ALGORITHM MODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Routing to: Research skill
Mode: Standard (default for this scope)
Estimated time: 2-4 minutes`} title="PAI — Starting research" />

<p>Notice that PAI automatically selected the <strong>Research skill</strong> and chose <strong>standard mode</strong>. You didn't have to specify either — context routing handled it. If you wanted a quicker or deeper result, you could specify the mode:</p>

<ul>
	<li><strong>Quick</strong> — Single agent, surface-level scan, 30 seconds</li>
	<li><strong>Standard</strong> — 3 parallel agents, moderate depth, 2-4 minutes</li>
	<li><strong>Extensive</strong> — 5 parallel agents, thorough coverage, 5-8 minutes</li>
	<li><strong>Deep</strong> — 8+ agents, academic-level depth, 10-20 minutes</li>
</ul>

<h2>Step 2: Watch the agents spin up</h2>

<p>This is where it gets interesting. PAI does not research sequentially — it spawns parallel agents that each tackle a different angle:</p>

<Terminal command="" output={`Spawning 3 parallel research agents...

Agent 1: Hardware requirements & benchmarks
  → Scanning Tom's Hardware, AnandTech, r/LocalLLaMA
  → Found 12 relevant sources

Agent 2: Model compatibility & performance
  → Scanning HuggingFace, Ollama docs, model cards
  → Found 18 relevant sources

Agent 3: Cloud vs local tradeoffs
  → Scanning technical blogs, cost analyses, case studies
  → Found 9 relevant sources

All agents complete. 39 sources collected.
Deduplicating and ranking by relevance...
32 unique sources retained.`} title="PAI — Parallel agent execution" />

<Callout type="info">
	<p>Each agent is an independent subagent running in NATIVE mode. They share nothing during execution — this prevents one agent's findings from biasing another. Synthesis happens only after all agents finish.</p>
</Callout>

<h2>Step 3: Synthesis</h2>

<p>Once all agents report back, PAI synthesizes their findings into a coherent document. This is not just concatenation — it is AI-driven synthesis that resolves contradictions, identifies consensus, and structures the output logically:</p>

<Terminal command="" output={`Synthesizing findings from 32 sources...

Cross-referencing claims across agents...
  → 3 contradictions found, resolving with source quality ranking
  → 12 consensus points identified
  → 5 unique insights from individual agents

Structuring output...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LOCAL LLM INFERENCE — STATE OF THE ART
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HARDWARE REQUIREMENTS
• Entry tier: Apple M-series with 16GB+ unified memory
  - Runs 7B-13B models comfortably
  - ~15-30 tokens/sec on M2/M3
• Mid tier: NVIDIA RTX 4090 (24GB VRAM)
  - Runs up to 70B quantized models
  - ~40-60 tokens/sec on 13B models
• Serious tier: Multi-GPU or Apple M4 Ultra (192GB)
  - Full-precision 70B+ models
  ...

[Full report continues — 3 sections, ~2,000 words]

Output saved to: ~/Documents/research/local-llm-inference-2025.md`} title="PAI — Synthesis output" />

<h2>Step 4: Verify and follow up</h2>

<p>The research is saved to a file, but you are still in the same PAI session. You can ask follow-up questions that build on the research context:</p>

<Terminal command="Based on that research, what's the best setup for under $1000?" output={`PAI NATIVE MODE
TASK: Recommend sub-$1000 local LLM setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Using context from previous research...

RECOMMENDATION: Apple Mac Mini M4 Pro (24GB)
• Price: $599-799 depending on storage
• Runs: Most 7B-13B models at full speed
• Sweet spot: Ollama + llama3.2 for general use
• Limitation: 70B models will be slow (swap-bound)
...`} title="PAI — Follow-up in context" />

<Callout type="tip">
	<p>PAI maintains context within a session. Follow-up questions do not re-run the research — they build on what was already found. This is one of the key advantages of the skill system over one-shot prompting.</p>
</Callout>

<h2>What just happened under the hood</h2>

<p>Let's trace the full workflow that executed:</p>

<DiagramImage src="pai-component-6-hook-system.png" alt="PAI Hook System — lifecycle event automation" caption="Hooks fire at key lifecycle moments, automating context loading and workflow orchestration" />

<ol>
	<li><strong>Context routing</strong> analyzed your request and selected the Research skill</li>
	<li><strong>Mode selection</strong> determined "standard" was appropriate for the scope</li>
	<li><strong>Agent spawning</strong> created 3 parallel subagents with distinct research angles</li>
	<li><strong>Source collection</strong> — each agent independently gathered and ranked sources</li>
	<li><strong>Deduplication</strong> merged results and removed redundant sources</li>
	<li><strong>Synthesis</strong> used AI reasoning to resolve conflicts and structure findings</li>
	<li><strong>Output formatting</strong> produced a structured document saved to disk</li>
	<li><strong>Context retention</strong> kept findings available for follow-up questions</li>
</ol>

<p>This seven-step process is a single <strong>workflow</strong> within the Research skill. Other skills have their own workflows — the Writing skill has drafting workflows, the Security skill has audit workflows, and so on. The next module covers the full 338-workflow catalog.</p>

<h2>Try it yourself</h2>

<p>Pick a topic you are genuinely curious about and run a research workflow. Good starter prompts:</p>

<ul>
	<li>"Research best practices for SQLite in production applications"</li>
	<li>"Research the pros and cons of monorepos vs polyrepos for small teams"</li>
	<li>"Research how to set up a home lab for learning Kubernetes"</li>
</ul>

<Callout type="warning">
	<p>Research mode matters. Use <strong>quick</strong> for "give me the gist" questions and <strong>standard</strong> for real research. Jumping to <strong>deep</strong> mode for simple questions wastes time and tokens — remember the skill hierarchy from the previous lesson.</p>
</Callout>

</ModuleLayout>
