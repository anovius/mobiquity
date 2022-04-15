import { Injectable } from '@angular/core';
import { ApiService } from '@mobiquity/shared';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private apiService: ApiService) {}

  setToken() {
    let body = { grant_type: 'client_credentials' };
    return this.apiService.post('https://demo5894535.mockable.io/token', body);
  }

  refreshToken() {
    let body = { grant_type: 'client_credentials' };
    return this.apiService.post('https://demo5894535.mockable.io/token', body);
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

  test() {
    return 'test is working';
  }
}
