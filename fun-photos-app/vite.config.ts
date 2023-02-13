import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite';

export default defineConfig({
	define: {
		'process.env.NODE_ENV': '"production"',
	},
	plugins: [
		sveltekit(),
		VitePWA({})
	]
});
