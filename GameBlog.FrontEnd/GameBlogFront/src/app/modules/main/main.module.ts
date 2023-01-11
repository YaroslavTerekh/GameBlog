import { JournalistsModule } from 'src/app/modules/journalists/journalists.module';
import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';



@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    JournalistsModule,
    SharedModule
  ]
})
export class MainModule { }
