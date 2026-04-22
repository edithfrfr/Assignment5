import { Component, inject, signal, computed } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  private expenseService = inject(ExpenseService);
  private auth = inject(AuthService);

  expenses = signal<any[]>([]);

  constructor() {
    const uid = this.auth.currentUser()?.uid;
    if (!uid) return;

    this.expenseService.getExpenses(uid).subscribe(list => {
      this.expenses.set(list);
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
}
