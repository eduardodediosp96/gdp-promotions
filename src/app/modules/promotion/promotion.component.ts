import { copyPromotion } from './../../shared/common/services/copy.service';
import { FilterResources } from './interfaces/filterResources';
import { PromotionFilter } from './interfaces/promotionFilter.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TablePaginationComponent } from '../../shared/core/components/table/table-pagination/table-pagination.component';
import { config, Actions } from './promotion.config';
import { promotionService } from './promotion.service';
import { LoadingOverlayService } from '../../shared/common/components/loading-overlay/loading-overlay.service';
import { ToasterService } from '../../shared/core/services/toaster.service';
import { Ipromotion, Promotion } from './promotion.interface';
import { filter, switchMap } from 'rxjs/operators';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';
import { JsonPipe } from '@angular/common';
import { MyValidator } from '.././../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { FormGroup, Validators, FormBuilder, FormControlName, FormArray } from '@angular/forms';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment =  _moment;
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class promotionComponent implements OnInit {
  // testing
  promoSoource= [new Promotion({
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
 datasource
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
  copiedId:number
  filerString:string
  resources: FilterResources = new FilterResources();

  @ViewChild(TablePaginationComponent)
  tablePagination: TablePaginationComponent;

  constructor(
    private promotionSvc: promotionService,
    private router: Router,
    private loadingOverlay: LoadingOverlayService,
    private toast: ToasterService,
    private confirmSvc: ConfirmDialogService,
    private formBuilder: FormBuilder,
    private copySvc: copyPromotion,
  ) {
    this.handlePromotion();
    this.handleFilters();
    this.formFilter = this.createFilerForm(new PromotionFilter())
    this.copySvc.getCopiedId().subscribe(x =>{
      this.copiedId = x
   })
  }

  ngOnInit(): void {
  }

  createFilerForm(model: PromotionFilter): FormGroup {
    return this.formBuilder.group({
    code: [model.code],
    currencies: [model.currencyId],
    types: [model.code],
    events: [model.events ],
    from: [''],
    fromSelector: [model.fromSelector],
    to: [''],
    toSelector: [model.toSelector],
    ip_redemptions: [model.quantityByIp,Validators.compose( [ MyValidator.required ] )],
    ip_redemptionsSelector: [model.quantityByIpSelector],
    target_users: [model.enableUsers],
    platforms: [model.processors],
    processors: [model.processors],
    active: null,
    condition: null,
    tags: [model.tags],
    });
  }

  filterByCode(event){
    this.filerString = event
    this.filterByCodeFunction()
  }

  filterByCodeFunction(){
    const hasWord = (str, word) => str.includes(word);
    var datasourceaux = []
    this.datasource.map(x =>{
      console.log(x.code)
      if(hasWord(x.code.toLowerCase(),this.filerString.toLowerCase()))
      datasourceaux.push(x)
    })
    this.tablePagination.chargeDataTable(datasourceaux);
  }

  handleResources(): void {
    let filters: { key: string,  val: string }[] = [];
    this.statusKey && this.statusValue && filters.push( { key: `${this.statusKey}`,  val: `${this.statusValue}`} );
    this.filterKey && this.filterValue && filters.push( { key: `${this.filterKey}`,  val: `${this.filterValue}`} );
    this.promotionSvc.resources( { headers: filters.length ? [{ key: 'filters', val: JSON.stringify(filters) }] : [] } ).subscribe({
      next: (result) => {
        console.log('resultado de resources', result)
        this.toast.success( { message: result['kindMessage'] } );
        this.resources = new FilterResources(result.data);
        console.log('resultado de resources', this.resources)
      },
      error: (err) => {
        // this.loadingOverlay.hide();
        this.resources = new FilterResources();
        this.toast.error( { message: err['kindMessage'] } );
      }
    });
  }

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

  handlePromotion(): void {
    this.promotionSvc.items( { headers:[] , params: this.filters.length ? this.filters : [] } ).subscribe({
      next: (result) => {
        console.log('resultado', result)
        this.toast.success( { message: result['kindMessage'] } );
        this.datasource = result.data.items.map(( item, i ) => {
          let actions = config.listActions();
          !item.active && (actions.deactive.show = false);
          item.active && (actions.active.show = false);
          item['active'] = config.active[item.active].label;
          item['testing'] = config.testing[item.testing].label;
          item['actions'] = Object.values(actions);
          return item;
        })
        this.tablePagination.chargeDataTable(this.datasource);
        this.filtersAllowed = result.filtersAllowed;
        this.filterByCodeFunction()
      },
      error: (err) => {
        // this.loadingOverlay.hide();
        this.tablePagination.chargeDataTable(this.promoSoource.map(( item, i ) => {
          let actions = config.listActions();
          !item.active && (actions.deactive.show = false);
          item.active && (actions.active.show = false);
          item['active'] = config.active[item.active].label;
          item['testing'] = config.testing[item.testing].label;
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
    this.handlePromotion()
  }

  handleNew(event: any): void {
    this.copySvc.updatedPromotionWhiteAction('new')
    this.router.navigate([`/promotion/write/new`]);
  }

  handleNewCopied(event: any): void {
    this.copySvc.updatedPromotionWhiteAction('copy')
    this.router.navigate([`/promotion/copiedby/new`]);
  }

  handleAction(event): void {
    const actions = Object.values(config.listActions());
    const action = actions.find((item) => item.action === event.action);
    this[action.function](event.row);
  }

  handleEdit(row: Ipromotion): void {
    this.copySvc.updatedPromotionWhiteAction('edit')
    this.router.navigate([`/promotion/write/${row.promotionId}`]);
  }

  handleActive(item: Ipromotion): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de activar el pais (${item.code}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.promotionSvc.activateItem({ id: item.promotionId });
        })
      )
      .subscribe({
        next: (result) => {
          this.handlePromotion();
          this.toast.success( { message: result['kindMessage'] } );
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }

  handleDeactive(item: Ipromotion): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de desactivar la promocion (${item.code}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.promotionSvc.deactivateItem({ id: item.promotionId });
        })
      )
      .subscribe({
        next: (result) => {
          this.handlePromotion();
          this.toast.success( { message: result['kindMessage'] } );
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }

  handleCopy(row: Ipromotion){
    this.copySvc.updatedCopiedId(row.promotionId)
    console.log('id copiado ',this.copySvc.getCopiedId())
    this.toast.success( { message: `Se copió el código (${row.code})` } );
  }

}
