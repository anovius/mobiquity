import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { AppComponent } from '../app.component';
import { SharedModule } from '@mobiquity/shared';
import { OtpService } from '../otp.service';
import { NgOtpInputModule } from  'ng-otp-input';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgOtpInputModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppComponent,
      },
    ]),
  ],
  providers: [
    OtpService
  ],
})
export class RemoteEntryModule {}
