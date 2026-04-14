<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-worktrees"
	title="Worktrees"
	subtitle="Parallel working directories — and why AI agents love them"
	estimatedMinutes={8}
	pathId="git-in-detail"
>
	<DiagramImage
		src="git-in-detail/worktrees-radiating.png"
		alt="Poster 'Worktrees' with a central '.git database (shared)' sphere radiating to four labelled folders — main/, feature/search/, hotfix/login/, review/pr-42/ — each with an alien doing a different task"
		caption="Multiple folders. One .git. Parallel work."
	/>

	<h2>What is this?</h2>

	<p>
		A <strong>worktree</strong> is an additional working directory attached to the same Git
		repository. You get a second folder on disk where you can have a different branch checked out
		— while your original folder keeps its branch untouched. Both share one
		<code>.git</code> database, so commits flow between them instantly.
	</p>

	<p>
		The feature has been in Git since 2015 but was barely used. It's suddenly popular because AI
		coding agents (Claude Code, Cursor's parallel agents, Aider) use it to run in parallel
		without stepping on each other.
	</p>

	<h2>Why does this matter?</h2>

	<p>
		The old way of handling "urgent fix while I'm mid-feature": stash, switch branches, fix,
		commit, push, switch back, pop stash. Lots of ceremony, lots of opportunities to lose work.
	</p>

	<p>
		With worktrees: open another folder on the side with <code>main</code> checked out. Fix the
		bug there. Your feature branch in your main folder is entirely undisturbed. No stashing. No
		context-switching hell. When you're done, remove the worktree.
	</p>

	<p>
		For AI agents, worktrees mean two (or five) agents can be working on different branches
		<em>simultaneously</em> without fighting over the working directory. It's the Git feature that
		makes parallel AI development actually work.
	</p>

	<p>
		<strong>If you're thinking "I'm mid-feature and a P0 bug just came in,"</strong> you need
		<code>git worktree add</code>.
		<br />
		<strong>If you're thinking "I want to run Claude Code on two features at once,"</strong> same
		answer.
		<br />
		<strong>If you're thinking "I want to check out a PR locally without losing my current
			branch,"</strong> same answer.
	</p>

	<h3>The core commands</h3>

	<ul>
		<li>
			<code>git worktree add ../hotfix main</code> — creates a sibling folder
			<code>../hotfix</code> with <code>main</code> checked out
		</li>
		<li>
			<code>git worktree add -b fix/bug ../hotfix</code> — creates a new branch <code>fix/bug</code>
			in a new folder
		</li>
		<li><code>git worktree list</code> — show all worktrees and which branch each is on</li>
		<li><code>git worktree remove ../hotfix</code> — remove the worktree (doesn't delete the branch)</li>
		<li>
			<code>git worktree lock ../hotfix</code> — mark a worktree as "don't auto-prune me" (useful
			for network-mounted or removable drives)
		</li>
		<li>
			<code>git worktree prune</code> — clean up stale worktree references after you deleted a
			worktree folder manually
		</li>
	</ul>

	<Callout type="tip">
		<p>
			<strong>You cannot check out the same branch in two worktrees.</strong> Git refuses —
			which protects you from the obvious "both diverge from the same branch" disaster. If you
			need parallel work on the <em>same</em> feature, use two different branches.
		</p>
	</Callout>

	<AskYourAgent
		prompts={[
			'create a worktree in ../hotfix with the main branch checked out',
			'set up a worktree for a new branch fix/login-crash',
			'list all my worktrees',
			'clean up worktrees for branches that have been merged'
		]}
	/>

	<h3>Common scenarios</h3>

	<h4>"Run Claude Code on two features simultaneously"</h4>
	<p>
		Your main project folder has <code>feature/search</code> checked out, and Claude is working
		there. You spin up a sibling worktree at <code>../project-profiles</code> with
		<code>feature/profiles</code>. Open a second terminal, run Claude Code there. Two agents, no
		conflict, shared history.
	</p>

	<h4>"Urgent bug fix without disturbing my in-progress feature"</h4>
	<p>
		<code>git worktree add -b fix/bug ../hotfix main</code>. Fix the bug in that folder. Commit,
		push, open a PR. Go back to your feature folder and keep going. Remove the worktree when the
		fix is merged.
	</p>

	<h4>"Test a PR locally without switching branches"</h4>
	<p>
		<code>git fetch origin pull/123/head:pr-123</code>, then <code>git worktree add ../pr-123
			pr-123</code>. You can now run the PR's code, run your tests, poke at it — in a separate
		folder that doesn't disturb your work.
	</p>

	<h4>"Main worktree stays clean while AI agents work in branches"</h4>
	<p>
		A growing pattern: keep <code>main</code> checked out in your primary folder (for reviewing
		and cutting releases), and spawn worktrees for each agent-driven feature branch. The
		<code>main</code> folder is always safe, always current; the worktrees are disposable.
	</p>

	<h3>Gotchas</h3>

	<ul>
		<li>
			<strong>Submodules:</strong> worktrees play awkwardly with submodules. Expect some manual
			initialisation in each worktree
		</li>
		<li>
			<strong>node_modules:</strong> each worktree is a full working directory, so you'll need
			<code>npm install</code> (or equivalent) in each — they don't share installed dependencies
		</li>
		<li>
			<strong>IDE state:</strong> VS Code / JetBrains windows each want their own workspace per
			worktree. Worth setting up once, but a one-time fiddle
		</li>
	</ul>

	<AskYourAgent
		prompts={[
			"set up a worktree so Claude can work on the profiles feature while I stay on search",
			"remove the hotfix worktree and delete the branch",
			"worktree for the PR I'm reviewing — so I can test it without losing my work"
		]}
	/>

	<h2>Summary</h2>

	<p>
		Worktrees are multiple working directories sharing one <code>.git</code>. They replace the
		stash-and-switch dance for parallel work, and they're the enabling feature for AI agents
		working in parallel. Add, list, remove, lock, prune — five commands, massive productivity
		impact. If you only remember one: <code>git worktree add ../hotfix main</code>.
	</p>
</PathPageLayout>
