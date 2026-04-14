<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-branches"
	title="Branches in Depth"
	subtitle="Cheap pointers, modern commands, and how not to lose your work"
	estimatedMinutes={8}
	pathId="git-in-detail"
>
	<ImagePlaceholder
		description="A branch visualisation in tube-map style — a main line running straight across, several feature branches forking off and rejoining. A 'HEAD' arrow sticker labelling where you currently are. Each merge point shown as a station."
		size="medium"
	/>

	<h2>What is this?</h2>

	<p>
		A branch in Git is just a <strong>pointer to a commit</strong>. That's it. Forty bytes. When
		you "create a branch," you're creating a new pointer. When you "switch branches," you move
		your working directory to wherever that pointer points.
	</p>

	<p>
		This matters because it means creating and deleting branches is <strong>practically free</strong>.
		No copy of the repo is made. No disk space to speak of. Use branches liberally.
	</p>

	<h2>Why does this matter?</h2>

	<p>
		Branches are how you do anything non-trivial. Every feature, every bug fix, every experiment
		lives on a branch. Understanding branches deeply removes a huge category of confusion — the
		"wait, where did my changes go?" kind.
	</p>

	<p>
		<strong>If you're thinking "should I just work on main?"</strong> No. Branch everything. It's
		almost free.
		<br />
		<strong>If you're thinking "how many branches is too many?"</strong> Locally, any number.
		Remotely, clean up merged ones regularly — your colleagues and CI will thank you.
	</p>

	<h3><code>HEAD</code> — the "you are here" pointer</h3>

	<p>
		<code>HEAD</code> is a special pointer that points to whatever branch (or commit) you
		currently have checked out. When a tutorial says <code>HEAD~1</code> it means "one commit
		before where you are now." <code>HEAD~3</code> is three commits back.
	</p>

	<p>
		Whenever Git is about to do something destructive, remember: <code>HEAD</code> is where Git
		thinks you are. Moving <code>HEAD</code> is how you time-travel through history.
	</p>

	<h3>Detached HEAD — scary name, safe-ish state</h3>

	<p>
		If you check out a specific commit (not a branch), you're in <em>detached HEAD</em> state. It
		means you're looking at history, not at any branch. Commits you make here aren't on any
		branch — they'll be garbage-collected eventually if you switch away without saving them.
	</p>

	<p>
		<strong>How to escape safely:</strong> create a branch from where you are.
		<code>git switch -c rescue-branch</code> turns "I'm staring at a commit from last Tuesday"
		into "I'm on a real branch and my commits are safe."
	</p>

	<AskYourAgent
		prompts={[
			"I'm in detached HEAD — save my work",
			'what branch am I on?',
			'help me figure out where I am in the commit history'
		]}
	/>

	<h3><code>git switch</code> — the modern way (Git 2.23+)</h3>

	<ul>
		<li><code>git switch &lt;branch&gt;</code> — switch to an existing branch</li>
		<li><code>git switch -c &lt;branch&gt;</code> — create a new branch and switch to it</li>
		<li><code>git switch -</code> — switch to the branch you were on before (like <code>cd -</code>)</li>
	</ul>

	<p>
		<strong>Why <code>switch</code> is better than <code>checkout</code>:</strong> it refuses to
		put you in detached HEAD by accident. It's a scalpel instead of a Swiss Army knife.
	</p>

	<AskYourAgent
		prompts={[
			'switch to the main branch',
			'create a new branch for the search feature and switch to it',
			'switch back to the branch I was just on'
		]}
	/>

	<h3><code>git checkout</code> — the old way (still works)</h3>

	<p>
		<code>git checkout</code> does several things: switch branches, restore files, enter detached
		HEAD on a commit. Because it's overloaded, it's error-prone. <code>git switch</code> (for
		branches) and <code>git restore</code> (for files) replace it cleanly.
	</p>

	<p>
		You'll still see <code>git checkout</code> in older tutorials, in Git Basics, and in scripts.
		Both work. Prefer <code>switch</code> going forward.
	</p>

	<h3><code>git branch</code> — managing the pointers</h3>

	<ul>
		<li><code>git branch</code> — list local branches (current one has a <code>*</code>)</li>
		<li><code>git branch -a</code> — list <strong>all</strong> branches including remote</li>
		<li><code>git branch -vv</code> — list with <em>tracking info</em> (what remote each branch tracks)</li>
		<li><code>git branch -d &lt;name&gt;</code> — delete a merged branch (safe)</li>
		<li><code>git branch -D &lt;name&gt;</code> — <strong>force-delete</strong> a branch (dangerous)</li>
		<li><code>git branch -m &lt;new-name&gt;</code> — rename the current branch</li>
	</ul>

	<p>
		<strong>If you're thinking "I have 40 local branches from old features,"</strong> you need
		<code>git branch --merged</code> to find safe-to-delete branches, then batch-delete them. Your
		AI can do the whole sweep in one go.
	</p>

	<ImagePlaceholder
		description="A 'branch graveyard' cleanup scene in tube-map style — many old branches being swept away by a cleaner alien with a dust-broom, a few current ones remaining with little flags that say 'in use'."
		size="medium"
	/>

	<AskYourAgent
		prompts={[
			'list all my branches with their tracking info',
			'delete the feature branches I already merged',
			'rename this branch to something more descriptive',
			'clean up my local branches — keep main and the one I\'m on'
		]}
	/>

	<h3>Remote tracking branches</h3>

	<p>
		When you clone a repo, Git creates <strong>remote tracking branches</strong> — names like
		<code>origin/main</code>. These are Git's memory of where the remote was <em>last time you
			fetched</em>. They're different from your local branches.
	</p>

	<ul>
		<li>Your local <code>main</code> = where you're working right now</li>
		<li><code>origin/main</code> = where the remote was last time you checked</li>
	</ul>

	<p>
		When these diverge, that's when you need to pull, fetch, or resolve. More on that in
		<em>Working with Remotes</em>.
	</p>

	<Callout type="tip">
		<p>
			A common source of confusion: you pushed a commit, then ran <code>git log origin/main</code>
			and didn't see it. The answer is usually "you haven't fetched since" — your local
			<code>origin/main</code> is stale. <code>git fetch</code> refreshes it.
		</p>
	</Callout>

	<h3>Branch naming conventions</h3>

	<p>Teams usually adopt a convention. Common patterns:</p>

	<ul>
		<li><code>feature/PROJ-123-add-search</code> — new features, often with a ticket reference</li>
		<li><code>fix/login-crash</code> — bug fixes</li>
		<li><code>chore/update-deps</code> — maintenance / housekeeping</li>
		<li><code>release/v2.1.0</code> — release branches</li>
		<li><code>hotfix/critical-security-patch</code> — urgent production fixes</li>
	</ul>

	<p>
		Kebab-case (dash-separated), lowercase, descriptive but not absurdly long. When in doubt,
		match what's already in the repo.
	</p>

	<AskYourAgent
		prompts={[
			'create a branch for fixing the login crash, following our team\'s naming convention',
			"what's a good branch name for adding search functionality?"
		]}
	/>

	<h2>Summary</h2>

	<p>
		Branches are cheap 40-byte pointers. <code>git switch</code> is the modern, safe way to move
		between them. <code>git branch</code> manages the list. Remote tracking branches
		(<code>origin/main</code>) are <em>different</em> from your local branches — keep them
		straight. Clean up merged branches regularly. And if you ever wake up in detached HEAD, don't
		panic: <code>git switch -c rescue</code>.
	</p>
</PathPageLayout>
