import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@mobiquity/shared';

@Component({
  selector: 'mobiquity-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  translation: any;

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.get().subscribe((data: any) => {
      this.translation = data.forgotPin;
    });
  }
}
