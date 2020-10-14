import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentsRoutingModule } from './idents-routing.module';
import { IdentsComponent } from './idents.component';
import { IdentsWriteComponent } from './idents-write/idents-write.component';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';
import { MaterialModule } from '@core/ui-kit/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';


@NgModule({
  declarations: [IdentsComponent, IdentsWriteComponent],
  imports: [
    CommonModule,
    IdentsRoutingModule,
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
export class IdentsModule { }
