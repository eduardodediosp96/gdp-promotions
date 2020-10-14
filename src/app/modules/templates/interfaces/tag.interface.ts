export interface Itag {
  tagId : string;
  name : string;
  active : string;
  testing : string;
  insDatetime : string;
}

export class Tag {
  tagId = '';
  name = '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }

}
