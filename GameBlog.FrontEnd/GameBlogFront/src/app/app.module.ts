import { NewsModule } from './modules/news/news.module';
import { MainModule } from 'src/app/modules/main/main.module';
import { JournalistsModule } from 'src/app/modules/journalists/journalists.module';
import { SharedModule } from './shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountOptionsModalComponent } from './shared/modals/account-options-modal/account-options-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountOptionsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JournalistsModule,
    MainModule,
    NewsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
