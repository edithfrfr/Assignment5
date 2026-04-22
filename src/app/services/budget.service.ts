import { Injectable, signal } from '@angular/core';

export interface Budget {
  categoryId: string;
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class BudgetService {

  budgets = signal<Budget[]>([
    // Example defaults — optional
    { categoryId: '1', amount: 500 },
    { categoryId: '2', amount: 1500 },
    { categoryId: '3', amount: 300 },
    { categoryId: '4', amount: 250 }
  ]);

  setBudget(categoryId: string, amount: number) {
    this.budgets.update(list => {
      const existing = list.find(b => b.categoryId === categoryId);
      if (existing) {
        existing.amount = amount;
        return [...list];
      }
      return [...list, { categoryId, amount }];
    });
  }
}
