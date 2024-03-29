import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslationService } from './services/translation.service';
import { ApiService } from './services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { SuccessPopComponent } from './components/success-pop/success-pop.component';
import { ErrorPopComponent } from './components/error-pop/error-pop.component';
import { HttpTokenInterceptor } from './intercepter';
import { UserService } from './services/user.service';
@NgModule({
  imports: [CommonModule, HttpClientModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    HttpClient,
    TranslationService,
    UserService,
    ApiService,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NumberOnlyDirective,
    SuccessPopComponent,
  ],
  declarations: [
    NumberOnlyDirective,
    SuccessPopComponent,
    ErrorPopComponent
  ]
  })
export class SharedModule {}
