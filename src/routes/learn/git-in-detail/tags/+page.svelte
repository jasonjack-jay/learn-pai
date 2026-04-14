<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-tags"
	title="Tags, Releases & Cherry-Pick"
	subtitle="Semver, annotated vs lightweight tags, and backporting fixes"
	estimatedMinutes={6}
	pathId="git-in-detail"
>
	<ImagePlaceholder
		description="A tube-map main line with coloured flags sticking up at specific stations labelled 'v1.0.0', 'v1.1.0', 'v1.1.1', 'v2.0.0'. Off to the side, a small side-scene: an alien lifting a cherry (commit) from one branch and placing it on another — the cherry-pick metaphor made literal."
		size="medium"
	/>

	<h2>What is this?</h2>

	<p>
		A <strong>tag</strong> is a label pinned to a specific commit. Unlike branches, tags don't
		move — they mark a point in history. The typical use is <strong>releases</strong>: "this is
		the commit we shipped as v1.2.0."
	</p>

	<p>
		<strong>cherry-pick</strong> is a different idea that belongs here because it's how releases
		get patched: "take this one commit from main and also apply it to the v1.x release branch."
	</p>

	<h2>Why does this matter?</h2>

	<p>
		If you ship software that people install or deploy, you need tags. They're how you say "this
		is the released version" in a way that's reproducible — anyone can check out
		<code>v1.2.0</code> and get exactly the same code. They also drive most automated release
		pipelines.
	</p>

	<p>
		<strong>If you're thinking "release v1.2.3 from main,"</strong> you need an annotated tag and
		a push.
		<br />
		<strong>If you're thinking "backport this bugfix to the v2.x branch,"</strong> you need
		cherry-pick.
		<br />
		<strong>If you're thinking "what does v1.2.3 even mean?"</strong> you need semver.
	</p>

	<h3>Annotated vs lightweight tags</h3>

	<h4>Lightweight</h4>
	<p>
		<code>git tag v1.2.0</code> — just a named pointer. No author, no date, no message. Like a
		sticky note pointing at a commit.
	</p>

	<h4>Annotated</h4>
	<p>
		<code>git tag -a v1.2.0 -m "Release 1.2.0"</code> — a full object with author, date, and
		message. These are what <code>git describe</code> looks for; these are what most release
		tooling expects.
	</p>

	<Callout type="tip">
		<p>
			<strong>Always use annotated tags for releases.</strong> They're the standard; they have
			useful metadata; they don't disappear when you're not looking. Lightweight tags are fine
			for private "I want to remember this commit" bookmarks.
		</p>
	</Callout>

	<h3>Semantic versioning (semver) in 90 seconds</h3>

	<p>A version number like <code>MAJOR.MINOR.PATCH</code> (e.g. <code>1.4.2</code>) means:</p>

	<ul>
		<li><strong>MAJOR</strong> — incompatible API changes. Upgrading might break things</li>
		<li><strong>MINOR</strong> — backwards-compatible new features. Safe to upgrade</li>
		<li><strong>PATCH</strong> — backwards-compatible bug fixes only. Very safe to upgrade</li>
	</ul>

	<p>
		Suffixes add lifecycle: <code>1.0.0-alpha.1</code>, <code>1.0.0-beta.3</code>,
		<code>1.0.0-rc.2</code>. Tools like npm understand these and pick the right versions.
	</p>

	<h3>Tag commands</h3>

	<ul>
		<li><code>git tag</code> — list all tags</li>
		<li><code>git tag -l "v1.*"</code> — list tags matching a pattern</li>
		<li><code>git tag -a v1.2.0 -m "message"</code> — create an annotated tag at HEAD</li>
		<li><code>git tag -a v1.2.0 &lt;sha&gt; -m "message"</code> — tag a specific commit</li>
		<li><code>git show v1.2.0</code> — inspect a tag</li>
		<li><code>git push origin v1.2.0</code> — push a specific tag (tags aren't pushed by default)</li>
		<li><code>git push --tags</code> — push all tags</li>
		<li><code>git tag -d v1.2.0</code> — delete a tag locally</li>
		<li><code>git push origin --delete v1.2.0</code> — delete a tag on the remote (be careful)</li>
	</ul>

	<AskYourAgent
		prompts={[
			'tag the current commit as v1.2.0 with a release message',
			'show me all the v1.x release tags',
			'push the new tag up to GitHub',
			"delete the v0.9.0-rc tag — we shouldn't have shipped that"
		]}
	/>

	<h3><code>git cherry-pick</code> — backporting fixes</h3>

	<p>
		<code>git cherry-pick &lt;sha&gt;</code> takes the changes from one specific commit and
		applies them as a <em>new</em> commit on your current branch. Same changes, new commit SHA,
		different parent. The classic use case:
	</p>

	<ol>
		<li>A bug fix goes into <code>main</code></li>
		<li>You also need it in the <code>release/v2.x</code> branch you're maintaining</li>
		<li><code>git switch release/v2.x</code></li>
		<li><code>git cherry-pick &lt;fix-commit-sha&gt;</code></li>
		<li>The same fix is now on the release branch</li>
	</ol>

	<p>
		You can cherry-pick a <em>range</em> of commits too: <code>git cherry-pick A..B</code>.
		Conflicts are resolved the same way as a merge — edit, stage, <code>git cherry-pick --continue</code>.
	</p>

	<Callout type="warning">
		<p>
			Cherry-picking <em>duplicates</em> a commit. That's fine on its own, but if the two
			branches later merge, you may see the same change twice in the history. For one-off
			backports, worth it. For wholesale "move these 20 commits to another branch," a rebase or
			merge is usually cleaner.
		</p>
	</Callout>

	<AskYourAgent
		prompts={[
			'backport this bugfix commit to the release/v2.x branch',
			'cherry-pick the last three commits onto the current branch',
			'this cherry-pick has a conflict — help me resolve it',
			'show me which commits on main are not yet on v2.x'
		]}
	/>

	<h3>Common scenarios</h3>

	<h4>"Release v1.2.3 from main"</h4>
	<p>
		Ensure <code>main</code> is up-to-date and passing CI. <code>git tag -a v1.2.3 -m "v1.2.3"</code>,
		<code>git push origin v1.2.3</code>. Your release automation takes over from there.
	</p>

	<h4>"Find the version a bug was introduced in"</h4>
	<p>
		<code>git describe --tags --abbrev=0 &lt;buggy-commit-sha&gt;</code> prints the most recent tag
		before that commit — typically the release the bug shipped in.
	</p>

	<h4>"List all release tags"</h4>
	<p>
		<code>git tag -l "v*" --sort=-v:refname</code> — lists version tags in reverse version order.
	</p>

	<h2>Summary</h2>

	<p>
		Tags are immovable labels on specific commits. Use annotated tags for releases. Understand
		semver enough to know what a patch vs minor vs major bump means. Tags don't push
		automatically — use <code>--tags</code> or push them by name. Cherry-pick copies a single
		commit onto another branch, which is how you backport fixes to release branches.
	</p>
</PathPageLayout>
