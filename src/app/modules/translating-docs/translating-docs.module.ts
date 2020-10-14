import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslatingDocsRoutingModule } from './translating-docs-routing.module';
import { TranslatingDocsComponent } from './translating-docs.component';
import { TranslatingDocsListComponent } from './translating-docs-list/translating-docs-list.component';
import { TranslatingDocsWriteComponent } from './translating-docs-write/translating-docs-write.component';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';
import { MaterialModule } from '@core/ui-kit/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';


@NgModule({
  declarations: [TranslatingDocsComponent, TranslatingDocsListComponent, TranslatingDocsWriteComponent],
  imports: [
    CommonModule,
    TranslatingDocsRoutingModule,
    LocalCommonModule,
    TablePaginationModule,
    MaterialModule,
    // form
    FormsModule,
    AtomsFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class TranslatingDocsModule { }
