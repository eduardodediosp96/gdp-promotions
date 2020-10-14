import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryCurrenciesRoutingModule } from './country-currencies-routing.module';
import { CountryCurrenciesComponent } from "./country-currencies.component";

import { MatCardModule } from '@angular/material/card';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';

import { AtomsFormFieldModule } from '../../shared/core/components/atoms/atoms-form-field/atoms-form-field.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/core/ui-kit/material.module';

@NgModule({
  declarations: [CountryCurrenciesComponent],
  imports: [
    CommonModule,
    CountryCurrenciesRoutingModule,
    MatCardModule,
    LocalCommonModule,
    TablePaginationModule,
    AtomsFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class CountryCurrenciesModule { }
