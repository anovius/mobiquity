import { Injectable } from '@angular/core';
import { ApiService } from '@mobiquity/shared';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private apiService: ApiService, private http: HttpClient) {}

  appUrl = 'http://125.16.139.20:8076';

  setToken() {
    // let body = new FormData();
    // body.append('grant_type', 'client_credentials');
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'multipart/x-www-form-urlencoded;',
    //     'Accept' : '*/*',
    //     'Authorization': 'Basic ' + btoa('CoreWeb:adayfcSWcI')
    //   })
    // };

    return this.http.get(
      this.appUrl + '/mobiquitypay/ums/v1/user/auth/web/system-token'
    );
  }

  refreshToken() {
    let body = { grant_type: 'client_credentials' };
    return this.apiService.post(
      this.appUrl + '/mobiquitypay/ums/v1/user/auth/web/system-token',
      body
    );
  }

  getCategoryProfile() {
    return this.apiService.get(
      this.appUrl + '/mobiquitypay/app-config-subscriber/en'
    );
  }

  getCities() {
    return this.apiService.get(
      this.appUrl + '/mobiquitypay/self-registration/data/en'
    );
  }

  uploadFile(file: any) {
    file = {};
    return this.apiService.post('https://demo2819413.mockable.io/upload', file);
  }

  verifyNumber(contactNumber: string) {
    return this.apiService.get('https://demo2819413.mockable.io/UniqueMobile');
  }

  verifyNumberOTP(body: any) {
    console.log(body);
    return this.apiService.post(
      'https://demo9362630.mockable.io/validateOTP',
      body
    );
  }

  checkUnique() {
    return this.apiService.get(
      'https://demo2819413.mockable.io/UniqueMobileError'
    );
  }

  verifyEmail(email: string, refCode: string) {
    return this.apiService.post(
      'https://demo2819413.mockable.io/referralUser',
      { workspaceId: 'SUBSCRIBER' }
    );
  }

  test() {
    return 'test is working';
  }

  register(body: any) {
    return this.apiService.post(
      'https://demo2819413.mockable.io/registerCustomer',
      body
    );
  }
}
