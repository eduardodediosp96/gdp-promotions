import { copyPromotion } from './../../../shared/common/services/copy.service';
import { Resources } from './../interfaces/resources.interface';
import { Promotion } from './../promotion.interface';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { promotionService } from '../promotion.service';
import { Ipromotion } from '../promotion.interface';
import { FormGroup, Validators, FormBuilder, FormControlName, FormArray } from '@angular/forms';
import { MyValidator } from '../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { ToasterService } from '../../../shared/core/services/toaster.service';
import { LanguagesService } from '../../languages/languages.service';
import { map, switchMap, filter } from 'rxjs/operators';
import { CurrenciesService } from 'app/modules/currencies/currencies.service';
import { IdentsService } from 'app/modules/idents/idents.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import * as _moment from 'moment';
import { Moment } from 'moment';


import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {startWith} from 'rxjs/operators';
import { ConstantPool } from '@angular/compiler';
export interface Vegetable {
  name: string;
}
const moment =  _moment;
@Component({
  selector: 'app-promotion-write',
  templateUrl: './promotion-write.component.html',
  styleUrls: ['./promotion-write.component.scss']
})
export class promotionWriteComponent implements OnInit {
  id:any;
  itsEverythingCharged:boolean = false
  keyParam:any;
  statusKey = '';
  statusValue = '';
  filterKey = '';
  filterValue = '';
  filtersAllowed = [];
  resources:any = {};
  suffix:any = '';
  promotion: Promotion;
  pageType:string;
  visible=true
  selectable =true
  removable =true
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags = [];
  selectedTabs = new FormControl(0);
  tabs = [];
  allTags: string[] = [];
  form:FormGroup;
  loadedPromo: any;
  unamePattern = "^[a-z0-9_]{8,15}$";
  minDate = moment();

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private promotionSvc: promotionService,
    private formBuilder: FormBuilder,
    private toast: ToasterService,
    private route: ActivatedRoute,
    private copySvc: copyPromotion
  ) {
    this.copySvc.getPromotionWhiteAction().subscribe(x =>{
      console.log('q esperas',  x)
      this.pageType = x
      console.log('q esperas',  this.pageType)
   })
    route.data
    .subscribe(route =>{
      this.resources =  route['resoruces'].data
      route['promotion']?this.loadedPromo = route['promotion'].data:''
      if(this.loadedPromo == null){
        this.form = this.createForm(new Promotion())
        this.ifIcreate()
      }else{
        this.id = this.loadedPromo.item.promotionId
        var aux: any = new Promotion(route['promotion'].data)
        this.form = this.createForm(new Promotion(aux.item))
      }
      this.createInformationArrayForm()
      console.log('estos son los recurso ya cargados',this.resources)
      console.log('estos es el usuario que viene',this.loadedPromo)
      console.log('este es el form ya creado',this.form.value)
      console.log('este es el id del usuario',this.id)
    })
  }

  ngOnInit(): void {
    if(this.pageType !='new'){
      this.loadCustomControls(this.loadedPromo)
    }
  }

  ngAfterViewInit(): void {
      this.whenSelectorsTurnCustomized()
  }

  // FORM CREATE FUNCTIONS
  get information() {
    return this.form.get('information') as FormArray
  }

  createInformationArrayForm() {
    console.log('para este punto tengo los recursos??: ')
    console.log(this.resources.langs)
    this.resources.langs.map( x => {
      const fg = this.formBuilder.group({
        langId: x.langId,
        text:''
      })
      this.information.push(fg)
    })
  }

  createForm(model: Promotion): FormGroup {
    // validando items esternos desde load
    return this.formBuilder.group({
      code: [model.code, Validators.compose(
        [MyValidator.alphanumeric,
          MyValidator.required,
          MyValidator.maxLength(50)
        ])],
      currencyId: [model.currencyId, Validators.compose(
        [ MyValidator.required,] )],
      typeId: [
        model.typeId, Validators.compose(
        [ MyValidator.required])],
      template: [model.template], //q fue?
      description: [model.description, MyValidator.maxLength(250)],
      lifeStart: [moment().format(moment.HTML5_FMT.DATE), Validators.compose( [ MyValidator.required ] ), ],
      lifeEnd: [moment().add(1, 'M').format(moment.HTML5_FMT.DATE), Validators.compose( [ MyValidator.required ] ) ],
      bonus: [model.bonus, Validators.compose( [ MyValidator.required ,MyValidator.maxLength(8) ] ) ],
      amountStart: [model.amountStart, Validators.compose( [ MyValidator.required,MyValidator.maxLength(8) ] ) ],
      amountEnd: [{value: model.amountEnd, disabled: true}, Validators.compose(
        [
          MyValidator.required,
          MyValidator.min(model.amountStart),
          MyValidator.maxLength(8)
        ]
      )],
      paymentLimit: [{value: model.paymentLimit, disabled: true},Validators.compose(
        [
          MyValidator.required,
          MyValidator.maxLength(8)
        ]
      )],
      quantityByIp: [model.quantityByIp, Validators.compose( [ MyValidator.required,MyValidator.maxLength(8) ] ) ],
      quantityByUser: [model.quantityByUser ,Validators.compose( [ MyValidator.required,MyValidator.maxLength(8) ] )],
      quantityTotal: [model.quantityTotal,Validators.compose( [ MyValidator.required,MyValidator.maxLength(8) ] )],
      frequency: [model.frequency,Validators.compose(
        [
          MyValidator.required,
          MyValidator.maxLength(8)
        ]
      )],
      restrictionFactor: [{value: model.restrictionFactor, disabled: true},Validators.compose(
        [
          MyValidator.required,
          MyValidator.maxLength(8)
        ]
      )],
      appliesTo: [{value: model.appliesTo, disabled: true},Validators.compose(
        [
          MyValidator.required,
        ]
      )],
      enableUsers: [model.enableUsers, Validators.compose( [ MyValidator.required ] ) ],
      active: [model.active, Validators.compose( [ MyValidator.required ] ) ],
      testing: [model.testing, Validators.compose( [ MyValidator.required ] ) ],
      setUserId: [model.setUserId],
      playthrough: [model.playthrough, Validators.compose( [ MyValidator.required ] ) ],
      tags: [model.tags],
      processors: [model.processors, Validators.compose( [ MyValidator.required ] ) ],
      platforms: [model.platforms, Validators.compose( [ MyValidator.required ] ) ],
      events: [model.events, Validators.compose( [ MyValidator.required ] ) ],
      information: this.formBuilder.array([]),
      // controles del formulario
      quantityByUserSelector:0,
      quantityTotalSelector:0,
      frequencySelector:0,
      isThereFinalAmount:false,
      isTherePaymentLimit:false,
      isTherePlaythrough:false
    });
  }

  // HANDLE FUNCTIONS
  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.promotionSvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/promotion']);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.promotionSvc
      .updItem({
        id: this.id,
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/promotion']);
      });
  }

  handleCancel(): void {
    this.router.navigate(['/promotion']);
  }


  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        this.keyParam = params[key];
      })
    );
  }

