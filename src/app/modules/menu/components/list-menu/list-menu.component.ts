import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { MenuService } from 'src/app/services';

@Component({
  selector: 'ss-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent implements OnInit {

  data: TreeNode[];
  loading: boolean;

  constructor(private srvMenu: MenuService, private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.srvMenu.getMenus().subscribe(menus => {
      this.data = menus.map(d => ({ data: d, children: [{}] }));
      this.loading = false;
    });
  }

  onNodeExpand(event): void {
    this.loading = true;
    if (event.node) {
      event.node.children = [];
      this.srvMenu.getMenuChildren(event.node.data.menuId).subscribe(res => {
        if (res.length > 0) {
          event.node.children = res.map(d => ({ data: d, children: [{}] }));
        }
        this.data = [...this.data];
        this.loading = false;
      });
    }
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف این ردیف اطمینان دارید؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'نه',
      accept: () => {
        this.delete(id);
      }
    });
  }

  delete(id: number): void {
    this.srvMenu.deleteMenu(id).subscribe(() => {
      this.getData();
    });
  }

  edit(id: number): void {
    this.router.navigate([`./panel/menu/form/${id}`]);
  }

}
