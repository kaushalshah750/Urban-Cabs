import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';

import { AppComponent } from './app.component';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { CabListComponent } from './shared/cab/cab-list/cab-list.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { AddCabComponent } from './shared/dialog/cab/add-cab/add-cab.component';
import { LoanListComponent } from './shared/loan/loan-list/loan-list.component';
import { AddLoanComponent } from './shared/dialog/loan/add-loan/add-loan.component';
import { CabPaymentComponent } from './shared/cab/cab-payment/cab-payment.component';
import { AddCabPaymentComponent } from './shared/dialog/cab/add-cab-payment/add-cab-payment.component';
import { SnackbarComponent } from './shared/dialog/snackbar/snackbar.component';
import { LoanDetailsComponent } from './shared/loan/loan-details/loan-details.component';
import { LoanRepaymentComponent } from './shared/loan/loan-repayment/loan-repayment.component';
import { IncomeComponent } from './shared/payment/income/income.component';
import { AddIncomeComponent } from './shared/dialog/payment/income/add-income/add-income.component';
import { ExpenseComponent } from './shared/payment/expense/expense.component';
import { AddExpenseComponent } from './shared/dialog/payment/expense/add-expense/add-expense.component';
import { BookingComponent } from './shared/payment/booking/booking.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    DashboardComponent,
    CabListComponent,
    AddCabComponent,
    LoanListComponent,
    AddLoanComponent,
    CabPaymentComponent,
    AddCabPaymentComponent,
    SnackbarComponent,
    LoanDetailsComponent,
    LoanRepaymentComponent,
    IncomeComponent,
    ExpenseComponent,
    AddIncomeComponent,
    AddExpenseComponent,
    BookingComponent,
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTableModule,
    
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
      useValue: {
        duration: 2000, 
        verticalPosition: "top", 
        horizontalPosition: "right"
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
