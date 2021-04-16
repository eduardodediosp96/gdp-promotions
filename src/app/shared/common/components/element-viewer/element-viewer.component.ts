import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-element-viewer',
  templateUrl: './element-viewer.component.html',
  styleUrls: ['./element-viewer.component.scss']
})
export class ElementViewerComponent implements OnInit {
  @Input() coinName: string
  @Input() coinImage: string
  @Input() coinIcon: string
  @Input() coinId: string
  @Input() coinPrice: string
  @Input() coinRank: string
  @Input() coinScore: string
  @Input() coinDescription: string
  @Input() coinLinks: any
  @Input() coinPlatforms: any
  @Output() backButtonEmitter = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {

  }

  close(event:any){
    this.backButtonEmitter.emit({back:true})
  }

}
