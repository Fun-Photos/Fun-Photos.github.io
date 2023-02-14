import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            strict: false,
            pages: 'build',
            assets: 'build',
            fallback: 'index.html',
            precompress: true,
            trailingSlash: 'always'
        }),
        paths: {
            base: process.env.NODE_ENV === "production" ? "/fun-photos-app" : "",
        },
        //appDir: 'internal'
    }
};

export default config;