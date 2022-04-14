import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@mobiquity/shared';
import { RegisterService } from './register.service';

@Component({
  selector: 'mobiquity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'register';

  translation: any;

  constructor(private translationService: TranslationService, private registerService: RegisterService) {}

  ngOnInit() {
    this.translationService.get().subscribe((data: any) => {
      this.translation = data.register;
    });

    console.log(this.registerService.test());
  }
}
