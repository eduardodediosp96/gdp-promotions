import { copyPromotion } from './../../../shared/common/services/copy.service';
import { templateService } from './../../templates/template.service';
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
export class fromTemplateResolver implements Resolve<any> {
  constructor(private service: templateService,private copySvc: copyPromotion){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.copySvc.updatedPromotionWhiteAction('template')
    var item: any = null;
    item = this.service.item({id: route.params['id'], headers:  [] })
    return item
  }
}
