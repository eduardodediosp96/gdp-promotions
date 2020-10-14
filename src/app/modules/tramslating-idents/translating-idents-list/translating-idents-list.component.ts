import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from './../translate-idents.table-config';
import { TablePaginationComponent } from '@core/components/table/table-pagination/table-pagination.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslatingIdentsService } from '../translating-idents.service';
import { filter, switchMap, map } from 'rxjs/operators';
import { TranslatingIdentsWriteComponent } from '../translating-idents-write/translating-idents-write.component';
import { ITransIdents } from '../translating-idents.interface';

@Component({
  selector: 'app-translating-idents-list',
  templateUrl: './translating-idents-list.component.html',
  styleUrls: ['./translating-idents-list.component.scss'],
})
export class TranslatingIdentsListComponent implements OnInit {
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
    private translateIdentsSvc: TranslatingIdentsService,
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
          return this.translateIdentsSvc.items({
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
    const dialogRef = this.dialog.open(TranslatingIdentsWriteComponent, {
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

  handleEdit(item: ITransIdents): void {
    const dialogRef = this.dialog.open(TranslatingIdentsWriteComponent, {
      disableClose: true,
      maxWidth: 500,
      panelClass: 'app-dialog',
      data: { identId: item.identId, langId: item.langId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadItems();
    });
  }
}
