<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
</script>

<ModuleLayout
	moduleId="prerequisites"
	title="Prerequisites"
	description="What you need before you start"
	estimatedMinutes={2}
>

<h2>Before You Begin</h2>

<p>A couple of things to know before diving in.</p>

<h3>1. This guide is written for Mac users</h3>

<p>This guide was written by a Mac user, for Mac users. If you're on Windows or Linux, you can absolutely still follow along — but be aware that some terminal commands will be different. When in doubt, ask Claude (or another AI) to translate a command for your operating system.</p>

<h3>2. You'll need a Claude subscription</h3>

<p>This guide assumes you have an active <a href="https://claude.ai/upgrade" target="_blank" rel="noopener">Claude subscription</a>. A <strong>Pro</strong> or <strong>Max</strong> plan will definitely work well. We're not sure whether the base free plan has enough capacity for heavy Claude Code usage — if you're on a free plan and running into limits, upgrading to Pro is the likely fix.</p>

</ModuleLayout>
