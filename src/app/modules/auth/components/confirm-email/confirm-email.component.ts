import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sc-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(
    private router: Router,
    private sAuth: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(prams => {
      this.sAuth.confirmEmail(prams.confirmation).subscribe();
      setTimeout(() => {
        this.router.navigate(['./auth']);
      }, 3000);
    });
  }

}
