import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslatingKeysRoutingModule } from './translating-keys-routing.module';
import { TranslatingKeysComponent } from './translating-keys.component';
import { TranslatingKeysListComponent } from './translating-keys-list/translating-keys-list.component';
import { TranslatingKeysWriteComponent } from './translating-keys-write/translating-keys-write.component';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';
import { MaterialModule } from '@core/ui-kit/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';

@NgModule({
  declarations: [TranslatingKeysComponent, TranslatingKeysListComponent, TranslatingKeysWriteComponent],
  imports: [
    CommonModule,
    TranslatingKeysRoutingModule,
    LocalCommonModule,
    TablePaginationModule,
    MaterialModule,
    // form
    FormsModule,
    AtomsFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class TranslatingKeysModule { }
