import * as React from "react";
import { createRoot } from 'react-dom/client'
import "./styles/reset.scss";
import '@/config/i18next/i18next'
import { App } from "./App";
import { QueryProvider } from "./Provider/QueryProvider";

const container = document.getElementById('root');

if (!container) {
    throw new Error('conteiner is absent');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryProvider>
        <App />
    </QueryProvider>
  </React.StrictMode>,
);
