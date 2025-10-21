import { Outlet, createFileRoute } from '@tanstack/react-router';

import Header from '@/components/Header';

export const Route = createFileRoute('/_pathlessLayout')({
    component: App,
});

function App() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
