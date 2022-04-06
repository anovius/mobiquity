import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { AppComponent } from '../app.component';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [RemoteEntryComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
