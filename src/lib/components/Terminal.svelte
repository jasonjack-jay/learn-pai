<script lang="ts">
	let { command = '', output = '', title = 'Terminal' }: { command?: string; output?: string; title?: string } = $props();

	let copied = $state(false);

	function copyCommand() {
		if (!command) return;
		navigator.clipboard.writeText(command).then(() => {
			copied = true;
			setTimeout(() => copied = false, 2000);
		});
	}
</script>

<div class="rounded-xl overflow-hidden my-6 border border-gray-800 shadow-lg">
	<div class="flex items-center gap-2 px-4 py-2.5 bg-gray-800">
		<div class="flex gap-1.5">
			<div class="w-3 h-3 rounded-full bg-red-500/80"></div>
			<div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
			<div class="w-3 h-3 rounded-full bg-green-500/80"></div>
		</div>
		<span class="text-xs text-gray-400 ml-2 flex-1" style="font-family: var(--font-mono)">{title}</span>
		{#if command}
			<button
				onclick={copyCommand}
				class="flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all duration-200 {copied ? 'text-green-400 bg-green-400/10' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'}"
				title="Copy command"
			>
				{#if copied}
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
					</svg>
					<span>Copied!</span>
				{:else}
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
					</svg>
					<span>Copy</span>
				{/if}
			</button>
		{/if}
	</div>
	<div class="bg-gray-900 p-4 text-sm leading-relaxed" style="font-family: var(--font-mono)">
		{#if command}
			<div class="text-gray-300">
				<span class="text-green-400">$</span> {command}
			</div>
		{/if}
		{#if output}
			<div class="text-gray-500 mt-2 whitespace-pre-wrap">{output}</div>
		{/if}
	</div>
</div>
