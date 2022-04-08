import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@mobiquity/shared';

@Component({
  selector: 'mobiquity-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  translation: any;

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.get().subscribe((data: any) => {
      this.translation = data.login;
    });
  }

  goBack() {
    window.history.back();
  }
}
