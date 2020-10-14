import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryIdentsComponent } from './country-idents.component';

const routes: Routes = [{ path: '', component: CountryIdentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryIdentsRoutingModule { }
