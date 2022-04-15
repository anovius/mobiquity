/*
 * This RemoteEntryModule is imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */
import { RemoteEntryModule } from './remote-entry/entry.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { KycDetailsComponent } from './kyc-details/kyc-details.component';
import { KycDetailSuccessComponent } from './kyc-detail-success/kyc-detail-success.component';
import { SetPinComponent } from './set-pin/set-pin.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '@mobiquity/shared';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    AddressComponent,
    KycDetailsComponent,
    KycDetailSuccessComponent,
    SetPinComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    NgOtpInputModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
