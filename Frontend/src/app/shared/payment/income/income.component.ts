import { Component } from '@angular/core';
import { IncomeService } from '../../service/income.service';
import { AddEditIncomeResponse, Income, IncomesResponse } from '../../Models/Income';
import { AddIncomeComponent } from '../../dialog/payment/income/add-income/add-income.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})

export class IncomeComponent {
  incomes:Income[] = []

  constructor(
    private incomeService: IncomeService,
    public dialog: MatDialog,
  ){}

  ngOnInit(){
    this.getIncomeList()
  }

  getIncomeList(){
    this.incomeService.getIncomeList().subscribe((res:IncomesResponse) => {
      this.incomes = res.data
    })
  }

  addIncome(){
    const dialogRef = this.dialog.open(AddIncomeComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getIncomeList()
    });
  }

  editIcome(income:Income){
    var editIcome:Income = {
      Id: income.Id,
      Reason: income.Reason,
      Amount: income.Amount,
      Income_Date: income.Income_Date,
      Added_on: income.Added_on
    }

    const dialogRef = this.dialog.open(AddIncomeComponent, {
      width: '800px',
      data: editIcome
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getIncomeList()
    });
  }

  deleteIcome(income:Income){
    this.incomeService.deleteIncome(income.Id).subscribe((res:AddEditIncomeResponse) => {
      this.getIncomeList()
    })
  }
}
