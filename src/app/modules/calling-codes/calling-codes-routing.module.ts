import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallingCodesComponent } from './calling-codes.component';
import { CallingCodesWriteComponent } from './calling-codes-write/calling-codes-write.component';

const routes: Routes = [
  { path: '', component: CallingCodesComponent },
  {
    path: 'write/:id',
    component: CallingCodesWriteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallingCodesRoutingModule {}
