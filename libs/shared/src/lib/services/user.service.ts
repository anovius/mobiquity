import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<any>(null);
  private authorizationProfile = new BehaviorSubject<any>(null);
  private securityProfile = new BehaviorSubject<any>(null);

  constructor(
    private apiService: ApiService
  ) { }

  async onSuccessLogin(){
    await this.apiService.get('https://demo9362630.mockable.io/authorizationProfile').subscribe((res: any) => {
      this.authorizationProfile.next(res);
    })

    //TODO hard coded mobile as api was not working
    await this.apiService.get(`https://demo9362630.mockable.io/securityProfile?workspace=${environment.constants.workspaceId}&identifierValue=7774678209&identifierType=${environment.constants.identifierType}`).subscribe((res: any) => {
      this.securityProfile.next(res.securityProfile);
    })

    await this.apiService.get('https://demo9362630.mockable.io/selfAccounts').subscribe((res: any) => {
      this.user.next(res);
    });

    this.isLoggedIn.next(true);
  }

  getAuthorizationProfile(){
    return this.authorizationProfile.asObservable();
  }

  getSecurityProfile(){
    return this.securityProfile.asObservable();
  }

  getUser(){
    return this.user.asObservable();
  }

  getIsLoggedIn(){
    return this.isLoggedIn.asObservable();
  }
}
