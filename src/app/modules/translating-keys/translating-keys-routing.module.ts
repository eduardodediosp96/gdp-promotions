import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslatingKeysComponent } from './translating-keys.component';
import { TranslatingKeysListComponent } from './translating-keys-list/translating-keys-list.component';

const routes: Routes = [
  {
    path: '',
    component: TranslatingKeysComponent,
    children: [{ path: ':id', component: TranslatingKeysListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslatingKeysRoutingModule {}
