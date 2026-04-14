<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-stashing"
	title="Stashing"
	subtitle="Setting work aside safely — and how not to lose it"
	estimatedMinutes={6}
	pathId="git-in-detail"
>
	<DiagramImage
		src="git-in-detail/stashing-shelf.png"
		alt="Poster 'Stashing' showing wooden shelves with labelled glowing jars, one alien placing a new jar, another reaching up to retrieve one, a sign reads 'please apply before you pop'"
		caption="Shelf your work. Come back for it later."
	/>

	<h2>What is this?</h2>

	<p>
		<code>git stash</code> takes your uncommitted changes and puts them on a <strong>shelf</strong>.
		Your working directory goes back to clean (matching the last commit). You switch branches,
		pull, experiment — and when you're ready, bring your changes back.
	</p>

	<p>
		Stashes are stored as a little stack of named snapshots inside your repo. They persist until
		you apply them (or deliberately drop them). They don't travel with pushes.
	</p>

	<h2>Why does this matter?</h2>

	<p>
		The classic moment: you're mid-feature, a production bug comes in, you need to switch to
		<code>main</code> and fix it <em>right now</em>, but your half-written code would conflict. You
		can't commit it — it's garbage. Stash it.
	</p>

	<p>
		<strong>If you're thinking "urgent bug, I'm mid-feature,"</strong> you need
		<code>git stash push</code>.
		<br />
		<strong>If you're thinking "test just my staged changes,"</strong> you need
		<code>git stash push --keep-index</code>.
		<br />
		<strong>If you're thinking "my WIP deserves its own branch,"</strong> you need
		<code>git stash branch</code>.
	</p>

	<h3>The core commands</h3>

	<ul>
		<li>
			<code>git stash push -m "name"</code> — save your changes with a name (always use
			<code>-m</code>; unnamed stashes are a curse)
		</li>
		<li><code>git stash list</code> — see all your stashes</li>
		<li><code>git stash show -p stash@&#123;0&#125;</code> — see the diff of a stash</li>
		<li>
			<code>git stash apply stash@&#123;0&#125;</code> — bring back a stash, <strong>keep it</strong> on the
			shelf. Safer
		</li>
		<li>
			<code>git stash pop</code> — bring back the top stash and <strong>remove it</strong> from the
			shelf. Dangerous if it conflicts
		</li>
		<li><code>git stash drop stash@&#123;0&#125;</code> — delete a specific stash</li>
		<li><code>git stash clear</code> — delete them all</li>
	</ul>

	<h3>The untracked-files trap</h3>

	<Callout type="warning">
		<p>
			<strong>By default, <code>git stash</code> does NOT include untracked files.</strong> If you
			made a new file that Git hasn't seen yet, and you stash, then switch branches — the new file
			travels with you. Surprising and often destructive. Use <code>git stash push -u</code> (or
			<code>--include-untracked</code>) to include them.
		</p>
	</Callout>

	<h3>Apply first, pop later — why this matters</h3>

	<p>
		<code>git stash pop</code> deletes the stash on success. But if the apply has conflicts,
		<code>pop</code> doesn't always remove the stash — and the failure path here is where the
		<em>"I lost my stash"</em> reports come from. Industry lore says roughly a quarter of
		stash-related dataloss comes from <code>pop</code> edge cases.
	</p>

	<p>
		<strong>The safe pattern:</strong> <code>git stash apply stash@&#123;0&#125;</code>, check everything
		looks right, <em>then</em> <code>git stash drop stash@&#123;0&#125;</code>.
	</p>

	<AskYourAgent
		prompts={[
			'stash my current work so I can switch to the main branch',
			'apply my last stash — but keep it on the shelf',
			"what's in my stashes?",
			"pop the stash but don't delete it if there's a conflict"
		]}
	/>

	<h3><code>git stash branch</code> — promote a stash to a real branch</h3>

	<p>
		If you realise a stashed experiment is actually worth saving properly:
		<code>git stash branch &lt;name&gt;</code> creates a new branch from the commit the stash was
		based on, applies the stash, and drops it. You're now on a real branch with your work —
		commit and push like normal.
	</p>

	<p>
		This is also the escape hatch when <code>pop</code> conflicts and you just want out of stash
		hell.
	</p>

	<AskYourAgent
		prompts={[
			"turn my last stash into a proper branch",
			"that stash is more important than I thought — make it a branch",
			"I can't apply this stash cleanly — move it to a branch instead"
		]}
	/>

	<h3>Common scenarios</h3>

	<h4>"I have five unnamed stashes and no idea which is which"</h4>
	<p>
		<code>{'git stash show -p stash@{N}'}</code> on each one. Or better — name them from now on. If
		they're old and you've forgotten, many are probably safe to drop.
	</p>

	<h4>"I stashed, switched branches, and now I want my work on the new branch"</h4>
	<p><code>git stash apply</code> (or <code>git stash branch new-name</code>) works across branches. The stash is a patch, not a branch.</p>

	<h4>"I committed when I meant to stash"</h4>
	<p>
		Uncommit-but-keep: <code>git reset --soft HEAD~1</code>. Now stash: <code>git stash push -m
			"..." </code>. See <em>Undoing Things</em> for the full reset spectrum.
	</p>

	<h2>Summary</h2>

	<p>
		Stash puts changes on a shelf so you can switch gears. Always name with
		<code>-m</code>. Use <code>-u</code> if you have new untracked files. Prefer <code>apply</code>
		over <code>pop</code>. If a stash is bigger than a "quick save" deserves, turn it into a
		branch with <code>git stash branch</code>. Nothing in your working directory should live in a
		stash for longer than a day.
	</p>
</PathPageLayout>
