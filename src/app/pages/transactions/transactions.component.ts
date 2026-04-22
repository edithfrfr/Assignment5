import { Component, inject, signal, effect } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {

  private expenseService = inject(ExpenseService);
  private auth = inject(AuthService);
  private router = inject(Router);

  expenses = signal<any[]>([]);

  constructor() {
    const uid = this.auth.currentUser()?.uid;
    if (!uid) return;

    this.expenseService.getExpenses(uid).subscribe(list => {
      this.expenses.set(list);
    });
  }

  delete(id: string) {
    this.expenseService.deleteExpense(id).then(() => {
      console.log("Deleted", id);
    });
  }

  edit(id: string) {
    this.router.navigate(['/edit', id]);
  }
}
