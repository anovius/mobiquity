import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService, UserService } from '@mobiquity/shared';
import { RegisterService } from '../register.service';

@Component({
  selector: 'mobiquity-set-pin',
  templateUrl: './set-pin.component.html',
  styleUrls: ['./set-pin.component.css'],
})
export class SetPinComponent implements OnInit {
  translation: any;
  registerForm: any;
  registerP4: any;

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
      pin: ['', Validators.required],
      confirm: ['', Validators.required],
    });
  }

  submit() {
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

    if (this.registerForm.value.pin === this.registerForm.value.confirm) {
      let retrievedObject: any = window.localStorage.getItem('register');
      this.registerP4 = JSON.parse(retrievedObject);
      let register = {
        ...this.registerP4,
        pin: this.registerForm.value.pin,
      };
      this.router.navigate(['/']);
    } else {
      alert('Pin and Confirm Pin does not match');
    }
    // } else {
    //show error of invalid username and password
    // }
  }
}
