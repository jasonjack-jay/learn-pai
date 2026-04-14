<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-merging"
	title="Merging in Depth"
	subtitle="Combining branches, handling conflicts, and picking the right merge style"
	estimatedMinutes={10}
	pathId="git-in-detail"
>
	<DiagramImage
		src="git-in-detail/merging-converge.png"
		alt="Poster 'Merging in Depth' showing two tube lines — feature/search (red) and main (green) — converging at a glowing diamond-shaped MERGE COMMIT station with an alien celebrating below"
		caption="Two lines, one history — kept forever."
	/>

	<h2>What is this?</h2>

	<p>
		Merging takes the work from one branch and combines it with another. Most of the time it's
		fully automatic — Git figures out what changed on each side and applies both. Occasionally
		two people edit the same line and Git stops to ask you which version to keep; that's a
		<strong>conflict</strong>.
	</p>

	<p>
		There are three common shapes a merge can take. Knowing which one you want is half the battle.
	</p>

	<h2>Why does this matter?</h2>

	<p>
		Merging is how a feature branch rejoins <code>main</code>. It's how you get your colleague's
		latest changes without losing your own work. Understanding the different merge flavours is
		how you avoid ugly, unreadable commit histories — and how you recover when a merge goes
		sideways.
	</p>

	<p>
		<strong>If you're thinking "main moved on while I was branching,"</strong> you're about to
		merge or rebase to catch up.
		<br />
		<strong>If you're thinking "I want my branch's history preserved when merging,"</strong> you
		want a merge commit (no-fast-forward).
		<br />
		<strong>If you're thinking "I want one clean commit for my whole feature,"</strong> you want
		a squash merge.
	</p>

	<h3>Fast-forward merge — the boring one</h3>

	<p>
		If the branch you're merging from is simply ahead of yours (no parallel work), Git can
		"fast-forward" — it moves your branch pointer to the tip of the other branch. No new commit
		is created. The history looks like you were on the other branch all along.
	</p>

	<p>
		Fast-forward is fine for small branches, but it erases the fact that there was ever a side
		branch. Some teams opt out of it entirely with <code>--no-ff</code>.
	</p>

	<h3>Merge commit (three-way merge)</h3>

	<p>
		When both branches have moved since they diverged, Git creates a new commit with
		<em>two parents</em> — one from each branch. Your history keeps the shape of a tree: feature
		branches forking and rejoining. Easy to see "this work happened on a side branch, then came
		in."
	</p>

	<p>
		<strong>The flag:</strong> <code>git merge --no-ff &lt;branch&gt;</code> forces a merge commit
		even when a fast-forward was possible. Many teams do this to preserve branch shape.
	</p>

	<h3>Squash merge</h3>

	<p>
		<code>git merge --squash &lt;branch&gt;</code> takes all the changes from the feature branch and
		stages them as a single set, ready for <em>one</em> commit on the destination. The branch's
		own commit history isn't preserved — you get a tidy single commit per feature.
	</p>

	<p>
		GitHub's "Squash and merge" button does this automatically. Many teams prefer it: one feature
		= one commit on main, even if you had 17 WIP commits while you were building it.
	</p>

	<Callout type="tip">
		<p>
			<strong>Rule of thumb:</strong> short, messy feature branches → squash. Long, meaningful
			branches where the individual commits tell a story → merge with <code>--no-ff</code>. Fully
			linear clean branches with no parallel main activity → rebase (next page).
		</p>
	</Callout>

	<AskYourAgent
		prompts={[
			'merge this branch into main',
			'squash-merge this branch and use a clean summary message',
			'merge with --no-ff so the branch shape is preserved',
			"what's the difference between merge and squash for this PR?"
		]}
	/>

	<h3>Resolving conflicts</h3>

	<p>
		When Git can't auto-merge, it marks the conflicting lines in the file with three-way markers:
	</p>

	<DiagramImage
		src="git-in-detail/merging-conflict-markers.png"
		alt="Poster 'Reading Conflict Markers' showing a code-editor window with three colour-banded sections — HEAD (yours, red), base (the original, grey, tagged ZDIFF3), feature (theirs, green) — annotated with callouts"
		caption="zdiff3 shows you the original too — less guessing."
	/>

	<p>You get three pieces:</p>

	<ul>
		<li>Between <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> and <code>=======</code>: <em>your</em> version</li>
		<li>Between <code>=======</code> and <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; branch-name</code>: <em>their</em> version</li>
		<li>With <code>zdiff3</code> on: also a <code>||||||| base</code> section showing the original common ancestor</li>
	</ul>

	<p>
		Your job: edit the file so it contains the right combined content, then <em>remove all the
			marker lines</em>. Stage the file. Continue the merge: <code>git merge --continue</code>.
	</p>

	<p>
		<strong>If you're thinking "I'd rather just abandon this merge,"</strong> you need
		<code>git merge --abort</code>. It drops you back exactly where you were before.
	</p>

	<AskYourAgent
		prompts={[
			"there's a merge conflict — help me resolve it",
			"explain what's actually conflicting in this file",
			'abort this merge — I want to start over',
			'accept all their changes in this conflict'
		]}
	/>

	<h3>Merge strategies (a glimpse)</h3>

	<p>
		Under the hood Git picks a strategy. The default is <code>ort</code> (replaces the older
		<code>recursive</code>). You rarely need to override it — but you may see these names:
	</p>

	<ul>
		<li><code>ort</code> / <code>recursive</code> — the default, three-way merge</li>
		<li><code>octopus</code> — merging three or more branches at once, rarely used outside integration branches</li>
		<li><code>ours</code> — a directional one that always takes our side (not the same as <code>-X ours</code>, which is the <em>option</em>)</li>
	</ul>

	<p>
		99% of merges use the default. The only one most developers ever reach for is <code>-X ours</code>
		or <code>-X theirs</code> as an <em>option</em> to bias conflicts automatically in a known
		direction. Your AI can pick the right one if you describe the situation.
	</p>

	<h2>Common scenarios</h2>

	<h4>"Main moved ahead while I was branching"</h4>
	<p>
		Two options: merge <code>main</code> into your feature branch (creates a merge commit on your
		branch; safe), or rebase your feature branch onto <code>main</code> (linear history; see the
		next page). Merge is safer while you're learning.
	</p>

	<h4>"Conflict in a file I didn't even change"</h4>
	<p>
		Usually means that file moved on both sides of the merge, or was modified by a shared
		dependency. Read the conflict markers carefully — you may need to keep <em>both</em> sets of
		changes, not just one.
	</p>

	<h4>"I committed garbage to resolve the conflict"</h4>
	<p>
		If you haven't pushed yet: <code>git reset --hard HEAD~1</code> rewinds one commit, then
		redo the merge. If you have pushed, see the <em>Undoing Things</em> page.
	</p>

	<h2>Summary</h2>

	<p>
		Three shapes: fast-forward, merge commit, squash. Pick based on how much of the branch's
		history you want to preserve. Conflicts are edit-remove-markers-stage-continue;
		<code>zdiff3</code> conflict markers show the original base and are much easier to read.
		<code>git merge --abort</code> always gets you out of a stuck merge. Rebasing is a different
		way to do the same thing — that's next.
	</p>
</PathPageLayout>
