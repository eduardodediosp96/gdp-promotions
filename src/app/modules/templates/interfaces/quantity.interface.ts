export interface Iquantity {
  classId: string,
	elementId: string,
  name : string;
  active : string;
  testing : string;
  insDatetime : string;
}

export class Quantity {
  classId: '';
	elementId: '';
  name = '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }

}
