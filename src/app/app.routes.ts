import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { redirectIfAuthGuard } from './guards/redirect-if-auth.guard';

export const routes: Routes = [

  // Redirect root → dashboard (protected)
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  // Public routes
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component')
        .then(m => m.LoginComponent),
    canActivate: [redirectIfAuthGuard]
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component')
        .then(m => m.RegisterComponent),
    
  },

  // Protected routes
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/add-expense.component/add-expense.component')
        .then(m => m.AddExpenseComponent),
    canActivate: [authGuard]
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./pages/transactions/transactions.component')
        .then(m => m.TransactionsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/edit-expense/edit-expense.component')
        .then(m => m.EditExpenseComponent),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories/categories.component')
        .then(m => m.CategoriesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'budget',
    loadComponent: () =>
      import('./pages/budget/budget.component')
        .then(m => m.BudgetComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component')
        .then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  

];
