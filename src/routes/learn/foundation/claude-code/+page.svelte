<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';

	let ccGroup = $state({ active: 'trust' });
</script>

<ModuleLayout
	moduleId="claude-code"
	title="Installing Claude Code"
	description="Get Claude Code running in your terminal in under five minutes"
	estimatedMinutes={5}
	nextSlug="foundation/what-is-pai"
>

<h2>What is Claude Code?</h2>

<p>Claude Code is Anthropic's command-line tool for working with Claude directly in your terminal. It can read, edit, and execute files in your project — making it the engine that PAI runs on. Before installing PAI, you need Claude Code working.</p>

<Callout type="tip">
	<p>If you already have Claude Code installed, skip to the <strong>Verify it works</strong> section at the bottom.</p>
</Callout>

<h2>Install Claude Code</h2>

<p>Claude Code is updated frequently, so follow the official quickstart guide for the current installation steps:</p>

<p><strong><a href="https://code.claude.com/docs/en/quickstart" target="_blank" rel="noopener">Claude Code Quickstart Guide &rarr;</a></strong></p>

<p>Once installed, open your terminal, navigate to a project folder, and type <code>claude</code> to launch it.</p>

<h2>What to expect on first launch</h2>

<div class="space-y-2 my-8">

	<Accordion number={1} title="Trust your workspace" subtitle="Claude checks before accessing files" defaultOpen={true} group={ccGroup} id="trust">
		<DiagramImage
			src="claude-code/trust-prompt.png"
			alt="Claude Code workspace trust prompt — asks whether you trust this folder before granting read, edit, and execute access"
			caption="Claude asks you to confirm the workspace is safe before it reads or edits anything"
		/>
		<p class="text-sm text-gray-600 mb-3">On first launch in a folder, Claude Code asks if you trust it. This is a safety check — Claude will be able to read, edit, and execute files here. Select <strong>"Yes, I trust this folder"</strong> for your own projects.</p>
	</Accordion>

	<Accordion number={2} title="You're in" subtitle="The Claude Code welcome screen" group={ccGroup} id="welcome">
		<DiagramImage
			src="claude-code/welcome-screen.png"
			alt="Claude Code welcome screen showing the version number, model info, a pixel-art mascot, and a prompt cursor ready for input"
			caption="The welcome screen — you're ready to start talking to Claude"
		/>
		<p class="text-sm text-gray-600 mb-3">You'll see a welcome screen with your name, the active model, and a blinking cursor. That cursor is where you talk to Claude. Type a request in plain English and press Enter.</p>
	</Accordion>

</div>

<h2>Good to know</h2>

<h3>Choosing a model</h3>

<p>Type <code>/model</code> to switch between Claude models. Each has different speed, cost, and capability trade-offs.</p>

<DiagramImage
	src="claude-code/model-selector.png"
	alt="Claude Code model selector showing five options — Default (Sonnet 4.6), Sonnet 1M context, Opus, Opus 1M context, and Haiku — with pricing per million tokens"
	caption="The /model command lets you pick the right model for the job"
/>

<Callout type="tip">
	<p><strong>Sonnet</strong> (the default) is great for everyday tasks. Switch to <strong>Opus</strong> when you need deeper reasoning or complex multi-file work. <strong>Haiku</strong> is the fastest and cheapest for quick questions.</p>
</Callout>

<h3>The status line</h3>

<p>Below the main window you may see a status line — a compact dashboard showing context usage, model info, and session metadata. This is a PAI addition, not part of stock Claude Code.</p>

<DiagramImage
	src="claude-code/statusline.png"
	alt="Claude Code with a PAI status line beneath showing location, weather, model version, context usage bar, memory stats, and learning signals"
	caption="The PAI status line — your at-a-glance dashboard (you'll set this up after installing PAI)"
/>

<h2>Verify it works</h2>

<p>If you can run <code>claude</code> in your terminal and see the welcome screen, you're good. Try a quick test:</p>

<Terminal
	command="claude 'what is 2 + 2?'"
	output="2 + 2 = 4"
	title="Quick sanity check"
/>

<p>If that works, Claude Code is installed and authenticated. You're ready to install PAI.</p>

</ModuleLayout>
