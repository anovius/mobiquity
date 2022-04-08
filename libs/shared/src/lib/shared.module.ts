import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslationService } from './services/translation.service';
import { ApiService } from './services/api.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    HttpClient,
    TranslationService,
    ApiService
  ]
  })
export class SharedModule {}
