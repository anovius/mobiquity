import { Component, OnInit } from '@angular/core';
import { UserService } from '@mobiquity/shared';

@Component({
  selector: 'mobiquity-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) { }

  isLoggedIn: any;

  ngOnInit(): void {
    this.isLoggedIn = window.localStorage.getItem('isLoggedIn');
  }

  logout(){
    window.localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
  }

}
