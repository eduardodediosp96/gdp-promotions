export interface ITransIdents {
  identId?: string;
  langId?: string;
  name?: string;
  description?: string;
  setDatetime?: string;
  ident?: {
    identId?: string;
    name?: string;
    description?: string;
    onlyDigits?: string;
    lenMin?: string;
    lenMax?: string;
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

export class TransIdents {
  identId? = '';
  langId? = '';
  name? = '';
  description? = '';
  setDatetime? = '';
  ident?: {
    identId?: '';
    name?: '';
    description?: '';
    onlyDigits?: '';
    lenMin?: '';
    lenMax?: '';
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
