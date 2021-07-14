import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { IAddMenu } from 'src/app/interfaces';
import { MediaService, MenuService } from 'src/app/services';
import { ChooseMenuComponent } from '../choose-menu/choose-menu.component';

@Component({
  selector: 'ss-form-menu',
  templateUrl: './form-menu.component.html',
  styleUrls: ['./form-menu.component.scss']
})
export class FormMenuComponent implements OnInit {

  imageFile: File;
  selectedMenu: TreeNode;
  menu: IAddMenu = {};
  disableChooseButton: boolean;
  saving: boolean;
  menuId: any;
  submitted: boolean;
  isRoot: boolean;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  displayGallery: boolean;
  images: any[] = [];

  constructor(
    private dialogService: DialogService,
    private sMenu: MenuService,
    private sMsg: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private sMedia: MediaService) { }

  ngOnInit(): void {
    this.disableChooseButton = false;
    this.route.params.subscribe(prms => {
      if (prms.id > 0) {
        this.menuId = Number.parseInt(prms.id, 0);
        this.getMenu(prms.id);
      }
    });
  }

  getMenu(menuId: number): void {
    this.sMenu.getMenu(menuId).subscribe(menu => {
      this.menu = menu;
      this.isRoot = (this.menu.parentId ? false : true);
      this.images.push({ url: `http://beta-api.gozarino.com/v1/web/media/${this.menu.iconMediaId}` });
      this.disableChooseButton = this.isRoot;
      if (this.menu.parentId) {
        this.sMenu.getMenu(this.menu.parentId).subscribe(me => {
          this.selectedMenu = { label: me.title, data: me.menuId };
        });
      }
    });
  }

  setImage(files: any): void {
    if (files.length === 0) {
      return;
    }
    this.imageFile = (files[0] as File);
  }

  setAsRoot(e: any): void {
    if (e.checked) {
      this.disableChooseButton = true;
      this.selectedMenu = null;
      this.menu.parentId = null;
    } else {
      this.disableChooseButton = false;
    }
  }

  showMenus(): void {
    const ref = this.dialogService.open(ChooseMenuComponent, {
      header: 'انتخاب دسته یا زیردسته',
      width: '70%'
    });
    ref.onClose.subscribe((menu: TreeNode) => {
      if (menu) {
        this.selectedMenu = menu;
        this.menu.parentId = this.selectedMenu.data;
      }
    });
  }

  async submit(): Promise<void> {
    if (this.menu.title && this.menu.link && this.imageFile) {
      this.saving = true;
      let image: any;

      if (!this.menu.iconMediaId && !this.menuId) {
        const imageFormData = new FormData();
        imageFormData.append('file', this.imageFile, this.imageFile.name);
        image = await this.sMedia.upload(imageFormData, 0).toPromise();
        this.menu.iconMediaId = image.mediaId;
      }

      if (this.menuId) {
        this.sMenu.editMenu(this.menuId, this.menu).subscribe(() => {
          this.sMsg.add({ severity: 'success', summary: 'ویرایش منو', detail: 'عملیات با موفقیت انجام شد' });
          this.saving = false;
          this.router.navigate(['./panel/menu/list']);
        }, () => {
          this.saving = false;
        });
      } else {
        this.sMenu.addMenu(this.menu).subscribe(() => {
          this.sMsg.add({ severity: 'success', summary: 'ثبت منو', detail: 'عملیات با موفقیت انجام شد' });
          this.saving = false;
          this.router.navigate(['./panel/menu/list']);
        }, () => {
          this.saving = false;
        });
      }
    }
    if (!this.imageFile) {
      this.sMsg.add({ severity: 'warn', detail: 'لطفا تصویر را انتخاب نمایید', summary: 'توجه' });
    }
    this.submitted = true;
  }

}
