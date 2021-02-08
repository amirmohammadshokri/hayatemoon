import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sc-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  login: boolean;
  forgetPass: boolean;

  constructor(private sAuth: AuthService) {
    this.login = false;
  }

  ngOnInit(): void {
    this.sAuth.logout();
  }

  stateChanged(state: boolean): void {
    this.login = state;
  }

  showForgetPass(): void {
    this.forgetPass = true;
  }
}
