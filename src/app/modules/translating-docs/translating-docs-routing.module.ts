import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslatingDocsComponent } from './translating-docs.component';
import { TranslatingDocsListComponent } from './translating-docs-list/translating-docs-list.component';
import { TranslatingDocsWriteComponent } from './translating-docs-write/translating-docs-write.component';

const routes: Routes = [
  {
    path: '',
    component: TranslatingDocsComponent,
    children: [
      { path: 'lang/:id', component: TranslatingDocsListComponent },
      { path: 'item/:id/:langid', component: TranslatingDocsWriteComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslatingDocsRoutingModule {}
