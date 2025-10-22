// src/start.ts
import { createStart } from '@tanstack/react-start';
import {
    FunctionPlugin,
    RelayEnvironmentPlugin,
    RelayObservablePlugin,
} from './serovalPlugins.ts';
import relayEnvironment from './lib/relay/environment';

export const startInstance = createStart(() => {
    return {
        serializationAdapters: [
            RelayEnvironmentPlugin(relayEnvironment.getEnvironment()),
            RelayObservablePlugin(),
            FunctionPlugin(),
        ],
    };
});
