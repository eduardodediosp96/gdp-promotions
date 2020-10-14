import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeysRoutingModule } from './keys-routing.module';
import { KeysComponent } from './keys.component';
import { KeysWriteComponent } from './keys-write/keys-write.component';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';
import { MaterialModule } from '@core/ui-kit/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';


@NgModule({
  declarations: [KeysComponent, KeysWriteComponent],
  imports: [
    CommonModule,
    KeysRoutingModule,
    //
    LocalCommonModule,
    TablePaginationModule,
    MaterialModule,
    // form
    FormsModule,
    AtomsFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class KeysModule { }
