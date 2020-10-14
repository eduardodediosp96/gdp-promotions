import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/common/services/http-client.service';
import { Observable } from 'rxjs';
import { CountryIdents } from './country-idents.interface';
import { ApiNames } from '../../config/apis.enum';


@Injectable({
  providedIn: 'root'
})
export class CountryIdentsService {
  private SUBJECT = 'countries';

  constructor(
    private http: HttpClientService
  ) { }

  items({ headers = [] }) {
    return this.http.get<CountryIdents>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/idents`,
      headers,
      loadingOverlay: false,
      addApiKey: true,
    });
  }

  item({ countryId, identId, headers = [] }) {
    return this.http.get<CountryIdents>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${countryId}/idents/${identId}`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<CountryIdents>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/idents`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  updItem({ countryId, identId, headers = [], body }) {
    return this.http.patch<CountryIdents>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${countryId}/idents/${identId}`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

}
