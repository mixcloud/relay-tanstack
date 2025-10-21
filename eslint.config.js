// @ts-check
import { tanstackConfig } from '@tanstack/eslint-config';
import relay from 'eslint-plugin-relay';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginPromise from 'eslint-plugin-promise';

export default [
    ...tanstackConfig,
    reactHooks.configs.flat['recommended-latest'],
    reactRefresh.configs.recommended,
    pluginPromise.configs['flat/recommended'],
    {
        plugins: { relay },
        rules: relay.configs['ts-recommended'].rules,
    },
];
