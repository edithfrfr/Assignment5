import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-expense.component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css',
})
export class AddExpenseComponent {

  private fb = inject(FormBuilder);
  private expenseService = inject(ExpenseService);
  private categoryService = inject(CategoryService);
  private auth = inject(AuthService);
  private router = inject(Router);

  categories = this.categoryService.categories;

  types = ['Income', 'Expense'];

  form = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    category : ['', Validators.required],
    date: ['', Validators.required],
    notes: [''],
    type: ['Expense', Validators.required]
  });

  submit(){
    if (this.form.invalid) return;

    const uid = this.auth.currentUser()?.uid;
    if (!uid) return;

    const raw = this.form.value;

    const data = {
      amount: Number(raw.amount),
      category: raw.category!,
      date: raw.date!,
      notes: raw.notes ?? '',
      type: raw.type!,
      uid
    };
    
    this.expenseService.addExpense(data).then(() => {
      this.router.navigate(['/transactions']);
    });

    
  }

}
