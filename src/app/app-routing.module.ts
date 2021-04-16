import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './modules/main.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', 		loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
      { path: 'crypto-coins', loadChildren: () => import('./modules/crypto-coins/crypto-coins.module').then(m => m.cryptoCoinsModule) },
    ],
  },
];
// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
