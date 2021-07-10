import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IChanelContent } from 'src/app/interfaces';
import { ChanelService, MediaService } from 'src/app/services';

@Component({
  selector: 'ss-chanel-contents',
  templateUrl: './chanel-contents.component.html',
  styleUrls: ['./chanel-contents.component.scss']
})
export class ChanelContentsComponent implements OnInit {

  cols: any[] = [];
  contents: IChanelContent[] = [];
  loading: boolean = false;
  content: {
    id?: number,
    text?: string,
    attachmentMediaId?: number
  } = {};
  chanelId: number;
  att: any;
  saving: boolean;
  nothingElse: any;
  currentPage: any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getContents(false);
    }
  }

  constructor(
    private srvChnl: ChanelService,
    private route: ActivatedRoute,
    private srvMsg: MessageService,
    private srvMedia: MediaService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(prms => {
      if (prms.chanelId > 0) {
        this.chanelId = Number.parseInt(prms.chanelId, 0);
        this.content.id = 0;
        this.getContents(true);
      }
    });
  }

  getContents(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.contents = [];
    }
    this.loading = true;
    this.srvChnl.getContents(this.chanelId, this.currentPage, 15).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.contents.push(...res);
      this.loading = false;
    });
  }

  addAttachment(e: any) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.att = { mediaId: null, url: event.target.result, file: e.target.files[0] };
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  saveFile(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.att || this.att.mediaId) {
        resolve();
      }
      const formData = new FormData();
      formData.append(`file`, this.att.file, this.att.file.name);
      this.srvMedia.upload(formData, 0).subscribe(res => {
        const key = 'mediaId';
        this.content.attachmentMediaId = res[key];
        resolve();
      }, () => {
        this.saving = false;
        reject();
      });
    });
  }

  addContent() {
    this.saving = true;
    this.saveFile().then(() => {
      this.srvChnl.addContent(this.chanelId, this.content).subscribe(res => {
        this.saving = false;
        this.srvMsg.add({ severity: 'success', summary: 'ثبت', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
        this.content = {};
        this.getContents(true);
      })
    })
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف این ردیف اطمینان دارید؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'نه',
      accept: () => {
        this.deletContent(id);
      }
    });
  }

  deletContent(id: number): void {
    this.srvChnl.deleteContent(id).subscribe(() => {
      this.getContents(true);
    });
  }

}
