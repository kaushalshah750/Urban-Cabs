import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  home:boolean = false
  loans:boolean = false
  loanspayment:boolean = false
  cabs:boolean = false
  income:boolean = false
  expense:boolean = false
  booking:boolean = false

  constructor(
    private router: Router
  ){}

  ngOnInit(){
    if (this.router.url == "/cabs"){
      this.home = false
      this.loans = false
      this.loanspayment = false
      this.cabs = true
      this.income = false
      this.expense = false
      this.booking = false
    } else if (this.router.url == "/loans"){
      this.home = false
      this.loans = true
      this.loanspayment = false
      this.cabs = false
      this.income = false
      this.expense = false
      this.booking = false
    } else if (this.router.url == "/loans/payment"){
      this.home = false
      this.loans = false
      this.loanspayment = true
      this.cabs = false
      this.income = false
      this.expense = false
      this.booking = false
    } else if (this.router.url == "/payment/income"){
      this.home = false
      this.loans = false
      this.loanspayment = false
      this.cabs = false
      this.income = true
      this.expense = false
      this.booking = false
    } else if (this.router.url == "/payment/expense"){
      this.home = false
      this.loans = false
      this.loanspayment = false
      this.cabs = false
      this.income = false
      this.expense = true
      this.booking = false
    } else if (this.router.url == "/booking"){
      this.home = false
      this.loans = false
      this.loanspayment = false
      this.cabs = false
      this.income = false
      this.expense = false
      this.booking = true
    } else if (this.router.url == "/"){
      this.home = true
      this.loans = false
      this.loanspayment = false
      this.cabs = false
      this.income = false
      this.expense = false
      this.booking = false
    }
  }
}
