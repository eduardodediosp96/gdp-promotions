import { copyPromotion } from './../../shared/common/services/copy.service';
import { TemplatesFiltersComponent } from './template-filters/template-filters.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { templateRoutingModule } from './template-routing.module';
// import { templateWriteComponent } from './template-write/template-write.component';
import { templateComponent } from './template.component';

import { MatCardModule } from '@angular/material/card';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';

import { AtomsFormFieldModule } from '../../shared/core/components/atoms/atoms-form-field/atoms-form-field.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/core/ui-kit/material.module';

@NgModule({
  declarations: [templateComponent, TemplatesFiltersComponent],
  imports: [
    CommonModule,
    templateRoutingModule,
    MatCardModule,
    LocalCommonModule,
    TablePaginationModule,
    AtomsFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    copyPromotion
  ]
})
export class templateModule { }
