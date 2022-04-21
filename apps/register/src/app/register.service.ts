import { Injectable } from '@angular/core';
import { ApiService } from '@mobiquity/shared';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environment';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  deviceInfo: import('ngx-device-detector').DeviceInfo;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private deviceService: DeviceDetectorService
  ) {
    this.deviceInfo = this.apiService.deviceInfo();
    console.log('deviceInfo', this.deviceInfo);
  }

  appUrl = 'http://125.16.139.20:8076';

  setToken() {
    // let body = new FormData();
    // body.append('grant_type', 'client_credentials');
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'multipart/x-www-form-urlencoded;',
    //     'Accept' : '*/*',
    //     'Authorization': 'Basic ' + btoa('CoreWeb:adayfcSWcI')
    //   })
    // };

    return this.http.get(
      this.appUrl + '/mobiquitypay/ums/v1/user/auth/web/system-token'
    );
  }

  refreshToken() {
    let body = { grant_type: 'client_credentials' };
    return this.apiService.post(
      this.appUrl + '/mobiquitypay/ums/v1/user/auth/web/system-token',
      body
    );
  }

  getCategoryProfile() {
    return this.apiService.get(
      this.appUrl + '/mobiquitypay/app-config-subscriber/en'
    );
  }

  getCountries() {
    return this.apiService.get(
      this.appUrl + '/mobiquitypay/self-registration/data/en'
    );
  }

  uploadFile(file: any) {
    console.log('upload', file);

    let body = new FormData();
    body.append('file', file);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':
          'multipart/x-www-form-urlencoded;boundary=----WebKitFormBoundary5ei6dMazusTAvZNB',
      }),
    };

    return this.http.post(
      this.appUrl + '/mobiquitypay/dms/v3/doc',
      file,
      httpOptions
    );
    // return this.apiService.post(this.appUrl + `/mobiquitypay/dms/v3/doc`, file);
  }

  verifyNumber(contactNumber: string) {
    return this.apiService.post(this.appUrl + `/mobiquitypay/v2/otp/generate`);
  }

  generateOtp(phone: any) {
    let body = {
      identifierType: environment.constants.identifierType,
      otpServiceCode: environment.constants.otpServiceCode,
      identifierValue: phone,
    };

    return this.apiService.post(
      this.appUrl + `/mobiquitypay/v2/otp/generate`,
      body
    );
  }

  verifyNumberOTP(body: any) {
    console.log(body);
    return this.apiService.post(
      this.appUrl + `/mobiquitypay/v1/otp/validate`,
      body
    );
  }

  checkUnique(emailId: string) {
    console.log('emailId', emailId);
    return this.apiService.get(
      this.appUrl +
        `/mobiquitypay/v1/user-management/validate/uniqueness?bearerCode=WEB&uniqueIdType=emailId&uniqunessValue=${emailId}&language=en&workspaceId=SUBSCRIBER`
    );
  }

  checkMobileUniqueness(mobileNumber: any) {
    console.log('mobileNumber', mobileNumber);
    return this.apiService.get(
      this.appUrl +
        `/mobiquitypay/v1/user-management/validate/uniqueness?bearerCode=WEB&uniqueIdType=mobileNumber&uniqunessValue=${mobileNumber}&language=en&workspaceId=SUBSCRIBER`
    );
  }

  verifyEmail(email: string, refCode: string) {
    return this.apiService.post(
      'https://demo2819413.mockable.io/referralUser',
      { workspaceId: 'SUBSCRIBER' }
    );
  }

  test() {
    return 'test is working';
  }

  register(data: any) {
    {
      // let oldBody = {
      //   payload: {
      //     profileDetails: {
      //       authProfile: '',
      //       marketingProfile:
      //         environment.constants.profileDetails.marketingProfile,
      //       regulatoryProfile:
      //         environment.constants.profileDetails.regulatoryProfile,
      //       securityProfile:
      //         environment.constants.profileDetails.securityProfile,
      //     },
      // userInformation: {
      //   basicInformation: {
      //     gender: data.genderInfo,
      //     authenticationValue: '1357',
      //     authenticationIdType: 'MSISDN',
      //     firstName: data.firstName,
      //     middleName: '',
      //     dateOfBirth: data.dateOfBirth,
      //     address1: data.address1,
      //     address2: data.address2,
      //     city: data.city,
      //     state: data.state,
      //     country: data.country,
      //     postalCode: '',
      //     mobileNumber: data.mobileNumber,
      //     emailId: data.emailId,
      //     title: data.title,
      //     referenceId: '',
      //     preferredLanguage: data.preferredLanguage,
      //     referralCode: data.referralCode,
      //     lastName: data.lastName,
      //     loginId: data.loginId,
      //   },
      //       workspaceInformation: {
      //         categoryCode: 'SUBS',
      //         workspace: 'SUBSCRIBER',
      //         categoryName: 'Subscriber',
      //       },
      // },
      // kycs: [
      //   {
      //     isPrimaryKYCId: data.isPrimaryKYCId,
      //     kycIdValidTo: data.kycIdValidTo,
      //     kycIdType: data.kycIdType,
      //     kycIdValue: data.kycIdValue,
      //     kycGracePeriod: data.kycGracePeriod,
      //   },
      // ],
      // deviceInfo: {
      //   isPublicDevice: environment.constants.deviceInfo.isPublicDevice,
      //   deviceId: '53E3B76E-130A-4353-92C5-4452FCD7E75E',
      //   // deviceId: this.deviceInfo.device,
      //   model: 'iPhone12,1',
      //   os: '14.0',
      //   // os: environment.constants.deviceInfo.os,
      //   appVersion: environment.constants.deviceInfo.appVersion,
      // },
      //   },
      //   source: this.deviceInfo.deviceType,
      // };
    }
    let body = {
      source: 'WEB',
      currency: '101',
      payload: {
        userInformation: {
          workspaceInformation: {
            workspace: 'SUBSCRIBER',
            categoryName: 'Subscriber',
            categoryCode: 'SUBS',
          },
          basicInformation: {
            title: data.title,
            firstName: data.firstName,
            lastName: data.lastName,
            preferredLanguage: data.preferredLanguage,
            loginId: '7771011019',
            dateOfBirth: data.dateOfBirth,
            emailId: data.emailId,
            mobileNumber: data.mobileNumber,
            address1: data.address1,
            address2: data.address2,
            country: data.country,
            city: data.city,
            state: data.state,
          },
        },
        kycs: [
          {
            kycIdType: 'PAN_CARD',
            kycIdValue: 'AMFGO083838',
            kycGracePeriod: '40',
            kycIdIssueCountry: 'IN',
            kycImageUrl: '62618badff16542dfa0a0b5c',
            isPrimaryKYCId: 'Yes',
          },
        ],
        profileDetails: {
          securityProfile: 'SP.31161646848704283',
          authProfile: 'SUBS-163118-574153',
          regulatoryProfile: 'MasterKYC',
          marketingProfile: 'b0c570b2A',
        },
      },
    };

    console.log('body', body);

    return this.apiService.post(
      this.appUrl + `/mobiquitypay/v1/ums/user/self`,
      body
    );
  }

  getDeviceInfo() {
    return this.deviceService.getDeviceInfo();
  }
}
