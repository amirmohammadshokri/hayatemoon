import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sc-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent implements OnInit {

  @Output() login = new EventEmitter<boolean>();
  @Output() resetf = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  showLogin(): void {
    this.login.emit();
  }

  showReset(): void {
    this.resetf.emit();
  }

}
