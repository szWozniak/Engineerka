import React from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';

const QueryClientContext = (props : any) => {
    const client = new QueryClient()

    return (
        <QueryClientProvider client={client}>
            {props.children}
        </QueryClientProvider>
    );
};

export default QueryClientContext;