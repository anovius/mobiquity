import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mobiquity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'reset-pin';

  constructor(private router: Router, private location: Location) { }

  goBack(){
    window.history.back();
  }
}
