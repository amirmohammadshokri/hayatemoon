import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IRegister } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @Input() active: boolean;
  @Output() changeState = new EventEmitter<boolean>();
  user: IRegister = {};
  repeatedPassword: string;
  registered: boolean;

  constructor(
    private sAuth: AuthService,
    private router: Router,
    private sMsg: MessageService) { }

  ngOnInit(): void {
  }

  btnClicked(): void {
    this.changeState.emit(false);
  }

  register(): void {
    this.registered = true;
    this.sAuth.register(this.user).subscribe(res => {
      this.sAuth.setCookie('jwt', res.jwt, 7);
      this.router.navigate(['./panel']);
    }, err => {
      err[0].messages.forEach(msg => {
        this.sMsg.add({ severity: 'warn', summary: 'warning', detail: msg.message });
      });
      this.registered = false;
    });
  }

}
