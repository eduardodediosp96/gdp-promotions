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
  keyParam:any;
  statusKey = '';
  statusValue = '';
  filterKey = '';
  filterValue = '';
  filtersAllowed = [];
  resources:any = {};
  promotion: Promotion;
  pageType = 'new';
  visible=true
  selectable =true
  removable =true
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  selectedTabs = new FormControl(0);
  tabs = [];
  allTags: string[] = [];
  form:FormGroup;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private promotionSvc: promotionService,
    private formBuilder: FormBuilder,
    private toast: ToasterService,
  ) {
    this.handleResources();
    this.handleLoadElement();
    this.createInformationArrayForm();
  }

  ngOnInit(): void {
    this.whenSelectorsTurnCustomized();
    // this.createInformationArrayForm
  }

// FORM CREATE FUNCTIONS
  get information() {
    return this.form.get('information') as FormArray
  }

  createInformationArrayForm() {
    console.log('entra o no entra??')
    console.log(this.resources.langs)
    return this.resources.langs.map( x => {
      const fg = this.formBuilder.group({
        langId: x.langId,
        text:''
      })
      this.information.push(fg)
    })
  }

  createForm(model: Promotion): FormGroup {
    return this.formBuilder.group({
      code: [model.code, Validators.compose( [ MyValidator.required, MyValidator.minLength(12) ] ) ],
      currencyId: [model.currencyId, Validators.compose( [ MyValidator.required] ) ],
      typeId: [model.typeId, Validators.compose( [ MyValidator.required]) ],
      template: [model.template], //q fue?
      description: [model.description],
      lifeStart: [moment(model.lifeStart.split('-').reverse().join('-'),'DD-MM-YYYY'), Validators.compose( [ MyValidator.required ] ) ],
      lifeEnd: [moment(model.lifeEnd.split('-').reverse().join('-'),'DD-MM-YYYY'), Validators.compose( [ MyValidator.required ] ) ],
      bonus: [model.bonus, Validators.compose( [ MyValidator.required ] ) ],
      amountStart: [model.amountStart, Validators.compose( [ MyValidator.required ] ) ],
      amountEnd: [model.amountEnd],
      paymentLimit: [model.paymentLimit],
      quantityByIp: [model.quantityByIp, Validators.compose( [ MyValidator.required ] ) ],
      quantityByUser: [model.quantityByUser],
      quantityTotal: [model.quantityTotal],
      frequency: [model.frequency, Validators.compose( [ MyValidator.required ] ) ],
      restrictionFactor: [model.restrictionFactor],
      appliesTo: [model.appliesTo],
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
  handleResources() {
    let filters: { key: string,  val: string }[] = [];
    this.statusKey && this.statusValue && filters.push( { key: `${this.statusKey}`,  val: `${this.statusValue}`} );
    this.filterKey && this.filterValue && filters.push( { key: `${this.filterKey}`,  val: `${this.filterValue}`} );
    return this.promotionSvc.resources( { headers: filters.length ? [{ key: 'filters', val: JSON.stringify(filters) }] : [] } )
    .subscribe({
      next: (result) => {
        this.toast.success( { message: result['kindMessage'] } );
        this.resources = new Resources(result.data);
      },
      error: (err) => {
        this.resources = new Resources();
        this.toast.error( { message: err['kindMessage'] } );
      }
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    // Validar el formulario a entregar
    if(!this.form.get('playthrough').value){
      this.form.removeControl('restrictionFactor')
      this.form.removeControl('appliesTo')

    }
    if(!this.form.get('isTherePaymentLimit').value){
      this.form.removeControl('paymentLimit')
    }
    if(!this.form.get('isThereFinalAmount').value){
      this.form.removeControl('amountEnd')
    }
    // this.form.removeControl('quantityByUserSelector')
    // this.form.removeControl('quantityTotalSelector')
    // this.form.removeControl('frequencySelector')
    // this.form.removeControl('isThereFinalAmount')
    // this.form.removeControl('isTherePaymentLimit')
    // this.form.removeControl('isTherePlaythrough')
    ////////////////////////////////////
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

  handleLoadElement() {
    return this.routeparam({ key: 'id' }).subscribe({
      next: (result) => {
        console.log('en el servicio', this.keyParam)
        if(this.keyParam != 'new'){
          this.pageType = 'upd';
          // alert('vengo de una pagina existente')
          this.promotionItem({ id:this.keyParam }).subscribe((promotion: Ipromotion) => {
            this.form = this.createForm(new Promotion(promotion));
            this.createInformationArrayForm()
          });
        } else {
          // alert('vengo de una pagina nueva')
          this.pageType = 'new';
          this.form = this.createForm(new Promotion());
          this.createInformationArrayForm()
        }
      },
      error: (err) => {
        this.form = this.createForm(new Promotion());
        this.createInformationArrayForm()
        this.toast.error( { message: err['kindMessage'] } );
      }

    })
  }

  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        this.keyParam = params[key];
      })
    );
  }

  promotionItem({ id }) {
    return this.promotionSvc.item({ id }).pipe(
      map((result) => {

        return result.data.item;
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
    this.form.get('quantityByUserSelector').valueChanges.subscribe(val => {
      if(this.form.get('quantityByUserSelector').value != -1){
        this.form.get('quantityByUser').setValue(this.form.get('quantityByUserSelector').value)
      }
    })
    this.form.get('quantityTotalSelector').valueChanges.subscribe(val => {
      if(this.form.get('quantityTotalSelector').value != -1){
        this.form.get('quantityTotal').setValue(this.form.get('quantityTotalSelector').value)
      }
    })
    this.form.get('frequencySelector').valueChanges.subscribe(val => {
      if(this.form.get('frequencySelector').value != -1){
        this.form.get('frequency').setValue(this.form.get('frequencySelector').value)
      }
    })
  }
}


