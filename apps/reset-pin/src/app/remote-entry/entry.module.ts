import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { AppComponent } from '../app.component';
import { SharedModule } from '@mobiquity/shared';
import { ResetService } from './reset.service';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [RemoteEntryComponent, ResetComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ResetComponent,
      },
    ]),
  ],
  providers: [
    ResetService
  ],
})
export class RemoteEntryModule {}
