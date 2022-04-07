import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mobiquity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'otp';

  constructor(private router: Router) {}

  goBack(){
    this.router.navigate([".."]);
  }
}
