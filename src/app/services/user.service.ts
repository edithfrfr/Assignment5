import { Injectable, signal } from '@angular/core';

export interface UserProfile {
  name: string;
  email: string;
  monthlyGoal: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {

  profile = signal<UserProfile>({
    name: 'Edith',
    email: 'edith@example.com',
    monthlyGoal: 2000
  });

  updateProfile(data: Partial<UserProfile>) {
    this.profile.update(p => ({ ...p, ...data }));
  }
}
