import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, forwardRef, ViewEncapsulation } from '@angular/core';
import { AlingIcon } from '../theme.enum';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { ErrorMessage } from '../control-error/error-message';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
// import {default as _rollupMoment} from 'moment';
const moment =  _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-form-field-datepicker',
  templateUrl: './form-field-datepicker.component.html',
  styleUrls: ['./form-field-datepicker.component.scss','./../general.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldDatepickerComponent),
      multi: true
    },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class FormFieldDatepickerComponent implements ControlValueAccessor, OnInit {

  @Input() appearance: string;
  @Input() inputName: string;
  @Input() floatLabel = 'auto';
  @Input() label: string;
  @Input() placeholder: string;
  @Input() icon: string;
  @Input() alignIcon: string;
  @Input() minDate = moment().add(-120, 'M')
  @Input() maxDate = moment().add(120, 'M')

  //type input
  @Input() type: string;
  //mask input
  @Input() mask: string;
  @Input() showMaskTyped: string;
  @Input() suffix: string;
  @Input() prefix: string;


  @Input() isReadonly: boolean = false;
  @Input() dropSpecialCharacters = true;

  @Output() clickIcon = new EventEmitter();
  @Output() changeValue = new EventEmitter();

  @Input() error: any;
  @Input() errorMessage: string;

  value = new FormControl(moment);
  isDisabled: boolean;
  onChange = (_: any) => { };
  onTouch = () => { };
  onInput(value: string): void {
    this.onTouch();
    this.onChange(this.value.value);
  }

  constructor() { }

  ngOnInit(): void {
    this.value.setValue(moment() || '');
    this.alignIcon = this.alignIcon ? AlingIcon[this.alignIcon] : AlingIcon.default;
  }


  writeValue(value: any): void {
    this.onTouch();
    this.value.setValue(value || '');
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let date: Moment = this.value.value;
    this.value.setValue(date)
    console.log('valor',this.value)
    const emitMesage = {'value': event.value , 'controlName': this.inputName}
    this.changeValue.emit(emitMesage)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  setOnClick(): void {
    this.clickIcon.emit();
  }

  getMessage(): string {
    if (this.errorMessage) return this.errorMessage;
    for (let propertyName in this.error.errors) {
      if (this.error.errors.hasOwnProperty(propertyName) && this.error.dirty) {
        return ErrorMessage.getValitorMessage(
          propertyName,
          this.error.errors[propertyName]
        );
      }
    }
  }

}
