<script lang="ts">
	import { base } from '$app/paths';
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<ModuleLayout
	moduleId="terminal-basics"
	title="Terminal Basics"
	description="Get comfortable with the Mac terminal — the commands you need before anything else"
	estimatedMinutes={12}
	nextSlug="foundation/git-basics"
>

<h2>Why the terminal?</h2>

<p>The terminal is just a text-based way to talk to your Mac. Instead of clicking icons, you type commands. It sounds more intimidating than it is — once you know a handful of commands, it becomes the fastest tool you own.</p>

<p>PAI lives in the terminal. Git lives in the terminal. Most developer tools live in the terminal. This module gets you comfortable enough to move confidently before you install anything else.</p>

<Callout type="tip">
	<p>If you already know your way around the terminal, feel free to skim this module and mark it complete. The hands-on workspace setup at the end is still worth doing.</p>
</Callout>

<h2>Opening Terminal on Mac</h2>

<p>Press <strong>⌘ + Space</strong> to open Spotlight, type <strong>Terminal</strong>, and press Enter. That's it — you're in.</p>

<p>The default Terminal app works fine. But most developers switch to <strong>iTerm2</strong> (free, at <a href="https://iterm2.com" target="_blank" rel="noopener">iterm2.com</a>) — it adds tabs, split panes, search, and a hundred small improvements that add up over time. Worth installing now if you haven't.</p>

<Callout type="info">
	<p><strong>tmux</strong> is another option for power users — it lets you run multiple terminal sessions inside a single window and keep them alive even if you disconnect. You don't need it yet, but it's worth knowing it exists.</p>
</Callout>

<h2>Where am I? — <code>pwd</code></h2>

<p><code>pwd</code> stands for <strong>print working directory</strong>. It tells you exactly where you are in your Mac's file system right now. Run it any time you feel lost.</p>

<Terminal
	command="pwd"
	output="/Users/yourname"
	title="Terminal"
/>

<p>Your Mac's files are organised in a tree. <code>/</code> is the very root. <code>/Users/yourname</code> is your home folder — think of it as your personal space on the machine.</p>

<h2>What's here? — <code>ls</code></h2>

<p><code>ls</code> lists the contents of the current directory. It's the first thing you'll type whenever you land somewhere new.</p>

<Terminal
	command="ls"
	output="Desktop    Documents    Downloads    Movies    Music    Pictures"
	title="Terminal"
/>

<p>Add flags to get more information:</p>

<Terminal
	command="ls -la"
	output="total 0
drwxr-x---   8 yourname  staff   256 Mar  1 09:12 .
drwxr-xr-x   6 root      wheel   192 Jan 15 10:00 ..
-rw-r--r--   1 yourname  staff     0 Feb 20 14:33 .zshrc
drwx------   5 yourname  staff   160 Mar  5 11:45 Desktop
drwx------  12 yourname  staff   384 Mar  7 16:22 Documents
drwx------  48 yourname  staff  1536 Mar  8 08:01 Downloads"
	title="Terminal"
/>

<p>The <code>-l</code> flag gives a detailed list (permissions, size, date). The <code>-a</code> flag shows <em>all</em> files, including hidden ones. Notice those entries starting with a dot — that's what hidden files look like.</p>

<h2>Hidden files and dotfiles</h2>

<p>Files and folders whose names start with <code>.</code> are hidden from Finder by default. They're not secret — they're just configuration files that stay out of your way.</p>

<p>You'll encounter many of them as a developer:</p>

<div class="overflow-x-auto my-6">
<table class="w-full text-sm border-collapse">
	<thead>
		<tr class="border-b border-gray-200">
			<th class="text-left py-2 pr-6 font-semibold text-gray-700">File</th>
			<th class="text-left py-2 font-semibold text-gray-700">What it does</th>
		</tr>
	</thead>
	<tbody class="divide-y divide-gray-100">
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">.zshrc</td><td class="py-2 text-gray-600">Your shell settings — runs every time you open a terminal</td></tr>
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">.gitignore</td><td class="py-2 text-gray-600">Tells Git which files to ignore in a project</td></tr>
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">.env</td><td class="py-2 text-gray-600">Environment variables — API keys and secrets (never commit this)</td></tr>
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">.claude/</td><td class="py-2 text-gray-600">Where PAI lives — your entire AI configuration</td></tr>
	</tbody>
</table>
</div>

<h2>Moving around — <code>cd</code></h2>

<p><code>cd</code> stands for <strong>change directory</strong>. It's how you move through your file system.</p>

