export interface IDoc {
  pKey?: string;
  docId?: string;
  description?: string;
  active?: string;
  testing?: string;
  insDatetime?: string;
}

export class Doc {
  pKey = '';
  docId = '';
  description = '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }

}
