import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryComponent } from './country.component';
import { CountryWriteComponent } from './country-write/country-write.component';

const routes: Routes = [
  {
    path: '',
    component: CountryComponent
  },
  {
    path: 'write/:id',
    component: CountryWriteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
