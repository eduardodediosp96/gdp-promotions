import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/shared/common/services/http-client.service';
import { ApiNames } from 'app/config/apis.enum';
import { ITransKey } from './translating-keys.interface';

@Injectable({
  providedIn: 'root'
})
export class TranslatingKeysService {
  private SUBJECT = 'keys';
  constructor(private http: HttpClientService) { }

  items({ headers = [] }) {
    return this.http.get<ITransKey>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/translating`,
      headers,
      loadingOverlay: false,
      addApiKey: true,
    });
  }

  item({ keyId, langId, headers = [] }) {
    return this.http.get<ITransKey>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${keyId}/langs/${langId}/translating`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<ITransKey>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/translating`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  updItem({ keyId, langId, headers = [], body }) {
    return this.http.patch<ITransKey>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${keyId}/langs/${langId}/translating`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }
}
