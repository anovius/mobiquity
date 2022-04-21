import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '@mobiquity/shared';
import { ForgotPinService } from './remote-entry/forgot-pin.service';

@Component({
  selector: 'mobiquity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'forgot-pin';
  translation: any;
  mobile: any;
  language: any;
  isLoading = false;

  constructor(
    private translationService: TranslationService,
    private forgotPinService: ForgotPinService,
    private router: Router
  ) {}

  ngOnInit() {
    this.translationService.get().subscribe((data: any) => {
      this.translation = data.forgotPin;
    });

    this.translationService.getLang().subscribe((res: any) => {
      this.language = res;
    });
  }

  goBack() {
    window.history.back();
  }

  forgotPin() {
    window.localStorage.setItem('mobile', this.mobile);
    this.isLoading = true;
    this.forgotPinService
      .forgotPin({ mobile: this.mobile, language: this.language })
      .subscribe((res: any) => {
        if (res.status === 'PAUSED') {
          this.forgotPinService
            .generateOtp(this.mobile)
            .subscribe((res: any) => {
              this.isLoading = false;
              if (res.status === 'SUCCEEDED') {
                window.localStorage.setItem(
                  'serviceRequestId',
                  res.serviceRequestId
                );
                this.router.navigate(['/otp'], {
                  queryParams: { isForgotPassword: true },
                });
              }
            });
        }
      });
  }
}
