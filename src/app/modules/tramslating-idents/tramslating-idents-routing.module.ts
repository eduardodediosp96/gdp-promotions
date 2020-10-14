import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TramslatingIdentsComponent } from './tramslating-idents.component';
import { TranslatingIdentsListComponent } from './translating-idents-list/translating-idents-list.component';

const routes: Routes = [
  {
    path: '',
    component: TramslatingIdentsComponent,
    children: [{ path: ':id', component: TranslatingIdentsListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TramslatingIdentsRoutingModule {}
