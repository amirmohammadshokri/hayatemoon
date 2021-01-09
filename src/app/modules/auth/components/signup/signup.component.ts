import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @Input() active: boolean;
  @Output() changeState = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  btnClicked(): void {
    this.changeState.emit(false);
  }

}
