import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslationService } from './services/translation.service';
import { ApiService } from './services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  ]
  })
export class SharedModule {}
