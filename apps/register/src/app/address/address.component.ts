import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@mobiquity/shared';

@Component({
  selector: 'mobiquity-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  translation: any;

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.get().subscribe((data: any) => {
      this.translation = data.register;
    });
  }
}
