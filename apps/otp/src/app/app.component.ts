import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService, UserService } from '@mobiquity/shared';
import { OtpService } from './otp.service';

@Component({
  selector: 'mobiquity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'otp';
  translation: any;

  mobile: any;
  otp: any;
  hasError = false;

  constructor(
    private router: Router,
    private translationService: TranslationService,
    private otpService: OtpService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.translationService.get().subscribe((data: any) => {
      this.translation = data.otp;
    });

    this.mobile = window.localStorage.getItem('mobile');
  }

  goBack() {
    this.router.navigate(['..']);
  }

  onOtpChange(otp:any) {
    this.otp = otp;
  }

  verify(){
    let body = {
      otp: this.otp,
      resumeServiceRequestId: window.localStorage.getItem('serviceRequestId'),
    }

    this.otpService.verify(body).subscribe( async (res: any) => {
      if(res.status === "FAILED"){
        this.hasError = true;
      }
      else if(res.status === "SUCCEEDED"){
        //Successfully Login
        window.localStorage.setItem("access_token", res.token.access_token);
        window.localStorage.setItem("refresh_token", res.token.refresh_token);
        await this.userService.onSuccessLogin();
      }
    });
  }
}
