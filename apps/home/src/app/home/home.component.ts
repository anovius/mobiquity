import { Component, OnInit } from '@angular/core';
import { PreloginService } from '../services/prelogin.service';
import { TranslationService } from '@mobiquity/shared';

@Component({
  selector: 'mobiquity-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private preLoginService: PreloginService,
    private translationService: TranslationService
  ) { }

  preLoginData: any;
  language: any;

  ngOnInit(): void {

    this.translationService.getLang().subscribe(lang => {
      this.language = lang;
      this.getPreLoginData();
    });
  }

  getPreLoginData(){
    this.preLoginService.getPreLoginData(this.language).subscribe(
      data => {
        this.preLoginData = data;
      }
    );
  }

}
