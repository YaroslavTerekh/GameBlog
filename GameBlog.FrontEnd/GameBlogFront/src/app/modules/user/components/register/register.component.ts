import { Router } from '@angular/router';
import { Register } from './../../../../core/interfaces/register';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerGroup: FormGroup = new FormGroup({
    Firstname: this.fb.control('', Validators.required),
    Lastname: this.fb.control('', Validators.required),
    Email: this.fb.control('', Validators.required),
    Password: this.fb.control('', Validators.required),
    Role: this.fb.control('', Validators.required),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public showAccountModal(value: boolean): void {
    this.authorizationService.triggerForAccountModal(value);
  }

  public register(): void {
    let newUser: Register = {
      firstname: this.registerGroup.get('Firstname')?.value,
      lastname: this.registerGroup.get('Lastname')?.value,
      email: this.registerGroup.get('Email')?.value,
      password: this.registerGroup.get('Password')?.value,
      role: this.registerGroup.get('Role')?.value,
    };

    this.authorizationService.register(newUser)
      .subscribe({
        next: res => {
          this.router.navigate(['']);
        }
      });
  }

}
