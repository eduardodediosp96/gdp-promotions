import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { promotionComponent } from './promotion.component';
import { promotionWriteComponent } from './promotion-write/promotion-write.component';

const routes: Routes = [
  {
    path: '',
    component: promotionComponent
  },
  {
    path: 'write/:id',
    component: promotionWriteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class promotionRoutingModule { }
