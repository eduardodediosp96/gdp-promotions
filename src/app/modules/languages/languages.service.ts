import { Injectable } from '@angular/core';
import { ApiNames } from 'app/config/apis.enum';
import { ILanguage } from './language.interface';
import { HttpClientService } from '@common/services/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private SUBJECT = 'langs';

  constructor(private http: HttpClientService) {}

  items({ headers = [], loadingOverlay = true }) {
    return this.http.get<ILanguage>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay,
      addApiKey: true,
    });
  }

  item({ id, headers = [] }) {
    return this.http.get<ILanguage>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<ILanguage>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  updItem({ id, headers = [], body }) {
    return this.http.patch<ILanguage>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  activateItem({ id, headers = [], body = {} }) {
    return this.http.patch<ILanguage>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}/activate`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  deactivateItem({ id, headers = [], body = {} }) {
    return this.http.patch<ILanguage>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}/deactivate`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }
}
