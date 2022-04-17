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
  kycIdTypeOptions = [
    {
      value: 'Passport',
      key: 'PASSPORT',
    },
    {
      value: 'National ID',
      key: 'NATIONAL_ID',
    },
    {
      value: 'Driver card',
      key: 'DRIVER_CARD',
    },
    {
      value: 'PAN Card',
      key: 'PAN_CARD',
    },
    {
      value: 'SSN',
      key: 'SSN',
    },
    {
      value: 'Govt. Issued ID',
      key: 'GOVT_ID',
    },
    {
      value: 'Voter Card',
      key: 'VOTER_CARD',
    },
  ];
  hasKycIdTypeError: boolean = false;
  hasKycIdValueError: boolean = false;
  hasIsPrimaryKYCIdError: boolean = false;
  hasKycGracePeriodError: boolean = false;
  hasKycImageUrlError: boolean = false;
  hasKycIdIssueCountryError: boolean = false;
  hasKycIdValidToError: boolean = false;
  hasKycIdIssueDateError: boolean = false;
  hasKycIdValidFromError: boolean = false;
  kycIdIssueDateError: string = '';
  kycIdIssueCountryError: string = '';
  kycIdValidFromError: string = '';
  kycGracePeriodError: string = '';
  kycIdValidToError: string = '';
  kycIdValueError: string = '';
  kycImageUrlError: string = '';
  kycIdTypeError: string = '';
  isPrimaryKYCIdError: string = '';
  uploadedFileUrl: any;

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
  }

  init() {
    this.registerForm = this.fb.group({
      kycIdType: ['', Validators.required],
      kycIdValue: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]{10,14}$')],
      ],
      kycGracePeriod: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      kycIdIssueCountry: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]*$')],
      ],
      kycIdIssueDate: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]*$')],
      ],
      kycIdValidFrom: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]*$')],
      ],
      kycIdValidTo: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]*$')],
      ],
      kycImageUrl: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9:/.,$-]*$')],
      ],
      isPrimaryKYCId: [false, [Validators.required]],
    });
  }

  registerFormValueChanges() {
    this.kycIdTypeValueChanges();
    this.kycIdValueValueChanges();
    this.kycGracePeriodValueChanges();
    this.kycIdIssueCountryValueChanges();
    this.kycIdIssueDateValueChanges();
    this.kycIdValidFromValueChanges();
    this.kycIdValidToValueChanges();
    this.kycImageUrlValueChanges();
    this.isPrimaryKYCIdValueChanges();
  }

  kycIdTypeValueChanges() {
    this.registerForm.get('kycIdType')?.valueChanges.subscribe((res: any) => {
      this.hasKycIdTypeError = false;
      this.kycIdTypeError = '';
      if (this.registerForm?.get('kycIdType')?.errors?.required) {
        this.hasKycIdTypeError = true;
        this.kycIdTypeError += 'KYC Id type is mandatory';
      } else {
        this.hasKycIdTypeError = false;
        this.kycIdTypeError = '';
      }
    });
  }

  kycIdValueValueChanges() {
    this.registerForm.get('kycIdValue')?.valueChanges.subscribe((res: any) => {
      this.hasKycIdValueError = false;
      this.kycIdValueError = '';
      if (this.registerForm?.get('kycIdValue')?.errors?.required) {
        this.hasKycIdValueError = true;
        this.kycIdValueError += 'KYC Id value is mandatory';
      } else if (this.registerForm?.get('kycIdValue')?.errors?.pattern) {
        this.hasKycIdValueError = true;
        this.kycIdValueError +=
          'Only alphabets,digits are allowed and the length should between 10 to 14 characters';
      } else {
        this.hasKycIdValueError = false;
        this.kycIdValueError = '';
      }
    });
  }

  kycGracePeriodValueChanges() {
    this.registerForm
      .get('kycGracePeriod')
      ?.valueChanges.subscribe((res: any) => {
        this.hasKycGracePeriodError = false;
        this.kycGracePeriodError = '';
        if (this.registerForm?.get('kycGracePeriod')?.errors?.required) {
          this.hasKycGracePeriodError = true;
          this.kycGracePeriodError += 'Grace Period is mandatory';
        } else if (this.registerForm?.get('kycGracePeriod')?.errors?.pattern) {
          this.hasKycGracePeriodError = true;
          this.kycGracePeriodError += 'only numeric values allowed';
        } else {
          this.hasKycGracePeriodError = false;
          this.kycGracePeriodError = '';
        }
      });
  }

  kycIdIssueCountryValueChanges() {
    this.registerForm
      .get('kycIdIssueCountry')
      ?.valueChanges.subscribe((res: any) => {
        this.hasKycIdIssueCountryError = false;
        this.kycIdIssueCountryError = '';
        if (this.registerForm?.get('kycIdIssueCountry')?.errors?.required) {
          this.hasKycIdIssueCountryError = true;
          this.kycIdIssueCountryError += 'Mandatory';
        } else if (
          this.registerForm?.get('kycIdIssueCountry')?.errors?.pattern
        ) {
          this.hasKycIdIssueCountryError = true;
          this.kycIdIssueCountryError += 'Country Issued In is invalid';
        } else {
          this.hasKycIdIssueCountryError = false;
          this.kycIdIssueCountryError = '';
        }
      });
  }

  kycIdIssueDateValueChanges() {
    this.registerForm
      .get('kycIdIssueDate')
      ?.valueChanges.subscribe((res: any) => {
        this.hasKycIdIssueDateError = false;
        this.kycIdIssueDateError = '';
        if (this.registerForm?.get('kycIdIssueDate')?.errors?.required) {
          this.hasKycIdIssueDateError = true;
          this.kycIdIssueDateError += 'Mandatory';
        } else if (this.registerForm?.get('kycIdIssueDate')?.errors?.pattern) {
          this.hasKycIdIssueDateError = true;
          this.kycIdIssueDateError += 'Country Issued In is invalid';
        } else {
          this.hasKycIdIssueDateError = false;
          this.kycIdIssueDateError = '';
        }
      });
  }

  kycIdValidFromValueChanges() {
    this.registerForm
      .get('kycIdValidFrom')
      ?.valueChanges.subscribe((res: any) => {
        this.hasKycIdValidFromError = false;
        this.kycIdValidFromError = '';
        if (this.registerForm?.get('kycIdValidFrom')?.errors?.required) {
          this.hasKycIdValidFromError = true;
          this.kycIdValidFromError += 'Mandatory';
        } else if (this.registerForm?.get('kycIdValidFrom')?.errors?.pattern) {
          this.hasKycIdValidFromError = true;
          this.kycIdValidFromError += 'Country Issued In is invalid';
        } else {
          this.hasKycIdValidFromError = false;
          this.kycIdValidFromError = '';
        }
      });
  }

  kycIdValidToValueChanges() {
    this.registerForm
      .get('kycIdValidTo')
      ?.valueChanges.subscribe((res: any) => {
        this.hasKycIdValidToError = false;
        this.kycIdValidToError = '';
        if (this.registerForm?.get('kycIdValidTo')?.errors?.required) {
          this.hasKycIdValidToError = true;
          this.kycIdValidToError += 'Mandatory';
        } else if (this.registerForm?.get('kycIdValidTo')?.errors?.pattern) {
          this.hasKycIdValidToError = true;
          this.kycIdValidToError += 'Country Issued In is invalid';
        } else {
          this.hasKycIdValidToError = false;
          this.kycIdValidToError = '';
        }
      });
  }

  kycImageUrlValueChanges() {
    this.registerForm.get('kycImageUrl')?.valueChanges.subscribe((res: any) => {
      this.hasKycImageUrlError = false;
      this.kycImageUrlError = '';
      if (this.registerForm?.get('kycImageUrl')?.errors?.required) {
        this.hasKycImageUrlError = true;
        this.kycImageUrlError += 'Mandatory';
      } else if (this.registerForm?.get('kycImageUrl')?.errors?.pattern) {
        this.hasKycImageUrlError = true;
        this.kycImageUrlError += 'Upload Documents is invalid';
      } else {
        this.uploadFile();
        this.hasKycImageUrlError = false;
        this.kycImageUrlError = '';
      }
    });
  }

  isPrimaryKYCIdValueChanges() {
    this.registerForm
      .get('isPrimaryKYCId')
      ?.valueChanges.subscribe((res: any) => {
        this.hasIsPrimaryKYCIdError = false;
        this.isPrimaryKYCIdError = '';
        if (this.registerForm?.get('isPrimaryKYCId')?.value === false) {
          this.hasIsPrimaryKYCIdError = true;
          this.isPrimaryKYCIdError += 'Make this primary is required';
        } else {
          this.hasIsPrimaryKYCIdError = false;
          this.isPrimaryKYCIdError = '';
        }
      });
  }

  uploadFile() {
    this.registerService
      .uploadFile(this.registerForm.value.profilePhotoURI)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === 'SUCCEEDED') {
          this.uploadedFileUrl = res.url;
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
