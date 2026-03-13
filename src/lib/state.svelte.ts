// Central app state using Svelte 5 runes

export type PathId = 'know-me' | 'get-things-done' | 'architecture';
export type TierId = 'foundation' | 'core' | 'intermediate' | 'advanced';

export interface Module {
	id: string;
	title: string;
	description: string;
	tier: TierId;
	path?: PathId;
	slug: string;
	order: number;
	estimatedMinutes: number;
	prerequisiteIds?: string[];
}

export interface UserProfile {
	techLevel: 'beginner' | 'intermediate' | 'advanced' | null;
	interests: PathId[];
	completedModules: Set<string>;
	visitedModules: Set<string>;
	currentModule: string | null;
	quizCompleted: boolean;
}

// All available modules
export const modules: Module[] = [
	// Tier 1 — Foundation
	{
		id: 'terminal-basics',
		title: 'Terminal Basics',
		description: 'Get comfortable with the place where PAI lives',
		tier: 'foundation',
		slug: 'foundation/terminal-basics',
		order: 1,
		estimatedMinutes: 7
	},
	{
		id: 'git-basics',
		title: 'Git Basics',
		description: 'The six concepts you need — Claude Code handles the rest',
		tier: 'foundation',
		slug: 'foundation/git-basics',
		order: 2,
		estimatedMinutes: 6
	},
	{
		id: 'claude-code',
		title: 'Installing Claude Code',
		description: 'Get Claude Code running in your terminal in under five minutes',
		tier: 'foundation',
		slug: 'foundation/claude-code',
		order: 3,
		estimatedMinutes: 5
	},
	{
		id: 'superpowers',
		title: 'Superpowers',
		description: 'Give Claude Code structured development superpowers',
		tier: 'foundation',
		slug: 'foundation/superpowers',
		order: 4,
		estimatedMinutes: 8
	},
	{
		id: 'what-is-pai',
		title: 'What is PAI?',
		description: 'The three levels of AI evolution and where PAI fits in',
		tier: 'foundation',
		slug: 'foundation/what-is-pai',
		order: 5,
		estimatedMinutes: 5
	},
	{
		id: 'pai-vs-claude',
		title: 'PAI vs Plain Claude Code',
		description: 'What changes when you add PAI on top of Claude Code',
		tier: 'foundation',
		slug: 'foundation/pai-vs-claude',
		order: 6,
		estimatedMinutes: 5
	},
	{
		id: 'principles-overview',
		title: 'The 16 Principles',
		description: 'A visual tour of the ideas that guide PAI\'s design',
		tier: 'foundation',
		slug: 'foundation/principles',
		order: 7,
		estimatedMinutes: 8
	},
	{
		id: 'installation',
		title: 'Installing PAI',
		description: 'Get PAI running on your machine step by step',
		tier: 'foundation',
		slug: 'foundation/installation',
		order: 8,
		estimatedMinutes: 10
	},

	// Tier 2 — Path A: Know Me
	{
		id: 'telos-intro',
		title: 'Meet TELOS',
		description: 'The 10 files that teach AI who you are',
		tier: 'core',
		path: 'know-me',
		slug: 'know-me/telos-intro',
		order: 1,
		estimatedMinutes: 6,
		prerequisiteIds: ['what-is-pai']
	},
	{
		id: 'mission-goals',
		title: 'Mission & Goals',
		description: 'Writing your MISSION.md and GOALS.md — your North Star',
		tier: 'core',
		path: 'know-me',
		slug: 'know-me/mission-goals',
		order: 2,
		estimatedMinutes: 12,
		prerequisiteIds: ['telos-intro']
	},
	{
		id: 'projects-beliefs',
		title: 'Projects & Beliefs',
		description: 'Mapping your current work and core worldview',
		tier: 'core',
		path: 'know-me',
		slug: 'know-me/projects-beliefs',
		order: 3,
		estimatedMinutes: 10,
		prerequisiteIds: ['mission-goals']
	},
	{
		id: 'models-strategies',
		title: 'Models & Strategies',
		description: 'Your mental models and how you approach problems',
		tier: 'core',
		path: 'know-me',
		slug: 'know-me/models-strategies',
		order: 4,
		estimatedMinutes: 10,
		prerequisiteIds: ['projects-beliefs']
	},
	{
		id: 'narratives-ideas',
		title: 'Narratives, Ideas & Challenges',
		description: 'Your stories, spark list, and current obstacles',
		tier: 'core',
		path: 'know-me',
		slug: 'know-me/narratives-ideas',
		order: 5,
		estimatedMinutes: 10,
		prerequisiteIds: ['models-strategies']
	},
	{
		id: 'context-in-action',
		title: 'Seeing Context in Action',
		description: 'How PAI uses your TELOS files to personalize every interaction',
		tier: 'core',
		path: 'know-me',
		slug: 'know-me/context-in-action',
		order: 6,
		estimatedMinutes: 8,
		prerequisiteIds: ['narratives-ideas']
	},

	// Tier 2 — Path B: Get Things Done
	{
		id: 'skills-overview',
		title: 'The Skills System',
		description: '63 skills across 13 categories — your AI toolkit',
		tier: 'core',
		path: 'get-things-done',
		slug: 'get-things-done/skills-overview',
		order: 1,
		estimatedMinutes: 8,
		prerequisiteIds: ['what-is-pai']
	},
	{
		id: 'skill-hierarchy',
		title: 'The Skill Hierarchy',
		description: 'CODE → CLI → PROMPT → SKILL — choosing the right level',
		tier: 'core',
		path: 'get-things-done',
		slug: 'get-things-done/skill-hierarchy',
		order: 2,
		estimatedMinutes: 8,
		prerequisiteIds: ['skills-overview']
	},
	{
		id: 'first-workflow',
		title: 'Your First Workflow',
		description: 'Running a real skill-based task from start to finish',
		tier: 'core',
		path: 'get-things-done',
		slug: 'get-things-done/first-workflow',
		order: 3,
		estimatedMinutes: 12,
		prerequisiteIds: ['skill-hierarchy']
	},
	{
		id: 'workflows-deep',
		title: '338 Workflows',
		description: 'Discovering and chaining workflows for complex tasks',
		tier: 'core',
		path: 'get-things-done',
		slug: 'get-things-done/workflows',
		order: 4,
		estimatedMinutes: 10,
		prerequisiteIds: ['first-workflow']
	},

	// Tier 2 — Path C: Architecture
	{
		id: 'nine-primitives',
		title: 'The 9 Primitives',
		description: 'The building blocks of PAI\'s architecture',
		tier: 'core',
		path: 'architecture',
		slug: 'architecture/nine-primitives',
		order: 1,
		estimatedMinutes: 10,
		prerequisiteIds: ['what-is-pai']
	},
	{
		id: 'user-system-split',
		title: 'USER/ vs SYSTEM/',
		description: 'How PAI keeps your customizations safe during upgrades',
		tier: 'core',
		path: 'architecture',
		slug: 'architecture/user-system',
		order: 2,
		estimatedMinutes: 6,
		prerequisiteIds: ['nine-primitives']
	},
	{
		id: 'the-algorithm',
		title: 'The Algorithm v3.6',
		description: 'Observe → Think → Plan → Build → Execute → Verify → Learn',
		tier: 'core',
		path: 'architecture',
		slug: 'architecture/algorithm',
		order: 3,
		estimatedMinutes: 12,
		prerequisiteIds: ['user-system-split']
	},
	{
		id: 'how-it-fits',
		title: 'How It All Fits Together',
		description: 'The complete system diagram — from goals to execution',
		tier: 'core',
		path: 'architecture',
		slug: 'architecture/how-it-fits',
		order: 4,
		estimatedMinutes: 8,
		prerequisiteIds: ['the-algorithm']
	}
];

