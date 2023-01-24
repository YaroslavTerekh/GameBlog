import { AdminModule } from './modules/admin/admin.module';
import { AuthorizationInterceptor } from './core/authorization.interceptor';
import { UserModule } from './modules/user/user.module';
import { NewsModule } from './modules/news/news.module';
import { MainModule } from 'src/app/modules/main/main.module';
import { JournalistsModule } from 'src/app/modules/journalists/journalists.module';
import { SharedModule } from './shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountOptionsModalComponent } from './shared/modals/account-options-modal/account-options-modal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountOptionsNotLoggedInComponent } from './shared/modals/account-options-not-logged-in/account-options-not-logged-in.component';
import { NotificationsComponent } from './shared/modals/notifications/notifications.component';
import { NotificationComponent } from './shared/modals/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountOptionsModalComponent,
    AccountOptionsNotLoggedInComponent,
    NotificationsComponent,
    NotificationComponent,
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JournalistsModule,
    MainModule,
    NewsModule,
    UserModule,
    AdminModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthorizationInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
