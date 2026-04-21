import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
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

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private firestore = inject(Firestore);
  private expenseCollection = collection(this.firestore, 'expenses');

  // CREATE
  addExpense(expense: Expense) {
    return addDoc(this.expenseCollection, expense);
  }

  // READ
  getExpenses(uid: string): Observable<Expense[]> {
    return collectionData(this.expenseCollection, { idField: 'id' }) as Observable<Expense[]>;
  }

  // UPDATE
  updateExpense(id: string, data: Partial<Expense>) {
    const ref = doc(this.firestore, `expenses/${id}`);
    return updateDoc(ref, data);
  }

  // DELETE
  deleteExpense(id: string) {
    const ref = doc(this.firestore, `expenses/${id}`);
    return deleteDoc(ref);
  }
}
