import { Coin } from './../interfaces/coin.interface';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Icoin } from '../interfaces/coin.interface';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';


@Injectable() export class MailForwardingPresenter {
  public _coinsList: Array<Icoin>;
  public _selectedCoin = new Coin();
  public _viewerStatus:boolean = false;
  public _selectedId:string = "bitcoin";
  public _length: number = 500
  public _pageSize: number = 10
  public _pageIndex: number = 0
  public _pageSizeOptions: Array<number> = [5, 10, 25];
  public _showFirstLastButtons: boolean = true

  constructor() {
    this._coinsList = []
     this.length = 500
     this.pageSize = 10
     this.pageIndex= 0
     this.pageSizeOptions = [5, 10, 25];
     this.showFirstLastButtons = true
  }

  get coinsList() { return this._coinsList }
  get selectedCoin() { return this._selectedCoin }
  get viewerStatus() { return this._viewerStatus }
  get selectedId() { return this._selectedId }
  get length() { return this._length }
  get pageSize() { return this._pageSize }
  get pageIndex() { return this._pageIndex }
  get pageSizeOptions() { return this._pageSizeOptions }
  get showFirstLastButtons() { return this._showFirstLastButtons }
  set coinsList(list: Array<Icoin>) { this._coinsList = list }
  set selectedCoin(coin: Coin) { this._selectedCoin = coin }
  set viewerStatus(viewerStatus: boolean) { this._viewerStatus = viewerStatus }
  set selectedId(selectedId: string) { this._selectedId = selectedId }
  set length(length: number) { this._length = length}
  set pageSize(pageSize: number) { this._pageSize = pageSize}
  set pageIndex(pageIndex: number) { this._pageIndex = pageIndex}
  set pageSizeOptions(pageSizeOptions: Array<number>) { this._pageSizeOptions  = pageSizeOptions}
  set showFirstLastButtons(showFirstLastButtons: boolean ) { this._showFirstLastButtons = showFirstLastButtons }

  public cleanSelectedCoin(){
    this._selectedCoin = new Coin();
    this.selectedId = "";
  }

  toJsonForm() {
  }
}

