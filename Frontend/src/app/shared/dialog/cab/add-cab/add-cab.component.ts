import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder } from '@angular/forms';
import { AddCab, AddCabResponse, EditCab } from 'src/app/shared/Models/AddCab';
import { CabCompany, CabCompanyResponse } from 'src/app/shared/Models/CabCompany';
import { CabModel, CabModelResponse } from 'src/app/shared/Models/CabModel';
import { CabService } from 'src/app/shared/service/cab.service';
import { UserService } from 'src/app/shared/service/user.service';
import { UserDetail, UserDetailResponse } from 'src/app/shared/Models/UserDetail';
import { AddLoan } from 'src/app/shared/Models/AddLoan';

@Component({
  selector: 'app-add-cab',
  templateUrl: './add-cab.component.html',
  styleUrls: ['./add-cab.component.scss']
})
export class AddCabComponent {
  isLoading:boolean = false
  companies:CabCompany[] = []
  models:CabModel[] = []
  users:UserDetail[] = []
  maxDate:Date = new Date()
  Partners: UserDetail[] = []

  cabForm = this.formBuilder.nonNullable.group({
    Company_id: [0, Validators.required],
    Model_id: [0, Validators.required],
    Amount: [0, Validators.required],
    Fuel: ['', Validators.required],
    Ownership: [0, Validators.required],
    Status: ['', Validators.required],
    Number_plate: ['', Validators.required],
    Partners: [0, Validators.required],
    Purchased_on: [new Date(), Validators.required],
    Delievery_on: [new Date(), Validators.required]
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditCab,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private cabService: CabService,
    public dialogRef: MatDialogRef<AddCabComponent>,
    private userService: UserService,
  ){}

  ngOnInit(){
    this.getCabCompany();
    this.getUsers();
    if(this.data != null){
      this.loadCabData()
    }
  }
  
  loadCabData(){
    this.cabForm.controls['Company_id'].setValue(this.data.Company_id)
    this.cabForm.controls['Model_id'].setValue(this.data.Model_id)
    this.cabForm.controls['Number_plate'].setValue(this.data.Number_plate)
    this.cabForm.controls['Amount'].setValue(this.data.Amount)
    this.cabForm.controls['Fuel'].setValue(this.data.Fuel)
    this.cabForm.controls['Ownership'].setValue(this.data.Ownership)
    this.Partners = this.data.Partners,
    this.cabForm.controls['Status'].setValue(this.data.Status)
    this.cabForm.controls['Purchased_on'].setValue(this.dateFormat(new Date(this.data.Purchased_on)))
    this.cabForm.controls['Delievery_on'].setValue(this.dateFormat(new Date(this.data.Delievery_on)))
    this.getCabModel()
  }

  dateFormat(oldDate:Date){
    var newDate:any = oldDate.getFullYear() + (oldDate.getMonth() < 10 ? "-0"+ (oldDate.getMonth() + 1) : "-" + (oldDate.getMonth() + 1)) + (oldDate.getDate() < 10 ? "-0"+ oldDate.getDate() : "-" + oldDate.getDate())
    return newDate
  }

  addCab(){
    var cab:AddCab = {
      Company_id: this.cabForm.controls['Company_id'].value,
      Model_id: this.cabForm.controls['Model_id'].value,
      Number_plate: this.cabForm.controls['Number_plate'].value,
      Amount: this.cabForm.controls['Amount'].value,
      Fuel: this.cabForm.controls['Fuel'].value,
      Ownership: this.cabForm.controls['Ownership'].value,
      Partners: this.Partners,
      Status: this.cabForm.controls['Status'].value,
      Purchased_on: this.cabForm.controls['Purchased_on'].value,
      Delievery_on: this.cabForm.controls['Delievery_on'].value,
    }

    this.cabService.addNewCab(cab).subscribe((res:AddCabResponse)=>{
      if (res.data) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
      }
    })
  }

  editCab(){
    var cab:EditCab = {
      Cab_id: this.data.Cab_id,
      Company_id: this.cabForm.controls['Company_id'].value,
      Model_id: this.cabForm.controls['Model_id'].value,
      Number_plate: this.cabForm.controls['Number_plate'].value,
      Amount: this.cabForm.controls['Amount'].value,
      Fuel: this.cabForm.controls['Fuel'].value,
      Ownership: this.cabForm.controls['Ownership'].value,
      Partners: this.Partners,
      Status: this.cabForm.controls['Status'].value,
      Purchased_on: this.cabForm.controls['Purchased_on'].value,
      Delievery_on: this.cabForm.controls['Delievery_on'].value,
    }

    this.cabService.editCab(cab).subscribe((res:AddCabResponse)=>{
      if (res.data) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
      }
    })
  }

  companyChange(){
    this.getCabModel();
  }

  addPartners(){
    var newpartner = this.cabForm.controls['Partners'].value
    this.Partners.push(this.users.filter(user => user.User_id == newpartner)[0])
    this.cabForm.controls['Partners'].setValue(0)
  }

  removePartner(partner:UserDetail){
    this.Partners = this.Partners.filter(p => p.User_id != partner.User_id)
  }

  getUsers(){
    this.userService.getUsers().subscribe((res:UserDetailResponse)=>{
      this.users = res.data
    })
  }

  getCabCompany(){
    this.cabService.getCabCompany().subscribe((res:CabCompanyResponse) => {
      this.companies = res.data
    })
  }

  getCabModel(){
    this.cabService.getCabModel(this.cabForm.controls['Company_id'].value).subscribe((res:CabModelResponse) => {
      this.models = res.data
    })
  }
}
