<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
</script>
<ModuleLayout moduleId="how-it-fits" title="How It All Fits Together" description="The complete system diagram — from goals to execution" estimatedMinutes={8}>
<h2>The full picture</h2>
<p>Now you've seen the individual pieces. Here's how they work together. Instead of describing the architecture abstractly, let's walk through a real request from start to finish.</p>

<h2>A real request: "Write a blog post about our new API"</h2>
<p>You're working on a SaaS product. You open Claude Code and type: <strong>"Write a blog post announcing our new REST API for the developer docs site."</strong> Here's exactly what happens inside PAI.</p>

<h3>Phase 1: Session context (already loaded)</h3>
<p>Before you even typed your request, PAI already prepared for you. When you started the session, the <strong>Hook System</strong> fired:</p>
<Terminal title="Session start" command="Session hooks firing..." output="hook: load-telos
  → Reading USER/TELOS/MISSION.md — Build developer tools that...
  → Reading USER/TELOS/PROJECTS.md — Active: API v2 launch
  → Reading USER/TELOS/STYLE.md — Technical but approachable
  → Reading USER/TELOS/BELIEFS.md — Documentation is a product
hook: load-memory
  → 3 warm memories loaded from last session
  → Blog posts should include code examples (learned 2 days ago)
  → User prefers headers with action verbs (learned 1 week ago)
hook: project-detect
  → cwd: ~/Dev/api-platform → matched PROJECTS.md entry" />
<p>By the time you type your request, PAI already knows your project, your writing style, your beliefs about documentation, and lessons from past writing sessions. This context was loaded from <strong>USER/</strong> — your personal directory that survives upgrades.</p>

<h3>Phase 2: Mode selection</h3>
<p>PAI classifies your request. A blog post is multi-step, creative work — not a quick fix. It selects <strong>ALGORITHM mode</strong> and begins the 7-step loop.</p>

<h3>Phase 3: The Algorithm runs</h3>

<p><strong>Step 1 — Observe:</strong> PAI reads the actual API source code, existing documentation, the README, and any previous blog posts on the docs site. It checks your PROJECTS.md for the API launch timeline and reads RELATIONSHIPS.md to understand the target audience (external developers).</p>

<Terminal title="Observe" command="PAI observes:" output="  → Reading src/api/routes/ — 12 endpoints found
  → Reading docs/blog/ — 3 existing posts (analyzing tone)
  → Reading CHANGELOG.md — v2.0 features listed
  → TELOS context: audience is external developers
  → Memory: past blog posts averaged 800-1200 words" />

<p><strong>Step 2 — Think:</strong> PAI analyzes what it found. The API has 12 endpoints across 3 resource types. The existing blog posts use a "problem → solution → code example" structure. Your BELIEFS.md says "documentation is a product" — so this isn't a throwaway announcement, it should be genuinely useful.</p>

<p><strong>Step 3 — Plan:</strong> PAI designs the blog post structure and selects skills it'll need.</p>

<Terminal title="Plan" command="PAI plans:" output="Blog structure:
  1. Opening — The problem this API solves
  2. What's new — Key features (3 highlights)
  3. Quick start — Authentication + first request
  4. Code examples — One per resource type (3 examples)
  5. Migration guide — For users of the old API
  6. Closing — Links to full docs

Skills needed: file-write, code-format, markdown-lint
Estimated output: ~1000 words
Style: Technical but approachable (from STYLE.md)" />

<p><strong>Step 4 — Build:</strong> PAI writes the blog post. But notice — it's writing in <em>your</em> style because it read STYLE.md. It's including code examples because warm memory said you prefer them. It's using action-verb headers because it learned that preference last week. The content references real endpoints from your actual codebase.</p>

<p><strong>Step 5 — Execute:</strong> The blog post is written to <code>docs/blog/api-v2-announcement.md</code>. The <strong>Security System</strong> validates the file write is in an allowed directory. The <strong>Voice System</strong> announces: "Blog post draft complete."</p>

<p><strong>Step 6 — Verify:</strong> PAI re-reads the post and checks: Does it match the tone of existing posts? Are the code examples valid? Does the word count fall in the learned range? Are all API endpoints mentioned accurately?</p>

<Terminal title="Verify" command="PAI verifies:" output="  ✓ Tone matches existing posts (technical, approachable)
  ✓ 3 code examples — all syntactically valid
  ✓ Word count: 1,047 (within 800-1200 range)
  ✓ All 12 endpoints referenced accurately
  ✓ Migration section covers breaking changes from v1" />

<p><strong>Step 7 — Learn:</strong> PAI records what happened for next time.</p>

<Terminal title="Learn" command="PAI learns:" output="  → Memory: API blog post structure works well (problem→solution→code)
  → Memory: docs/blog/ is the blog directory for this project
  → Memory: User approved this post without major revisions
  → Warm storage updated" />

<h3>Phase 4: Response</h3>
<p>PAI presents the completed blog post with a summary of what it wrote and why it made certain choices. You review it, suggest a tweak to the opening, and PAI iterates — this time in NATIVE mode since it's a small change.</p>

<h2>The system diagram</h2>
<p>Here's how every primitive was involved in that single request:</p>

<DiagramImage src="pai-architecture-diagram.png" alt="PAI complete architecture diagram — all 9 primitives working together" caption="The complete PAI architecture: every primitive connected" />

<ul>
<li><strong>Assistant model</strong> — PAI knew your project, your style, and your past preferences before you asked</li>
<li><strong>TELOS</strong> — Mission, projects, style, beliefs, and relationships all informed the output</li>
<li><strong>USER/SYSTEM split</strong> — Your TELOS and memories lived safely in USER/ while SYSTEM/ provided the Algorithm and skills</li>
<li><strong>Granular customization</strong> — Your style preferences shaped the tone; your workflow preferences shaped the structure</li>
<li><strong>Skill System</strong> — File writing, code formatting, and markdown linting skills executed the plan</li>
<li><strong>Memory System</strong> — Warm memories from past sessions influenced structure and word count; new memories were recorded</li>
<li><strong>Hook System</strong> — Session-start hooks loaded all context before you even typed</li>
<li><strong>Security System</strong> — File write operations were validated against allowed directories</li>
<li><strong>Voice System</strong> — Audio feedback announced when the draft was complete</li>
</ul>

<Callout type="tip"><p>Every one of the 9 primitives played a role in a single blog post request. That's the point — they're not isolated features. They're an integrated system where each piece makes the others more effective.</p></Callout>

<h2>The learning loop</h2>
<p>The most important thing about this architecture is that it gets better over time. Every request that flows through the Algorithm ends with a Learn step. Those learnings feed into future Observe and Think steps. Your TELOS files evolve as your goals and projects change.</p>
<p>After a month of using PAI, it doesn't just know your name — it knows that you prefer action-verb headers, that your blog posts run 800-1200 words, that your API project has 12 endpoints, and that you believe documentation is a product. That accumulated context is what transforms a generic AI into a personal one.</p>

<Callout type="info"><p>This is the core thesis of PAI: an AI that learns from structured context, follows a disciplined process, and keeps your personalization safe from infrastructure changes. It's not magic — it's architecture.</p></Callout>

<p>That's PAI: a learning loop built on structured context, with you at the center.</p>
</ModuleLayout>
