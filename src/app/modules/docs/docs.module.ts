import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';
import { DocWriteComponent } from './doc-write/doc-write.component';

import { MatCardModule } from '@angular/material/card';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';

import { AtomsFormFieldModule } from '../../shared/core/components/atoms/atoms-form-field/atoms-form-field.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/core/ui-kit/material.module';


@NgModule({
  declarations: [DocsComponent, DocWriteComponent],
  imports: [
    CommonModule,
    DocsRoutingModule,
    MatCardModule,
    LocalCommonModule,
    TablePaginationModule,
    AtomsFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class DocsModule { }
