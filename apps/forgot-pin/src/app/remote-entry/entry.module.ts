import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { AppComponent } from '../app.component';
import { ForgotPinService } from './forgot-pin.service';
import { SharedModule } from '@mobiquity/shared';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppComponent,
      },
    ]),
  ],
  providers: [
    ForgotPinService
  ],
})
export class RemoteEntryModule {}
