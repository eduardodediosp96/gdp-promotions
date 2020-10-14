import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from './language.etc';
import { Router } from '@angular/router';
import { TablePaginationComponent } from '@core/components/table/table-pagination/table-pagination.component';
import { LanguagesService } from './languages.service';
import { ILanguage } from './language.interface';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  statusKey = '';
  statusValue = '';
  filterKey = '';
  filterValue = '';
  filtersAllowed = [];
  etc = config;
  @ViewChild(TablePaginationComponent)

  tablePagination: TablePaginationComponent;

  constructor(private langSvc: LanguagesService, private router: Router, private confirmSvc: ConfirmDialogService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  ngAfterViewInit(): void {}

  loadItems() {
    let filters: { key: string; val: string }[] = [];
    this.statusKey && this.statusValue && filters.push({ key: `${this.statusKey}`, val: `${this.statusValue}` });
    this.filterKey && this.filterValue && filters.push({ key: `${this.filterKey}`, val: `${this.filterValue}` });
    this.langSvc
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
    this.router.navigate([`/languages/write/new`]);
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

  handleEdit(item: ILanguage): void {
    this.router.navigate([`/languages/write/${item.langId}`]);
  }

  handleActive(item: ILanguage): void {
    this.confirmSvc
      .confirm({
        msg: `Esta a punto de activar el lenguage (${item.langId}). ¿Proceder?`,
      })
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.langSvc.activateItem({ id: item.langId });
        })
      )
      .subscribe(() => this.loadItems());
  }

  handleDeactive(item: ILanguage): void {
    this.confirmSvc
      .confirm({
        msg: `Esta a punto de desactivar el lenguage (${item.langId}). ¿Proceder?`,
      })
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.langSvc.deactivateItem({ id: item.langId });
        })
      )
      .subscribe(() => this.loadItems());
  }
}
