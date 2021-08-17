import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { IPromotion } from 'src/app/interfaces/promotion.interface';
import { DataService, PromotionService } from 'src/app/services';

@Component({
  selector: 'ss-form-promotion',
  templateUrl: './form-promotion.component.html',
  styleUrls: ['./form-promotion.component.scss']
})
export class FormPromotionComponent implements OnInit {

  saving: boolean;
  promotions: IPromotion={};
  promotionId: number;
  submitted: boolean;
  states: SelectItem[];

  constructor(
    private srvData: DataService,
    private srvPromotion: PromotionService,
    private srvMsg: MessageService,
    private aRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe(prms => {
      if (prms.id > 0) {
        this.promotionId = Number.parseInt(prms.id, 0);
        this.getPromotion();
      }
    });

    this.states = [
      { value: 0, label: 'فعال' },
      { value: 1, label: 'غیر فعال' },
      { value: 2, label: 'در حالت انتظار' }
    ]
  }

  getPromotion(): void {
    this.srvData.showMainProgressBarForMe();
    this.srvPromotion.getpromotionById(this.promotionId).subscribe(res => {
      this.promotions = {
        title:res.title,
        price:res.priceو
   
      };
      this.srvData.thanksMainProgressBar();
    });
  }

  submit(): void {
    if (this.promotions.title && this.promotions.price) {
      this.saving = true;
      if(this.promotionId>0)
      {
        this.srvPromotion.editpromotion(this.promotionId,this.promotions).subscribe(() => {
          this.srvMsg.add({ severity: 'success', summary: 'ویرایش پروموشن', detail: 'عملیات با موفقیت انجام شد' });
          this.saving = false;
          this.router.navigate(['./panel/promotion/promotions']);
        }, () => {
          this.saving = false;
        });
      }
        
        else {
          this.srvPromotion.addpromotion(this.promotions).subscribe(() => {
            this.srvMsg.add({ severity: 'success', summary: 'ثبت پروموشن', detail: 'عملیات با موفقیت انجام شد' });
            this.saving = false;
            this.router.navigate(['./panel/promotion/promotions']);
          }, () => {
            this.saving = false;
          });
        }}
     this.submitted = true;
    }
    
  }


