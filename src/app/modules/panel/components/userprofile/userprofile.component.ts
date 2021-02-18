import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IUserUpdate } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sc-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  user: IUserUpdate = {};
  userId: number;

  constructor(private sAuth: AuthService, private sMsg: MessageService) { }

  ngOnInit(): void {
    this.sAuth.getUserInfo().subscribe(res => {
      this.user = {
        address: res.address,
        email: res.email,
        name: res.name,
        family: res.family
      };
      this.userId = res.id;
    });
  }

  onSubmit(): void {
    this.sAuth.updateUser(this.userId, this.user).subscribe(res => {
      this.sMsg.add({ severity: 'success', summary: 'Successful', detail: 'Your profile updated.' });
    });
  }

}
