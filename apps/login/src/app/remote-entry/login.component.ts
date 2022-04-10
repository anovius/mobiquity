import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService, UserService } from '@mobiquity/shared';
import { LoginService } from './login.service';

@Component({
  selector: 'mobiquity-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  translation: any;
  language: any;
  isLoading = false;

  loginForm !: FormGroup;

  constructor(
    private translationService: TranslationService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {

    this.init();

    this.translationService.get().subscribe((data: any) => {
      this.translation = data.login;
    });

    this.translationService.getLang().subscribe(
      lang => {
        this.language = lang;
      }
    );
  }

  init(){
    this.loginForm = this.fb.group({
      mobile: ['',  Validators.required],
      pin: ['',  Validators.required],
    });
  }

  goBack() {
    window.history.back();
  }

  login(){
    this.isLoading = true;
    this.loginService.login({...this.loginForm.value, language: this.language}).subscribe(async (res) =>{
      this.isLoading = false;
      window.localStorage.setItem('mobile', this.loginForm.value.mobile);
      if(res.status === "FAILED"){
        if(res.errors[0].code === "FTL01"){
          this.router.navigate(['/reset-pin']);
        }
      }
      else if(res.status === "PAUSED"){
        this.isLoading = true;
        this.loginService.generateOtp(this.loginForm.value.mobile).subscribe(res =>{
          this.isLoading = false;
          window.localStorage.setItem('serviceRequestId', res.serviceRequestId);
          this.router.navigate(['/otp']);
        });
      }

      else if(res.status === "SUCCEEDED"){
          window.localStorage.setItem("access_token", res.token.access_token);
          window.localStorage.setItem("refresh_token", res.token.refresh_token);
          await this.userService.onSuccessLogin();
      }
      else{
        //show error of invalid username and password
      }
    });
  }
}
