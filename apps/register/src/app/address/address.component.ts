import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService, UserService } from '@mobiquity/shared';
import { RegisterService } from '../register.service';

@Component({
  selector: 'mobiquity-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  translation: any;
  registerForm: any;
  registerP1: any;

  constructor(
    private translationService: TranslationService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.init();

    this.translationService.get().subscribe((data: any) => {
      this.translation = data.register;
    });

    console.log(this.registerService.test());
  }

  init() {
    this.registerForm = this.fb.group({
      address1: ['', Validators.required],
      address2: [''],
      country: [''],
      postalCode: ['', Validators.required],
      state: [''],
      city: ['', Validators.required],
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
    this.registerP1 = JSON.parse(retrievedObject);
    let register = {
      ...this.registerP1,
      ...this.registerForm.value,
    };
    window.localStorage.setItem('register', JSON.stringify(register));
    this.router.navigate(['/register/kyc-details']);
    // } else {
    //show error of invalid username and password
    // }
  }
}
