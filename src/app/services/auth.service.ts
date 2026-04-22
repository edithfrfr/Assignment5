import { Injectable, signal } from '@angular/core';
// import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
// import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // currentUser = signal<User | null>(null);
  currentUser = signal<any | null>({uid: "mock-user-id"});

//   constructor(private auth: Auth) {
//   console.log("🔑 AuthService constructed");
//   queueMicrotask(() => {
//     user(this.auth).subscribe(u => this.currentUser.set(u));
//   });
// }
constructor() {
  console.log("🔑 Mock AuthService constructed");
}
register(email: string, password: string) {
  console.log("Mock register:", email);
  return Promise.resolve();
}

login(email: string, password: string) {
  console.log("Mock login:", email);
  return Promise.resolve();
}

logout() {
  console.log("Mock logout");
  return Promise.resolve();
}



  // register(email: string, password: string) {
  //   return createUserWithEmailAndPassword(this.auth, email, password);
  // }

  // login(email: string, password: string) {
  //   return signInWithEmailAndPassword(this.auth, email, password);
  // }

  // logout() {
  //   return signOut(this.auth);
  // }
}
