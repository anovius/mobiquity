import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { AppComponent } from '../app.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home/home.component';
import { SimpleModalModule } from 'ngx-simple-modal';

@NgModule({
  declarations: [RemoteEntryComponent, LoginComponent, HomeComponent],
  imports: [
    CommonModule,
    SimpleModalModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
