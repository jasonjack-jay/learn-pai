<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-hooks"
	title="Git Hooks & Automation"
	subtitle="Scripts at Git events — catch bad code before it ships"
	estimatedMinutes={8}
	pathId="git-in-detail"
>
	<ImagePlaceholder
		description="A tube-map station with multiple gates in a line before the train can leave: 'pre-commit: lint', 'pre-commit: typecheck', 'commit-msg: format', 'pre-push: tests'. Each gate has a friendly alien inspector giving a thumbs-up or thumbs-down. A commit attempts to pass through, gets stopped at 'typecheck', the alien points to the error."
		size="medium"
	/>

	<h2>What is this?</h2>

	<p>
		<strong>Hooks</strong> are scripts that Git runs automatically at specific moments — right
		before a commit is made, right after a push happens, when a commit message is being written.
		Git ships with a bunch of hook points; you choose which ones to use.
	</p>

	<p>
		The three most-used:
	</p>

	<ul>
		<li><code>pre-commit</code> — runs before the commit is created. Can block the commit</li>
		<li><code>commit-msg</code> — runs on the commit message. Can reject/modify messages</li>
		<li><code>pre-push</code> — runs before a push. Can block the push</li>
	</ul>

	<h2>Why does this matter?</h2>

	<p>
		Hooks are the enforcement layer. They're how "we agreed not to commit
		<code>console.log</code>" becomes "you physically cannot commit <code>console.log</code>." In
		a world where an AI agent commits code on your behalf, hooks are one of the few guardrails
		that catch problems <em>before</em> they reach the shared repo.
	</p>

	<p>
		<strong>If you're thinking "set up hooks so I can't commit <code>console.log</code>,"</strong>
		you need a <code>pre-commit</code> hook running lint.
		<br />
		<strong>If you're thinking "run tests before every push,"</strong> you need a
		<code>pre-push</code> hook.
		<br />
		<strong>If you're thinking "scan for API keys in every commit,"</strong> you need a
		<code>pre-commit</code> hook running a secret scanner.
	</p>

	<h3>The hook points you'll actually use</h3>

	<ul>
		<li>
			<strong><code>pre-commit</code></strong> — best place for formatters, linters, type-checks,
			secret scanners. Fast is important: this runs on every commit
		</li>
		<li>
			<strong><code>commit-msg</code></strong> — enforce commit message conventions (e.g.
			Conventional Commits)
		</li>
		<li>
			<strong><code>prepare-commit-msg</code></strong> — pre-fill the commit message (e.g. with a
			ticket ID)
		</li>
		<li>
			<strong><code>pre-push</code></strong> — run tests, block pushing to protected branches,
			fail builds before network I/O
		</li>
		<li>
			<strong><code>post-commit</code></strong> — notifications, logging, local automation (but
			don't make the user wait for it)
		</li>
	</ul>

	<p>
		Hooks live in <code>.git/hooks/</code> as executable files. They're local to the repo and
		<strong>do not push</strong>. Which is why tools exist to manage them.
	</p>

	<h3>The tools that manage hooks for you</h3>

	<p>
		Raw <code>.git/hooks/</code> doesn't travel with the repo — everyone has to set up hooks on
		their own machine. Tools solve this by storing hook configs in a file that <em>is</em>
		committed, then syncing them to <code>.git/hooks/</code> automatically:
	</p>

	<ul>
		<li>
			<strong>husky</strong> — the popular choice in the JS ecosystem. Config in
			<code>.husky/</code>, installed via <code>npm install</code>
		</li>
		<li>
			<strong>lefthook</strong> — a Go binary, fast, language-agnostic. Config in
			<code>lefthook.yml</code>. Gaining ground in larger projects
		</li>
		<li>
			<strong>pre-commit</strong> (the framework) — Python-based, ecosystem of off-the-shelf
			hooks. Common in Python projects and infra repos
		</li>
	</ul>

	<p>
		Pick one per project and stick with it. Running two at once produces confusing double-runs.
	</p>

	<AskYourAgent
		prompts={[
			"set up husky in this project and add a pre-commit hook to run lint and typecheck",
			"switch this repo from husky to lefthook",
			"add a pre-push hook that runs npm test",
			"add a commit-msg hook enforcing Conventional Commits"
		]}
	/>

	<h3>The hooks worth adding</h3>

	<h4>Prettier / linter on changed files (pre-commit)</h4>
	<p>
		Run the formatter only on staged files so commits get auto-formatted consistently. Tools like
		<code>lint-staged</code> integrate well with husky for this.
	</p>

	<h4>Typecheck (pre-commit or pre-push)</h4>
	<p>
		<code>tsc --noEmit</code> or <code>svelte-check</code> — catches errors before they reach CI.
		Slower, often better as <code>pre-push</code> than <code>pre-commit</code>
	</p>

	<h4>Unit tests (pre-push)</h4>
	<p>
		Run the fast tests before pushing. Slow tests belong in CI. Pre-push is the right gate
		because it catches problems before they become team-visible
	</p>

	<h4>Secret scanning (pre-commit)</h4>
	<p>
		Tools like <code>gitleaks</code>, <code>trufflehog</code>, or <code>detect-secrets</code>.
		Block commits containing API keys, tokens, private keys. The kind of mistake that's hardest
		to un-make once pushed
	</p>

	<h4>Conventional Commits (commit-msg)</h4>
	<p>
		Enforce message format like <code>feat(ui): add dark mode</code>. Pays for itself via
		auto-generated changelogs and semver automation
	</p>

	<h3>Why hooks matter with AI coding assistants</h3>

	<Callout type="tip">
		<p>
			AI assistants are fast and tireless — which means they can commit code faster than you can
			review it. Hooks are the deterministic gatekeeper: "before this commit can exist, it must
			pass lint, typecheck, and secret scanning." The AI sees the hook rejection, fixes the code,
			commits again. This is how you scale AI-driven development without scaling accidents.
		</p>
	</Callout>

	<p>
		A good PAI / agent setup typically has pre-commit hooks for fast correctness checks and
		pre-push hooks for tests. The AI learns the rules because the rules are enforced — not
		because you wrote them in CLAUDE.md.
	</p>

	<h3>When to bypass hooks (and when not to)</h3>

	<p>
		<code>git commit --no-verify</code> skips <code>pre-commit</code> and
		<code>commit-msg</code> hooks. <code>git push --no-verify</code> skips
		<code>pre-push</code>.
	</p>

	<Callout type="warning">
		<p>
			<strong>Bypassing hooks is almost always the wrong answer.</strong> If a hook is failing,
			fix the underlying problem. The hook is catching a real issue. The one legitimate case is
			an emergency hotfix where the lint rule is wrong — and even then, follow up with a proper
			fix and a commit that restores the rule.
		</p>
	</Callout>

	<h3>Common scenarios</h3>

	<h4>"The team agreed on Conventional Commits but nobody follows it"</h4>
	<p>
		Add a <code>commit-msg</code> hook that validates message format. Now the agreement is the
		automation.
	</p>

	<h4>"A secret got committed last week"</h4>
	<p>
		Rotate the secret first. Then add a <code>pre-commit</code> secret-scanning hook to prevent
		recurrence. Then clean history (see <em>Undoing Things</em>).
	</p>

	<h4>"Hooks slow down every commit too much"</h4>
	<p>
		Move slow things to <code>pre-push</code> (typechecks, tests). Keep <code>pre-commit</code>
		for things that are genuinely fast (formatting, linting changed files only, secret scanning).
	</p>

	<AskYourAgent
		prompts={[
			"add a pre-commit hook running lint on staged files only",
			"set up a secret-scanner that blocks commits containing API keys",
			"move the typecheck from pre-commit to pre-push — it's too slow",
			"this hook is failing — help me fix the real issue, not bypass it"
		]}
	/>

	<h2>Summary</h2>

	<p>
		Hooks run scripts at Git events. The important ones are <code>pre-commit</code>,
		<code>commit-msg</code>, and <code>pre-push</code>. Use husky, lefthook, or the pre-commit
		framework so hooks travel with the repo. Good hooks run lint, typecheck, secret-scan, tests.
		Don't use <code>--no-verify</code> to silence a failing hook — fix the underlying thing.
	</p>
</PathPageLayout>
