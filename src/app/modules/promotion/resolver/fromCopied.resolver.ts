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
export class fromCopiedResolver implements Resolve<any> {
  constructor(private service: promotionService,  private copySvc: copyPromotion){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    var num = 0
    this.copySvc.getCopiedId().subscribe(x =>{
      num = x
    })
    console.log("recontra mega gaaaaaa",num)
    const item = this.service.item({id: num, headers:  [] })
    return item
  }
}
