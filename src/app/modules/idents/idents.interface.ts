export interface IIdents {
  pKey?: string;
  identId?: string;
  name?: string;
  description?: string;
  onlyDigits?: string;
  lenMin?: string;
  lenMax?: string;
  active?: string;
  testing?: string;
  insDatetime?: string;
}

export class Ident {
  pKey = '';
  identId = '';
  name = '';
  description = '';
  onlyDigits = '';
  lenMin = '';
  lenMax = '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }
}
