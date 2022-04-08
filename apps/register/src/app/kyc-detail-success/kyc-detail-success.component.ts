import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@mobiquity/shared';

@Component({
  selector: 'mobiquity-kyc-detail-success',
  templateUrl: './kyc-detail-success.component.html',
  styleUrls: ['./kyc-detail-success.component.css'],
})
export class KycDetailSuccessComponent implements OnInit {
  translation: any;

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.get().subscribe((data: any) => {
      this.translation = data.register;
    });
  }
}
