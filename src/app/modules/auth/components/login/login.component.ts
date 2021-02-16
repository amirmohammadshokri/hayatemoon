import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() active: boolean;
  @Output() changeState = new EventEmitter<boolean>();
  @Output() forgetPass = new EventEmitter<boolean>();
  user: ILogin = { identifier: '', password: '' };
  pressed: boolean;

  constructor(
    private router: Router,
    private sAuth: AuthService) { }

  ngOnInit(): void {
  }

  btnClicked(): void {
    this.changeState.emit(true);
  }

  btnSignup(): void {
    this.changeState.emit(false);
  }

  forgetPassClicked(): void {
    this.forgetPass.emit(true);
  }

  login(): void {
    this.pressed = true;
    this.sAuth.login(this.user).subscribe(res => {
      this.sAuth.setCookie('jwt', res.jwt, 7);
      this.router.navigate(['./landing']);
    }, () => {
      this.pressed = false;
    });
  }

}
