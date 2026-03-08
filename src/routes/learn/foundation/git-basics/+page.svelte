<script lang="ts">
	import { base } from '$app/paths';
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<ModuleLayout
	moduleId="git-basics"
	title="Git Basics"
	description="Version control from scratch — save your work, branch freely, never lose progress"
	estimatedMinutes={15}
	nextSlug="foundation/what-is-pai"
>

<h2>What is version control?</h2>

<p>Imagine being able to take a snapshot of every file in your project at any point in time — and being able to go back to any snapshot instantly. That's version control. Git is the tool almost every developer in the world uses to do this.</p>

<p>Git also makes it easy to experiment safely. Want to try a new idea without risking your working code? Create a branch, try it, and if it doesn't work out, delete the branch and pick up right where you left off. Nothing is lost.</p>

<Callout type="tip">
	<p>If you already use Git regularly, feel free to skim this and mark it complete. The section on good commit messages and GUIs might still be worth a look.</p>
</Callout>

<h2>Checking and installing Git</h2>

<p>Git usually comes pre-installed on Macs. Let's check:</p>

<Terminal
	command="git --version"
	output="git version 2.44.0"
	title="Terminal"
/>

<p>If you see a version number, you're good. If not, install it by running <code>xcode-select --install</code> — this installs Apple's developer tools which include Git.</p>

<h2>One-time setup</h2>

<p>Before your first commit, tell Git who you are. This name and email appear in your commit history.</p>

<Terminal
	command={`git config --global user.name "Your Name"
git config --global user.email "you@example.com"`}
	title="Terminal — run both lines"
/>

<p>You only need to do this once. Git stores it in <code>~/.gitconfig</code>.</p>

<h2>The core workflow: Modify → Stage → Commit</h2>

<p>Everything in Git revolves around this three-step cycle. Understanding it makes everything else click.</p>

<p><strong>1. Modify</strong> — you make changes to files.</p>
<p><strong>2. Stage</strong> — you tell Git which changes to include in the next snapshot (<code>git add</code>).</p>
<p><strong>3. Commit</strong> — you take the snapshot and record it with a message (<code>git commit</code>).</p>

<h3>Starting a repository</h3>

<Terminal
	command="cd ~/dev/my-first-test-project && git init"
	output="Initialized empty Git repository in /Users/yourname/dev/my-first-test-project/.git/"
	title="Terminal"
/>

<h3>Checking status</h3>

<p><code>git status</code> is the command you'll run constantly. It tells you exactly what's changed and what's staged.</p>

<Terminal
	command="git status"
	output="On branch main

No commits yet

Untracked files:
  (use &quot;git add &lt;file&gt;...&quot; to include in what will be committed)
	README.md

nothing added to commit but untracked files present"
	title="Terminal"
/>

<h3>Staging changes</h3>

<Terminal
	command="git add README.md"
	title="Stage a specific file"
/>

<Terminal
	command="git add ."
	title="Stage everything at once"
/>

<h3>Committing</h3>

<Terminal
	command={`git commit -m "Add README with project overview"`}
	output="[main (root-commit) 3a2f1b4] Add README with project overview
 1 file changed, 5 insertions(+)"
	title="Terminal"
/>

<h2>Writing good commit messages</h2>

<p>A good commit message is a gift to your future self. When you look back in six months, the message should tell you <em>why</em> you made the change — not just what files were touched.</p>

<div class="overflow-x-auto my-6">
<table class="w-full text-sm border-collapse">
	<thead>
		<tr class="border-b border-gray-200">
			<th class="text-left py-2 pr-6 font-semibold text-gray-700">Bad</th>
			<th class="text-left py-2 font-semibold text-gray-700">Good</th>
		</tr>
	</thead>
	<tbody class="divide-y divide-gray-100">
		<tr><td class="py-2 pr-6 text-gray-500 font-mono text-xs">fix stuff</td><td class="py-2 text-gray-700 font-mono text-xs">Fix login crash when password contains special chars</td></tr>
		<tr><td class="py-2 pr-6 text-gray-500 font-mono text-xs">update</td><td class="py-2 text-gray-700 font-mono text-xs">Update homepage copy to reflect new pricing</td></tr>
		<tr><td class="py-2 pr-6 text-gray-500 font-mono text-xs">wip</td><td class="py-2 text-gray-700 font-mono text-xs">Add draft of onboarding flow (incomplete)</td></tr>
		<tr><td class="py-2 pr-6 text-gray-500 font-mono text-xs">changes</td><td class="py-2 text-gray-700 font-mono text-xs">Remove deprecated API calls from auth module</td></tr>
	</tbody>
</table>
</div>

<p>Aim for messages that complete the sentence: <em>"If applied, this commit will…"</em></p>

<h2>Viewing history</h2>

<Terminal
	command="git log --oneline"
	output="3a2f1b4 Add README with project overview
9c1e8d2 Initial project setup
..."
	title="Terminal"
/>

<Terminal
	command="git log --oneline --graph --all"
	output="* 3a2f1b4 (HEAD -> main) Add README with project overview
* 9c1e8d2 Initial project setup"
	title="Visual branch graph"
/>

<h2>Branches — your safety net</h2>

<p>A branch is an independent copy of your project where you can experiment freely. When it works, you merge it back. When it doesn't, you delete it. Nothing on <code>main</code> is ever at risk.</p>

