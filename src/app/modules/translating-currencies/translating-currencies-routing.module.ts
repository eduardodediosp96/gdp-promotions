import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslatingCurrenciesComponent } from './translating-currencies.component';
import { TranslatingCurrenciesListComponent } from './translating-currencies-list/translating-currencies-list.component';

const routes: Routes = [
  {
    path: '',
    component: TranslatingCurrenciesComponent,
    children: [{ path: ':id', component: TranslatingCurrenciesListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslatingCurrenciesRoutingModule {}
