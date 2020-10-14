import { promotionService } from '../promotion.service';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable()
export class resourcesResolver implements Resolve<any> {
  constructor(private service: promotionService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.service.resources({ headers:  [] })
  }
}
