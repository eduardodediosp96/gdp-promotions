import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from './calling-code.table-config';
import { TablePaginationComponent } from '@core/components/table/table-pagination/table-pagination.component';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';
import { Router } from '@angular/router';
import { ICallingCode } from './calling-codes.interface';
import { CallingCodesService } from './calling-codes.service';
import { filter, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-calling-codes',
  templateUrl: './calling-codes.component.html',
  styleUrls: ['./calling-codes.component.scss'],
})
export class CallingCodesComponent implements OnInit {
  statusKey = '';
  statusValue = '';
  filterKey = '';
  filterValue = '';
  filtersAllowed = [];
  config = config;
  @ViewChild(TablePaginationComponent)
  tablePagination: TablePaginationComponent;
  constructor(private callingCodesSvc: CallingCodesService, private router: Router, private confirmSvc: ConfirmDialogService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    let filters: { key: string; val: string }[] = [];
    this.statusKey && this.statusValue && filters.push({ key: `${this.statusKey}`, val: `${this.statusValue}` });
    this.filterKey && this.filterValue && filters.push({ key: `${this.filterKey}`, val: `${this.filterValue}` });
    this.callingCodesSvc
      .items({ headers: filters.length ? [{ key: 'filters', val: JSON.stringify(filters) }] : [] })
      .subscribe((result) => {
        const items = result.data.items || [];
        this.tablePagination.chargeDataTable(
          items.map((item, i) => {
            const actions1 = config.listActions();
            item.active ? (actions1.active.show = false) : (actions1.deactive.show = false);
            item['active'] = config.active[item.active].label;
            item['testing'] = config.testing[item.testing].label;
            item['actions'] = Object.values(actions1);
            return item;
          })
        );
        this.filtersAllowed = result.filtersAllowed;
      });
  }

  handleNew(event: any): void {
    this.router.navigate([`/calling-codes/write/new`]);
  }

  handleFilter(event: any): void {
    this.statusKey = config.active[event.status].key;
    this.statusValue = config.active[event.status].value;
    this.filterKey = event.filterKey;
    this.filterValue = event.filterKey ? config.filterValues[event.filterKey][event.filterValue.toLowerCase()] : '';
    this.loadItems();
  }

  handleAction(event): void {
    const actions = Object.values(config.listActions());
    const action = actions.find((item) => item.action === event.action);
    this[action.function](event.row);
  }

  handleEdit(item: ICallingCode): void {
    this.router.navigate([`/calling-codes/write/${item.icCode}`]);
  }

  handleActive(item: ICallingCode): void {
    this.confirmSvc
      .confirm({
        msg: `Esta a punto de activar el codigo de llamada (${item.icCode}). ¿Proceder?`,
      })
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.callingCodesSvc.activateItem({ id: item.icCode });
        })
      )
      .subscribe(() => this.loadItems());
  }

  handleDeactive(item: ICallingCode): void {
    this.confirmSvc
      .confirm({
        msg: `Esta a punto de desactivar el codigo de llamada (${item.icCode}). ¿Proceder?`,
      })
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.callingCodesSvc.deactivateItem({ id: item.icCode });
        })
      )
      .subscribe(() => this.loadItems());
  }

}