// Path metadata
export const paths: Record<PathId, { title: string; tagline: string; icon: string; color: string }> = {
	'know-me': {
		title: 'AI That Knows Me',
		tagline: 'Teach AI who you are so it can truly help',
		icon: '🧠',
		color: 'blue'
	},
	'get-things-done': {
		title: 'Get Things Done',
		tagline: 'Use skills and workflows to move faster',
		icon: '⚡',
		color: 'amber'
	},
	'architecture': {
		title: 'Understand the Architecture',
		tagline: 'See how all the pieces fit together',
		icon: '🏗️',
		color: 'emerald'
	}
};

// localStorage persistence helpers
const STORAGE_KEY = 'learn-pai-profile';

function loadFromStorage(): Partial<UserProfile> {
	if (typeof window === 'undefined') return {};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return {};
		const p = JSON.parse(raw);
		return {
			...p,
			completedModules: new Set<string>(p.completedModules ?? []),
			visitedModules: new Set<string>(p.visitedModules ?? [])
		};
	} catch {
		return {};
	}
}

function saveToStorage(profile: UserProfile) {
	if (typeof window === 'undefined') return;
	try {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				...profile,
				completedModules: [...profile.completedModules],
				visitedModules: [...profile.visitedModules]
			})
		);
	} catch {
		// Storage quota exceeded or private browsing — silently ignore
	}
}

