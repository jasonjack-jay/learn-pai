<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-staging"
	title="The Staging Area"
	subtitle="Git's waiting room — and why it's the thing that makes Git powerful"
	estimatedMinutes={10}
	pathId="git-in-detail"
>
	<DiagramImage
		src="git-in-detail/staging-three-zones.png"
		alt="Poster 'The Three Zones' showing Working Directory → Staging Area → Repository with an alien porter in the middle and arrows labelled git add and git commit"
		caption="Add moves files right. Commit saves the snapshot."
	/>

	<h2>What is this?</h2>

	<p>
		Git has three zones:
	</p>

	<ul>
		<li>the <strong>working directory</strong> (your files as they are right now)</li>
		<li>the <strong>staging area</strong> (files marked for the next commit)</li>
		<li>the <strong>repository</strong> (every commit ever made)</li>
	</ul>

	<p>
		The staging area is Git's <em>waiting room</em>. You put things in it, review them, then
		commit. Nothing between the staging area and the repository — committing is the one-way door.
	</p>

	<h2>Why does this matter?</h2>

	<p>
		The staging area is what makes Git powerful. It lets you commit <em>selectively</em>: you can
		have 10 changed files and commit just 2 of them. You can even commit just <em>part</em> of a
		file. This is how you make clean, atomic commits that tell a coherent story — "fix login
		bug" in one commit, not "fix login bug and accidentally also 40 unrelated lines."
	</p>

	<p>
		<strong>If you're thinking "I just want to save my work,"</strong> you need
		<code>git add .</code> and <code>git commit -m "message"</code>.
	</p>
	<p>
		<strong>If you're thinking "I changed 5 files but only 2 are ready,"</strong> you need
		<code>git add</code> for specific files.
	</p>
	<p>
		<strong>If you're thinking "I changed 3 things in one file but want them as separate
			commits,"</strong> you need <code>git add -p</code> (patch mode — the game-changer).
	</p>

	<h3><code>git status</code> — what's going on?</h3>

	<p>
		The single most-run Git command. Shows you: what's staged, what's modified-but-not-staged,
		what's untracked, which branch you're on, how far ahead or behind you are from the remote.
	</p>

	<p>
		95% of developers run this multiple times per hour. It's the Git equivalent of "where am I?"
		— a free look around before any action.
	</p>

	<AskYourAgent
		prompts={[
			"what's the current state of my repo?",
			"show me what I've changed",
			"what's ready to commit?"
		]}
	/>

	<h3><code>git add</code> — staging files</h3>

	<ul>
		<li><code>git add &lt;filename&gt;</code> — stage a specific file</li>
		<li><code>git add .</code> — stage everything changed in the current folder and its subfolders</li>
		<li>
			<code>git add -p</code> — <strong>patch mode</strong>: go through each change and pick which
			to stage. The power user's best friend
		</li>
	</ul>

	<p>
		<strong>Why <code>add .</code> can be dangerous:</strong> it stages everything, including
		things you didn't mean to (debug logs, an accidentally-uncommented <code>console.log</code>,
		a <code>.env</code> file you thought was ignored). Better habit: glance at
		<code>git status</code> first.
	</p>

	<DiagramImage
		src="git-in-detail/staging-selective-add.png"
		alt="Poster 'Selective Staging' showing three files on the working-directory platform — login.js and styles.css tagged READY, debug.log tagged NOT WANTED — with git add login.js styles.css moving only the first two to the staging area"
		caption="Pick what goes in the next commit — nothing else."
	/>

	<AskYourAgent
		prompts={[
			'stage all my changes',
			'stage just the changes to the login page',
			'stage my changes but exclude the debug logs',
			'help me split this one file into two separate commits'
		]}
	/>

	<h3><code>git diff</code> — what actually changed?</h3>

	<ul>
		<li><code>git diff</code> — changes in your working directory that are <strong>not yet staged</strong></li>
		<li><code>git diff --staged</code> — changes that <strong>are</strong> staged (the most-forgotten flag!)</li>
		<li><code>git diff HEAD</code> — all changes since the last commit (staged + unstaged together)</li>
	</ul>

	<p><strong>Useful flags:</strong></p>

	<ul>
		<li><code>--stat</code> — summary: which files changed, by how much</li>
		<li><code>--word-diff</code> — word-level changes (great for prose or config files)</li>
		<li><code>-w</code> — ignore whitespace (filters out reformatting noise)</li>
	</ul>

	<p>
		<strong>If you're thinking "my AI just made changes — let me see what it did before I
			commit,"</strong> you need <code>git diff</code>. Run it constantly. It's how you stay
		honest with what your AI is actually doing.
	</p>

	<AskYourAgent
		prompts={[
			'show me what changed',
			"show me what's about to be committed",
			'what changed between this branch and main?',
			'summarise my changes in a sentence'
		]}
	/>

	<h3><code>git commit</code> — saving a snapshot</h3>

	<ul>
		<li><code>git commit -m "message"</code> — commit with an inline message</li>
		<li>
			<code>git commit</code> — opens your editor for a longer message. Better for anything
			non-trivial
		</li>
		<li>
			<code>git commit --amend</code> — modifies the <em>last</em> commit. Add forgotten files, fix
			the message, re-stage something you missed
		</li>
	</ul>

	<p>
		<strong>Atomic commits</strong> — one logical change per commit. The classic test: the sentence
		<em>"If applied, this commit will..."</em> should make grammatical sense. "If applied, this
		commit will fix the login crash" — good. "If applied, this commit will fix stuff" — bad.
	</p>

	<p>
		<strong>If you're thinking "I forgot a file in my last commit,"</strong> you need
		<code>git commit --amend --no-edit</code>.
		<br />
		<strong>If you're thinking "my last commit message has a typo,"</strong> you need
		<code>git commit --amend</code> and edit the message.
	</p>

	<Callout type="warning">
		<p>
			<code>--amend</code> rewrites history. If the commit has already been pushed and someone
			else has pulled it, amending causes the same "golden rule" problem as rebasing. When in
			doubt, don't amend a pushed commit — just make a new one.
		</p>
	</Callout>

	<DiagramImage
		src="git-in-detail/staging-good-vs-bad-commit.png"
		alt="Poster 'A Good Commit Message' with two cards — BAD showing 'wip stuff' next to a disappointed alien, and GOOD showing 'Fix login crash when email contains + sign' next to a smiling alien"
		caption="The message is for humans, not Git."
	/>

	<AskYourAgent
		prompts={[
			'commit my work with a good message',
			"commit just the login changes with message 'Fix login crash'",
			'I forgot to add the CSS — amend the last commit',
			'my commit message has a typo — fix it'
		]}
	/>

	<h3>Common scenarios</h3>

	<h4>"I changed 5 files but only want to commit 2"</h4>
	<p>Stage the two specific files with <code>git add &lt;file1&gt; &lt;file2&gt;</code>, then commit. The rest stays in your working directory, untouched, waiting for its own commit.</p>

	<h4>"I changed one file in two unrelated ways"</h4>
	<p>Use <code>git add -p</code> (patch mode) to stage the hunks independently — Git walks you through each chunk and you press <kbd>y</kbd>/<kbd>n</kbd>. Commit the first set, then come back for the second.</p>

	<h4>"I want to undo my staging"</h4>
	<p><code>git restore --staged &lt;file&gt;</code> unstages a file without changing your working directory. Safe, reversible.</p>

	<h4>"I accidentally committed my <code>.env</code> file"</h4>
	<p>Depending on whether you've pushed it: for a local-only commit, <code>git reset HEAD~1</code>, remove the file, update <code>.gitignore</code>, re-commit. If pushed, it's more involved — rotate the secrets first, then clean history. Your AI can walk through it.</p>

	<h2>Summary</h2>

	<p>
		Three zones — working directory → staging area → repository. <code>add</code> moves things
		right. <code>commit</code> locks in the snapshot. <code>git status</code> and
		<code>git diff</code> are how you check what's happening. The staging area lets you commit
		selectively, which is how clean history is made. The single biggest upgrade you can give
		yourself today is <code>git add -p</code>.
	</p>
</PathPageLayout>
