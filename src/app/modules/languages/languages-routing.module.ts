import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguagesComponent } from './languages.component';
import { LangWriteComponent } from './lang-write/lang-write.component';

const routes: Routes = [
  {
    path: '',
    component: LanguagesComponent
  },
  {
    path: 'write/:id',
    component: LangWriteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguagesRoutingModule { }
