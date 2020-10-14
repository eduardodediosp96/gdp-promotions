export interface Ifrequency {
  classId: string,
	elementId: string,
  name : string;
  active : string;
  testing : string;
  insDatetime : string;
}

export class Frequency {
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