<Terminal
	command="git checkout -b my-experiment"
	output="Switched to a new branch 'my-experiment'"
	title="Create and switch to a new branch in one step"
/>

<Terminal
	command="git branch"
	output="  main
* my-experiment"
	title="List branches — the * shows your current branch"
/>

<Terminal
	command="git checkout main"
	output="Switched to branch 'main'"
	title="Switch back to main"
/>

<Terminal
	command="git merge my-experiment"
	output="Updating 9c1e8d2..3a2f1b4
Fast-forward
 experiment.txt | 3 +++
 1 file changed, 3 insertions(+)"
	title="Merge your branch back into main"
/>

<Terminal
	command="git branch -d my-experiment"
	output="Deleted branch my-experiment (was 3a2f1b4)."
	title="Clean up the branch when done"
/>

<Callout type="tip">
	<p>Get in the habit of creating a branch for every new feature or experiment, no matter how small. It costs almost nothing and saves you from many painful situations.</p>
</Callout>

<h2>Going back — undoing things</h2>

<p>One of the most valuable things Git gives you is a reliable "undo" for your project.</p>

<div class="overflow-x-auto my-6">
<table class="w-full text-sm border-collapse">
	<thead>
		<tr class="border-b border-gray-200">
			<th class="text-left py-2 pr-6 font-semibold text-gray-700">Situation</th>
			<th class="text-left py-2 font-semibold text-gray-700">Command</th>
		</tr>
	</thead>
	<tbody class="divide-y divide-gray-100">
		<tr><td class="py-2 pr-6 text-gray-600">Discard changes to a file (not staged)</td><td class="py-2 font-mono text-xs text-gray-700">git restore filename</td></tr>
		<tr><td class="py-2 pr-6 text-gray-600">Unstage a file</td><td class="py-2 font-mono text-xs text-gray-700">git restore --staged filename</td></tr>
		<tr><td class="py-2 pr-6 text-gray-600">Undo the last commit (keep changes)</td><td class="py-2 font-mono text-xs text-gray-700">git reset --soft HEAD~1</td></tr>
		<tr><td class="py-2 pr-6 text-gray-600">Safely revert a past commit</td><td class="py-2 font-mono text-xs text-gray-700">git revert &lt;commit-hash&gt;</td></tr>
		<tr><td class="py-2 pr-6 text-gray-600">See what commit you had 5 steps ago</td><td class="py-2 font-mono text-xs text-gray-700">git log --oneline</td></tr>
	</tbody>
</table>
</div>

<Callout type="warning">
	<p><code>git reset --hard</code> discards changes permanently. Use <code>git reset --soft</code> to undo a commit while keeping your file changes safe.</p>
</Callout>

<h2>Hands-on practice session</h2>

<p>Run through this sequence in your <code>~/dev/my-first-test-project</code> folder. Each step builds on the last.</p>

<Terminal
	command={`# Start fresh in your project folder
cd ~/dev/my-first-test-project

# Check current state
git status

# Create a file
echo "# My Project" > README.md

# Stage it
git add README.md

# Commit it
git commit -m "Add README"

# Create a branch
git checkout -b add-notes

# Make a change on the branch
echo "Some notes here" > notes.txt
git add notes.txt
git commit -m "Add notes file"

# View your history
git log --oneline --graph --all

# Merge back to main
git checkout main
git merge add-notes

# Clean up
git branch -d add-notes`}
	title="Full practice session"
/>

<h2>Git GUI clients for Mac</h2>

<p>Command-line Git is powerful, but a visual interface makes it much easier to understand what's happening — especially when branching and merging. These three are the best options for Mac:</p>

<div class="grid gap-4 my-6 sm:grid-cols-3">
	<div class="border border-gray-200 rounded-xl p-4">
		<div class="font-semibold text-gray-800 mb-1">Tower</div>
		<div class="text-xs text-gray-500 mb-2">Paid ($69/yr)</div>
		<p class="text-sm text-gray-600">The most polished Git client on Mac. Drag-and-drop merging, beautiful branch visualisation, built-in conflict resolver. Best overall pick.</p>
	</div>
	<div class="border border-gray-200 rounded-xl p-4">
		<div class="font-semibold text-gray-800 mb-1">GitKraken</div>
		<div class="text-xs text-gray-500 mb-2">Freemium</div>
		<p class="text-sm text-gray-600">Visually striking, works on Mac/Windows/Linux. Great for teams. Integrates with GitHub, GitLab, Jira. Undo/Redo button is genuinely useful.</p>
	</div>
	<div class="border border-gray-200 rounded-xl p-4">
		<div class="font-semibold text-gray-800 mb-1">Sourcetree</div>
		<div class="text-xs text-gray-500 mb-2">Free</div>
		<p class="text-sm text-gray-600">Built by Atlassian. Solid, reliable, completely free. Good visualisation and covers all the basics well. Best free option.</p>
	</div>
</div>

<p>You don't have to pick one right now. The command line is always there and always works. GUIs make certain things easier — especially reviewing diffs and managing branches visually.</p>

<h2>Quick reference card</h2>

<p>Here's a printable one-page Git cheat sheet covering all the commands above plus a few extras.</p>

<a
	href="{base}/git-reference"
	target="_blank"
	class="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
>
	<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
	Open Git Quick Reference
</a>

</ModuleLayout>
