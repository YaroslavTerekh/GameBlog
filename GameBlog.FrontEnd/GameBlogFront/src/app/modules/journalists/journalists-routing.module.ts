import { JournalistInfoPageComponent } from './components/journalist-info-page/journalist-info-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "journalist/:id", component: JournalistInfoPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalistsRoutingModule { }
