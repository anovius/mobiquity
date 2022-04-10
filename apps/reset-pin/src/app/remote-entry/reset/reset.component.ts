import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from '@mobiquity/shared';
import { ResetService } from '../reset.service';


@Component({
  selector: 'mobiquity-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

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

  hasErrors = false;
  isSuccess = false;
  errorMessage = "";
  isLoading = false;

  ngOnInit() {
    this.init();

    this.mobile = window.localStorage.getItem('mobile');
    // window.localStorage.removeItem('mobile');

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

  onFocusOutEvent(event: any){
    if(this.resetForm.value.confirmPin === '' || this.resetForm.value.pin === '') return;
    if(this.resetForm.value.pin !== this.resetForm.value.confirmPin){
      this.hasErrors = true;
      this.errorMessage = "PIN doesn't match.";
    }
    else{
      this.hasErrors = false;
      this.errorMessage = "";
    }
  }

  reset(){
    if(this.resetForm.invalid || this.hasErrors) return;
    this.isLoading = true;
    this.resetService.reset({...this.resetForm.value, language: this.language, mobile: this.mobile}).subscribe(res =>{
      this.isLoading = false;
      if(res.status === "FAILED"){
        //TODO  
        //show error message
      }
      else if(res.status === "SUCCEEDED"){
        this.isSuccess = true;
      }
    });
  }

}
