import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService, UserService } from '@mobiquity/shared';
import { RegisterService } from '../register.service';

@Component({
  selector: 'mobiquity-kyc-details',
  templateUrl: './kyc-details.component.html',
  styleUrls: ['./kyc-details.component.css'],
})
export class KycDetailsComponent implements OnInit {
  translation: any;
  registerForm: any;
  registerP2: any;

  constructor(
    private translationService: TranslationService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.translationService.get().subscribe((data: any) => {
      this.translation = data.register;
    });
    this.init();
  }

  init() {
    this.registerForm = this.fb.group({
      docType: ['', Validators.required],
      docID: [''],
      docHolderName: [''],
      docExpiry: ['', Validators.required],
      frontView: [''],
      backView: ['', Validators.required],
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
    this.registerP2 = JSON.parse(retrievedObject);
    let register = {
      ...this.registerP2,
      ...this.registerForm.value,
    };
    console.log(register);
    window.localStorage.setItem('register', JSON.stringify(register));
    this.router.navigate(['/register/kyc-details-success']);
    // } else {
    //show error of invalid username and password
    // }
  }
}
