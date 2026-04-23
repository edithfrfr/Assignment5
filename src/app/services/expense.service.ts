import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Expense {
  id?: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
  type: string;
  uid: string;
}

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private firestore = inject(Firestore);
  private expenseCollection = collection(this.firestore, 'expenses');

  addExpense(expense: Expense) {
    return addDoc(this.expenseCollection, expense);
  }

  getExpenses(uid: string): Observable<Expense[]> {
    const q = query(this.expenseCollection, where('uid', '==', uid));
    return collectionData(q, { idField: 'id' }) as Observable<Expense[]>;
  }

  updateExpense(id: string, data: Partial<Expense>) {
    const ref = doc(this.firestore, `expenses/${id}`);
    return updateDoc(ref, data);
  }

  deleteExpense(id: string) {
    const ref = doc(this.firestore, `expenses/${id}`);
    return deleteDoc(ref);
  }
}