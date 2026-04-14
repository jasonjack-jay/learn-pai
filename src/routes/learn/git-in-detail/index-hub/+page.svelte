<script lang="ts">
	import { onMount } from 'svelte';
	import { markVisited } from '$lib/state.svelte';
	import PathIndex from '$lib/components/PathIndex.svelte';
	import DiagramImage from '$lib/components/DiagramImage.svelte';
	import type { PathIndexCard } from '$lib/components/PathIndex.svelte';

	onMount(() => {
		markVisited('git-in-detail-hub');
	});

	const cards: PathIndexCard[] = [
		{
			number: 1,
			title: 'Setting Up Git',
			covers:
				'The first-time setup that nobody explains properly. Configs, .gitignore, SSH keys, and the .git folder.',
			whenToRead:
				'First time installing Git. Joining a new team. After a laptop rebuild. Whenever you want to stop typing -u.',
			estimatedMinutes: 8,
			moduleId: 'git-in-detail-setup',
			slug: 'git-in-detail/setup'
		},
		{
			number: 2,
			title: 'The Staging Area',
			covers:
				"Add, commit, status, diff — and why Git has a waiting room between your files and the snapshot.",
			whenToRead:
				"When you're about to commit and realise you only want half of your changes in it. Or when git status starts feeling mysterious.",
			estimatedMinutes: 10,
			moduleId: 'git-in-detail-staging',
			slug: 'git-in-detail/staging'
		},
		{
			number: 3,
			title: 'Branches in Depth',
			covers:
				'HEAD, detached HEAD, switch vs checkout, branch naming, remote tracking branches.',
			whenToRead:
				"When you accidentally end up in 'detached HEAD' state. When your team has opinions about branch names. When you have 40 old local branches.",
			estimatedMinutes: 8,
			moduleId: 'git-in-detail-branches',
			slug: 'git-in-detail/branches'
		},
		{
			number: 4,
			title: 'Merging in Depth',
			covers:
				'Fast-forward vs merge commits, --squash, conflict markers, --abort, merge strategies.',
			whenToRead:
				"When you hit your first real conflict and the <<<<< markers don't make sense. When your team debates merge vs squash.",
			estimatedMinutes: 10,
			moduleId: 'git-in-detail-merging',
			slug: 'git-in-detail/merging'
		},
		{
			number: 5,
			title: 'Rebasing',
			covers:
				'Replaying commits, interactive rebase (squash/fixup/reword), the Golden Rule, --force-with-lease.',
			whenToRead:
				"Before your first PR when you've got 15 WIP commits. When your AI offers to rebase and you want to know what that means first.",
			estimatedMinutes: 10,
			moduleId: 'git-in-detail-rebasing',
			slug: 'git-in-detail/rebasing'
		},
		{
			number: 6,
			title: 'Working with Remotes',
			covers: 'git remote, fetch vs pull, --prune, push flags, forks, HTTPS vs SSH.',
			whenToRead:
				"When you're contributing to someone else's project. When your remote URL changes. When you want to see what's on the remote without merging.",
			estimatedMinutes: 10,
			moduleId: 'git-in-detail-remotes',
			slug: 'git-in-detail/remotes'
		},
		{
			number: 7,
			title: 'Stashing',
			covers:
				'stash push / pop / apply / list / branch, the untracked-files problem, why pop can lose work.',
			whenToRead:
				"Urgent bug, you're mid-feature, need to switch branches right now. Or you need to test just your staged changes.",
			estimatedMinutes: 6,
			moduleId: 'git-in-detail-stashing',
			slug: 'git-in-detail/stashing'
		},
		{
			number: 8,
			title: 'Investigating History',
			covers: 'git log (the 15 useful flags), show, blame, and the wonder that is bisect.',
			whenToRead:
				'Who wrote this line and why? When did this file get deleted? When did the bug get introduced? All answered here.',
			estimatedMinutes: 10,
			moduleId: 'git-in-detail-history',
			slug: 'git-in-detail/history'
		},
		{
			number: 9,
			title: 'Undoing Things',
			covers:
				'The full "Oh No" spectrum: restore → revert → reset (3 modes) → reflog. Plus --amend.',
			whenToRead:
				"After something's gone wrong. Probably 12 minutes ago. Includes the Oh-No table: 12 disasters and how to fix each.",
			estimatedMinutes: 10,
			moduleId: 'git-in-detail-undoing',
			slug: 'git-in-detail/undoing'
		},
		{
			number: 10,
			title: 'Worktrees',
			covers:
				'Multiple working directories sharing one .git database. The AI-agent parallel workflow.',
			whenToRead:
				'When you want to run Claude Code on two features at once. When an urgent fix arrives and you cannot stash.',
			estimatedMinutes: 8,
			moduleId: 'git-in-detail-worktrees',
			slug: 'git-in-detail/worktrees'
		},
		{
			number: 11,
			title: 'Pull Requests',
			covers:
				'What a PR actually is, the full lifecycle, merge methods (merge/squash/rebase), the gh CLI.',
			whenToRead:
				"Before you open your first PR. Before you review somebody else's. When you're deciding whether to squash-merge or not.",
			estimatedMinutes: 10,
			moduleId: 'git-in-detail-pull-requests',
			slug: 'git-in-detail/pull-requests'
		},
		{
			number: 12,
			title: 'Tags, Releases & Cherry-Pick',
			covers: 'Annotated vs lightweight tags, semver (MAJOR.MINOR.PATCH), cherry-pick for backports.',
			whenToRead:
				"When it's release day. When you need to backport a bugfix to an older version. When you're wondering what v1.2.3 actually means.",
			estimatedMinutes: 6,
			moduleId: 'git-in-detail-tags',
			slug: 'git-in-detail/tags'
		},
		{
			number: 13,
			title: 'Git Hooks & Automation',
			covers:
				'pre-commit, commit-msg, pre-push; husky, lefthook, pre-commit — and why hooks matter with AI.',
			whenToRead:
				"When you want to block console.log from reaching main. When the team asks you to 'just add a pre-commit hook'.",
			estimatedMinutes: 8,
			moduleId: 'git-in-detail-hooks',
			slug: 'git-in-detail/hooks'
		},
		{
			number: 14,
			title: "You've Reached the Terminus",
			covers: "A wrap-up. Recap, signposts to the rest of the curriculum, pointer to the cheat sheet.",
			whenToRead: "When you've finished the other 13 pages (or out of curiosity — it's three minutes).",
			estimatedMinutes: 3,
			moduleId: 'git-in-detail-complete',
			slug: 'git-in-detail/complete'
		}
	];
</script>

<div class="max-w-7xl mx-auto px-6 py-12 lg:py-16">
	<header class="mb-8 max-w-3xl">
		<div class="flex items-center gap-3 mb-4">
			<span
				class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
				style="background: #ede9fe; color: #6d28d9"
			>
				<span>🚇</span>
				<span>Git in Detail</span>
			</span>
		</div>
		<h1 class="text-4xl font-bold tracking-tight mb-3" style="color: var(--color-ink)">
			Pick your section
		</h1>
		<p class="text-lg text-gray-500 leading-relaxed">
			Fourteen concepts. None depends on the last. Read in any order, hop around, come back later
			— the path remembers which stations you've visited.
		</p>
	</header>

	<div class="max-w-3xl">
		<DiagramImage
			src="git-in-detail/index-map.png"
			alt="Station wall map labelled 'Git in Detail — Line Map' listing fourteen numbered coloured tube lines from 1. Setup to 14. Complete"
			caption="Pick any line. Jump on anywhere."
		/>
	</div>

	<PathIndex {cards} />
</div>
