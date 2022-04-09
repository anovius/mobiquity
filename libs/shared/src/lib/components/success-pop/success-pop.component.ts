import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mobiquity-success-pop',
  templateUrl: './success-pop.component.html',
  styleUrls: ['./success-pop.component.css']
})
export class SuccessPopComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @Input() message!: string;
  @Input() path!: string;
  @Input() buttonText!: string;

  ngOnInit(): void {
  }

  navigate(){
    this.router.navigate([this.path]);
  }

}
