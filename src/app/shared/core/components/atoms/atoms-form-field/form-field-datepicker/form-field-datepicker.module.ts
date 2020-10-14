import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldDatepickerComponent } from './form-field-datepicker.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskModule, MaskPipe } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormFieldDatepickerComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    MaskPipe,
  ],
  exports: [
    FormFieldDatepickerComponent
  ],
})
export class FormFieldDatePickerModule { }
