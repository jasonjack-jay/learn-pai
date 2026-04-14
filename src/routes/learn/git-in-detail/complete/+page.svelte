<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import { base } from '$app/paths';
</script>

<PathPageLayout
	moduleId="git-in-detail-complete"
	title="You've Reached the Terminus"
	subtitle="A quick recap and where to head next"
	estimatedMinutes={3}
	pathId="git-in-detail"
>
	<ImagePlaceholder
		description="Celebration scene — aliens gathered at a tube-map terminus station, all fourteen lines lit up on the wall map behind them. Banners, a confetti cannon, and a signpost pointing to other stations: 'Error Whisperer →', 'How the Web Works →', 'Shipping →'."
		size="large"
	/>

	<h2>You made it</h2>

	<p>
		Fourteen sections. Everything from "what does <code>.gitignore</code> actually do?" to "what
		is a worktree and why do AI agents love them?" You can hold your own in a Git conversation
		with any senior developer now — and, more importantly, you can evaluate what your AI agent is
		doing when it rebases, cherry-picks, or force-pushes on your behalf.
	</p>

	<h2>Quick recap</h2>

	<ul>
		<li>
			<strong>Setup</strong> — your identity, power settings, <code>.gitignore</code>, SSH keys,
			and the magic <code>.git</code> folder
		</li>
		<li>
			<strong>The Staging Area</strong> — the waiting room that lets you commit selectively;
			<code>git add -p</code> is the superpower
		</li>
		<li>
			<strong>Branches</strong> — cheap 40-byte pointers; <code>git switch</code> over
			<code>checkout</code>; beware detached HEAD
		</li>
		<li>
			<strong>Merging</strong> — fast-forward, merge commits, squash; conflict markers; <code>--abort</code>
			always works
		</li>
		<li>
			<strong>Rebasing</strong> — replaying commits for linear history; interactive for tidying;
			never rebase shared history; <code>--force-with-lease</code> for safe force-push
		</li>
		<li>
			<strong>Remotes</strong> — <code>fetch</code> ≠ <code>pull</code>;
			<code>origin</code>/<code>upstream</code> for forks; <code>--prune</code> for tidy tracking
			refs
		</li>
		<li>
			<strong>Stashing</strong> — the shelf for WIP; always name with <code>-m</code>; use
			<code>-u</code> for untracked; prefer <code>apply</code> over <code>pop</code>
		</li>
		<li>
			<strong>History</strong> — <code>git log</code> flags, <code>show</code>, <code>blame -w -M
				-C</code>, and the wonder of <code>bisect</code>
		</li>
		<li>
			<strong>Undoing</strong> — <code>restore</code> → <code>revert</code> → <code>reset</code>;
			<code>reflog</code> is your 30-day safety net
		</li>
		<li>
			<strong>Worktrees</strong> — parallel working directories; the enabler for multi-agent AI
			workflows
		</li>
		<li>
			<strong>Pull Requests</strong> — platform feature for review; pick one merge method;
			<code>gh</code> CLI saves time
		</li>
		<li>
			<strong>Tags</strong> — immovable labels; annotated for releases; semver for meaning;
			cherry-pick for backports
		</li>
		<li>
			<strong>Hooks</strong> — scripts at Git events; husky/lefthook for repo-wide sharing; the
			guardrail that keeps AI commits honest
		</li>
	</ul>

	<h2>What you can do now</h2>

	<p>
		You can <em>ask clearly</em>. That's the whole point. When your AI says "I'll rebase onto
		main and push with <code>--force-with-lease</code>," you know what's about to happen. When
		something goes wrong, you know which tool to reach for. When you review a colleague's PR,
		you know what "squash merge" actually does to the history.
	</p>

	<p>
		You don't need to remember the flags. You need to remember the <em>concept</em>. The flag is
		one prompt away.
	</p>

	<h2>Where to next</h2>

	<Callout type="tip">
		<p>
			Looking to round out the rest of the developer stack?
		</p>
		<ul>
			<li>
				<strong>The Error Whisperer</strong> — reading error messages well enough to tell your
				AI what's actually broken. (The single highest-leverage skill for AI-assisted
				development.)
			</li>
			<li>
				<strong>How the Web Works</strong> — DNS, HTTP, client vs server, CORS, cookies. The
				foundation you need to evaluate anything your AI builds for the web.
			</li>
			<li>
				<strong>Understanding Code</strong> — reading code competently without having to write
				it from scratch. HTML, CSS, JS, TypeScript, packages, build systems.
			</li>
			<li>
				<strong>Shipping</strong> — from localhost to the internet. Platforms, DNS, CI/CD,
				monitoring, rollbacks.
			</li>
			<li>
				<strong>Working on a Team</strong> — Agile, code review, communication, asking good
				questions. The soft skills nobody teaches.
			</li>
		</ul>
	</Callout>

	<h2>The cheat sheet</h2>

	<p>
		When you need the syntax quickly and don't want to ask your AI, the
		<a href="{base}/git-reference" target="_blank">Git Reference</a>
		is a single-page cheat sheet of the commands you'll use most. Bookmark it.
	</p>

	<h2>Closing thought</h2>

	<p>
		Git has been around for 20 years. Its syntax is famously grumpy. But its <em>ideas</em> are
		simple, elegant, and worth knowing — repositories, commits, branches, history, rewriting,
		collaborating. You understand them now. That understanding outlasts any specific tool.
	</p>

	<p>
		Go ship something.
	</p>
</PathPageLayout>
