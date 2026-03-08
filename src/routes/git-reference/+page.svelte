<script lang="ts">
	function printPage() {
		window.print();
	}
</script>

<div class="min-h-screen bg-white" style="font-family: 'Inter', system-ui, sans-serif;">

	<!-- Print button — hidden when printing -->
	<div class="print:hidden flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-gray-50">
		<div>
			<h1 class="text-lg font-semibold text-gray-900">Git Quick Reference</h1>
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
			<h1 class="text-2xl font-bold text-gray-900">Git Quick Reference</h1>
			<p class="text-sm text-gray-500 mt-1">learnpai.com — Git Essentials for Mac</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 print:grid-cols-2">

			<!-- Setup -->
			<section class="break-inside-avoid">
				<h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">Setup (one-time)</h2>
				<table class="w-full text-sm">
					<tbody class="divide-y divide-gray-100">
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git --version</td><td class="py-1.5 text-gray-600">Check Git is installed</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git config --global<br>  user.name "Name"</td><td class="py-1.5 text-gray-600">Set your name</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git config --global<br>  user.email "you@…"</td><td class="py-1.5 text-gray-600">Set your email</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git init</td><td class="py-1.5 text-gray-600">Start a new repo in current folder</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git clone &lt;url&gt;</td><td class="py-1.5 text-gray-600">Download an existing repo</td></tr>
					</tbody>
				</table>
			</section>

			<!-- Daily workflow -->
			<section class="break-inside-avoid">
				<h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">Daily Workflow</h2>
				<table class="w-full text-sm">
					<tbody class="divide-y divide-gray-100">
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git status</td><td class="py-1.5 text-gray-600">See what's changed</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git add file</td><td class="py-1.5 text-gray-600">Stage a specific file</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git add .</td><td class="py-1.5 text-gray-600">Stage all changes</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git commit -m "msg"</td><td class="py-1.5 text-gray-600">Commit with message</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git diff</td><td class="py-1.5 text-gray-600">See unstaged changes</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git diff --staged</td><td class="py-1.5 text-gray-600">See staged changes</td></tr>
					</tbody>
				</table>
			</section>

			<!-- Branches -->
			<section class="break-inside-avoid">
				<h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">Branches</h2>
				<table class="w-full text-sm">
					<tbody class="divide-y divide-gray-100">
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git branch</td><td class="py-1.5 text-gray-600">List local branches</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git checkout -b name</td><td class="py-1.5 text-gray-600">Create and switch to new branch</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git checkout name</td><td class="py-1.5 text-gray-600">Switch to an existing branch</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git merge name</td><td class="py-1.5 text-gray-600">Merge a branch into current branch</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git branch -d name</td><td class="py-1.5 text-gray-600">Delete a merged branch</td></tr>
					</tbody>
				</table>
			</section>

			<!-- History & Remote -->
			<section class="break-inside-avoid">
				<h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">History & Remote</h2>
				<table class="w-full text-sm">
					<tbody class="divide-y divide-gray-100">
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git log --oneline</td><td class="py-1.5 text-gray-600">Compact commit history</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git log --graph --all</td><td class="py-1.5 text-gray-600">Visual branch history</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git push origin main</td><td class="py-1.5 text-gray-600">Push commits to remote</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git pull</td><td class="py-1.5 text-gray-600">Fetch and merge remote changes</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git fetch</td><td class="py-1.5 text-gray-600">Download changes without merging</td></tr>
					</tbody>
				</table>
			</section>

			<!-- Undoing things -->
			<section class="break-inside-avoid">
				<h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">Undoing Things</h2>
				<table class="w-full text-sm">
					<tbody class="divide-y divide-gray-100">
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git restore file</td><td class="py-1.5 text-gray-600">Discard unstaged changes</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git restore --staged file</td><td class="py-1.5 text-gray-600">Unstage a file</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git reset --soft HEAD~1</td><td class="py-1.5 text-gray-600">Undo last commit, keep changes</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git revert &lt;hash&gt;</td><td class="py-1.5 text-gray-600">Safely undo a past commit</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git stash</td><td class="py-1.5 text-gray-600">Temporarily set aside changes</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-gray-800 text-xs whitespace-nowrap">git stash pop</td><td class="py-1.5 text-gray-600">Restore stashed changes</td></tr>
					</tbody>
				</table>
			</section>

			<!-- Good commit messages -->
			<section class="break-inside-avoid">
				<h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">Good Commit Messages</h2>
				<p class="text-xs text-gray-500 mb-3">Complete the sentence: <em>"If applied, this commit will…"</em></p>
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-gray-200">
							<th class="text-left pb-1.5 text-xs font-semibold text-gray-500">Avoid</th>
							<th class="text-left pb-1.5 text-xs font-semibold text-gray-700">Use instead</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						<tr><td class="py-1.5 pr-4 font-mono text-xs text-gray-400">fix stuff</td><td class="py-1.5 font-mono text-xs text-gray-700">Fix login crash on special chars</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-xs text-gray-400">update</td><td class="py-1.5 font-mono text-xs text-gray-700">Update homepage copy for new pricing</td></tr>
						<tr><td class="py-1.5 pr-4 font-mono text-xs text-gray-400">wip</td><td class="py-1.5 font-mono text-xs text-gray-700">Add draft onboarding flow (WIP)</td></tr>
					</tbody>
				</table>
			</section>

		</div>

		<!-- Core workflow reminder -->
		<div class="mt-6 p-4 rounded-xl border border-gray-200 bg-gray-50 print:border print:border-gray-300 break-inside-avoid">
			<h3 class="text-sm font-semibold text-gray-800 mb-3">Core workflow — Modify → Stage → Commit</h3>
			<div class="font-mono text-sm text-gray-700 space-y-1">
				<div><span class="text-green-600">$</span> git status <span class="text-gray-400 font-sans text-xs">← always check first</span></div>
				<div><span class="text-green-600">$</span> git add .</div>
				<div><span class="text-green-600">$</span> git commit -m <span class="text-orange-600">"Describe what and why"</span></div>
				<div class="mt-2"><span class="text-green-600">$</span> git checkout -b feature-name <span class="text-gray-400 font-sans text-xs">← new branch for each feature</span></div>
			</div>
		</div>

		<!-- GUI clients -->
		<div class="mt-4 p-4 rounded-xl border border-gray-200 bg-gray-50 print:border print:border-gray-300 break-inside-avoid">
			<h3 class="text-sm font-semibold text-gray-800 mb-2">Recommended GUI clients for Mac</h3>
			<div class="grid grid-cols-3 gap-3 text-xs text-gray-600">
				<div><strong class="text-gray-800">Tower</strong> — Best overall (paid, $69/yr). tower.app</div>
				<div><strong class="text-gray-800">GitKraken</strong> — Great for teams (freemium). gitkraken.com</div>
				<div><strong class="text-gray-800">Sourcetree</strong> — Free, by Atlassian. sourcetreeapp.com</div>
			</div>
		</div>

		<p class="text-xs text-gray-400 mt-6 print:mt-4">Learn PAI — Personal AI Infrastructure · learnpai.com</p>
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
