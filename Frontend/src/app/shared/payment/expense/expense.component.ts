import { Component } from '@angular/core';
import { AddEditExpenseResponse, Expense, ExpensesResponse } from '../../Models/Expense';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseService } from '../../service/expense.service';
import { AddExpenseComponent } from '../../dialog/payment/expense/add-expense/add-expense.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent {
  expenses:Expense[] = []

  constructor(
    private expenseService: ExpenseService,
    public dialog: MatDialog,
  ){}

  ngOnInit(){
    this.getExpenseList()
  }

  getExpenseList(){
    this.expenseService.getExpenseList().subscribe((res:ExpensesResponse) => {
      this.expenses = res.data
    })
  }

  addExpense(){
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getExpenseList()
    });
  }

  editExpense(expense:Expense){
    var editExpense:Expense = {
      Id: expense.Id,
      Reason: expense.Reason,
      Amount: expense.Amount,
      Expense_Date: expense.Expense_Date,
      Added_on: expense.Added_on
    }

    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '800px',
      data: editExpense
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getExpenseList()
    });
  }

  deleteExpense(expense:Expense){
    this.expenseService.deleteExpense(expense.Id).subscribe((res:AddEditExpenseResponse) => {
      this.getExpenseList()
    })
  }

}
