<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-setup"
	title="Setting Up Git"
	subtitle="The first-time setup that nobody explains properly"
	estimatedMinutes={8}
	pathId="git-in-detail"
>
	<DiagramImage
		src="git-in-detail/setup-ticket-booth.png"
		alt="A green alien in a ticket booth stamps four tickets — Name & Email, Default Branch: main, .gitignore, SSH Key — with a checklist of outcomes"
		caption="Do this once. It pays you back forever."
	/>

	<h2>What is this?</h2>

	<p>
		Git needs a few things set up before it really works well. Your identity (for commits), your
		editor (for writing messages), some useful defaults. Without these, every commit you make is
		anonymous, and Git keeps asking you the same questions forever.
	</p>

	<p>
		Most of this is a one-time job per computer. Do it once, mostly forget it, feel quietly
		superior every time you see a colleague's commit signed as
		<code>Unknown &lt;root@laptop&gt;</code>.
	</p>

	<h2>Why does this matter?</h2>

	<p>
		If you've ever typed <code>-u origin main</code> for the fiftieth time and thought "there must
		be a better way," there is. If you've ever wondered why your commits show up as
		<em>"unknown author,"</em> that's this. If you've ever been baffled by
		<code>.gitignore</code>, that's this too.
	</p>

	<h3><code>git init</code> — creating a repo from scratch</h3>

	<p>
		Turns any folder into a Git repository. It creates the hidden <code>.git</code> folder where
		everything is stored. From that moment on, that folder has a full, reversible history.
	</p>

	<p>
		<strong>When you'd do it:</strong> Starting a new project that isn't already on GitHub — maybe
		an experiment, a local scratchpad, a notes folder you've decided to version.
		<br />
		<strong>When you wouldn't:</strong> You're cloning something existing. <code>git clone</code> does
		<code>init</code> for you automatically and brings down history at the same time.
	</p>

	<AskYourAgent
		prompts={[
			'make this folder a git repository',
			'set up git here and create the first commit',
			'init a new repo and add a sensible .gitignore'
		]}
	/>

	<h3><code>git config</code> — your identity and preferences</h3>

	<p>
		Three levels: <strong>system</strong> (for this whole machine),
		<strong>global</strong> (for your user across all repos),
		<strong>local</strong> (for this one repo). You almost always want global.
	</p>

	<h4>The bare-minimum first-time setup</h4>

	<ul>
		<li>Your name and email — goes on every commit, visible forever</li>
		<li>Your default branch name — pick <code>main</code>, not <code>master</code></li>
		<li>Your preferred editor — for when commit messages need more than one line</li>
	</ul>

	<h4>The "why didn't anyone tell me?" power settings</h4>

	<p>These are the settings your senior colleague has had on for years and never mentioned.</p>

	<ul>
		<li><code>push.autoSetupRemote = true</code> — never type <code>-u</code> again</li>
		<li><code>fetch.prune = true</code> — auto-delete branches that no longer exist on the remote</li>
		<li>
			<code>rerere.enabled = true</code> — Git remembers how you resolved a conflict and does it for
			you the next time the same conflict appears
		</li>
		<li><code>diff.algorithm = histogram</code> — noticeably smarter, more readable diffs</li>
		<li>
			<code>commit.verbose = true</code> — shows you the full diff while you're writing the commit
			message, so you catch mistakes before committing them
		</li>
		<li><code>rebase.autoSquash = true</code> — auto-organises fixup commits during interactive rebase</li>
		<li>
			<code>merge.conflictstyle = zdiff3</code> — conflict markers include the
			<em>original</em> content, not just the two conflicting sides. Huge quality-of-life upgrade
		</li>
	</ul>

	<DiagramImage
		src="git-in-detail/setup-power-settings.png"
		alt="A 'Git Power Settings' control-panel poster with seven ON toggles listed: push.autoSetupRemote, fetch.prune, rerere.enabled, diff.algorithm = histogram, commit.verbose, rebase.autoSquash, merge.conflictstyle = zdiff3"
		caption="Seven toggles. Huge quality-of-life."
	/>

	<AskYourAgent
		prompts={[
			'set up git with my name, email, and all the recommended settings',
			'configure git to stop asking me for -u every time',
			'turn on all the git quality-of-life settings that most developers don\'t know about'
		]}
	/>

	<h3><code>.gitignore</code> — files Git should pretend don't exist</h3>

	<p>
		Some files shouldn't be committed. Build output. Secrets. Your editor's weird temp files.
		Your OS's hidden metadata. <code>.gitignore</code> is a plain-text list of patterns Git ignores
		— it lives in your repo and is committed just like any other file.
	</p>

	<p><strong>Common patterns:</strong></p>

	<ul>
		<li><code>node_modules/</code> — dependencies (massive, re-creatable from <code>package.json</code>)</li>
		<li><code>.env</code> and <code>.env.local</code> — secrets. <strong>Never</strong> commit these</li>
		<li><code>.DS_Store</code> — macOS metadata files</li>
		<li><code>dist/</code>, <code>build/</code> — compiled output</li>
		<li><code>*.log</code> — log files</li>
	</ul>

	<p>
		<strong>If you're thinking "I want my <code>.gitignore</code> to ignore everything in a folder
			<em>except</em> one file,"</strong> you need pattern negation with <code>!</code>. It's a
		real thing. Your AI can set it up.
	</p>

	<p>
		<strong>If you're thinking "I want this pattern everywhere, in all my repos,"</strong> you need
		a <em>global</em> <code>.gitignore</code> — configured via <code>core.excludesfile</code>. Put
		<code>.DS_Store</code> there and forget about it forever.
	</p>

	<AskYourAgent
		prompts={[
			'create a .gitignore for a SvelteKit project',
			'add node_modules and .env files to my gitignore',
			'set up a global .gitignore for my macOS-specific files',
			'my .env was accidentally committed — get it out and add it to .gitignore'
		]}
	/>

	<h3>SSH keys — authenticating with GitHub</h3>

	<p>
		When you push to GitHub, GitHub needs to know it's really you. SSH keys are the modern way of
		proving that — better than passwords, better than repeatedly typing personal access tokens.
	</p>

	<p>
		<strong>The concept:</strong> you have two keys — a <em>public</em> one (share with GitHub) and
		a <em>private</em> one (never share, never even show a screenshot of). When you push, your
		computer proves it owns the private key without ever revealing it. GitHub checks that proof
		against the public key you uploaded.
	</p>

	<p>
		<strong>When you set them up:</strong> once per computer.
		<strong>When they break:</strong> after a laptop rebuild, or when you get a new machine.
	</p>

	<AskYourAgent
		prompts={[
			'set up SSH keys for GitHub',
			'I just got a new laptop — get my GitHub SSH working',
			'switch this repo from HTTPS to SSH'
		]}
	/>

	<h3>The <code>.git</code> folder — the magic box</h3>

	<p>
		Every Git repo has a hidden <code>.git</code> folder at its root. That's where
		<em>everything</em> lives — every commit, every branch, every tag, every old version of every
		file. If you delete it, you've un-Gitted the folder (the files stay; the history is gone).
	</p>

	<p><strong>What's inside (at a glance):</strong></p>

	<ul>
		<li><code>HEAD</code> — a pointer saying "you are currently on this branch"</li>
		<li><code>refs/</code> — all your branches and tags</li>
		<li><code>objects/</code> — every file version Git has ever stored, compressed</li>
		<li><code>config</code> — this repo's specific config (local overrides)</li>
	</ul>

	<p>
		<strong>You never touch any of this directly.</strong> Your AI doesn't either. But knowing
		it's there demystifies Git. Every Git command you've ever run is, ultimately, the tool doing
		something to that folder.
	</p>

	<Callout type="tip">
		<p>
			If you're ever tempted to <em>delete the .git folder</em> because "something's broken" —
			don't. Ask your AI to diagnose first. A corrupted repo can usually be fixed without losing
			history. A deleted <code>.git</code> cannot.
		</p>
	</Callout>

	<h2>Summary</h2>

	<p>
		Set up your name, email, and default branch. Turn on the power settings. Write a good
		<code>.gitignore</code>. Set up SSH once per machine. The <code>.git</code> folder is magic,
		you never touch it, but you should know it exists.
	</p>
</PathPageLayout>
