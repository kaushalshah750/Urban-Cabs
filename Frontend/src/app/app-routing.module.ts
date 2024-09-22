import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { HomeComponent } from './shared/home/home.component';
import { CabListComponent } from './shared/cab/cab-list/cab-list.component';
import { LoanListComponent } from './shared/loan/loan-list/loan-list.component';
import { CabPaymentComponent } from './shared/cab/cab-payment/cab-payment.component';
import { LoanDetailsComponent } from './shared/loan/loan-details/loan-details.component';
import { LoanRepaymentComponent } from './shared/loan/loan-repayment/loan-repayment.component';
import { IncomeComponent } from './shared/payment/income/income.component';
import { ExpenseComponent } from './shared/payment/expense/expense.component';
import { BookingComponent } from './shared/payment/booking/booking.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'loans',
        component: LoanListComponent
      },
      {
        path: 'loans/payment',
        component: LoanRepaymentComponent
      },
      {
        path: 'loan/:loanid',
        component: LoanDetailsComponent
      },
      {
        path: 'cabs',
        component: CabListComponent
      },
      {
        path: 'cab/:cabid/payment',
        component: CabPaymentComponent
      },
      {
        path: 'booking',
        component: BookingComponent
      },
      {
        path: 'payment/income',
        component: IncomeComponent
      },
      {
        path: 'payment/expense',
        component: ExpenseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
