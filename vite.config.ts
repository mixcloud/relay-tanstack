import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { cjsInterop } from 'vite-plugin-cjs-interop';

import { wrapVinxiConfigWithSentry } from '@sentry/tanstackstart-react';

const config = defineConfig({
    plugins: [
        tsConfigPaths({
            projects: ['./tsconfig.json'],
        }),
        tailwindcss(),
        tanstackStart(),
        react({ babel: { plugins: ['babel-plugin-react-compiler', 'relay'] } }),
        cjsInterop({
            // List of CJS dependencies that require interop in the NODE environment
            // this is a quirk - in an ideal world these packages work in both environments
            dependencies: ['react-relay', 'relay-runtime'],
        }),
    ],
    server: {
        open: true,
        port: 3000,
    },
});

export default wrapVinxiConfigWithSentry(config, {
    org: process.env.VITE_SENTRY_ORG,
    project: process.env.VITE_SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    // Only print logs for uploading source maps in CI
    // Set to `true` to suppress logs
    silent: !process.env.CI,
});
