import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddResidencefacilitieskind } from 'src/app/interfaces/add-residencefacilitieskind';
import { CommonServiece } from 'src/app/services/common.service';
import { ResidenceService } from 'src/app/services/residence.service';

@Component({
  selector: 'ss-form-residencefacilitieskind',
  templateUrl: './form-residencefacilitieskind.component.html',
  styleUrls: ['./form-residencefacilitieskind.component.scss']
})
export class FormResidencefacilitieskindComponent implements OnInit {


  residencefacilitieskind:IAddResidencefacilitieskind= {};
  icons:SelectItem[];
  residencefacilitieskindId:number;
  fontIconId:string;
  
    constructor(
      private srvResidence: ResidenceService,
      private sMsg: MessageService,
      private route: ActivatedRoute,
      private router: Router,
      private sComm:CommonServiece
     
    ) { }
  
    ngOnInit(): void {
      this.sComm.getIcons().subscribe(icons => {
        this.icons = icons;
      });
      this.route.params.subscribe(prms => {
        if (prms.id > 0) {
          console.log(Number.parseInt(prms.id, 0)+'Amiriiiiiiiii');
      
           this.residencefacilitieskindId = Number.parseInt(prms.id, 0);
           this.getResidencefacilitieskindById(this.residencefacilitieskindId);
        }
      });
    }
    getResidencefacilitieskindById(id: number): void {
      this.srvResidence.getResidencefacilitieskindById(id).subscribe(cou => {
        this.residencefacilitieskind = cou;
    });
  }
   
    submit(): void {
      if (this.residencefacilitieskind.id > 0) {
        const obj: IAddResidencefacilitieskind = {
          id:this.residencefacilitieskind.id,
           fontIconId:this.residencefacilitieskind.fontIconId,
           title:this.residencefacilitieskind.title
        };
        this.srvResidence.addResidencefacilitieskind(obj).subscribe(() => {
          this.sMsg.add({ severity: 'success', summary: 'ویرایش امکانات اقامتگاه', detail: 'عملیات با موفقیت انجام شد' });
          this.router.navigate(['./panel/residence/list-residencefacilitieskind']);
        });
      }
      else {
        this.residencefacilitieskind.id = 0;
        const obj1: IAddResidencefacilitieskind = {
          id:0,
          fontIconId:this.residencefacilitieskind.fontIconId,
          title:this.residencefacilitieskind.title
        };
        this.srvResidence.addResidencefacilitieskind(obj1).subscribe(() => {
          this.sMsg.add({ severity: 'success', summary: 'ثبت امکانات اقامتگاه ', detail: 'عملیات با موفقیت انجام شد' });
          this.router.navigate(['./panel/']);
        });
      }
    }
  
}
