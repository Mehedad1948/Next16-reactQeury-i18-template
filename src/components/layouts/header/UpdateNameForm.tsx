'use client'

import { updateUserProfile } from '@/actions/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function UpdateNameForm() {
    const [name, setName] = useState('');
    const queryClient = useQueryClient(); // 1. Get the Client

    const mutation = useMutation({
        mutationFn: async (newName: string) => {
            // Hardcoded ID '1' for demo, usually comes from props or auth session
            return await updateUserProfile('1', newName);
        },
        onSuccess: () => {
            // 2. ✨ MAGIC MOMENT: 
            // This tells React Query: "The data for ['user', '1'] is old. Refetch it everywhere!"
            queryClient.invalidateQueries({ queryKey: ['user', '1'] });
            
            alert('Name updated!');
            setName('');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(name);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded mt-4">
            <h3>Update Your Name</h3>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter new name"
                    className="border p-2 rounded text-black"
                />
                <button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
                >
                    {mutation.isPending ? 'Updating...' : 'Save'}
                </button>
            </div>
        </form>
    );
}
