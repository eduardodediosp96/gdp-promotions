export interface Iprocessor {
  pKey : string;
  name : string;
  description : string;
  active : string;
  testing : string;
  insDatetime : string;
}

export class Processor {
  pKey = '';
  name = '';
  description = '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }

}
