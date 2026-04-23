import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';


import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

console.log("🔥 app.config.ts LOADED");

const firebaseConfig = {
  apiKey: "AIzaSyDZ_3qLgo_gQtrIa26hMn2lgsLSvRJGtIE",
  authDomain: "assignment5-expenses.firebaseapp.com",
  projectId: "assignment5-expenses",
  storageBucket: "assignment5-expenses.firebasestorage.app",
  messagingSenderId: "839332641650",
  appId: "1:839332641650:web:a14dbbeb5ff268cd3b7beb",
  measurementId: "G-EG0GNMGBHZ"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};
