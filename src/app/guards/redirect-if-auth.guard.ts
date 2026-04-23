import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const redirectIfAuthGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.currentUser();

  console.log("redirectIfAuthGuard running. currentUser =", user);

  if (user) {
    return router.parseUrl('/dashboard');
  }

  return true;
};
