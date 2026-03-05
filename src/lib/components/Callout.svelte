<script lang="ts">
	let { type = 'info', children }: { type?: 'info' | 'tip' | 'warning'; children: any } = $props();

	const styles = {
		info: { bg: 'var(--color-accent-light)', border: 'var(--color-accent)', icon: 'i', label: 'Note' },
		tip: { bg: 'var(--color-success-light)', border: 'var(--color-success)', icon: '✓', label: 'Tip' },
		warning: { bg: 'var(--color-warn-light)', border: 'var(--color-warn)', icon: '!', label: 'Heads up' }
	};

	const s = $derived(styles[type]);
</script>

<div class="rounded-xl p-4 my-6 border-l-4" style="background: {s.bg}; border-left-color: {s.border}">
	<p class="text-xs font-semibold uppercase tracking-wider mb-1" style="color: {s.border}">{s.label}</p>
	<div class="text-sm text-gray-700 leading-relaxed">
		{@render children()}
	</div>
</div>
