import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditCab } from 'src/app/shared/Models/AddCab';
import { AddEditExpenseResponse, Expense } from 'src/app/shared/Models/Expense';
import { ExpenseService } from 'src/app/shared/service/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent {
  isLoading:boolean = false

  expenseForm = this.formBuilder.nonNullable.group({
    Reason: ['', Validators.required],
    Amount: [0, Validators.required],
    Expense_Date: [new Date(), Validators.required],
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Expense,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    public dialogRef: MatDialogRef<AddExpenseComponent>,
  ){}

  ngOnInit(){
    if(this.data != null){
      this.loadExpenseData()
    }
  }

  loadExpenseData(){
    this.expenseForm.controls['Reason'].setValue(this.data.Reason)
    this.expenseForm.controls['Amount'].setValue(this.data.Amount)
    this.expenseForm.controls['Expense_Date'].setValue(this.dateFormat(new Date(this.data.Expense_Date)))
  }

  dateFormat(oldDate:Date){
    var newDate:any = oldDate.getFullYear() + (oldDate.getMonth() < 10 ? "-0"+ (oldDate.getMonth() + 1) : "-" + (oldDate.getMonth() + 1)) + (oldDate.getDate() < 10 ? "-0"+ oldDate.getDate() : "-" + oldDate.getDate())
    return newDate
  }

  editExpense(){
    var expense:Expense = {
      Id: this.data.Id,
      Reason: this.expenseForm.controls['Reason'].value,
      Amount: this.expenseForm.controls['Amount'].value,
      Expense_Date: this.expenseForm.controls['Expense_Date'].value,
      Added_on: new Date()
    }

    this.expenseService.editExpense(expense).subscribe((res:AddEditExpenseResponse) => {
      this.dialogRef.close(true);
    })
  }

  addNewExpense(){
    var expense:Expense = {
      Id: 0,
      Reason: this.expenseForm.controls['Reason'].value,
      Amount: this.expenseForm.controls['Amount'].value,
      Expense_Date: this.expenseForm.controls['Expense_Date'].value,
      Added_on: new Date()
    }

    this.expenseService.addNewExpense(expense).subscribe((res:AddEditExpenseResponse) => {
      console.log(res)
      this.dialogRef.close(true);
    })
  }

}
