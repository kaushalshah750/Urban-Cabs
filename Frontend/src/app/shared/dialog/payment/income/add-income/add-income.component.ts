import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEditIncomeResponse, Income } from 'src/app/shared/Models/Income';
import { IncomeService } from 'src/app/shared/service/income.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent {
  isLoading:boolean = false

  incomeForm = this.formBuilder.nonNullable.group({
    Reason: ['', Validators.required],
    Amount: [0, Validators.required],
    Income_Date: [new Date(), Validators.required],
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Income,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private incomeService: IncomeService,
    public dialogRef: MatDialogRef<AddIncomeComponent>,
  ){}

  ngOnInit(){
    if(this.data != null){
      this.loadIncomeData()
    }
  }

  loadIncomeData(){
    this.incomeForm.controls['Reason'].setValue(this.data.Reason)
    this.incomeForm.controls['Amount'].setValue(this.data.Amount)
    this.incomeForm.controls['Income_Date'].setValue(this.dateFormat(new Date(this.data.Income_Date)))
  }

  dateFormat(oldDate:Date){
    var newDate:any = oldDate.getFullYear() + (oldDate.getMonth() < 10 ? "-0"+ (oldDate.getMonth() + 1) : "-" + (oldDate.getMonth() + 1)) + (oldDate.getDate() < 10 ? "-0"+ oldDate.getDate() : "-" + oldDate.getDate())
    return newDate
  }

  editIncome(){
    var income:Income = {
      Id: this.data.Id,
      Reason: this.incomeForm.controls['Reason'].value,
      Amount: this.incomeForm.controls['Amount'].value,
      Income_Date: this.incomeForm.controls['Income_Date'].value,
      Added_on: new Date()
    }

    this.incomeService.editIncome(income).subscribe((res:AddEditIncomeResponse) => {
      this.dialogRef.close(true);
    })
  }

  addNewIncome(){
    var income:Income = {
      Id: 0,
      Reason: this.incomeForm.controls['Reason'].value,
      Amount: this.incomeForm.controls['Amount'].value,
      Income_Date: this.incomeForm.controls['Income_Date'].value,
      Added_on: new Date()
    }

    this.incomeService.addNewIncome(income).subscribe((res:AddEditIncomeResponse) => {
      this.dialogRef.close(true);
    })
  }

}
