import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IConversation } from 'src/app/interfaces';
import { MediaService, TicketingService } from 'src/app/services';

@Component({
  selector: 'ss-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  closing: boolean = false;
  conversations: IConversation[] = [];
  conversation: {
    id?: number,
    text?: string,
    attachmentMediaId?: number
  } = {};
  ticketId: number;
  att: any;
  saving: boolean;

  constructor(
    private srvTicket: TicketingService,
    private route: ActivatedRoute,
    private srvMsg: MessageService,
    private srvMedia: MediaService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(prms => {
      if (prms.ticketId > 0) {
        this.ticketId = Number.parseInt(prms.ticketId, 0);
        this.conversation.id = 0;
        this.getConversations();
      }
    });
  }

  getConversations(): void {
    this.srvTicket.conversations(this.ticketId).subscribe(prms => {
      this.conversations = prms;
    })
  }

  closeTicket(): void {
    this.closing = true;
    this.srvTicket.closeTicket(this.ticketId).subscribe(() => {
      this.closing = false;
      this.srvMsg.add({ severity: 'success', summary: 'ثبت اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
      this.router.navigate(['../panel/ticket/tickets']);
    })
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
        this.conversation.attachmentMediaId = res[key];
        resolve();
      }, () => {
        this.saving = false;
        reject();
      });
    });
  }

  addConversation() {
    this.saving = true;
    this.saveFile().then(() => {
      this.srvTicket.addConversation(this.ticketId, this.conversation).subscribe(res => {
        this.saving = false;
        this.srvMsg.add({ severity: 'success', summary: 'ثبت', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
        this.conversation = {};
        this.getConversations();
      })
    })
  }

}
