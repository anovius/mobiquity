import { Injectable } from '@angular/core';
import { ApiService } from '@mobiquity/shared';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private apiService: ApiService
  ) { }

  test(){
    return "test is working"
  }

}
