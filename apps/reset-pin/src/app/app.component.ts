import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '@mobiquity/shared';

@Component({
  selector: 'mobiquity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'reset-pin';

  constructor(
    private router: Router,
    private location: Location,
    private translationService: TranslationService
  ) {}

  translation: any;

  ngOnInit() {
    this.translationService.get().subscribe((data: any) => {
      this.translation = data.resetPin;
    });
  }

  goBack() {
    window.history.back();
  }
}
