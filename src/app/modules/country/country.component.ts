import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TablePaginationComponent } from '../../shared/core/components/table/table-pagination/table-pagination.component';
import { config, Actions } from './country.config';
import { CountryService } from './country.service';
import { LoadingOverlayService } from '../../shared/common/components/loading-overlay/loading-overlay.service';
import { ToasterService } from '../../shared/core/services/toaster.service';
import { ICountry } from './country.interface';
import { filter, switchMap } from 'rxjs/operators';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  config = config;
  statusKey = '';
  statusValue = '';
  filterKey = '';
  filterValue = '';
  filtersAllowed = [];

  @ViewChild(TablePaginationComponent)
  tablePagination: TablePaginationComponent;

  constructor(
    private countrySvc: CountryService,
    private router: Router,
    private loadingOverlay: LoadingOverlayService,
    private toast: ToasterService,
    private confirmSvc: ConfirmDialogService,
  ) {
    this.handleCountry();
  }

  ngOnInit(): void {
  }

  handleCountry(): void {
    let filters: { key: string,  val: string }[] = [];
    this.statusKey && this.statusValue && filters.push( { key: `${this.statusKey}`,  val: `${this.statusValue}`} );
    this.filterKey && this.filterValue && filters.push( { key: `${this.filterKey}`,  val: `${this.filterValue}`} );
    this.countrySvc.items( { headers: filters.length ? [{ key: 'filters', val: JSON.stringify(filters) }] : [] } ).subscribe({
      next: (result) => {
        this.toast.success( { message: result['kindMessage'] } );
        this.tablePagination.chargeDataTable(result.data.items.map(( item, i ) => {
          let actions = config.listActions();
          !item.active && (actions.deactive.show = false);
          item.active && (actions.active.show = false);
          item['active'] = config.active[item.active].label;
          item['testing'] = config.testing[item.testing].label;
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
    this.statusKey = config.active[event.status].key;
    this.statusValue = config.active[event.status].value;
    this.filterKey = event.filterKey;
    this.filterValue = event.filterKey ? config.filterValues[event.filterKey][event.filterValue.toLowerCase()] : '';
    this.handleCountry();
  }

  handleNew(event: any): void {
    this.router.navigate([`/country/write/new`]);
  }

  handleAction(event): void {
    const actions = Object.values(config.listActions());
    const action = actions.find((item) => item.action === event.action);
    this[action.function](event.row);
  }

  handleEdit(row: ICountry): void {
    this.router.navigate([`/country/write/${row.countryId}`]);
  }

  handleActive(item: ICountry): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de activar el pais (${item.countryId}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.countrySvc.activateItem({ id: item.countryId });
        })
      )
      .subscribe({
        next: (result) => {
          this.handleCountry();
          this.toast.success( { message: result['kindMessage'] } );
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }

  handleDeactive(item: ICountry): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de desactivar el pais (${item.countryId}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.countrySvc.deactivateItem({ id: item.countryId });
        })
      )
      .subscribe({
        next: (result) => {
          this.handleCountry();
          this.toast.success( { message: result['kindMessage'] } );
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }

}
