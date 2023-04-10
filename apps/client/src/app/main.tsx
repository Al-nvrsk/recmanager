import * as React from "react";
import { createRoot } from 'react-dom/client'
import "./styles/index.scss";
import '@/config/i18next/i18next'
import { App } from "./App";
import { QueryProvider } from "./providers/QueryProvider/QueryProvider";
import { ErrorBoundary } from "./providers/ErrorBoundary";

const container = document.getElementById('root');

if (!container) {
    throw new Error('conteiner is absent');
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <QueryProvider>
                <App />
            </QueryProvider>
        </ErrorBoundary>
    </React.StrictMode>,
);
