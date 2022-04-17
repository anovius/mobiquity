import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService, UserService } from '@mobiquity/shared';
import { RegisterService } from './register.service';

@Component({
  selector: 'mobiquity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'register';

  translation: any;
  registerForm: any;
  isVerifyNumberCalled = false;
  contactError: string = '';
  showVerifyNumber = false;
  showVerifyEmail = false;
  contactNumber = '';
  isContactVerified = false;
  isLoading: boolean = false;
  otp: any = '';
  otpTranslation: any;
  openModal: boolean = false;
  email = '';
  refCode = '';
  isEmailVerified = false;
  // selectedTitle!: number;
  hasError: boolean = false;

  titleOptions = [
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

  preferredLanguageOptions = [
    {
      name: 'en',
      display: 'English',
    },
    {
      name: 'ar',
      display: 'Arabic',
    },
  ];

  hasFirstNameError = false;
  hasLastNameError = false;
  hasProfilePhotoURIError: boolean = false;
  hasCifError: boolean = false;
  hasReferralCodeError: boolean = false;
  hasFullNameError: boolean = false;
  hasLoginIdError: boolean = false;
  hasEmailIdError: boolean = false;
  hasTitleError: boolean = false;
  hasPreferredLanguageError: boolean = false;
  hasDateOfBirthError: boolean = false;
  hasGenderInfoError: boolean = false;
  firstNameError = '';
  lastNameError = '';
  profilePhotoURIError: string = '';
  cifError: string = '';
  fullNameError: string = '';
  referralCodeError: string = '';
  emailId: any;
  referralCode: any;
  loginIdError: string = '';
  emailIdError: string = '';
  authError: string = '';
  preferredLanguageError: string = '';
  genderInfoError: string = '';
  titleError: string = '';
  dateOfBirthError: string = '';
  categoryProfileData: any;
  uploadedFileUrl: any;
  flag = true;

  constructor(
    private translationService: TranslationService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.init();
    this.setToken();

    this.translationService.get().subscribe((data: any) => {
      this.translation = data.register;
      this.otpTranslation = data.otp;
    });

    this.registerFormValueChanges();
  }

  init() {
    this.registerForm = this.fb.group({
      loginId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]{3,20}$'),
          this.duplicateEmailValidator.bind(this),
        ],
      ],
      emailId: [
        '',
        [
          Validators.pattern('^[a-zA-Z0-9@.]*$'),
          this.duplicateEmailValidator.bind(this),
        ],
      ],
      referralCode: ['', Validators.pattern('^[a-zA-Z0-9@.]*$')],

      title: ['', [Validators.required]],
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      preferredLanguage: ['', Validators.required],
      genderInfo: ['GEN_MAL', Validators.required],
      profilePhotoURI: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9:/.-]*$')],
      ],
      cif: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      dateOfBirth: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9:/.-]*$')],
      ],
      mobileNumber: ['', Validators.required],
      // middleName: ['', Validators.required],
      // paymentID: ['', Validators.required],
    });
  }

  getCategoryProfile() {
    this.registerService.getCategoryProfile().subscribe(
      (res: any) => {
        console.log(res);
        this.categoryProfileData = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  registerFormValueChanges() {
    this.loginIdValueChanges();
    this.emailValueChanges();
    this.referralCodeValueChanges();
    this.titleValueChanges();
    this.firstNameValueChanges();
    this.lastNameValueChanges();
    this.fullNameValueChanges();
    this.preferredLanguageValueChanges();
    this.genderInfoValueChanges();
    this.cifValueChanges();
    this.profilePhotoURIValueChanges();
    this.dateOfBirthValueChanges();
    // this.mobileValueChanges();
    // });
  }

  duplicateEmailValidator(control: FormControl) {
    let email = control.value;
    // if (email && this.emailIds.includes(email)) {
    //   return {
    //     duplicateEmailId: {
    //       email: email,
    //     },
    //   };
    // }
    return null;
  }

  resetForm() {
    this.registerForm.reset();
  }

  loginIdValueChanges() {
    this.registerForm.get('loginId')?.valueChanges.subscribe((res: any) => {
      this.hasLoginIdError = false;
      this.loginIdError = '';
      this.flag = false;
      if (this.registerForm?.get('loginId')?.errors?.required) {
        this.hasLoginIdError = true;
        this.loginIdError += 'Login Id is mandatory';
      } else if (this.registerForm?.get('loginId')?.errors?.pattern) {
        this.hasLoginIdError = true;
        this.loginIdError +=
          'Only alphabets and digits are allowed and max length is 20';
      } else {
        this.hasLoginIdError = false;
        this.loginIdError = '';
      }
    });
  }

  emailValueChanges() {
    this.registerForm.get('emailId')?.valueChanges.subscribe((res: any) => {
      this.hasEmailIdError = false;
      this.emailIdError = '';
      this.flag = false;
      if (this.registerForm?.get('emailId')?.errors?.pattern) {
        this.hasEmailIdError = true;
        this.emailIdError += 'Email Address is invalid';
      } else {
        this.email = this.registerForm.get('emailId').value;
        this.hasEmailIdError = false;
        this.emailIdError = '';
      }
    });
  }

  referralCodeValueChanges() {
    this.registerForm
      .get('referralCode')
      ?.valueChanges.subscribe((res: any) => {
        this.flag = false;
        this.hasReferralCodeError = false;
        this.referralCodeError = '';
        if (this.registerForm?.get('referralCode')?.errors?.pattern) {
          this.hasReferralCodeError = true;
          this.referralCodeError += 'Referral Code is Invalid';
        } else if (this.registerForm?.get('referralCode')?.errors === null) {
          this.showVerifyEmail = true;
        } else {
          this.hasReferralCodeError = false;
          this.referralCodeError = '';
        }
      });
  }

  titleValueChanges() {
    this.registerForm.get('title')?.valueChanges.subscribe((res: any) => {
      this.hasTitleError = false;
      this.titleError = '';
      this.flag = false;
      if (this.registerForm?.get('title')?.errors?.required) {
        this.hasTitleError = true;
        this.titleError += 'Title is mandatory';
      } else {
        this.hasTitleError = false;
        this.titleError = '';
      }
    });
  }

  firstNameValueChanges() {
    this.registerForm.get('firstName')?.valueChanges.subscribe((res: any) => {
      this.hasFirstNameError = false;
      this.firstNameError = '';
      this.flag = false;
      if (this.registerForm?.get('firstName')?.errors?.required) {
        this.hasFirstNameError = true;
        this.firstNameError += 'First Name is mandatory';
      } else if (this.registerForm?.get('firstName')?.errors?.pattern) {
        this.hasFirstNameError = true;
        this.firstNameError += 'Only alphabets and space is allowed';
      } else {
        this.hasFirstNameError = false;
        this.firstNameError = '';
      }
    });
  }

  lastNameValueChanges() {
    this.registerForm.get('lastName')?.valueChanges.subscribe((res: any) => {
      this.hasLastNameError = false;
      this.lastNameError = '';
      this.flag = false;
      if (this.registerForm?.get('lastName')?.errors?.required) {
        this.hasLastNameError = true;
        this.lastNameError += 'Last Name is mandatory';
      } else if (this.registerForm?.get('lastName')?.errors?.pattern) {
        this.hasLastNameError = true;
        this.lastNameError += 'Only alphabets and space is allowed';
      } else {
        this.hasLastNameError = false;
        this.lastNameError = '';
      }
    });
  }

  fullNameValueChanges() {
    this.registerForm.get('fullName')?.valueChanges.subscribe((res: any) => {
      this.hasFullNameError = false;
      this.fullNameError = '';
      this.flag = false;
      if (this.registerForm?.get('fullName')?.errors?.required) {
        this.hasFullNameError = true;
        this.fullNameError += 'Full Name is mandatory';
      } else if (this.registerForm?.get('fullName')?.errors?.pattern) {
        this.hasFullNameError = true;
        this.fullNameError += 'Only alphabets and space is allowed';
      } else {
        this.hasFullNameError = false;
        this.fullNameError = '';
      }
    });
  }

  preferredLanguageValueChanges() {
    this.registerForm
      .get('preferredLanguage')
      ?.valueChanges.subscribe((res: any) => {
        this.flag = false;
        this.hasPreferredLanguageError = false;
        this.preferredLanguageError = '';
        if (this.registerForm?.get('preferredLanguage')?.errors?.required) {
          this.hasPreferredLanguageError = true;
          this.preferredLanguageError += 'Preferred language is mandatory';
        } else {
          this.hasPreferredLanguageError = false;
          this.preferredLanguageError = '';
        }
      });
  }

  genderInfoValueChanges() {
    this.registerForm.get('genderInfo')?.valueChanges.subscribe((res: any) => {
      this.hasGenderInfoError = false;
      this.genderInfoError = '';
      this.flag = false;
      if (this.registerForm?.get('genderInfo')?.errors?.required) {
        this.hasGenderInfoError = true;
        this.genderInfoError += 'Gender is mandatory';
      } else {
        this.hasGenderInfoError = false;
        this.genderInfoError = '';
      }
    });
  }

  profilePhotoURIValueChanges() {
    this.registerForm
      .get('profilePhotoURI')
      ?.valueChanges.subscribe((res: any) => {
        this.flag = false;
        this.hasProfilePhotoURIError = false;
        this.profilePhotoURIError = '';
        if (this.registerForm?.get('profilePhotoURI')?.errors?.required) {
          this.hasProfilePhotoURIError = true;
          this.profilePhotoURIError += 'Profile Photo URI is mendatory';
        } else if (this.registerForm?.get('profilePhotoURI')?.errors?.pattern) {
          this.hasProfilePhotoURIError = true;
          this.profilePhotoURIError += 'Profile Photo URI is invalid';
        } else {
          this.uploadFile();
          this.hasProfilePhotoURIError = false;
          this.profilePhotoURIError = '';
        }
      });
  }

  cifValueChanges() {
    this.registerForm.get('cif')?.valueChanges.subscribe((res: any) => {
      this.hasCifError = false;
      this.cifError = '';
      this.flag = false;
      if (this.registerForm?.get('cif')?.errors?.required) {
        this.hasCifError = true;
        this.cifError += 'CIF is mandatory';
      } else if (this.registerForm?.get('cif')?.errors?.pattern) {
        this.hasCifError = true;
        this.cifError += 'Only alphabets and digits are allowed';
      } else {
        this.hasCifError = false;
        this.cifError = '';
      }
    });
  }

  dateOfBirthValueChanges() {
    this.registerForm.get('dateOfBirth')?.valueChanges.subscribe((res: any) => {
      this.hasDateOfBirthError = false;
      this.dateOfBirthError = '';
      this.flag = false;
      if (this.registerForm?.get('dateOfBirth')?.errors?.required) {
        this.hasDateOfBirthError = true;
        this.dateOfBirthError += 'DOB is mandatory';
      } else if (this.registerForm?.get('dateOfBirth')?.errors?.pattern) {
        this.hasDateOfBirthError = true;
        this.dateOfBirthError += 'dates format are allowed';
      } else {
        this.hasDateOfBirthError = false;
        this.dateOfBirthError = '';
      }
    });
  }

  mobileValueChanges() {
    this.registerForm.get('mobile')?.valueChanges.subscribe((res: any) => {
      this.contactNumber = res;
      if (res.length === 13) {
        this.flag = false;
        if (res[0] === '+') {
          this.showVerifyNumber = true;
        } else {
          this.contactError = 'Invalid mobile number format';
        }
      } else {
        this.showVerifyNumber = false;
      }
    });
  }

  showModal() {
    this.openModal = true;
  }

  verifyNumber() {
    this.isLoading = true;
    this.isVerifyNumberCalled = true;
    this.registerService
      .verifyNumber(this.contactNumber)
      .subscribe((res: any) => {
        this.isLoading = false;
        if (res.status === 'SUCCEEDED') {
          this.showVerifyNumber = false;
          this.showModal();
          // this.router.navigate(['/register/address']);
        } else {
          this.contactError = 'Mobile Number Already Exists';
        }
      });
  }

  verifyEmail() {
    this.isLoading = true;
    this.isVerifyNumberCalled = true;
    this.registerService
      .verifyEmail(this.email, this.registerForm.value.referralCode)
      .subscribe((res: any) => {
        this.isLoading = false;
        if (res.status === 'SUCCEEDED') {
          this.showVerifyEmail = false;
          this.isEmailVerified = true;
        }
      });
  }

  verifyNumberOTP() {
    this.isLoading = true;
    this.registerService.verifyNumberOTP(this.otp).subscribe((res: any) => {
      this.isLoading = false;
      if (res.status === 'FAILED') {
        this.hasError = true;
      } else if (res.status === 'SUCCEEDED') {
        this.openModal = false;
        this.isContactVerified = true;
      }
    });
  }

  setToken() {
    this.registerService.setToken().subscribe((res: any) => {
      window.localStorage.setItem('access_token', res.token.access_token);
      this.getCategoryProfile();
    });
  }

  refreshToken() {
    this.registerService.refreshToken().subscribe(
      (res: any) => {
        console.log(res);
        window.localStorage.setItem('refresh_token', res.refresh_token);
      },
      (err) => {
        console.log(err);
        this.authError = 'NO Auth Token Found';
      }
    );
  }

  goBack() {
    this.router.navigate(['..']);
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

  onOtpChange(otp: any) {
    this.otp = otp;
  }

  checkUnique() {
    if (this.registerForm.value.emailId.length > 0) {
      this.isLoading = true;
      this.registerService.checkUnique().subscribe((res: any) => {
        this.isLoading = false;
        if (res.status === 'FAILED') {
          this.hasEmailIdError = true;
          this.emailIdError = 'Email already exists';
        }
        if (res.status === 'SUCCEEDED') {
          this.hasEmailIdError = false;
          this.emailIdError = '';
        }
      });
    } else {
      this.hasEmailIdError = true;
      this.emailIdError = 'Email is mandatory';
    }
  }

  next() {
    console.log(this.registerForm.value);
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
    window.localStorage.setItem(
      'register',
      JSON.stringify(this.registerForm.value)
    );

    this.router.navigate(['/register/address']);
    // } else {
    //show error of invalid username and password
    // }
  }
}
