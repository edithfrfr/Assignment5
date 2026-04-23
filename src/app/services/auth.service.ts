import { Injectable, signal } from '@angular/core';
import { Auth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         signOut, 
         onAuthStateChanged, 
         User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 🔥 Signal that holds the current user
  currentUser = signal<User | null>(null);

  constructor(private auth: Auth, private router: Router) {
    // Listen for login/logout changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
      console.log("Auth state changed:", user);
    });
  }

  // 🔥 Register new user
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // 🔥 Login existing user
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // 🔥 Logout
  logout() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }

  // 🔥 Helper: is user logged in?
  isLoggedIn() {
    return this.currentUser() !== null;
  }
}
