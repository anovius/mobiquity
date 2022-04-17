import { Injectable } from '@angular/core';
import { ApiService } from '@mobiquity/shared';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private apiService: ApiService) {}

  setToken() {
    // let body = { grant_type: 'client_credentials' };
    return this.apiService.get(
      'http://172.25.48.35:9911/mobiquitypay/ums/v1/user/auth/web/system-token'
    );
    // return this.apiService.post('https://demo5894535.mockable.io/token', body);
  }

  refreshToken() {
    let body = { grant_type: 'client_credentials' };
    return this.apiService.post('https://demo5894535.mockable.io/token', body);
  }

  getCategoryProfile() {
    return this.apiService.get(
      'https://demo2819413.mockable.io/categoryProfile'
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
