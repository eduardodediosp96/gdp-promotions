export interface IKeys {
  pKey?: string;
  keyId?: string;
  description?: string;
  active?: string;
  testing?: string;
  insDatetime?: string;
}

export class Key {
  pKey = "";
  keyId = "";
  description = "";
  active = "";
  testing = "";
  insDatetime = "";

  constructor(model?) {
    Object.assign(this, model);
  }
}
