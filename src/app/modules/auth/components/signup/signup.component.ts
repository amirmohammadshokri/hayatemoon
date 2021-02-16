import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IRegister } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  @Input() active: boolean;
  @Output() changeState = new EventEmitter<boolean>();
  user: IRegister = {};
  repeatedPassword: string;
  registered: boolean;

  constructor(
    private sAuth: AuthService,
    private sMsg: MessageService) { }

  btnClicked(): void {
    this.changeState.emit(false);
  }

  btnLogin(): void {
    this.changeState.emit(true);
  }

  register(): void {
    this.registered = true;
    this.sAuth.register(this.user).subscribe(res => {
      this.sMsg.add({ severity: 'success', summary: 'Successful', detail: 'Please check your email' });
      this.registered = false;
    }, err => {
      err[0].messages.forEach(msg => {
        this.sMsg.add({ severity: 'warn', summary: 'warning', detail: msg.message });
      });
      this.registered = false;
    });
  }

}
