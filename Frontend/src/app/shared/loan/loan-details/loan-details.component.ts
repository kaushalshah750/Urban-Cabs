import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loans, LoanResponse } from '../../Models/Loans';
import { LoanService } from '../../service/loan.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss']
})
export class LoanDetailsComponent {
  loan:Loans = {
    Loan_id: 0,
    Cab: {
      Cab_id: 0,
      Company: {
        Company_id: 0,
        Company: ""
      },
      Model: {
        Model_id: 0,
        Model: ""
      },
      Amount: 0,
      Fuel: "",
      Number_plate: "",
      Ownership: {
        User_id: 0,
        Name: "",
        Email: "",
        Phone: "",
      },
      Partners: [],
      Status: "",
      Purchased_on: new Date(),
      Delievery_on: new Date(),
      Added_on: new Date()
    },
    Bank: {
      Bank_id: 0,
      Name: "",
      Branch: "",
      Account_number: 0,
      Ifsc_code: ""
    },
    Amount: 0,
    Disbursed_amount: 0,
    Interest_rate: 0,
    Monthly_emi: 0,
    Tenure: 0,
    EMI_paid: 0,
    Borrowed_by: {
      User_id: 0,
      Name: "",
      Email: "",
      Phone: "" 
    },
    Status: "",
    Start_date: new Date(),
    End_date: new Date(),
  }
  loan_id:any
  constructor(
    private loanService: LoanService,
    private route: ActivatedRoute,
  ){
    this.loan_id = this.route.snapshot.paramMap.get('loanid')!
  }

  ngOnInit(){
    this.getLoanById()
  }
  
  getLoanById(){
    this.loanService.getLoanById(this.loan_id).subscribe((res: LoanResponse) => {
      this.loan = res.data
    })
  }

}
