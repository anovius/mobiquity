import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'register',
          loadChildren: () =>
            import('register/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'login',
          loadChildren: () =>
            import('login/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'reset-pin',
          loadChildren: () =>
            import('reset-pin/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'otp',
          loadChildren: () =>
            import('otp/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'forgot-pin',
          loadChildren: () =>
            import('forgot-pin/Module').then((m) => m.RemoteEntryModule),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}