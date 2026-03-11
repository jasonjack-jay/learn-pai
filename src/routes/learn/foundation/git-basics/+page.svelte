<script lang="ts">
	import { base } from '$app/paths';
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<ModuleLayout
	moduleId="git-basics"
	title="Git Basics"
	description="The six concepts you need — Claude Code handles the rest"
	estimatedMinutes={6}
	nextSlug="foundation/what-is-pai"
>

<h2>You don't need to learn Git commands</h2>

<p>That might sound strange in a lesson called "Git Basics." But here's the thing: PAI runs on Claude Code, and Claude Code is <em>excellent</em> at Git. It can commit your work, create branches, push to GitHub, resolve conflicts — all of it. You just need to know enough to tell it what you want.</p>

<p>That means understanding <strong>six concepts</strong>. Not commands, not flags, not syntax. Just the ideas.</p>

<Callout type="tip">
	<p>If you already use Git, skip ahead and mark this complete. If you've never touched it, this will take about five minutes and you'll be ready for everything that follows.</p>
</Callout>

<h2>What is Git?</h2>

<p>Git is a system that takes <strong>snapshots</strong> of your project over time. Every snapshot records what every file looked like at that moment. You can go back to any snapshot, compare them, or branch off in a different direction. It's like an unlimited undo history for your entire project.</p>

<p>Almost every software project in the world uses Git. PAI's own code lives in a Git repository. The project you'll clone to install PAI is a Git repository. It's everywhere.</p>

<h2>The six concepts</h2>

<div class="space-y-6 my-8">

	<div class="bg-white rounded-xl border border-gray-200 p-5">
		<div class="flex items-start gap-3 mb-3">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent); color: white">1</span>
			<div>
				<h3 class="text-base font-semibold m-0" style="color: var(--color-ink)">Clone</h3>
				<p class="text-sm text-gray-500 m-0">Getting a project onto your machine</p>
			</div>
		</div>
		<p class="text-sm text-gray-600 mb-3">When someone shares a project on GitHub, you <strong>clone</strong> it to get your own copy on your computer. It downloads all the files and their entire history. This is how you'll get PAI — by cloning its repository.</p>
		<Terminal
			command="Ask Claude Code: clone the PAI repository"
			output="I'll clone it for you.
git clone https://github.com/danielmiessler/Personal_AI_Infrastructure.git
Cloning into 'Personal_AI_Infrastructure'... done."
			title="Claude Code handles it"
		/>
	</div>

	<div class="bg-white rounded-xl border border-gray-200 p-5">
		<div class="flex items-start gap-3 mb-3">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent); color: white">2</span>
			<div>
				<h3 class="text-base font-semibold m-0" style="color: var(--color-ink)">Commit</h3>
				<p class="text-sm text-gray-500 m-0">Saving a snapshot of your work</p>
			</div>
		</div>
		<p class="text-sm text-gray-600 mb-3">A <strong>commit</strong> is a snapshot. It captures the state of your project at a specific moment, with a short message explaining what changed. Think of it as pressing "Save" — except you can always go back to any previous save.</p>
		<p class="text-sm text-gray-600 mb-3">The message matters. A good commit message completes the sentence: <em>"If applied, this commit will…"</em></p>
		<div class="grid grid-cols-2 gap-3 text-sm my-3">
			<div class="bg-red-50 rounded-lg p-3">
				<p class="font-medium text-red-700 text-xs mb-1">Unhelpful</p>
				<p class="font-mono text-xs text-red-600">fix stuff</p>
				<p class="font-mono text-xs text-red-600">update</p>
				<p class="font-mono text-xs text-red-600">wip</p>
			</div>
			<div class="bg-green-50 rounded-lg p-3">
				<p class="font-medium text-green-700 text-xs mb-1">Clear</p>
				<p class="font-mono text-xs text-green-600">Fix login crash with special chars</p>
				<p class="font-mono text-xs text-green-600">Add onboarding flow for new users</p>
				<p class="font-mono text-xs text-green-600">Remove deprecated API calls</p>
			</div>
		</div>
		<Terminal
			command="Ask Claude Code: commit my changes"
			output="I'll review what changed and create a commit.

Looking at your changes... you've updated the homepage copy
and fixed two broken links.

git add src/pages/index.html src/pages/about.html
git commit -m &quot;Update homepage copy and fix broken links&quot;

