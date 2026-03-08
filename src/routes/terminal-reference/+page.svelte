<script lang="ts">
	function printPage() {
		window.print();
	}
</script>

<div class="min-h-screen bg-white" style="font-family: 'Inter', system-ui, sans-serif;">

	<!-- Print button — hidden when printing -->
	<div class="print:hidden flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-gray-50">
		<div>
			<h1 class="text-lg font-semibold text-gray-900">Terminal Quick Reference</h1>
			<p class="text-sm text-gray-500">Print this or save as PDF — keep it handy while you learn</p>
		</div>
		<button
			onclick={printPage}
			class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
			style="background: #2563eb"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
			</svg>
			Print / Save as PDF
		</button>
	</div>

	<!-- Reference content -->
	<div class="max-w-4xl mx-auto px-8 py-8 print:px-6 print:py-4">

		<div class="print:block hidden mb-6">
			<h1 class="text-2xl font-bold text-gray-900">Terminal Quick Reference</h1>
			<p class="text-sm text-gray-500 mt-1"> — Mac Terminal Essentials</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 print:grid-cols-2">

			<!-- Navigation -->
			<section class="break-inside-avoid">
				<h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">Navigation</h2>
				<table class="w-full text-sm">
					<tbody class="divide-y divide-gray-100">
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">pwd</td><td class="py-1.5 text-gray-600">Show current directory</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">ls</td><td class="py-1.5 text-gray-600">List files and folders</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">ls -la</td><td class="py-1.5 text-gray-600">List all, including hidden files</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">cd dirname</td><td class="py-1.5 text-gray-600">Enter a directory</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">cd ..</td><td class="py-1.5 text-gray-600">Go up one level</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">cd ~</td><td class="py-1.5 text-gray-600">Go to home directory</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">cd -</td><td class="py-1.5 text-gray-600">Go to previous directory</td></tr>
					</tbody>
				</table>
			</section>

			<!-- Files & Folders -->
			<section class="break-inside-avoid">
				<h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">Files & Folders</h2>
				<table class="w-full text-sm">
					<tbody class="divide-y divide-gray-100">
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">mkdir name</td><td class="py-1.5 text-gray-600">Create a directory</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">mkdir -p a/b/c</td><td class="py-1.5 text-gray-600">Create nested directories</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">cat file</td><td class="py-1.5 text-gray-600">Print file contents</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">cp src dst</td><td class="py-1.5 text-gray-600">Copy a file</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">mv src dst</td><td class="py-1.5 text-gray-600">Move or rename a file</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">rm file</td><td class="py-1.5 text-gray-600 text-orange-600 font-medium">Delete file — permanent, no undo</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">rm -r folder</td><td class="py-1.5 text-orange-600 font-medium">Delete folder recursively</td></tr>
					</tbody>
				</table>
			</section>

			<!-- Utilities -->
			<section class="break-inside-avoid">
				<h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">Utilities</h2>
				<table class="w-full text-sm">
					<tbody class="divide-y divide-gray-100">
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">clear</td><td class="py-1.5 text-gray-600">Clear the screen (or ⌘K)</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">open .</td><td class="py-1.5 text-gray-600">Open current folder in Finder</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">open file</td><td class="py-1.5 text-gray-600">Open a file with its default app</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">history</td><td class="py-1.5 text-gray-600">Show recent commands</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">↑ / ↓</td><td class="py-1.5 text-gray-600">Cycle through command history</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">Tab</td><td class="py-1.5 text-gray-600">Autocomplete file/folder names</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">Ctrl + C</td><td class="py-1.5 text-gray-600">Stop a running command</td></tr>
					</tbody>
				</table>
			</section>

			<!-- Tips -->
			<section class="break-inside-avoid">
				<h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">Tips & Tricks</h2>
				<table class="w-full text-sm">
					<tbody class="divide-y divide-gray-100">
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">~</td><td class="py-1.5 text-gray-600">Shortcut for your home folder</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">.</td><td class="py-1.5 text-gray-600">The current directory</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">..</td><td class="py-1.5 text-gray-600">The parent directory</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">cmd1 && cmd2</td><td class="py-1.5 text-gray-600">Run cmd2 only if cmd1 succeeds</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">ls -lh</td><td class="py-1.5 text-gray-600">Human-readable file sizes</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">man command</td><td class="py-1.5 text-gray-600">Read the manual for any command</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 whitespace-nowrap">.zshrc</td><td class="py-1.5 text-gray-600">Your shell config — runs on startup</td></tr>
					</tbody>
				</table>
			</section>

		</div>

		<!-- Workspace setup reminder -->
		<div class="mt-6 p-4 rounded-xl border border-gray-200 bg-gray-50 print:border print:border-gray-300 break-inside-avoid">
			<h3 class="text-sm font-semibold text-gray-800 mb-2">Your dev workspace setup</h3>
			<div class="font-mono text-sm text-gray-700 space-y-1">
				<div><span class="text-green-600">$</span> mkdir ~/dev</div>
				<div><span class="text-green-600">$</span> cd ~/dev</div>
				<div><span class="text-green-600">$</span> mkdir my-first-test-project</div>
				<div><span class="text-green-600">$</span> cd my-first-test-project</div>
				<div><span class="text-green-600">$</span> pwd <span class="text-gray-400 font-sans">→ /Users/yourname/dev/my-first-test-project</span></div>
			</div>
		</div>

		<p class="text-xs text-gray-400 mt-6 print:mt-4">Learn PAI — Personal AI Infrastructure</p>
	</div>
</div>

<style>
	@media print {
		@page {
			size: A4;
			margin: 1.5cm;
		}
	}
</style>
