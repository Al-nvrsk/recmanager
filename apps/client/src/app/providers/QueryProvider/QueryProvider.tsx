import * as React from "react";
import { trpc } from "../../../shared/hooks/trpc/trpc";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { isDev } from "@/shared/const/isDev";

interface QueryProviderProps {
    children: React.ReactNode
}

export const QueryProvider = (props: QueryProviderProps) => {
    const {children} = props
    const queryClient = new QueryClient();
    console.log('isDev()', __IS_DEV__)
    console.log('///', `${ isDev() ? __SERVER_URL__: ''}/trpc`)
    const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: `${ isDev() ? __SERVER_URL__: ''}/trpc`,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: 'include',
          });
        }
      }),
    ],
  })

return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </trpc.Provider>
);
}
