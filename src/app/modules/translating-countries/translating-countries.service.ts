import { Injectable } from '@angular/core';
import { HttpClientService } from '@common/services/http-client.service';
import { ApiNames } from 'app/config/apis.enum';
import { ITransCountry } from './transalting-countries-list/translating-countries.interface';

@Injectable({
  providedIn: 'root'
})
export class TranslatingCountriesService {
  private SUBJECT = '/countries';
  constructor(private http: HttpClientService) { }

  items({ headers = [] }) {
    return this.http.get<ITransCountry>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `${this.SUBJECT}/translating`,
      headers,
      loadingOverlay: false,
      addApiKey: true,
    });
  }

  item({ countryId, langId, headers = [] }) {
    return this.http.get<ITransCountry>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `${this.SUBJECT}/${countryId}/langs/${langId}/translating`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<ITransCountry>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `${this.SUBJECT}/translating`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  updItem({ countryId, langId, headers = [], body }) {
    return this.http.patch<ITransCountry>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `${this.SUBJECT}/${countryId}/langs/${langId}/translating`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

}
