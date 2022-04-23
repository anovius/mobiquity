import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService, UserService } from '@mobiquity/shared';
import { environment } from '../../../../../environment';
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

  securityProfileOptions = [
    {
      name: 'subscriber',
      value: 'SUBSCRIBER',
    },
    {
      name: 'agent',
      value: 'AGENT',
    },
  ];
  authProfileOptions = [
    {
      name: 'subscriber',
      value: 'SUBSCRIBER',
    },
    {
      name: 'agent',
      value: 'AGENT',
    },
  ];
  regulatoryProfileOptions = [
    {
      name: 'subscriber',
      value: 'SUBSCRIBER',
    },
    {
      name: 'agent',
      value: 'AGENT',
    },
  ];
  marketingProfileOptions = [
    {
      name: 'subscriber',
      value: 'SUBSCRIBER',
    },
    {
      name: 'agent',
      value: 'AGENT',
    },
  ];
  hasSecurityProfileError: boolean = false;
  hasRegulatoryProfileError: boolean = false;
  hasAuthProfileError: boolean = false;
  hasMarketingProfileError: boolean = false;
  securityProfileError: string = '';
  authProfileError: string = '';
  regulatoryProfileError: string = '';
  marketingProfileError: string = '';
  flag = true;
  schema: any;
  openModalSuccess: boolean = false;
  openModalFailure: boolean = false;
  failureError: any;
  categoryProfileData: any;

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

    this.registerFormValueChanges();
    this.getCategoryProfile();
  }

  init() {
    this.registerForm = this.fb.group({
      securityProfile: ['', Validators.required],
      authProfile: ['', Validators.required],
      regulatoryProfile: ['', Validators.required],
      marketingProfile: ['', Validators.required],
    });
  }

  getCategoryProfile() {
    this.registerService.getCategoryProfile().subscribe(
      (res: any) => {
        this.categoryProfileData = res.payload.schema;
        console.log(this.categoryProfileData);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  registerFormValueChanges() {
    this.securityProfileValueChanges();
    this.authProfileValueChanges();
    this.regulatoryProfileValueChanges();
    this.marketingProfileValueChanges();
  }

  securityProfileValueChanges() {
    this.registerForm
      .get('securityProfile')
      ?.valueChanges.subscribe((res: any) => {
        this.flag = false;
        this.hasSecurityProfileError = false;
        this.securityProfileError = '';
        if (this.registerForm?.get('securityProfile')?.errors?.required) {
          this.hasSecurityProfileError = true;
          this.securityProfileError += 'Security profile is mandatory';
        } else {
          this.hasSecurityProfileError = false;
          this.securityProfileError = '';
        }
      });
  }

  authProfileValueChanges() {
    this.registerForm.get('authProfile')?.valueChanges.subscribe((res: any) => {
      this.flag = false;
      this.hasAuthProfileError = false;
      this.authProfileError = '';
      if (this.registerForm?.get('authProfile')?.errors?.required) {
        this.hasAuthProfileError = true;
        this.authProfileError += 'Authorisation profile is mandatory';
      } else {
        this.hasAuthProfileError = false;
        this.authProfileError = '';
      }
    });
  }

  regulatoryProfileValueChanges() {
    this.registerForm
      .get('regulatoryProfile')
      ?.valueChanges.subscribe((res: any) => {
        this.flag = false;
        this.hasRegulatoryProfileError = false;
        this.regulatoryProfileError = '';
        if (this.registerForm?.get('regulatoryProfile')?.errors?.required) {
          this.hasRegulatoryProfileError = true;
          this.regulatoryProfileError += 'Regulatory mandatory is mandatory';
        } else {
          this.hasRegulatoryProfileError = false;
          this.regulatoryProfileError = '';
        }
      });
  }

  marketingProfileValueChanges() {
    this.registerForm
      .get('marketingProfile')
      ?.valueChanges.subscribe((res: any) => {
        this.flag = false;
        this.hasMarketingProfileError = false;
        this.marketingProfileError = '';
        if (this.registerForm?.get('marketingProfile')?.errors?.required) {
          this.hasMarketingProfileError = true;
          this.marketingProfileError += 'Marketing profile is mandatory';
        } else {
          this.hasMarketingProfileError = false;
          this.marketingProfileError = '';
        }
      });
  }

  submit() {
    let retrievedObject: any = window.localStorage.getItem('register');
    this.registerP4 = JSON.parse(retrievedObject);
    let register = {
      ...this.registerP4,
      ...this.registerForm.value,
    };

    this.registerService.register(register).subscribe((res) => {
      if (res.status === 'FAILED') {
        this.openModalFailure = true;
        this.failureError = res.errors[0].message;
      } else if (res.status === 'SUCCEEDED') {
        this.openModalSuccess = true;
      }
    });
  }

  goBack() {
    this.openModalSuccess = false;
    this.openModalFailure = false;
  }

  goLogin() {
    this.router.navigate(['/login']);
    this.openModalSuccess = false;
    this.openModalFailure = false;
  }

  goHome() {
    this.router.navigate(['/']);
    this.openModalSuccess = false;
    this.openModalFailure = false;
  }
}
