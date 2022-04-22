import { Injectable } from '@angular/core';
import { ApiService } from '@mobiquity/shared';
import { environment } from '../../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class ResetService {
  deviceInfo: any;
  // appUrl = 'http://125.16.139.20:8076';
  appUrl = 'http://172.25.48.35:9911';

  constructor(private apiService: ApiService) {
    this.deviceInfo = this.apiService.deviceInfo();
  }

  reset(data: any) {
    let body = {
      confirmedAuthenticationValue: data.confirmPin,
      identifierType: environment.constants.identifierType,
      identifierValue: data.mobile,
      language: data.language,
      newAuthenticationValue: data.pin,
      oldAuthenticationValue: '0000',
      requestedBy: environment.constants.requestedBy,
      workspaceId: environment.constants.workspaceId,
    };

    return this.apiService.post(
      this.appUrl + `/mobiquitypay/ums/v2/user/auth/change-credential`,
      body
    );
  }
}
