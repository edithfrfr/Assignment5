import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'add',
    pathMatch: 'full'
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/add-expense.component/add-expense.component')
        .then(m => m.AddExpenseComponent)
  }
];
