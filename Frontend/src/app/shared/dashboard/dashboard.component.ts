import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Loans, LoansResponse, RemoveLoanResponse } from '../Models/Loans';
import { LoanService } from '../service/loan.service';
import { MatDialog } from '@angular/material/dialog';
import { EditLoan } from '../Models/AddLoan';
import { AddLoanComponent } from '../dialog/loan/add-loan/add-loan.component';
import { MonthEMI, MonthEMIResponse } from '../Models/MonthEMI';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../dialog/snackbar/snackbar.component';
import { Snackbar } from '../Models/Snackbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  monthlyEmi:MonthEMI = {
    Monthly_emi: 0
  }
  loans:Loans[] = []
  return:number[] = []
  totalInvestment:number = 0
  
  createForm = this.formBuilder.nonNullable.group({
    montly: [5000, Validators.required],
    interestRate: [15, Validators.required],
    years: [10, Validators.required],
  })

  constructor(
    private loanService: LoanService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(){
    this.getLoanList()
    this.calculateReturn()
    this.getMonthlyEMI()
  }
  
  getMonthlyEMI(){
    this.loanService.getMonthlyEMI().subscribe((res: MonthEMIResponse) => {
      this.monthlyEmi = res.data
    })
  }

  removeLoan(loan_id:number){
    this.loanService.removeLoan(loan_id).subscribe((res: RemoveLoanResponse) => {
      if (res.data){
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: "The Loan is Successfully Removed from the Cab.",
            status: "success"
          },
          panelClass: ['success-sb']
        });
        this.getLoanList()
      }else{
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: Snackbar.error.apiError,
            status: "error"
          },
          panelClass: ['error-sb']
        });
      }
    })
  }
  
  getLoanList(){
    this.loanService.getLoanList().subscribe((res: LoansResponse) => {
      this.loans = res.data
    })
  }

  calculateReturn(){
    this.return = this.calculateCompoundInterest(0, this.createForm.controls['montly'].value, this.createForm.controls['interestRate'].value, this.createForm.controls['years'].value)
    this.totalInvestment = this.totalInvested(this.createForm.controls['montly'].value, this.createForm.controls['years'].value)
  }

  totalInvested(monthlyContribution:number, years:number){
    var months = years * 12;
    return monthlyContribution * months
  }

  editLoan(loanData:Loans){
    var editLoanData:EditLoan = {
      Loan_id: loanData.Loan_id,
      Cab_id: loanData.Cab.Cab_id,
      Bank_id: loanData.Bank.Bank_id,
      Amount: loanData.Amount,
      Disbursed_amount: loanData.Disbursed_amount,
      Interest_rate: loanData.Interest_rate,
      Monthly_emi: loanData.Monthly_emi,
      Tenure: loanData.Tenure,
      Borrowed_by: loanData.Borrowed_by.User_id,
      Status: loanData.Status,
      Start_date: loanData.Start_date,
      End_date: loanData.End_date,
    }

    const dialogRef = this.dialog.open(AddLoanComponent, {
      width: '800px',
      data: editLoanData
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getLoanList()
    });
  }

  calculateCompoundInterest(principal: number, monthlyContribution: number, annualInterestRate: number, years: number): number[] {
    let totalAmounts: number[] = [];
    let amount = principal;
    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        amount += monthlyContribution;
        amount *= (1 + (annualInterestRate / 100) / 12);
      }
      totalAmounts.push(Math.floor(amount));
    }
    return totalAmounts;
  }
}
