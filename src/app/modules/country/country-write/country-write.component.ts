import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../country.service';
import { Country, ICountry } from '../country.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MyValidator } from './../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { ToasterService } from '../../../shared/core/services/toaster.service';
import { LanguagesService } from '../../languages/languages.service';
import { map, switchMap, filter } from 'rxjs/operators';
import { CurrenciesService } from 'app/modules/currencies/currencies.service';
import { IdentsService } from 'app/modules/idents/idents.service';

@Component({
  selector: 'app-country-write',
  templateUrl: './country-write.component.html',
  styleUrls: ['./country-write.component.scss']
})
export class CountryWriteComponent implements OnInit {

  id = '';
  country: Country;

  pageType = 'new';
  form: FormGroup;
  langs = [];
  currencies = [];
  idents = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private countrySvc: CountryService,
    private formBuilder: FormBuilder,
    private toast: ToasterService,
    private langSvc: LanguagesService,
    private currencySvc: CurrenciesService,
    private identSvc: IdentsService,
  ) {  }

  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        return params[key];
      })
    );
  }

  countryItem({ id }) {
    return this.countrySvc.item({ id }).pipe(
      map((result) => {
        return result.data.item;
      })
    );
  }

  langItems() {
    return this.langSvc.items({ }).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  currencyItems() {
    return this.currencySvc.items({ }).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  identItems() {
    return this.identSvc.items({ }).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  ngOnInit(): void {
    this.form = this.createForm(new Country());
    this.langItems()
      .pipe(
        switchMap((langs) => {
          this.langs = langs;
          // obtenemos el parametro
          return this.identItems();
        }),
        switchMap((idents) => {
          this.idents = idents;
          // obtenemos el parametro
          return this.currencyItems();
        }),
        switchMap((currencies) => {
          this.currencies = currencies;
          // obtenemos el parametro
          return this.routeparam({ key: 'id' });
        }),
        filter((paramId) => paramId != 'new'),
        // filtramos que no sea new
        switchMap((paramId) => {
          this.pageType = 'upd';
          this.id = paramId;
          return this.countryItem({ id: paramId });
        })
      )
      .subscribe((country: ICountry) => {
        this.form = this.createForm(new Country(country));
      });
  }

  createForm(model: Country): FormGroup {
    return this.formBuilder.group({
      countryId: [model.countryId, Validators.compose( [ MyValidator.required, MyValidator.minLength(3) ] ) ],
      name: [model.name, Validators.compose( [ MyValidator.required ] ) ],
      codeStr: [model.codeStr, Validators.compose( [ MyValidator.required, MyValidator.minLength(2) ] ) ],
      codeNum: [model.codeNum, Validators.compose( [ MyValidator.required, MyValidator.maxLength(4) ] ) ],
      icCode: [model.icCode, Validators.compose( [ MyValidator.required, MyValidator.maxLength(10) ] ) ],
      langId: [model.langId, Validators.compose( [ MyValidator.required ] ) ],
      currencyId: [model.currencyId, Validators.compose( [ MyValidator.required ] ) ],
      identId: [model.identId, Validators.compose( [ MyValidator.required ] ) ],
      testing: [model.testing],
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.countrySvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/country']);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.countrySvc
      .updItem({
        id: this.id,
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/country']);
      });
  }

  handleCancel(): void {
    this.router.navigate(['/country']);
  }

}
