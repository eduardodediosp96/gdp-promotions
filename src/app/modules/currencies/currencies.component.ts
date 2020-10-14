import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TablePaginationComponent } from '../../shared/core/components/table/table-pagination/table-pagination.component';
import { config, Actions } from './currencies.config';
import { CurrenciesService } from './currencies.service';
import { LoadingOverlayService } from '../../shared/common/components/loading-overlay/loading-overlay.service';
import { ToasterService } from '../../shared/core/services/toaster.service';
import { ICurrency } from './currencies.interface';
import { filter, switchMap } from 'rxjs/operators';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {

  config = config;
  statusKey = '';
  statusValue = '';
  filterKey = '';
  filterValue = '';
  filtersAllowed = [];

  @ViewChild(TablePaginationComponent)
  tablePagination: TablePaginationComponent;

  constructor(
    private currencySvc: CurrenciesService,
    private router: Router,
    private loadingOverlay: LoadingOverlayService,
    private toast: ToasterService,
    private confirmSvc: ConfirmDialogService,
  ) {
    this.handleCurrency();
  }

  ngOnInit(): void {
  }

  handleCurrency(): void {
    let filters: { key: string,  val: string }[] = [];
    this.statusKey && this.statusValue && filters.push( { key: `${this.statusKey}`,  val: `${this.statusValue}`} );
    this.filterKey && this.filterValue && filters.push( { key: `${this.filterKey}`,  val: `${this.filterValue}`} );
    this.currencySvc.items( { headers: filters.length ? [{ key: 'filters', val: JSON.stringify(filters) }] : [] } ).subscribe({
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
    this.handleCurrency();
  }

  handleNew(event: any): void {
    this.router.navigate([`/currencies/write/new`]);
  }

  handleAction(event): void {
    const actions = Object.values(config.listActions());
    const action = actions.find((item) => item.action === event.action);
    this[action.function](event.row);
  }

  handleEdit(row: ICurrency): void {
    this.router.navigate([`/currencies/write/${row.currencyId}`]);
  }

  handleActive(item: ICurrency): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de activar el pais (${item.currencyId}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.currencySvc.activateItem({ id: item.currencyId });
        })
      )
      .subscribe({
        next: (result) => {
          this.handleCurrency();
          this.toast.success( { message: result['kindMessage'] } );
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }

  handleDeactive(item: ICurrency): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de desactivar el pais (${item.currencyId}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.currencySvc.deactivateItem({ id: item.currencyId });
        })
      )
      .subscribe({
        next: (result) => {
          this.handleCurrency();
          this.toast.success( { message: result['kindMessage'] } );
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }

}
