import { Itag } from './../interfaces/tag.interface';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/common/services/http-client.service';
import { Observable } from 'rxjs';
import { ApiNames } from '../../../config/apis.enum';


@Injectable({
  providedIn: 'root'
})
export class promotionService {
  private SUBJECT = 'tags';

  constructor(
    private http: HttpClientService
  ) { }

  items({ headers = [] }) {
    console.log('entro')
    console.log(ApiNames.multilanguage)
    return this.http.get<Itag>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  item({ id, headers = [] }) {
    return this.http.get<Itag>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<Itag>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  updItem({ id, headers = [], body }) {
    return this.http.patch<Itag>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  activateItem({ id, headers = [], body = {} }) {
    return this.http.patch<Itag>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}/activate`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  deactivateItem({ id, headers = [], body = {} }) {
    return this.http.patch<Itag>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}/deactivate`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

}
