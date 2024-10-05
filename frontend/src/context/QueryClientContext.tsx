import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const QueryClientContext = (props : any) => {
    const client = new QueryClient()

    return (
        <QueryClientProvider client={client}>
            {props.children}
        </QueryClientProvider>
    );
};

export default QueryClientContext;