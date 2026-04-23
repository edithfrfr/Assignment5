import { Component, inject, signal, computed } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private expenseService = inject(ExpenseService);
  private auth = inject(AuthService);
  private router = inject(Router);

  expenses = signal<any[]>([]);
  categories = this.categoryService.categories;

  filterForm = this.fb.group({
  startDate: [''],
  endDate: [''],
  category: [''],
  minAmount: [''],
  maxAmount: ['']
});


filteredTransactions = computed(() => {
  const list = this.expenses();
  const f = this.filterForm.value;

  return list.filter(tx => {
    // Date range
    if (f.startDate && tx.date < f.startDate) return false;
    if (f.endDate && tx.date > f.endDate) return false;

    // Category
    if (f.category && tx.category !== f.category) return false;

    // Amount range
    if (f.minAmount && tx.amount < Number(f.minAmount)) return false;
    if (f.maxAmount && tx.amount > Number(f.maxAmount)) return false;

    return true;
  });
});


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
