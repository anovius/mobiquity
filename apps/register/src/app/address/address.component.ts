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
  hasAddress1Error: boolean = false;
  hasAddress2Error: boolean = false;
  hasCountryError: boolean = false;
  hasStateError: boolean = false;
  hasCityError: boolean = false;
  flag: boolean = true;
  address1Error: string = '';
  address2Error: string = '';
  countryError: string = '';
  stateError: string = '';
  cityError: string = '';

  countryOptions = [
    {
      value: 'Ms',
      key: 'PR_MISS',
    },
    {
      value: 'M/S',
      key: 'PR_MS',
    },
    {
      value: 'Mr',
      key: 'PR_MR',
    },
    {
      value: 'Mrs',
      key: 'PR_MRS',
    },
  ];

  stateOptions = [
    {
      value: 'Ms',
      key: 'PR_MISS',
    },
    {
      value: 'M/S',
      key: 'PR_MS',
    },
    {
      value: 'Mr',
      key: 'PR_MR',
    },
    {
      value: 'Mrs',
      key: 'PR_MRS',
    },
  ];

  cityOptions = [
    {
      value: 'Ms',
      key: 'PR_MISS',
    },
    {
      value: 'M/S',
      key: 'PR_MS',
    },
    {
      value: 'Mr',
      key: 'PR_MR',
    },
    {
      value: 'Mrs',
      key: 'PR_MRS',
    },
  ];

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

    this.registerFormValueChanges();
  }

  init() {
    this.registerForm = this.fb.group({
      address1: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9 -]*$')],
      ],
      address2: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9 -]*$')],
      ],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      // postalCode: ['', Validators.required],
    });
  }

  registerFormValueChanges() {
    this.address1ValueChanges();
    this.address2ValueChanges();
    this.countryValueChanges();
    this.stateValueChanges();
    this.cityValueChanges();
  }

  address1ValueChanges() {
    this.registerForm.get('address1')?.valueChanges.subscribe((res: any) => {
      this.flag = false;
      this.hasAddress1Error = false;
      this.address1Error = '';
      if (this.registerForm?.get('address1')?.errors?.required) {
        this.hasAddress1Error = true;
        this.address1Error += 'Address 1 is mandatory';
      } else if (this.registerForm?.get('address1')?.errors?.pattern) {
        this.hasAddress1Error = true;
        this.address1Error += 'Only alphanumeric, space and hyphen allowed';
      } else {
        this.hasAddress1Error = false;
        this.address1Error = '';
      }
    });
  }

  address2ValueChanges() {
    this.registerForm.get('address2')?.valueChanges.subscribe((res: any) => {
      this.flag = false;
      this.hasAddress2Error = false;
      this.address2Error = '';
      if (this.registerForm?.get('address2')?.errors?.required) {
        this.hasAddress2Error = true;
        this.address2Error += 'Address is mandatory';
      } else if (this.registerForm?.get('address2')?.errors?.pattern) {
        this.hasAddress2Error = true;
        this.address2Error += 'Address Line 2  is invalid';
      } else {
        this.hasAddress2Error = false;
        this.address2Error = '';
      }
    });
  }

  countryValueChanges() {
    this.registerForm.get('country')?.valueChanges.subscribe((res: any) => {
      this.flag = false;
      this.hasCountryError = false;
      this.countryError = '';
      console.log(this.registerForm?.get('country')?.errors);
      if (this.registerForm?.get('country')?.errors?.required) {
        this.hasCountryError = true;
        this.countryError += 'Country is mandatory';
      } else {
        this.hasCountryError = false;
        this.countryError = '';
      }
    });
  }

  stateValueChanges() {
    this.registerForm.get('state')?.valueChanges.subscribe((res: any) => {
      this.flag = false;
      this.hasStateError = false;
      this.stateError = '';
      if (this.registerForm?.get('state')?.errors?.required) {
        this.hasStateError = true;
        this.stateError += 'State is mandatory';
      } else {
        this.hasStateError = false;
        this.stateError = '';
      }
    });
  }

  cityValueChanges() {
    this.registerForm.get('city')?.valueChanges.subscribe((res: any) => {
      this.flag = false;

      this.hasCityError = false;
      this.cityError = '';
      if (this.registerForm?.get('city')?.errors?.required) {
        this.hasCityError = true;
        this.cityError += 'City is mandatory';
      } else {
        this.hasCityError = false;
        this.cityError = '';
      }
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
