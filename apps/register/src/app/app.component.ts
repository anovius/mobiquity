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
  schema: any = [];

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
  fileUrl: any;

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

    this.schema = [
      {
        label: 'Basic',
        name: 'basic',
        sections: [
          {
            label: 'Workspace Information',
            name: 'workspaceInformation',
            show: 'N',
            fields: [
              {
                label: 'Workspace',
                type: 'input',
                inputType: 'text',
                show: 'Y',
                apiGroup: 'userInformation',
                apiGroupType: '',
                apiSection: 'workspaceInformation',
                apiSectionType: '',
                isEditable: 'N',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                id: 'workspace',
                name: 'workspace',
                validations: [
                  {
                    name: 'required',
                    validator: 'N',
                    message: 'Workspace is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z]*$',
                    message: 'Only alphabets are allowed',
                  },
                ],
                values: '',
              },
              {
                label: 'Category Name',
                type: 'input',
                inputType: 'text',
                show: 'Y',
                apiGroup: 'userInformation',
                apiGroupType: '',
                apiSection: 'workspaceInformation',
                apiSectionType: '',
                isEditable: 'N',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                id: 'categoryName',
                name: 'categoryName',
                validations: [
                  {
                    name: 'required',
                    validator: 'N',
                    message: 'Category name is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z ]*$',
                    message: 'Only alphabets and space are allowed',
                  },
                ],
                values: '',
              },
              {
                label: 'Category Code',
                type: 'input',
                inputType: 'text',
                show: 'Y',
                apiGroup: 'userInformation',
                apiGroupType: '',
                apiSection: 'workspaceInformation',
                apiSectionType: '',
                isEditable: 'N',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                id: 'categoryCode',
                name: 'categoryCode',
                validations: [
                  {
                    name: 'required',
                    validator: 'N',
                    message: 'Category code is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z]*$',
                    message: 'Only alphabets are allowed',
                  },
                ],
                values: '',
              },
            ],
          },
          {
            label: 'Personal Information',
            name: 'personalInformation',
            subsection: [
              {
                label: 'Contact Details',
                name: 'contactdetails',
                fields: [
                  {
                    label: 'Login ID',
                    type: 'input',
                    inputType: 'text',
                    apiGroup: 'userInformation',
                    apiGroupType: '',
                    apiSection: 'basicInformation',
                    apiSectionType: '',
                    isEditable: 'Y',
                    isUnique: 'Y',
                    isIdentifier: 'Y',
                    show: 'Y',
                    informationIcon: 'Y',
                    IsVerificationRequired: 'Y',
                    verificationEndPoint: '<End Point URL>',
                    bulk_label: 'Login ID',
                    id: 'loginId',
                    name: 'loginId',
                    validations: [
                      {
                        name: 'required',
                        validator: 'required',
                        message: 'Login Id is mandatory',
                      },
                      {
                        name: 'pattern',
                        validator: '^[a-zA-Z0-9]{3,20}$',
                        message:
                          'Only alphabets and digits are allowed and max length is 20',
                      },
                      {
                        name: 'duplicate',
                        validator: 'duplicate',
                        message: 'Login already exists',
                      },
                    ],
                    values: '',
                  },
                  {
                    label: 'Email Address',
                    type: 'input',
                    inputType: 'text',
                    apiGroup: 'userInformation',
                    apiGroupType: '',
                    apiSection: 'basicInformation',
                    apiSectionType: '',
                    isEditable: 'Y',
                    isUnique: 'Y',
                    isIdentifier: 'N',
                    show: 'Y',
                    informationIcon: 'Y',
                    IsVerificationRequired: 'Y',
                    verificationEndPoint: '<End Point URL>',
                    bulk_label: 'Email ID',
                    id: 'emailId',
                    name: 'emailId',
                    validations: [
                      {
                        name: 'pattern',
                        validator: '^[a-zA-Z0-9@.]*$',
                        message: 'Email Address is invalid',
                      },
                      {
                        name: 'duplicate',
                        validator: 'duplicate',
                        message: 'Email already exists',
                      },
                    ],
                    values: '',
                  },
                  {
                    label: 'Referral Code',
                    type: 'input',
                    inputType: 'text',
                    apiGroup: 'userInformation',
                    apiGroupType: '',
                    apiSection: 'basicInformation',
                    apiSectionType: '',
                    isEditable: 'Y',
                    isUnique: 'Y',
                    isIdentifier: 'N',
                    show: 'Y',
                    informationIcon: 'Y',
                    IsVerificationRequired: 'Y',
                    verificationEndPoint: '<End Point URL>',
                    bulk_label: 'Referral Code',
                    id: 'referralCode',
                    name: 'referralCode',
                    validations: [
                      {
                        name: 'pattern',
                        validator: '^[a-zA-Z0-9@.]*$',
                        message: 'Referral Code is Invalid',
                      },
                      {
                        name: 'invalid',
                        validator: 'invalid',
                        message: 'Referral code do not exists',
                      },
                    ],
                    values: '',
                  },
                ],
              },
              {
                label: 'Personal Details',
                name: 'personaldetails',
                fields: [
                  {
                    label: 'Title',
                    type: 'input',
                    enumKey: 'NAME_PREFIX',
                    apiGroup: 'userInformation',
                    apiGroupType: '',
                    apiSection: 'basicInformation',
                    apiSectionType: '',
                    isEditable: 'Y',
                    show: 'Y',
                    informationIcon: 'Y',
                    IsVerificationRequired: 'N',
                    verificationEndPoint: '<End Point URL>',
                    bulk_label: 'Title',
                    id: 'title',
                    name: 'title',
                    inputType: 'select',
                    data: [
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
                    ],
                    values: '',
                    validations: [
                      {
                        name: 'required',
                        validator: 'Y',
                        message: 'Title is mandatory',
                      },
                      {
                        name: 'pattern',
                        validator: '^[a-zA-Z0-9:/.-]*$',
                        message: 'Invalid Data',
                      },
                    ],
                  },
                  {
                    label: 'First Name',
                    type: 'input',
                    show: 'Y',
                    inputType: 'text',
                    apiGroup: 'userInformation',
                    apiGroupType: '',
                    apiSection: 'basicInformation',
                    apiSectionType: '',
                    isEditable: 'Y',
                    informationIcon: 'Y',
                    IsVerificationRequired: 'N',
                    verificationEndPoint: '<End Point URL>',
                    bulk_label: 'First Name',
                    id: 'firstName',
                    name: 'firstName',
                    validations: [
                      {
                        name: 'required',
                        validator: 'Y',
                        message: 'First name is mandatory',
                      },
                      {
                        name: 'pattern',
                        validator: '^[a-zA-Z ]*$',
                        message: 'Only alphabets and space is allowed',
                      },
                    ],
                    values: '',
                  },
                  {
                    label: 'Last Name',
                    type: 'input',
                    inputType: 'text',
                    apiGroup: 'userInformation',
                    apiGroupType: '',
                    apiSection: 'basicInformation',
                    apiSectionType: '',
                    isEditable: 'Y',
                    show: 'Y',
                    informationIcon: 'Y',
                    IsVerificationRequired: 'N',
                    verificationEndPoint: '<End Point URL>',
                    bulk_label: 'Last Name',
                    id: 'lastName',
                    name: 'lastName',
                    validations: [
                      {
                        name: 'required',
                        validator: 'Y',
                        message: 'Last name is mandatory',
                      },
                      {
                        name: 'pattern',
                        validator: '^[a-zA-Z ]*$',
                        message: 'Only alphabets and space is allowed',
                      },
                    ],
                    values: '',
                  },
                  {
                    label: 'Full Name',
                    type: 'input',
                    inputType: 'text',
                    apiGroup: 'userInformation',
                    apiGroupType: '',
                    apiSection: 'basicInformation',
                    apiSectionType: '',
                    isEditable: 'Y',
                    show: 'Y',
                    informationIcon: 'Y',
                    IsVerificationRequired: 'N',
                    verificationEndPoint: '<End Point URL>',
                    bulk_label: 'Full Name',
                    id: 'fullName',
                    name: 'fullName',
                    validations: [
                      {
                        name: 'required',
                        validator: 'Y',
                        message: 'Full name is mandatory',
                      },
                      {
                        name: 'pattern',
                        validator: '^[a-zA-Z ]*$',
                        message: 'Only alphabets and space is allowed',
                      },
                    ],
                    values: '',
                  },
                  {
                    label: 'Preferred Language',
                    type: 'input',
                    inputType: 'select',
                    apiGroup: 'userInformation',
                    apiGroupType: '',
                    apiSection: 'basicInformation',
                    apiSectionType: '',
                    isEditable: 'Y',
                    show: 'Y',
                    informationIcon: 'Y',
                    IsVerificationRequired: 'N',
                    verificationEndPoint: '<End Point URL>',
                    bulk_label: 'Preferred Language',
                    id: 'preferredLanguage',
                    name: 'preferredLanguage',
                    data: [
                      {
                        name: 'en',
                        display: 'English',
                      },
                      {
                        name: 'ar',
                        display: 'Arabic',
                      },
                    ],
                    validations: [
                      {
                        name: 'required',
                        validator: 'Y',
                        message: 'Preferred language is mandatory',
                      },
                      {
                        name: 'pattern',
                        validator: '^[a-zA-Z0-9:/.-]*$',
                        message: 'Invalid Data',
                      },
                    ],
                    values: '',
                  },
                  {
                    label: 'Gender',
                    type: 'input',
                    inputType: 'radio',
                    apiGroup: 'userInformation',
                    apiGroupType: '',
                    apiSection: 'basicInformation',
                    apiSectionType: '',
                    isEditable: 'Y',
                    show: 'Y',
                    informationIcon: 'Y',
                    IsVerificationRequired: 'N',
                    verificationEndPoint: '<End Point URL>',
                    bulk_label: 'Gender Information',
                    id: 'genderInfo',
                    name: 'genderInfo',
                    data: [
                      {
                        name: 'GEN_MAL',
                        display: 'Male',
                      },
                      {
                        name: 'GEN_FEM',
                        display: 'Female',
                      },
                      {
                        name: 'GEN_OTH',
                        display: 'Others',
                      },
                    ],
                    validations: [
                      {
                        name: 'required',
                        validator: 'Y',
                        message: 'Gender is mandatory',
                      },
                      {
                        name: 'pattern',
                        validator: '^[a-zA-Z0-9:/.-]*$',
                        message: 'Invalid Data',
                      },
                    ],
                    values: '',
                  },
                  {
                    label: 'Profile Photo URI',
                    type: 'input',
                    inputType: 'text',
                    apiGroup: 'userInformation',
                    apiGroupType: '',
                    apiSection: 'basicInformation',
                    apiSectionType: '',
                    isEditable: 'Y',
                    show: 'Y',
                    informationIcon: 'Y',
                    IsVerificationRequired: 'Y',
                    verificationEndPoint: '<End Point URL>',
                    bulk_label: 'Uploaded Profile Photo Document Id',
                    id: 'profilePhotoURI',
                    name: 'profilePhotoURI',
                    validations: [
                      {
                        name: 'required',
                        validator: 'N',
                        message: 'Profile Picture',
                      },
                      {
                        name: 'pattern',
                        validator: '^[a-zA-Z0-9:/.-]*$',
                        message: 'Profile Photo URI is invalid',
                      },
                    ],
                    values: '',
                  },
                  {
                    label: 'CIF',
                    type: 'input',
                    inputType: 'text',
                    apiGroup: 'userInformation',
                    apiGroupType: '',
                    apiSection: 'basicInformation',
                    apiSectionType: '',
                    isEditable: 'Y',
                    isUnique: 'Y',
                    show: 'Y',
                    informationIcon: 'Y',
                    IsVerificationRequired: 'N',
                    verificationEndPoint: '<End Point URL>',
                    bulk_label: 'Customer Information File',
                    id: 'cif',
                    name: 'cif',
                    validations: [
                      {
                        name: 'required',
                        validator: 'N',
                        message: 'Gender is mandatory',
                      },
                      {
                        name: 'pattern',
                        validator: '^[a-zA-Z0-9]*$',
                        message: 'Only alphabets and digits are allowed',
                      },
                    ],
                    values: '',
                  },
                  {
                    label: 'Date Of Birth',
                    show: 'Y',
                    type: 'input',
                    inputType: 'date',
                    allowedValuesPattern: 'YYYY-MM-DD',
                    apiGroup: 'userInformation',
                    apiGroupType: '',
                    apiSection: 'basicInformation',
                    apiSectionType: '',
                    isEditable: 'Y',
                    informationIcon: 'Y',
                    IsVerificationRequired: 'N',
                    verificationEndPoint: '<End Point URL>',
                    maxDate: 'CURRENT_DATE',
                    dateRangeError: 'Future Dates are not allowed',
                    bulk_label: 'Date of Birth',
                    id: 'dateOfBirth',
                    name: 'dateOfBirth',
                    validations: [
                      {
                        name: 'required',
                        validator: 'Y',
                        message: 'DOB is mandatory',
                      },
                      {
                        name: 'pattern',
                        validator: '^[a-zA-Z0-9:/.-]*$',
                        message: 'Profile Photo URI is invalid',
                      },
                    ],
                    values: '',
                  },
                ],
              },
            ],
          },
          {
            label: 'Address Information',
            name: 'addressInformation',
            show: 'Y',
            fields: [
              {
                label: 'Address Line 1',
                type: 'input',
                inputType: 'text',
                apiGroup: 'userInformation',
                apiGroupType: '',
                apiSection: 'basicInformation',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'Address Line 1',
                id: 'address1',
                name: 'address1',
                validations: [
                  {
                    name: 'required',
                    validator: 'required',
                    message: 'Address 1 is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z0-9 -]*$',
                    message: 'Only alphanumeric, space and hyphen allowed',
                  },
                ],
                values: '',
              },
              {
                label: 'Address Line 2 ',
                type: 'input',
                inputType: 'text',
                apiGroup: 'userInformation',
                apiGroupType: '',
                apiSection: 'basicInformation',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'Address Line 2',
                id: 'address2',
                name: 'address2',
                validations: [
                  {
                    name: 'required',
                    validator: 'N',
                    message: 'Address is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z0-9 -]*$',
                    message: 'Address Line 2  is invalid',
                  },
                ],
                values: '',
              },
              {
                label: 'Country',
                type: 'input',
                inputType: 'select',
                enumKey: 'COUNTRY_CODE',
                isFirstParent: 'Y',
                childName: 'state',
                apiGroup: 'userInformation',
                apiGroupType: '',
                apiSection: 'basicInformation',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'Y',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'Country Name',
                id: 'country',
                name: 'country',
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'Country is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z ]*$',
                    message: 'Invalid Country code',
                  },
                ],
                values: '',
              },
              {
                label: 'State',
                type: 'input',
                inputType: 'select',
                enumKey: 'STATE_CODE',
                isChild: 'Y',
                childName: 'city',
                apiGroup: 'userInformation',
                apiGroupType: '',
                apiSection: 'basicInformation',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'Y',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'State Name',
                id: 'state',
                name: 'state',
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'State is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z_ -]*$',
                    message: 'Invalid State code',
                  },
                ],
                values: '',
              },
              {
                label: 'City',
                type: 'input',
                inputType: 'select',
                enumKey: 'CITY_CODE',
                isChild: 'Y',
                apiGroup: 'userInformation',
                apiGroupType: '',
                apiSection: 'basicInformation',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'City Name',
                id: 'city',
                name: 'city',
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'City is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z_ -]*$',
                    message: 'Invalid City code',
                  },
                ],
                values: '',
              },
            ],
          },
        ],
      },
      {
        label: 'KYC',
        name: 'kycInformation',
        show: 'Y',
        sections: [
          {
            label: null,
            name: 'kycSection',
            fields: [
              {
                label: 'KYC Id Type',
                type: 'input',
                enumKey: 'PROOF_TYPE',
                isFirstParent: 'Y',
                childName: 'kycGracePeriod',
                apiGroup: 'kycs',
                apiGroupType: 'array',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'KYC Id Type',
                id: 'kycIdType',
                name: 'kycIdType',
                inputType: 'select',
                data: [
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
                ],
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'KYC Id type is mandatory',
                  },
                ],
                values: '',
              },
              {
                label: 'KYC Id Number',
                type: 'input',
                inputType: 'text',
                allowedValuesPattern: 'xxxxxxxxxxxxxx',
                apiGroup: 'kycs',
                apiGroupType: 'array',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'KYC Id Number',
                id: 'kycIdValue',
                name: 'kycIdValue',
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'KYC Id value is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z0-9]{10,14}$',
                    message:
                      'Only alphabets,digits are allowed and the length should between 10 to 14 characters',
                  },
                ],
                values: '',
              },
              {
                label: 'KYC Grace Period (Days)',
                type: 'input',
                inputType: 'select',
                isChild: 'Y',
                enumKey: 'GRACE_PERIOD',
                apiGroup: 'kycs',
                apiGroupType: 'array',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'KYC Grace Period (Days)',
                id: 'kycGracePeriod',
                name: 'kycGracePeriod',
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'Grace Period is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[0-9]*$',
                    message: 'only numeric values allowed',
                  },
                ],
                values: '',
              },
              {
                label: 'Country Issued In',
                type: 'input',
                inputType: 'select',
                apiGroup: 'kycs',
                apiGroupType: 'array',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'Y',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'Country Where KYC ID Issued',
                id: 'kycIdIssueCountry',
                name: 'kycIdIssueCountry',
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'Mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z]*$',
                    message: 'Country Issued In is invalid',
                  },
                ],
                values: '',
              },
              {
                label: 'Date Issued On',
                type: 'input',
                inputType: 'date',
                allowedValuesPattern: 'YYYY-MM-DD',
                apiGroup: 'kycs',
                apiGroupType: 'array',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                maxDate: 'CURRENT_DATE',
                dateRangeError: 'Future Dates are not allowed',
                bulk_label: 'KYC ID Issued On',
                id: 'kycIdIssueDate',
                name: 'kycIdIssueDate',
                values: '',
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'Mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z]*$',
                    message: 'Country Issued In is invalid',
                  },
                ],
              },
              {
                label: 'Valid From',
                type: 'input',
                inputType: 'date',
                allowedValuesPattern: 'YYYY-MM-DD',
                apiGroup: 'kycs',
                apiGroupType: 'array',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'KYC ID Valid From',
                id: 'kycIdValidFrom',
                name: 'kycIdValidFrom',
                values: '',
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'Mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z]*$',
                    message: 'Country Issued In is invalid',
                  },
                ],
              },
              {
                label: 'Valid Thru',
                type: 'input',
                inputType: 'date',
                allowedValuesPattern: 'YYYY-MM-DD',
                apiGroup: 'kycs',
                apiGroupType: 'array',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'KYC ID Valid Till',
                id: 'kycIdValidTo',
                name: 'kycIdValidTo',
                values: '',
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'Mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z]*$',
                    message: 'Country Issued In is invalid',
                  },
                ],
              },
              {
                label: 'Upload Documents',
                type: 'input',
                inputType: 'file',
                apiGroup: 'kycs',
                apiGroupType: 'array',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'Y',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'Uploaded KYC document IDs',
                id: 'kycImageUrl',
                name: 'kycImageUrl',
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'Mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z0-9:/.,$-]*$',
                    message: 'Upload Documents is invalid',
                  },
                ],
                values: '',
              },
              {
                label: 'Make this primary',
                type: 'input',
                inputType: 'switch',
                apiGroup: 'kycs',
                apiGroupType: 'array',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'N',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'Make this as Primary KYC',
                id: 'isPrimaryKYCId',
                name: 'isPrimaryKYCId',
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'Make this primary is required',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z]*$',
                    message: 'Only alphabet allowed',
                  },
                ],
                values: '',
              },
            ],
          },
        ],
      },
      {
        label: 'Profile',
        name: 'profileInformation',
        show: 'Y',
        sections: [
          {
            label: 'Profile Information',
            name: 'profileSection',
            show: 'Y',
            fields: [
              {
                label: 'Security',
                type: 'input',
                inputType: 'select',
                apiGroup: 'profileDetails',
                apiGroupType: '',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'Y',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'Security Profile',
                id: 'securityProfile',
                name: 'securityProfile',
                data: [
                  {
                    name: 'subscriber',
                    value: 'SUBSCRIBER',
                  },
                  {
                    name: 'agent',
                    value: 'AGENT',
                  },
                ],
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'Security profile is mandatory',
                  },
                ],
                values: '',
              },
              {
                label: 'Authorisation',
                type: 'input',
                inputType: 'select',
                apiGroup: 'profileDetails',
                apiGroupType: '',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'Y',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'Authorisation Profile',
                id: 'authProfile',
                name: 'authProfile',
                data: [
                  {
                    name: 'subscriber',
                    value: 'SUBSCRIBER',
                  },
                  {
                    name: 'agent',
                    value: 'AGENT',
                  },
                ],
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'Authorisation profile is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z0-9_-]*$',
                    message:
                      'Only alphanumeric , underscore and hyphen allowed',
                  },
                ],
                values: '',
              },
              {
                label: 'Regulatory',
                type: 'input',
                inputType: 'select',
                apiGroup: 'profileDetails',
                apiGroupType: '',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'Y',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'Regulatory Profile',
                id: 'regulatoryProfile',
                name: 'regulatoryProfile',
                data: [
                  {
                    name: 'subscriber',
                    value: 'SUBSCRIBER',
                  },
                  {
                    name: 'agent',
                    value: 'AGENT',
                  },
                ],
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'Regulatory mandatory is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z0-9_]*$',
                    message: 'Only alphanumeric , underscore are allowed',
                  },
                ],
                values: '',
              },
              {
                label: 'Marketing',
                type: 'input',
                inputType: 'select',
                apiGroup: 'profileDetails',
                apiGroupType: '',
                apiSection: '',
                apiSectionType: '',
                isEditable: 'Y',
                show: 'Y',
                informationIcon: 'Y',
                IsVerificationRequired: 'Y',
                verificationEndPoint: '<End Point URL>',
                bulk_label: 'Marketing Profile',
                id: 'marketingProfile',
                name: 'marketingProfile',
                data: [
                  {
                    name: 'subscriber',
                    value: 'SUBSCRIBER',
                  },
                  {
                    name: 'agent',
                    value: 'AGENT',
                  },
                ],
                validations: [
                  {
                    name: 'required',
                    validator: 'Y',
                    message: 'Marketing profile is mandatory',
                  },
                  {
                    name: 'pattern',
                    validator: '^[a-zA-Z0-9_]*$',
                    message: 'Only alphanumeric , underscore are allowed',
                  },
                ],
                values: '',
              },
            ],
          },
        ],
      },
    ];
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
          // this.showVerifyEmail = true;
        } else {
          this.showVerifyEmail = false;
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
        }
        //  else if (this.registerForm?.get('profilePhotoURI')?.errors?.pattern) {
        //   this.hasProfilePhotoURIError = true;
        //   this.profilePhotoURIError += 'Profile Photo URI is invalid';
        // }
        else {
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
      // this.getCategoryProfile();
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
    console.log('Uploading file', this.registerForm.value.profilePhotoURI);
    console.log(this.registerForm.value);

    this.registerService
      .uploadFile(this.registerForm.value.profilePhotoURI)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === 'SUCCEEDED') {
          this.uploadedFileUrl = res.url;
        }
      });
  }

  fileUrlChange(event: any) {
    if (event.target.files.length > 0) {
      console.log(event.target.files);
      this.fileUrl = event.target.files[0];
      this.registerForm.value.profilePhotoURI = this.fileUrl;
      this.registerService.uploadFile(this.fileUrl).subscribe((res: any) => {
        console.log(res);
        if (res.status === 'SUCCEEDED') {
          this.uploadedFileUrl = res.url;
        }
      });
    }
  }

  onOtpChange(otp: any) {
    this.otp = otp;
  }

  checkUnique() {
    if (this.registerForm.value.emailId.length > 0) {
      this.isLoading = true;
      this.registerService
        .checkUnique(this.registerForm.value.emailId)
        .subscribe((res: any) => {
          this.isLoading = false;
          console.log(res);
          if (res.status === 'FAILED') {
            this.email = '';
            this.hasEmailIdError = true;
            this.emailIdError = 'Email already exists';
          }
          if (res.status === 'SUCCEEDED') {
            this.email = this.registerForm.value.emailId;
            this.isEmailVerified = true;
            this.hasEmailIdError = false;
            this.emailIdError = '';
          }
        });
    } else {
      this.email = '';
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
