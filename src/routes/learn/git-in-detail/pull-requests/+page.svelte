<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-pull-requests"
	title="Pull Requests"
	subtitle="What a PR actually is, the lifecycle, merge methods, and the gh CLI"
	estimatedMinutes={10}
	pathId="git-in-detail"
>
	<DiagramImage
		src="git-in-detail/pull-requests-assembly.png"
		alt="Poster 'Pull Request Lifecycle' showing a horizontal journey across stations — branch, commit, push, open PR, review, address feedback (loops back), approved, merge, cleanup branch — with an alien performing each role"
		caption="A PR is a conversation about your commits."
	/>

	<h2>What is this?</h2>

	<p>
		A <strong>Pull Request</strong> (GitHub, Bitbucket) or <strong>Merge Request</strong>
		(GitLab) is not a Git command. It's a feature of the hosting platform. At its core a PR is:
	</p>

	<ul>
		<li>a request to merge one branch into another</li>
		<li>a threaded conversation about the proposed change</li>
		<li>an automated gate (CI, reviews, status checks) that blocks the merge until conditions are met</li>
	</ul>

	<p>
		Under the hood, a PR is <em>just</em> "take these commits on this branch and merge them into
		that branch." The value is the process wrapped around that: review, discussion, automated
		checks, auditable history.
	</p>

	<h2>Why does this matter?</h2>

	<p>
		Every professional software team uses PRs. They're how changes get reviewed, how quality is
		enforced at the organisation level, how knowledge spreads. Being effective at PRs — writing
		them, reviewing them, responding to feedback — is arguably a bigger career skill than knowing
		Git itself.
	</p>

	<p>
		<strong>If you're thinking "how do I open a PR?"</strong> — you push a branch, then use the
		platform UI or the <code>gh</code> CLI.
		<br />
		<strong>If you're thinking "should I squash-merge or merge commit?"</strong> — read the
		merge-methods section below.
		<br />
		<strong>If you're thinking "this PR is huge and hard to review,"</strong> — split it.
	</p>

	<h3>The full lifecycle</h3>

	<ol>
		<li><strong>Create a branch</strong> from an up-to-date <code>main</code></li>
		<li><strong>Make commits</strong> — atomic, well-messaged, each doing one logical thing</li>
		<li><strong>Push the branch</strong> — <code>git push -u origin &lt;branch&gt;</code></li>
		<li>
			<strong>Open the PR</strong> — title, description, what/why/how-tested, linked issue,
			screenshots if UI
		</li>
		<li><strong>Request review</strong> — specific people or a team</li>
		<li><strong>Address feedback</strong> — push new commits; optionally squash/rebase later</li>
		<li><strong>CI / status checks</strong> — tests, linting, type-checks, deploy previews</li>
		<li><strong>Approval</strong> — the required number of approvals depending on the repo</li>
		<li><strong>Merge</strong> — pick the merge method (see below)</li>
		<li><strong>Cleanup</strong> — delete the remote branch (usually automatic) and the local one</li>
	</ol>

	<h3>Merge methods (the choice)</h3>

	<p>Most platforms offer three buttons:</p>

	<ul>
		<li>
			<strong>Create a merge commit</strong> — preserves every commit on the feature branch plus a
			merge commit on main. Full history; "branchy" look. Good for long-lived, carefully-crafted
			feature branches
		</li>
		<li>
			<strong>Squash and merge</strong> — takes all the commits on the feature branch and
			condenses them into one commit on main. Popular default. Clean history on main, but the
			individual commit history disappears
		</li>
		<li>
			<strong>Rebase and merge</strong> — replays each commit individually onto main with no
			merge commit. Linear history that keeps individual commits. Rare outside of teams that have
			committed to a strictly linear main
		</li>
	</ul>

	<Callout type="tip">
		<p>
			<strong>Team convention beats personal preference.</strong> Pick one merge method per
			project and stick to it. Mixing them in the same repo produces a history that's hard to
			read.
		</p>
	</Callout>

	<h3>Writing a good PR</h3>

	<p>A PR description that reviewers love:</p>

	<ul>
		<li><strong>What</strong> — one sentence: the change in plain English</li>
		<li><strong>Why</strong> — link to the ticket, the bug, the customer request</li>
		<li><strong>How</strong> — a short description of the approach. What you changed, what you didn't</li>
		<li><strong>How tested</strong> — the steps you took to verify this works</li>
		<li><strong>Screenshots / videos</strong> — if there's any UI</li>
		<li><strong>Risks / rollout</strong> — what could go wrong; migration or deploy notes</li>
	</ul>

	<p>
		Keep PRs small. A 200-line PR gets reviewed. A 2,000-line PR gets approved by someone who
		gave up halfway.
	</p>

	<AskYourAgent
		prompts={[
			'open a PR from my current branch targeting main',
			'write a good PR description for the changes on this branch',
			'this PR is too big — help me split it into logical pieces',
			'update the PR description to reflect the latest commits'
		]}
	/>

	<h3>Reviewing a PR</h3>

	<p>What to look for when reviewing:</p>

	<ul>
		<li><strong>Does it do what it says?</strong> Title, description, code should all align</li>
		<li><strong>Correctness</strong> — logic, edge cases, error handling</li>
		<li><strong>Side effects</strong> — does this change ripple into other files it shouldn't?</li>
		<li><strong>Tests</strong> — are there any, and do they exercise the right things?</li>
		<li><strong>Naming and structure</strong> — will future readers understand this?</li>
		<li><strong>Deleted or changed public APIs</strong> — who else does this affect?</li>
	</ul>

	<p>
		<strong>Reviewing locally:</strong> <code>gh pr checkout 123</code> fetches the PR as a
		branch you can check out and run. Huge for anything you can't evaluate just by reading the
		diff.
	</p>

	<AskYourAgent
		prompts={[
			'check out PR 123 locally so I can test it',
			"summarise what this PR does before I review",
			"walk me through the risky parts of this diff",
			"leave a review comment on line 42 explaining why this is wrong"
		]}
	/>

	<h3>The <code>gh</code> CLI</h3>

	<p>
		GitHub's command-line tool. Removes the "switch to browser, click, copy-paste" tax. A few
		high-value commands:
	</p>

	<ul>
		<li><code>gh pr create</code> — interactive PR creation from your current branch</li>
		<li><code>gh pr list</code> — list PRs in this repo</li>
		<li><code>gh pr view 123</code> — view PR 123 in the terminal</li>
		<li><code>gh pr checkout 123</code> — locally check out PR 123 as a branch</li>
		<li><code>gh pr review 123 --approve --body "LGTM"</code> — approve a PR</li>
		<li><code>gh pr merge 123 --squash --delete-branch</code> — squash-merge and clean up</li>
		<li><code>gh pr status</code> — what PRs need your attention</li>
	</ul>

	<Callout type="tip">
		<p>
			Set up <code>gh auth login</code> once. After that, the CLI is faster than the GitHub UI for
			almost everything PR-related.
		</p>
	</Callout>

	<h3>Common scenarios</h3>

	<h4>"Address review feedback"</h4>
	<p>
		New commits on the feature branch, push. The PR updates automatically. Optional: after all
		feedback, interactive-rebase to squash the review commits into the originals for a cleaner
		final history (if your team does that).
	</p>

	<h4>"Merge conflicts with main"</h4>
	<p>
		Fetch main, rebase your branch onto it (or merge main into your branch — depends on team
		style), resolve, push (with <code>--force-with-lease</code> if you rebased), PR updates.
	</p>

	<h4>"I opened the PR too early"</h4>
	<p>
		Mark it <strong>Draft</strong>. Anyone who sees it knows it's not ready for review yet. Mark
		ready when it is.
	</p>

	<h2>Summary</h2>

	<p>
		A PR is the platform-level wrapper around "merge this branch into that branch." The lifecycle
		is branch → commit → push → open → review → address → merge → cleanup. Pick one merge method
		per project. A good PR has a crisp what/why/how-tested description and stays small. The
		<code>gh</code> CLI makes the whole thing much faster.
	</p>
</PathPageLayout>
