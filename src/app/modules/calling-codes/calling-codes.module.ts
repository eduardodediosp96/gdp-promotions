import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallingCodesRoutingModule } from './calling-codes-routing.module';
import { CallingCodesComponent } from './calling-codes.component';
import { CallingCodesWriteComponent } from './calling-codes-write/calling-codes-write.component';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';
import { MaterialModule } from '@core/ui-kit/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';


@NgModule({
  declarations: [CallingCodesComponent, CallingCodesWriteComponent],
  imports: [
    CommonModule,
    CallingCodesRoutingModule,
    LocalCommonModule,
    TablePaginationModule,
    MaterialModule,
    // form
    FormsModule,
    AtomsFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class CallingCodesModule { }
