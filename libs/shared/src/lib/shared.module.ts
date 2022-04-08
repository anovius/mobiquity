import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslationService } from './services/translation.service';
import { ApiService } from './services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberOnlyDirective } from './directives/number-only.directive';
@NgModule({
  imports: [CommonModule, HttpClientModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [
    HttpClient,
    TranslationService,
    ApiService,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NumberOnlyDirective,
  ],
  declarations: [
    NumberOnlyDirective
  ]
  })
export class SharedModule {}
