import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './styles.css';

function Home() {
    return (
        <main className="app-shell">
            <header className="page-header">
                <p className="eyebrow">Public directory</p>
                <h1>Financial Institution Finder</h1>
                <p className="intro">
                    Search and browse public financial institution records from Salesforce.
                </p>
            </header>
            <section className="placeholder-panel" aria-label="Implementation status">
                <h2>No-Apex external React scaffold</h2>
                <p>
                    The next step connects this app to Salesforce GraphQL UI API data for public,
                    active Account records.
                </p>
            </section>
        </main>
    );
}

function NotFound() {
    return (
        <main className="app-shell">
            <h1>Page not found</h1>
        </main>
    );
}

const rawBasePath = window.SFDC_ENV?.basePath;
const basename = typeof rawBasePath === 'string' ? rawBasePath.replace(/\/+$/, '') : undefined;

const router = createBrowserRouter(
    [
        { path: '/', element: <Home /> },
        { path: '*', element: <NotFound /> }
    ],
    { basename }
);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
