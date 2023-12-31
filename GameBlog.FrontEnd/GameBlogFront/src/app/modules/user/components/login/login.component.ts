import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Login } from '../../../../core/interfaces/login';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required])
  });
  private token!: string;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let userCreds: Login = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authorizationService.logIn(userCreds)
      .subscribe({
        next: res => {
          this.token = res.token;
          localStorage.setItem('Token', `bearer ${this.token}`);
          localStorage.setItem('Role', this.jwtHelper.decodeToken(this.token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
          this.authorizationService.loginModalSubject.next(false);
          this.router.navigate(['']);
        }
      });
  }

}
