import { Router } from '@angular/router';
import { MailForwardingPresenter } from './presenter/crypto-coins.presenter';
import { CryptoCoinsService } from './crypto-coins.service';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Icoin } from './interfaces/coin.interface';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-crypto-coins',
  templateUrl: './crypto-coins.component.html',
  styleUrls: ['./crypto-coins.component.scss']
})
export class CryptoCoinsComponent implements OnInit {
  showFirstLastButtons: boolean = true

  constructor(
    public presenter: MailForwardingPresenter,
    private services: CryptoCoinsService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.callCryptoCoins()
  }

  callCryptoCoins(){
    this.services.items({
      headers : [],
      params :[
        { key: `vs_currency`,  val: `usd`},
        { key: `per_page`,  val: this.presenter.pageSize},
        { key: `page`,  val: this.presenter.pageIndex}
      ]
    }).subscribe((list:any) => {
      this.presenter.coinsList = list
    })
  }

  public callCryptoCoin(){
    this.services.item({id: this.presenter.selectedId,
      headers : []
    }).subscribe((coin:any) => {
      this.presenter.selectedCoin.Platform = Object.keys(coin.platforms)
      .map(function(key) {
        if(key != "")
          return key + ": " + coin.platforms[key];
      });
      this.presenter.selectedCoin.coinImage = coin.image.large
      this.presenter.selectedCoin.coinLinks =
      Object.keys(coin.links)
        .reduce((v:any, a:any) => {
          console.log("valor antiguo",v)
          console.log("valor nuevo en lista",coin.links[a])
          coin.links[a] != null && typeof coin.links[a] == "object" && a != "repos_url"? coin.links[a].map( x =>{
            console.log("type",typeof coin.links[a])
            console.log(x)
            if(x != "")
            v.push(x)
            return x
          }): ""
          return v
        }, []);
      this.presenter.selectedCoin.coinPrice = coin.market_data.current_price.en
      this.presenter.selectedCoin.coinRank = coin.coingecko_rank
      this.presenter.selectedCoin.coinScore = coin.coingecko_score
      this.presenter.selectedCoin.currencyId = "usd"
      this.presenter.selectedCoin.description = coin.description.en
      this.presenter.selectedCoin.id = coin.id
      this.presenter.selectedCoin.name = coin.name
      this.presenter.selectedCoin.symbol = coin.symbol
      this.presenter.viewerStatus = true
    })
  }

  showViewer(event: any){
    this.presenter.viewerStatus = true
    this.presenter.selectedId = event.id
    this.callCryptoCoin()
    this.router.navigate(['/crypto-coins', this.presenter.selectedId]);
  }

  filter(event: any){
    this.presenter.length = event.length;
    this.presenter.pageSize = event.pageSize;
    this.presenter.pageIndex = event.pageIndex;
    this.callCryptoCoins()
  }

}
