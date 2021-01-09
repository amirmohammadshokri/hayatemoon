import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() active: boolean;
  @Output() changeState = new EventEmitter<boolean>();
  @Output() forgetPass = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  btnClicked(): void {
    this.changeState.emit(true);
  }

  forgetPassClicked(): void {
    this.forgetPass.emit(true);
  }

}
