import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { AppComponent } from '../app.component';
import { AddressComponent } from '../address/address.component';
import { KycDetailsComponent } from '../kyc-details/kyc-details.component';
import { KycDetailSuccessComponent } from '../kyc-detail-success/kyc-detail-success.component';
import { SetPinComponent } from '../set-pin/set-pin.component';
import { LayoutComponent } from '../layout/layout.component';
import { RegisterService } from '../register.service';
import { SharedModule } from '@mobiquity/shared';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgOtpInputModule,
    NgSelectModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '',
            component: AppComponent,
          },
          {
            path: 'address',
            component: AddressComponent,
          },
          {
            path: 'kyc-details',
            component: KycDetailsComponent,
          },
          {
            path: 'kyc-details-success',
            component: KycDetailSuccessComponent,
          },
          {
            path: 'set-pin',
            component: SetPinComponent,
          },
        ],
      },
    ]),
  ],
  providers: [RegisterService],
})
export class RemoteEntryModule {}
