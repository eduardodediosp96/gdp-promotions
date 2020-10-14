import { Injectable } from '@angular/core';
import { ITransDoc } from './translating-docs.interface'
import { HttpClientService } from 'app/shared/common/services/http-client.service';
import { ApiNames } from 'app/config/apis.enum';

@Injectable({
  providedIn: 'root'
})
export class TranslatingDocsService {
  private SUBJECT = 'docs';
  constructor(private http: HttpClientService) { }

  items({ headers = [] }) {
    return this.http.get<ITransDoc>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/translating`,
      headers,
      loadingOverlay: false,
      addApiKey: true,
    });
  }

  item({ docId, langId, headers = [] }) {
    return this.http.get<ITransDoc>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${docId}/langs/${langId}/translating`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<ITransDoc>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/translating`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  updItem({ docId, langId, headers = [], body }) {
    return this.http.patch<ITransDoc>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${docId}/langs/${langId}/translating`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }
}
