export interface ITransKey {
  keyId?: string;
  langId?: string;
  value?: string;
  setUserId?: string;
  setDatetime?: string;
  setTimestamp?: string;
  key?: {
    keyId?: string;
    description?: string;
    active?: string;
    testing?: string;
  };
  lang?: {
    langId?: string;
    name?: string;
    countryId?: string;
    active?: string;
    testing?: string;
  };
}

export class TransKey {
  keyId? = '';
  langId? = '';
  value? = '';
  setUserId? = '';
  setDatetime? = '';
  key?: {
    keyId?: '';
    description?: '';
    active?: '';
    testing?: '';
  };
  lang?: {
    langId?: '';
    name?: '';
    countryId?: '';
    active?: '';
    testing?: '';
  };

  constructor(model?) {
    Object.assign(this, model);
  }
}
