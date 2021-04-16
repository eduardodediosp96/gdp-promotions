import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/common/services/http-client.service';
import { ApiNames } from '../../config/apis.enum';
import { Icoin, Coin } from './interfaces/coin.interface';


@Injectable({
  providedIn: 'root'
})
export class CryptoCoinsService {
  private SUBJECT = 'coins';

  constructor(
    private http: HttpClientService
  ) { }

  items({ headers = [], params =[] }) {
    return this.http.get<Array<Icoin>>({
      nameAPI: ApiNames.coinGecko,
      urlOrPath: `${this.SUBJECT}/markets`,
      headers,
      params,
      loadingOverlay: true,
      addApiKey: false,
    });
  }

  item({ id, headers = [] }) {
    return this.http.get<Icoin>({
      nameAPI: ApiNames.coinGecko,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      loadingOverlay: false,
      addApiKey: false,
    });
  }
}
