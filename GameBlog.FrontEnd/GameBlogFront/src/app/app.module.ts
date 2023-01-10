import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './modules/main/components/main/main.component';
import { JournalistsComponent } from './modules/journalists/components/journalists/journalists.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    JournalistsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
