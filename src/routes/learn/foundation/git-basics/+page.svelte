<script lang="ts">
	import { base } from '$app/paths';
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import ClaudePrompt from '$lib/components/ClaudePrompt.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
	import GitRailwayBanner from '$lib/components/GitRailwayBanner.svelte';

	let gitGroup = $state({ active: 'repository' });
</script>

<ModuleLayout
	moduleId="git-basics"
	title="Git Basics"
	description="What Git is, why it exists, and the six ideas you actually need"
	estimatedMinutes={6}
>

<GitRailwayBanner />

<h2>The problem Git solves</h2>

<p>Before we talk about Git, let's talk about the problem it solves — because you've almost certainly lived it.</p>

<p>You're working on something. You make changes. Something breaks. You try to undo it, but you can't quite remember what it looked like before. You hit Ctrl+Z forty times. Sometimes you get back to the good version. Often you don't.</p>

<p>Or maybe you've seen a folder like this:</p>

<div class="bg-gray-50 rounded-lg p-4 font-mono text-sm my-4 space-y-1">
	<p class="text-gray-600">essay.docx</p>
	<p class="text-gray-600">essay_v2.docx</p>
	<p class="text-gray-600">essay_FINAL.docx</p>
	<p class="text-gray-600">essay_FINAL_v2.docx</p>
	<p class="text-gray-600">essay_FINAL_USE_THIS_ONE.docx</p>
</div>

<p>This is what happens when you try to manage versions by hand. It half-works, but it's exhausting and you always lose something eventually.</p>

<p><strong>Git is a tool that solves this automatically.</strong> It watches your project folder and lets you take named snapshots whenever you want. You can go back to any snapshot at any time. You can work on two different versions in parallel and combine them later. And it keeps every snapshot forever — nothing is ever truly lost.</p>

<p>That's the whole idea. Everything else is just details.</p>

<Callout type="tip">
	<p>If you already use Git comfortably, mark this complete and move on. If you've never touched it, read on — five minutes from now you'll understand what's happening every time Claude Code talks about commits, branches, and pushes.</p>
</Callout>

<h2>What is Git, exactly?</h2>

<p>Git is software that runs on your computer invisibly — there's no window or icon. It runs in the background, tracking changes inside a folder you tell it to watch.</p>

<p>When Git is watching a folder, that folder is called a <strong>repository</strong> (or "repo"). Inside the repo, there's a hidden folder called <code>.git</code> — that's where Git stores every snapshot you've ever saved. You never touch it directly. Git manages it for you.</p>

<p>One important distinction: <strong>Git</strong> is the tool; <strong>GitHub</strong> is a website. GitHub stores copies of Git repositories online so you can back them up, share them, and collaborate with others. Git can exist without GitHub. Most people use them together.</p>

<p>Almost every software project in the world uses Git. PAI's own code lives in a Git repository on GitHub. The project you'll clone to install PAI is a Git repository. Once you understand the six concepts below, all of that will make immediate sense.</p>

<h2>The six concepts</h2>

<div class="space-y-2 my-8">

	<Accordion number={1} title="Repository" subtitle="The project folder Git is watching" defaultOpen={true} group={gitGroup} id="repository">
		<DiagramImage
			src="git/git-repository.png"
			alt="A BBC Hitchhiker's Guide to the Galaxy style illustration of a friendly alien standing at a railway goods shed filled with glowing snapshot globes, representing a git repository"
			caption="A repository: every save, kept forever"
		/>
		<p class="text-sm text-gray-600 mb-3">A <strong>repository</strong> (or "repo") is just a project folder that Git is tracking. Inside it, there's a hidden folder called <code>.git</code> where Git stores every snapshot you've ever made — the complete history of the project.</p>
		<p class="text-sm text-gray-600 mb-0">When someone says "check the repo" or "open the repo," they mean: open the project folder. The history comes along automatically.</p>
	</Accordion>

	<Accordion number={2} title="Clone" subtitle="Getting a project onto your machine" group={gitGroup} id="clone">
		<DiagramImage
			src="git/git-clone.png"
			alt="A BBC Hitchhiker's Guide to the Galaxy style illustration of a friendly alien operating a duplicating machine with railway tracks, copying a project from a GitHub cloud station to a local workbench"
			caption="Clone: download the whole project — files and all its history"
		/>
		<p class="text-sm text-gray-600 mb-3">When someone shares a project on GitHub, you <strong>clone</strong> it to get your own copy on your computer. It downloads every file and the entire history in one go. This is how you'll get PAI — by cloning its repository.</p>
		<p class="text-sm text-gray-600 mb-3">You've probably never done this before, and that's fine. The next lesson walks through installation step by step. For now, just know what the word means: <em>clone = give me a complete copy of this project.</em></p>
		<ClaudePrompt
			prompt="clone the PAI repository"
			response="I'll clone it for you.
