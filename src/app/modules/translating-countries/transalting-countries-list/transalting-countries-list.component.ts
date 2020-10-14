import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from './translate-country.table-config';
import { TranslatingCountriesService } from '../translating-countries.service';
import { TablePaginationComponent } from '@core/components/table/table-pagination/table-pagination.component';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TransCountry } from './translating-countries.interface';
import { map, switchMap, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TranslatingCountriesWriteComponent } from '../translating-countries-write/translating-countries-write.component';

@Component({
  selector: 'app-transalting-countries-list',
  templateUrl: './transalting-countries-list.component.html',
  styleUrls: ['./transalting-countries-list.component.scss'],
})
export class TransaltingCountriesListComponent implements OnInit {
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
    private translateCountriesSvc: TranslatingCountriesService,
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
          return this.translateCountriesSvc.items({
            headers: [{ key: 'filters', val: JSON.stringify([{ key: 'langId', val: paramId }]) }],
          });
        })
      )
      .subscribe((result) => {
        const items = result.data.items || [];
        this.tablePagination.chargeDataTable(
          items.map((item, i) => {
            const actions1 = config.listActions();
            item['nameOriginal'] = item.country.name;
            item['translate'] = item.name;
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
    const dialogRef = this.dialog.open(TranslatingCountriesWriteComponent, {
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

  handleEdit(item: TransCountry): void {
    const dialogRef = this.dialog.open(TranslatingCountriesWriteComponent, {
      disableClose: true,
      maxWidth: 500,
      panelClass: 'app-dialog',
      data: { countryId: item.countryId, langId: item.langId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadItems();
    });
  }
}
