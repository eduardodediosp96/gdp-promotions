import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocsComponent } from './docs.component';
import { DocWriteComponent } from './doc-write/doc-write.component';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent
  },
  {
    path: 'write/:id',
    component: DocWriteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule { }
