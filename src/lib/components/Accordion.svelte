<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		number?: number;
		defaultOpen?: boolean;
		group?: { active: string | null };
		id?: string;
	}

	let { title, subtitle, number, defaultOpen = false, group, id, children }: Props & { children: any } = $props();

	let localOpen = $state(false);

	$effect(() => {
		if (defaultOpen && group && id) {
			group.active = id;
		} else if (defaultOpen) {
			localOpen = true;
		}
	});

	let open = $derived(group && id ? group.active === id : localOpen);

	let el: HTMLDivElement;

	function toggle() {
		const wasOpen = open;
		if (group && id) {
			group.active = group.active === id ? null : id;
		} else {
			localOpen = !localOpen;
		}
		if (!wasOpen) {
			requestAnimationFrame(() => {
				el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			});
		}
	}
</script>

<div class="bg-white rounded-xl border border-gray-200 overflow-hidden my-4 scroll-mt-4" bind:this={el}>
	<button
		class="w-full flex items-center gap-3 p-5 text-left cursor-pointer hover:bg-gray-50 transition-colors"
		onclick={toggle}
		aria-expanded={open}
	>
		{#if number !== undefined}
			<span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background: var(--color-accent); color: white">{number}</span>
		{/if}
		<div class="flex-1 min-w-0">
			<h3 class="text-base font-semibold m-0" style="color: var(--color-ink)">{title}</h3>
			{#if subtitle}
				<p class="text-sm text-gray-500 m-0">{subtitle}</p>
			{/if}
		</div>
		<svg
			class="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200"
			class:rotate-180={open}
			fill="none" stroke="currentColor" viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>
	{#if open}
		<div class="px-5 pb-5 border-t border-gray-100">
			{@render children()}
		</div>
	{/if}
</div>
