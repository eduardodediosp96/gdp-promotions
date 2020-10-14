import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldCheckboxModule } from './form-field-checkbox/form-field-checkbox.module';
import { FormFieldInputModule } from './form-field-input/form-field-input.module';
import { FormFieldDatePickerModule } from './form-field-datepicker/form-field-datepicker.module';
import { FormFieldSelectModule } from './form-field-select/form-field-select.module';
import { FormFieldConditionalInputModule } from './form-field-conditional-input/form-field-conditional-input.module';
import { FormRadioGroupModule } from './form-radio-group/form-radio-group.module';
import { FormFieldTextareaModule } from './form-field-textarea/form-field-textarea.module';
import { InputSearchModule } from './input-search/input-search.module';
import { InputEditModule } from './input-edit/input-edit.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormFieldCheckboxModule,
    FormFieldInputModule,
    FormFieldSelectModule,
    FormRadioGroupModule,
    FormFieldTextareaModule,
    FormFieldDatePickerModule,
    InputSearchModule,
    InputEditModule,
    FormFieldConditionalInputModule
  ],
  exports: [
    FormFieldCheckboxModule,
    FormFieldInputModule,
    FormFieldSelectModule,
    FormRadioGroupModule,
    FormFieldTextareaModule,
    FormFieldDatePickerModule,
    InputSearchModule,
    InputEditModule,
    FormFieldConditionalInputModule
  ]
})
export class AtomsFormFieldModule { }
