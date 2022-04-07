import { Component } from '@angular/core';

@Component({
  selector: 'mobiquity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'forgot-pin';

  goBack(){
    window.history.back();
  }
}