Done. Changes committed."
			title="Claude Code writes good commit messages for you"
		/>
	</div>

	<div class="bg-white rounded-xl border border-gray-200 p-5">
		<div class="flex items-start gap-3 mb-3">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent); color: white">3</span>
			<div>
				<h3 class="text-base font-semibold m-0" style="color: var(--color-ink)">Branch</h3>
				<p class="text-sm text-gray-500 m-0">A safe space to experiment</p>
			</div>
		</div>
		<p class="text-sm text-gray-600 mb-3">A <strong>branch</strong> is a parallel version of your project. You create one when you want to try something without risking your working code. If the experiment works, you merge it back. If it doesn't, you delete the branch and nothing is lost.</p>
		<p class="text-sm text-gray-600 mb-3">Every project has a main branch (usually called <code>main</code>). That's the "official" version. Everything else branches off from it.</p>
		<Terminal
			command="Ask Claude Code: create a branch for the new feature"
			output="I'll create a new branch for you.
git checkout -b add-search-feature
Switched to a new branch 'add-search-feature'

You're now working on the new branch.
Any changes you make won't affect main."
			title="Branches keep your work safe"
		/>
	</div>

	<div class="bg-white rounded-xl border border-gray-200 p-5">
		<div class="flex items-start gap-3 mb-3">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent); color: white">4</span>
			<div>
				<h3 class="text-base font-semibold m-0" style="color: var(--color-ink)">Push &amp; Pull</h3>
				<p class="text-sm text-gray-500 m-0">Syncing with GitHub</p>
			</div>
		</div>
		<p class="text-sm text-gray-600 mb-3"><strong>Push</strong> sends your commits from your computer up to GitHub (or wherever the project lives online). <strong>Pull</strong> brings other people's changes down to your computer. It's how you stay in sync.</p>
		<p class="text-sm text-gray-600 mb-3">If you're working alone, pushing is like backing up your work to the cloud. If you're on a team, it's how everyone shares progress.</p>
		<Terminal
			command="Ask Claude Code: push my changes to GitHub"
			output="Pushing your branch to GitHub...
git push origin add-search-feature
Done. Your changes are now on GitHub."
			title="Push to share, pull to sync"
		/>
	</div>

	<div class="bg-white rounded-xl border border-gray-200 p-5">
		<div class="flex items-start gap-3 mb-3">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent); color: white">5</span>
			<div>
				<h3 class="text-base font-semibold m-0" style="color: var(--color-ink)">Merge</h3>
				<p class="text-sm text-gray-500 m-0">Bringing work together</p>
			</div>
		</div>
		<p class="text-sm text-gray-600 mb-3">When your branch is ready, you <strong>merge</strong> it back into main. Git takes the changes from your branch and combines them with main. If two people changed the same line, Git will flag a <strong>conflict</strong> and ask you to decide which version to keep.</p>
		<Terminal
			command="Ask Claude Code: merge my branch into main"
			output="Switching to main and merging your branch.
git checkout main
git merge add-search-feature
Merge successful. Your search feature is now part of main.

Want me to delete the branch?"
			title="Claude Code can handle merge conflicts too"
		/>
	</div>

	<div class="bg-white rounded-xl border border-gray-200 p-5">
		<div class="flex items-start gap-3 mb-3">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent); color: white">6</span>
			<div>
				<h3 class="text-base font-semibold m-0" style="color: var(--color-ink)">Repository</h3>
				<p class="text-sm text-gray-500 m-0">The project itself</p>
			</div>
		</div>
		<p class="text-sm text-gray-600 mb-0">A <strong>repository</strong> (or "repo") is just a project folder that Git is tracking. It contains all your files plus the hidden <code>.git</code> folder where Git stores every snapshot you've ever made. When someone says "check the repo," they mean "look at the project."</p>
	</div>

</div>

<h2>That's genuinely all you need</h2>

<p>With these six concepts, you can have a conversation with Claude Code about any Git operation. You don't need to remember whether it's <code>git checkout -b</code> or <code>git switch -c</code>. You just say what you want:</p>

<ul>
	<li><em>"Commit my work with a good message"</em></li>
	<li><em>"Create a branch for the redesign"</em></li>
	<li><em>"Push this to GitHub"</em></li>
	<li><em>"What changed since yesterday?"</em></li>
	<li><em>"Undo my last commit but keep the changes"</em></li>
</ul>

<p>Claude Code knows every Git command. Your job is knowing what you want to happen. Now you do.</p>

<Callout type="info">
	<p>If you want to go deeper into Git commands, we've put together a <a href="{base}/git-reference" target="_blank">quick reference card</a> with the most common ones. It's completely optional — but useful if you're the kind of person who likes to understand what's happening under the hood.</p>
</Callout>

</ModuleLayout>
