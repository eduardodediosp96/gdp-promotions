import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrenciesComponent } from './currencies.component';
import { CurrencyWriteComponent } from './currency-write/currency-write.component';

const routes: Routes = [
  {
    path: '',
    component: CurrenciesComponent
  },
  {
    path: 'write/:id',
    component: CurrencyWriteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrenciesRoutingModule { }
