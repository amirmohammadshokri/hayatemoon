import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IUsers } from 'src/app/interfaces/users.interface';
import { CompanyService } from 'src/app/services';

@Component({
  selector: 'ss-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  cols: any[];
  users: IUsers[] = [];
  loading: boolean;
  currentPage: number;
  item: any;
  showStateDialog: boolean;
  nothingElse: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getUsers(false);
    }
  }

  constructor(
    private confirmationService: ConfirmationService,
    private sevCo: CompanyService,
    private srvMsg: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'userName', header: 'نام کاربری' },
      { field: 'firstName', header: 'نام' },
      { field: 'lastName', header: 'نام خانوادگی' },
      { field: 'internalPhone', header: ' تلفن داخلی ' },
      { field: 'email', header: 'ایمیل' }
    ];
    this.getUsers(true);
  }

  
  getUsers(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.users = [];
    }
    this.loading = true;
    // let filter = ``;
    // if (this.item) {
    //   filter += `&state=${this.item.code}`;
    // }
    // if (this.title) {
    //   filter += `&title=${this.title}`;
    // }
    this.sevCo.getUser(3,this.currentPage,15).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }

      this.users.push(...res);
      this.loading = false;
    });
  }

  confirmDelete(id: number): void {
    console.log("samiramiramiramir  ");
    
    this.confirmationService.confirm({
      message: 'آیا از حذف این ردیف اطمینان دارید؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'نه',
      accept: () => {
        this.deleteUsers(id);
      }
    });
  }

  deleteUsers(id: number): void {
    this.sevCo.deleteUser(id).subscribe(() => {
      this.getUsers(true);
    });
  }

  editCompany(id: number): void {
    this.router.navigate([`../panel/company/form-user/${id}`]);
  }
}