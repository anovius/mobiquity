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

  schema: any = [];

  countryOptions = [];

  stateOptions = [
    {
      value: 'Karnataka',
      key: 'Karnataka',
    },
    {
      value: 'Andhra pradesh',
      key: 'Andhra pradesh',
    },
    {
      value: 'Kerala',
      key: 'Kerala',
    },
    {
      value: 'Maharashtra',
      key: 'Maharashtra',
    },
  ];

  cityOptions = [
    {
      value: 'Mumbai',
      key: 'Mumbai',
    },
    {
      value: 'Bangalore',
      key: 'Bangalore',
    },
    {
      value: 'Chennai',
      key: 'Chennai',
    },
    {
      value: 'Pune',
      key: 'Pune',
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
    this.getCountries();
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

  getCountries() {
    this.registerService.getCountries().subscribe(
      (res: any) => {
        this.countryOptions = res.countryList;
      },
      (err: any) => {
        console.log(err);
      }
    );
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
