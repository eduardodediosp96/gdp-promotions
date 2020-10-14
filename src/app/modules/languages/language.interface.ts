export interface ILanguage {
  pKey?: string;
  langId?: string;
  name?: string;
  countryId?: string;
  active?: string;
  testing?: string;
  insUserId?: string;
  insDatetime?: string;
  insTimestamp?: string;
}

export class Language {
  pKey? = '';
  langId? = '';
  name? = '';
  countryId? = '';
  active?;
  testing?;
  insUserId? = '';
  insDatetime? = '';
  insTimestamp? = '';

  constructor(model?) {
    Object.assign(this, model);
  }
}
