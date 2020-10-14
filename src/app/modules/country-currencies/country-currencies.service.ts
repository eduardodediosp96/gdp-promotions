import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/common/services/http-client.service';
import { Observable } from 'rxjs';
import { CountryCurrency } from './country-currencies.interface';
import { ApiNames } from '../../config/apis.enum';


@Injectable({
  providedIn: 'root'
})
export class CountryCurrenciesService {
  private SUBJECT = 'countries';

  constructor(
    private http: HttpClientService
  ) { }

  items({ headers = [] }) {
    return this.http.get<CountryCurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/currencies`,
      headers,
      loadingOverlay: false,
      addApiKey: true,
    });
  }

  item({ countryId, currencyId, headers = [] }) {
    return this.http.get<CountryCurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${countryId}/currencies/${currencyId}`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<CountryCurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/currencies`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  updItem({ countryId, currencyId, headers = [], body }) {
    return this.http.patch<CountryCurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${countryId}/currencies/${currencyId}`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

}
