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
        return this.apiService.post('/resetPin', data);
    }
}