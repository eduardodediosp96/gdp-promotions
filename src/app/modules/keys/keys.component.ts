import { Component, OnInit, ViewChild } from '@angular/core';
import { TablePaginationComponent } from '@core/components/table/table-pagination/table-pagination.component';
import { config } from './keys.table-config';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';
import { Router } from '@angular/router';
import { KeysService } from './keys.service';
import { IKeys } from './keys.interface';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit {
  statusKey = '';
  statusValue = '';
  filterKey = '';
  filterValue = '';
  filtersAllowed = [];
  config = config;
  @ViewChild(TablePaginationComponent)
  tablePagination: TablePaginationComponent;
  constructor(private keysSvc: KeysService, private router: Router, private confirmSvc: ConfirmDialogService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    let filters: { key: string; val: string }[] = [];
    this.statusKey && this.statusValue && filters.push({ key: `${this.statusKey}`, val: `${this.statusValue}` });
    this.filterKey && this.filterValue && filters.push({ key: `${this.filterKey}`, val: `${this.filterValue}` });
    this.keysSvc
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
    this.router.navigate([`/keys/write/new`]);
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

  handleEdit(item: IKeys): void {
    this.router.navigate([`/keys/write/${item.keyId}`]);
  }

  handleActive(item: IKeys): void {
    this.confirmSvc
      .confirm({
        msg: `Esta a punto de activar la key (${item.keyId}). ¿Proceder?`,
      })
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.keysSvc.activateItem({ id: item.keyId });
        })
      )
      .subscribe(() => this.loadItems());
  }

  handleDeactive(item: IKeys): void {
    this.confirmSvc
      .confirm({
        msg: `Esta a punto de desactivar la key (${item.keyId}). ¿Proceder?`,
      })
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.keysSvc.deactivateItem({ id: item.keyId });
        })
      )
      .subscribe(() => this.loadItems());
  }
}
