<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-remotes"
	title="Working with Remotes"
	subtitle="Fetch vs pull, forks, push flags, and the art of not overwriting your teammate"
	estimatedMinutes={10}
	pathId="git-in-detail"
>
	<ImagePlaceholder
		description="A 3-node tube-map diagram: your laptop in the middle, 'origin' (your fork on GitHub) on the left, 'upstream' (the original project on GitHub) on the right. Arrows labelled 'fetch', 'push', and 'pull' with tiny cargo containers moving along them. An alien conductor at each station."
		size="large"
	/>

	<h2>What is this?</h2>

	<p>
		A <strong>remote</strong> is a named pointer to a Git repository somewhere else — usually on
		GitHub. The default one is called <code>origin</code> and is set up automatically when you
		clone. You can have more than one remote; each has a name you choose and a URL.
	</p>

	<p>
		This page is about the full set of things that travel between your laptop and a remote —
		commits, branches, tags, deletions — and the two commands (<code>fetch</code> and
		<code>pull</code>) that are not the same thing.
	</p>

	<h2>Why does this matter?</h2>

	<p>
		Almost every collaborative workflow involves remotes. Contributing to open source means
		knowing about <em>forks</em> and <em>upstream</em>. Keeping a repo clean means
		<code>--prune</code>-ing dead branches. Updating a remote URL when your team switches auth is
		a thirty-second job if you know the command, a thirty-minute job if you don't.
	</p>

	<p>
		<strong>If you're thinking "I want to contribute to someone else's project,"</strong> you want
		the fork workflow.
		<br />
		<strong>If you're thinking "what's on the remote that I don't have yet?"</strong> you want
		<code>git fetch</code>, not <code>git pull</code>.
		<br />
		<strong>If you're thinking "my remote URL changed,"</strong> you want
		<code>git remote set-url</code>.
	</p>

	<h3><code>git remote</code> — managing remotes</h3>

	<ul>
		<li><code>git remote -v</code> — list all remotes with their fetch and push URLs</li>
		<li><code>git remote add &lt;name&gt; &lt;url&gt;</code> — add a new remote (e.g. <code>upstream</code>)</li>
		<li><code>git remote remove &lt;name&gt;</code> — remove a remote</li>
		<li><code>git remote set-url &lt;name&gt; &lt;new-url&gt;</code> — change the URL (HTTPS → SSH, org move, etc.)</li>
		<li><code>git remote rename &lt;old&gt; &lt;new&gt;</code> — rename a remote</li>
	</ul>

	<AskYourAgent
		prompts={[
			'show me what remotes this repo has',
			'switch this repo from HTTPS to SSH',
			'add upstream pointing at the original project',
			'our github org was renamed — fix my remote URL'
		]}
	/>

	<h3><code>git fetch</code> vs <code>git pull</code> — the distinction that matters</h3>

	<p>
		<code>git fetch</code> downloads commits from the remote but <em>doesn't touch your working
			directory or your branches</em>. It just updates your remote-tracking branches
		(<code>origin/main</code>, <code>origin/feature-x</code>, etc.) so you can see what's on the
		remote.
	</p>

	<p>
		<code>git pull</code> is <code>fetch</code> followed by <code>merge</code> (or, with
		<code>--rebase</code>, followed by <code>rebase</code>). It updates your working branch.
	</p>

	<Callout type="tip">
		<p>
			<strong>Prefer <code>fetch</code> when you just want to see what's new.</strong> Run
			<code>git log ..origin/main</code> to see what's on the remote that you don't have.
			<code>pull</code> commits you to integrating changes; <code>fetch</code> just gets you the
			information.
		</p>
	</Callout>

	<h3><code>--prune</code> — delete tracking for branches that no longer exist on the remote</h3>

	<p>
		Every time you delete a branch on GitHub, your local <code>origin/that-branch</code> tracking
		ref sticks around forever. <code>git fetch --prune</code> removes tracking refs for branches
		that no longer exist on the remote. Keeps your <code>git branch -a</code> list honest.
	</p>

	<p>
		In Setup we mentioned <code>fetch.prune = true</code>. If you turned that on, every fetch
		prunes automatically.
	</p>

	<h3>Push options</h3>

	<ul>
		<li>
			<code>git push -u origin &lt;branch&gt;</code> — push and set the upstream for this branch.
			After this, plain <code>git push</code> works
		</li>
		<li>
			<code>git push</code> — with <code>push.autoSetupRemote = true</code>, first push of a new
			branch just works
		</li>
		<li><code>git push origin --delete &lt;branch&gt;</code> — delete a branch on the remote</li>
		<li><code>git push --force-with-lease</code> — safe force push (see the Rebasing page)</li>
		<li><code>git push --tags</code> — include tags (tags are not pushed by default)</li>
	</ul>

	<AskYourAgent
		prompts={[
			'push this branch and set up tracking',
			'delete the old-feature branch on the remote',
			'push all my tags to origin',
			'see what would be pushed without actually pushing'
		]}
	/>

	<h3>The fork workflow (contributing to someone else's project)</h3>

	<p>
		The convention in open source is to have <em>two</em> remotes per contributor:
	</p>

	<ul>
		<li><code>origin</code> — <strong>your</strong> fork of the project</li>
		<li><code>upstream</code> — the <strong>original</strong> project</li>
	</ul>

	<p>The rhythm:</p>

	<ol>
		<li>Fork the project on GitHub (creates your copy)</li>
		<li>Clone <em>your fork</em> locally (<code>origin</code> is set automatically)</li>
		<li>Add the original as a second remote: <code>git remote add upstream &lt;url&gt;</code></li>
		<li>Create a feature branch locally</li>
		<li>Commit, push to <code>origin</code> (your fork)</li>
		<li>Open a PR on the original project, pointing from <code>yourname:feature-branch</code> to the project's <code>main</code></li>
		<li>To keep your fork fresh: <code>git fetch upstream</code> then rebase your feature branch onto <code>upstream/main</code></li>
	</ol>

	<AskYourAgent
		prompts={[
			"I've forked this repo — set me up so I can contribute back",
			"pull the latest changes from upstream into my fork's main",
			"my fork is behind upstream — get me up to date"
		]}
	/>

	<h3>HTTPS vs SSH</h3>

	<p>
		Every remote URL is one of two forms. They do the same thing; the difference is how you
		authenticate.
	</p>

	<ul>
		<li>
			<strong>HTTPS</strong> — <code>https://github.com/user/repo.git</code>. Needs a personal
			access token or credential helper. Easier for hopping between machines, worse for everyday
			pushing
		</li>
		<li>
			<strong>SSH</strong> — <code>git@github.com:user/repo.git</code>. Needs SSH keys set up (see
			Setup page). Silent, fast, no passwords
		</li>
	</ul>

	<p>Most developers use SSH for their main machine and HTTPS on shared/ephemeral environments.</p>

	<h3>Common scenarios</h3>

	<h4>"Shallow clone for CI speed"</h4>
	<p>
		<code>git clone --depth 1 &lt;url&gt;</code> gets just the latest commit on the default branch
		— dramatically faster and smaller for CI or one-off inspection. The repo is "shallow" and can
		be deepened later with <code>git fetch --unshallow</code>.
	</p>

	<h4>"Single-branch clone"</h4>
	<p>
		<code>git clone --single-branch --branch &lt;name&gt; &lt;url&gt;</code> only downloads one
		branch. Useful when the repo has hundreds of release branches you don't care about.
	</p>

	<h4>"I pushed to the wrong remote"</h4>
	<p>
		Most remotes let you delete the branch you just pushed
		(<code>git push &lt;remote&gt; --delete &lt;branch&gt;</code>) and push it to the right one.
		If secrets were involved, rotate them first — the assumption must be that anything pushed is
		public forever.
	</p>

	<h2>Summary</h2>

	<p>
		Remotes are named URLs to repos elsewhere. <code>origin</code> is yours by default.
		<code>fetch</code> looks at what's out there; <code>pull</code> integrates it. <code>--prune</code>
		cleans up stale tracking refs. The fork workflow has you juggling <code>origin</code> (your
		fork) and <code>upstream</code> (the original). SSH or HTTPS are interchangeable from Git's
		point of view — just different auth mechanisms.
	</p>
</PathPageLayout>
