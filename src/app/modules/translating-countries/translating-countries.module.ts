import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslatingCountriesRoutingModule } from './translating-countries-routing.module';
import { TranslatingCountriesComponent } from './translating-countries.component';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';
import { MaterialModule } from '@core/ui-kit/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';
import { TransaltingCountriesListComponent } from './transalting-countries-list/transalting-countries-list.component';
import { TranslatingCountriesWriteComponent } from './translating-countries-write/translating-countries-write.component';

@NgModule({
  declarations: [TranslatingCountriesComponent, TransaltingCountriesListComponent, TranslatingCountriesWriteComponent],
  imports: [
    CommonModule,
    TranslatingCountriesRoutingModule,
    LocalCommonModule,
    TablePaginationModule,
    MaterialModule,
    // form
    FormsModule,
    AtomsFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class TranslatingCountriesModule {}
