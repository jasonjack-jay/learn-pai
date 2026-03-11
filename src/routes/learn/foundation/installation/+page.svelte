<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
	import { getProfile } from '$lib/state.svelte';

	const profile = getProfile();
	// Determine next slug based on user's first chosen path
	const nextSlug = $derived(
		profile.interests.length > 0
			? profile.interests[0] === 'know-me' ? 'know-me/telos-intro'
			: profile.interests[0] === 'get-things-done' ? 'get-things-done/skills-overview'
			: 'architecture/nine-primitives'
			: null
	);
</script>

<ModuleLayout
	moduleId="installation"
	title="Installing PAI"
	description="Get PAI running on your machine step by step"
	estimatedMinutes={10}
	nextSlug={nextSlug}
>

<h2>Prerequisites</h2>

<p>Before installing PAI, you'll need a few things in place. The installer will check for these and offer to install what's missing, but here's what's needed:</p>

<DiagramImage src="pai-component-4-ai-installation.png" alt="AI-based installation process — PAI's intelligent setup" caption="PAI's AI-powered installation detects your environment and configures automatically" />

<p><strong>Claude Code</strong> — PAI runs on top of Claude Code, so you need it installed and authenticated. If you don't have it yet, visit <a href="https://claude.ai/code" target="_blank" rel="noopener">claude.ai/code</a>.</p>

<p><strong>Git</strong> — for cloning the repository. Most systems have this already.</p>

<p><strong>A terminal</strong> — macOS Terminal, iTerm2, or any Linux terminal. Windows is not currently supported (community contributions welcome).</p>

<Callout type="info">
	<p>PAI uses <strong>Bun</strong> as its runtime (faster than Node.js). The installer will handle this for you if it's not already installed.</p>
</Callout>

<h2>Step 1: Clone the repository</h2>

<Terminal
	command="git clone https://github.com/danielmiessler/Personal_AI_Infrastructure.git"
	output="Cloning into 'Personal_AI_Infrastructure'...
remote: Enumerating objects: done.
Receiving objects: 100%, done."
	title="Terminal"
/>

<h2>Step 2: Navigate to the latest release</h2>

<Terminal
	command="cd Personal_AI_Infrastructure/Releases/v4.0.3"
	title="Terminal"
/>

<h2>Step 3: Copy and run the installer</h2>

<Terminal
	command="cp -r .claude ~/ && cd ~/.claude && bash install.sh"
	output="🚀 PAI Installer v4.0.3
━━━━━━━━━━━━━━━━━━━━━
Detecting system... macOS detected
Checking prerequisites...
✓ Git installed
✓ Claude Code installed
✓ Bun installed

Let's personalize your PAI installation..."
	title="PAI Installer"
/>

<h2>Step 4: Personalization</h2>

<p>The installer will ask you a few questions to set up your environment:</p>

<p><strong>Your name</strong> — so PAI knows how to address you.</p>
<p><strong>Timezone</strong> — for scheduling and time-aware responses.</p>
<p><strong>Temperature units</strong> — Celsius or Fahrenheit.</p>
<p><strong>Voice setup (optional)</strong> — if you want PAI to speak to you, you'll need an ElevenLabs API key.</p>

<Callout type="tip">
	<p>You can always change these later. PAI's customization is designed to be iterative — start simple and refine over time.</p>
</Callout>

<h2>Step 5: Verify installation</h2>

<Terminal
	command="pai"
	output="PAI v4.0.3 initialized
Loading TELOS context... ✓
Loading skills (63)... ✓
Loading hooks (21)... ✓

Hello! I'm your Personal AI Infrastructure.
Let's get started."
	title="First PAI Launch"
/>

<h2>What just happened?</h2>

<p>The installer created a <code>~/.claude</code> directory containing your entire PAI installation. Inside, there are two key folders:</p>

<p><strong>SYSTEM/</strong> — PAI's own infrastructure. Skills, hooks, the algorithm, security policies. You generally don't edit these directly.</p>

<p><strong>USER/</strong> — Your customizations. TELOS files, preferences, custom workflows. This is <em>your</em> space, and it's safe during upgrades.</p>

<Callout type="warning">
	<p>If you already have a <code>~/.claude</code> directory from plain Claude Code, the installer will detect this and merge carefully. Your existing configuration won't be overwritten.</p>
</Callout>

</ModuleLayout>
