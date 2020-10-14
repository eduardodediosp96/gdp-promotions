import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/shared/common/services/http-client.service';
import { ICallingCode } from './calling-codes.interface';
import { ApiNames } from 'app/config/apis.enum';

@Injectable({
  providedIn: 'root',
})
export class CallingCodesService {
  private SUBJECT = 'calling-codes';

  constructor(private http: HttpClientService) {}

  items({ headers = [] }) {
    return this.http.get<ICallingCode>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  item({ id, headers = [] }) {
    return this.http.get<ICallingCode>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<ICallingCode>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  updItem({ id, headers = [], body }) {
    return this.http.patch<ICallingCode>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  activateItem({ id, headers = [], body = {} }) {
    return this.http.patch<ICallingCode>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}/activate`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }

  deactivateItem({ id, headers = [], body = {} }) {
    return this.http.patch<ICallingCode>({
      nameAPI: ApiNames.multilanguage,
      urlOrPath: `/${this.SUBJECT}/${id}/deactivate`,
      headers,
      body,
      loadingOverlay: true,
      addApiKey: true,
    });
  }
}
