import { Injectable } from '@angular/core';
import { ApiService } from '@mobiquity/shared';
import { environment } from '../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPinService {

  constructor(
    private apiService : ApiService
  ) { }

  forgotPin(data: any){
    let body = {
      "bearerCode": environment.constants.bearerCode,
      "identifierType": environment.constants.identifierType,
      "identifierValue": data.mobile,
      "language": data.language,
      "workspaceId": environment.constants.workspaceId,
    }

    return this.apiService.post('https://demo5894535.mockable.io/changePINInitiate ', body);
  }

  generateOtp(phone: any){
    let body = {
      identifierType: environment.constants.identifierType,
      otpServiceCode: environment.constants.otpServiceCode,
      identifierValue: phone,
    }
    return this.apiService.post('https://demo5894535.mockable.io/generateOTP', body);
  }
}
