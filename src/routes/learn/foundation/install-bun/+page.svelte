<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<ModuleLayout
	moduleId="install-bun"
	title="Install Bun"
	description="The fast JavaScript runtime that PAI depends on"
	estimatedMinutes={3}
>

<h2>Why Bun?</h2>

<p>PAI's tools, hooks, and skills are written in TypeScript. They need a JavaScript runtime to execute — and PAI uses <strong>Bun</strong> rather than the more common Node.js. Bun is significantly faster at starting up and running scripts, which matters when PAI's hooks fire on every interaction.</p>

<Callout type="info">
	<p>If you already have Bun installed, run <code>bun --version</code> to check, then mark this complete and move on.</p>
</Callout>

<h2>Install Bun</h2>

<p>On macOS, the quickest way is a single command. Follow the official installation instructions at <strong><a href="https://bun.sh/docs/installation" target="_blank" rel="noopener">bun.sh/docs/installation</a></strong>, or run:</p>

<Terminal
	command="curl -fsSL https://bun.sh/install | bash"
	output="bun was installed successfully to ~/.bun/bin/bun"
	title="Terminal"
/>

<h2>Verify it's working</h2>

<p>After installation, verify Bun is available:</p>

<Terminal
	command="bun --version"
	output="1.2.5"
	title="Terminal"
/>

<Callout type="tip">
	<p>If the <code>bun</code> command isn't found after installing, open a new terminal window. The installer adds Bun to your path, but existing terminal sessions won't pick it up until they're restarted.</p>
</Callout>

</ModuleLayout>
