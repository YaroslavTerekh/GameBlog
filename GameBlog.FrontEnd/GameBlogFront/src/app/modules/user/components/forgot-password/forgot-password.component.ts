import { ResetPassword } from './../../../../core/interfaces/resetPassword';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public resetGroup: FormGroup = this.fb.group({
    newPass: this.fb.control('', [Validators.required])
  })

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onReset(): void {
    let req: ResetPassword = {
      password: this.resetGroup.get('newPass')?.value,
      email: this.route.snapshot.queryParams['email'],
      token: this.route.snapshot.queryParams['token'],
    }

    console.log(req);    

    this.authorizationService.resetPassword('', req)
      .subscribe({

      })      
  }
}
