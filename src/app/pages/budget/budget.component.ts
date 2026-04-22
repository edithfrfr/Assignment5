import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { BudgetService } from '../../services/budget.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

  private categoryService = inject(CategoryService);
  private budgetService = inject(BudgetService);
  private fb = inject(FormBuilder);

  categories = this.categoryService.categories;
  budgets = this.budgetService.budgets;

  form = this.fb.group({
    amount: [0, Validators.required]
  });

  selectedCategoryId: string | null = null;

  selectCategory(id: string) {
    this.selectedCategoryId = id;

    const existing = this.budgets().find(b => b.categoryId === id);
    this.form.patchValue({
      amount: existing ? existing.amount : 0
    });
  }

  save() {
    if (!this.selectedCategoryId || this.form.invalid) return;

    this.budgetService.setBudget(
      this.selectedCategoryId,
      Number(this.form.value.amount)
    );
  }
}
