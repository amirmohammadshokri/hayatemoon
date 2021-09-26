import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { IMenuRole } from 'src/app/interfaces';
import { CompanyService, DataService, MenuService } from 'src/app/services';

@Component({
  selector: 'ss-menu-role-access',
  templateUrl: './menu-role-access.component.html',
  styleUrls: ['./menu-role-access.component.scss']
})
export class MenuRoleAccessComponent implements OnInit {

  companyTypes: SelectItem[];
  menus: IMenuRole[] = [];
  saving: boolean;
  companyType: number;

  constructor(
    private srvCo: CompanyService,
    private srvData: DataService,
    private srvMsg: MessageService,
    private srvMenu: MenuService) { }

  ngOnInit(): void {
    this.getCompanyType();
  }

  getCompanyType(): void {
    this.srvCo.getCompanyTypes().subscribe(res => {
      this.companyTypes = res.map(t => ({ label: t.title, value: t.id }));
    });
  }

  getData() {
    this.menus = [];
    this.srvData.showMainProgressBarForMe();
    this.srvMenu.getMenuRoles(this.companyType).subscribe((res: IMenuRole[]) => {
      this.srvData.thanksMainProgressBar();
      this.menus = res;
    });
  }

  setChild(node: IMenuRole) {
    console.log(node);
    
    if (node.parent.isSelected) {
      node.childs.forEach(child => {
        child.isSelected = true;
      });
    } else {
      node.childs.forEach(child => {
        child.isSelected = false;
      });
    }
  }

  save() {
    this.saving = true
    const keys: number[] = [];
    for (const menu of this.menus.filter(m => m.parent.isSelected)) {
      keys.push(+menu.parent.menuRoleId)
      for (const child of menu.childs.filter(c => c.isSelected)) {
        keys.push(+child.menuRoleId)
      }
    }
    const obj = {
      companyType: this.companyType,
      menuRoleIds: keys
    }
    this.srvMenu.setCompanyMenuRole(obj).subscribe(() => {
      this.saving = false
      this.srvMsg.add({ severity: 'success', summary: 'ثبت دسترسی', detail: 'عملیات با موفقیت انجام شد' })
    }, () => {
      this.saving = false
    })
  }

}
