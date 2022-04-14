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

  test() {
    return 'test is working';
  }
}
