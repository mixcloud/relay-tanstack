import { createSerializationAdapter } from '@tanstack/react-router';
import { Environment, Observable } from 'relay-runtime';

import type {
    Environment as RelayEnvironmentType,
    IEnvironment,
} from 'relay-runtime';

type SerializationAdapter = {
    key: string,
    test: (value: any) => boolean,
    toSerializable: (value: any) => any,
    fromSerializable: (serialized: any, ctx: any) => any,
};

type EnvironmentType = IEnvironment | RelayEnvironmentType;

/**
 * This plugin serialises a Relay Environment
 */
export const RelayEnvironmentPlugin = (
    environment: EnvironmentType,
): SerializationAdapter =>
    createSerializationAdapter({
        key: 'seroval-plugins/RelayEnvironmentPlugin',
        test: (value) => value instanceof Environment,
        toSerializable: () => environment,
        fromSerializable: () => environment,
    });

/**
 * This plugin serialises functions not handled by the default seroval plugins
 */
export const FunctionPlugin = (): SerializationAdapter =>
    createSerializationAdapter({
        key: 'seroval-plugins/FunctionPlugin',
        test: (value) => typeof value === 'function',
        toSerializable: (value) => value,
        fromSerializable: (serialized) => serialized,
    });

/**
 * This plugin serialises a Relay Observable
 */
export const RelayObservablePlugin = (): SerializationAdapter =>
    createSerializationAdapter({
        key: 'seroval-plugins/RelayObservablePlugin',
        test: (value) => value instanceof Observable,
        toSerializable: (value) => value,
        fromSerializable: (serialized) => serialized,
    });