import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AddCab, AddCabResponse, EditCab } from '../Models/AddCab';
import { CabCompanyResponse } from '../Models/CabCompany';
import { CabModelResponse } from '../Models/CabModel';
import { CabResponse, CabsResponse } from '../Models/Cabs';
import { AddCabPaymentResponse, AddEditCabPayment, CabPaymentResponse } from '../Models/CabPayment';

@Injectable({
  providedIn: 'root'
})
export class CabService {
  url = 'api/cabs'

  constructor(
    private authHttp: AuthService
  ) { }
  
  addNewCab(cab:AddCab){
    return this.authHttp.post<AddCabResponse>( this.url + "/add", cab )
  }
  
  editCab(cab:EditCab){
    return this.authHttp.post<AddCabResponse>( this.url + "/edit", cab )
  }
  
  addCabPayment(cabPayment:AddEditCabPayment){
    return this.authHttp.post<AddCabPaymentResponse>( this.url + "/payment/add", cabPayment )
  }
  
  editCabPayment(cabPayment:AddEditCabPayment){
    return this.authHttp.post<AddCabPaymentResponse>( this.url + "/payment/edit", cabPayment )
  }
  
  deleteCabPayment(Payment_id:number){
    return this.authHttp.delete<AddCabPaymentResponse>( this.url + "/payment/" + Payment_id + "/delete")
  }
  
  getCabList(){
    return this.authHttp.get<CabsResponse>( this.url )
  }
  
  getCabById(cab_id:number){
    return this.authHttp.get<CabResponse>( this.url + "/" + cab_id )
  }
  
  getCabPayment(cab_id:number){
    return this.authHttp.get<CabPaymentResponse>( this.url + "/" + cab_id + "/payment" )
  }
  
  getCabCompany(){
    return this.authHttp.get<CabCompanyResponse>( this.url + "/company" )
  }
  
  getCabModel(company:number){
    return this.authHttp.get<CabModelResponse>( this.url + "/" + company + "/model" )
  }

}
