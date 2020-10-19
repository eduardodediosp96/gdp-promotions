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
      { path: 'promotion', loadChildren: () => import('./modules/promotion/promotion.module').then(m => m.promotionModule) },
      { path: 'template', loadChildren: () => import('./modules/templates/template.module').then(m => m.templateModule) },
    ],
  },
];
// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
