import { Component } from '@angular/core';
import { IncomeService } from '../service/income.service';
import { Balance, BalanceResponse } from '../Models/Balance';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  balance:number = 0;
  
  constructor(
    private incomeService: IncomeService
  ){}

  ngOnInit(){
    this.getBalance()
    setInterval(() => {
      this.getBalance()
    }, 3000)
  }

  getBalance(){
    this.incomeService.getBalance().subscribe((res:BalanceResponse) => {
      this.balance = res.data
    })
  }

}