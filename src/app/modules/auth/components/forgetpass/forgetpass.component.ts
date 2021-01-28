import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sc-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent implements OnInit {

  @Output() login = new EventEmitter<boolean>();
  @Output() resetf = new EventEmitter<boolean>();
  email: string;
  pressed: boolean;

  constructor(private sAuth: AuthService, private sMsg: MessageService) { }

  ngOnInit(): void {
  }

  showLogin(): void {
    this.login.emit();
  }

  sendEmail(): void {
    this.pressed = true;
    this.sAuth.forgotPassword(this.email).subscribe(res => {
      this.sMsg.add({ severity: 'success', summary: 'Successful', detail: 'Please check your email' });
      this.login.emit();
    }, err => {
      err[0].messages.forEach(msg => {
        this.sMsg.add({ severity: 'warn', summary: 'warning', detail: msg.message });
      });
      this.pressed = false;
    });
  }

}
