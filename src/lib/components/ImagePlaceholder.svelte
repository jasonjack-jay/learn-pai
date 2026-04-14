<script lang="ts">
	let {
		description,
		size = 'medium'
	}: { description: string; size?: 'small' | 'medium' | 'large' } = $props();

	const heights = {
		small: 'min-h-[160px]',
		medium: 'min-h-[240px]',
		large: 'min-h-[400px]'
	};
</script>

<figure
	class="my-6 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center {heights[size]}"
	style="border-color: #c7d2fe; background: repeating-linear-gradient(45deg, #f5f3ff, #f5f3ff 8px, #faf5ff 8px, #faf5ff 16px)"
>
	<span
		class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-3"
		style="background: #e0e7ff; color: #4338ca"
	>
		<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
		</svg>
		Image placeholder
	</span>
	<figcaption class="text-sm max-w-xl leading-relaxed" style="color: #4338ca">
		{description}
	</figcaption>
</figure>
