import { Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = signal<User | null>(null);

  constructor(private auth: Auth) {
  queueMicrotask(() => {
    user(this.auth).subscribe(u => this.currentUser.set(u));
  });
}


  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
