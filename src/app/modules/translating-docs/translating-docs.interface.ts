export interface ITransDoc {
  docId?: string;
  langId?: string;
  value?: string;
  setUserId?: string;
  setDatetime?: string;
  setTimestamp?: string;
  doc?: {
    docId?: string;
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

export class TransDoc {
  docId? = '';
  langId? = '';
  value? = '';
  setUserId? = '';
  setDatetime? = '';
  setTimestamp? = '';
  doc?: {
    docId?: '';
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
