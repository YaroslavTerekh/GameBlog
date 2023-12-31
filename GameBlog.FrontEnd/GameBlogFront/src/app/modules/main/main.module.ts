import { NewsModule } from './../news/news.module';
import { JournalistsModule } from 'src/app/modules/journalists/journalists.module';
import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';



@NgModule({
  declarations: [
    MainComponent,
    WelcomePageComponent,
  ],
  imports: [
    CommonModule,
    JournalistsModule,
    NewsModule,
    SharedModule
  ]
})
export class MainModule { }
