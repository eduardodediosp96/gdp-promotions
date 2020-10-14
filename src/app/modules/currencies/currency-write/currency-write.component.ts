import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrenciesService } from '../currencies.service';
import { Currency, ICurrency } from '../currencies.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MyValidator } from './../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { ToasterService } from '../../../shared/core/services/toaster.service';
import { LoadingOverlayService } from '../../../shared/common/components/loading-overlay/loading-overlay.service';
import { map, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-currency-write',
  templateUrl: './currency-write.component.html',
  styleUrls: ['./currency-write.component.scss']
})
export class CurrencyWriteComponent implements OnInit {

  id = '';
  currency: Currency;

  pageType = 'new';
  form: FormGroup;
  langs = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private currencySvc: CurrenciesService,
    private formBuilder: FormBuilder,
    private toast: ToasterService,
  ) { }

  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        return params[key];
      })
    );
  }

  currencyItem({ id }) {
    return this.currencySvc.item({ id }).pipe(
      map((result) => {
        return result.data.item;
      })
    );
  }

  ngOnInit(): void {
    this.form = this.createForm(new Currency());
    this.routeparam({ key: 'id' })
      .pipe(
        // filtramos que no sea new
        filter((paramId) => paramId != 'new'),
        switchMap((paramId) => {
          this.pageType = 'upd';
          this.id = paramId;
          return this.currencyItem({ id: paramId });
        })
      )
      .subscribe((currency: ICurrency) => {
        this.form = this.createForm(new Currency(currency));
      });
  }

  createForm(model: Currency): FormGroup {
    return this.formBuilder.group({
      currencyId: [model.currencyId, Validators.compose( [ MyValidator.required, MyValidator.minLength(3) ] ) ],
      nameSingular: [model.nameSingular, Validators.compose( [ MyValidator.required ] ) ],
      namePlural: [model.namePlural, Validators.compose( [ MyValidator.required ] ) ],
      symbol: [model.symbol, Validators.compose( [ MyValidator.required, MyValidator.maxLength(10) ] ) ],
      testing: [model.testing],
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.currencySvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/currencies']);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.currencySvc
      .updItem({
        id: this.id,
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/currencies']);
      });
  }

  handleCancel(): void {
    this.router.navigate(['/currencies']);
  }

}
