import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LoanResponse, LoansResponse, RemoveLoanResponse } from '../Models/Loans';
import { BanksResponse } from '../Models/Banks';
import { AddLoan, AddLoanResponse, EditLoan } from '../Models/AddLoan';
import { MonthEMIResponse } from '../Models/MonthEMI';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  url = 'api/loans'

  constructor(
    private authHttp: AuthService
  ) { }
  
  getLoanById(loanid:number){
    return this.authHttp.get<LoanResponse>( this.url + "/" + loanid + "/info" )
  }

  getLoanList(){
    return this.authHttp.get<LoansResponse>( this.url )
  }
  
  getBankList(){
    return this.authHttp.get<BanksResponse>( this.url + "/bank" )
  }
  
  getMonthlyEMI(){
    return this.authHttp.get<MonthEMIResponse>( this.url + "/month-emi" )
  }
  
  addNewLoan(loan: AddLoan){
    return this.authHttp.post<AddLoanResponse>( this.url + "/add", loan )
  }
  
  editLoan(loan: EditLoan){
    return this.authHttp.post<AddLoanResponse>( this.url + "/edit", loan )
  }
  
  removeLoan(loan_id: number){
    return this.authHttp.delete<RemoveLoanResponse>( this.url + "/" + loan_id + "/remove")
  }

}
