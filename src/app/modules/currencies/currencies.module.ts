import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrenciesRoutingModule } from './currencies-routing.module';
import { CurrenciesComponent } from './currencies.component';
import { CurrencyWriteComponent } from './currency-write/currency-write.component';

import { MatCardModule } from '@angular/material/card';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';

import { AtomsFormFieldModule } from '../../shared/core/components/atoms/atoms-form-field/atoms-form-field.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/core/ui-kit/material.module';


@NgModule({
  declarations: [CurrenciesComponent, CurrencyWriteComponent],
  imports: [
    CommonModule,
    CurrenciesRoutingModule,
    MatCardModule,
    LocalCommonModule,
    TablePaginationModule,
    AtomsFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class CurrenciesModule { }
