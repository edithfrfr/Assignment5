import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // 👈 removed MatFormField
import { MatInputModule } from '@angular/material/input';          // 👈 removed MatInput
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../services/category.service';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';         // 👈 add this

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private expenseService = inject(ExpenseService);
  private auth = inject(AuthService);   //add this
  private router = inject(Router);

  categories = this.categoryService.categories;
  id = this.route.snapshot.paramMap.get('id')!;

  form = this.fb.nonNullable.group({
    amount: [0, Validators.required],
    category: ['', Validators.required],
    date: ['', Validators.required],
    notes: [''],
    type: ['', Validators.required]
  });

  constructor() {
    const uid = this.auth.currentUser()?.uid;  //use real uid
    if (!uid) return;

    this.expenseService.getExpenses(uid).subscribe(list => {
      const tx = list.find(x => x.id === this.id);
      if (tx) this.form.patchValue(tx);
    });
  }

  save() {
    if (this.form.invalid) return;
    const raw = this.form.value;
    const data = {
      amount: Number(raw.amount),
      category: raw.category ?? '',
      date: raw.date ?? '',
      notes: raw.notes ?? '',
      type: raw.type ?? ''
    };
    this.expenseService.updateExpense(this.id, data)
      .then(() => this.router.navigate(['/transactions'])); //navigate after save
  }
}