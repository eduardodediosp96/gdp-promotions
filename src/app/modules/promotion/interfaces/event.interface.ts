export interface Ievent {
  eventId : string;
  name : string;
  description : string;
  active : string;
  testing : string;
  insDatetime : string;
}

export class Event {
  eventId = '';
  name = '';
  description = '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }

}
