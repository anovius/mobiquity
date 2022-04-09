import { Injectable } from '@angular/core';
import { ApiService } from '@mobiquity/shared';
import { environment } from '../../../../../environment';

@Injectable({
    providedIn: 'root'
})

export class ResetService {
    deviceInfo: any;

    constructor(
        private apiService: ApiService,
    ) {
        this.deviceInfo = this.apiService.deviceInfo()
    }

    reset(data: any){

        let body = {
            "confirmedAuthenticationValue": data.confirmPin,
            identifierType: environment.constants.identifierType,
            "identifierValue": data.mobile,
            "language": data.language,
            "newAuthenticationValue": data.pin,
            "oldAuthenticationValue": "0000",
            "requestedBy": environment.constants.requestedBy,
            workspaceId: environment.constants.workspaceId,
          }

        return this.apiService.post('https://demo5894535.mockable.io/changePIN', body);
    }
}