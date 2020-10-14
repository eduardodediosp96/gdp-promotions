import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguagesService } from 'app/modules/languages/languages.service';
import { CountryService } from 'app/modules/country/country.service';
import { map, switchMap, filter } from 'rxjs/operators';
import { CallingCodesService } from '../calling-codes.service';
import { ICallingCode, CallingCode } from '../calling-codes.interface';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';

@Component({
  selector: 'app-calling-codes-write',
  templateUrl: './calling-codes-write.component.html',
  styleUrls: ['./calling-codes-write.component.scss']
})
export class CallingCodesWriteComponent implements OnInit {
  id;
  pageType = 'new';
  form: FormGroup;
  countries = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private callingCodeSvc: CallingCodesService,
    private countrySvc: CountryService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    //+
    this.form = this.createForm(new CallingCode());
    // obtenemos los paises
    this.countryItems()
      .pipe(
        switchMap((countries) => {
          this.countries = countries;
          // obtenemos el parametro
          return this.routeparam({ key: 'id' });
        }),
        // filtramos que no sea new
        filter((paramId) => paramId != 'new'),
        switchMap((paramId) => {
          this.pageType = 'upd';
          this.id = paramId;
          // consultamos el lenguage
          return this.callingCodeItem({ id: paramId });
        })
      )
      .subscribe((lang: ICallingCode) => {
        this.form = this.createForm(lang);
      });
  }

  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        return params[key];
      })
    );
  }

  countryItems() {
    return this.countrySvc.items({}).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  callingCodeItem({ id }) {
    return this.callingCodeSvc.item({ id }).pipe(
      map((result) => {
        return result.data.item;
      })
    );
  }

  createForm(model: ICallingCode): FormGroup {
    return this.formBuilder.group({
      icCode: [
        model.icCode,
        Validators.compose([MyValidator.required, MyValidator.minLength(1), MyValidator.maxLength(10)]),
      ],
      countryId: [model.countryId, Validators.compose([MyValidator.required])],
      testing: [model.testing],
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.callingCodeSvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/calling-codes']);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.callingCodeSvc
      .updItem({
        id: this.id,
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/calling-codes']);
      });
  }

  handleCancel(): void {
    this.router.navigate(['/calling-codes']);
  }

}
