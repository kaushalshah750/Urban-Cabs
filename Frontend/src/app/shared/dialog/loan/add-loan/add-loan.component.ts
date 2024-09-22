import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CabService } from 'src/app/shared/service/cab.service';
import { UserService } from 'src/app/shared/service/user.service';
import { AddCabComponent } from '../../cab/add-cab/add-cab.component';
import { Banks, BanksResponse } from 'src/app/shared/Models/Banks';
import { LoanService } from 'src/app/shared/service/loan.service';
import { UserDetail, UserDetailResponse } from 'src/app/shared/Models/UserDetail';
import { Cabs, CabsResponse } from 'src/app/shared/Models/Cabs';
import { AddLoan, AddLoanResponse, EditLoan } from 'src/app/shared/Models/AddLoan';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.scss']
})
export class AddLoanComponent {
  isLoading:boolean = false
  cabs:Cabs[] = []
  banks: Banks[] = []
  users:UserDetail[] = []

  loanForm = this.formBuilder.nonNullable.group({
    Cab_id: [0, Validators.required],
    Bank_id: [0, Validators.required],
    Amount: [0, Validators.required],
    Disbursed_amount: [0, Validators.required],
    Interest_rate: [0, Validators.required],
    Monthly_emi: [0, Validators.required],
    Tenure: [0, Validators.required],
    Borrowed_by: [0, Validators.required],
    Status: ['', Validators.required],
    Start_date: [new Date(), Validators.required],
    End_date: [new Date(), Validators.required]
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditLoan,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private cabService: CabService,
    public dialogRef: MatDialogRef<AddCabComponent>,
    private userService: UserService,
    private loanService: LoanService,
  ){}

  ngOnInit(){
    this.getCabList()
    this.getUsers()
    this.getBankList()
    if (this.data != null){
      this.loadLoanData()
    }
  }
  
  getCabList(){
    this.cabService.getCabList().subscribe((res:CabsResponse)=>{
      this.cabs = res.data
    })
  }

  getUsers(){
    this.userService.getUsers().subscribe((res:UserDetailResponse) => {
      this.users = res.data
    })
  }

  getBankList(){
    this.loanService.getBankList().subscribe((res:BanksResponse)=> {
      this.banks = res.data
    })
  }

  editLoan(){
    var loan: EditLoan = {
      Loan_id: this.data.Loan_id,
      Cab_id: this.loanForm.controls['Cab_id'].value,
      Bank_id: this.loanForm.controls['Bank_id'].value,
      Amount: Number(this.loanForm.controls['Amount'].value),
      Disbursed_amount: Number(this.loanForm.controls['Disbursed_amount'].value),
      Interest_rate: this.loanForm.controls['Interest_rate'].value,
      Monthly_emi: this.loanForm.controls['Monthly_emi'].value,
      Tenure: this.loanForm.controls['Tenure'].value,
      Borrowed_by: this.loanForm.controls['Borrowed_by'].value,
      Status: this.loanForm.controls['Status'].value,
      Start_date: this.loanForm.controls['Start_date'].value,
      End_date: this.loanForm.controls['End_date'].value,
    }

    this.loanService.editLoan(loan).subscribe((res:AddLoanResponse) =>{
      if (res.data) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
      }
    })
  }

  loadLoanData(){
    this.loanForm.controls['Cab_id'].setValue(this.data.Cab_id)
    this.loanForm.controls['Bank_id'].setValue(this.data.Bank_id)
    this.loanForm.controls['Amount'].setValue(this.data.Amount)
    this.loanForm.controls['Disbursed_amount'].setValue(this.data.Disbursed_amount)
    this.loanForm.controls['Interest_rate'].setValue(this.data.Interest_rate)
    this.loanForm.controls['Monthly_emi'].setValue(this.data.Monthly_emi)
    this.loanForm.controls['Tenure'].setValue(this.data.Tenure)
    this.loanForm.controls['Borrowed_by'].setValue(this.data.Borrowed_by)
    this.loanForm.controls['Status'].setValue(this.data.Status)
    this.loanForm.controls['Start_date'].setValue(this.dateFormat(new Date(this.data.Start_date)))
    this.loanForm.controls['End_date'].setValue(this.dateFormat(new Date(this.data.End_date)))
  }

  dateFormat(oldDate:Date){
    var newDate:any = oldDate.getFullYear() + (oldDate.getMonth() < 10 ? "-0"+ (oldDate.getMonth() + 1) : "-" + (oldDate.getMonth() + 1)) + (oldDate.getDate() < 10 ? "-0"+ oldDate.getDate() : "-" + oldDate.getDate())
    return newDate
  }

  addLoan(){
    var loan: AddLoan = {
      Cab_id: this.loanForm.controls['Cab_id'].value,
      Bank_id: this.loanForm.controls['Bank_id'].value,
      Amount: this.loanForm.controls['Amount'].value,
      Disbursed_amount: this.loanForm.controls['Disbursed_amount'].value,
      Interest_rate: this.loanForm.controls['Interest_rate'].value,
      Monthly_emi: this.loanForm.controls['Monthly_emi'].value,
      Tenure: this.loanForm.controls['Tenure'].value,
      Borrowed_by: this.loanForm.controls['Borrowed_by'].value,
      Status: this.loanForm.controls['Status'].value,
      Start_date: this.loanForm.controls['Start_date'].value,
      End_date: this.loanForm.controls['End_date'].value,
    }

    this.loanService.addNewLoan(loan).subscribe((res:AddLoanResponse) =>{
      if (res.data) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
      }
    })
  }

}
