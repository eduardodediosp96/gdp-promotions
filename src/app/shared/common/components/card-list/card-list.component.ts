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
  @Input() list: any = []
  @Output() clickEvent = new EventEmitter();
  @Output() filterEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  elementSelect(event:any, id:number){
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
  }

}
