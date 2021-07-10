import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddChanel } from 'src/app/interfaces';
import { ChanelService } from 'src/app/services';

@Component({
  selector: 'ss-form-chanel',
  templateUrl: './form-chanel.component.html',
  styleUrls: ['./form-chanel.component.scss']
})
export class FormChanelComponent implements OnInit {

  saving: boolean;
  chanel: IAddChanel = {};
  types: SelectItem[] = [
    { label: 'فعال', value: 0 }
  ];
  chanelId: number;

  constructor(
    private srvChnl: ChanelService,
    private srvMsg: MessageService,
    private router: Router,
    private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe(prms => {
      if (prms.id > 0) {
        this.chanelId = Number.parseInt(prms.id, 0);
        this.getChanel();
      }
    });
  }

  getChanel(): void {
    this.srvChnl.getChanel(this.chanelId).subscribe(res => {
      this.chanel = res;
      this.chanel.type = res.roleType.id;
    });
  }

  submit() {
    this.saving = true;
    if (this.chanelId > 0) {
      this.srvChnl.editChanel(this.chanelId, this.chanel).subscribe(() => {
        this.srvMsg.add({ severity: 'success', summary: 'ویرایش کانال', detail: 'عملیات با موفقیت انجام شد' });
        this.router.navigate(['./panel/chanel/chanels']);
      }, _ => {
        this.saving = false;
      });
    } else {
      this.srvChnl.addChanel(this.chanel).subscribe(() => {
        this.srvMsg.add({ severity: 'success', summary: 'ثبت کانال ', detail: 'عملیات با موفقیت انجام شد' });
        this.router.navigate(['./panel/chanel/chanels']);
      }, _ => {
        this.saving = false;
      });
    }
  }

}
