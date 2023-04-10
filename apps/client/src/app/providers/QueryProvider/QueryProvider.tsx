import * as React from "react";
import { trpc } from "../../../shared/hooks/trpc";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';

interface QueryProviderProps {
    children: React.ReactNode
}

export const QueryProvider = (props: QueryProviderProps) => {
    const {children} = props
    const queryClient = new QueryClient();
    const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: __SERVER_URL__
        // SERVER_URL__
      //   // You can pass any HTTP headers you wish here
      //   async headers() {
      //     return {
      //       authorization: getAuthCookie(),
      //     };
      //   },
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
