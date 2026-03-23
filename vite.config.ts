import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';

function getLastCommitDate(): string {
	try {
		return execSync('git log -1 --format=%ci', { encoding: 'utf-8' }).trim();
	} catch {
		return new Date().toISOString();
	}
}

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		__LAST_UPDATED__: JSON.stringify(getLastCommitDate())
	},
	server: {
		port: 5273
	}
});
