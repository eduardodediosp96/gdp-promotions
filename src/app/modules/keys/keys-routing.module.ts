import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeysComponent } from './keys.component';
import { KeysWriteComponent } from './keys-write/keys-write.component';

const routes: Routes = [{ path: '', component: KeysComponent },
{
  path: 'write/:id',
  component: KeysWriteComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeysRoutingModule { }
