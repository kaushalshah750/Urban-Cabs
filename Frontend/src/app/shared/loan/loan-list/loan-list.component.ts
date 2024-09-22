import { Component } from '@angular/core';
import { LoanService } from '../../service/loan.service';
import { Loans, LoansResponse, RemoveLoanResponse } from '../../Models/Loans';
import { Banks, BanksResponse } from '../../Models/Banks';
import { UserService } from '../../service/user.service';
import { UserDetail, UserDetailResponse } from '../../Models/UserDetail';
import { MatDialog } from '@angular/material/dialog';
import { AddLoanComponent } from '../../dialog/loan/add-loan/add-loan.component';
import { AddLoan, EditLoan } from '../../Models/AddLoan';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../Models/Snackbar';
import { SnackbarComponent } from '../../dialog/snackbar/snackbar.component';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent {
  loans:Loans[] = []
  banks:Banks[] = []
  users:UserDetail[] = []
  bankFilter:number = 0
  userFilter:number = 0
  statusFilter:string = ""
  param:any = {}

  constructor(
    private loanService: LoanService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ){}

  ngOnInit(){
    this.getLoanList()
    this.getBankList()
    this.getUsers()
    this.getParams()
  }
  
  getParams(){
    if(this.router.url.slice(7)){
      this.router.url.slice(7).split('&').forEach(ele => {
        this.param[ele.replace('%20', ' ').split('=')[0]] = ele.replace('%20', ' ').split('=')[1]
      });
    }else{
      this.param = null
    }
  }

  getLoanList(){
    this.loanService.getLoanList().subscribe((res: LoansResponse) => {
      this.loans = res.data
    })
  }

  getBankList(){
    this.loanService.getBankList().subscribe((res:BanksResponse) => {
      this.banks = res.data
    })
  }

  getUsers(){
    this.userService.getUsers().subscribe((res:UserDetailResponse) => {
      this.users = res.data
    })
  }

  getTenure(tenure:number){
    return tenure + "Months ( " + Math.round(tenure/12) + " Years )"
  }

  clearFilter(){
    this.bankFilter = 0
    this.userFilter = 0
    this.statusFilter = ""
  }

  addNewLoan(){
    const dialogRef = this.dialog.open(AddLoanComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getLoanList()
    });
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

  openLoanDetails(Loan_id: number){
    this.router.navigate([ '/loan/' + Loan_id])
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
}
