import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService, UserService } from '@mobiquity/shared';
import { RegisterService } from '../register.service';

@Component({
  selector: 'mobiquity-kyc-detail-success',
  templateUrl: './kyc-detail-success.component.html',
  styleUrls: ['./kyc-detail-success.component.css'],
})
export class KycDetailSuccessComponent implements OnInit {
  translation: any;
  registerForm: any;
  registerP3: any;

  constructor(
    private translationService: TranslationService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    let retrievedObject: any = window.localStorage.getItem('register');
    this.registerP3 = JSON.parse(retrievedObject);

    this.translationService.get().subscribe((data: any) => {
      this.translation = data.register;
    });
    this.init();
  }

  init() {
    this.registerForm = this.fb.group({
      frontView: [this.registerP3.frontView],
      backView: [this.registerP3.backView],
    });
  }

  next() {
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

    let retrievedObject: any = window.localStorage.getItem('register');
    this.registerP3 = JSON.parse(retrievedObject);

    this.router.navigate(['/register/set-pin']);
    // } else {
    //show error of invalid username and password
    // }
  }
}
