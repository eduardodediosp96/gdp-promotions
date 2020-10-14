import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { promotionRoutingModule } from './promotion-routing.module';
import { promotionComponent } from './promotion.component';
import { promotionWriteComponent } from './promotion-write/promotion-write.component';

import { MatCardModule } from '@angular/material/card';
import { LocalCommonModule } from '@common/local-common.module';
import { TablePaginationModule } from '@core/components/table/table-pagination/table-pagination.module';

import { AtomsFormFieldModule } from '../../shared/core/components/atoms/atoms-form-field/atoms-form-field.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/core/ui-kit/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { PromotionsFiltersComponent } from './promotions-filters/promotions-filters.component';

@NgModule({
  declarations: [promotionComponent, promotionWriteComponent, PromotionsFiltersComponent],
  imports: [
    EditorModule,
    CommonModule,
    promotionRoutingModule,
    MatCardModule,
    MatSlideToggleModule,
    LocalCommonModule,
    TablePaginationModule,
    AtomsFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ]
})
export class promotionModule { }
