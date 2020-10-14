import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslatingCurrenciesRoutingModule } from './translating-currencies-routing.module';
import { TranslatingCurrenciesComponent } from './translating-currencies.component';
import { TranslatingCurrenciesListComponent } from './translating-currencies-list/translating-currencies-list.component';
import { TranslatingCurrenciesWriteComponent } from './translating-currencies-write/translating-currencies-write.component';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';
import { MaterialModule } from '@core/ui-kit/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';


@NgModule({
  declarations: [TranslatingCurrenciesComponent, TranslatingCurrenciesListComponent, TranslatingCurrenciesWriteComponent],
  imports: [
    CommonModule,
    TranslatingCurrenciesRoutingModule,
    LocalCommonModule,
    TablePaginationModule,
    MaterialModule,
    // form
    FormsModule,
    AtomsFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class TranslatingCurrenciesModule { }
