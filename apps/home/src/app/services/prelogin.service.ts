import { Injectable } from '@angular/core';
import { ApiService } from '@mobiquity/shared';

@Injectable({
  providedIn: 'root'
})
export class PreloginService {

  constructor(
    private apiService: ApiService
  ) { }

  getPreLoginData(language: String){
    return this.apiService.get('/preLogin/'+language);
  }
}
