import { useState } from 'react';
import { Environment, RecordSource, Store } from 'relay-runtime';

import createNetworkLayer from './network.ts';
import { isBrowser } from '@/lib/consts.ts';

// List of Reset Listener to call when the environment is reset
let _resetListeners: Array<(notify: boolean) => void> = [];

export type CreateRelayContextArguments = {
    initialRelayData?: any;
};

export class RelayEnvironment {
    _environment: Environment;
    _envConfig: CreateRelayContextArguments;

    constructor(envConfig: CreateRelayContextArguments) {
        console.log('Setup RelayEnv');

        this._envConfig = envConfig;

        this._environment = this._createRelayEnvironment();
    }

    _createRelayEnvironment(): Environment {
        const recordSource = new RecordSource(this._envConfig.initialRelayData);

        const store = new Store(recordSource, {
            gcReleaseBufferSize: 1000,
        });

        const network = createNetworkLayer();

        return new Environment({
            network,
            store,
        });
    }

    getEnvironment(): Environment {
        return this._environment;
    }

    resetEnvironment(config?: CreateRelayContextArguments): Environment {
        console.log('Reset RelayEnv');

        this._envConfig = { ...this._envConfig, ...config };
        this._environment = this._createRelayEnvironment();
        return this._environment;
    }
}

export const initRelayEnvironment = ({
    initialRelayData,
}: CreateRelayContextArguments): Environment => {
    const environment = new RelayEnvironment({
        initialRelayData,
    });

    return environment.getEnvironment();
};

export const useResettableEnvironment = (relayEnvironment) => {
    const [environment, setEnvironment] = useState(
        relayEnvironment.getEnvironment(),
    );

    const onReset = (config = {}) => {
        setEnvironment(relayEnvironment.resetEnvironment(config));
    };

    return [environment, onReset];
};

export function resetRelayEnvironment(
    { notify }: { notify: boolean } = { notify: true },
) {
    // Reset the Relay Environment
    // Fire off all the callbacks register for when the environment is reset
    _resetListeners.forEach((listener) => listener(notify));
}

export function addRelayEnvironmentResetListener(
    callback: (notify: boolean) => void,
) {
    // Register a function to be called when the relay environment is reset
    if (!isBrowser) {
        return;
    }

    _resetListeners.push(callback);
}

export function removeRelayEnvironmentResetListener(
    callback: (notify: boolean) => void,
) {
    // De-register a function to be called when the relay environment is reset
    if (!isBrowser) {
        return;
    }

    _resetListeners = _resetListeners.filter((other) => other !== callback);
}

const relayEnvironment = new RelayEnvironment({});
export default relayEnvironment;
