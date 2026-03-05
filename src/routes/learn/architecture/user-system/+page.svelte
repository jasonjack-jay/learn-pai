<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
</script>
<ModuleLayout moduleId="user-system-split" title="USER/ vs SYSTEM/" description="How PAI keeps your customizations safe during upgrades" estimatedMinutes={6} nextSlug="architecture/algorithm">
<h2>Two worlds, cleanly separated</h2>
<p>Inside <code>~/.claude</code>, PAI maintains two directories that never interfere with each other:</p>
<p><strong>SYSTEM/</strong> contains PAI's core infrastructure — skills, hooks, the algorithm, security policies. When you upgrade PAI, this directory gets updated. You generally don't edit it directly.</p>
<p><strong>USER/</strong> contains everything that makes PAI <em>yours</em> — TELOS files, preferences, custom workflows, personal hooks. This directory is never touched during upgrades.</p>
<p>This separation means you can upgrade PAI fearlessly. Your customizations, your context, your personality — all preserved.</p>
</ModuleLayout>
