import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '@mobiquity/shared';

@Component({
  selector: 'mobiquity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'otp';
  translation: any;

  constructor(
    private router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.translationService.get().subscribe((data: any) => {
      this.translation = data.otp;
    });
  }

  goBack() {
    this.router.navigate(['..']);
  }
}
