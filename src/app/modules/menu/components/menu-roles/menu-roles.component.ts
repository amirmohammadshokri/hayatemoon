import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService, TreeNode } from 'primeng/api';
import { IMenu, IMenuRole } from 'src/app/interfaces';
import { CommonServiece, DataService, MenuService } from 'src/app/services';

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
  saving: boolean;
  dialogMenu: IMenu = {};
  editMenuRole: boolean;
  icons: any;

  constructor(
    private srvMenu: MenuService,
    private srvMsg: MessageService,
    private srvData: DataService,
    private srvCom: CommonServiece,
    private srvConfirmation: ConfirmationService) { }

  ngOnInit(): void {
    this.contextItems = [
      {
        label: 'جدید',
        icon: 'pi pi-plus',
        command: () => {
          this.addMenu();
        }
      }, {
        label: 'ویرایش',
        icon: 'pi pi-pencil',
        command: () => {
          this.editMenu();
        }
      }, {
        label: 'حذف',
        icon: 'pi pi-trash',
        command: () => {
          this.confirmDelete()
        }
      }
    ];
    this.getData();

    this.getIcons();
  }


  private getIcons() {
    this.srvCom.getIcons().subscribe(icons => {
      this.icons = icons;
    });
  }

  private addMenu() {
    if (this.selectedMenu.children) {
      this.dialogMenu = {};
      this.display = true;
    }
  }

  private editMenu() {
    this.editMenuRole = true;
    this.dialogMenu = this.selectedMenu.data;
    this.display = true;
  }

  private getData() {
    this.srvData.showMainProgressBarForMe();
    this.srvMenu.getMenuRoles(-1).subscribe((res: IMenuRole[]) => {
      this.srvData.thanksMainProgressBar();
      res.forEach(mainMenu => {
        let parent: TreeNode = {
          label: mainMenu.parent.title,
          icon: mainMenu.parent.iconMediaId,
          data: mainMenu.parent,
          children: mainMenu.childs.map(c => ({
            label: c.title,
            icon: c.iconMediaId,
            data: c,
          }))
        };
        this.menus.push(parent);
      });
    });
  }

  confirmDelete(): void {
    this.srvConfirmation.confirm({
      message: 'آیا از حذف این ردیف اطمینان دارید؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'نه',
      accept: () => {
        const parent = this.findParent(null, { children: this.menus })
        const menuIndex = parent.children.indexOf(this.selectedMenu);
        parent.children.splice(menuIndex, 1);
      }
    });
  }

  findParent(parent: TreeNode, tree: TreeNode): TreeNode {
    if (tree == this.selectedMenu) {
      return parent;
    } else {
      for (let index = 0; index < tree.children?.length; index++) {
        const child = tree.children[index];
        let parent = this.findParent(tree, child);
        if (!!parent) {
          return parent;
        }
      }
    }
  }

  addToGrid() {
    this.display = false
    if (this.editMenuRole) {
      this.selectedMenu.label = this.dialogMenu.title;
      this.selectedMenu.icon = this.dialogMenu.iconMediaId;
    } else {
      if (this.selectedMenu) {
        this.selectedMenu.children.push({
          data: this.dialogMenu,
          label: this.dialogMenu.title,
          icon: this.dialogMenu.iconMediaId,
        })
      } else {
        this.menus.push({
          label: this.dialogMenu.title,
          data: this.dialogMenu,
          icon: this.dialogMenu.iconMediaId,
          children: []
        })
      }
    }
    this.editMenuRole = false;
  }

  addToRoot() {
    this.selectedMenu = null;
    this.dialogMenu = {};
    this.display = true;
  }

  save() {
    this.saving = true
    const obj = {
      menuRoles: this.menus.map(m => ({
        parent: {
          title: m.data.title,
          code: m.data.code,
          url: m.data.url,
          iconMediaId: m.data.iconMediaId
        },
        childs: m.children.map(c => ({
          title: c.data.title,
          code: c.data.code,
          url: c.data.url,
          iconMediaId: c.data.iconMediaId
        }))
      }))
    };
    this.srvMenu.setMenuRole(obj).subscribe(res => {
      this.saving = false
      this.srvMsg.add({ severity: 'success', summary: 'ثبت منو', detail: 'عملیات با موفقیت انجام شد' })
    }, () => {
      this.saving = false
    });
  }

}
