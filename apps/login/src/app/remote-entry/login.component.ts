import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from '@mobiquity/shared';
import { LoginService } from './login.service';

@Component({
  selector: 'mobiquity-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  translation: any;
  language: any;

  loginForm !: FormGroup;

  constructor(
    private translationService: TranslationService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
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
    this.loginService.login({...this.loginForm.value, language: this.language}).subscribe(res =>{
      if(res.status === "FAILED"){
        if(res.errors[0].code === "FTL01"){
          this.router.navigate(['/reset-pin']);
        }
      }
      else if(res.status === "PAUSED"){
        //sendOTP here first
        this.router.navigate(['/otp']);
      }
    });
  }
}
