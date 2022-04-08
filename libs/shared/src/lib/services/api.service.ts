import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { environment } from '../../../../../environment';

import { catchError } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';


@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private deviceService: DeviceDetectorService
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: any): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`
    ).pipe(catchError(this.formatErrors));
  }

  deviceInfo(){
    return this.deviceService.getDeviceInfo();
  }
}