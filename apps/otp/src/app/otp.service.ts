import { Injectable } from '@angular/core';
import { ApiService } from '@mobiquity/shared';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  // appUrl = 'http://125.16.139.20:8076';  //For Flow
  // appUrl = 'http://172.25.48.35:9911';  //For Postman
  appUrl = 'http://125.16.139.20:8076'; //For APP

  constructor(private apiService: ApiService) {}

  verify(body: any) {
    return this.apiService.post(
      this.appUrl + `/mobiquitypay/v1/otp/validate`,
      body
    );
  }
}
