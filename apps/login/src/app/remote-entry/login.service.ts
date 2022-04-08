import { Injectable } from '@angular/core';
import { ApiService } from '@mobiquity/shared';
import { environment } from '../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  deviceInfo: any;

  constructor(
    private apiService: ApiService,
  ) {
    this.deviceInfo = this.apiService.deviceInfo()
  }

  login(data: any){
    let body = {
      bearerCode: environment.constants.bearerCode,
      workspaceId: environment.constants.workspaceId,
      identifierType: environment.constants.identifierType,
      isTokenRequired: environment.constants.isTokenRequired,
      deviceInfo: {
        appName: environment.constants.deviceInfo.appName,
        appVersion: environment.constants.deviceInfo.appVersion,
        isPublicDevice: environment.constants.deviceInfo.isPublicDevice,
        latitude: environment.constants.deviceInfo.latitude,
        longitude: environment.constants.deviceInfo.longitude,
        networkOperator: environment.constants.deviceInfo.networkOperator,
        networkType: environment.constants.deviceInfo.networkType,
        os: environment.constants.deviceInfo.os,
        //TODO
        deviceId: this.deviceInfo.device,
        browser: this.deviceInfo.browser,
        mac: "",
        model: this.deviceInfo.model,
        providerIpAddress: ""

      },
      identifierValue: data.mobile,
      authenticationValue: data.pin,
      language: data.language,
    }

    return this.apiService.post('/subscriberLogin', body);
  }
}
