import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryCurrenciesComponent } from "./country-currencies.component";

const routes: Routes = [
  {
    path: '',
    component: CountryCurrenciesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryCurrenciesRoutingModule { }
