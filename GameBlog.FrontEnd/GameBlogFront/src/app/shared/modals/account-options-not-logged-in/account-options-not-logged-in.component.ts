import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/interfaces/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Register } from 'src/app/core/interfaces/register';

@Component({
  selector: 'app-account-options-not-logged-in',
  templateUrl: './account-options-not-logged-in.component.html',
  styleUrls: ['./account-options-not-logged-in.component.scss']
})
export class AccountOptionsNotLoggedInComponent implements OnInit {

  public register!: boolean;
  public login: boolean = true;
  public loginForm: FormGroup = new FormGroup({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required])
  });
  public registerGroup: FormGroup = new FormGroup({
    Firstname: this.fb.control('', Validators.required),
    Lastname: this.fb.control('', Validators.required),
    Email: this.fb.control('', Validators.required),
    Password: this.fb.control('', Validators.required),
    Role: this.fb.control('', Validators.required),
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

  public showAccountModal(value: boolean): void {
    this.authorizationService.triggerForAccountModal(value);
  }

  public onRegister(): void {
    let newUser: Register = {
      firstname: this.registerGroup.get('Firstname')?.value,
      lastname: this.registerGroup.get('Lastname')?.value,
      email: this.registerGroup.get('Email')?.value,
      password: this.registerGroup.get('Password')?.value,
      role : parseInt(this.registerGroup.get('Role')?.value),
    };
    

    this.authorizationService.register(newUser)
      .subscribe({
        next: res => {
          this.showAccountModal(false);
          this.router.navigate(['welcome']);
        },
        error: res => {
          console.error(res);
          
        }
      });
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
          this.showAccountModal(false);
          this.router.navigate(['']);
        }
      });
  }
}
