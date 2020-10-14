import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramslatingIdentsRoutingModule } from './tramslating-idents-routing.module';
import { TramslatingIdentsComponent } from './tramslating-idents.component';
import { TranslatingIdentsListComponent } from './translating-idents-list/translating-idents-list.component';
import { TranslatingIdentsWriteComponent } from './translating-idents-write/translating-idents-write.component';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';
import { MaterialModule } from '@core/ui-kit/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';


@NgModule({
  declarations: [TramslatingIdentsComponent, TranslatingIdentsListComponent, TranslatingIdentsWriteComponent],
  imports: [
    CommonModule,
    TramslatingIdentsRoutingModule,
    LocalCommonModule,
    TablePaginationModule,
    MaterialModule,
    // form
    FormsModule,
    AtomsFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class TramslatingIdentsModule { }