// CHIPS FUNCTIONS
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagsCtrl.setValue(null);
    this.form.get('tags').setValue(this.tags);
  }


  remove(tag: string): void {
    console.log('q fue',tag)
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    console.log('q fue',this.tags)
    this.tagsCtrl.setValue(null);
    this.form.get('tags').setValue(this.tags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.form.get('tagsCtrl').setValue(this.tags);
    this.tagsCtrl.setValue(null);
    this.form.get('tags').setValue(this.tags);
  }

  //DATE FUNCTIONS
  changeDate(event){
    var inpuName = (event.controlName || '')
    this.form.get(inpuName).setValue(event.value.format(moment.HTML5_FMT.DATE))
  }

  //VALIDATIONS
    whenSelectorsTurnCustomized(){
      // resources.currencies
      this.form.get('lifeStart').valueChanges.subscribe(val => {
        this.minDate = moment(this.form.get('lifeStart').value)
      })

      this.form.get('currencyId').valueChanges.subscribe(val => {
        this.resources.currencies.map(x => {
          if(x.currencyId == val)
          this.suffix = ' '+ x.symbol
          if(this.form.get('typeId').value == "promop")
          this.suffix = ' %'
        })
      })

      this.form.get('typeId').valueChanges.subscribe(val => {
        switch (val) {
          case 'coupon':
            this.form.get('amountEnd').disable()
            this.form.get('amountStart').disable()
            this.form.get('isThereFinalAmount').disable()
            this.form.get('amountEnd').clearValidators();
            this.form.get('bonus').setValidators(
              Validators.compose( [
                MyValidator.required,
              ],
            ))
            this.form.get('bonus').setValue(this.form.get('bonus').value)
            break;

          case 'topup':
            this.form.get('amountEnd').disable()
            this.form.get('amountStart').disable()
            this.form.get('isThereFinalAmount').disable()
            this.form.get('amountEnd').clearValidators();
            this.form.get('bonus').setValidators(
              Validators.compose( [
                MyValidator.required,
              ],
            ))
            this.form.get('bonus').setValue(this.form.get('bonus').value)
            break;

          case 'promop':
            this.suffix = ' %'
            this.form.get('amountEnd').enable()
            this.form.get('amountStart').enable()
            this.form.get('isThereFinalAmount').enable()
            this.form.get('bonus').setValidators(
              Validators.compose( [
                MyValidator.required,
                MyValidator.min(0),
                MyValidator.max(100),
              ],
            ))
            this.form.get('bonus').setValue(this.form.get('bonus').value)
            break;

          default:
            this.form.get('amountEnd').enable()
            this.form.get('amountStart').enable()
            this.form.get('isThereFinalAmount').enable()
            this.form.get('bonus').setValidators(
              Validators.compose( [
                MyValidator.required,
              ],
            ))
            this.form.get('bonus').setValue(this.form.get('bonus').value)
            break;
        }
      })

      this.form.get('amountStart').valueChanges.subscribe(val => {
          this.form.get('amountEnd').setValidators(Validators.compose(
          [ MyValidator.maxLength(8),MyValidator.required, MyValidator.min(this.form.get('amountStart').value),
          MyValidator.maxLength(8)
        ]));
          const value = this.form.get('amountEnd').value
          this.form.get('amountEnd').setValue(value)
      })

      this.form.get('quantityByUserSelector').valueChanges.subscribe(val => {
        if(this.form.get('quantityByUserSelector').value != -1){
          this.form.get('quantityByUser').setValue(this.form.get('quantityByUserSelector').value)
        }
        if(val != '1'){
          this.form.get('frequency').enable()
          this.form.get('frequency').setValidators(
            Validators.compose( [
              MyValidator.required,
              MyValidator.maxLength(8)
            ],
          ))
          this.form.get('frequencySelector').enable()
          this.form.get('frequencySelector').setValidators(
            Validators.compose( [
              MyValidator.required,
            ],
          ))
        }
          else if(val == '1'){
            this.form.get('frequency').disable()
            this.form.get('frequencySelector').disable()
          }
      })

      this.form.get('quantityTotalSelector').valueChanges.subscribe(val => {
        console.log('entro')
        if(this.form.get('quantityTotalSelector').value != -1){
          this.form.get('quantityTotal').setValue(this.form.get('quantityTotalSelector').value)
        }
      })

      this.form.get('frequencySelector').valueChanges.subscribe(val => {
        if(this.form.get('frequencySelector').value != -1){
          this.form.get('frequency').setValue(Number(this.form.get('frequencySelector').value))
        }
      })

      this.form.get('isThereFinalAmount').valueChanges.subscribe(val => {
        if(val == true){
          this.form.get('amountEnd').enable()
          this.form.get('amountEnd').setValidators(
            Validators.compose( [
              MyValidator.required,
              MyValidator.min(this.form.get('amountStart').value),
              MyValidator.maxLength(8)
            ],
          ))
          this.form.get('amountEnd').setValue(this.form.get('amountEnd').value)
        }
          else{
            this.form.get('amountEnd').disable()
          }
      })

      this.form.get('isTherePaymentLimit').valueChanges.subscribe(val => {
        if(val == true){
        this.form.get('paymentLimit').enable()
        this.form.get('paymentLimit').setValidators(
          Validators.compose( [
            MyValidator.required,
          ],
        ))
      }
        else{
          this.form.get('paymentLimit').disable()
        }
      })

      this.form.get('playthrough').valueChanges.subscribe(val => {
        if(val == true){
        this.form.get('restrictionFactor').enable()
        this.form.get('restrictionFactor').setValidators(
          Validators.compose( [
            MyValidator.required,
            MyValidator.maxLength(8)
          ],
        ))
        this.form.get('appliesTo').enable()
        this.form.get('appliesTo').setValidators(
          Validators.compose( [
            MyValidator.required,
          ],
        ))
      }
        else{
          this.form.get('restrictionFactor').disable()
          this.form.get('appliesTo').disable()
        }
      })
    }

    loadCustomControls(model: any){
      // suffix
        this.resources.currencies.map(x => {
          if(x.currencyId == model.item.currencyId)
          this.suffix = ' '+ x.symbol
          if(this.form.get('typeId').value == "promop")
          this.suffix = ' %'
        })
      // load Tags
      const trueTags =[]
      if(model.item.tags != null){
        model.item.tags.map(x =>{
           const gaa = this.resources.tags.map( y =>{
              if(y.tagId == x)
              trueTags.push(y.name)
          })
        })
      }
      this.tags = trueTags

       // load information
      if(model['item'].information)
      model['item'].information.map((x : any,index) =>{
        console.log('x',x)
        console.log('info agagagag',this.information)
        console.log('info agagaggagaag',this.information.controls)
        console.log('vaa',this.information.controls)

        this.information.controls.map(y => {
          console.log('a ver y.get(langId).value ',y.get('langId').value)
          console.log('a ver x.langId',x.langId)
          if(y.get('langId').value == x.langId){
            y.get('text').setValue(x.text)
          }
        })
      })

    // LOAD TRUE AND FALSE SELECTS
      if(
      this.form.get('amountEnd').value != null &&
      this.form.get('amountEnd').value != '' &&
      this.form.get('paymentLimit').value >= 0
      ){
        this.form.get('isThereFinalAmount').setValue(true);
        this.form.get('amountEnd').enable();
      }

      if(
      this.form.get('paymentLimit').value != null &&
      this.form.get('paymentLimit').value != '' &&
      this.form.get('paymentLimit').value >= 0
      ){
        this.form.get('isTherePaymentLimit').setValue(true);
        this.form.get('paymentLimit').enable()
      }

      if(
      this.form.get('restrictionFactor').value != null &&
      this.form.get('restrictionFactor').value != '' &&
      this.form.get('restrictionFactor').value >= 0
      ){
        this.form.get('playthrough').setValue(true);
        this.form.get('restrictionFactor').enable()
        this.form.get('appliesTo').enable()
      }


    //put select boxes values
      switch (this.form.get('quantityByUser').value) {
        case 0:
          this.form.get('quantityByUserSelector').setValue('0');
          this.form.get('frequency').enable()
          this.form.get('frequencySelector').enable()
          break;

        case 1:
          this.form.get('quantityByUserSelector').setValue('1');
          this.form.get('frequency').disable()
          this.form.get('frequencySelector').disable()
          break;

        default:
          this.form.get('quantityByUserSelector').setValue(-1);
          this.form.get('frequency').enable()
          this.form.get('frequencySelector').enable()
          break;
      }

      switch (this.form.get('quantityTotal').value) {
        case 0:
          this.form.get('quantityTotalSelector').setValue('0');
          break;

        case 1:
          this.form.get('quantityTotalSelector').setValue('1');
          break;

        default:
          this.form.get('quantityTotalSelector').setValue(-1);
          break;
      }

      switch (this.form.get('frequency').value) {
        case 24:
          this.form.get('frequencySelector').setValue('24');
          break;

        case 168:
          this.form.get('frequencySelector').setValue('168');
          break;

        case 720:
          this.form.get('frequencySelector').setValue('720');
          break;

        case 8760:
          this.form.get('frequencySelector').setValue('8760');
          break;

        default:
          this.form.get('frequencySelector').setValue(-1);
          break;
      }
  }

  ifIcreate(){
    // new
    this.form.get('paymentLimit').disable()
    this.form.get('appliesTo').disable()
    this.form.get('restrictionFactor').disable()
    this.form.get('amountEnd').disable()
  }


}


