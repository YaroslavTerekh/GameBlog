import { ForgotPassword } from './../../../core/interfaces/forgotPassword';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/interfaces/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Register } from 'src/app/core/interfaces/register';
import { UserService } from 'src/app/core/services/user.service';
import { SignalrService } from 'src/app/core/services/signalr.service';

@Component({
  selector: 'app-account-options-not-logged-in',
  templateUrl: './account-options-not-logged-in.component.html',
  styleUrls: ['./account-options-not-logged-in.component.scss']
})
export class AccountOptionsNotLoggedInComponent implements OnInit {

  public forgotPassword!: boolean;
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
  public forgotPasswordGroup: FormGroup = new FormGroup({
    Email: this.fb.control('', Validators.required)
  })
  private token!: string;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly userService: UserService,
    private readonly signalr: SignalrService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public showAccountModal(value: boolean): void {
    this.authorizationService.triggerForAccountModal(value);
  }

  public onRegister(): void {
    if (!this.registerGroup.valid) {
      this.userService.showInfoModalMessage$.next("Заповніть всі поля");
      this.userService.showInfoModal$.next(true);
    } else {
      let newUser: Register = {
        firstname: this.registerGroup.get('Firstname')?.value,
        lastname: this.registerGroup.get('Lastname')?.value,
        email: this.registerGroup.get('Email')?.value,
        password: this.registerGroup.get('Password')?.value,
        role: parseInt(this.registerGroup.get('Role')?.value),
      };


      this.authorizationService.register(newUser)
        .subscribe({
          next: res => {
            this.userService.showInfoModalMessage$.next("Користувача успішно зареєстровано");
            this.userService.showInfoModal$.next(true);
            this.showAccountModal(false);
            this.router.navigate(['welcome']);
          },
          error: res => {
            this.userService.showInfoModalMessage$.next(res.error.response);
            this.userService.showInfoModal$.next(true);
          }
        });
    }
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.userService.showInfoModalMessage$.next("Заповніть всі поля");
      this.userService.showInfoModal$.next(true);
    } else {
      let userCreds: Login = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.authorizationService.logIn(userCreds)
        .subscribe({
          next: res => {
            this.signalr.startConnection();
            this.signalr.addTransferChartDataListener();
            this.userService.showInfoModalMessage$.next("Вхід успішно виконано");
            this.userService.showInfoModal$.next(true);
            this.authorizationService.reloadAvatarSubject.next(true);
            this.token = res.token;
            localStorage.setItem('Token', `bearer ${this.token}`);
            localStorage.setItem('Role', this.jwtHelper.decodeToken(this.token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
            localStorage.setItem('id', this.jwtHelper.decodeToken(this.token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
            this.authorizationService.loginModalSubject.next(false);
            this.showAccountModal(false);
            this.authorizationService.isAuthorizedSubject.next(true);
            this.router.navigate(['']);
          },
          error: err => {
            this.userService.showInfoModalMessage$.next(err.error.response);
            this.userService.showInfoModal$.next(true);
          }
        });
    }
  }

  onForgotPassword(): void {
    let forgotPasswordDto: ForgotPassword = {
      email: this.forgotPasswordGroup.get('Email')?.value,
      clientURI: 'http://localhost:4200/forgotpassword'
    }

    this.authorizationService.forgotPassword('', forgotPasswordDto)
      .subscribe({
        error: err => {
          this.userService.showInfoModalMessage$.next(err.error);
          this.userService.showInfoModal$.next(true);
        }
      });
  }
}
