import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from '../translating-keys.table-config';
import { TablePaginationComponent } from '@core/components/table/table-pagination/table-pagination.component';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslatingKeysService } from '../translating-keys.service';
import { filter, switchMap, map } from 'rxjs/operators';
import { ITransKey } from '../translating-keys.interface';
import { TranslatingKeysWriteComponent } from '../translating-keys-write/translating-keys-write.component';
@Component({
  selector: 'app-translating-keys-list',
  templateUrl: './translating-keys-list.component.html',
  styleUrls: ['./translating-keys-list.component.scss'],
})
export class TranslatingKeysListComponent implements OnInit {
  statusKey = '';
  statusValue = '';
  filterKey = '';
  filterValue = '';
  filtersAllowed = [];
  config = config;
  langId;
  @ViewChild(TablePaginationComponent)
  tablePagination: TablePaginationComponent;
  constructor(
    private translateKeysSvc: TranslatingKeysService,
    private router: Router,
    private confirmSvc: ConfirmDialogService,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.loadItems();
  }

  loadItems() {
    let filters: { key: string; val: string }[] = [];
    this.routeparam({ key: 'id' })
      .pipe(
        filter((paramId) => paramId),
        switchMap((paramId) => {
          this.langId = paramId;
          return this.translateKeysSvc.items({
            headers: [{ key: 'filters', val: JSON.stringify([{ key: 'langId', val: paramId }]) }],
          });
        })
      )
      .subscribe((result) => {
        const items = result.data.items || [];
        this.tablePagination.chargeDataTable(
          items.map((item, i) => {
            const actions1 = config.listActions();
            item['actions'] = Object.values(actions1);
            return item;
          })
        );
        this.filtersAllowed = result.filtersAllowed;
      });
  }

  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        return params[key];
      })
    );
  }

  handleNew(event: any): void {
    const dialogRef = this.dialog.open(TranslatingKeysWriteComponent, {
      disableClose: true,
      maxWidth: 500,
      panelClass: 'app-dialog',
      data: { langId: this.langId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadItems();
    });
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

  handleEdit(item: ITransKey): void {
    const dialogRef = this.dialog.open(TranslatingKeysWriteComponent, {
      disableClose: true,
      maxWidth: 500,
      panelClass: 'app-dialog',
      data: { keyId: item.keyId, langId: item.langId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadItems();
    });
  }
}
