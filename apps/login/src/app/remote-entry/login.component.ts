import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      console.log(res)
    });
  }
}
