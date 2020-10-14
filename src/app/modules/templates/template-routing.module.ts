import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { templateComponent } from './template.component';
// import { templateWriteComponent } from './template-write/template-write.component';

const routes: Routes = [
  {
    path: '',
    component: templateComponent
  },
  // {
  //   path: 'write/:id',
  //   component: templateWriteComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class templateRoutingModule { }
