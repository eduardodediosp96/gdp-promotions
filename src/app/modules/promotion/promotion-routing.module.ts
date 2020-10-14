import { fromCopiedResolver } from './resolver/fromCopied.resolver';
import { fromTemplateResolver } from './resolver/fromTemplate.resolver';
import { resourcesResolver } from './resolver/resoruces.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { promotionComponent } from './promotion.component';
import { promotionWriteComponent } from './promotion-write/promotion-write.component';
import { promotionResolver } from './resolver/promotion.resolver';

const routes: Routes = [
  {
    path: '',
    component: promotionComponent
  },
  {
    path: 'write/:id',
    component: promotionWriteComponent,
    resolve: {
      promotion: promotionResolver,
      resoruces: resourcesResolver
    }
  },
  {
    path: 'fomrtemp/:id',
    component: promotionWriteComponent,
    resolve: {
      promotion: fromTemplateResolver,
      resoruces: resourcesResolver
    }
  },
  {
    path: 'copiedby/:id',
    component: promotionWriteComponent,
    resolve: {
      promotion: fromCopiedResolver,
      resoruces: resourcesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class promotionRoutingModule { }
