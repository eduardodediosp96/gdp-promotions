import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/common/services/http-client.service';
import { Observable } from 'rxjs';
import { Ipromotion } from './promotion.interface';
import { ApiNames } from '../../config/apis.enum';


@Injectable({
  providedIn: 'root'
})
export class promotionService {
  private SUBJECT = 'promotions';

  constructor(
    private http: HttpClientService
  ) { }

  items({ headers = [], params =[] }) {
    return this.http.get<Ipromotion>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      params,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  item({ id, headers = [] }) {
    return this.http.get<Ipromotion>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  newItem({ headers = [], body }) {
    console.log('aca esta lo que envio',body)
    console.log('el tipo de lo q envio',typeof(body))
    return this.http.post<Ipromotion>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      body,
      loadingOverlay: false,
      addApiKey: true,
    });
  }

  updItem({ id, headers = [], body }) {
    return this.http.patch<Ipromotion>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  activateItem({ id, headers = [], body = {} }) {
    return this.http.patch<Ipromotion>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}/activate`,
      headers,
      body,
      loadingOverlay: false,
      addApiKey: true,
    });
  }

  deactivateItem({ id, headers = [], body = {} }) {
    return this.http.patch<Ipromotion>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}/deactivate`,
      headers,
      body,
      loadingOverlay: false,
      addApiKey: true,
    });
  }

  resources({ headers = [] }) {
    return this.http.get<any>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/options`,
      headers,
      loadingOverlay: false,
      addApiKey: true,
    });
  }

  filters({ headers = [] }) {
    return this.http.get<any>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/options/filters`,
      headers,
      loadingOverlay: false,
      addApiKey: true,
    });
  }

}
