import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuService } from 'src/app/services/menu.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'ss-choose-menu',
  templateUrl: './choose-menu.component.html',
  styleUrls: ['./choose-menu.component.scss']
})
export class ChooseMenuComponent implements OnInit {

  menus: TreeNode[] = [];
  selectedMenu: TreeNode = {};
  loading: boolean;

  constructor(
    private srvMenu: MenuService,
    private srvSrch: SearchService,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.getMenus();
  }

  nodeExpand(event): void {
    this.loading = true;
    if (event.node) {
      this.srvMenu.getMenuChildren(event.node.data).subscribe(res => {
        event.node.children = res.map(r => ({ label: r.title, data: r.menuId, children: [{}] }));
        this.setIcon(this.menus);
        this.loading = false;
      });
    }
  }

  setIcon(report: any[]): void {
    report.forEach(r => {
      if (Object.keys(r).indexOf('children') > -1) {
        r.expandedIcon = 'pi pi-folder-open';
        r.collapsedIcon = 'pi pi-folder';
        if (r.children && r.children.length > 0) {
          this.setIcon(r.children);
        }
      } else {
        r.icon = 'pi pi-book';
      }
    });
  }

  searchMenu(event: any): void {
    if (event.filter.length > 0) {
      this.loading = true;
      this.srvSrch.getMenu(event.filter).subscribe(res => {
        this.menus = res.map(r => ({ label: r.title, data: r.menuId, children: [{}] }));
        this.loading = false;
      });
    } else {
      this.getMenus();
    }
  }

  getMenus(): void {
    this.loading = true;
    this.srvMenu.getMenus().subscribe(res => {
      this.menus = res.map(r => ({ label: r.title, data: r.menuId, children: [{}] }));
      this.setIcon(this.menus);
      this.loading = false;
    });
  }

  selectMenu(Menu: TreeNode): void {
    this.ref.close(Menu);
  }

}
