import { User } from '@/types';
import { WebServices } from './index.service';

class UserServices {
  private webService = new WebServices('/user');

  async getOne(id: string | number) {
    const data = await this.webService.get<User>(`/${id}`)
    return data
  }

  // 👇 ADD THIS
  async update(id: string | number, payload: Partial<User>) {
    // mockApi usually uses PUT or PATCH
    const data = await this.webService.put<User>(`/${id}`, {body:payload}); 
    return data;
  }
}

export const userService = new UserServices();
