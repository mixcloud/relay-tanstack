import * as Sentry from '@sentry/tanstackstart-react';
import {
    createMiddleware,
    // @ts-ignore missing type for some reason
    registerGlobalMiddleware,
} from '@tanstack/react-start';

registerGlobalMiddleware({
    middleware: [
        createMiddleware().server(Sentry.sentryGlobalServerMiddlewareHandler()),
    ],
});
