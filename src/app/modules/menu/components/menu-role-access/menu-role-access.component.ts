import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem, TreeNode } from 'primeng/api';
import { IMenuRole } from 'src/app/interfaces';
import { CompanyService, DataService, MenuService } from 'src/app/services';

@Component({
  selector: 'ss-menu-role-access',
  templateUrl: './menu-role-access.component.html',
  styleUrls: ['./menu-role-access.component.scss']
})
export class MenuRoleAccessComponent implements OnInit {

  companyTypes: SelectItem[];
  menus: TreeNode[] = [];
  selectedMenus: TreeNode[] = [];
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
    this.srvMenu.getMenuRoles().subscribe((res: IMenuRole[]) => {
      this.srvData.thanksMainProgressBar();
      res.forEach(mainMenu => {
        let parent: TreeNode = {
          label: mainMenu.parent.title,
          icon: mainMenu.parent.icon,
          data: mainMenu.parent,
          key: mainMenu.parent.menuRoleId.toString(),
          children: mainMenu.childs.map(c => ({
            label: c.title,
            icon: c.icon,
            data: c,
            key: c.menuRoleId.toString()
          }))
        };
        this.menus.push(parent);
      });
    });
  }

  save() {
    const keys: number[] = [];
    for (const menu of this.selectedMenus) {
      keys.push(+menu.key)
      if (menu.parent && keys.indexOf(+menu.parent.key) == -1) {
        keys.push(+menu.parent.key)
      }
    }
    this.saving = true
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
