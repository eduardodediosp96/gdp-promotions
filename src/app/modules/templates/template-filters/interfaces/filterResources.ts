interface targetUser {
  name: number;
  elementId: string;
}
interface activePerfil {
  name: number;
  activeId: string;
}
interface conditionPerfil {
  name: number;
  testingId: string;
}
export interface IfilterResources {
  currencies: Array<string>;
  types: Array<string>;
  events : Array<string>;
  enableUsers:Array<string>;
  platforms : Array<string>;
  processors : Array<string>;
  tags : Array<string>;
  targetUsactiveers: Array<targetUser>;
  active: Array<activePerfil>;
  condition: Array<conditionPerfil>;
  operatorsType: Array<Object>;
}

export class FilterResources {
  currencies= [];
  types= [];
  events = [];
  enableUser = [];
  platforms = [];
  processors = [];
  tags = [];
  targetUsers =[{}]
  active =[{}]
  condition =[{}]
  operatorsType =[{}]


  constructor(model?) {
    Object.assign(this, model);
  }
}
