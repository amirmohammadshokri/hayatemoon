import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CompanyService } from 'src/app/services';

@Component({
  selector: 'ss-menu-role-access',
  templateUrl: './menu-role-access.component.html',
  styleUrls: ['./menu-role-access.component.scss']
})
export class MenuRoleAccessComponent implements OnInit {

  companyTypes: SelectItem[];

  constructor(private srvCo: CompanyService) { }

  ngOnInit(): void {
    this.getCompanyType();
  }

  getCompanyType(): void {
    this.srvCo.getCompanyTypes().subscribe(res => {
      this.companyTypes = res.map(t => ({ label: t.title, value: t.id }));
    });
  }

}
