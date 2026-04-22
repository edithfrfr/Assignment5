import { Injectable, inject } from '@angular/core';
// import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
// import { addDoc } from '@angular/fire/firestore';
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

  // private firestore = inject(Firestore);
  // private expenseCollection = collection(this.firestore, 'expenses');

  constructor() {
  console.log("💰 ExpenseService constructed");
}


  // CREATE
  addExpense(expense: Expense) {
    console.log("Mock addExpense called", expense);
  return Promise.resolve();
    // return addDoc(this.expenseCollection, expense);
  }

  // READ
  getExpenses(uid: string): Observable<Expense[]> {
    console.log("Mock getExpenses called", uid);
  return new Observable<Expense[]>(observer => {
    observer.next([]); // return empty list
    observer.complete();
  })
    // return collectionData(this.expenseCollection, { idField: 'id' }) as Observable<Expense[]>;
  }

  // UPDATE
  updateExpense(id: string, data: Partial<Expense>) {
    console.log("Mock updateExpense called", id, data);
  return Promise.resolve();
    // const ref = doc(this.firestore, `expenses/${id}`);
    // return updateDoc(ref, data);
  }

  // DELETE
  deleteExpense(id: string) {

    console.log("Mock deleteExpense called", id);
  return Promise.resolve();
    // const ref = doc(this.firestore, `expenses/${id}`);
    // return deleteDoc(ref);
  }
}
