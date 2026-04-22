import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);

  categories = this.categoryService.categories;

  form = this.fb.group({
    name: ['', Validators.required],
    color: ['#1976d2', Validators.required],
    icon: ['']
  });

  add() {
    if (this.form.invalid) return;

    const value = this.form.value;

    this.categoryService.addCategory({
      id: crypto.randomUUID(),
      name: value.name!,
      color: value.color!,
      icon: value.icon || '📁'
    });

    this.form.reset({ color: '#1976d2', icon: '' });
  }
}