// Initialise reactive state, hydrating from localStorage if available
const stored = loadFromStorage();
let _profile = $state<UserProfile>({
	techLevel: stored.techLevel ?? null,
	interests: stored.interests ?? [],
	completedModules: stored.completedModules ?? new Set(),
	visitedModules: stored.visitedModules ?? new Set(),
	currentModule: stored.currentModule ?? null,
	quizCompleted: stored.quizCompleted ?? false
});

export function getProfile(): UserProfile {
	return _profile;
}

export function setTechLevel(level: UserProfile['techLevel']) {
	_profile.techLevel = level;
	saveToStorage(_profile);
}

export function toggleInterest(path: PathId) {
	const idx = _profile.interests.indexOf(path);
	if (idx >= 0) {
		_profile.interests = _profile.interests.filter((p) => p !== path);
	} else {
		_profile.interests = [..._profile.interests, path];
	}
	saveToStorage(_profile);
}

export function completeQuiz() {
	_profile.quizCompleted = true;
	saveToStorage(_profile);
}

export function completeModule(id: string) {
	_profile.completedModules = new Set([..._profile.completedModules, id]);
	saveToStorage(_profile);
}

export function markVisited(id: string) {
	if (!_profile.visitedModules.has(id)) {
		_profile.visitedModules = new Set([..._profile.visitedModules, id]);
		saveToStorage(_profile);
	}
}

export function setCurrentModule(id: string | null) {
	_profile.currentModule = id;
	saveToStorage(_profile);
}

export function resetProgress() {
	_profile.techLevel = null;
	_profile.interests = [];
	_profile.completedModules = new Set();
	_profile.visitedModules = new Set();
	_profile.currentModule = null;
	_profile.quizCompleted = false;
	if (typeof window !== 'undefined') {
		localStorage.removeItem(STORAGE_KEY);
	}
}

export function getModulesForPath(pathId: PathId): Module[] {
	return modules.filter((m) => m.path === pathId).sort((a, b) => a.order - b.order);
}

export function getFoundationModules(): Module[] {
	return modules.filter((m) => m.tier === 'foundation').sort((a, b) => a.order - b.order);
}

export function isModuleUnlocked(mod: Module, completed: Set<string>): boolean {
	if (!mod.prerequisiteIds || mod.prerequisiteIds.length === 0) return true;
	return mod.prerequisiteIds.every((id) => completed.has(id));
}

export function getProgressForPath(pathId: PathId, completed: Set<string>): number {
	const pathModules = getModulesForPath(pathId);
	if (pathModules.length === 0) return 0;
	const done = pathModules.filter((m) => completed.has(m.id)).length;
	return Math.round((done / pathModules.length) * 100);
}

export function getFoundationProgress(completed: Set<string>): number {
	const fMods = getFoundationModules();
	if (fMods.length === 0) return 0;
	const done = fMods.filter((m) => completed.has(m.id)).length;
	return Math.round((done / fMods.length) * 100);
}
