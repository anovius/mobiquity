import { Injectable } from '@angular/core';
import { ApiService } from '@mobiquity/shared';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(
    private apiService: ApiService
  ) { }

  verify(body:any){
    return this.apiService.post('https://demo9362630.mockable.io/validateOTP', body);
  }
}
