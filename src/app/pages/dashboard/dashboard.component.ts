import { Component, inject, signal, computed, effect } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { AuthService } from '../../services/auth.service';
import { BudgetService } from '../../services/budget.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  private expenseService = inject(ExpenseService);
  private auth = inject(AuthService);
  private budgetService = inject(BudgetService);
  private categoryService = inject(CategoryService);

  expenses = signal<any[]>([]);
  budgets = this.budgetService.budgets;
  categories = this.categoryService.categories;

  constructor() {
  effect(() => {                             
    const uid = this.auth.currentUser()?.uid;
    if (!uid) return;
    this.expenseService.getExpenses(uid).subscribe(list => {
      this.expenses.set(list);
    });
  });
}

  totalIncome = computed(() =>
    this.expenses().filter(x => x.type === 'Income')
      .reduce((sum, x) => sum + x.amount, 0)
  );

  totalExpenses = computed(() =>
    this.expenses().filter(x => x.type === 'Expense')
      .reduce((sum, x) => sum + x.amount, 0)
  );

  netBalance = computed(() =>
    this.totalIncome() - this.totalExpenses()
  );

  categoryTotals = computed(() => {
    const map: Record<string, number> = {};
    for (const tx of this.expenses()) {
      if (tx.type === 'Expense') {
        map[tx.category] = (map[tx.category] || 0) + tx.amount;
      }
    }
    return Object.entries(map).map(([category, amount]) => ({ category, amount }));
  });

  categorySpending = computed(() => {
  const map: Record<string, number> = {};

  for (const tx of this.expenses()) {
    if (tx.type === 'Expense') {
      map[tx.category] = (map[tx.category] || 0) + tx.amount;
    }
  }

  return map;
});


budgetProgress = computed(() => {
  return this.categories().map(cat => {
    const budget = this.budgets().find(b => b.categoryId === cat.id);
    const spent = this.categorySpending()[cat.name] || 0;

    return {
      id: cat.id,
      name: cat.name,
      color: cat.color,
      icon: cat.icon,
      budget: budget?.amount ?? 0,
      spent,
      percent: budget ? Math.min((spent / budget.amount) * 100, 200) : 0,
      over: budget ? spent > budget.amount : false
    };
  });
});

}
