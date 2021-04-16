import { MailForwardingPresenter } from './../../presenter/crypto-coins.presenter';
import { Router } from '@angular/router';
import { CryptoCoinsService } from './../../crypto-coins.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crypto-coin-viewer',
  templateUrl: './crypto-coin-viewer.component.html',
  styleUrls: ['./crypto-coin-viewer.component.scss']
})
export class CryptoCoinViewerComponent implements OnInit {

  constructor(
    public presenter: MailForwardingPresenter,
    private router: Router,
    private services: CryptoCoinsService
  ) { }

  ngOnInit() {
    this.callCryptoCoin()
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
          coin.links[a] != null && typeof coin.links[a] == "object" && a != "repos_url"? coin.links[a].map( x =>{
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

  public backToList(event:any){
    this.presenter.viewerStatus = false
    this.router.navigate(['/crypto-coins']);
  }

}
