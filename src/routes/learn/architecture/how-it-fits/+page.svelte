<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
</script>
<ModuleLayout moduleId="how-it-fits" title="How It All Fits Together" description="The complete system diagram — from goals to execution" estimatedMinutes={8}>
<h2>The full picture</h2>
<p>Now you've seen the individual pieces. Here's how they work together:</p>
<p>When you launch PAI, the <strong>Hook System</strong> fires session-start hooks. These load your <strong>TELOS context</strong> from the USER/ directory, check your active projects and goals, and prepare the <strong>Memory System</strong> with recent learnings.</p>
<p>When you make a request, the <strong>Algorithm</strong> kicks in. PAI observes your request, thinks about it in the context of your goals and beliefs, plans an approach using your preferred strategies, and selects the right <strong>Skills</strong> to execute.</p>
<p>During execution, the <strong>Security System</strong> validates commands. The <strong>Voice System</strong> can announce completions. And the <strong>Memory System</strong> captures feedback — what worked, what didn't — so the next interaction is better.</p>
<p>All of this happens within the <strong>USER/SYSTEM separation</strong>, meaning your personal context stays safe while the infrastructure evolves.</p>
<p>That's PAI: a learning loop built on structured context, with you at the center.</p>
</ModuleLayout>
