import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(
    private http: HttpClient,
  ) { }

  private language = new BehaviorSubject<string>('en');

  get(){
    return this.http.get(`assets/i18n/${this.language.value}.json`);
  }
}
