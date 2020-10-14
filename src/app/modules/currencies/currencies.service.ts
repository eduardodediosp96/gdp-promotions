import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/common/services/http-client.service';
import { Observable } from 'rxjs';
import { ICurrency } from './currencies.interface';
import { ApiNames } from '../../config/apis.enum';


@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private SUBJECT = 'currencies';

  constructor(
    private http: HttpClientService
  ) { }

  items({ headers = [] }) {
    return this.http.get<ICurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  item({ id, headers = [] }) {
    return this.http.get<ICurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<ICurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  updItem({ id, headers = [], body }) {
    return this.http.patch<ICurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  activateItem({ id, headers = [], body = {} }) {
    return this.http.patch<ICurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}/activate`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  deactivateItem({ id, headers = [], body = {} }) {
    return this.http.patch<ICurrency>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}/deactivate`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

}
