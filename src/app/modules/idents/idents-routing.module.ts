import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentsComponent } from './idents.component';
import { IdentsWriteComponent } from './idents-write/idents-write.component';

const routes: Routes = [
  { path: '', component: IdentsComponent },
  {
    path: 'write/:id',
    component: IdentsWriteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentsRoutingModule {}
