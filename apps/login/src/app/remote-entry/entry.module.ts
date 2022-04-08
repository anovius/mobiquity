import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { AppComponent } from '../app.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home/home.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { SharedModule } from '@mobiquity/shared';
import { LoginService } from './login.service';

@NgModule({
  declarations: [RemoteEntryComponent, LoginComponent, HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
  providers: [
    LoginService
  ],
})
export class RemoteEntryModule {}
