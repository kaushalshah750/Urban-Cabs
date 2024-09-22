import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AddEditIncomeResponse, Income, IncomesResponse } from '../Models/Income';
import { BalanceResponse } from '../Models/Balance';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  url = 'api/income'

  constructor(
    private authHttp: AuthService
  ) { }
  
  getBalance(){
    return this.authHttp.get<BalanceResponse>( this.url + "/balance")
  }
  
  getIncomeList(){
    return this.authHttp.get<IncomesResponse>( this.url )
  }
  
  addNewIncome(income:Income){
    return this.authHttp.post<AddEditIncomeResponse>( this.url + "/add", income )
  }
  
  editIncome(income:Income){
    return this.authHttp.post<AddEditIncomeResponse>( this.url + "/edit", income )
  }
  
  deleteIncome(id:number){
    return this.authHttp.delete<AddEditIncomeResponse>( this.url + "/" + id + "/delete" )
  }
}
