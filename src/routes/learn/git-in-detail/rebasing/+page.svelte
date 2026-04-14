<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-rebasing"
	title="Rebasing"
	subtitle="Replaying commits, rewriting history, and the one rule you really must not break"
	estimatedMinutes={10}
	pathId="git-in-detail"
>
	<ImagePlaceholder
		description="Before/after tube-map diagram. Left: messy history with a feature branch looping back and forth around a busy main line. Right: the same work replayed neatly on top of main as a straight line. An alien porter picks commits up off the left diagram and places them tidily on the right."
		size="large"
	/>

	<h2>What is this?</h2>

	<p>
		Rebasing takes a sequence of commits from one branch and <em>replays them</em> onto a
		different base. The end result is the same code, but the commit history looks like you
		branched off <em>later</em> — usually from the current tip of <code>main</code>.
	</p>

	<p>
		Two flavours:
	</p>

	<ul>
		<li><strong>Basic rebase</strong>: move your branch forward onto the latest main. "Catch up."</li>
		<li>
			<strong>Interactive rebase</strong> (<code>-i</code>): rewrite, reorder, squash, reword, or
			drop your own commits before anyone sees them. "Tidy up."
		</li>
	</ul>

	<h2>Why does this matter?</h2>

	<p>
		Rebase gives you a <em>linear</em> history. A feature branch that's been rebased reads like it
		was written in one clean stretch, not interleaved with everyone else's work. Most teams prefer
		a rebased feature branch for PR review because the diff is cleaner and the commits tell a
		coherent story.
	</p>

	<p>
		<strong>If you're thinking "I have 15 WIP commits and one PR,"</strong> you need interactive
		rebase with squash/fixup.
		<br />
		<strong>If you're thinking "main has moved ahead and I want my branch on top of it,"</strong>
		you need <code>git rebase main</code> while on your feature branch.
		<br />
		<strong>If you're thinking "I just accidentally rebased something I'd already pushed,"</strong>
		read the Golden Rule below very carefully.
	</p>

	<h3>The Golden Rule — never rebase shared history</h3>

	<Callout type="warning">
		<p>
			<strong>Never rebase commits that have been pushed and that other people might have pulled.</strong>
			Rebase rewrites commit IDs, which means anyone who had the old commits now has a different
			history from you. When they try to pull, Git gets confused. When they push, they may
			accidentally restore the old commits and erase yours.
		</p>
	</Callout>

	<p>Safe to rebase:</p>

	<ul>
		<li>Your local branch that only exists on your laptop</li>
		<li>Your feature branch that's only been pushed to <em>your</em> fork</li>
		<li>A branch that nobody else has pulled</li>
	</ul>

	<p>Dangerous to rebase:</p>

	<ul>
		<li><code>main</code> — ever</li>
		<li>A shared integration branch</li>
		<li>A feature branch that a teammate is also working on</li>
		<li>A branch CI or other automation is watching</li>
	</ul>

	<h3>Basic rebase — catching up to main</h3>

	<p>
		You're on your feature branch. <code>main</code> has moved. You want to rebase on top:
	</p>

	<ol>
		<li>First, update your local main: <code>git fetch origin</code></li>
		<li>From your feature branch, run <code>git rebase origin/main</code></li>
		<li>If conflicts happen, resolve them the same way you'd resolve merge conflicts, then <code>git rebase --continue</code></li>
		<li>If things go wrong, <code>git rebase --abort</code> drops you back where you started</li>
	</ol>

	<AskYourAgent
		prompts={[
			'rebase my branch onto the latest main',
			"main has moved ahead — get my branch up to date without a merge commit",
			"abort this rebase — I'd rather just merge"
		]}
	/>

	<h3>Interactive rebase — tidying up before a PR</h3>

	<p>
		<code>git rebase -i HEAD~5</code> opens your editor with the last 5 commits listed, each with
		a verb next to it. You can:
	</p>

	<ul>
		<li><code>pick</code> — keep as-is (default)</li>
		<li><code>reword</code> — keep the commit, edit the message</li>
		<li><code>squash</code> — combine into the previous commit, combine messages</li>
		<li><code>fixup</code> — like squash but drop this commit's message entirely</li>
		<li><code>edit</code> — stop here so you can amend the commit</li>
		<li><code>drop</code> — remove this commit entirely (be careful)</li>
	</ul>

	<p>
		You can also <em>reorder</em> commits by rearranging the lines. Git replays them in the new
		order.
	</p>

	<ImagePlaceholder
		description="Split panel. Left: the interactive-rebase editor view with 8 commits, several marked 'squash' and one 'reword'. Right: the resulting 3 commits on the branch, each with a clean message. Arrows show the mapping from the left panel to the right."
		size="medium"
	/>

	<AskYourAgent
		prompts={[
			'squash my last 5 WIP commits into one clean commit',
			'interactive rebase to clean up these commits before the PR',
			'reword the last commit message to be clearer',
			'drop the debug commit and keep the rest'
		]}
	/>

	<h3>The <code>--fixup</code> + <code>--autosquash</code> workflow</h3>

	<p>
		While you're working, if you realise an earlier commit had a bug, you can make a
		<em>fixup commit</em> targeted at it:
	</p>

	<p>
		<code>git commit --fixup=&lt;commit-sha&gt;</code>
	</p>

	<p>
		When you later do <code>git rebase -i --autosquash HEAD~10</code>, Git pre-marks the fixup
		commit to be squashed into its target, already in the right order. With
		<code>rebase.autoSquash = true</code> in config (from Setup), this happens automatically — you
		just confirm.
	</p>

	<h3>When you must force-push: <code>--force-with-lease</code></h3>

	<p>
		After rebasing a branch you've already pushed, a normal <code>git push</code> will be rejected
		— your local history no longer matches the remote. To update the remote, you have two
		options:
	</p>

	<ul>
		<li>
			<code>git push --force</code> — overwrites the remote. <strong>Dangerous.</strong> Wipes
			anything someone else pushed in the meantime
		</li>
		<li>
			<code>git push --force-with-lease</code> — overwrites the remote <strong>only if</strong> it
			still matches what you last fetched. If anyone pushed after you last fetched, the push is
			rejected instead of stomping on them
		</li>
	</ul>

	<p>
		Use <code>--force-with-lease</code>. Always. It's the "force-push that doesn't silently delete
		your teammate's work."
	</p>

	<Callout type="warning">
		<p>
			Never force-push to <code>main</code>. Many teams disable this at the repository level.
			Force-pushing is for <em>your own</em> feature branches after rebasing.
		</p>
	</Callout>

	<h3>Common scenarios</h3>

	<h4>"I rebased but now I can't push"</h4>
	<p>
		Expected. Your history no longer matches the remote.
		<code>git push --force-with-lease</code> is the answer.
	</p>

	<h4>"I accidentally rebased something I'd already pushed and others had pulled"</h4>
	<p>
		Don't force-push. Instead, coordinate with your team — they need to re-sync. If they haven't
		merged the old commits anywhere else, the easiest rescue is to <code>git reflog</code> and
		reset back to the pre-rebase commit. See <em>Undoing Things</em>.
	</p>

	<h4>"Rebase has conflicts on every commit"</h4>
	<p>
		Each commit is replayed one at a time, so conflicts can happen per-commit. Resolve, <code>git
			add</code>, <code>git rebase --continue</code>. Repeat. If it becomes truly painful, abort
		and consider a merge instead.
	</p>

	<AskYourAgent
		prompts={[
			"I've rebased and need to push safely",
			"I rebased and lost commits — help me get them back from reflog",
			'abort this rebase, this is a mess'
		]}
	/>

	<h2>Summary</h2>

	<p>
		Rebase replays commits onto a different base, giving you linear history. Basic rebase catches
		you up to <code>main</code>; interactive rebase lets you reshape your own commits before
		anyone sees them. <strong>Never rebase shared history.</strong> After rebasing a pushed
		branch, <code>--force-with-lease</code> is the safe way to update the remote. When in doubt,
		rebase your own local branches; merge when you're on shared ground.
	</p>
</PathPageLayout>