git clone https://github.com/danielmiessler/Personal_AI_Infrastructure.git
Cloning into 'Personal_AI_Infrastructure'... done."
			title="Claude Code handles it"
		/>
	</Accordion>

	<Accordion number={3} title="Commit" subtitle="Saving a snapshot of your work" group={gitGroup} id="commit">
		<DiagramImage
			src="git/git-commit.png"
			alt="A BBC Hitchhiker's Guide to the Galaxy style illustration of a friendly alien in a station master uniform stamping a document at a railway timeline with glowing snapshot globes at each stop"
			caption="Each commit is a named snapshot. You can jump back to any of them."
		/>
		<p class="text-sm text-gray-600 mb-3">A <strong>commit</strong> is a snapshot. It captures every file in your project at that exact moment, with a short message describing what changed. Think of it as pressing Save — except instead of overwriting the old version, Git keeps it. You can have thousands of commits and return to any of them.</p>
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
		<ClaudePrompt
			prompt="commit my changes"
			response="I'll review what changed and create a commit.

Looking at your changes... you've updated the homepage copy
and fixed two broken links.

git add src/pages/index.html src/pages/about.html
git commit -m &quot;Update homepage copy and fix broken links&quot;

Done. Changes committed."
			title="Claude Code writes good commit messages for you"
		/>
	</Accordion>

	<Accordion number={4} title="Branch" subtitle="A safe space to experiment" group={gitGroup} id="branch">
		<DiagramImage
			src="git/git-branch.png"
			alt="A BBC Hitchhiker's Guide to the Galaxy style illustration of a friendly alien at a railway junction switch, enthusiastically pointing at the branching track with an inspired expression"
			caption="A branch: work on something new without touching the safe main track"
		/>
		<p class="text-sm text-gray-600 mb-3">Imagine you want to try a completely different approach to something, but you're not sure if it'll work. You don't want to wreck what you have. A <strong>branch</strong> is a copy of your project that you work on separately — like having two versions open in parallel. If the new approach works, you merge it back. If not, you throw it away and nothing is lost.</p>
		<p class="text-sm text-gray-600 mb-3">Every project has a main branch (usually called <code>main</code>). That's the "official" version. New work branches off from it, gets tested, then merges back in.</p>
		<ClaudePrompt
			prompt="create a branch for the new feature"
			response="I'll create a new branch for you.
git checkout -b add-search-feature
Switched to a new branch 'add-search-feature'

You're now working on the new branch.
Any changes you make won't affect main."
			title="Branches keep your work safe"
		/>
	</Accordion>

	<Accordion number={5} title="Push & Pull" subtitle="Syncing with GitHub" group={gitGroup} id="push-pull">
		<DiagramImage
			src="git/git-push-pull.png"
			alt="A BBC Hitchhiker's Guide to the Galaxy style illustration of two friendly aliens on a two-level railway — one pushing cargo up to a GitHub cloud station, one pulling cargo down to a laptop"
			caption="Push sends your commits up; pull brings new commits down"
		/>
		<p class="text-sm text-gray-600 mb-3"><strong>Push</strong> sends your commits from your computer up to GitHub. <strong>Pull</strong> brings other people's commits down to your computer. It's how you stay in sync.</p>
		<p class="text-sm text-gray-600 mb-3">If you're working alone, pushing is like backing up your work to the cloud. If you're on a team, push and pull constantly to share progress and stay current with everyone else's changes.</p>
		<ClaudePrompt
			prompt="push my changes to GitHub"
			response="Pushing your branch to GitHub...
git push origin add-search-feature
Done. Your changes are now on GitHub."
			title="Push to share, pull to sync"
		/>
	</Accordion>

	<Accordion number={6} title="Merge" subtitle="Bringing work together" group={gitGroup} id="merge">
		<DiagramImage
			src="git/git-merge.png"
			alt="A BBC Hitchhiker's Guide to the Galaxy style illustration of a friendly alien conductor raising both arms triumphantly as two railway tracks converge into one, with a green glowing merge node"
			caption="Merge: two tracks become one — the branch's work joins main"
		/>
		<p class="text-sm text-gray-600 mb-3">When your branch is ready, you <strong>merge</strong> it back into main. Git combines the changes from your branch with main. Most of the time it does this automatically. The tricky case is when two people changed the exact same line — then Git flags a <strong>conflict</strong> and asks you to decide which version to keep. Claude Code can help with that too.</p>
		<ClaudePrompt
			prompt="merge my branch into main"
			response="Switching to main and merging your branch.
git checkout main
git merge add-search-feature
Merge successful. Your search feature is now part of main.

Want me to delete the branch?"
			title="Claude Code can handle merge conflicts too"
		/>
	</Accordion>

</div>

<h2>That's genuinely all you need</h2>

<p>With these six concepts, you can have a real conversation with Claude Code about any Git operation. You don't need to remember whether it's <code>git checkout -b</code> or <code>git switch -c</code>. You just say what you want:</p>

<ul>
	<li><em>"Commit my work with a good message"</em></li>
	<li><em>"Create a branch for the redesign"</em></li>
	<li><em>"Push this to GitHub"</em></li>
	<li><em>"What changed since yesterday?"</em></li>
	<li><em>"Undo my last commit but keep the changes"</em></li>
</ul>

<p>Claude Code knows every Git command. Your job is knowing what you want to happen. Now you do.</p>

<Callout type="info">
	<p>If you want to go deeper into Git commands, we've put together a <a href="{base}/git-reference" target="_blank">quick reference card</a> with the most common ones. Completely optional — but useful if you're the kind of person who likes to understand what's happening under the hood.</p>
</Callout>

</ModuleLayout>
