import { copyPromotion } from './../../../shared/common/services/copy.service';
import { Ipromotion, Promotion } from './../promotion.interface';
import { promotionService } from '../promotion.service';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable()
export class promotionResolver implements Resolve<any> {
  constructor(private service: promotionService, private copySvc: copyPromotion){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    var item: any = null;
    if(route.params['id'] != 'new'){
      this.copySvc.updatedPromotionWhiteAction('edit')
      item = this.service.item({id: route.params['id'], headers:  [] })
    }else {
      this.copySvc.updatedPromotionWhiteAction('new')
    }
    return item
  }
}
