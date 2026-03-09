<script lang="ts">
	import { base } from '$app/paths';

	interface Props {
		src: string;
		alt: string;
		caption?: string;
	}

	let { src, alt, caption }: Props = $props();
</script>

<figure class="my-8">
	<img
		src="{base}/images/pai/{src}"
		{alt}
		class="w-full rounded-xl border border-gray-200 shadow-sm"
		loading="lazy"
	/>
	{#if caption}
		<figcaption class="text-center text-xs text-gray-400 mt-2">{caption}</figcaption>
	{/if}
</figure>