<Terminal
	command="cd Documents"
	title="Terminal"
/>

<p>A few essential <code>cd</code> patterns to memorise:</p>

<div class="overflow-x-auto my-6">
<table class="w-full text-sm border-collapse">
	<thead>
		<tr class="border-b border-gray-200">
			<th class="text-left py-2 pr-6 font-semibold text-gray-700">Command</th>
			<th class="text-left py-2 font-semibold text-gray-700">What it does</th>
		</tr>
	</thead>
	<tbody class="divide-y divide-gray-100">
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">cd dirname</td><td class="py-2 text-gray-600">Enter a directory</td></tr>
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">cd ..</td><td class="py-2 text-gray-600">Go up one level to the parent directory</td></tr>
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">cd ~</td><td class="py-2 text-gray-600">Jump to your home directory from anywhere</td></tr>
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">cd -</td><td class="py-2 text-gray-600">Return to the previous directory (like a Back button)</td></tr>
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">cd /</td><td class="py-2 text-gray-600">Go to the root of the file system</td></tr>
	</tbody>
</table>
</div>

<Callout type="tip">
	<p><strong>Tab completion</strong> is your best friend. Start typing a directory name and press <kbd>Tab</kbd> — the terminal will complete it for you. Press <kbd>Tab</kbd> twice to see all matches if there are multiple options. This saves enormous amounts of time and prevents typos.</p>
</Callout>

<h2>Creating directories — <code>mkdir</code></h2>

<p><code>mkdir</code> creates a new folder. It's the terminal equivalent of right-clicking → New Folder in Finder.</p>

<Terminal
	command="mkdir my-new-project"
	title="Terminal"
/>

<p>Use <code>mkdir -p</code> to create nested directories in one go, even if the parent doesn't exist yet:</p>

<Terminal
	command="mkdir -p projects/web/my-site"
	title="Terminal"
/>

<h2>Your first workspace — hands-on</h2>

<p>Let's build the directory structure you'll use throughout this course. Follow along in your terminal:</p>

<Terminal
	command="cd ~"
	output=""
	title="Step 1 — Go home"
/>

<Terminal
	command="mkdir dev"
	output=""
	title="Step 2 — Create your dev folder"
/>

<Terminal
	command="cd dev"
	output=""
	title="Step 3 — Enter it"
/>

<Terminal
	command="mkdir my-first-test-project"
	output=""
	title="Step 4 — Create a project folder"
/>

<Terminal
	command="cd my-first-test-project && pwd"
	output="/Users/yourname/dev/my-first-test-project"
	title="Step 5 — Enter it and confirm your location"
/>

<p>You now have a clean, dedicated space for everything you'll build. <code>~/dev</code> will be your go-to home for all projects.</p>

<h2>Other essential commands</h2>

<div class="overflow-x-auto my-6">
<table class="w-full text-sm border-collapse">
	<thead>
		<tr class="border-b border-gray-200">
			<th class="text-left py-2 pr-6 font-semibold text-gray-700">Command</th>
			<th class="text-left py-2 font-semibold text-gray-700">What it does</th>
		</tr>
	</thead>
	<tbody class="divide-y divide-gray-100">
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">clear</td><td class="py-2 text-gray-600">Clear the screen (or press ⌘K)</td></tr>
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">cat filename</td><td class="py-2 text-gray-600">Print the contents of a file to the screen</td></tr>
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">open .</td><td class="py-2 text-gray-600">Open the current directory in Finder</td></tr>
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">cp src dst</td><td class="py-2 text-gray-600">Copy a file from one place to another</td></tr>
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">mv src dst</td><td class="py-2 text-gray-600">Move or rename a file</td></tr>
		<tr><td class="py-2 pr-6 font-mono text-sm text-gray-700">history</td><td class="py-2 text-gray-600">See your recent commands (press ↑ to cycle through them)</td></tr>
	</tbody>
</table>
</div>

<Callout type="warning">
	<p><strong>Be careful with <code>rm</code></strong>. The <code>rm filename</code> command deletes files permanently — there's no Trash, no undo. Use it deliberately. Never run <code>rm -rf</code> unless you're completely certain what it will delete.</p>
</Callout>

<h2>Quick reference card</h2>

<p>We've put together a printable one-page cheat sheet with all the essential terminal commands. Open it, print it, or save it to your Desktop — it's useful to have nearby while you're getting started.</p>

<a
	href="{base}/terminal-reference"
	target="_blank"
	class="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
>
	<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
	Open Terminal Quick Reference
</a>

</ModuleLayout>
