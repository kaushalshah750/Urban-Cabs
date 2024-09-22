import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserDetailResponse } from '../Models/UserDetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'api/users'

  constructor(
    private authHttp: AuthService
  ) { }
  
  getUsers(){
    return this.authHttp.get<UserDetailResponse>( this.url )
  }

}
