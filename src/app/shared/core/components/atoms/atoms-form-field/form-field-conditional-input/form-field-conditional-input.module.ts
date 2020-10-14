import { FormFieldConditionalInputComponent } from './form-field-conditional-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskModule, MaskPipe } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [FormFieldConditionalInputComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    MaskPipe
  ],
  exports: [
    FormFieldConditionalInputComponent
  ],
})
export class FormFieldConditionalInputModule { }
