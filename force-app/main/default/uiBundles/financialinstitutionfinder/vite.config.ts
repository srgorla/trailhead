import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import salesforce from '@salesforce/vite-plugin-ui-bundle';

export default defineConfig({
    base: './',
    plugins: [react(), salesforce({ orgAlias: 'fifinder_test' })],
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false
    }
});
