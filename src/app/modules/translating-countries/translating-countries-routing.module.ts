import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslatingCountriesComponent } from './translating-countries.component';
import { TransaltingCountriesListComponent } from './transalting-countries-list/transalting-countries-list.component';

const routes: Routes = [
  {
    path: '',
    component: TranslatingCountriesComponent,
    children: [
      { path: ':id', component: TransaltingCountriesListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslatingCountriesRoutingModule {}
