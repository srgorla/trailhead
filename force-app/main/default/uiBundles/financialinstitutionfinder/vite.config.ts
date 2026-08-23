import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import salesforce from '@salesforce/vite-plugin-ui-bundle';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const orgAlias = env.VITE_SF_ORG_ALIAS || 'fifinder_test';

    return {
        base: './',
        plugins: [react(), salesforce({ orgAlias })],
        build: {
            outDir: 'dist',
            assetsDir: 'assets',
            sourcemap: false
        }
    };
});
