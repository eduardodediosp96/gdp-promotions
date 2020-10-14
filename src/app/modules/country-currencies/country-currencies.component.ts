import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TablePaginationComponent } from '../../shared/core/components/table/table-pagination/table-pagination.component';
import { config, Actions } from './country-currencies.config';
import { CountryCurrenciesService } from './country-currencies.service';
import { LoadingOverlayService } from '../../shared/common/components/loading-overlay/loading-overlay.service';
import { ToasterService } from '../../shared/core/services/toaster.service';
import { ICountryCurrency, CountryCurrency } from './country-currencies.interface';
import { filter, switchMap, map } from 'rxjs/operators';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from '../country/country.service';
import { CurrenciesService } from '../currencies/currencies.service';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';

@Component({
  selector: 'app-country-currencies',
  templateUrl: './country-currencies.component.html',
  styleUrls: ['./country-currencies.component.scss']
})
export class CountryCurrenciesComponent implements OnInit {

  config = config;
  statusKey = '';
  statusValue = '';
  filterKey = '';
  filterValue = '';
  filtersAllowed = [];

  @ViewChild(TablePaginationComponent)
  tablePagination: TablePaginationComponent;

  constructor(
    private countryCurrencySvc: CountryCurrenciesService,
    private router: Router,
    private loadingOverlay: LoadingOverlayService,
    private toast: ToasterService,
    private confirmSvc: ConfirmDialogService,

    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private countrySvc: CountryService,
    private currencySvc: CurrenciesService,
  ) {
    this.handleCountryCurrency();
  }

  handleCountryCurrency(): void {
    let filters: { key: string,  val: string }[] = [];
    this.statusKey && this.statusValue && filters.push( { key: `${this.statusKey}`,  val: `${this.statusValue}`} );
    this.filterKey && this.filterValue && filters.push( { key: `${this.filterKey}`,  val: `${this.filterValue}`} );
    this.countryCurrencySvc.items( { headers: filters.length ? [{ key: 'filters', val: JSON.stringify(filters) }] : [] } ).subscribe({
      next: (result) => {
        this.toast.success( { message: result['kindMessage'] } );
        this.tablePagination.chargeDataTable(result.data.items.map(( item, i ) => {
          let actions = config.listActions();
          item['countryName'] = item.country.name;
          item['currencyName'] = item.currency.nameSingular;
          item['actions'] = Object.values(actions);
          return item;
        }));
        this.filtersAllowed = result.filtersAllowed;
      },
      error: (err) => {
        // this.loadingOverlay.hide();
        this.toast.error( { message: err['kindMessage'] } );
      }
    });
  }

  handleFilter(event: any): void {
    this.filterKey = event.filterKey;
    this.filterValue = event.filterValue;
    this.handleCountryCurrency();
  }

  handleNew(event: any): void {
  }

  handleAction(event): void {
    const actions = Object.values(config.listActions());
    const action = actions.find((item) => item.action === event.action);
    this[action.function](event.row);
  }

  handleEdit(row: ICountryCurrency): void {
    this.countryCurrencyItem({ countryId: row.countryId , currencyId: row.currencyId }).subscribe((countryCurrency) => {
      this.countryCurrency = new CountryCurrency(countryCurrency)
      this.form = this.createForm(this.countryCurrency);
      this.pageType = 'edit';
    });
  }


  // formulario
  id = '';
  countryCurrency: CountryCurrency;

  pageType = 'new';
  form: FormGroup;
  langs = [];
  currencies = [];
  countries = [];

  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        return params[key];
      })
    );
  }


  countryCurrencyItem({ countryId, currencyId }) {
    return this.countryCurrencySvc.item({ countryId, currencyId }).pipe(
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

  countryItems() {
    return this.countrySvc.items({}).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  ngOnInit(): void {
    this.form = this.createForm(new CountryCurrency());
    this.currencyItems()
    .pipe(
      switchMap((currencies) => {
        this.currencies = currencies;
        return this.countryItems();
      }),
    )
    .subscribe((countries) => {
      this.countries = countries;
    });
  }

  createForm(model: CountryCurrency): FormGroup {
    return this.formBuilder.group({
      countryId: [model.countryId, Validators.compose([MyValidator.required])],
      currencyId: [model.currencyId, Validators.compose([MyValidator.required])],
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.countryCurrencySvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.handleCountryCurrency();
        this.form = this.createForm(new CountryCurrency());
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.countryCurrencySvc
      .updItem({
        ...this.countryCurrency,
        body: data,
      })
      .subscribe((result) => {
        this.handleCountryCurrency();
        this.form = this.createForm(new CountryCurrency());
        this.pageType = 'new';
      });
  }

  handleCancel(): void {
    this.form = this.createForm(new CountryCurrency());
    this.pageType = 'new';
  }

}
