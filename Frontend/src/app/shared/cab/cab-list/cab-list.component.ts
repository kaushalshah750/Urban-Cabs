import { Component } from '@angular/core';
import { AddCabComponent } from '../../dialog/cab/add-cab/add-cab.component';
import { MatDialog } from '@angular/material/dialog';
import { CabService } from '../../service/cab.service';
import { Cabs, CabsResponse } from '../../Models/Cabs';
import { AddCab, EditCab } from '../../Models/AddCab';

@Component({
  selector: 'app-cab-list',
  templateUrl: './cab-list.component.html',
  styleUrls: ['./cab-list.component.scss']
})
export class CabListComponent {
  cabs:Cabs[] = []

  constructor(
    public cabService: CabService,
    public dialog: MatDialog,
  ){}

  ngOnInit(){
    this.getCabList()
  }

  getCabList(){
    this.cabService.getCabList().subscribe((res:CabsResponse)=>{
      this.cabs = res.data
    })
  }

  addNewCab(){
    const dialogRef = this.dialog.open(AddCabComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getCabList()
    });
  }

  editCab(cab:Cabs){
    var cabData:EditCab = {
      Cab_id: cab.Cab_id,
      Company_id: cab.Company.Company_id,
      Model_id: cab.Model.Model_id,
      Number_plate: cab.Number_plate,
      Amount: cab.Amount,
      Fuel: cab.Fuel,
      Ownership: cab.Ownership.User_id,
      Partners: cab.Partners,
      Status: cab.Status,
      Purchased_on: cab.Purchased_on,
      Delievery_on: cab.Delievery_on,
    }

    const dialogRef = this.dialog.open(AddCabComponent, {
      width: '800px',
      data: cabData
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getCabList()
    });

  }
}
