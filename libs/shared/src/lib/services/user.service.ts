import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '../../../../../environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<any>(null);
  private authorizationProfile = new BehaviorSubject<any>(null);
  private securityProfile = new BehaviorSubject<any>(null);

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  async onSuccessLogin(){

    this.apiService.get('https://demo9362630.mockable.io/authorizationProfile').subscribe((res: any) => {
      this.authorizationProfile.next(res);

      //TODO hard coded mobile as api was not working
      this.apiService.get(`https://demo9362630.mockable.io/securityProfile?workspace=${environment.constants.workspaceId}&identifierValue=7774678209&identifierType=${environment.constants.identifierType}`).subscribe((res: any) => {
        this.securityProfile.next(res.securityProfile);

        this.apiService.get('https://demo9362630.mockable.io/selfAccounts').subscribe((res: any) => {
          this.user.next(res);

          this.isLoggedIn.next(true);

          this.router.navigate(['/']);
          window.localStorage.setItem('isLoggedIn', 'true');
        });

      })

    })
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

  get getIsLoggedIn(){
    return this.isLoggedIn.value;
  }
}
