import { Component, OnInit } from '@angular/core';
import { IAddRoom } from 'src/app/interfaces';

@Component({
  selector: 'ss-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.scss']
})
export class FormRoomComponent implements OnInit {

  rooms: IAddRoom[] = [{}];

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {

  }

  addRoom(): void {
    this.rooms.push({});
  }

}
