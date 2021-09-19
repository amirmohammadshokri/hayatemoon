import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, TreeNode } from 'primeng/api';
import { IMenu, IMenuRole } from 'src/app/interfaces';
import { DataService, MenuService } from 'src/app/services';

@Component({
  selector: 'ss-menu-roles',
  templateUrl: './menu-roles.component.html',
  styleUrls: ['./menu-roles.component.scss']
})
export class MenuRolesComponent implements OnInit {

  menus: TreeNode[] = [];
  selectedMenu: TreeNode;
  contextItems: MenuItem[] = [];
  display: boolean;
  dialogMenu: IMenu = {};

  constructor(
    private srvMenu: MenuService,
    private srvData: DataService,
    private srvConfirmation: ConfirmationService) { }

  ngOnInit(): void {
    this.contextItems = [
      {
        label: 'جدید',
        icon: 'pi pi-plus',
        command: () => {
          if (this.selectedMenu.children) {
            this.dialogMenu = {};
            this.display = true;
          }
        }
      }, {
        label: 'ویرایش',
        icon: 'pi pi-pencil',
        command: () => {
          this.dialogMenu = {
            title: this.selectedMenu.data.title,
            code: this.selectedMenu.data.code,
            url: this.selectedMenu.data.url
          }
          this.display = true;
        }
      }, {
        label: 'حذف',
        icon: 'pi pi-trash',
        command: () => {
          this.confirmDelete()
        }
      }
    ];
    this.srvData.showMainProgressBarForMe()
    this.srvMenu.getMenuRoles().subscribe((res: IMenuRole[]) => {
      this.srvData.thanksMainProgressBar()
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
            key: c.menuRoleId.toString(),
          }))
        }
        this.menus.push(parent);
      });
    })
  }

  confirmDelete(): void {
    this.srvConfirmation.confirm({
      message: 'آیا از حذف این ردیف اطمینان دارید؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'نه',
      accept: () => {
        console.log(this.removeItem(this.selectedMenu.key, { children: this.menus }));

      }
    });
  }

  removeItem(id, tree: TreeNode) {
    if (tree.key === id) {
      let path = [tree.label];
      return { result: tree, path };
    } else {
      for (let child of tree.children) {
        let tmp = this.removeItem(id, child);
        if (!!tmp) {
          tmp.path.unshift(tree.label);
          return tmp;
        }
      }
      return {};
    }
  }

  addMenu() {
    if (this.selectedMenu.children) {

    }
  }

}
