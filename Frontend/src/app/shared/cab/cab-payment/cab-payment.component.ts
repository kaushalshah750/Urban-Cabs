import { Component } from '@angular/core';
import { CabService } from '../../service/cab.service';
import { ActivatedRoute } from '@angular/router';
import { AddCabPaymentResponse, AddEditCabPayment, CabPayment, CabPaymentResponse } from '../../Models/CabPayment';
import { MatDialog } from '@angular/material/dialog';
import { AddCabPaymentComponent } from '../../dialog/cab/add-cab-payment/add-cab-payment.component';
import { CabResponse, Cabs } from '../../Models/Cabs';

@Component({
  selector: 'app-cab-payment',
  templateUrl: './cab-payment.component.html',
  styleUrls: ['./cab-payment.component.scss']
})
export class CabPaymentComponent {
  cab_id:any = 0
  amount_paid:number = 0
  payments:CabPayment[] = []
  cab:Cabs = {
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
    Added_on: new Date(),
  }

  constructor(
    private cabService: CabService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ){}

  ngOnInit(){
    this.cab_id = this.route.snapshot.paramMap.get('cabid')!
    this.getCabPayment();
    this.getCabById();
  }

  getCabById(){
    this.cabService.getCabById(this.cab_id).subscribe((res:CabResponse)=>{
      this.cab = res.data
    })
  }

  getCabPayment(){
    this.amount_paid = 0
    this.cabService.getCabPayment(this.cab_id).subscribe((res:CabPaymentResponse)=>{
      this.payments = res.data

      this.payments.forEach((ele:CabPayment) => {
        this.amount_paid = this.amount_paid + ele.Amount
      });
    })
  }

  addCabPayent(){
    var addCab:AddEditCabPayment = {
      Payment_id: 0,
      Cab_id: Number(this.cab_id),
      User_id: 0,
      Amount: 0,
      Remark: "",
      Paid_on: new Date(),  
    }

    const dialogRef = this.dialog.open(AddCabPaymentComponent, {
      width: '800px',
      data: addCab
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getCabPayment()
    });
  }

  editCabPayment(payment:CabPayment){
    var editCab:AddEditCabPayment = {
      Payment_id: payment.Payment_id,
      Cab_id: Number(this.cab_id),
      User_id: payment.User.User_id,
      Amount: payment.Amount,
      Remark: payment.Remark,
      Paid_on: payment.Paid_on,
    }

    const dialogRef = this.dialog.open(AddCabPaymentComponent, {
      width: '800px',
      data: editCab
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getCabPayment()
    });
  }

  deleteCabPayment(Payment_id:number){
    this.cabService.deleteCabPayment(Payment_id).subscribe((res:AddCabPaymentResponse)=>{
      if (res.data) {
        this.getCabPayment()
      }
    })
  }
}
