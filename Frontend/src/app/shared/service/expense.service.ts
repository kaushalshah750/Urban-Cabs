import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ExpensesResponse, Expense, AddEditExpenseResponse } from '../Models/Expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  url = 'api/expense'

  constructor(
    private authHttp: AuthService
  ) { }
  
  getExpenseList(){
    return this.authHttp.get<ExpensesResponse>( this.url )
  }
  
  addNewExpense(expense:Expense){
    return this.authHttp.post<AddEditExpenseResponse>( this.url + "/add", expense )
  }
  
  editExpense(expense:Expense){
    return this.authHttp.post<AddEditExpenseResponse>( this.url + "/edit", expense )
  }
  
  deleteExpense(id:number){
    return this.authHttp.delete<AddEditExpenseResponse>( this.url + "/" + id + "/delete" )
  }
}
