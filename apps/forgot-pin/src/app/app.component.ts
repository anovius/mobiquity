import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@mobiquity/shared';

@Component({
  selector: 'mobiquity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'forgot-pin';

  constructor(private translationService: TranslationService) {}

  translation: any;

  ngOnInit() {
    this.translationService.get().subscribe((data: any) => {
      this.translation = data.forgotPin;
    });
  }

  goBack() {
    window.history.back();
  }
}
