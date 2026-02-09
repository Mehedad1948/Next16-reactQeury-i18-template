import { fetchUserProfile } from '@/actions/user';
import { getQueryClient } from '@/lib/query-client';
import { userService } from '@/services/user.service';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';

export default async function UserDataHydrator({ children }: { children: ReactNode }) {
    const queryClient = getQueryClient()

    // We pay the "Boilerplate Tax" here because we need 
    // the client-side interactivity (Optimistic updates, etc.)
    await queryClient.prefetchQuery({
        queryKey: ['user', '1'],
        queryFn: async () => await await fetchUserProfile('1'),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
}