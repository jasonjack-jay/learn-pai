<script lang="ts">
	let { command = '', output = '', title = 'Terminal' }: { command?: string; output?: string; title?: string } = $props();
</script>

<div class="rounded-xl overflow-hidden my-6 border border-gray-800 shadow-lg">
	<div class="flex items-center gap-2 px-4 py-2.5 bg-gray-800">
		<div class="flex gap-1.5">
			<div class="w-3 h-3 rounded-full bg-red-500/80"></div>
			<div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
			<div class="w-3 h-3 rounded-full bg-green-500/80"></div>
		</div>
		<span class="text-xs text-gray-400 ml-2" style="font-family: var(--font-mono)">{title}</span>
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
