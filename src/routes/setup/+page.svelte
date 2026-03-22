<script lang="ts">
	import { base } from '$app/paths';

	let copiedIndex = $state(-1);

	function copyVerify(text: string, index: number) {
		navigator.clipboard.writeText(text).then(() => {
			copiedIndex = index;
			setTimeout(() => copiedIndex = -1, 2000);
		});
	}

	const tools = [
		{
			name: 'Claude Code',
			description: 'AI coding assistant that runs in your terminal',
			url: 'https://code.claude.com/docs/en/quickstart',
			verify: 'claude --version',
			inClaudeCode: false
		},
		{
			name: 'Bun',
			description: 'Fast JavaScript runtime, bundler, and package manager',
			url: 'https://bun.com/docs/installation',
			verify: 'bun --version',
			inClaudeCode: false
		},
		{
			name: 'PAI (Personal AI Infrastructure)',
			description: 'Persistent, learning AI layer on top of Claude Code',
			url: 'https://github.com/danielmiessler/Personal_AI_Infrastructure/tree/main/Releases',
			verify: 'ls ~/.claude/PAI/',
			inClaudeCode: false
		},
		{
			name: 'Superpowers',
			description: 'Structured development skills for Claude Code',
			url: 'https://github.com/obra/superpowers?tab=readme-ov-file#installation',
			verify: '/using-superpowers',
			inClaudeCode: true
		},
		{
			name: 'BMAD Method',
			description: 'AI-powered agile development agents. Install per-project — run in the folder you want to use it in.',
			url: 'https://docs.bmad-method.org/how-to/install-bmad/',
			verify: '/bmad-help',
			inClaudeCode: true
		}
	];
</script>

<div class="min-h-screen bg-white" style="font-family: 'Inter', system-ui, sans-serif;">

	<!-- Header -->
	<div class="print:hidden flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-gray-50">
		<div>
			<h1 class="text-lg font-semibold text-gray-900">Developer Setup</h1>
			<p class="text-sm text-gray-500">Get your AI tooling set up — consistent across the team</p>
		</div>
		<a
			href="{base}/"
			class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
			</svg>
			Back
		</a>
	</div>

	<!-- Content -->
	<div class="max-w-3xl mx-auto px-8 py-10">

		<div class="mb-8">
			<p class="text-gray-600 text-sm leading-relaxed">
				Install each tool in order. Click the link to follow the official installation guide, then run the verify command to confirm it's working.
			</p>
		</div>

		<div class="space-y-4">
			{#each tools as tool, i}
				<div class="rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors">
					<div class="flex items-start gap-4">
						<div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent-light); color: var(--color-accent)">
							{i + 1}
						</div>
						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-3 mb-1">
								<h3 class="font-semibold text-sm text-gray-900">{tool.name}</h3>
								<a
									href={tool.url}
									target="_blank"
									rel="noopener"
									class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-colors"
									style="background: var(--color-accent-light); color: var(--color-accent)"
								>
									Install guide
									<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
									</svg>
								</a>
							</div>
							<p class="text-sm text-gray-500 mb-3">{tool.description}</p>
							{#if tool.inClaudeCode}
								<div class="text-xs text-gray-400 mb-1">Type this inside Claude Code</div>
							{/if}
							<button
								onclick={() => copyVerify(tool.verify, i)}
								class="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 font-mono text-sm cursor-pointer hover:bg-gray-100 transition-colors text-left group"
								title="Copy to clipboard"
							>
								<span class="{tool.inClaudeCode ? 'text-blue-400' : 'text-green-600'}">{tool.inClaudeCode ? '›' : '$'}</span>
								<span class="text-gray-700 flex-1">{tool.verify}</span>
								{#if copiedIndex === i}
									<span class="flex items-center gap-1 text-xs text-green-500 font-sans">
										<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
										Copied!
									</span>
								{:else}
									<span class="flex items-center gap-1 text-xs text-gray-400 font-sans opacity-0 group-hover:opacity-100 transition-opacity">
										<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
										Copy
									</span>
								{/if}
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-8 p-5 rounded-xl border border-gray-200 bg-gray-50">
			<h3 class="text-sm font-semibold text-gray-800 mb-2">All set?</h3>
			<p class="text-sm text-gray-600">
				Once everything is installed, start Claude Code in any project directory with <code class="px-1.5 py-0.5 bg-white rounded text-xs font-mono border border-gray-200">claude</code> and you're ready to go. For deeper learning, head back and choose the <strong>Learn to Vibe Code</strong> or <strong>Learn PAI</strong> path.
			</p>
		</div>

		<p class="text-xs text-gray-400 mt-8">Learn PAI — Personal AI Infrastructure</p>
	</div>
</div>
