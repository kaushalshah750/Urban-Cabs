import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddCabPaymentResponse, AddEditCabPayment } from 'src/app/shared/Models/CabPayment';
import { UserDetail, UserDetailResponse } from 'src/app/shared/Models/UserDetail';
import { CabService } from 'src/app/shared/service/cab.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-add-cab-payment',
  templateUrl: './add-cab-payment.component.html',
  styleUrls: ['./add-cab-payment.component.scss']
})
export class AddCabPaymentComponent {
  isLoading:boolean = false
  users:UserDetail[] = []

  paymentForm = this.formBuilder.nonNullable.group({
    Cab_id: [0, Validators.required],
    User_id: [0, Validators.required],
    Amount: [0, Validators.required],
    Remark: ['', Validators.required],
    Paid_on: [new Date(), Validators.required]
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddEditCabPayment,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<AddCabPaymentComponent>,
    private cabService: CabService,
  ){}

  ngOnInit(){
    this.getUsers()
    if(this.data.Payment_id != 0){
      this.loadPaymentData()
    }
  }

  getUsers(){
    this.userService.getUsers().subscribe((res:UserDetailResponse) => {
      this.users = res.data
    })
  }

  loadPaymentData(){
    this.paymentForm.controls['User_id'].setValue(this.data.User_id)
    this.paymentForm.controls['Amount'].setValue(this.data.Amount)
    this.paymentForm.controls['Remark'].setValue(this.data.Remark)
    this.paymentForm.controls['Paid_on'].setValue(this.dateFormat(new Date(this.data.Paid_on)))
  }

  dateFormat(oldDate:Date){
    var newDate:any = oldDate.getFullYear() + (oldDate.getMonth() < 10 ? "-0"+ (oldDate.getMonth() + 1) : "-" + (oldDate.getMonth() + 1)) + (oldDate.getDate() < 10 ? "-0"+ oldDate.getDate() : "-" + oldDate.getDate())
    return newDate
  }

  addCabPayment(){
    var cabPayment:AddEditCabPayment = {
      Payment_id: 0,
      Cab_id: this.data.Cab_id,
      User_id: this.paymentForm.controls['User_id'].value,
      Amount: this.paymentForm.controls['Amount'].value,
      Remark: this.paymentForm.controls['Remark'].value,
      Paid_on: this.paymentForm.controls['Paid_on'].value,
    }

    this.cabService.addCabPayment(cabPayment).subscribe((res:AddCabPaymentResponse) => {
      if (res.data) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
      }
    })
  }

  editCabPayment(){
    var cabPayment:AddEditCabPayment = {
      Payment_id: this.data.Payment_id,
      Cab_id: this.data.Cab_id,
      User_id: this.paymentForm.controls['User_id'].value,
      Amount: this.paymentForm.controls['Amount'].value,
      Remark: this.paymentForm.controls['Remark'].value,
      Paid_on: this.paymentForm.controls['Paid_on'].value,
    }

    this.cabService.editCabPayment(cabPayment).subscribe((res:AddCabPaymentResponse) => {
      if (res.data) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
      }
    })
  }
}
