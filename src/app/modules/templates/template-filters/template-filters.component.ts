import { FilterResources } from './../interfaces/filterResources';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as _moment from 'moment';


const moment =  _moment;
@Component({
  selector: 'app-template-filters',
  templateUrl: './template-filters.component.html',
  styleUrls: ['./template-filters.component.scss']
})
export class TemplatesFiltersComponent implements OnInit {

  @Input() formFilter: FormGroup;
  @Input() resources: FilterResources = new FilterResources();
  @Output() sendFilters = new EventEmitter();
  @Output() inputSearching = new EventEmitter();
  visible:boolean = false;
  filterKeys = []
  filterValues = []
  filterParmas = [];
  constructor() {
  }

  ngOnInit(): void {
    this.createFilterParams()
    this.formFilter.get('templateName').valueChanges.subscribe(val => {
      this.inputSearching.emit(val)
    })
  }

  createFilterParams(){
    const hasWord = (str, word) => str.includes(word);
    this.formFilter.valueChanges.subscribe(val => {
      var result = Object.keys(val).map((key) => {
        if(!hasWord(key, 'Selector') && key!='templateName'){
          this.filterParmas[key]=val[key]
        }
        else{
          console.log(this.filterParmas[key.slice(0, -8)])
          if(this.filterParmas[key.slice(0, -8)])
          this.filterParmas[key.slice(0, -8)] = val[key] + ':' + this.filterParmas[key.slice(0, -8)]
        }
      });
    });
  }

  handleHide(){
    this.visible = !this.visible
  }

  addFilters(event) {
    this.filterKeys = []
    this.filterValues = []
    let filters: { key: string,  val: string }[] = [];
    const entries = Object.entries(this.filterParmas);
    entries.map(x =>{
      console.log('KEY:',x[0])
      console.log('VALOR:',x[1])
      console.log('TIPO:',typeof(x[1]))
      if(x[1] != '' && x[1] != [] &&  x[1] != undefined && x[1] != -1 && x[1] != -'all'){
        this.filterKeys.push(x[0])
        this.filterValues.push(x[1])
      }
    });

    this.filterKeys.map((x,i) =>{
      filters.push( { key: `${this.filterKeys[i]}`,  val: `${this.filterValues[i]}`})
    });

    this.visible = !this.visible
    this.sendFilters.emit(filters)
  }

  changeDate(event){
    console.log(event)
    var inpuName = (event.controlName || '')
    this.formFilter.get(inpuName).setValue(event.value.format(moment.HTML5_FMT.DATE))
  }

}
