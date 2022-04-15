import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService, UserService } from '@mobiquity/shared';
import { RegisterService } from './register.service';

@Component({
  selector: 'mobiquity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'register';

  translation: any;
  registerForm: any;
  isVerifyNumberCalled = false;
  contactError: string = '';
  showVerifyNumber = false;
  showVerifyEmail = false;
  contactNumber = '';
  isContactVerified = false;
  isLoading: boolean = false;
  otp: any = '';
  otpTranslation: any;
  openModal: boolean = false;
  hasError: boolean = false;
  email = '';
  emailError: boolean = false;
  refCode = '';
  isEmailVerified = false;

  constructor(
    private translationService: TranslationService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.init();
    this.setToken();

    this.translationService.get().subscribe((data: any) => {
      this.translation = data.register;
      this.otpTranslation = data.otp;
    });

    console.log(this.registerService.test());

    this.mobileValueChanges();
    this.emailValueChanges();
  }

  init() {
    this.registerForm = this.fb.group({
      mobile: ['', Validators.required],
      email: ['', [Validators.email]],
      refCode: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      paymentID: ['', Validators.required],
      gender: ['', Validators.required],
      profileImage: ['', Validators.required],
    });
  }

  mobileValueChanges() {
    this.registerForm.get('mobile')?.valueChanges.subscribe((res: any) => {
      this.contactNumber = res;
      if (res.length === 13) {
        if (res[0] === '+') {
          this.showVerifyNumber = true;
        } else {
          this.contactError = 'Invalid mobile number format';
        }
      } else {
        this.showVerifyNumber = false;
      }
    });
  }

  emailValueChanges() {
    this.registerForm.get('email')?.valueChanges.subscribe((res: any) => {
      if (this.registerForm.get('email').status === 'VALID') {
        this.email = res;
      }
    });
    this.registerForm.get('refCode')?.valueChanges.subscribe((res: any) => {
      this.refCode = res;
      this.showVerifyEmail = true;
    });
  }

  showModal() {
    this.openModal = true;
  }

  verifyNumber() {
    this.isLoading = true;
    this.isVerifyNumberCalled = true;
    this.registerService
      .verifyNumber(this.contactNumber)
      .subscribe((res: any) => {
        this.isLoading = false;
        console.log(res);
        if (res.status === 'SUCCEEDED') {
          this.showVerifyNumber = false;
          this.showModal();
          // this.router.navigate(['/register/address']);
        } else {
          this.contactError = 'Mobile Number Already Exists';
        }
      });
  }

  verifyEmail() {
    this.isLoading = true;
    this.isVerifyNumberCalled = true;
    this.registerService
      .verifyEmail(this.email, this.refCode)
      .subscribe((res: any) => {
        this.isLoading = false;
        console.log(res);
        if (res.status === 'SUCCEEDED') {
          this.showVerifyNumber = false;
          this.isEmailVerified = true;
        }
      });
  }

  verifyNumberOTP() {
    this.isLoading = true;
    this.registerService.verifyNumberOTP(this.otp).subscribe((res: any) => {
      this.isLoading = false;
      console.log('OTP RESPONSE', res);
      if (res.status === 'FAILED') {
        this.hasError = true;
      } else if (res.status === 'SUCCEEDED') {
        this.openModal = false;
        this.isContactVerified = true;
      }
    });
  }

  setToken() {
    this.registerService.setToken().subscribe((res: any) => {
      console.log(res);
      window.localStorage.setItem('access_token', res.access_token);
    });
  }

  refreshToken() {
    this.registerService.refreshToken().subscribe((res: any) => {
      console.log(res);
      window.localStorage.setItem('refresh_token', res.refresh_token);
    });
  }

  goBack() {
    this.router.navigate(['..']);
  }

  onOtpChange(otp: any) {
    this.otp = otp;
  }

  checkUnique() {
    this.isLoading = true;
    this.registerService.checkUnique().subscribe((res: any) => {
      this.isLoading = false;
      if (res.status === 'FAILED') {
        this.emailError = true;
      }
    });
  }

  next() {
    console.log(this.registerForm.value);
    // if (res.status === 'FAILED') {
    //   if (res.errors[0].code === 'FTL01') {
    //     this.router.navigate(['/reset-pin']);
    //   }
    // } else if (res.status === 'PAUSED') {
    //   this.isLoading = true;
    //   this.loginService
    //     .generateOtp(this.loginForm.value.mobile)
    //     .subscribe((res) => {
    //       this.isLoading = false;
    //       window.localStorage.setItem('serviceRequestId', res.serviceRequestId);
    //       this.router.navigate(['/otp']);
    //     });
    // } else if (res.status === 'SUCCEEDED') {
    window.localStorage.setItem(
      'register',
      JSON.stringify(this.registerForm.value)
    );

    this.router.navigate(['/register/address']);
    // } else {
    //show error of invalid username and password
    // }
  }
}
