<script lang="ts">
	import { base } from '$app/paths';
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';

	let termGroup = $state({ active: 'pwd' });
</script>

<ModuleLayout
	moduleId="terminal-basics"
	title="Terminal Basics"
	description="Get comfortable with the place where PAI lives"
	estimatedMinutes={7}
	nextSlug="foundation/git-basics"
>

<DiagramImage
	src="terminal/terminal-banner.png"
	alt="A cinematic scene inspired by 2001 A Space Odyssey — primitive apes emerging from their cave at dawn, crouching in awe before a towering dark terminal screen glowing with green phosphor text, reaching hesitantly towards it"
	caption="The dawn of the command line"
/>

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

<div class="space-y-2 my-8">

	<Accordion number={1} title="Where am I?" subtitle="pwd — print working directory" defaultOpen={true} group={termGroup} id="pwd">
		<DiagramImage
			src="terminal/terminal-pwd.png"
			alt="A comic book explorer with a magnifying glass standing on a glowing green file path on a retro CRT monitor with Matrix-style cascading code — representing the pwd command"
			caption="pwd tells you exactly where you are in the filesystem"
		/>
		<p class="text-sm text-gray-600 mb-3">The terminal is always "in" a folder on your Mac. <code>pwd</code> tells you which one. When you first open Terminal, you'll be in your home folder.</p>
		<Terminal
			command="pwd"
			output="/Users/yourname"
			title="Terminal"
		/>
	</Accordion>

	<Accordion number={2} title="What's in this folder?" subtitle="ls — list contents" group={termGroup} id="ls">
		<DiagramImage
			src="terminal/terminal-ls.png"
			alt="A comic book detective shining a flashlight on rows of glowing green folders on a retro CRT monitor with Matrix-style code — representing the ls command"
			caption="ls shines a light on everything in the current folder"
		/>
		<p class="text-sm text-gray-600 mb-3"><code>ls</code> shows you what's in the current folder. It's like opening a Finder window but faster.</p>
		<Terminal
			command="ls"
			output="Desktop    Documents    Downloads    Movies    Music    Pictures"
			title="Terminal"
		/>
	</Accordion>

	<Accordion number={3} title="Move to a different folder" subtitle="cd — change directory" group={termGroup} id="cd">
		<DiagramImage
			src="terminal/terminal-cd.png"
			alt="A comic book speedster dashing through a series of glowing green doorways labeled with folder names on a retro CRT monitor — representing the cd command"
			caption="cd lets you dash through the folder structure"
		/>
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
	</Accordion>

	<Accordion number={4} title="Create a folder" subtitle="mkdir — make directory" group={termGroup} id="mkdir">
		<DiagramImage
			src="terminal/terminal-mkdir.png"
			alt="A comic book builder with a hard hat constructing a new glowing green folder from digital bricks on a retro CRT monitor — representing the mkdir command"
			caption="mkdir builds brand new folders from nothing"
		/>
		<p class="text-sm text-gray-600 mb-0"><code>mkdir foldername</code> creates a new folder. That's the terminal equivalent of right-clicking in Finder and choosing "New Folder."</p>
	</Accordion>

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
	command="cd ~"
	title="Create your dev folder"
/>
<Terminal
	command="mkdir -p dev"
	title="Create your dev folder"
/>
<Terminal
	command="cd dev && pwd"
	output="/Users/yourname/dev"
	title="Create your dev folder"
/>

<p>From now on, <code>~/dev</code> is your go-to folder for projects. When you clone PAI later, it'll go here. When you start new projects, they'll go here. One clean, predictable place.</p>

<Callout type="info">
	<p>Want a deeper reference for terminal commands? We have an optional <a href="{base}/terminal-reference" target="_blank">quick reference card</a> you can print or bookmark. It's there if you need it, but you won't need it often — Claude Code can help with any command you can't remember.</p>
</Callout>

</ModuleLayout>
