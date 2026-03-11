<script lang="ts">
	import { base } from '$app/paths';
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<ModuleLayout
	moduleId="terminal-basics"
	title="Terminal Basics"
	description="Get comfortable with the place where PAI lives"
	estimatedMinutes={7}
	nextSlug="foundation/git-basics"
>

<h2>Why the terminal matters</h2>

<p>PAI lives in the terminal. So does Claude Code. When you use PAI, you're typing in a terminal window — not clicking buttons in a web app. That's actually a good thing: text is fast, scriptable, and powerful in ways that GUIs can't match.</p>

<p>You don't need to become a terminal expert. You need to be comfortable enough to open it, get to the right place, and let Claude Code take over from there. That's what this lesson covers.</p>

<Callout type="tip">
	<p>If you already live in the terminal, mark this complete and move on. The only thing worth checking is the workspace setup at the end.</p>
</Callout>

<h2>Opening Terminal on Mac</h2>

<p>Press <strong>⌘ + Space</strong>, type <strong>Terminal</strong>, press Enter. You're in.</p>

<p>The built-in Terminal app works fine. Most developers eventually switch to <strong><a href="https://iterm2.com" target="_blank" rel="noopener">iTerm2</a></strong> (free) for tabs, split panes, and better search. Either one works for PAI.</p>

<h2>The four things you need to know</h2>

<div class="space-y-6 my-8">

	<div class="bg-white rounded-xl border border-gray-200 p-5">
		<div class="flex items-start gap-3 mb-3">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent); color: white">1</span>
			<div>
				<h3 class="text-base font-semibold m-0" style="color: var(--color-ink)">Where am I?</h3>
				<p class="text-sm text-gray-500 m-0"><code>pwd</code> — print working directory</p>
			</div>
		</div>
		<p class="text-sm text-gray-600 mb-3">The terminal is always "in" a folder on your Mac. <code>pwd</code> tells you which one. When you first open Terminal, you'll be in your home folder.</p>
		<Terminal
			command="pwd"
			output="/Users/yourname"
			title="Terminal"
		/>
	</div>

	<div class="bg-white rounded-xl border border-gray-200 p-5">
		<div class="flex items-start gap-3 mb-3">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent); color: white">2</span>
			<div>
				<h3 class="text-base font-semibold m-0" style="color: var(--color-ink)">What's in this folder?</h3>
				<p class="text-sm text-gray-500 m-0"><code>ls</code> — list contents</p>
			</div>
		</div>
		<p class="text-sm text-gray-600 mb-3"><code>ls</code> shows you what's in the current folder. It's like opening a Finder window but faster.</p>
		<Terminal
			command="ls"
			output="Desktop    Documents    Downloads    Movies    Music    Pictures"
			title="Terminal"
		/>
	</div>

	<div class="bg-white rounded-xl border border-gray-200 p-5">
		<div class="flex items-start gap-3 mb-3">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent); color: white">3</span>
			<div>
				<h3 class="text-base font-semibold m-0" style="color: var(--color-ink)">Move to a different folder</h3>
				<p class="text-sm text-gray-500 m-0"><code>cd</code> — change directory</p>
			</div>
		</div>
		<p class="text-sm text-gray-600 mb-3"><code>cd</code> moves you into a folder. <code>cd ..</code> goes back up one level. <code>cd ~</code> takes you home from anywhere. That's the whole mental model.</p>
		<Terminal
			command="cd Documents"
			title="Go into Documents"
		/>
		<Terminal
			command="cd .."
			title="Go back up"
		/>
		<Callout type="tip">
			<p><strong>Tab completion</strong> is your best friend. Start typing a folder name and press <kbd>Tab</kbd> — the terminal will finish it for you. This saves enormous time and prevents typos.</p>
		</Callout>
	</div>

	<div class="bg-white rounded-xl border border-gray-200 p-5">
		<div class="flex items-start gap-3 mb-3">
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent); color: white">4</span>
			<div>
				<h3 class="text-base font-semibold m-0" style="color: var(--color-ink)">Create a folder</h3>
				<p class="text-sm text-gray-500 m-0"><code>mkdir</code> — make directory</p>
			</div>
		</div>
		<p class="text-sm text-gray-600 mb-0"><code>mkdir foldername</code> creates a new folder. That's the terminal equivalent of right-clicking in Finder and choosing "New Folder."</p>
	</div>

</div>

<p>That's it. <code>pwd</code>, <code>ls</code>, <code>cd</code>, <code>mkdir</code>. With these four commands you can navigate your Mac, get into any project folder, and launch Claude Code. For everything else — copying files, searching, installing software — you can ask Claude Code.</p>

<h2>Hidden files and the <code>.claude</code> folder</h2>

<p>Files and folders starting with a <code>.</code> are hidden by default. You won't see them in Finder, but they're important. PAI's entire configuration lives in one:</p>

<Terminal
	command="ls -a ~"
	output="...  .claude  .gitconfig  .zshrc  Desktop  Documents  ..."
	title="The -a flag shows hidden files"
/>

<p>That <code>.claude</code> folder is where PAI will live — your TELOS files, your skills, your preferences. You'll learn all about it in the installation module. For now, just know that hidden files exist and aren't anything mysterious.</p>

<h2>Set up your workspace</h2>

<p>Before moving on, let's create a tidy home for your projects. Run these three commands:</p>

<Terminal
	command={`cd ~
mkdir -p dev
cd dev && pwd`}
	output="/Users/yourname/dev"
	title="Create your dev folder"
/>

<p>From now on, <code>~/dev</code> is your go-to folder for projects. When you clone PAI later, it'll go here. When you start new projects, they'll go here. One clean, predictable place.</p>

<Callout type="info">
	<p>Want a deeper reference for terminal commands? We have an optional <a href="{base}/terminal-reference" target="_blank">quick reference card</a> you can print or bookmark. It's there if you need it, but you won't need it often — Claude Code can help with any command you can't remember.</p>
</Callout>

</ModuleLayout>
