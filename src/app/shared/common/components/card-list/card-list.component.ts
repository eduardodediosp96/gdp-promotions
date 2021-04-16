import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input() viewerStatus: boolean = false
  @Input() length: number = 500
  @Input() pageSize: number = 10
  @Input() pageIndex: number = 0
  @Input() pageSizeOptions: Array<number> = [5, 10, 25];
  @Input() showFirstLastButtons: boolean = true
  @Input() list: any = [
  {"id":"01coin","symbol":"zoc","name":"01coin"},{"id":"0-5x-long-algorand-token","symbol":"algohalf","name":"0.5X Long Algorand Token"},{"id":"0-5x-long-altcoin-index-token","symbol":"althalf","name":"0.5X Long Altcoin Index Token"},{"id":"0-5x-long-balancer-token","symbol":"balhalf","name":"0.5X Long Balancer Token"},{"id":"0-5x-long-bitcoin-cash-token","symbol":"bchhalf","name":"0.5X Long Bitcoin Cash Token"},{"id":"0-5x-long-bitcoin-sv-token","symbol":"bsvhalf","name":"0.5X Long Bitcoin SV Token"},{"id":"0-5x-long-bitcoin-token","symbol":"half","name":"0.5X Long Bitcoin Token"},{"id":"0-5x-long-cardano-token","symbol":"adahalf","name":"0.5X Long Cardano Token"},{"id":"0-5x-long-chainlink-token","symbol":"linkhalf","name":"0.5X Long Chainlink Token"},{"id":"0-5x-long-cosmos-token","symbol":"atomhalf","name":"0.5X Long Cosmos Token"},{"id":"0-5x-long-defi-index-token","symbol":"defihalf","name":"0.5X Long DeFi Index Token"},{"id":"0-5x-long-dogecoin-token","symbol":"dogehalf","name":"0.5X Long Dogecoin Token"},{"id":"0-5x-long-dragon-index-token","symbol":"drgnhalf","name":"0.5X Long Dragon Index Token"}
  ]

  @Output() clickEvent = new EventEmitter();
  @Output() filterEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  elementSelect(event:any, id:number){
    console.log(event)
    const emitObject = {
      event: event,
      id: id
    }
    this.clickEvent.emit(emitObject)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.filterEvent.emit(event)
    // console.log({lenght: this.length, pageSize:this.pageSize, pageIndex:this.pageIndex})
  }

}
