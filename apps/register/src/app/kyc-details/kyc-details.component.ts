import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@mobiquity/shared';

@Component({
  selector: 'mobiquity-kyc-details',
  templateUrl: './kyc-details.component.html',
  styleUrls: ['./kyc-details.component.css'],
})
export class KycDetailsComponent implements OnInit {
  translation: any;

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.get().subscribe((data: any) => {
      this.translation = data.register;
    });
  }
}
