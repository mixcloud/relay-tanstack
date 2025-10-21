import { createRouter } from '@tanstack/react-router';
// Import the generated route tree
import { routeTree } from './routeTree.gen.ts';
import relayEnvironment from '@/lib/relay/environment.ts';

// Create a new router instance
export const getRouter = () => {
    // Setup Relay Environment using context from serve

    const router = createRouter({
        routeTree,
        scrollRestoration: true,
        defaultPreloadStaleTime: 0,
        defaultPreload: 'intent',
        // On the server, dehydrate the Relay store to send to the client
        dehydrate: async () => {
            return {
                initialRelayData: relayEnvironment
                    .getEnvironment()
                    .getStore()
                    .getSource()
                    .toJSON(),
            };
        },
        // On the client, hydrate the Relay store with the dehydrated data from the server
        hydrate: ({ initialRelayData }) => {
            relayEnvironment.resetEnvironment({
                initialRelayData,
            });
        },
    });

    return router;
};
