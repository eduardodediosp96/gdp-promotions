export interface Iplatform {
  platformId : string;
  name : string;
  description : string;
  active : string;
  testing : string;
  insDatetime : string;
}

export class Platform {
  platformId : string;
  name : string;
  description : string;
  active : string;
  testing : string;
  insDatetime : string;

  constructor(model?) {
    Object.assign(this, model);
  }

}
