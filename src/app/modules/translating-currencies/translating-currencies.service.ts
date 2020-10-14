import { Injectable } from '@angular/core';
import { HttpClientService } from '@common/services/http-client.service';
import { ITransCountry } from '../translating-countries/transalting-countries-list/translating-countries.interface';
import { ApiNames } from 'app/config/apis.enum';
import { ITransCurrency } from './translating-countries.interface';

@Injectable({
  providedIn: 'root'
})
export class TranslatingCurrenciesService {
  private SUBJECT = 'currencies/translating';
  constructor(private http: HttpClientService) { }

  items({ headers = [] }) {
    return this.http.get<ITransCurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay: false,
      addApiKey: true,
    });
  }

  item({ currencyId, langId, headers = [] }) {
    return this.http.get<ITransCurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/currencies/${currencyId}/langs/${langId}/translating`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<ITransCurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  updItem({ currencyId, langId, headers = [], body }) {
    return this.http.patch<ITransCurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/currencies/${currencyId}/langs/${langId}/translating`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }
}
