import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sc-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss']
})
export class ResetpassComponent implements OnInit {

  password: string;
  repeatPassword: string;
  code: string;
  pressed: boolean;

  constructor(private route: ActivatedRoute, private sAuth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(prams => {
      this.code = prams.code;
    });
  }

  onSubmit(): void {
    this.pressed = true;
    this.sAuth.resetPassword(this.code, this.password).subscribe(res => {
      this.sAuth.setCookie('jwt', res.jwt, 7);
      this.router.navigate(['./landing']);
    }, () => {
      this.pressed = false;
    });
  }

}
