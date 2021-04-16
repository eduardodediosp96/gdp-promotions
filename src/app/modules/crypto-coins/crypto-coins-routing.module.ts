import { CryptoCoinViewerComponent } from './components/crypto-coin-viewer/crypto-coin-viewer.component';
import { CryptoCoinsComponent } from './crypto-coins.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: CryptoCoinsComponent,
    children:[
      {
        path: ':id',
        component: CryptoCoinViewerComponent,
        // resolve: {
        //   promotion: promotionResolver,
        //   resoruces: resourcesResolver
        // }
      },
    ]
  },

  // {
  //   path: 'write/:id',
  //   component: promotionWriteComponent,
  //   resolve: {
  //     promotion: promotionResolver,
  //     resoruces: resourcesResolver
  //   }
  // },
  // {
  //   path: 'fomrtemp/:id',
  //   component: promotionWriteComponent,
  //   resolve: {
  //     promotion: fromTemplateResolver,
  //     resoruces: resourcesResolver
  //   }
  // },
  // {
  //   path: 'copiedby/:id',
  //   component: promotionWriteComponent,
  //   resolve: {
  //     promotion: fromCopiedResolver,
  //     resoruces: resourcesResolver
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class cryptoCoinsRoutingModule { }
