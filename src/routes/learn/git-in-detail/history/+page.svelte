<script lang="ts">
	import PathPageLayout from '$lib/components/PathPageLayout.svelte';
	import AskYourAgent from '$lib/components/AskYourAgent.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<PathPageLayout
	moduleId="git-in-detail-history"
	title="Investigating History"
	subtitle="log, show, blame, and the wonder that is bisect"
	estimatedMinutes={10}
	pathId="git-in-detail"
>
	<ImagePlaceholder
		description="A detective-themed scene: an alien in a deerstalker hat examining a timeline of commits through a magnifying glass. Different commits glow different colours (red for the buggy one, green for ok). Above, a board links clues: file name, line number, author initials, a date stamp."
		size="medium"
	/>

	<h2>What is this?</h2>

	<p>
		Every commit Git has ever stored is still there. The history tools let you search, walk, and
		interrogate that record. Done well, Git becomes a time machine for your codebase — you can
		ask it who, what, when, and why for any line that exists (or ever existed).
	</p>

	<h2>Why does this matter?</h2>

	<p>
		Most bugs are easier to understand when you know <em>when the bug appeared</em>. Most
		surprising code is easier to understand when you know <em>who wrote it and why</em>. Code
		review is faster when you can say "this PR touches the same lines PR #1234 touched — let me
		see what that was about."
	</p>

	<p>
		<strong>If you're thinking "who wrote this and why?"</strong> you need <code>blame</code> and
		<code>log</code>.
		<br />
		<strong>If you're thinking "when did this file start doing the wrong thing?"</strong> you need
		<code>bisect</code>.
		<br />
		<strong>If you're thinking "what did that one commit actually change?"</strong> you need
		<code>show</code>.
	</p>

	<h3><code>git log</code> — walking the timeline</h3>

	<p>
		Plain <code>git log</code> is overwhelming. The flags are the whole point. Here are the ones
		that pay rent:
	</p>

	<ul>
		<li><code>--oneline</code> — one commit per line (sha + subject)</li>
		<li><code>--graph</code> — ASCII art showing branches/merges</li>
		<li><code>--all</code> — include all branches, not just current</li>
		<li><code>--author="Dan"</code> — filter by author name</li>
		<li><code>--since="2 weeks ago"</code> — filter by date</li>
		<li><code>--until="yesterday"</code> — upper bound on date</li>
		<li><code>--grep="login"</code> — search commit messages</li>
		<li><code>-S"useEffect"</code> — find commits that added or removed this string ("pickaxe")</li>
		<li><code>-G"pattern"</code> — same but a regex</li>
		<li><code>-- src/api/</code> — restrict to a path (note the <code>--</code> separator)</li>
		<li><code>-L :functionName:src/file.ts</code> — show history of a specific function</li>
		<li><code>--stat</code> — show files changed per commit</li>
		<li><code>-p</code> — show the full diff per commit</li>
		<li><code>--merges</code> / <code>--no-merges</code> — include/exclude merge commits</li>
		<li><code>--reverse</code> — oldest first</li>
	</ul>

	<p>
		Combine these liberally. <code>git log --oneline --graph --all --since="1 month ago"</code> is
		a great "what's been going on around here?" command.
	</p>

	<AskYourAgent
		prompts={[
			'show me the last 20 commits as a compact graph',
			'find all commits that mention ticket ABC-123',
			'show me every commit that added or removed the word "migration"',
			'who committed to src/auth/ in the last month?',
			"show me the history of the login function specifically"
		]}
	/>

	<h3><code>git show</code> — what did that one commit do?</h3>

	<p>
		<code>git show &lt;sha&gt;</code> prints the commit message plus the full diff. It's how you
		answer "ok what exactly changed in that commit?" without walking through the log.
	</p>

	<p>
		Useful variants:
	</p>

	<ul>
		<li><code>git show HEAD</code> — the most recent commit</li>
		<li><code>git show HEAD~3</code> — three commits ago</li>
		<li><code>git show &lt;sha&gt; --stat</code> — just the file summary</li>
		<li><code>git show &lt;sha&gt;:path/to/file</code> — show the file as it was in that commit</li>
	</ul>

	<AskYourAgent
		prompts={[
			'show me what commit abc1234 actually changed',
			'what did HEAD change compared to its parent?',
			"show me that file from last week's commit"
		]}
	/>

	<h3><code>git blame</code> — per-line authorship</h3>

	<p>
		<code>git blame &lt;file&gt;</code> annotates every line with the commit that last touched it
		— plus the author and date. Critical for answering "why on earth is this line here?"
	</p>

	<p>The magic flags that make blame far more useful:</p>

	<ul>
		<li><code>-w</code> — ignore whitespace-only changes (common reformat noise)</li>
		<li>
			<code>-M</code> — detect lines moved <em>within</em> the file and blame the original author,
			not the move
		</li>
		<li>
			<code>-C</code> — detect lines copied <em>from other files</em> and blame the original author.
			Combine with <code>-M</code> for full effect
		</li>
		<li><code>-L 40,60</code> — only blame lines 40 to 60</li>
	</ul>

	<p>
		With <code>-w -M -C</code> you can usually trace a line back to its original author even after
		it's been moved and reformatted twice.
	</p>

	<Callout type="tip">
		<p>
			<strong>GitHub, VS Code, and most IDEs have a "blame" view.</strong> It's often easier than
			the CLI. The point of knowing the flags is to use them when the IDE view surprises you
			("wait, I wrote this? I don't remember this"). Add <code>-w -M</code> and the real author
			usually appears.
		</p>
	</Callout>

	<AskYourAgent
		prompts={[
			'who wrote line 42 of src/auth.ts and why?',
			'blame this file but ignore whitespace changes',
			"walk me back through the history of this specific line"
		]}
	/>

	<h3><code>git bisect</code> — the binary search for bugs</h3>

	<p>
		When you know a bug exists now but didn't exist at some older commit, bisect finds the exact
		commit that introduced it. It does a binary search through history — you tell it
		<em>good</em> or <em>bad</em> at each step, it narrows in.
	</p>

	<p>Manual version:</p>

	<ol>
		<li><code>git bisect start</code></li>
		<li><code>git bisect bad</code> (the current commit has the bug)</li>
		<li><code>git bisect good &lt;older-sha&gt;</code> (this commit was fine)</li>
		<li>Git checks out a commit halfway between. Test it. Run <code>git bisect good</code> or <code>git bisect bad</code></li>
		<li>Repeat. In roughly <code>log₂(N)</code> steps Git pinpoints the bad commit</li>
		<li><code>git bisect reset</code> when done</li>
	</ol>

	<p>
		For 1,024 commits, that's 10 steps to find the culprit.
	</p>

	<h4>Automated bisect with <code>--run</code></h4>

	<p>
		If the bug is detectable by a script, <code>git bisect run &lt;script&gt;</code> runs that
		script at each step automatically. Exit 0 = good, non-zero = bad. Walk away and come back to
		the answer.
	</p>

	<AskYourAgent
		prompts={[
			'start a bisect — the bug is in main, it wasn\'t there last release',
			'bisect using this test script as the checker',
			"I'm in the middle of a bisect and I've lost track — what do I do?",
			"end this bisect and put me back on main"
		]}
	/>

	<h3>Common scenarios</h3>

	<h4>"When did this file get deleted?"</h4>
	<p>
		<code>git log --diff-filter=D -- path/to/file</code> — log filtered to commits that deleted
		that path. The commit it shows is the deletion.
	</p>

	<h4>"Find the commit that introduced this specific string"</h4>
	<p>
		<code>git log -S"exact-string"</code> uses the pickaxe. For regex, <code>-G</code>.
	</p>

	<h4>"Show all commits in this PR"</h4>
	<p>
		<code>git log main..feature-branch</code> — commits on <code>feature-branch</code> that aren't
		on <code>main</code>. The typical "what does this PR contain?" view.
	</p>

	<h2>Summary</h2>

	<p>
		<code>git log</code> with the right flags answers most questions. <code>show</code> is for
		single-commit inspection. <code>blame -w -M -C</code> answers "who and why" for a line.
		<code>bisect</code> is unreasonably effective for finding regressions — manual for easy cases,
		<code>--run</code> with a script for harder ones. Your AI can drive any of these — you just
		need to know which tool answers which question.
	</p>
</PathPageLayout>
