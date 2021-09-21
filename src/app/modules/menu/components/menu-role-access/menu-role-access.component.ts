import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private cdt: ChangeDetectorRef,
    private srvMenu: MenuService) { }

  ngOnInit(): void {
    this.getCompanyType();
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  getCompanyType(): void {
    this.srvCo.getCompanyTypes().subscribe(res => {
      this.companyTypes = res.map(t => ({ label: t.title, value: t.id }));
    });
  }

  getData() {
    this.menus = [];
    this.selectedMenus = [];
    this.srvData.showMainProgressBarForMe();
    this.srvMenu.getMenuRoles(this.companyType).subscribe((res: IMenuRole[]) => {
      this.srvData.thanksMainProgressBar();
      res.forEach(mainMenu => {
        let parent: TreeNode = {
          label: mainMenu.parent.title,
          icon: mainMenu.parent.iconMediaId,
          data: mainMenu.parent,
          key: mainMenu.parent.menuRoleId.toString(),
          children: mainMenu.childs.map(c => ({
            label: c.title,
            icon: c.iconMediaId,
            data: c,
            key: c.menuRoleId.toString()
          }))
        };
        this.menus.push(parent);

        if (mainMenu.childs.filter(c => c.isSelected).length > 0) {
          parent = {
            label: mainMenu.parent.title,
            icon: mainMenu.parent.iconMediaId,
            data: mainMenu.parent,
            key: mainMenu.parent.menuRoleId.toString(),
            children: mainMenu.childs.filter(c => c.isSelected).map(c => ({
              label: c.title,
              icon: c.iconMediaId,
              data: c,
              key: c.menuRoleId.toString()
            }))
          };
          this.selectedMenus = [...this.selectedMenus, parent];
        }
      });

      // this.menus.forEach(node => {
      //   this.expandRecursive(node, true);
      // });

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
