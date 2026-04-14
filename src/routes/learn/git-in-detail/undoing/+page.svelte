<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-undoing"
	title="Undoing Things"
	subtitle="From minor oops to nuclear reset — plus the reflog safety net"
	estimatedMinutes={10}
	pathId="git-in-detail"
>
	<ImagePlaceholder
		description="A single-dial control panel labelled 'THE UNDO SPECTRUM' with five stops around the dial: 'restore' (green), 'revert' (light green), 'reset --soft' (yellow), 'reset --mixed' (orange), 'reset --hard' (red). A friendly alien's hand hovers over the dial; a warning label below reads 'reflog is your safety net'."
		size="large"
	/>

	<h2>What is this?</h2>

	<p>
		There's a spectrum of undo tools in Git, from "gently undo one file's changes" to "wipe out
		the last three commits." Picking the right one means picking the smallest hammer that
		actually solves the problem — and understanding which ones rewrite history versus add a new
		commit.
	</p>

	<h2>Why does this matter?</h2>

	<p>
		Because you <em>will</em> need to undo something, probably today. The difference between "lost
		20 minutes of work" and "lost 2 hours" is usually picking the correct undo tool. And the
		<code>reflog</code> is the reason Git is more forgiving than you think — almost nothing is
		truly lost for at least 30 days.
	</p>

	<h3>The undo spectrum (smallest to biggest)</h3>

	<h4><code>git restore</code> — one file at a time, gentle</h4>

	<ul>
		<li><code>git restore &lt;file&gt;</code> — discard unstaged changes to a file</li>
		<li><code>git restore --staged &lt;file&gt;</code> — unstage a file (opposite of <code>add</code>)</li>
		<li><code>git restore --source=HEAD~3 &lt;file&gt;</code> — restore a file to how it looked 3 commits ago</li>
	</ul>

	<p>Doesn't touch history. Doesn't touch any other file. Easy to reason about.</p>

	<h4><code>git revert</code> — safe, public undo</h4>

	<p>
		<code>git revert &lt;sha&gt;</code> creates a <strong>new</strong> commit that undoes the
		changes of an existing commit. History keeps both. Safe to do on shared branches because
		nothing is rewritten — you're just adding a commit that reverses an earlier one.
	</p>

	<p>
		Use revert for anything that's already been pushed to a branch others are using.
	</p>

	<h4><code>git reset --soft</code> — uncommit, keep work</h4>

	<p>
		<code>git reset --soft HEAD~1</code> moves the branch pointer back one commit. The changes
		from that commit land in your <em>staging area</em>, ready to be re-committed.
	</p>

	<p>
		Use when you want to redo your last commit — bigger message, better split, more files.
	</p>

	<h4><code>git reset --mixed</code> (the default)</h4>

	<p>
		<code>git reset HEAD~1</code> (same as <code>--mixed</code>) moves the branch pointer back
		<em>and</em> unstages the changes. They stay in your working directory but aren't staged.
	</p>

	<h4><code>git reset --hard</code> — nuclear</h4>

	<Callout type="warning">
		<p>
			<code>git reset --hard HEAD~1</code> moves the branch pointer back <em>and discards all
				changes</em> — staged and unstaged. Uncommitted work is gone. Committed work is still
			recoverable via the reflog for ~30 days, but treat this command as the big red button.
		</p>
	</Callout>

	<h3><code>git commit --amend</code> — fix the last commit</h3>

	<p>
		Replaces the most recent commit with a new one incorporating whatever you have staged (or a
		new message, with <code>--only</code> or no staged changes). Great for typos and missed
		files. Only safe on commits that haven't been pushed.
	</p>

	<h3><code>git reflog</code> — the safety net</h3>

	<p>
		Git keeps a log of every move <code>HEAD</code> makes — every commit, checkout, rebase, reset,
		amend. That log is the <strong>reflog</strong>. It lives locally and keeps entries for about
		30 days by default.
	</p>

	<p>
		Which means: almost any disaster that happened in the last month on your machine is
		recoverable. <code>git reflog</code> shows you every state <code>HEAD</code> has been in.
		<code>git reset --hard &lt;reflog-sha&gt;</code> teleports you back to it.
	</p>

	<Callout type="tip">
		<p>
			<strong>Memorise this one:</strong> if anything disappears and you don't know why,
			<code>git reflog</code> <em>first</em>. Panic second.
		</p>
	</Callout>

	<AskYourAgent
		prompts={[
			'show me my reflog',
			'I reset hard and lost commits — help me get them back from reflog',
			'restore the repo to the state it was in 30 minutes ago'
		]}
	/>

	<h3>The "Oh No" table</h3>

	<p>Twelve common disasters and their fixes. Bookmark this.</p>

	<table>
		<thead>
			<tr>
				<th>What happened</th>
				<th>The fix</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Committed with a typo'd message</td>
				<td><code>git commit --amend</code></td>
			</tr>
			<tr>
				<td>Forgot a file in the last commit</td>
				<td>Stage it, then <code>git commit --amend --no-edit</code></td>
			</tr>
			<tr>
				<td>Committed to the wrong branch</td>
				<td><code>git switch correct-branch</code>, <code>git cherry-pick &lt;sha&gt;</code>, then reset the wrong branch</td>
			</tr>
			<tr>
				<td>Need to undo one pushed commit</td>
				<td><code>git revert &lt;sha&gt;</code> (creates an undo commit)</td>
			</tr>
			<tr>
				<td>Need to "unstage" a file</td>
				<td><code>git restore --staged &lt;file&gt;</code></td>
			</tr>
			<tr>
				<td>Want to throw away a file's unstaged changes</td>
				<td><code>git restore &lt;file&gt;</code></td>
			</tr>
			<tr>
				<td>Want to undo the last commit, keep the changes</td>
				<td><code>git reset --soft HEAD~1</code></td>
			</tr>
			<tr>
				<td>Want to undo the last commit and the changes</td>
				<td><code>git reset --hard HEAD~1</code> (then reflog if regret sets in)</td>
			</tr>
			<tr>
				<td>Force-pushed and lost work</td>
				<td><code>git reflog</code>, find the pre-push SHA, reset back, force-push-with-lease</td>
			</tr>
			<tr>
				<td>Deleted a branch I needed</td>
				<td><code>git reflog</code> for its tip SHA, then <code>git switch -c branch-name &lt;sha&gt;</code></td>
			</tr>
			<tr>
				<td>Accidentally committed a <code>.env</code></td>
				<td>Rotate the secrets first. Then remove the file, amend (if unpushed) or BFG/filter-repo (if pushed)</td>
			</tr>
			<tr>
				<td>Rebase is a disaster</td>
				<td><code>git rebase --abort</code></td>
			</tr>
		</tbody>
	</table>

	<AskYourAgent
		prompts={[
			'I committed to the wrong branch — move the commit to a new branch',
			'my last commit was wrong — redo it with a different set of changes',
			'I force-pushed and lost commits — recover from reflog',
			'revert the commit from yesterday that broke production'
		]}
	/>

	<h3>Rewrites history vs adds a commit (quick reference)</h3>

	<ul>
		<li><strong>Rewrite history</strong> (unsafe on shared branches): <code>amend</code>, <code>reset</code> (any mode), <code>rebase</code>, <code>cherry-pick</code> can feel that way in some flows</li>
		<li><strong>Adds a commit</strong> (safe on shared branches): <code>revert</code>, <code>restore</code>, plain <code>commit</code></li>
	</ul>

	<Callout type="warning">
		<p>
			If it rewrites history and the history is shared, you've broken the Golden Rule. See
			<em>Rebasing</em>. Your team will have a bad day.
		</p>
	</Callout>

	<h2>Summary</h2>

	<p>
		Undo is a spectrum. <code>restore</code> and <code>revert</code> are safe on anything.
		<code>amend</code> and <code>reset</code> rewrite history — only safe on local, unpushed work.
		<code>reflog</code> is your local safety net for about 30 days and will recover almost
		anything. When in doubt, stop, <code>git reflog</code>, and ask your AI for the right next
		step. Don't keep typing hopeful commands.
	</p>
</PathPageLayout>
