<script lang="ts">
	import ModuleLayout from '$lib/components/ModuleLayout.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Callout from '$lib/components/Callout.svelte';
</script>

<ModuleLayout
	moduleId="what-is-pai"
	title="What is PAI?"
	description="The three levels of AI evolution and where PAI fits in"
	estimatedMinutes={5}
	nextSlug="foundation/pai-vs-claude"
>

<h2>AI has been evolving in stages</h2>

<p>Most people interact with AI at <strong>Level 1: the chatbot</strong>. You type a question, it answers, and then it forgets everything. Every conversation starts from zero. ChatGPT, Claude.ai, Gemini — they all work this way by default.</p>

<p><strong>Level 2 is agentic platforms</strong> like Claude Code. These can use tools — run commands, edit files, browse the web. They're dramatically more capable than chatbots, but they still don't <em>know</em> you. Each session, you're a stranger again.</p>

<p><strong>Level 3 is PAI — Personal AI Infrastructure.</strong> This is where things get interesting.</p>

<h2>What makes PAI different</h2>

<p>PAI wraps around Claude Code and adds everything needed to make AI truly personal:</p>

<p><strong>It knows who you are.</strong> Your goals, your projects, your beliefs, your mental models — PAI stores all of this in a structured system called TELOS. Every interaction is informed by your context.</p>

<p><strong>It learns from feedback.</strong> When something works well, PAI remembers. When it doesn't, PAI adapts. Over time, your AI assistant gets measurably better at helping <em>you specifically</em>.</p>

<p><strong>It follows a systematic approach.</strong> PAI uses what it calls "The Algorithm": Observe → Think → Plan → Build → Execute → Verify → Learn. This isn't just a chatbot guessing — it's a structured problem-solving system.</p>

<p><strong>It has skills.</strong> 63 of them across 13 categories, with 338 workflows. These aren't prompts — they're deterministic, tested capabilities that PAI can invoke when the situation calls for them.</p>

<h2>The core philosophy</h2>

<p>PAI was built on a belief: most people don't think they have valuable contributions to make to the world. PAI's creator, Daniel Miessler, calls this <strong>"activation"</strong> — helping people articulate their purpose, goals, and ideas, then giving them AI infrastructure powerful enough to act on them.</p>

<Callout type="info">
	<p>PAI isn't trying to replace you. It's trying to <strong>amplify</strong> you — by knowing what you care about and helping you pursue it with superhuman assistance.</p>
</Callout>

<h2>What PAI looks like in practice</h2>

<p>When you launch PAI, you're in a terminal. But unlike plain Claude Code, your assistant already knows your active projects, your communication preferences, even your timezone and preferred temperature units. It greets you, checks what you're working on, and is ready to help with full context.</p>

<Terminal
	command="pai"
	output="Good morning, Jay. You're working on the Learn PAI training app.
Your active projects: 3 | Goals on track: 7/10
How can I help today?"
	title="PAI Session"
/>

<p>That's not a generic chatbot response. That's an assistant that has read your goals, knows your projects, and is ready to help you move forward.</p>

</ModuleLayout>
