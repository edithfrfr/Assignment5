import { Injectable, signal } from '@angular/core';

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {

  categories = signal<Category[]>([
    { id: '1', name: 'Food', color: '#ff7043', icon: '🍔' },
    { id: '2', name: 'Rent', color: '#42a5f5', icon: '🏠' },
    { id: '3', name: 'Travel', color: '#66bb6a', icon: '✈️' },
    { id: '4', name: 'Entertainment', color: '#ab47bc', icon: '🎬' }
  ]);

  addCategory(cat: Category) {
    this.categories.update(list => [...list, cat]);
  }
}
