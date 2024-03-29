import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from '@mobiquity/shared';
import { ResetService } from './remote-entry/reset.service';

@Component({
  selector: 'mobiquity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'reset-pin';

  constructor(
    private router: Router,
    private location: Location,
    private resetService: ResetService,
    private translationService: TranslationService,
    private fb: FormBuilder,
    ) { }

  mobile: any;
  language: any;
  resetForm!: FormGroup; 

  ngOnInit() {
    this.init();

    this.mobile = window.localStorage.getItem('mobile');
    window.localStorage.removeItem('mobile');

    this.translationService.getLang().subscribe(
      lang => {
        this.language = lang;
      }
    );
  }

  init(){
    this.resetForm = this.fb.group({
      pin: ['',  Validators.required],
      confirmPin: ['',  Validators.required],
    });
  }

  goBack(){
    window.history.back();
  }

  reset(){
    console.log(this.resetForm.value);
    // this.resetService.reset({...this.resetForm.value, language: this.language, mobile: this.mobile}).subscribe(res =>{

    // });
  }
}
