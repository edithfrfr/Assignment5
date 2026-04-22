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
  },
  {
  path: 'transactions',
  loadComponent: () =>
    import('./pages/transactions/transactions.component')
      .then(m => m.TransactionsComponent)
},
{
  path: 'edit/:id',
  loadComponent: () =>
    import('./pages/edit-expense/edit-expense.component')
      .then(m => m.EditExpenseComponent)
}, 
{
  path: 'dashboard',
  loadComponent: () =>
    import('./pages/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
},
{
  path: 'categories',
  loadComponent: () =>
    import('./pages/categories/categories.component')
      .then(m => m.CategoriesComponent)
},
{
  path: 'budget',
  loadComponent: () =>
    import('./pages/budget/budget.component')
      .then(m => m.BudgetComponent)
},
{
  path: 'profile',
  loadComponent: () =>
    import('./pages/profile/profile.component')
      .then(m => m.ProfileComponent)
}






];
