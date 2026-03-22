<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import { getProfile, getFoundationModules, getModulesForPath, paths, streamMeta, isModuleUnlocked, getFoundationProgress, getProgressForPath, getTheme } from '$lib/state.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let { children } = $props();
	const profile = getProfile();
	let sidebarOpen = $state(false);

	onMount(() => {
		document.documentElement.setAttribute('data-theme', getTheme());
	});

	const currentPath = $derived($page.url.pathname);
	const isReferencePage = $derived(currentPath.includes('/terminal-reference') || currentPath.includes('/git-reference'));
	const isSetupPage = $derived(currentPath.includes('/setup'));
	const showSidebar = $derived(profile.quizCompleted && !isReferencePage && !isSetupPage && profile.stream !== 'developer' && currentPath !== `${base}/` && currentPath !== base);
</script>

<svelte:head>
	<title>Learn PAI — Personal AI Infrastructure</title>
</svelte:head>

{#if showSidebar}
<div class="min-h-screen flex">
	<!-- Mobile menu button -->
	<button
		class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
		onclick={() => sidebarOpen = !sidebarOpen}
		aria-label="Toggle navigation"
	>
		<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			{#if sidebarOpen}
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
			{:else}
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
			{/if}
		</svg>
	</button>

	<!-- Sidebar -->
	<aside class="fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 overflow-y-auto z-40 transition-transform duration-200 {sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}">
		<div class="p-5">
			<a href="{base}/" class="block mb-6">
				<span class="text-lg font-semibold tracking-tight" style="color: var(--color-ink)">{profile.stream ? streamMeta[profile.stream].title : 'Learn PAI'}</span>
				<span class="block text-xs text-gray-400 mt-0.5">{profile.stream ? streamMeta[profile.stream].subtitle : 'Personal AI Infrastructure'}</span>
			</a>

			<!-- Foundation -->
			<div class="mb-6">
				<div class="flex items-center justify-between mb-2">
					<h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400">Foundation</h3>
					<span class="text-xs text-gray-400">{getFoundationProgress(profile.completedModules, profile.stream)}%</span>
				</div>
				<div class="h-1 bg-gray-100 rounded-full mb-3">
					<div class="h-1 rounded-full transition-all duration-300" style="background: var(--color-accent); width: {getFoundationProgress(profile.completedModules, profile.stream)}%"></div>
				</div>
				<ul class="space-y-1">
					{#each getFoundationModules(profile.stream) as mod}
						{@const unlocked = isModuleUnlocked(mod, profile.completedModules, profile.stream)}
						{@const completed = profile.completedModules.has(mod.id)}
						{@const active = currentPath.includes(mod.slug)}
						<li>
							<a
								href="{base}/learn/{mod.slug}"
								class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors {active ? 'font-medium' : ''} {!unlocked && !completed ? 'text-gray-300 pointer-events-none' : 'hover:bg-gray-50'}"
								style="{active ? 'background: var(--color-accent-light); color: var(--color-accent)' : ''} {completed && !active ? 'color: var(--color-success)' : ''}"
							>
								{#if completed}
									<svg class="w-4 h-4 shrink-0" style="color: var(--color-success)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
								{:else if !unlocked}
									<svg class="w-4 h-4 shrink-0 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
								{:else}
									<div class="w-4 h-4 shrink-0 rounded-full border-2 border-gray-300"></div>
								{/if}
								<span class="truncate">{mod.title}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Learning Paths -->
			{#each profile.interests as pathId}
				{@const pathMeta = paths[pathId]}
				{@const pathModules = getModulesForPath(pathId)}
				{@const progress = getProgressForPath(pathId, profile.completedModules)}
				<div class="mb-6">
					<div class="flex items-center justify-between mb-2">
						<h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400">
							{pathMeta.icon} {pathMeta.title}
						</h3>
						<span class="text-xs text-gray-400">{progress}%</span>
					</div>
					<div class="h-1 bg-gray-100 rounded-full mb-3">
						<div class="h-1 rounded-full transition-all duration-300" style="background: var(--color-accent); width: {progress}%"></div>
					</div>
					<ul class="space-y-1">
						{#each pathModules as mod}
							{@const unlocked = isModuleUnlocked(mod, profile.completedModules, profile.stream)}
							{@const completed = profile.completedModules.has(mod.id)}
							{@const active = currentPath.includes(mod.slug)}
							<li>
								<a
									href="{base}/learn/{mod.slug}"
									class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors {active ? 'font-medium' : ''} {!unlocked && !completed ? 'text-gray-300 pointer-events-none' : 'hover:bg-gray-50'}"
									style="{active ? 'background: var(--color-accent-light); color: var(--color-accent)' : ''} {completed && !active ? 'color: var(--color-success)' : ''}"
								>
									{#if completed}
										<svg class="w-4 h-4 shrink-0" style="color: var(--color-success)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
									{:else if !unlocked}
										<svg class="w-4 h-4 shrink-0 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
									{:else}
										<div class="w-4 h-4 shrink-0 rounded-full border-2 border-gray-300"></div>
									{/if}
									<span class="truncate">{mod.title}</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}

			<div class="pt-4 border-t border-gray-100 space-y-1">
				<a href="{base}/paths" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
					Change learning paths
				</a>
				<a href="{base}/settings" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
					Settings
				</a>
			</div>
		</div>
	</aside>

	{#if sidebarOpen}
		<button class="fixed inset-0 bg-black/20 z-30 lg:hidden" onclick={() => sidebarOpen = false} aria-label="Close sidebar"></button>
	{/if}

	<main class="flex-1 min-w-0">
		{@render children()}
	</main>
</div>
{:else}
	{@render children()}
{/if}
