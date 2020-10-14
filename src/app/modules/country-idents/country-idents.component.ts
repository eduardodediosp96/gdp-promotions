import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TablePaginationComponent } from '../../shared/core/components/table/table-pagination/table-pagination.component';
import { config, Actions } from './country-idents.config';
import { CountryIdentsService } from './country-idents.service';
import { LoadingOverlayService } from '../../shared/common/components/loading-overlay/loading-overlay.service';
import { ToasterService } from '../../shared/core/services/toaster.service';
import { ICountryIdents, CountryIdents } from './country-idents.interface';
import { filter, switchMap, map } from 'rxjs/operators';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from '../country/country.service';
import { IdentsService } from '../idents/idents.service';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';

@Component({
  selector: 'app-country-idents',
  templateUrl: './country-idents.component.html',
  styleUrls: ['./country-idents.component.scss']
})
export class CountryIdentsComponent implements OnInit {

  config = config;
  statusKey = '';
  statusValue = '';
  filterKey = '';
  filterValue = '';
  filtersAllowed = [];

  @ViewChild(TablePaginationComponent)
  tablePagination: TablePaginationComponent;

  constructor(
    private countryIdentSvc: CountryIdentsService,
    private router: Router,
    private toast: ToasterService,
    private confirmSvc: ConfirmDialogService,

    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private countrySvc: CountryService,
    private identSvc: IdentsService,
  ) {
    this.handleCountryIdent();
  }

  handleCountryIdent(): void {
    let filters: { key: string,  val: string }[] = [];
    this.statusKey && this.statusValue && filters.push( { key: `${this.statusKey}`,  val: `${this.statusValue}`} );
    this.filterKey && this.filterValue && filters.push( { key: `${this.filterKey}`,  val: `${this.filterValue}`} );
    this.countryIdentSvc.items( { headers: filters.length ? [{ key: 'filters', val: JSON.stringify(filters) }] : [] } ).subscribe({
      next: (result) => {
        this.toast.success( { message: result['kindMessage'] } );
        this.tablePagination.chargeDataTable(result.data.items.map(( item, i ) => {
          let actions = config.listActions();
          item['onlyDigits'] = config.onlyDigits[item.onlyDigits].label;
          item['countryName'] = item.country.name;
          item['identName'] = item.ident.name;
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

  handleNew(event: any): void {
  }

  handleFilter(event: any): void {
    this.filterKey = event.filterKey;
    this.filterValue = event.filterValue;
    this.handleCountryIdent();
  }

  handleAction(event): void {
    const actions = Object.values(config.listActions());
    const action = actions.find((item) => item.action === event.action);
    this[action.function](event.row);
  }

  handleEdit(row: ICountryIdents): void {
    this.countryIdentSvc.item({ countryId: row.countryId , identId: row.identId }).subscribe((countryIdent) => {
      this.countryIdent = new CountryIdents(countryIdent.data.item)
      this.form = this.createForm(this.countryIdent);
      this.pageType = 'edit';
    });
  }


  // formulario
  id = '';
  countryIdent: CountryIdents;

  pageType = 'new';
  form: FormGroup;
  langs = [];
  idents = [];
  countries = [];

  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        return params[key];
      })
    );
  }


  countryIdentItem({ countryId, identId }) {
    return this.countryIdentSvc.item({ countryId, identId }).pipe(
      map((result) => {
        return result.data.item;
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

  countryItems() {
    return this.countrySvc.items({}).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  ngOnInit(): void {
    this.form = this.createForm(new CountryIdents());
    this.identItems()
    .pipe(
      switchMap((idents) => {
        this.idents = idents;
        return this.countryItems();
      }),
    )
    .subscribe((countries) => {
      this.countries = countries;
    });
  }

  createForm(model: CountryIdents): FormGroup {
    return this.formBuilder.group({
      countryId: [model.countryId, Validators.compose([MyValidator.required])],
      identId: [model.identId, Validators.compose([MyValidator.required])],
      lenMin: [model.lenMin, Validators.compose([MyValidator.required])],
      lenMax: [model.lenMax, Validators.compose([MyValidator.required])],
      onlyDigits: [model.onlyDigits],
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.onlyDigits = data.onlyDigits ? 1 : 0;
    this.countryIdentSvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.handleCountryIdent();
        this.form = this.createForm(new CountryIdents());
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.onlyDigits = data.onlyDigits ? 1 : 0;
    this.countryIdentSvc
      .updItem({
        ...this.countryIdent,
        body: data,
      })
      .subscribe((result) => {
        this.handleCountryIdent();
        this.form = this.createForm(new CountryIdents());
        this.pageType = 'new';
      });
  }

  handleCancel(): void {
    this.form = this.createForm(new CountryIdents());
    this.pageType = 'new';
  }

}
