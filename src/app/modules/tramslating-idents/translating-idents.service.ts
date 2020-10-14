import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/shared/common/services/http-client.service';
import { ITransIdents } from './translating-idents.interface';
import { ApiNames } from 'app/config/apis.enum';

@Injectable({
  providedIn: 'root'
})
export class TranslatingIdentsService {
  private SUBJECT = 'idents';
  constructor(private http: HttpClientService) { }

  items({ headers = [] }) {
    return this.http.get<ITransIdents>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/translating`,
      headers,
      loadingOverlay: false,
      addApiKey: true,
    });
  }

  item({ identId, langId, headers = [] }) {
    return this.http.get<ITransIdents>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${identId}/langs/${langId}/translating`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<ITransIdents>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/translating`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  updItem({ identId, langId, headers = [], body }) {
    return this.http.patch<ITransIdents>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${identId}/langs/${langId}/translating`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }
}
