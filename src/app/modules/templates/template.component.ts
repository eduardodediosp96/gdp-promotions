import { promotionService } from './../promotion/promotion.service'
import { TemplateFilter } from './interfaces/templateFilter';
import { FilterResources } from './../promotion/interfaces/filterResources';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TablePaginationComponent } from '../../shared/core/components/table/table-pagination/table-pagination.component';
import { config, Actions } from './template.config';
import { templateService } from './template.service';
import { LoadingOverlayService } from '../../shared/common/components/loading-overlay/loading-overlay.service';
import { ToasterService } from '../../shared/core/services/toaster.service';
import { Itemplate, Template } from './template.interface';
import { filter, switchMap } from 'rxjs/operators';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class templateComponent implements OnInit {
  promoSoource= [new Template({
    "code":"12341234234324",
    "currencyId":"CAD",
    "typeId":"promop",
    "template":"false",
    "description":"1234234",
    "lifeStart":"2020-10-10",
    "lifeEnd":"2020-11-10",
    "bonus":"12343",
    "amountStart":"1234",
    "amountEnd":"1234",
    "paymentLimit":"1234234",
    "quantityByIp":"1234",
    "quantityByUser":"0",
    "quantityTotal":"1",
    "frequency":"24",
    "restrictionFactor":"2314234",
    "appliesTo":"obo",
    "enableUsers":[
       "dep",
       "ndp"
    ],
    "active":1,
    "testing":0,
    "setUserId":123,
    "playthrough":true,
    "tags":[

    ],
    "processors":[
       "SKRILL",
       "PAYCIPS"
    ],
    "platforms":[
       "blank",
       "Tiempo de espera de rollback",
       "Telegram Send Message endpoint Timeout"
    ],
    "events":[
       "NEWUSER",
       "PURCHASE"
    ],
    "information":[
       {
          "langId":"en",
          "text":"<p>1234234</p>"
       },
       {
          "langId":"es",
          "text":"<p>1234234</p>"
       },
       {
          "langId":"pt",
          "text":"<p>1234234</p>"
       }
    ]
 })]
  config = config;
  statusKey = '';
  statusValue = '';
  filterKey = '';
  filterKeys = [];
  filterValue = '';
  filterValues = [];
  filtersAllowed = [];
  filters =[]
  formFilter:FormGroup;
  resources: FilterResources = new FilterResources();

  @ViewChild(TablePaginationComponent)
  tablePagination: TablePaginationComponent;

  constructor(
    private templateSvc: templateService,
    private promotionSvc: promotionService,
    private router: Router,
    private loadingOverlay: LoadingOverlayService,
    private toast: ToasterService,
    private confirmSvc: ConfirmDialogService,
    private formBuilder: FormBuilder,
  ) {
    this.handleTemplate();
    this.handleFilters();
    this.formFilter = this.createFilerForm(new TemplateFilter())
  }

  ngOnInit(): void {
  }

  createFilerForm(model: TemplateFilter): FormGroup {
    return this.formBuilder.group({
    templateName: [model.templateName],
    currencies: [model.currencyId],
    types: [model.typeId],
    events: [model.events ],
    platforms: [model.processors],
    processors: [model.processors],
    });
  }

  // handleResources(): void {
  //   let filters: { key: string,  val: string }[] = [];
  //   this.statusKey && this.statusValue && filters.push( { key: `${this.statusKey}`,  val: `${this.statusValue}`} );
  //   this.filterKey && this.filterValue && filters.push( { key: `${this.filterKey}`,  val: `${this.filterValue}`} );
  //   this.promotionSvc.resources( { headers: filters.length ? [{ key: 'filters', val: JSON.stringify(filters) }] : [] } ).subscribe({
  //     next: (result) => {
  //       console.log('resultado de resources', result)
  //       this.toast.success( { message: result['kindMessage'] } );
  //       this.resources = new FilterResources(result.data);
  //       console.log('resultado de resources', this.resources)
  //     },
  //     error: (err) => {
  //       // this.loadingOverlay.hide();
  //       this.resources = new FilterResources();
  //       this.toast.error( { message: err['kindMessage'] } );
  //     }
  //   });
  // }

  handleFilters(): void {
    let filters: { key: string,  val: string }[] = [];
    this.statusKey && this.statusValue && filters.push( { key: `${this.statusKey}`,  val: `${this.statusValue}`} );
    this.promotionSvc.filters( { headers: filters.length ? [{ key: 'filters', val: JSON.stringify(filters) }] : [] } ).subscribe({
      next: (result) => {
        console.log('resultado de filters', result)
        this.toast.success( { message: result['kindMessage'] } );
        this.resources = new FilterResources(result.data);
        console.log('resultado de filters', this.resources)
      },
      error: (err) => {
        // this.loadingOverlay.hide();
        this.resources = new FilterResources();
        this.toast.error( { message: err['kindMessage'] } );
      }
    });
  }

  handleTemplate(): void {
    this.templateSvc.items( { headers:[] , params: this.filters.length ? this.filters : [] } ).subscribe({
      next: (result) => {
        console.log('resultado', result)
        this.toast.success( { message: result['kindMessage'] } );
        this.tablePagination.chargeDataTable(result.data.items.map(( item, i ) => {
          let actions = config.listActions();
          item['actions'] = Object.values(actions);
          return item;
        }));
        this.filtersAllowed = result.filtersAllowed;
      },
      error: (err) => {
        // this.loadingOverlay.hide();
        this.tablePagination.chargeDataTable(this.promoSoource.map(( item, i ) => {
          let actions = config.listActions();
          item['actions'] = Object.values(actions);
          return item;
        }))
        this.toast.error( { message: err['kindMessage'] } );
      }
    });
  }

  handleFilter(event: any): void {
    this.filters = event
    this.toast.success( { message: 'Filtros Agregados!' } );
    this.handleTemplate()
  }

  handleNew(event: any): void {
    this.router.navigate([`/promotion/fomrtemp/new`]);
  }

  handleAction(event): void {
    const actions = Object.values(config.listActions());
    const action = actions.find((item) => item.action === event.action);
    this[action.function](event.row);
  }

  handleCreateUsing(row: Itemplate): void {
    this.router.navigate([`/promotion/fomrtemp/${row.templateId}`]);
  }

  handleActive(item: Itemplate): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de activar el pais (${item.templateId}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.templateSvc.activateItem({ id: item.templateId });
        })
      )
      .subscribe({
        next: (result) => {
          this.handleTemplate();
          this.toast.success( { message: result['kindMessage'] } );
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }

  handleDeactive(item: Itemplate): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de desactivar la promocion (${item.templateId}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.templateSvc.deactivateItem({ id: item.templateId });
        })
      )
      .subscribe({
        next: (result) => {
          this.handleTemplate();
          this.toast.success( { message: result['kindMessage'] } );
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }

  handleCopy(){

  }

}
