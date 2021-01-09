import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'sc-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  login: boolean;
  forgetPass: boolean;
  resetPass: boolean;

  constructor() {
    this.login = true;
  }

  ngOnInit(): void { }

  stateChanged(state: boolean): void {
    this.login = state;
  }

  showForgetPass(): void {
    this.forgetPass = true;
  }

}
