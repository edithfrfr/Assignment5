import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnimations} from '@angular/platform-browser/animations';


const firebaseConfig = {

  apiKey: "AIzaSyCgJ03vpyqv5XtY0ENUZbd80uAQBYABchg",
  authDomain: "crud-demo-26af5.firebaseapp.com",
  projectId: "crud-demo-26af5",
  storageBucket: "crud-demo-26af5.firebasestorage.app",
  messagingSenderId: "604793608536",
  appId: "1:604793608536:web:faf33b8b3fa52449046d2d",
  measurementId: "G-1E7JT18VG1"

};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())

  ]
};
