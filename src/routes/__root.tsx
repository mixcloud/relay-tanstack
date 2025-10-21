import {
    HeadContent,
    Outlet,
    Scripts,
    createRootRoute,
} from '@tanstack/react-router';
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
// import { TanstackDevtools } from '@tanstack/react-devtools';
import { RelayEnvironmentProvider } from 'react-relay';
import appCss from '@/styles.css?url';

import { StrictMode } from 'react';

import relayEnvironment from '@/lib/relay/environment.ts';

export const Route = createRootRoute({
    shellComponent: RootComponent,
        head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'TanStack Start Starter',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),
});

function RootComponent() {
    return (
        <StrictMode>
            <RelayEnvironmentProvider
                environment={relayEnvironment.getEnvironment()}
            >
                <html lang="en">
                    <head>
                        <HeadContent />
                    </head>
                    <body>
                        {/* all your route components render inside <Outlet /> */}
                        <Outlet />
                        {/* <TanstackDevtools
                            config={{
                                position: 'bottom-left',
                            }}
                            plugins={[
                                {
                                    name: 'Tanstack Router',
                                    render: <TanStackRouterDevtoolsPanel />,
                                },
                            ]}
                        /> */}
                        <Scripts />
                    </body>
                </html>
            </RelayEnvironmentProvider>
        </StrictMode>
    );
}
