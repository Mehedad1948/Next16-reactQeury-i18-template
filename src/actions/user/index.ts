'use server'

import { userService } from '@/services/user.service';

// This function acts as the bridge.
// The Client calls this function -> This function calls the Class on the server.
export async function fetchUserProfile(id: string) {
    const data = await userService.getOne(id);
    console.log('🎄🎄 I called fetchUserProfile', data);
    
    return data
}




export async function updateUserProfile(id: string, name: string) {
    const data = await userService.update(id, { name });
     console.log('❤️❤️ updateUserProfile I called', data, name);
    return data;
}