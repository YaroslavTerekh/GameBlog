import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public needLogin!: boolean;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.authService.loginModalSubject
      .subscribe({
        next: res => {
          this.needLogin = res;
        }
      });

    if(this.needLogin) {
      this.router.navigate(['/welcome']);
    }
  }

}
