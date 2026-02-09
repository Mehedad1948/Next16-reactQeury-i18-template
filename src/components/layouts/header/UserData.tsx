
'use client'

import { fetchUserProfile } from '@/actions/user';
import { userService } from '@/services/user.service';

import { useQuery } from '@tanstack/react-query';

export default function UserData() {
    const { data, isLoading, } = useQuery({
        queryKey: ['user', '1'],
        queryFn: async () => await fetchUserProfile('1'),
    })

    return (
        <div >
            {isLoading ? 'Loading...' : data?.result?.name}
            <br />
        </div>
    );
}