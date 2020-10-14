import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslatingCountriesWriteComponent } from 'app/modules/translating-countries/translating-countries-write/translating-countries-write.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguagesService } from 'app/modules/languages/languages.service';
import { CountryService } from 'app/modules/country/country.service';
import { TranslatingCountriesService } from 'app/modules/translating-countries/translating-countries.service';
import { ITransCountry, TransCountry } from 'app/modules/translating-countries/transalting-countries-list/translating-countries.interface';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';
import { CurrenciesService } from 'app/modules/currencies/currencies.service';
import { map, switchMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { TranslatingCurrenciesService } from '../translating-currencies.service';
import { ITransCurrency } from '../translating-countries.interface';

@Component({
  selector: 'app-translating-currencies-write',
  templateUrl: './translating-currencies-write.component.html',
  styleUrls: ['./translating-currencies-write.component.scss']
})
export class TranslatingCurrenciesWriteComponent implements OnInit {
  id;
  pageType = 'new';
  form: FormGroup;
  currencies = [];
  languages = [];
  langId;
  constructor(
    public dialogRef: MatDialogRef<TranslatingCountriesWriteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private langSvc: LanguagesService,
    private countrySvc: CountryService,
    private tansCurrencySvc: TranslatingCurrenciesService,
    private currencySvc: CurrenciesService,
  ) { }

  ngOnInit(): void {
    //+
    this.form = this.createForm(new TransCountry());
    this.data = this.data || {};
    // paises
    this.currencyItems()
      .pipe(
        switchMap((currencies) => {
          this.currencies = currencies;
          return this.langItems();
        }),
        switchMap((languages) => {
          this.languages = languages;
          this.langId = this.data.langId;
          this.form.controls.langId.setValue(this.langId);
          return of({ currencyId: this.data.currencyId, langId: this.data.langId });
        }),
        filter((item) => item.currencyId && item.langId),
        switchMap((item) => {
          this.pageType = 'upd';
          return this.itemTranslateCurrencies(item);
        })
      )
      .subscribe((item) => {
        this.form = this.createForm(item);
      });
  }

  createForm(model: ITransCurrency): FormGroup {
    return this.formBuilder.group({
      currencyId: [
        model.currencyId,
        Validators.compose([MyValidator.required, MyValidator.minLength(1), MyValidator.maxLength(5)]),
      ],
      nameSingular: [model.nameSingular, Validators.compose([MyValidator.required])],
      namePlural: [model.namePlural, Validators.compose([MyValidator.required])],
      langId: [model.langId],
    });
  }

  itemTranslateCurrencies({ currencyId, langId }) {
    return this.tansCurrencySvc.item({ currencyId, langId }).pipe(
      map((result) => {
        return result.data.item;
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

  langItems() {
    return this.langSvc.items({}).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.tansCurrencySvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.dialogRef.close(true);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.tansCurrencySvc
      .updItem({
        currencyId: this.data.currencyId,
        langId: this.data.langId,
        body: data,
      })
      .subscribe((result) => {
        this.dialogRef.close(true);
      });
  }

}
