import { createFileRoute } from '@tanstack/react-router';
import { graphql, usePreloadedQuery } from 'react-relay';
import relayQuery from '@/__generated__/relayQuery.graphql.ts';

import { loadQuery } from 'react-relay';
import relayEnvironment from '@/lib/relay/environment.ts';

import type { relayQuery as relayQueryType } from '@/__generated__/relayQuery.graphql.ts';
import Film from '@/components/Film.tsx';

export const Route = createFileRoute('/_pathlessLayout/relay/')({
    component: RouteComponent,
    loader: () => {
        return {
            queryRefs: {
                relayQuery: loadQuery(
                    relayEnvironment.getEnvironment(),
                    relayQuery,
                    {},
                ),
            },
        };
    },
});

function RouteComponent() {
    const { queryRefs } = Route.useLoaderData();
    const data = usePreloadedQuery<relayQueryType>(
        graphql`
            query relayQuery {
                allFilms {
                    films {
                        id
                        ...Film_item
                    }
                }
            }
        `,
        queryRefs.relayQuery,
    );

    const films = data.allFilms?.films?.filter((film) => film != null);

    return (
        <div>
            <h1>Star Wars Films</h1>
            {films?.map((film) => (
                <Film key={film.id} film={film} />
            ))}
        </div>
    );
}
